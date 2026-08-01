import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { brand, copy, nav } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo theme="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {copy.footerBlurb}
            </p>
          </div>

          <div>
            <h3 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-cream/75 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold">
              Visit
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {brand.address}
                  <br />
                  {brand.serving}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`tel:${brand.phone.replace(/\D/g, "")}`}
                  className="hover:text-gold transition-colors"
                >
                  {brand.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${brand.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold">
              Hours
            </h3>
            <p className="mt-4 text-sm text-cream/75">{brand.hours}</p>
            <p className="mt-6 font-display text-2xl text-gold-light italic">
              {brand.tagline}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="tracking-[0.15em] uppercase">{brand.regionBadge}</p>
        </div>
      </div>
    </footer>
  );
}
