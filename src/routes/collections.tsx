import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import {
  brand,
  collections,
  copy,
  images,
  pageTitle,
} from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({
    meta: buildMeta({
      title: pageTitle("Collections"),
      description: `Explore porcelain, natural stone, mosaic, and outdoor collections from ${brand.name}.`,
      path: "/collections",
      image: images.collections,
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/collections` }],
  }),
});

function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tile & Stone"
        title="Collections"
        description={copy.collectionsPage.description}
        image={images.collections}
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <article
                key={c.id}
                className="group overflow-hidden rounded-2xl border border-border bg-cream shadow-soft"
              >
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-gold-dark">
                    {c.category}
                  </p>
                  <h2 className="mt-1 font-display text-2xl text-forest md:text-3xl">
                    {c.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {c.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.finishes.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-forest/10 bg-ivory px-3 py-1 text-[0.65rem] tracking-[0.12em] uppercase text-stone"
                      >
                        {f}
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
