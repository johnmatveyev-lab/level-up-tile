/**
 * Lead delivery: Resend email (owner + client) + optional CRM webhook + ICS.
 * Configure via env — gracefully no-ops when unset so preview still works.
 */
import type { Booking } from "@/lib/booking";
import { brand } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export type LeadNotifyResult = {
  emailSent: boolean;
  clientEmailSent: boolean;
  webhookSent: boolean;
  errors: string[];
};

const WINDOW_META: Record<string, { label: string; start: string; end: string }> =
  {
    morning: {
      label: "Morning · 9am–12pm",
      start: "09:00",
      end: "12:00",
    },
    afternoon: {
      label: "Afternoon · 12pm–3pm",
      start: "12:00",
      end: "15:00",
    },
    late: {
      label: "Late afternoon · 3pm–5pm",
      start: "15:00",
      end: "17:00",
    },
  };

function windowMeta(id: string) {
  return (
    WINDOW_META[id] ?? {
      label: id,
      start: "09:00",
      end: "12:00",
    }
  );
}

function windowLabel(id: string) {
  return windowMeta(id).label;
}

function escapeIcs(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Build a simple VEVENT for the consultation window (America/New_York). */
export function buildIcs(b: Booking): string {
  const tw = windowMeta(b.timeWindow);
  const dtStart = `${b.preferredDate.replace(/-/g, "")}T${tw.start.replace(":", "")}00`;
  const dtEnd = `${b.preferredDate.replace(/-/g, "")}T${tw.end.replace(":", "")}00`;
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const summary = escapeIcs(
    `${brand.name} consultation — ${b.projectType}`,
  );
  const description = escapeIcs(
    [
      `Confirmation: ${b.id}`,
      `Guest: ${b.firstName} ${b.lastName}`,
      `Phone: ${b.phone}`,
      `Email: ${b.email}`,
      b.message ? `Notes: ${b.message}` : "",
      `Site: ${siteUrl}/contact`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Level Up Tile//Consult//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${b.id}@leveluptile.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=America/New_York:${dtStart}`,
    `DTEND;TZID=America/New_York:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapeIcs(brand.location)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
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
    <p style="margin-top:24px;font-size:12px;color:#666">CRM: ${siteUrl}/admin</p>
  </div>`;
}

function clientHtml(b: Booking): string {
  return `
  <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a18">
    <h2 style="color:#0f2e24">You're booked — ${brand.name}</h2>
    <p>Hi ${b.firstName},</p>
    <p>Thanks for requesting a consultation. Here's what we have on file:</p>
    <ul>
      <li><strong>When:</strong> ${b.preferredDate} · ${windowLabel(b.timeWindow)}</li>
      <li><strong>Project:</strong> ${b.projectType}</li>
      <li><strong>Confirmation:</strong> ${b.id}</li>
    </ul>
    <p>We'll follow up shortly to confirm showroom vs on-site. Questions? Call
    <a href="tel:${brand.phone.replace(/\D/g, "")}">${brand.phone}</a> or reply to this email.</p>
    <p style="margin-top:24px;font-size:13px;color:#555">${brand.name} · ${brand.location}<br/>
    <a href="${siteUrl}">${siteUrl}</a></p>
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

function clientText(b: Booking): string {
  return [
    `You're booked — ${brand.name}`,
    `Hi ${b.firstName},`,
    `When: ${b.preferredDate} · ${windowLabel(b.timeWindow)}`,
    `Project: ${b.projectType}`,
    `Confirmation: ${b.id}`,
    `We'll follow up shortly. Call ${brand.phone} with questions.`,
  ].join("\n");
}

async function resendEmail(payload: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  ics?: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) throw new Error("RESEND_API_KEY not set");

  const from =
    process.env.RESEND_FROM?.trim() ||
    `${brand.name} <onboarding@resend.dev>`;

  const body: Record<string, unknown> = {
    from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  };
  if (payload.replyTo) body.reply_to = payload.replyTo;
  if (payload.ics) {
    body.attachments = [
      {
        filename: "consultation.ics",
        content: Buffer.from(payload.ics, "utf8").toString("base64"),
      },
    ];
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${errBody.slice(0, 200)}`);
  }
}

async function sendOwnerEmail(b: Booking): Promise<string | null> {
  if (!process.env.RESEND_API_KEY?.trim()) return null;

  const to =
    process.env.LEAD_NOTIFY_EMAIL?.trim() ||
    process.env.BOOKING_NOTIFY_EMAIL?.trim() ||
    brand.email;

  await resendEmail({
    to: [to],
    replyTo: b.email,
    subject: `[${brand.name}] New consult — ${b.firstName} ${b.lastName} · ${b.projectType}`,
    html: bookingHtml(b),
    text: bookingText(b),
    ics: buildIcs(b),
  });
  return to;
}

async function sendClientEmail(b: Booking): Promise<boolean> {
  if (!process.env.RESEND_API_KEY?.trim()) return false;
  if (process.env.LEAD_CLIENT_EMAIL === "false") return false;

  await resendEmail({
    to: [b.email],
    replyTo: process.env.LEAD_NOTIFY_EMAIL?.trim() || brand.email,
    subject: `Consultation confirmed — ${brand.name} · ${b.preferredDate}`,
    html: clientHtml(b),
    text: clientText(b),
    ics: buildIcs(b),
  });
  return true;
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
      ics: buildIcs(b),
      adminUrl: `${siteUrl}/admin`,
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
    clientEmailSent: false,
    webhookSent: false,
    errors: [],
  };

  try {
    const to = await sendOwnerEmail(booking);
    result.emailSent = Boolean(to);
  } catch (e) {
    result.errors.push(e instanceof Error ? e.message : "email failed");
  }

  try {
    result.clientEmailSent = await sendClientEmail(booking);
  } catch (e) {
    result.errors.push(
      e instanceof Error ? e.message : "client email failed",
    );
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
