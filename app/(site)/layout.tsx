import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getSiteSettings } from "@/lib/sanity/queries";
import { clubFallbacks } from "@/lib/fallbacks";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer address={settings?.address ?? clubFallbacks.address} />
    </div>
  );
}
