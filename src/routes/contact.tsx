import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { brand, copy, images, pageDescription, pageTitle } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: pageTitle("Contact") },
      {
        name: "description",
        content: pageDescription(
          `Book a consultation with ${brand.name}. ${brand.description}`,
        ),
      },
    ],
  }),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 700);
  }

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
          <div className="lg:col-span-2">
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
                  >
                    {brand.email}
                  </a>
                </div>
              </li>
            </ul>

            <p className="mt-10 text-sm text-ink-muted">{brand.hours}</p>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-cream p-6 shadow-soft md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <CheckCircle2
                    className="h-12 w-12 text-forest-soft"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-4 font-display text-3xl text-forest">
                    {copy.contactPage.successTitle}
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-ink-muted">
                    {copy.contactPage.successBody}
                  </p>
                  <Button
                    className="mt-8"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="First name" name="firstName" required />
                    <Field label="Last name" name="lastName" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <Field
                    label="Project type"
                    name="projectType"
                    as="select"
                    options={[
                      "Primary bath",
                      "Kitchen",
                      "Powder room",
                      "Outdoor / patio",
                      "Whole home",
                      "Commercial",
                      "Other",
                    ]}
                  />
                  <Field
                    label="Tell us about your project"
                    name="message"
                    as="textarea"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    variant="gold"
                    className="w-full sm:w-auto"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Request Consultation"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  as = "input",
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea" | "select";
  options?: string[];
}) {
  const base =
    "mt-1.5 w-full rounded-lg border border-forest/15 bg-ivory px-3.5 py-2.5 text-sm text-forest outline-none transition-colors placeholder:text-stone focus:border-gold focus:ring-2 focus:ring-gold/25";

  return (
    <label className="block">
      <span className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
        {label}
        {required && <span className="text-gold-dark"> *</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={cn(base, "resize-y min-h-[120px]")}
          placeholder="Timeline, rooms, materials you're considering…"
        />
      ) : as === "select" ? (
        <select name={name} required={required} className={base} defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  );
}
