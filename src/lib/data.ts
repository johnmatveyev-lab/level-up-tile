/**
 * TILE CONTRACTOR WEBSITE TEMPLATE — single source of truth
 * ─────────────────────────────────────────────────────────
 * Rebrand for any tile / stone contractor by editing this file only:
 *   1. brand      → company name, tagline, contact, location
 *   2. copy       → homepage & about marketing text
 *   3. images     → filenames under /public/images (or CDN URLs)
 *   4. collections / projects / services → portfolio content
 *
 * Demo brand: Level Up Tile (Greenville & Upstate SC)
 */

const CDN =
  "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images";

/** Resolve image: local path in browser; CDN absolute for SSR / empty deploys */
export function asset(filename: string) {
  if (filename.startsWith("http")) return filename;
  return `${CDN}/${filename}`;
}

// ─── Brand (edit first) ──────────────────────────────────────────────────────

export const brand = {
  /** Full company name */
  name: "Level Up Tile",
  /** Short initials for monogram logo (1–3 letters) */
  initials: "LU",
  /** Primary headline / brand promise */
  tagline: "Elevate Every Surface",
  /** Subline under logo */
  sub: "Luxury Tile & Stone",
  /** Market area shown in hero & footer */
  location: "Greenville & Upstate SC",
  /** Footer / contact address line */
  address: "Greenville, South Carolina",
  /** Region line under address */
  serving: "Serving Greenville & Upstate SC",
  /** Footer location badge */
  regionBadge: "Greenville · Upstate South Carolina",
  phone: "(864) 555-0142",
  email: "hello@leveluptile.com",
  hours: "Mon–Fri 9am–5pm · Sat by appointment",
  /** SEO / social */
  description:
    "Premium tile and stone design + installation for homeowners, designers, and builders. Elevate every surface.",
  themeColor: "#0f2e24",
};

export function pageTitle(page?: string) {
  if (!page) {
    return `${brand.name} | ${brand.sub} — ${brand.location}`;
  }
  return `${page} | ${brand.name}`;
}

export function pageDescription(extra?: string) {
  return extra ?? brand.description;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─── Images (filenames in public/images) ─────────────────────────────────────

export const images = {
  hero: asset("hero-main.jpg"),
  kitchen: asset("kitchen-hero.jpg"),
  marbleBath: asset("hero-marble-bath.jpg"),
  brandMarble: asset("brand-marble.jpg"),
  team: asset("team-photo.jpg"),
  teamAbout: asset("team-about.jpg"),
  cta: asset("cta-hex.jpg"),
  collections: asset("collection-samples.jpg"),
  emerald: asset("project-emerald.jpg"),
  shower: asset("project-shower.jpg"),
  patio: asset("project-patio.jpg"),
  powder: asset("project-powder.jpg"),
  marbleKitchen: asset("project-marble-kitchen.jpg"),
};

// ─── Marketing copy ──────────────────────────────────────────────────────────

export const copy = {
  hero: {
    headline: brand.tagline,
    support: "Premium Tile & Stone Design + Installation",
    ctaPrimary: "Book a Consultation",
    ctaSecondary: "View Projects",
  },
  highlights: [
    {
      label: "Design + Install",
      text: "One team from sample board to final grout line.",
    },
    {
      label: "Local Focused",
      text: `Rooted in ${brand.location.split("&")[0]?.trim() ?? brand.location}, serving the greater region.`,
    },
    {
      label: "Premium Materials",
      text: "Porcelain, natural stone, and artisan tile curated for longevity.",
    },
  ],
  signature: {
    eyebrow: "Signature Work",
    title: "Spaces that feel intentional",
    description:
      "From spa baths to statement kitchens, we craft surfaces that elevate how you live—and how your home is remembered.",
    bullets: [
      "Custom layouts and pattern design",
      "Large-format & natural stone expertise",
      "Coordination with designers and builders",
    ],
    cta: "Explore the Portfolio",
  },
  collectionsIntro: {
    eyebrow: "Collections",
    title: "Materials that define the room",
    description:
      "Porcelain, natural stone, mosaic, and outdoor surfaces—selected for beauty and performance.",
  },
  processIntro: {
    eyebrow: "How We Work",
    title: "A clear path to elevated surfaces",
  },
  projectsIntro: {
    eyebrow: "Projects",
    title: "Recent installations",
    description: `Baths, kitchens, and outdoor living across ${brand.location}.`,
  },
  valuesIntro: {
    eyebrow: "Our Values",
    title: "What guides every project",
  },
  aboutTeaser: {
    eyebrow: "Our Story",
    title: `Crafted for ${brand.location}`,
    description:
      "We craft exceptional tile and stone installations with precision and soul for discerning homeowners, designers, and builders.",
    cta: "Meet the Team",
  },
  aboutPage: {
    heroTitle: `About ${brand.name}`,
    heroDescription: `Premium tile & stone craftsmanship serving ${brand.location}.`,
    storyTitle: "Craft with precision and soul",
    storyLead:
      "We craft exceptional tile and stone installations with precision and soul for discerning homeowners, designers, and builders. Every project is an opportunity to raise the standard of how surfaces look, feel, and last.",
    storyBody:
      "From material selection to the final polish, our team treats your home with the care of a custom craft studio—clear communication, protected job sites, and finishes that reward a closer look.",
  },
  contactPage: {
    heroTitle: "Book a Consultation",
    heroDescription:
      "Tell us about your space. We'll follow up to schedule a showroom or on-site conversation.",
    formTitle: "Let's elevate your home",
    formLead:
      "Whether you're selecting materials for a primary bath remodel or coordinating with your builder on a new construction, we're here to guide the process.",
    successTitle: "Request received",
    successBody: `Thank you. A member of the ${brand.name} team will be in touch shortly to schedule your consultation.`,
  },
  cta: {
    eyebrow: "Next Step",
    title: "Ready to start your project?",
    description: `Premium tile design and installation for ${brand.location}. Book a consultation and let's elevate every surface.`,
    button: "Book Consultation",
  },
  footerBlurb:
    "Premium tile and stone design and installation for discerning homeowners, designers, and builders.",
  collectionsPage: {
    description:
      "Curated materials for baths, kitchens, living spaces, and outdoor rooms—selected for beauty, durability, and design flexibility.",
  },
  projectsPage: {
    description: `A selection of recent installations for homeowners and design partners across ${brand.location}.`,
  },
  servicesPage: {
    description:
      "Design consultation, material curation, precision installation, and full project partnership from sample to final walkthrough.",
  },
};

// ─── Catalog content ─────────────────────────────────────────────────────────

export type Collection = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  finishes: string[];
};

export const collections: Collection[] = [
  {
    id: "porcelain",
    name: "Porcelain",
    category: "Large Format",
    description:
      "Ultra-durable large-format porcelain with marble, stone, and concrete looks—ideal for floors, walls, and wet areas.",
    image: images.collections,
    finishes: ["Matte", "Polished", "Structured"],
  },
  {
    id: "natural-stone",
    name: "Natural Stone",
    category: "Marble & Travertine",
    description:
      "Hand-selected marble, travertine, and limestone slabs and tiles with unique veining for statement surfaces.",
    image: images.marbleKitchen,
    finishes: ["Honed", "Polished", "Brushed"],
  },
  {
    id: "mosaic",
    name: "Mosaic & Accent",
    category: "Artisan",
    description:
      "Fish-scale, hex, and geometric mosaics that bring depth and craft to showers, backsplashes, and feature walls.",
    image: images.emerald,
    finishes: ["Gloss", "Crackle", "Matte"],
  },
  {
    id: "outdoor",
    name: "Outdoor Porcelain",
    category: "Exterior",
    description:
      "Frost-resistant pavers and coordinating indoor-outdoor collections for patios, pool decks, and terraces.",
    image: images.patio,
    finishes: ["Grip", "Textured"],
  },
  {
    id: "ceramic",
    name: "Ceramic Wall",
    category: "Decorative",
    description:
      "Crafted ceramic for powder rooms and feature walls—rich glazes, subtle texture, and timeless color stories.",
    image: images.cta,
    finishes: ["Gloss", "Satin"],
  },
  {
    id: "vanity",
    name: "Stone Surfaces",
    category: "Countertops & Vanities",
    description:
      "Quartzite, marble, and engineered stone for islands, vanities, and wet bars—precision templated and installed.",
    image: images.powder,
    finishes: ["Polished", "Leathered"],
  },
];

export type Project = {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  image: string;
  materials: string[];
};

export const projects: Project[] = [
  {
    id: "emerald-spa",
    title: "Emerald Spa Bath",
    location: "Greenville, SC",
    type: "Primary Bath",
    description:
      "Deep emerald fish-scale tile wraps the wet room, paired with a carved stone tub and matte black fixtures.",
    image: images.emerald,
    materials: ["Fish-scale porcelain", "Basalt tub", "Matte black hardware"],
  },
  {
    id: "upstate-kitchen",
    title: "Mountain View Kitchen",
    location: "Travelers Rest, SC",
    type: "Kitchen",
    description:
      "Forest-green cabinetry meets warm stone island and backsplash, opening to Blue Ridge views.",
    image: images.kitchen,
    materials: ["Large-format porcelain", "Quartz island", "Brass fixtures"],
  },
  {
    id: "calacatta-suite",
    title: "Calacatta Marble Suite",
    location: "Greenville, SC",
    type: "Bath Suite",
    description:
      "Book-matched marble walls, freestanding tub, and gold fixtures create a hotel-caliber sanctuary.",
    image: images.brandMarble,
    materials: ["Calacatta marble", "Brass fixtures", "Polished porcelain"],
  },
  {
    id: "travertine-spa",
    title: "Travertine Rain Shower",
    location: "Simpsonville, SC",
    type: "Shower",
    description:
      "Full-height travertine slabs and a brass rainfall head for a spa retreat at home.",
    image: images.shower,
    materials: ["Travertine", "Brushed brass", "Linear drain"],
  },
  {
    id: "patio-pavers",
    title: "Sunset Terrace",
    location: "Greer, SC",
    type: "Outdoor",
    description:
      "Large-format outdoor porcelain with dark joint lines frames evening entertaining spaces.",
    image: images.patio,
    materials: ["20mm porcelain pavers", "Dark gravel joints"],
  },
  {
    id: "powder-jewel",
    title: "Jewel Box Powder",
    location: "Greenville, SC",
    type: "Powder Room",
    description:
      "Geometric charcoal floor tile, floating marble vanity, and deep green wall create an unforgettable powder room.",
    image: images.powder,
    materials: ["Geometric ceramic", "Carrara vanity", "Gold hardware"],
  },
];

export type Service = {
  title: string;
  description: string;
  icon: "design" | "install" | "source" | "consult";
};

export const services: Service[] = [
  {
    title: "Design Consultation",
    description:
      "In-home or showroom sessions to map layout, materials, and finish pairings tailored to your architecture and lifestyle.",
    icon: "consult",
  },
  {
    title: "Material Curation",
    description:
      "Access to premium porcelain, natural stone, and artisan tile—sourced with performance, maintenance, and beauty in mind.",
    icon: "source",
  },
  {
    title: "Precision Installation",
    description:
      "Master installers who treat every joint, edge, and transition as part of the design. Licensed, insured, and on schedule.",
    icon: "install",
  },
  {
    title: "Full Project Partnership",
    description:
      "From sample boards to final walkthrough, we coordinate with your designer, builder, and trades for a seamless build.",
    icon: "design",
  },
];

export const values = [
  {
    title: "Craftsmanship",
    description: "Precision in every detail. Timeless quality in every installation.",
  },
  {
    title: "Sustainability",
    description: "Thoughtful materials. Responsible choices for a better future.",
  },
  {
    title: "Innovation",
    description: "Pushing boundaries with new materials, techniques, and design.",
  },
  {
    title: "Local Pride",
    description: `Rooted in ${brand.location}. Committed to our community and the homes we serve.`,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "Share your vision, space, and timeline. We listen and assess.",
  },
  {
    step: "02",
    title: "Design",
    description: "Samples, layouts, and finish boards that make decisions clear.",
  },
  {
    step: "03",
    title: "Install",
    description: "Protected job sites, expert crews, and progress you can trust.",
  },
  {
    step: "04",
    title: "Elevate",
    description: "Final polish, walkthrough, and care guidance for lasting beauty.",
  },
];
