import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Hammer,
  Leaf,
  Lightbulb,
  MapPin,
  Mic,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import {
  brand,
  collections,
  copy,
  images,
  processSteps,
  projects,
  values,
} from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: buildMeta({
      title: `${brand.name} | ${brand.sub} — ${brand.location}`,
      description: brand.description,
      path: "/",
      image: images.hero,
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/` }],
  }),
});

const valueIcons = [Hammer, Leaf, Lightbulb, MapPin];

function HomePage() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-forest-deep">
        <img
          src={images.hero}
          alt={`${brand.sub} installation showcase`}
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
              {copy.hero.headline}
            </h1>
            <div className="mt-6 flex items-start gap-3 border-l-2 border-gold pl-5">
              <p className="text-base text-cream/90 md:text-lg">
                {copy.hero.support}
                <br />
                <span className="text-cream/70">{brand.location}</span>
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="xl" variant="gold">
                <Link to="/contact">
                  {copy.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outlineLight">
                <Link to="/projects">{copy.hero.ctaSecondary}</Link>
              </Button>
              <Button
                type="button"
                size="xl"
                variant="outlineLight"
                className="gap-2"
                onClick={() => {
                  document
                    .querySelector<HTMLButtonElement>(
                      '[aria-label="Speak with Aria, voice agent"]',
                    )
                    ?.click();
                }}
              >
                <Mic className="h-4 w-4" />
                Talk to Aria
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8 md:py-14">
          {copy.highlights.map((item) => (
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

      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <SectionHeading
                eyebrow={copy.signature.eyebrow}
                title={copy.signature.title}
                description={copy.signature.description}
              />
              <ul className="mt-8 space-y-4">
                {copy.signature.bullets.map((line) => (
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
                  {copy.signature.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl shadow-card lg:order-2">
              <img
                src={images.kitchen}
                alt="Luxury kitchen with stone surfaces"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={copy.collectionsIntro.eyebrow}
              title={copy.collectionsIntro.title}
              description={copy.collectionsIntro.description}
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

      <section className="bg-forest-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow={copy.processIntro.eyebrow}
            title={copy.processIntro.title}
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

      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={copy.projectsIntro.eyebrow}
              title={copy.projectsIntro.title}
              description={copy.projectsIntro.description}
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

      <section className="bg-cream-warm py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow={copy.valuesIntro.eyebrow}
            title={copy.valuesIntro.title}
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

      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-stretch overflow-hidden rounded-2xl bg-cream shadow-soft lg:grid-cols-2">
            <div className="relative min-h-[280px] lg:min-h-0">
              <img
                src={images.team}
                alt={`${brand.name} team`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <SectionHeading
                eyebrow={copy.aboutTeaser.eyebrow}
                title={copy.aboutTeaser.title}
                description={copy.aboutTeaser.description}
              />
              <Button asChild className="mt-8 w-fit" variant="forest">
                <Link to="/about">
                  {copy.aboutTeaser.cta}
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
