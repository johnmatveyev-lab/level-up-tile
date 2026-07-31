import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

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
      aria-label="Level Up Tile home"
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-sm border border-current",
          gold,
          size === "sm" ? "h-9 w-9" : "h-11 w-11",
        )}
        aria-hidden
      >
        {/* Geometric LU monogram */}
        <svg
          viewBox="0 0 40 40"
          className={cn(size === "sm" ? "h-6 w-6" : "h-7 w-7")}
          fill="currentColor"
        >
          <path d="M8 8h5.2v17.2H22V30H8V8z" />
          <path d="M24 8h5.2v22H24V8z" opacity="0.85" />
          <path
            d="M8 8h18.2v3.2H13.2v14H22V28.4H8V8z"
            fill="none"
          />
        </svg>
      </span>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display tracking-[0.14em] uppercase",
            size === "sm" ? "text-[1.05rem]" : "text-lg",
            ink,
          )}
        >
          Level Up Tile
        </span>
        <span
          className={cn(
            "mt-1 font-body tracking-[0.28em] uppercase",
            size === "sm" ? "text-[0.55rem]" : "text-[0.6rem]",
            sub,
          )}
        >
          Luxury Tile & Stone
        </span>
      </div>
    </Link>
  );
}
