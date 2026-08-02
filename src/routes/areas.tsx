import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import { brand, pageTitle, serviceAreas } from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/data";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/areas")({
  component: AreasPage,
  head: () => ({
    meta: buildMeta({
      title: pageTitle("Service Areas"),
      description: brand.serving,
      path: "/areas",
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/areas` }],
  }),
});

function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Local"
        title="Service areas"
        description={brand.serving}
        image={images.patio}
        compact
      />
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                to="/areas/$slug"
                params={{ slug: area.slug }}
                className="group rounded-2xl border border-border bg-cream p-6 shadow-soft transition-shadow hover:shadow-card md:p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-forest-soft">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2 className="mt-4 font-display text-2xl text-forest md:text-3xl">
                  {area.name}, SC
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {area.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest">
                  View area
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
