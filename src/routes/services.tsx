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
import { processSteps, services } from "@/lib/data";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      {
        title: "Services | Level Up Tile — Design, Curation & Installation",
      },
      {
        name: "description",
        content:
          "Design consultation, material curation, precision installation, and full project partnership for tile and stone in Greenville, SC.",
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
        description="End-to-end tile and stone partnership—from first conversation to final walkthrough."
        image="https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-shower.jpg"
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => {
              const Icon = icons[s.icon];
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-border bg-cream p-8 shadow-soft"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-forest">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="mt-5 font-display text-2xl text-forest md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
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
            eyebrow="Process"
            title="From vision to finished surface"
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
                <p className="mt-2 text-sm text-cream/65">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button asChild size="lg" variant="gold">
              <Link to="/contact">
                Schedule a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <h2 className="font-display text-3xl text-forest md:text-4xl">
            Who we work with
          </h2>
          <p className="mt-4 text-ink-muted">
            Homeowners renovating signature spaces, interior designers seeking a
            reliable install partner, and builders who need precision tile and
            stone trades that protect the schedule.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Homeowners", "Designers", "Builders", "Remodelers"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-forest/15 bg-ivory px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase text-forest"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
