import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  Hammer,
  PackageSearch,
  Ruler,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/ui/button";
import {
  brand,
  copy,
  images,
  pageDescription,
  pageTitle,
  processSteps,
  services,
} from "@/lib/data";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: pageTitle("Services") },
      {
        name: "description",
        content: pageDescription(
          `Design consultation, material curation, and precision installation from ${brand.name}.`,
        ),
      },
    ],
  }),
});

const icons = {
  consult: ClipboardList,
  source: PackageSearch,
  install: Hammer,
  design: Ruler,
};

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Services"
        description={copy.servicesPage.description}
        image={images.marbleBath}
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => {
              const Icon = icons[s.icon];
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-border bg-cream p-7 shadow-soft md:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-forest-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="mt-5 font-display text-2xl text-forest">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-forest-deep py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow={copy.processIntro.eyebrow}
            title={copy.processIntro.title}
            theme="dark"
            className="mb-12"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <div key={s.step} className="border-t border-gold/40 pt-6">
                <p className="font-display text-3xl text-gold">{s.step}</p>
                <h3 className="mt-3 font-display text-xl text-cream">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-12" size="lg" variant="gold">
            <Link to="/contact">
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
