import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { brand } from "@/lib/data";
import { getSql } from "@/lib/db";
import { notifyLead } from "@/lib/leads";

export const projectTypes = [
  "Primary bath",
  "Kitchen",
  "Powder room",
  "Outdoor / patio",
  "Whole home",
  "Commercial",
  "Other",
] as const;

export const timeWindows = [
  { id: "morning", label: "Morning · 9am–12pm", start: "09:00", end: "12:00" },
  {
    id: "afternoon",
    label: "Afternoon · 12pm–3pm",
    start: "12:00",
    end: "15:00",
  },
  {
    id: "late",
    label: "Late afternoon · 3pm–5pm",
    start: "15:00",
    end: "17:00",
  },
] as const;

export type Booking = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: string;
  timeWindow: string;
  message: string;
  source: "web" | "voice";
  status: "confirmed" | "pending";
};

const bookingSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(160),
  phone: z.string().min(7).max(40),
  projectType: z.string().min(1).max(80),
  preferredDate: z.string().min(8).max(32),
  timeWindow: z.string().min(1).max(40),
  message: z.string().max(2000).optional().default(""),
  source: z.enum(["web", "voice"]).default("web"),
});

export type BookingInput = z.infer<typeof bookingSchema>;

type BookingRow = {
  id: string;
  created_at: string | Date;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  project_type: string;
  preferred_date: string;
  time_window: string;
  message: string;
  source: string;
  status: string;
};

function rowToBooking(r: BookingRow): Booking {
  const created =
    typeof r.created_at === "string"
      ? r.created_at
      : r.created_at.toISOString();
  return {
    id: r.id,
    createdAt: created,
    firstName: r.first_name,
    lastName: r.last_name,
    email: r.email,
    phone: r.phone,
    projectType: r.project_type,
    preferredDate: r.preferred_date,
    timeWindow: r.time_window,
    message: r.message,
    source: r.source === "voice" ? "voice" : "web",
    status: r.status === "pending" ? "pending" : "confirmed",
  };
}

function nextBusinessDates(count = 14): string[] {
  const out: string[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (out.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      out.push(d.toISOString().slice(0, 10));
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/** Ensure bookings schema exists even if a migration was missed at bootstrap. */
async function ensureBookingsTable() {
  const sql = await getSql();
  await sql.query(`
    create table if not exists bookings (
      id text primary key,
      created_at timestamptz not null default now(),
      first_name text not null,
      last_name text not null,
      email text not null,
      phone text not null,
      project_type text not null,
      preferred_date text not null,
      time_window text not null,
      message text not null default '',
      source text not null default 'web',
      status text not null default 'confirmed'
    )
  `);
}

export const getBookingOptions = createServerFn({ method: "GET" }).handler(
  async () => {
    return {
      projectTypes: [...projectTypes],
      timeWindows: timeWindows.map((t) => ({ id: t.id, label: t.label })),
      availableDates: nextBusinessDates(12),
      hours: brand.hours,
      phone: brand.phone,
      email: brand.email,
      location: brand.location,
    };
  },
);

export const submitBooking = createServerFn({ method: "POST" })
  .validator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: true; booking: Booking }> => {
    await ensureBookingsTable();

    const id = `bk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
    const booking: Booking = {
      id,
      createdAt: new Date().toISOString(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      projectType: data.projectType,
      preferredDate: data.preferredDate,
      timeWindow: data.timeWindow,
      message: data.message?.trim() ?? "",
      source: data.source,
      status: "confirmed",
    };

    const sql = await getSql();
    await sql`
      insert into bookings (
        id, created_at, first_name, last_name, email, phone,
        project_type, preferred_date, time_window, message, source, status
      ) values (
        ${booking.id},
        ${booking.createdAt},
        ${booking.firstName},
        ${booking.lastName},
        ${booking.email},
        ${booking.phone},
        ${booking.projectType},
        ${booking.preferredDate},
        ${booking.timeWindow},
        ${booking.message},
        ${booking.source},
        ${booking.status}
      )
    `;

    void notifyLead(booking);

    return { ok: true, booking };
  });

export const listBookings = createServerFn({ method: "GET" }).handler(
  async () => {
    await ensureBookingsTable();
    const sql = await getSql();
    const rows = await sql<BookingRow>`
      select * from bookings order by created_at desc limit 50
    `;
    return { bookings: rows.map(rowToBooking) };
  },
);

export function bookingConfirmationText(b: Booking): string {
  const windowLabel =
    timeWindows.find((t) => t.id === b.timeWindow)?.label ?? b.timeWindow;
  return `Consultation booked for ${b.firstName} ${b.lastName} on ${b.preferredDate} (${windowLabel}) regarding ${b.projectType}. Confirmation id ${b.id}. Our team will follow up at ${b.email} or ${b.phone}.`;
}
