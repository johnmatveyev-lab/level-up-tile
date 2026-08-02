import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, CalendarDays, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getBookingOptions,
  googleCalendarUrl,
  submitBooking,
  type Booking,
} from "@/lib/booking";
import { brand } from "@/lib/data";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Options = Awaited<ReturnType<typeof getBookingOptions>>;

export function BookingWidget({ className }: { className?: string }) {
  const [options, setOptions] = useState<Options | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const opts = await getBookingOptions();
        if (!cancelled) setOptions(opts);
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Could not load booking options",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    track("book_consult_submit", { source: "web" });
    const fd = new FormData(e.currentTarget);
    try {
      const result = await submitBooking({
        data: {
          firstName: String(fd.get("firstName") ?? ""),
          lastName: String(fd.get("lastName") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          projectType: String(fd.get("projectType") ?? ""),
          preferredDate: String(fd.get("preferredDate") ?? ""),
          timeWindow: String(fd.get("timeWindow") ?? ""),
          message: String(fd.get("message") ?? ""),
          source: "web",
        },
      });
      setBooking(result.booking);
      track("book_consult_success", {
        source: "web",
        projectType: result.booking.projectType,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border bg-cream p-8 text-sm text-ink-muted",
          className,
        )}
      >
        Loading booking calendar…
      </div>
    );
  }

  if (booking) {
    const windowLabel =
      options?.timeWindows.find((t) => t.id === booking.timeWindow)?.label ??
      booking.timeWindow;
    const calUrl = googleCalendarUrl(booking);
    return (
      <div
        className={cn(
          "flex flex-col items-center rounded-2xl border border-border bg-cream p-8 text-center shadow-soft md:p-10",
          className,
        )}
        data-testid="booking-success"
      >
        <CheckCircle2
          className="h-12 w-12 text-forest-soft"
          strokeWidth={1.5}
        />
        <h3 className="mt-4 font-display text-3xl text-forest">
          Consultation booked
        </h3>
        <p className="mt-3 max-w-md text-sm text-ink-muted">
          Thanks, {booking.firstName}. We reserved{" "}
          <strong className="text-forest">{booking.preferredDate}</strong> (
          {windowLabel}) for your {booking.projectType.toLowerCase()} project.
        </p>
        <p className="mt-2 text-xs tracking-[0.12em] uppercase text-stone">
          Confirmation · {booking.id}
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          We'll follow up at {booking.email} or {booking.phone}. Prefer a
          call? {brand.phone}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="forest">
            <a href={calUrl} target="_blank" rel="noreferrer">
              Add to Google Calendar
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={() => setBooking(null)}
          >
            Book another time
          </Button>
        </div>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-lg border border-forest/15 bg-ivory px-3.5 py-2.5 text-sm text-forest outline-none transition-colors placeholder:text-stone focus:border-gold focus:ring-2 focus:ring-gold/25";

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-cream p-6 shadow-soft md:p-8",
        className,
      )}
      id="book"
      data-testid="booking-widget"
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-forest-soft">
          <CalendarDays className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-display text-2xl text-forest md:text-3xl">
            Book a consultation
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Choose a weekday slot. Showroom or on-site in {brand.location}.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              First name <span className="text-gold-dark">*</span>
            </span>
            <input
              name="firstName"
              required
              className={field}
              autoComplete="given-name"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              Last name <span className="text-gold-dark">*</span>
            </span>
            <input
              name="lastName"
              required
              className={field}
              autoComplete="family-name"
            />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              Email <span className="text-gold-dark">*</span>
            </span>
            <input
              name="email"
              type="email"
              required
              className={field}
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              Phone <span className="text-gold-dark">*</span>
            </span>
            <input
              name="phone"
              type="tel"
              required
              className={field}
              autoComplete="tel"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
            Project type <span className="text-gold-dark">*</span>
          </span>
          <select name="projectType" required className={field} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {options?.projectTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              Preferred date <span className="text-gold-dark">*</span>
            </span>
            <select
              name="preferredDate"
              required
              className={field}
              defaultValue={options?.availableDates[0] ?? ""}
            >
              {options?.availableDates.map((d) => (
                <option key={d} value={d}>
                  {new Date(d + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.12em] uppercase text-stone">
              <Clock className="h-3.5 w-3.5" />
              Time window <span className="text-gold-dark">*</span>
            </span>
            <select
              name="timeWindow"
              required
              className={field}
              defaultValue="morning"
            >
              {options?.timeWindows.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
            Project notes
          </span>
          <textarea
            name="message"
            rows={4}
            className={cn(field, "min-h-[100px] resize-y")}
            placeholder="Rooms, materials, timeline…"
          />
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          variant="gold"
          className="w-full sm:w-auto"
          disabled={sending}
        >
          {sending ? "Booking…" : "Confirm consultation"}
        </Button>
        <p className="text-xs text-stone">
          Hours: {options?.hours ?? brand.hours}. Or talk to Aria with the voice
          button.
        </p>
      </form>
    </div>
  );
}
