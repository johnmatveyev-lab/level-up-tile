import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Hammer,
  Leaf,
  Lightbulb,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import {
  brand,
  collections,
  processSteps,
  projects,
  values,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "Level Up Tile | Luxury Tile & Stone — Greenville & Upstate SC",
      },
    ],
  }),
});

const valueIcons = [Hammer, Leaf, Lightbulb, MapPin];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden bg-forest-deep">
        <img
          src="/images/hero-main.jpg"
          alt="Luxury bathroom with emerald fish-scale tile and freestanding stone tub"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/72 to-forest-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-forest-deep/20" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-5 py-24 md:px-8">
          <div className="max-w-xl animate-fade-up">
            <p className="mb-5 text-xs font-medium tracking-[0.25em] uppercase text-gold">
              {brand.sub} · {brand.location}
            </p>
            <h1 className="font-display text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl">
              Elevate Every Surface
            </h1>
            <div className="mt-6 flex items-start gap-3 border-l-2 border-gold pl-5">
              <p className="text-base text-cream/90 md:text-lg">
                Premium Tile & Stone Design + Installation
                <br />
                <span className="text-cream/70">Greenville & Upstate SC</span>
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="xl" variant="gold">
                <Link to="/contact">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outlineLight">
                <Link to="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-b border-border bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8 md:py-14">
          {[
            {
              label: "Design + Install",
              text: "One team from sample board to final grout line.",
            },
            {
              label: "Upstate Focused",
              text: "Rooted in Greenville, serving the greater Upstate.",
            },
            {
              label: "Premium Materials",
              text: "Porcelain, natural stone, and artisan tile curated for longevity.",
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-4">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-gold" />
              <div>
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-forest">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm text-ink-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured project / kitchen lifestyle */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <SectionHeading
                eyebrow="Signature Work"
                title="Spaces that feel intentional"
                description="From emerald spa baths to mountain-view kitchens, we craft surfaces that elevate how you live—and how your home is remembered."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Custom layouts and pattern design",
                  "Large-format & natural stone expertise",
                  "Coordination with designers and builders",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-center gap-3 text-sm text-ink-muted"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {line}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8" variant="forest">
                <Link to="/projects">
                  Explore the Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl shadow-card lg:order-2">
              <img
                src="/images/kitchen-hero.jpg"
                alt="Luxury green kitchen with stone island overlooking mountains"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collections preview */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Collections"
              title="Materials that define the room"
              description="Porcelain, natural stone, mosaic, and outdoor surfaces—selected for beauty and performance."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/collections">
                All Collections
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collections.slice(0, 3).map((c) => (
              <Link
                key={c.id}
                to="/collections"
                className="group overflow-hidden rounded-xl bg-ivory shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold-dark">
                    {c.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-forest">
                    {c.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
                    {c.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-forest-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="A clear path to elevated surfaces"
            theme="dark"
            className="mb-14"
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
        </div>
      </section>

      {/* Projects grid */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Projects"
              title="Recent installations"
              description="Baths, kitchens, and outdoor living across Greenville and the Upstate."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <article
                key={p.id}
                className="group overflow-hidden rounded-xl bg-cream"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold-dark">
                    {p.type} · {p.location}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-forest">
                    {p.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-warm py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="What guides every project"
            align="center"
            className="mb-14"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i] ?? Sparkles;
              return (
                <div key={v.title} className="text-center">
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

      {/* About teaser */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-stretch overflow-hidden rounded-2xl bg-cream shadow-soft lg:grid-cols-2">
            <div className="relative min-h-[280px] lg:min-h-0">
              <img
                src="/images/team-photo.jpg"
                alt="Level Up Tile team in the showroom"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <SectionHeading
                eyebrow="Our Story"
                title="Born in Greenville to elevate Upstate living"
                description="We craft exceptional tile and stone installations with precision and soul for discerning homeowners, designers, and builders."
              />
              <Button asChild className="mt-8 w-fit" variant="forest">
                <Link to="/about">
                  Meet the Team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
