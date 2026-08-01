import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/data";

type LogoProps = {
  className?: string;
  theme?: "light" | "dark";
  size?: "sm" | "md";
};

export function Logo({ className, theme = "dark", size = "md" }: LogoProps) {
  const ink = theme === "dark" ? "text-forest" : "text-cream";
  const gold = theme === "dark" ? "text-gold-dark" : "text-gold";
  const sub = theme === "dark" ? "text-stone" : "text-gold-light/80";

  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-3 no-underline", className)}
      aria-label={`${brand.name} home`}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-sm border border-current",
          gold,
          size === "sm" ? "h-9 w-9" : "h-11 w-11",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "font-display font-medium tracking-tight",
            size === "sm" ? "text-sm" : "text-base",
          )}
        >
          {brand.initials}
        </span>
      </span>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display tracking-[0.14em] uppercase",
            size === "sm" ? "text-[1.05rem]" : "text-lg",
            ink,
          )}
        >
          {brand.name}
        </span>
        <span
          className={cn(
            "mt-1 font-body tracking-[0.28em] uppercase",
            size === "sm" ? "text-[0.55rem]" : "text-[0.6rem]",
            sub,
          )}
        >
          {brand.sub}
        </span>
      </div>
    </Link>
  );
}
