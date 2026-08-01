/**
 * On-device fallback when XAI_API_KEY is unavailable.
 * Answers from the same knowledge base used by the xAI agent.
 */
import {
  brand,
  collections,
  processSteps,
  projects,
  services,
  values,
} from "@/lib/data";

export function answerFromKnowledge(userText: string): string {
  const q = userText.toLowerCase().trim();
  if (!q) {
    return `Hi, I'm Aria with ${brand.name}. How can I help with your tile or stone project today?`;
  }

  if (/(hello|hi |hey|good morning|good afternoon)/.test(q)) {
    return `Hello! I'm Aria, the ${brand.name} design assistant. I can talk materials, projects, services, or book a consultation in ${brand.location}. What are you working on?`;
  }

  if (/(hour|open|when are you|schedule)/.test(q)) {
    return `We're available ${brand.hours}. You can also request a consultation online and we'll confirm a showroom or on-site visit.`;
  }

  if (/(phone|call|email|contact|reach)/.test(q)) {
    return `You can reach ${brand.name} at ${brand.phone} or ${brand.email}. We're based in ${brand.address}, ${brand.serving.toLowerCase()}.`;
  }

  if (/(service|what do you do|offer|install)/.test(q)) {
    const list = services.map((s) => s.title).join(", ");
    return `We offer ${list}. In short: design consultation, material curation, precision installation, and full project partnership with designers and builders.`;
  }

  if (/(process|how does|steps|workflow)/.test(q)) {
    return processSteps
      .map((s) => `${s.title}: ${s.description}`)
      .join(" Next, ");
  }

  if (/(collection|material|porcelain|marble|mosaic|stone|tile type)/.test(q)) {
    const names = collections.map((c) => c.name).join(", ");
    if (/porcelain/.test(q)) {
      const c = collections.find((x) => x.id === "porcelain");
      return c
        ? `${c.name}: ${c.description} Available finishes include ${c.finishes.join(", ")}.`
        : `We carry porcelain, natural stone, mosaic, outdoor, ceramic, and stone surfaces.`;
    }
    if (/mosaic|hex|fish/.test(q)) {
      const c = collections.find((x) => x.id === "mosaic");
      return c
        ? `${c.name}: ${c.description}`
        : `Our mosaic and accent collection is perfect for showers and feature walls.`;
    }
    if (/outdoor|patio|paver/.test(q)) {
      const c = collections.find((x) => x.id === "outdoor");
      return c
        ? `${c.name}: ${c.description}`
        : `We install frost-resistant outdoor porcelain for patios and terraces.`;
    }
    return `Our collections include ${names}. Tell me the room—bath, kitchen, or outdoor—and I can narrow options.`;
  }

  if (/(project|portfolio|example|work|gallery)/.test(q)) {
    const sample = projects
      .slice(0, 3)
      .map((p) => `${p.title} in ${p.location}`)
      .join("; ");
    return `Recent work includes ${sample}. You can browse the full portfolio on the Projects page, or tell me your room type for similar ideas.`;
  }

  if (/(price|cost|how much|estimate|budget)/.test(q)) {
    return `Pricing depends on material, square footage, substrate condition, and waterproofing. We don't quote exact numbers without a consult—happy to book a design consultation so we can scope it properly.`;
  }

  if (/(about|story|who are|team|value)/.test(q)) {
    const v = values.map((x) => x.title).join(", ");
    return `${brand.name} is a ${brand.sub} studio in ${brand.location}. Our values are ${v}. ${brand.tagline}.`;
  }

  if (/(book|appointment|consult|schedule|meet)/.test(q)) {
    return `I can book a design consultation. I'll need your name, email, phone, preferred weekday date, a time window—morning, afternoon, or late afternoon—and the project type, like primary bath or kitchen. You can also use the booking form on the Contact page.`;
  }

  if (/(waterproof|shower|grout|large.?format|lippage)/.test(q)) {
    return `For wet areas we insist on proper waterproofing membranes, slope to drain, and the right mortar system. Large-format tile needs a flat substrate and careful lippage control. We handle that as part of precision installation—happy to review your space on a consult.`;
  }

  return `Great question. ${brand.name} specializes in luxury tile and stone design and installation across ${brand.location}. I can cover collections, projects, services, or book a consultation—what would help most?`;
}
