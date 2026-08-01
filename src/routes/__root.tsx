import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { Layout } from "@/components/Layout";
import { brand, pageTitle } from "@/lib/data";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: pageTitle() },
      { name: "description", content: brand.description },
      { property: "og:title", content: `${brand.name} | ${brand.tagline}` },
      { property: "og:description", content: brand.description },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: brand.themeColor },
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
