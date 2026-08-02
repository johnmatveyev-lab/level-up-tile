import { useState } from "react";
import { Calculator } from "lucide-react";
import { quoteBands } from "@/lib/data";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function QuoteEstimator({ className }: { className?: string }) {
  const [selected, setSelected] = useState(quoteBands[1]?.id ?? "bath");
  const band = quoteBands.find((b) => b.id === selected) ?? quoteBands[0];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-cream p-6 shadow-soft md:p-8",
        className,
      )}
      data-testid="quote-estimator"
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-forest-soft">
          <Calculator className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-display text-2xl text-forest md:text-3xl">
            Project ballpark
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Indicative ranges for planning—not a formal bid. Final numbers follow
            a site consult.
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {quoteBands.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => {
              setSelected(b.id);
              track("quote_estimate", { band: b.id });
            }}
            className={cn(
              "rounded-xl border px-4 py-3 text-left transition-colors",
              selected === b.id
                ? "border-gold bg-ivory text-forest"
                : "border-border bg-ivory/50 text-ink-muted hover:border-forest/20",
            )}
          >
            <p className="text-sm font-medium text-forest">{b.label}</p>
            <p className="mt-0.5 text-xs text-stone">{b.sqftHint}</p>
          </button>
        ))}
      </div>

      {band && (
        <div className="mt-6 rounded-xl bg-forest-deep px-5 py-5 text-cream">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-gold">
            Estimated range
          </p>
          <p className="mt-2 font-display text-3xl text-cream">{band.range}</p>
          <p className="mt-2 text-sm text-cream/70">{band.note}</p>
          <Button asChild className="mt-5" variant="gold" size="sm">
            <Link
              to="/contact"
              onClick={() => track("cta_click", { from: "quote_estimator" })}
            >
              Book consult for a firm quote
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
