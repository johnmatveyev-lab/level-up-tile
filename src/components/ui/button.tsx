import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        gold: "bg-gold text-forest-deep hover:bg-gold-light shadow-sm",
        forest: "bg-forest text-cream hover:bg-forest-mid",
        outline:
          "border border-forest/20 bg-transparent text-forest hover:border-forest/40 hover:bg-forest/5",
        outlineLight:
          "border border-cream/30 bg-transparent text-cream hover:border-cream/60 hover:bg-cream/10",
        ghost: "text-forest hover:bg-forest/5",
        link: "text-gold underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-md",
        sm: "h-9 px-4 rounded-md text-xs",
        lg: "h-12 px-8 rounded-md text-sm tracking-wider uppercase",
        xl: "h-14 px-10 rounded-lg text-sm tracking-wider uppercase",
        pill: "h-12 px-8 rounded-full",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
