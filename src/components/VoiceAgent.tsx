import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Mic, MicOff, PhoneOff, Sparkles, X } from "lucide-react";
import { brand } from "@/lib/data";
import {
  bookingConfirmationText,
  submitBooking,
  timeWindows,
} from "@/lib/booking";
import { createVoiceSession, type VoiceSessionResponse } from "@/lib/voice/session";
import { answerFromKnowledge } from "@/lib/voice/demo-engine";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status =
  | "idle"
  | "connecting"
  | "listening"
  | "speaking"
  | "error"
  | "ended";

type LogLine = { role: "user" | "agent" | "system"; text: string };

const SAMPLE_RATE = 24000;

function floatTo16BitPCM(float32: Float32Array): Int16Array {
  const out = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i] ?? 0));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

function int16ToBase64(int16: Int16Array): string {
  const bytes = new Uint8Array(int16.buffer, int16.byteOffset, int16.byteLength);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function base64ToInt16(b64: string): Int16Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

function playPcm16(
  ctx: AudioContext,
  samples: Int16Array,
  nextTimeRef: { current: number },
) {
  const buffer = ctx.createBuffer(1, samples.length, SAMPLE_RATE);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) {
    channel[i] = (samples[i] ?? 0) / 0x8000;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.connect(ctx.destination);
  const now = ctx.currentTime;
  const start = Math.max(now + 0.02, nextTimeRef.current);
  src.start(start);
  nextTimeRef.current = start + buffer.duration;
}

export function VoiceAgent() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [mode, setMode] = useState<"xai" | "demo" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [muted, setMuted] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playTimeRef = useRef({ current: 0 });
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mutedRef = useRef(false);
  const activeRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const pushLog = useCallback((role: LogLine["role"], text: string) => {
    setLogs((prev) => [...prev.slice(-40), { role, text }]);
  }, []);

  const cleanup = useCallback(() => {
    activeRef.current = false;
    try {
      wsRef.current?.close();
    } catch {
      /* ignore */
    }
    wsRef.current = null;
    processorRef.current?.disconnect();
    processorRef.current = null;
    mediaRef.current?.getTracks().forEach((t) => t.stop());
    mediaRef.current = null;
    if (audioCtxRef.current) {
      void audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
    recognitionRef.current = null;
    playTimeRef.current.current = 0;
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  async function handleBookTool(args: Record<string, unknown>) {
    const name = String(args.full_name ?? args.name ?? "").trim();
    const parts = name.split(/\s+/);
    const firstName = String(args.first_name ?? parts[0] ?? "Guest");
    const lastName = String(
      args.last_name ?? (parts.length > 1 ? parts.slice(1).join(" ") : "Guest"),
    );
    const email = String(args.email ?? "").trim();
    const phone = String(args.phone ?? "").trim();
    const preferredDate = String(
      args.preferred_date ?? args.date ?? "",
    ).trim();
    const timeWindow = String(
      args.time_window ?? args.time ?? "morning",
    ).trim();
    const projectType = String(
      args.project_type ?? args.projectType ?? "Other",
    ).trim();
    const message = String(args.message ?? args.notes ?? "").trim();

    if (!email || !phone || !preferredDate) {
      return {
        ok: false,
        error:
          "Missing required fields. Need email, phone, preferred date, and time window.",
      };
    }

    try {
      const result = await submitBooking({
        data: {
          firstName,
          lastName,
          email,
          phone,
          projectType,
          preferredDate,
          timeWindow,
          message,
          source: "voice",
        },
      });
      const text = bookingConfirmationText(result.booking);
      pushLog("system", text);
      track("book_consult_success", { source: "voice" });
      return { ok: true, confirmation: text, bookingId: result.booking.id };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Booking failed",
      };
    }
  }

  async function startXaiSession(
    session: Extract<VoiceSessionResponse, { mode: "xai" }>,
  ) {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        channelCount: 1,
      },
    });
    mediaRef.current = stream;

    const audioCtx = new AudioContext({ sampleRate: SAMPLE_RATE });
    audioCtxRef.current = audioCtx;
    playTimeRef.current.current = audioCtx.currentTime;

    const ws = new WebSocket(session.wsUrl, [
      `xai-client-secret.${session.token}`,
    ]);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      activeRef.current = true;
      ws.send(
        JSON.stringify({
          type: "session.update",
          session: {
            voice: session.voice,
            instructions: session.instructions,
            turn_detection: {
              type: "server_vad",
              threshold: 0.85,
              silence_duration_ms: 700,
            },
            audio: {
              input: {
                format: { type: "audio/pcm", rate: SAMPLE_RATE },
                transport: "json",
              },
              output: {
                format: { type: "audio/pcm", rate: SAMPLE_RATE },
                transport: "json",
              },
            },
            tools: [
              {
                type: "function",
                name: "book_consultation",
                description:
                  "Book a design consultation after confirming details with the caller.",
                parameters: {
                  type: "object",
                  properties: {
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    full_name: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                    preferred_date: { type: "string" },
                    time_window: {
                      type: "string",
                      enum: timeWindows.map((t) => t.id),
                    },
                    project_type: { type: "string" },
                    message: { type: "string" },
                  },
                  required: [
                    "email",
                    "phone",
                    "preferred_date",
                    "time_window",
                    "project_type",
                  ],
                },
              },
            ],
          },
        }),
      );

      ws.send(
        JSON.stringify({
          type: "conversation.item.create",
          item: {
            type: "message",
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Please greet me briefly as Aria from Level Up Tile and offer help with materials, projects, or booking a consultation.",
              },
            ],
          },
        }),
      );
      ws.send(JSON.stringify({ type: "response.create" }));

      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      source.connect(processor);
      processor.connect(audioCtx.destination);
      processor.onaudioprocess = (ev) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        if (mutedRef.current) return;
        const input = ev.inputBuffer.getChannelData(0);
        const pcm = floatTo16BitPCM(input);
        wsRef.current.send(
          JSON.stringify({
            type: "input_audio_buffer.append",
            audio: int16ToBase64(pcm),
          }),
        );
      };

      setStatus("listening");
      pushLog(
        "system",
        "Connected to Grok Voice (xAI). Speak naturally — Aria is listening.",
      );
    };

    ws.onmessage = async (ev) => {
      if (typeof ev.data !== "string") return;
      let msg: Record<string, unknown>;
      try {
        msg = JSON.parse(ev.data) as Record<string, unknown>;
      } catch {
        return;
      }
      const type = String(msg.type ?? "");

      if (type === "response.output_audio.delta") {
        setStatus("speaking");
        const delta = msg.delta ?? msg.audio;
        if (typeof delta === "string" && audioCtxRef.current) {
          playPcm16(
            audioCtxRef.current,
            base64ToInt16(delta),
            playTimeRef.current,
          );
        }
      }

      if (type === "response.output_audio_transcript.delta") {
        const d = String(msg.delta ?? "");
        if (d) {
          setLogs((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "agent") {
              return [
                ...prev.slice(0, -1),
                { role: "agent", text: last.text + d },
              ];
            }
            return [...prev, { role: "agent", text: d }];
          });
        }
      }

      if (
        type === "conversation.item.input_audio_transcription.completed" ||
        type === "conversation.item.input_audio_transcription.done"
      ) {
        const transcript = String(
          (msg.transcript as string) ??
            ((msg.item as { transcript?: string } | undefined)?.transcript ??
              ""),
        );
        if (transcript) pushLog("user", transcript);
      }

      if (type === "response.function_call_arguments.done") {
        const name = String(msg.name ?? "");
        const callId = String(msg.call_id ?? msg.callId ?? "");
        let args: Record<string, unknown> = {};
        try {
          args = JSON.parse(String(msg.arguments ?? "{}")) as Record<
            string,
            unknown
          >;
        } catch {
          args = {};
        }
        if (name === "book_consultation") {
          const result = await handleBookTool(args);
          ws.send(
            JSON.stringify({
              type: "conversation.item.create",
              item: {
                type: "function_call_output",
                call_id: callId,
                output: JSON.stringify(result),
              },
            }),
          );
          ws.send(JSON.stringify({ type: "response.create" }));
        }
      }

      if (type === "response.done") setStatus("listening");

      if (type === "error") {
        const errMsg =
          typeof msg.error === "object" && msg.error
            ? JSON.stringify(msg.error)
            : String(msg.message ?? "Voice session error");
        setError(errMsg);
        setStatus("error");
        pushLog("system", errMsg);
      }
    };

    ws.onerror = () => {
      setError("WebSocket error connecting to xAI Voice.");
      setStatus("error");
    };

    ws.onclose = () => {
      if (activeRef.current) setStatus("ended");
    };
  }

  async function startDemoSession(
    session: Extract<VoiceSessionResponse, { mode: "demo" }>,
  ) {
    activeRef.current = true;
    pushLog(
      "system",
      session.reason ||
        "Demo voice mode (set XAI_API_KEY for full Grok Voice).",
    );

    const SpeechRecognitionCtor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setError(
        "Speech recognition is not supported in this browser. Try Chrome, or set XAI_API_KEY for Grok Voice.",
      );
      setStatus("error");
      return;
    }

    const greet = `Hi, I'm Aria with ${brand.name}. I can help with materials, projects, services, or booking a consultation. What can I help with?`;
    pushLog("agent", greet);
    speakDemo(greet);
    setStatus("listening");

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (mutedRef.current) return;
      const last = event.results[event.results.length - 1];
      const text = last?.[0]?.transcript?.trim();
      if (!text) return;
      pushLog("user", text);
      setStatus("speaking");
      const reply = answerFromKnowledge(text);
      pushLog("agent", reply);
      speakDemo(reply, () => setStatus("listening"));
    };

    recognition.onerror = () => {
      /* keep listening */
    };
    recognition.onend = () => {
      if (activeRef.current && open) {
        try {
          recognition.start();
        } catch {
          /* ignore */
        }
      }
    };

    recognition.start();
  }

  function speakDemo(text: string, onEnd?: () => void) {
    if (!("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02;
    u.pitch = 1;
    u.onend = () => onEnd?.();
    window.speechSynthesis.speak(u);
  }

  async function start() {
    setError(null);
    setLogs([]);
    setStatus("connecting");
    cleanup();
    track("voice_agent_start");

    try {
      const session = await createVoiceSession();
      setMode(session.mode);
      if (session.mode === "xai") {
        await startXaiSession(session);
      } else {
        await startDemoSession(session);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to start voice agent");
      setStatus("error");
    }
  }

  function stop() {
    cleanup();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setStatus("ended");
    setMode(null);
  }

  function toggleOpen() {
    if (open) {
      stop();
      setOpen(false);
      setStatus("idle");
    } else {
      setOpen(true);
      track("voice_agent_open");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleOpen}
        className={cn(
          "fixed bottom-5 right-5 z-[60] flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 py-3.5 text-sm font-medium tracking-wide text-cream shadow-card transition-all hover:bg-forest-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:bottom-8 md:right-8",
          open && "ring-2 ring-gold",
        )}
        aria-expanded={open}
        aria-label={open ? "Close voice agent" : "Speak with Aria, voice agent"}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5 text-gold" />
        )}
        <span className="hidden sm:inline">
          {open ? "Close" : "Talk to Aria"}
        </span>
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-5 z-[60] w-[min(100vw-2rem,24rem)] overflow-hidden rounded-2xl border border-border bg-ivory shadow-card md:bottom-24 md:right-8"
          role="dialog"
          aria-label={`${brand.name} voice agent`}
        >
          <div className="bg-forest-deep px-5 py-4 text-cream">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-gold">
                  <Sparkles className="h-3.5 w-3.5" />
                  xAI Voice Agent
                </p>
                <h2 className="mt-1 font-display text-2xl">Aria</h2>
                <p className="mt-1 text-xs text-cream/70">
                  {brand.name} · materials, projects & booking
                </p>
              </div>
              {mode && (
                <span className="rounded-full border border-gold/40 px-2.5 py-0.5 text-[0.65rem] tracking-wider uppercase text-gold">
                  {mode === "xai" ? "Grok Voice" : "Demo"}
                </span>
              )}
            </div>
          </div>

          <div className="max-h-56 space-y-2 overflow-y-auto px-4 py-3 text-sm">
            {logs.length === 0 && status === "idle" && (
              <p className="text-ink-muted">
                Start a conversation about collections, installs, or booking.
                Full Grok Voice when{" "}
                <code className="text-xs">XAI_API_KEY</code> is set.
              </p>
            )}
            {logs.map((line, i) => (
              <div
                key={`${i}-${line.role}`}
                className={cn(
                  "rounded-lg px-3 py-2",
                  line.role === "user" && "ml-6 bg-cream text-forest",
                  line.role === "agent" && "mr-4 bg-forest/5 text-forest",
                  line.role === "system" && "text-xs text-stone",
                )}
              >
                {line.role !== "system" && (
                  <p className="mb-0.5 text-[0.6rem] font-medium tracking-[0.14em] uppercase text-gold-dark">
                    {line.role === "user" ? "You" : "Aria"}
                  </p>
                )}
                <p className="leading-relaxed">{line.text}</p>
              </div>
            ))}
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-border bg-cream px-4 py-3">
            <p className="text-[0.65rem] tracking-[0.12em] uppercase text-stone">
              {status === "idle" && "Ready"}
              {status === "connecting" && "Connecting…"}
              {status === "listening" && (muted ? "Muted" : "Listening")}
              {status === "speaking" && "Speaking"}
              {status === "error" && "Error"}
              {status === "ended" && "Ended"}
            </p>
            <div className="flex items-center gap-2">
              {status === "listening" || status === "speaking" ? (
                <>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                  <Button type="button" size="sm" variant="forest" onClick={stop}>
                    <PhoneOff className="h-4 w-4" />
                    End
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="gold"
                  onClick={() => void start()}
                  disabled={status === "connecting"}
                >
                  {status === "connecting" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                  Start talking
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((ev: Event) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}
