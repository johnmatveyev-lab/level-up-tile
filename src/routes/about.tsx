import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Hammer, Leaf, Lightbulb, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/ui/button";
import { values } from "@/lib/data";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: "About | Level Up Tile — Greenville Luxury Tile & Stone",
      },
      {
        name: "description",
        content:
          "Born in Greenville to elevate Upstate living. Meet Level Up Tile—craftsmanship, sustainability, innovation, and local pride.",
      },
    ],
  }),
});

const valueIcons = [Hammer, Leaf, Lightbulb, MapPin];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Level Up Tile"
        description="Born in Greenville to elevate Upstate living."
        image="/images/hero-marble-bath.jpg"
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img
                src="/images/team-photo.jpg"
                alt="Level Up Tile team with tile samples in the showroom"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Craft with precision and soul"
                description="We craft exceptional tile and stone installations with precision and soul for discerning homeowners, designers, and builders. Every project is an opportunity to raise the standard of how surfaces look, feel, and last."
              />
              <p className="mt-5 text-sm leading-relaxed text-ink-muted md:text-base">
                From material selection to the final polish, our team treats
                your home with the care of a custom craft studio—clear
                communication, protected job sites, and finishes that reward a
                closer look.
              </p>
              <Button asChild className="mt-8" variant="forest">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="What we stand for"
            align="center"
            className="mb-14"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i] ?? Hammer;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border bg-ivory p-6 text-center shadow-soft"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-forest-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-body text-xs font-medium tracking-[0.18em] uppercase text-forest">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-deep py-20 md:py-28">
        <img
          src="/images/hero-marble-bath.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-forest-deep/75" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="font-display text-3xl italic text-gold-light md:text-4xl">
            Elevate every surface.
          </p>
          <p className="mt-6 text-sm tracking-[0.2em] uppercase text-cream/60">
            Greenville · Upstate South Carolina
          </p>
        </div>
      </section>

      <CtaBand image="/images/cta-hex.jpg" />
    </>
  );
}
