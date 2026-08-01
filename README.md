# Tile Contractor Website Template

A production-ready marketing site for **tile & stone contractors** — design consultation, material collections, project portfolio, services, about, and lead-capture contact form.

**Demo brand:** Level Up Tile (Greenville & Upstate SC)  
**Live:** [level-up-tile.vercel.app](https://level-up-tile.vercel.app)

---

## Rebrand for your contractor (5 minutes)

Everything company-specific lives in **one file**:

```
src/lib/data.ts
```

| Section | What to change |
| --- | --- |
| `brand` | Name, initials, tagline, phone, email, location, SEO description |
| `copy` | Hero, CTAs, about story, contact success message |
| `images` | Photo filenames / URLs (see `public/images/`) |
| `collections` | Material categories you sell |
| `projects` | Portfolio case studies |
| `services` | Service offerings |
| `values` / `processSteps` | Brand values & process |

### Quick rebrand checklist

1. Edit `brand.name`, `brand.initials`, `brand.tagline`, `brand.sub`
2. Set `phone`, `email`, `address`, `location`, `serving`
3. Replace project locations and copy with your market
4. Drop your photos into `public/images/` (or point `images.*` at CDN URLs)
5. Update `package.json` `name` and this README

No other files need edits for a standard contractor rebrand — logo, footer, SEO titles, CTAs, and pages all pull from `data.ts`.

---

## Pages included

| Route | Purpose |
| --- | --- |
| `/` | Hero, highlights, signature work, collections preview, process, projects, values, about teaser, CTA |
| `/collections` | Material catalog grid |
| `/projects` | Portfolio with materials tags |
| `/services` | Services + process |
| `/about` | Story + values |
| `/contact` | Lead form + contact details |

---

## Design system

Forest green + champagne gold + cream luxury palette (tailored for tile/stone brands).

- Display: Cormorant Garamond  
- Body: Outfit  
- Tokens: `src/styles.css` (`@theme`)

To recolor: change CSS variables in `src/styles.css` and `brand.themeColor` in `data.ts`.

---

## Stack

- React 19 + TypeScript  
- TanStack Start / Router  
- Tailwind CSS v4  
- Vite 8  
- Deploy target: Vercel (Nitro preset)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run typecheck
```

## Template notes

- Contact form is **demo UX** (success state client-side). Hook to Formspree, Resend, or your CRM in `src/routes/contact.tsx`.
- Images ship under `public/images/`; `data.ts` also resolves a CDN fallback for demos.
- Auth/multiplayer scaffolding from the base kit is unused by this marketing template and can stay as-is.
