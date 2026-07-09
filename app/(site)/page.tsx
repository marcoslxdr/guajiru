import Image from "next/image";
import Link from "next/link";
import { FeaturedPostsSlider } from "@/components/site/featured-posts-slider";
import { Hero } from "@/components/site/hero";
import { NewsCard } from "@/components/site/news-card";
import { SectionHeading } from "@/components/site/section-heading";
import { SportsOrganizationJsonLd } from "@/components/seo/json-ld";
import { ModalityCard } from "@/components/site/modality-card";
import { clubFallbacks } from "@/lib/fallbacks";
import { getAllModalities, getGalleryImages, getLatestPosts } from "@/lib/supabase/queries";

export default async function HomePage() {
  const [posts, gallery, modalities] = await Promise.all([
    getLatestPosts(6),
    getGalleryImages(),
    getAllModalities(),
  ]);
  const sliderPosts = posts.slice(0, 3);
  const gridPosts = posts.slice(3);

  return (
    <>
      <SportsOrganizationJsonLd />
      <Hero slogan={clubFallbacks.slogan} foundingDate={clubFallbacks.foundingDate} />

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-8 h-44 w-44 rounded-full bg-accent/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-12 h-36 w-36 rounded-full bg-highlight/20 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Notícias"
              title="Últimas novidades"
              description="Comunicados e notícias do clube."
            />
            <Link href="/noticias" className="btn-outline shrink-0">
              Ver todas as notícias
            </Link>
          </div>

          <FeaturedPostsSlider posts={sliderPosts} />

          {gridPosts.length > 0 ? (
            <div className="mt-14 border-t border-border pt-14">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <h3 className="font-display text-3xl leading-tight text-foreground">Mais notícias</h3>
                <p className="text-sm text-muted-foreground">Acompanhe o que acontece no clube</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <NewsCard key={post.id} post={post} variant="tile" />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <SectionHeading
            eyebrow="Valores"
            title="O que nos move"
            description="Os princípios que guiam cada passo do nosso clube."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clubFallbacks.values.map((value, index) => (
              <li
                key={value.name}
                className={`rounded-2xl border p-5 ${
                  index % 3 === 0
                    ? "border-primary/20 bg-primary/5"
                    : index % 3 === 1
                      ? "border-accent/30 bg-accent/10"
                      : "border-secondary/30 bg-surface"
                }`}
              >
                <p className="font-semibold text-foreground">{value.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Esporte"
              title="Nossas modalidades"
              description="Remo na lagoa, basquete na quadra e atletismo em pista e campo."
            />
            <Link href="/modalidades" className="btn-outline shrink-0">
              Ver modalidades
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modalities.map((modality) => (
              <ModalityCard key={modality.slug} modality={modality} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Missão"
            title="Esporte e natureza em Extremoz"
            description={clubFallbacks.mission}
          />
          <div className="lg:pb-2">
            <Link href="/institucional" className="link-arrow">
              Conheça missão, visão e valores
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="Treinos" title="Galeria" description="Momentos dos treinos na lagoa." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.slice(0, 6).map((image) => (
              <figure key={image.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={image.image_url}
                  alt={image.caption ?? "Treino do clube"}
                  width={480}
                  height={360}
                  className="aspect-[4/3] w-full object-cover"
                />
                {image.caption ? (
                  <figcaption className="px-4 py-3 text-sm text-muted-foreground">{image.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
