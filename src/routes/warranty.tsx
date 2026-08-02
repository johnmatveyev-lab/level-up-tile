import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { brand, pageTitle, warranty } from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/data";

export const Route = createFileRoute("/warranty")({
  component: WarrantyPage,
  head: () => ({
    meta: buildMeta({
      title: pageTitle("Warranty"),
      description: warranty.summary,
      path: "/warranty",
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/warranty` }],
  }),
});

function WarrantyPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust"
        title={warranty.title}
        description={warranty.summary}
        image={images.marbleBath}
        compact
      />
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {warranty.points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-cream p-6 shadow-soft md:p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-forest-soft">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2 className="mt-4 font-display text-2xl text-forest">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-ink-muted">{brand.licenseNote}.</p>
          <Button asChild className="mt-6" variant="forest">
            <Link to="/contact">Discuss your project</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
