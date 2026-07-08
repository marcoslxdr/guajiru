import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { clubFallbacks } from "@/lib/fallbacks";
import { getAllModalities, getSiteSettings } from "@/lib/supabase/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, modalities] = await Promise.all([getSiteSettings(), getAllModalities()]);
  const modalityNav = modalities.map((modality) => ({
    slug: modality.slug,
    name: modality.name,
  }));

  return (
    <div className="flex min-h-full flex-col">
      <Header modalities={modalityNav} />
      <main className="flex-1">{children}</main>
      <Footer address={settings?.address ?? clubFallbacks.address} />
    </div>
  );
}
