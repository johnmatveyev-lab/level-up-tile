import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  title?: string;
  description?: string;
  image?: string;
};

export function CtaBand({
  title = "Ready to Level Up?",
  description = "Premium tile design and installation for Greenville and the Upstate. Book a consultation and let's elevate every surface.",
  image = "/images/cta-hex.jpg",
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-forest-deep/80" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-20 md:px-8 md:py-28 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] uppercase text-gold">
            Next Step
          </p>
          <h2 className="font-display text-4xl text-cream md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-cream/75 md:text-lg">
            {description}
          </p>
        </div>
        <Button asChild size="xl" variant="gold">
          <Link to="/contact">
            Book Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
