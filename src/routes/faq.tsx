import { createFileRoute } from "@tanstack/react-router";
import { brand, faqs, pageTitle } from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/data";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: buildMeta({
      title: pageTitle("FAQ"),
      description: `Frequently asked questions about ${brand.name} tile design, install, pricing, and service areas.`,
      path: "/faq",
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/faq` }],
  }),
});

function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero
        eyebrow="Questions"
        title="FAQ"
        description="Straight answers on pricing, process, warranties, and where we work."
        image={images.collections}
        compact
      />
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-4 px-5 md:px-8">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-cream px-5 py-4 shadow-soft open:shadow-card"
            >
              <summary className="cursor-pointer list-none font-display text-xl text-forest marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {f.q}
                  <span className="mt-1 text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
