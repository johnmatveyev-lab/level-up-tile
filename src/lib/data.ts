export const brand = {
  name: "Level Up Tile",
  tagline: "Elevate Every Surface",
  sub: "Luxury Tile & Stone",
  location: "Greenville & Upstate SC",
  phone: "(864) 555-0142",
  email: "hello@leveluptile.com",
  address: "Greenville, South Carolina",
  hours: "Mon–Fri 9am–5pm · Sat by appointment",
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/collection-samples.jpg",
    finishes: ["Matte", "Polished", "Structured"],
  },
  {
    id: "natural-stone",
    name: "Natural Stone",
    category: "Marble & Travertine",
    description:
      "Hand-selected marble, travertine, and limestone slabs and tiles with unique veining for statement surfaces.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-marble-kitchen.jpg",
    finishes: ["Honed", "Polished", "Brushed"],
  },
  {
    id: "mosaic",
    name: "Mosaic & Accent",
    category: "Artisan",
    description:
      "Fish-scale, hex, and geometric mosaics that bring depth and craft to showers, backsplashes, and feature walls.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-emerald.jpg",
    finishes: ["Gloss", "Crackle", "Matte"],
  },
  {
    id: "outdoor",
    name: "Outdoor Porcelain",
    category: "Exterior",
    description:
      "Frost-resistant pavers and coordinating indoor-outdoor collections for patios, pool decks, and terraces.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-patio.jpg",
    finishes: ["Grip", "Textured"],
  },
  {
    id: "ceramic",
    name: "Ceramic Wall",
    category: "Decorative",
    description:
      "Crafted ceramic for powder rooms and feature walls—rich glazes, subtle texture, and timeless color stories.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/cta-hex.jpg",
    finishes: ["Gloss", "Satin"],
  },
  {
    id: "vanity",
    name: "Stone Surfaces",
    category: "Countertops & Vanities",
    description:
      "Quartzite, marble, and engineered stone for islands, vanities, and wet bars—precision templated and installed.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-powder.jpg",
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
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-emerald.jpg",
    materials: ["Fish-scale porcelain", "Basalt tub", "Matte black hardware"],
  },
  {
    id: "upstate-kitchen",
    title: "Mountain View Kitchen",
    location: "Travelers Rest, SC",
    type: "Kitchen",
    description:
      "Forest-green cabinetry meets warm stone island and backsplash, opening to Blue Ridge views.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/kitchen-hero.jpg",
    materials: ["Large-format porcelain", "Quartz island", "Brass fixtures"],
  },
  {
    id: "calacatta-suite",
    title: "Calacatta Marble Suite",
    location: "Greenville, SC",
    type: "Bath Suite",
    description:
      "Book-matched marble walls, freestanding tub, and gold fixtures create a hotel-caliber sanctuary.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/brand-marble.jpg",
    materials: ["Calacatta marble", "Brass fixtures", "Polished porcelain"],
  },
  {
    id: "travertine-spa",
    title: "Travertine Rain Shower",
    location: "Simpsonville, SC",
    type: "Shower",
    description:
      "Full-height travertine slabs and a brass rainfall head for a spa retreat at home.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-shower.jpg",
    materials: ["Travertine", "Brushed brass", "Linear drain"],
  },
  {
    id: "patio-pavers",
    title: "Sunset Terrace",
    location: "Greer, SC",
    type: "Outdoor",
    description:
      "Large-format outdoor porcelain with dark joint lines frames evening entertaining spaces.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-patio.jpg",
    materials: ["20mm porcelain pavers", "Dark gravel joints"],
  },
  {
    id: "powder-jewel",
    title: "Jewel Box Powder",
    location: "Greenville, SC",
    type: "Powder Room",
    description:
      "Geometric charcoal floor tile, floating marble vanity, and deep green wall create an unforgettable powder room.",
    image: "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images/project-powder.jpg",
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
    description: "Rooted in Greenville. Committed to our community and Upstate homes.",
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
