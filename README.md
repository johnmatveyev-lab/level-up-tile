# Tile Contractor Website Template

Production-ready marketing site for **tile & stone contractors**, with:

- Luxury multi-page marketing experience
- **Booking widget** (consultation scheduling)
- **xAI Grok Voice agent (“Aria”)** with full site + industry knowledge base
- SEO (meta, Open Graph, Twitter, JSON-LD, sitemap, robots)

**Demo brand:** Level Up Tile (Greenville & Upstate SC)  
**Live:** [level-up-tile.vercel.app](https://level-up-tile.vercel.app)

---

## Rebrand (5 minutes)

Edit **`src/lib/data.ts`** only:

| Section | What to change |
| --- | --- |
| `brand` | Name, initials, tagline, phone, email, location |
| `copy` | Hero, CTAs, about, contact copy |
| `images` | Photos |
| `collections` / `projects` / `services` | Catalog content |

Voice knowledge rebuilds automatically from that data (`src/lib/voice/knowledge.ts`).

---

## xAI Voice Agent (Aria)

Floating **Talk to Aria** button on every page.

| Mode | When | Behavior |
| --- | --- | --- |
| **Grok Voice (xAI)** | `XAI_API_KEY` set | Realtime speech-to-speech via `wss://api.x.ai/v1/realtime`, ephemeral tokens from `/v1/realtime/client_secrets` |
| **Demo** | No key | On-device speech recognition + TTS using the same knowledge base |

### Setup for production Grok Voice

1. Create an API key at [console.x.ai](https://console.x.ai)
2. Set env var: `XAI_API_KEY=xai-...`
3. Redeploy (Vercel project settings → Environment Variables)

The agent:

- Is instructed as **Aria**, design concierge for the brand
- Loads the full company + collections + projects + services + tile industry KB
- Can call **`book_consultation`** to create real bookings (same store as the web form)

Knowledge sources:

- Runtime: `src/lib/voice/knowledge.ts`
- Static pack: `public/knowledge/level-up-tile-kb.md`

---

## Booking widget

`/contact` includes a full consultation booker:

- Weekday date options
- Morning / afternoon / late windows
- Project type + notes
- Confirmation ID on success

Server functions: `src/lib/booking.ts` (in-memory store — swap for CRM/email in production).

Voice and web share the same booking API.

---

## SEO

- Per-route titles, descriptions, keywords, geo
- Open Graph + Twitter cards
- Canonical URLs
- `LocalBusiness` JSON-LD (`HomeAndConstructionBusiness`)
- `/robots.txt` + `/sitemap.xml`

Configure public URL with `VITE_SITE_URL` (defaults to production domain).

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home + Talk to Aria CTA |
| `/collections` | Materials |
| `/projects` | Portfolio |
| `/services` | Services + process |
| `/about` | Story + values |
| `/contact` | Booking widget + contact |

---

## Stack

React 19, TypeScript, TanStack Start, Tailwind v4, Vite 8, Vercel/Nitro.

```bash
npm install
npm run dev
npm run build
npm run typecheck
```

### Env

| Variable | Required | Purpose |
| --- | --- | --- |
| `XAI_API_KEY` | For live voice | Grok Voice ephemeral tokens |
| `VITE_SITE_URL` | Optional | Canonical site URL for SEO |
