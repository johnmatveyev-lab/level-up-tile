import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { brand, pageTitle, serviceAreas } from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";

export const Route = createFileRoute("/areas/$slug")({
  component: AreaDetailPage,
  loader: ({ params }) => {
    const area = serviceAreas.find((a) => a.slug === params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => {
    const area = loaderData?.area;
    if (!area) return {};
    return {
      meta: buildMeta({
        title: pageTitle(`Tile Installation ${area.name}`),
        description: area.description,
        path: `/areas/${area.slug}`,
      }),
      links: [
        { rel: "canonical", href: `${siteUrl}/areas/${area.slug}` },
      ],
    };
  },
});

function AreaDetailPage() {
  const { area } = Route.useLoaderData();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Tile & stone installation — ${area.name}, SC`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: brand.name,
      telephone: brand.phone,
      areaServed: `${area.name}, SC`,
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "State", name: "South Carolina" },
    },
    description: area.description,
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        eyebrow={`${area.name}, SC`}
        title={area.headline}
        description={area.description}
        image={images.kitchen}
        compact
      />
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl text-forest">
                Neighborhoods we know
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {area.neighborhoods.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border border-forest/10 bg-cream px-4 py-2 text-sm text-forest"
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-ink-muted md:text-base">
                From design consults to waterproofed wet rooms and outdoor
                porcelain, {brand.name} brings the same craft standard to every{" "}
                {area.name} project—coordinated with your builder or designer when
                needed.
              </p>
              <Button asChild className="mt-8" variant="gold" size="lg">
                <Link to="/contact">
                  Book a {area.name} consult
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-cream p-6 shadow-soft md:p-8">
              <h3 className="font-display text-2xl text-forest">
                Popular in {area.name}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-ink-muted">
                <li>· Primary bath remodels with large-format porcelain</li>
                <li>· Kitchen floors and statement backsplashes</li>
                <li>· Outdoor terraces with 20mm pavers</li>
                <li>· Designer and builder trade partnerships</li>
              </ul>
              <Link
                to="/areas"
                className="mt-8 inline-flex text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                All service areas
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
