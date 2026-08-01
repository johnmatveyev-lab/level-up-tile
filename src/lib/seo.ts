import { brand, pageDescription } from "@/lib/data";

export const siteUrl =
  (typeof import.meta !== "undefined" &&
    (import.meta as ImportMeta & { env?: { VITE_SITE_URL?: string } }).env
      ?.VITE_SITE_URL?.replace(/\/$/, "")) ||
  "https://level-up-tile.vercel.app";

export type PageSeo = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export function buildMeta(seo: PageSeo) {
  const url = `${siteUrl}${seo.path ?? "/"}`;
  const image =
    seo.image && seo.image.startsWith("http")
      ? seo.image
      : seo.image
        ? `${siteUrl}${seo.image.startsWith("/") ? "" : "/"}${seo.image}`
        : `${siteUrl}/images/hero-main.jpg`;
  const robots = seo.noindex ? "noindex, nofollow" : "index, follow";

  return [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "robots", content: robots },
    { name: "author", content: brand.name },
    {
      name: "keywords",
      content: [
        "tile contractor",
        "luxury tile",
        "stone installation",
        "porcelain tile",
        "bathroom tile",
        "kitchen backsplash",
        brand.location,
        brand.name,
        "Greenville SC tile",
      ].join(", "),
    },
    { name: "geo.region", content: "US-SC" },
    { name: "geo.placename", content: "Greenville" },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: seo.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:site_name", content: brand.name },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: image },
    { name: "theme-color", content: brand.themeColor },
  ];
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: brand.name,
    description: pageDescription(),
    url: siteUrl,
    telephone: brand.phone,
    email: brand.email,
    image: `${siteUrl}/images/hero-main.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greenville",
      addressRegion: "SC",
      addressCountry: "US",
    },
    areaServed: brand.location,
    priceRange: "$$$",
    openingHours: "Mo-Fr 09:00-17:00",
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tile & Stone Design Consultation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Precision Tile Installation",
        },
      },
    ],
  };
}
