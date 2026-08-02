import { createFileRoute } from "@tanstack/react-router";
import { brand, pageTitle } from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: buildMeta({
      title: pageTitle("Terms of Use"),
      description: `Website terms of use for ${brand.name}.`,
      path: "/terms",
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/terms` }],
  }),
});

function TermsPage() {
  return (
    <article className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl text-forest md:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-ink-muted">
          Last updated: August 2, 2026 · {brand.name}
        </p>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink-muted md:text-base">
          <p>
            By using this website you agree to these terms. If you do not agree,
            please do not use the site.
          </p>
          <h2 className="font-display text-2xl text-forest">Services</h2>
          <p>
            Content on this site describes tile and stone design and installation
            services in {brand.location}. Project pricing, timelines, and scope
            are confirmed only in a written proposal or contract.
          </p>
          <h2 className="font-display text-2xl text-forest">Bookings & estimates</h2>
          <p>
            Online booking requests and ballpark estimators are informational.
            A consultation is not a binding contract until both parties agree in
            writing. We may decline or reschedule appointments as needed.
          </p>
          <h2 className="font-display text-2xl text-forest">Intellectual property</h2>
          <p>
            Site design, text, logos, and photographs are owned by {brand.name} or
            our licensors. You may not copy or reuse them without permission.
          </p>
          <h2 className="font-display text-2xl text-forest">Limitation of liability</h2>
          <p>
            The website is provided “as is.” To the fullest extent permitted by
            law, we are not liable for indirect or consequential damages arising
            from use of the site. Project workmanship is governed by your signed
            agreement and warranty terms.
          </p>
          <h2 className="font-display text-2xl text-forest">Governing law</h2>
          <p>
            These terms are governed by the laws of the State of South Carolina,
            without regard to conflict-of-law principles.
          </p>
          <h2 className="font-display text-2xl text-forest">Contact</h2>
          <p>
            {brand.email} · {brand.phone} · {brand.address}
          </p>
        </div>
      </div>
    </article>
  );
}
