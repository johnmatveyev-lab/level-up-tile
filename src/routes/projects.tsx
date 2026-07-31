import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { projects } from "@/lib/data";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      {
        title: "Projects | Level Up Tile — Portfolio of Luxury Installations",
      },
      {
        name: "description",
        content:
          "Browse Level Up Tile projects across Greenville and Upstate SC—primary baths, kitchens, outdoor terraces, and more.",
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
        description="A selection of recent installations for homeowners and design partners across the Upstate."
        image="/images/kitchen-hero.jpg"
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-cream shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold-dark">
                    {p.type} · {p.location}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-forest">
                    {p.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {p.description}
                  </p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone">
                      Materials
                    </p>
                    <p className="mt-1 text-sm text-forest-soft">
                      {p.materials.join(" · ")}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Start your project"
        description="Whether you're renovating a powder room or building a new home, we'd love to collaborate."
        image="/images/brand-marble.jpg"
      />
    </>
  );
}
