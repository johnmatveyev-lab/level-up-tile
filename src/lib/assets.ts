/** Image URLs — public repo CDN so production always resolves assets. */
const CDN =
  "https://cdn.jsdelivr.net/gh/johnmatveyev-lab/level-up-tile@main/public/images";

export function img(filename: string) {
  // Prefer local public assets in browser when available (dev + deployed static)
  if (typeof window !== "undefined") {
    return `/images/${filename}`;
  }
  // SSR fallback also uses local path (files shipped with deploy)
  return `/images/${filename}`;
}

/** CDN absolute URL (used when packing a text-only deploy without binaries) */
export function imgCdn(filename: string) {
  return `${CDN}/${filename}`;
}
