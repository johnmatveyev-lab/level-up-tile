# Tile Contractor Website Template

Production-ready marketing site for **tile & stone contractors**.

**Demo:** Level Up Tile · Greenville & Upstate SC  
**Live:** [level-up-tile.vercel.app](https://level-up-tile.vercel.app)

---

## What’s included

| Area | Features |
| --- | --- |
| Marketing | Home, collections, projects (before/after), services, about |
| Local SEO | Service areas (Greenville, TR, Simpsonville, Greer) + FAQ schema |
| Booking | Persistent consultations (Postgres/PGLite) + ballpark estimator |
| Leads | Resend email + optional CRM webhook |
| Voice | Aria — xAI Grok Voice agent + knowledge base (demo fallback) |
| Trust | Warranty, privacy, terms |
| SEO | Meta, OG/Twitter, JSON-LD, sitemap, robots |
| Analytics | GA4 + Plausible (env-driven) |

---

## Rebrand

Edit **`src/lib/data.ts`** (brand, copy, areas, FAQs, collections, projects).

---

## Environment variables

Copy `.env.example` → set on Vercel:

| Variable | Purpose |
| --- | --- |
| `XAI_API_KEY` | Full Grok Voice for Aria |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` | Email new bookings |
| `LEAD_WEBHOOK_URL` | Zapier/Make/CRM |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible |
| `VITE_SITE_URL` | Canonical URL |
| `DATABASE_URL` | Neon/Postgres (else PGLite) |

Without keys, the site still runs: demo voice, in-process DB, bookings logged server-side.

---

## Develop

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

---

## Stack

React 19 · TypeScript · TanStack Start · Tailwind v4 · Vite 8 · Vercel/Nitro · PGLite/Postgres
