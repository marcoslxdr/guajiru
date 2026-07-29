import { AccessibilityProvider } from "@/components/site/accessibility-provider";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { clubFallbacks } from "@/lib/fallbacks";
import { buildSiteSearchIndex } from "@/lib/site-search";
import {
  getAllModalities,
  getAllPosts,
  getSiteSettings,
  getTransparencyDocuments,
} from "@/lib/supabase/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, modalities, posts, documents] = await Promise.all([
    getSiteSettings(),
    getAllModalities(),
    getAllPosts(),
    getTransparencyDocuments(),
  ]);

  const modalityNav = modalities.map((modality) => ({
    slug: modality.slug,
    name: modality.name,
  }));

  const searchItems = buildSiteSearchIndex({
    posts,
    documents,
    modalities: modalities.map((modality) => ({
      slug: modality.slug,
      name: modality.name,
      shortDescription: modality.shortDescription,
    })),
  });

  return (
    <AccessibilityProvider>
      <div className="flex min-h-full flex-col">
        <a href="#conteudo-principal" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <Header modalities={modalityNav} searchItems={searchItems} />
        <main id="conteudo-principal" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer address={settings?.address ?? clubFallbacks.address} />
      </div>
    </AccessibilityProvider>
  );
}
