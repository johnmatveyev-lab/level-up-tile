import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  compact,
}: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-forest-deep",
        compact ? "py-16 md:py-20" : "py-20 md:py-28",
      )}
    >
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/90 to-forest-deep/50" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {eyebrow && (
          <p className="mb-3 text-xs font-medium tracking-[0.22em] uppercase text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-display text-4xl text-cream md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base text-cream/75 md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
