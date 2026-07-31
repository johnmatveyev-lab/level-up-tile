import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { Layout } from "@/components/Layout";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Level Up Tile | Luxury Tile & Stone — Greenville & Upstate SC",
      },
      {
        name: "description",
        content:
          "Premium tile and stone design + installation in Greenville and Upstate South Carolina. Elevate every surface with Level Up Tile.",
      },
      { property: "og:title", content: "Level Up Tile | Elevate Every Surface" },
      {
        property: "og:description",
        content:
          "Luxury tile & stone design and installation for Greenville & Upstate SC.",
      },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#0f2e24" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Layout>
            <Outlet />
          </Layout>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
