# Voice agents — Level Up Tile

Verified from source on 2026-10-13. Env vars are listed by NAME only.

## Aria (website voice concierge)
| Item | Value |
|---|---|
| Platform | xAI Grok Voice realtime API (`wss://api.x.ai/v1/realtime`), model `grok-voice-latest`, voice `eve` (`src/lib/voice/session.ts`) |
| xAI account / agent name in console | unknown, needs confirmation (agent is configured in code, not in an xAI dashboard) |
| Wiring | Browser calls server fn `createVoiceSession` → mints an ephemeral token at `https://api.x.ai/v1/realtime/client_secrets` using `XAI_API_KEY` → browser opens the WebSocket directly. Without a key, `src/lib/voice/demo-engine.ts` answers in demo mode. |
| Answers | Website visitors who click the voice widget (`src/components/VoiceAgent.tsx`). It does not place or receive phone calls. |
| Tool | `book_consultation` → `submitBooking` (`src/lib/booking.ts`), same path as the web booking form |
| Prompt | Built in `src/lib/voice/knowledge.ts` (`buildAgentInstructions`), see quote below |
| Lead destination | Postgres `bookings` table (`DATABASE_URL`, `migrations/0002_bookings.sql`); email via Resend (`RESEND_API_KEY`, `RESEND_FROM`, `LEAD_NOTIFY_EMAIL` / `BOOKING_NOTIFY_EMAIL`, `LEAD_CLIENT_EMAIL`); optional webhook `LEAD_WEBHOOK_URL`; CRM view at `/admin` (gated by `ADMIN_TOKEN`) |
| Phone number | None verified. The site shows the placeholder `(864) 555-0142` (`src/lib/data.ts`). The real number is unknown and needs confirmation. |
| Schedules / cron | None in repo |

Prompt (quoted from `buildAgentInstructions`):
> You are the voice concierge for ${brand.name}, a ${brand.sub} company in ${brand.location}.
> Your name is Aria, the ${brand.name} design assistant powered by Grok Voice (xAI).
> Goals: 1. Answer questions about the company, services, collections, projects, process, hours, and tile/stone best practices using ONLY the knowledge base below. 2. Help homeowners, designers, and builders understand options and next steps. 3. Book design consultations using the book_consultation tool when the caller is ready. 4. If you lack a fact (exact pricing, live inventory, crew schedule), say so and offer to book a consult or leave contact details.
> Rules: Speak naturally for voice … Confirm booking details before calling book_consultation … Never claim you can process payments.

## Known gaps
- No telephony (Twilio or other) is wired, so phone callers never reach Aria.
- Placeholder 555 phone number is on the site and gets read out by the agent.
- `ADMIN_TOKEN` must be set in Vercel. Since this change `/admin` fails closed without it; the old hardcoded fallback token has been removed.
