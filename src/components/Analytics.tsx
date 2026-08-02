import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { getGaId, getPlausibleDomain } from "@/lib/analytics";

/**
 * Injects GA4 + Plausible scripts when env IDs are present,
 * and sends page_view on client navigations.
 */
export function Analytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const gaId = getGaId();
  const plausible = getPlausibleDomain();

  useEffect(() => {
    if (gaId && !document.getElementById("ga4-src")) {
      const s = document.createElement("script");
      s.id = "ga4-src";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(s);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId, { send_page_view: false });
    }

    if (plausible && !document.getElementById("plausible-src")) {
      const s = document.createElement("script");
      s.id = "plausible-src";
      s.defer = true;
      s.dataset.domain = plausible;
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }
  }, [gaId, plausible]);

  useEffect(() => {
    if (gaId && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname, gaId]);

  return null;
}
