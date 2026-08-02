/**
 * Lead delivery: Resend email + optional webhook (Zapier/Make/CRM).
 * Configure via env — gracefully no-ops when unset so preview still works.
 */
import type { Booking } from "@/lib/booking";
import { brand } from "@/lib/data";

export type LeadNotifyResult = {
  emailSent: boolean;
  webhookSent: boolean;
  errors: string[];
};

const WINDOW_LABELS: Record<string, string> = {
  morning: "Morning · 9am–12pm",
  afternoon: "Afternoon · 12pm–3pm",
  late: "Late afternoon · 3pm–5pm",
};

function windowLabel(id: string) {
  return WINDOW_LABELS[id] ?? id;
}

function bookingHtml(b: Booking): string {
  return `
  <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a18">
    <h2 style="color:#0f2e24">New consultation — ${brand.name}</h2>
    <p><strong>ID:</strong> ${b.id}</p>
    <p><strong>Name:</strong> ${b.firstName} ${b.lastName}</p>
    <p><strong>Email:</strong> <a href="mailto:${b.email}">${b.email}</a></p>
    <p><strong>Phone:</strong> <a href="tel:${b.phone}">${b.phone}</a></p>
    <p><strong>Project:</strong> ${b.projectType}</p>
    <p><strong>Preferred:</strong> ${b.preferredDate} · ${windowLabel(b.timeWindow)}</p>
    <p><strong>Source:</strong> ${b.source}</p>
    <p><strong>Notes:</strong><br/>${(b.message || "—").replace(/\n/g, "<br/>")}</p>
  </div>`;
}

function bookingText(b: Booking): string {
  return [
    `New consultation — ${brand.name}`,
    `ID: ${b.id}`,
    `Name: ${b.firstName} ${b.lastName}`,
    `Email: ${b.email}`,
    `Phone: ${b.phone}`,
    `Project: ${b.projectType}`,
    `Preferred: ${b.preferredDate} · ${windowLabel(b.timeWindow)}`,
    `Source: ${b.source}`,
    `Notes: ${b.message || "—"}`,
  ].join("\n");
}

async function sendResend(b: Booking): Promise<string | null> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;

  const to =
    process.env.LEAD_NOTIFY_EMAIL?.trim() ||
    process.env.BOOKING_NOTIFY_EMAIL?.trim() ||
    brand.email;
  const from =
    process.env.RESEND_FROM?.trim() ||
    `${brand.name} <onboarding@resend.dev>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: b.email,
      subject: `[${brand.name}] New consult — ${b.firstName} ${b.lastName} · ${b.projectType}`,
      html: bookingHtml(b),
      text: bookingText(b),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
  }
  return to;
}

async function sendWebhook(b: Booking): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!url) return false;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "consultation.booked",
      brand: brand.name,
      booking: b,
      text: bookingText(b),
    }),
  });
  if (!res.ok) {
    throw new Error(`Webhook ${res.status}`);
  }
  return true;
}

/** Fire-and-document lead delivery; never throws to the client. */
export async function notifyLead(booking: Booking): Promise<LeadNotifyResult> {
  const result: LeadNotifyResult = {
    emailSent: false,
    webhookSent: false,
    errors: [],
  };

  try {
    const to = await sendResend(booking);
    result.emailSent = Boolean(to);
  } catch (e) {
    result.errors.push(e instanceof Error ? e.message : "email failed");
  }

  try {
    result.webhookSent = await sendWebhook(booking);
  } catch (e) {
    result.errors.push(e instanceof Error ? e.message : "webhook failed");
  }

  if (!result.emailSent && !result.webhookSent) {
    console.info("[leads] booking stored (no email/webhook configured)", {
      id: booking.id,
      email: booking.email,
    });
  }

  return result;
}
