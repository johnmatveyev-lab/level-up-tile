import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState, type FormEvent } from "react";
import {
  listBookings,
  updateBookingStatus,
  type Booking,
  type BookingStatus,
} from "@/lib/booking";
import { brand, pageTitle } from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminCrmPage,
  head: () => ({
    meta: buildMeta({
      title: pageTitle("Lead CRM"),
      description: "Internal consultation inbox",
      path: "/admin",
      noindex: true,
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/admin` }],
  }),
});

const STATUSES: BookingStatus[] = [
  "confirmed",
  "pending",
  "contacted",
  "completed",
  "cancelled",
];

const TOKEN_KEY = "lut_admin_token";

function AdminCrmPage() {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem(TOKEN_KEY) ?? "";
  });
  const [input, setInput] = useState(token);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);

  const load = useCallback(async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await listBookings({ data: { token: t } });
      setBookings(res.bookings);
      setAuthed(true);
      sessionStorage.setItem(TOKEN_KEY, t);
      setToken(t);
    } catch (e) {
      setAuthed(false);
      setBookings([]);
      setError(e instanceof Error ? e.message : "Auth failed");
    } finally {
      setLoading(false);
    }
  }, []);

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    await load(input.trim());
  }

  async function onStatus(id: string, status: BookingStatus) {
    try {
      await updateBookingStatus({ data: { token, id, status } });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b)),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  if (!authed) {
    return (
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-md px-5">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
            Internal
          </p>
          <h1 className="mt-2 font-display text-4xl text-forest">Lead CRM</h1>
          <p className="mt-3 text-sm text-ink-muted">
            Enter your admin token to view consultations for {brand.name}.
            Default local token:{" "}
            <code className="rounded bg-cream px-1.5 py-0.5 text-xs">
              levelup-admin
            </code>
          </p>
          <form onSubmit={onLogin} className="mt-8 space-y-4">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Admin token"
              className="w-full rounded-lg border border-forest/15 bg-cream px-3.5 py-2.5 text-sm text-forest outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
              autoComplete="current-password"
            />
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </p>
            )}
            <Button type="submit" variant="forest" disabled={loading}>
              {loading ? "Opening…" : "Open inbox"}
            </Button>
          </form>
        </div>
      </section>
    );
  }

  const openCount = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending",
  ).length;

  return (
    <section className="bg-ivory py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
              CRM
            </p>
            <h1 className="mt-1 font-display text-4xl text-forest">
              Consultations
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              {bookings.length} total · {openCount} open
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => void load(token)}
              disabled={loading}
            >
              Refresh
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                sessionStorage.removeItem(TOKEN_KEY);
                setAuthed(false);
                setToken("");
                setInput("");
                setBookings([]);
              }}
            >
              Sign out
            </Button>
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        {bookings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-cream p-10 text-center text-sm text-ink-muted">
            No consultations yet. New web and voice bookings appear here.
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {bookings.map((b) => (
              <li
                key={b.id}
                className="rounded-2xl border border-border bg-cream p-5 shadow-soft md:p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-2xl text-forest">
                        {b.firstName} {b.lastName}
                      </h2>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
                          b.status === "confirmed" &&
                            "bg-forest/10 text-forest",
                          b.status === "pending" && "bg-gold/20 text-gold-dark",
                          b.status === "contacted" &&
                            "bg-blue-50 text-blue-900",
                          b.status === "completed" &&
                            "bg-emerald-50 text-emerald-900",
                          b.status === "cancelled" && "bg-stone/20 text-stone",
                        )}
                      >
                        {b.status}
                      </span>
                      <span className="text-[0.65rem] tracking-wide uppercase text-stone">
                        {b.source}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">
                      {b.projectType} · {b.preferredDate} · {b.timeWindow}
                    </p>
                    <p className="mt-2 text-sm">
                      <a
                        href={`mailto:${b.email}`}
                        className="text-forest underline-offset-2 hover:underline"
                      >
                        {b.email}
                      </a>
                      {" · "}
                      <a
                        href={`tel:${b.phone.replace(/\D/g, "")}`}
                        className="text-forest underline-offset-2 hover:underline"
                      >
                        {b.phone}
                      </a>
                    </p>
                    {b.message ? (
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {b.message}
                      </p>
                    ) : null}
                    <p className="mt-3 text-[0.65rem] tracking-wide text-stone uppercase">
                      {b.id} ·{" "}
                      {new Date(b.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <label className="block shrink-0 text-xs text-stone">
                    Status
                    <select
                      className="mt-1 block w-full min-w-[10rem] rounded-lg border border-forest/15 bg-ivory px-3 py-2 text-sm text-forest"
                      value={b.status}
                      onChange={(e) =>
                        void onStatus(b.id, e.target.value as BookingStatus)
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
