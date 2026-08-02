# Tile Contractor Website Template

Production-ready marketing site for **tile & stone contractors**.

**Demo:** Level Up Tile · Greenville & Upstate SC  
**Live:** [level-up-tile.vercel.app](https://level-up-tile.vercel.app)

---

## What’s included

| Area | Features |
| --- | --- |
| Marketing | Home, collections, projects (before/after), services, about, testimonials |
| Local SEO | Service areas (Greenville, TR, Simpsonville, Greer) + FAQ + AggregateRating schema |
| Booking | Persistent consultations + ballpark estimator + Google Calendar link |
| Leads | Resend (owner + client + ICS) + CRM webhook + **/admin** inbox |
| Voice | Aria — xAI Grok Voice agent + knowledge base (demo fallback) |
| Trust | Warranty, privacy, terms |
| SEO | Meta, OG/Twitter, JSON-LD, sitemap, robots |
| Analytics | GA4 + Plausible (env-driven) |

---

## Rebrand

Edit **`src/lib/data.ts`** (brand, copy, areas, FAQs, collections, projects, testimonials).

Replace the demo phone (`(864) 555-0142`), email, social links, and photos before paid ads.

---

## Environment variables

Copy `.env.example` → set on Vercel:

| Variable | Purpose |
| --- | --- |
| `XAI_API_KEY` | Full Grok Voice for Aria |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` | Email new bookings + client confirmation + ICS |
| `LEAD_WEBHOOK_URL` | Zapier/Make/CRM |
| `ADMIN_TOKEN` | Protect `/admin` lead CRM (default local: `levelup-admin`) |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible |
| `VITE_SITE_URL` | Canonical URL |
| `DATABASE_URL` | Neon/Postgres (else PGLite — resets on cold start) |

Without keys, the site still runs: demo voice, in-process DB, bookings logged server-side.

---

## Develop

```bash
npm run dev       # http://0.0.0.0:8080
npm run typecheck
npm run build
```

**Admin CRM:** open `/admin` with token `levelup-admin` (or `ADMIN_TOKEN`).

---

## Deploy notes

- Production DB: set `DATABASE_URL` (Neon) so consultations persist across deploys.
- Voice: set `XAI_API_KEY` for live Aria; otherwise demo Q&A mode.
- Email: verify a Resend domain; until then `onboarding@resend.dev` only emails the account owner.
