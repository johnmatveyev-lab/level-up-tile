import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Mic, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BookingWidget } from "@/components/BookingWidget";
import { QuoteEstimator } from "@/components/QuoteEstimator";
import { brand, copy, images, pageTitle } from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: buildMeta({
      title: pageTitle("Contact & Book Consultation"),
      description: `Book a design consultation with ${brand.name}. ${brand.description}`,
      path: "/contact",
      image: images.cta,
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/contact` }],
  }),
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={copy.contactPage.heroTitle}
        description={copy.contactPage.heroDescription}
        image={images.cta}
        compact
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-3xl text-forest">
                {copy.contactPage.formTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                {copy.contactPage.formLead}
              </p>

              <ul className="mt-10 space-y-5">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-stone">
                      Location
                    </p>
                    <p className="mt-1 text-sm text-forest">
                      {brand.streetAddress}
                      <br />
                      {brand.address}
                      <br />
                      {brand.serving}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-stone">
                      Phone
                    </p>
                    <a
                      href={`tel:${brand.phone.replace(/\D/g, "")}`}
                      className="mt-1 block text-sm text-forest hover:text-gold-dark"
                      onClick={() => track("phone_click", { from: "contact" })}
                    >
                      {brand.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-stone">
                      Email
                    </p>
                    <a
                      href={`mailto:${brand.email}`}
                      className="mt-1 block text-sm text-forest hover:text-gold-dark"
                      onClick={() => track("email_click", { from: "contact" })}
                    >
                      {brand.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mic className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-stone">
                      Voice agent
                    </p>
                    <p className="mt-1 text-sm text-forest">
                      Tap <strong>Talk to Aria</strong> — Grok Voice with full
                      site & industry knowledge.
                    </p>
                  </div>
                </li>
              </ul>

              <p className="mt-10 text-sm text-ink-muted">{brand.hours}</p>
              <p className="mt-2 text-xs text-stone">{brand.licenseNote}</p>
            </div>

            <QuoteEstimator />
          </div>

          <div className="lg:col-span-3">
            <BookingWidget />
          </div>
        </div>
      </section>
    </>
  );
}
