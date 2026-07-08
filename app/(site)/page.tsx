import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { NewsCard } from "@/components/site/news-card";
import { SectionHeading } from "@/components/site/section-heading";
import { SportsOrganizationJsonLd } from "@/components/seo/json-ld";
import { clubFallbacks } from "@/lib/fallbacks";
import { getGalleryImages, getLatestPosts } from "@/lib/supabase/queries";

export default async function HomePage() {
  const [posts, gallery] = await Promise.all([getLatestPosts(3), getGalleryImages()]);

  return (
    <>
      <SportsOrganizationJsonLd />
      <Hero slogan={clubFallbacks.slogan} foundingDate={clubFallbacks.foundingDate} />

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Missão"
          title="Esporte e natureza em Extremoz"
          description={clubFallbacks.mission}
        />
        <Link
          href="/institucional"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Conheça nossa missão, visão e valores
        </Link>
      </section>

      <section className="border-y border-border bg-muted/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Notícias"
            title="Últimas novidades"
            description="Comunicados e notícias do clube."
          />
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Em breve publicaremos notícias e comunicados da diretoria.
            </p>
          )}
          <Link
            href="/noticias"
            className="mt-8 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Ver todas as notícias
          </Link>
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="Treinos" title="Galeria" />
          <p className="text-muted-foreground">{gallery.length} fotos publicadas no CMS.</p>
        </section>
      ) : null}
    </>
  );
}
