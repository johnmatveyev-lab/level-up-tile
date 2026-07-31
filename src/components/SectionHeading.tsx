import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 font-body text-xs font-medium tracking-[0.22em] uppercase",
            theme === "light" ? "text-gold-dark" : "text-gold",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-4xl md:text-5xl",
          theme === "light" ? "text-forest" : "text-cream",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            theme === "light" ? "text-ink-muted" : "text-cream/70",
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "mt-5 h-px w-12",
          theme === "light" ? "bg-gold" : "bg-gold/70",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}
