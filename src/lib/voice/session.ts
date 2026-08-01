import { createServerFn } from "@tanstack/react-start";
import { buildAgentInstructions } from "./knowledge";

export type VoiceSessionResponse =
  | {
      mode: "xai";
      token: string;
      expiresAt?: number | string | null;
      model: string;
      voice: string;
      instructions: string;
      wsUrl: string;
    }
  | {
      mode: "demo";
      reason: string;
      instructions: string;
      voice: string;
    };

const MODEL = "grok-voice-latest";
const VOICE = "eve";

function extractToken(payload: Record<string, unknown>): string | null {
  if (typeof payload.value === "string") return payload.value;
  if (typeof payload.token === "string") return payload.token;
  if (typeof payload.secret === "string") return payload.secret;
  const clientSecret = payload.client_secret;
  if (clientSecret && typeof clientSecret === "object") {
    const cs = clientSecret as Record<string, unknown>;
    if (typeof cs.value === "string") return cs.value;
    if (typeof cs.token === "string") return cs.token;
  }
  return null;
}

/**
 * Mint an xAI ephemeral realtime token for the browser voice agent.
 * Falls back to demo mode when XAI_API_KEY is not configured.
 */
export const createVoiceSession = createServerFn({ method: "POST" }).handler(
  async (): Promise<VoiceSessionResponse> => {
    const instructions = buildAgentInstructions();
    const apiKey = process.env.XAI_API_KEY?.trim();

    if (!apiKey) {
      return {
        mode: "demo",
        reason:
          "XAI_API_KEY is not set. Demo mode uses on-device speech + the site knowledge base.",
        instructions,
        voice: VOICE,
      };
    }

    try {
      const res = await fetch("https://api.x.ai/v1/realtime/client_secrets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expires_after: { seconds: 600 },
        }),
      });

      const raw = (await res.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;

      if (!res.ok) {
        const msg =
          typeof raw.error === "object" &&
          raw.error &&
          "message" in (raw.error as object)
            ? String((raw.error as { message?: string }).message)
            : `xAI client_secrets failed (${res.status})`;
        return {
          mode: "demo",
          reason: msg,
          instructions,
          voice: VOICE,
        };
      }

      const token = extractToken(raw);
      if (!token) {
        return {
          mode: "demo",
          reason: "Unexpected xAI token response shape; using demo mode.",
          instructions,
          voice: VOICE,
        };
      }

      return {
        mode: "xai",
        token,
        expiresAt:
          (raw.expires_at as number | string | undefined) ??
          ((raw.client_secret as { expires_at?: number } | undefined)
            ?.expires_at ?? null),
        model: MODEL,
        voice: VOICE,
        instructions,
        wsUrl: `wss://api.x.ai/v1/realtime?model=${MODEL}`,
      };
    } catch (err) {
      return {
        mode: "demo",
        reason:
          err instanceof Error
            ? err.message
            : "Failed to reach xAI; using demo mode.",
        instructions,
        voice: VOICE,
      };
    }
  },
);
