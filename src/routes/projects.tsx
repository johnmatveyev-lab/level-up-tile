import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import {
  brand,
  copy,
  images,
  pageDescription,
  pageTitle,
  projects,
} from "@/lib/data";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: pageTitle("Projects") },
      {
        name: "description",
        content: pageDescription(
          `Browse ${brand.name} projects across ${brand.location}—baths, kitchens, outdoor living, and more.`,
        ),
      },
    ],
  }),
});

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects"
        description={copy.projectsPage.description}
        image={images.kitchen}
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-border bg-cream shadow-soft"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold-dark">
                    {p.type} · {p.location}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-forest md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.materials.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-forest/10 bg-ivory px-3 py-1 text-[0.65rem] tracking-[0.12em] uppercase text-stone"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
