import { createFileRoute } from "@tanstack/react-router";
import { brand, pageTitle } from "@/lib/data";
import { buildMeta, siteUrl } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: buildMeta({
      title: pageTitle("Privacy Policy"),
      description: `Privacy policy for ${brand.name} — how we handle consultation and website data.`,
      path: "/privacy",
    }),
    links: [{ rel: "canonical", href: `${siteUrl}/privacy` }],
  }),
});

function PrivacyPage() {
  return (
    <article className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-dark">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl text-forest md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-ink-muted">
          Last updated: August 2, 2026 · {brand.name}
        </p>
        <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-ink-muted md:text-base">
          <p>
            {brand.name} (“we”, “us”) respects your privacy. This policy describes
            how we collect and use information when you use our website, booking
            form, or voice agent.
          </p>
          <h2 className="font-display text-2xl text-forest">Information we collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Contact and project details you submit (name, email, phone, project
              type, preferred appointment, notes).
            </li>
            <li>
              Technical data such as browser type and pages visited (via analytics
              tools if enabled).
            </li>
            <li>
              Voice session metadata when you use our on-site voice agent; audio
              is processed to answer questions and is not sold.
            </li>
          </ul>
          <h2 className="font-display text-2xl text-forest">How we use it</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Respond to consultation requests and schedule visits.</li>
            <li>Improve our website and customer experience.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <h2 className="font-display text-2xl text-forest">Sharing</h2>
          <p>
            We do not sell personal information. We may share data with service
            providers who help us operate email delivery, hosting, analytics, or
            voice infrastructure, under confidentiality obligations.
          </p>
          <h2 className="font-display text-2xl text-forest">Retention</h2>
          <p>
            Booking records are retained as needed for project follow-up and
            business records, then deleted or anonymized when no longer required.
          </p>
          <h2 className="font-display text-2xl text-forest">Your choices</h2>
          <p>
            Contact us at{" "}
            <a className="text-forest underline" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>{" "}
            to request access, correction, or deletion of your personal data,
            subject to applicable law.
          </p>
          <h2 className="font-display text-2xl text-forest">Contact</h2>
          <p>
            {brand.name} · {brand.address} · {brand.phone} · {brand.email}
          </p>
        </div>
      </div>
    </article>
  );
}
