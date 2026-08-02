/**
 * TILE CONTRACTOR WEBSITE TEMPLATE — single source of truth
 * ─────────────────────────────────────────────────────────
 * Rebrand for any tile / stone contractor by editing this file only.
 * Demo brand: Level Up Tile (Greenville & Upstate SC)
 */

const CDN =
  "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images";

export function asset(filename: string) {
  if (filename.startsWith("http")) return filename;
  return `${CDN}/${filename}`;
}

// ─── Brand ───────────────────────────────────────────────────────────────────

export const brand = {
  name: "Level Up Tile",
  initials: "LU",
  tagline: "Elevate Every Surface",
  sub: "Luxury Tile & Stone",
  location: "Greenville & Upstate SC",
  /** Street-style line for maps / local SEO */
  streetAddress: "By appointment · Design studio visits available",
  address: "Greenville, South Carolina 29601",
  city: "Greenville",
  region: "SC",
  postalCode: "29601",
  country: "US",
  serving: "Serving Greenville, Travelers Rest, Simpsonville, Greer & Upstate SC",
  regionBadge: "Greenville · Upstate South Carolina",
  phone: "(864) 555-0142",
  email: "hello@leveluptile.com",
  hours: "Mon–Fri 9am–5pm · Sat by appointment",
  hoursSchema: "Mo-Fr 09:00-17:00",
  licenseNote: "Licensed & insured tile and stone installation",
  description:
    "Premium tile and stone design + installation for homeowners, designers, and builders in Greenville and Upstate SC. Elevate every surface.",
  themeColor: "#0f2e24",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
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
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLegal: NavItem[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Warranty", href: "/warranty" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

// ─── Images ──────────────────────────────────────────────────────────────────

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
  heroBath: asset("hero-bath.jpg"),
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
      text: "Rooted in Greenville, serving the greater Upstate.",
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
    "Premium tile and stone design and installation for discerning homeowners, designers, and builders across the Upstate.",
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

// ─── Service areas (local SEO) ───────────────────────────────────────────────

export type ServiceArea = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  neighborhoods: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "greenville",
    name: "Greenville",
    headline: "Luxury tile & stone installation in Greenville, SC",
    description:
      "Primary baths, kitchens, and feature walls for Greenville homeowners—from downtown lofts to North Main estates. Design consults and precision install under one roof.",
    neighborhoods: [
      "Downtown",
      "North Main",
      "Augusta Road",
      "Overbrook",
      "Wade Hampton",
    ],
  },
  {
    slug: "travelers-rest",
    name: "Travelers Rest",
    headline: "Mountain-view kitchens & spa baths in Travelers Rest",
    description:
      "We bring large-format porcelain, natural stone, and outdoor surfaces to TR homes that open to the Blue Ridge—built for beauty and daily living.",
    neighborhoods: ["Downtown TR", "Tigerville Road", "Mountain View"],
  },
  {
    slug: "simpsonville",
    name: "Simpsonville",
    headline: "Tile design & install for Simpsonville homes",
    description:
      "Family baths, mudrooms, and outdoor living packages with durable porcelain and refined finishes—scheduled around your life.",
    neighborhoods: ["Heritage Park", "Five Forks edge", "Harrison Bridge"],
  },
  {
    slug: "greer",
    name: "Greer",
    headline: "Premium surfaces for Greer & the eastern Upstate",
    description:
      "New construction partnerships and remodels with clean installs, waterproofed wet areas, and materials chosen for longevity.",
    neighborhoods: ["Riverside", "Suber Road", "Apalache"],
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqs = [
  {
    q: "How much does a tile installation cost?",
    a: "It depends on material, square footage, substrate condition, waterproofing, and pattern complexity. We provide written estimates after a design consultation—never a one-size phone quote for luxury work.",
  },
  {
    q: "Do you only install, or help choose materials?",
    a: "Both. We offer design consultation and material curation as well as precision installation, so you can start with samples or a full project partnership.",
  },
  {
    q: "How long does a typical primary bath take?",
    a: "After materials arrive and the site is ready, most primary baths run one to three weeks of install time depending on waterproofing, niche work, and stone fabrication. We confirm a schedule at kickoff.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Yes. ${brand.licenseNote}. Certificates available on request for builders and HOAs.`,
  },
  {
    q: "Do you work with interior designers and builders?",
    a: "Absolutely. We coordinate shop drawings, lead times, and site protection with your design and build teams across Greenville and the Upstate.",
  },
  {
    q: "What areas do you serve?",
    a: brand.serving,
  },
  {
    q: "Can I book by voice?",
    a: "Yes—use Talk to Aria on the site (Grok Voice when configured). You can also book on the Contact page with date and time windows.",
  },
];

// ─── Quote estimator bands (indicative) ──────────────────────────────────────

export const quoteBands = [
  {
    id: "powder",
    label: "Powder room accent",
    sqftHint: "20–40 sq ft",
    range: "$1,800–$4,500+",
    note: "Feature wall or floor with mid-range porcelain/ceramic.",
  },
  {
    id: "bath",
    label: "Primary bath wet room",
    sqftHint: "80–160 sq ft",
    range: "$8,000–$22,000+",
    note: "Waterproofing, large-format or mosaic, niches, stone thresholds.",
  },
  {
    id: "kitchen",
    label: "Kitchen floor + backsplash",
    sqftHint: "120–250 sq ft",
    range: "$6,500–$18,000+",
    note: "Porcelain floors and coordinated backsplash; excludes counters.",
  },
  {
    id: "outdoor",
    label: "Outdoor terrace pavers",
    sqftHint: "200–500 sq ft",
    range: "$9,000–$28,000+",
    note: "20mm outdoor porcelain, base prep varies by site.",
  },
];

// ─── Catalog ─────────────────────────────────────────────────────────────────

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
  beforeImage?: string;
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
    beforeImage: images.heroBath,
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
    beforeImage: images.collections,
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
    beforeImage: images.marbleBath,
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

export const warranty = {
  title: "Workmanship commitment",
  summary:
    "We stand behind our installation craftsmanship. Material warranties follow manufacturer terms; our labor is backed by a written workmanship guarantee delivered at project closeout.",
  points: [
    {
      title: "Workmanship",
      body: "Installation labor guaranteed against defects in workmanship for two (2) years from substantial completion, subject to normal use and proper maintenance.",
    },
    {
      title: "Materials",
      body: "Porcelain, stone, membranes, and setting materials carry their manufacturer warranties. We register systems where required and share care guides at handover.",
    },
    {
      title: "What's not covered",
      body: "Structural movement, water intrusion from unrelated trades, homeowner modifications, abuse, or lack of sealing/maintenance on natural stone.",
    },
    {
      title: "How to claim",
      body: `Email ${brand.email} with your project address and photos. We respond within two business days to schedule an inspection.`,
    },
  ],
};
