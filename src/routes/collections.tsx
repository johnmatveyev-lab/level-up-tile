import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { collections } from "@/lib/data";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({
    meta: [
      {
        title: "Collections | Level Up Tile — Porcelain, Stone & Mosaic",
      },
      {
        name: "description",
        content:
          "Explore premium porcelain, natural stone, mosaic, outdoor, and ceramic collections from Level Up Tile in Greenville, SC.",
      },
    ],
  }),
});

function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tile & Stone"
        title="Collections"
        description="Curated materials for baths, kitchens, living spaces, and outdoor rooms—selected for beauty, durability, and design flexibility."
        image="/images/collection-samples.jpg"
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {collections.map((c, i) => (
              <article
                key={c.id}
                className={`group overflow-hidden rounded-2xl bg-cream shadow-soft ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`grid ${
                    i === 0 ? "lg:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  <div
                    className={`overflow-hidden ${
                      i === 0 ? "aspect-[16/10] lg:aspect-auto lg:min-h-[360px]" : "aspect-[5/4]"
                    }`}
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                    <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gold-dark">
                      {c.category}
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-forest md:text-4xl">
                      {c.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                      {c.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {c.finishes.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-forest/15 px-3 py-1 text-[0.7rem] tracking-wide text-forest-soft"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need help choosing?"
        description="Bring us your plans or photos—we'll narrow samples and finishes that fit your space, budget, and style."
      />
    </>
  );
}
