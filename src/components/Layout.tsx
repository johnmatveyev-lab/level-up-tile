import { Header } from "./Header";
import { Footer } from "./Footer";
import { VoiceAgent } from "./VoiceAgent";
import { Analytics } from "./Analytics";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Analytics />
      <Header />
      <main className="flex-1 pt-[4.5rem]">{children}</main>
      <Footer />
      <VoiceAgent />
    </div>
  );
}
