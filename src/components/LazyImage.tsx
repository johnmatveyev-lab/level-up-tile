import { cn } from "@/lib/utils";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Prefer lazy for below-fold images (default true). Hero should pass false. */
  eager?: boolean;
};

/** Optimized image: lazy by default, async decode, sensible object-fit. */
export function LazyImage({
  className,
  eager = false,
  alt = "",
  ...rest
}: Props) {
  return (
    <img
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn(className)}
      {...rest}
    />
  );
}
