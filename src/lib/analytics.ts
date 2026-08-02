/**
 * Client analytics helpers — GA4 and/or Plausible.
 * Set VITE_GA_MEASUREMENT_ID and/or VITE_PLAUSIBLE_DOMAIN.
 */

export type AnalyticsEvent =
  | "book_consult_submit"
  | "book_consult_success"
  | "voice_agent_open"
  | "voice_agent_start"
  | "phone_click"
  | "email_click"
  | "quote_estimate"
  | "cta_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

export function getGaId(): string | undefined {
  return import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || undefined;
}

export function getPlausibleDomain(): string | undefined {
  return import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim() || undefined;
}

export function track(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", event, props ?? {});
  } catch {
    /* ignore */
  }

  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* ignore */
  }

  if (import.meta.env.DEV) {
    console.debug("[analytics]", event, props);
  }
}
