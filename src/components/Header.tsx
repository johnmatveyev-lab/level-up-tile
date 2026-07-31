import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-ivory/95 backdrop-blur-md shadow-soft border-b border-border"
          : "bg-ivory/90 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
        <Logo size="sm" />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-3.5 py-2 text-[0.78rem] font-medium tracking-[0.12em] uppercase transition-colors",
                  active
                    ? "text-forest border-b-2 border-gold"
                    : "text-ink-muted hover:text-forest",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" variant="forest">
            <Link to="/contact">
              Start Your Project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-forest lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 bg-ivory transition-transform duration-300 md:top-[4.5rem] lg:hidden",
          open ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <nav className="flex h-full flex-col px-6 py-8" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="border-b border-border py-4 font-display text-3xl text-forest"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto pb-8">
            <Button asChild size="lg" className="w-full" variant="gold">
              <Link to="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
