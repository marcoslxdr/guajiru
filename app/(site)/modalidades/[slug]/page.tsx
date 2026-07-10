import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ModalityCta } from "@/components/site/modality-cta";
import { ModalityGallery } from "@/components/site/modality-gallery";
import { ModalityHighlights } from "@/components/site/modality-highlights";
import { ModalityInfoPanel } from "@/components/site/modality-info-panel";
import { SectionHeading } from "@/components/site/section-heading";
import { getAllModalitySlugs, getModalityBySlug } from "@/lib/supabase/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const accentClasses = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-primary-foreground",
  accent: "bg-accent text-foreground",
} as const;

export async function generateStaticParams() {
  const slugs = await getAllModalitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const modality = await getModalityBySlug(slug);

  if (!modality) return { title: "Modalidade não encontrada" };

  return {
    title: modality.name,
    description: modality.shortDescription,
    keywords: modality.keywords,
  };
}

export default async function ModalityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const modality = await getModalityBySlug(slug);

  if (!modality) notFound();

  return (
    <>
      <section className="relative min-h-[min(52vh,520px)] overflow-hidden border-b border-border">
        <Image
          src={modality.heroImage.src}
          alt={modality.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[min(52vh,520px)] w-full max-w-6xl flex-col justify-end px-6 pb-12 pt-28">
          <div className="hero-readable max-w-2xl space-y-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${accentClasses[modality.accent]}`}
            >
              Modalidade
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] text-primary-foreground">
              {modality.name}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/90">
              {modality.shortDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <section>
          <SectionHeading eyebrow="Sobre" title={`${modality.name} no Guajiru`} />
          <div className="max-w-3xl space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground">{modality.description}</p>
            {modality.introParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {modality.highlights.length > 0 ? (
          <section className="mt-16">
            <SectionHeading eyebrow="Destaques" title="O que define esta modalidade" />
            <ModalityHighlights highlights={modality.highlights} />
          </section>
        ) : null}

        <section className="mt-16">
          <SectionHeading eyebrow="Formação" title="O que o atleta desenvolve" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {modality.trainingFocus.length > 0 ? (
              <ul className="space-y-3">
                {modality.trainingFocus.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-foreground"
                  >
                    <span aria-hidden className="mt-0.5 text-primary">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Conteúdo em atualização.</p>
            )}
            <ModalityInfoPanel
              location={modality.location}
              audience={modality.audience}
              trainingSchedule={modality.trainingSchedule}
            />
          </div>
        </section>

        {modality.gallery.length > 0 ? (
          <section className="mt-16">
            <SectionHeading
              eyebrow="Galeria"
              title="Momentos da modalidade"
              description={`Treinos e competições de ${modality.name.toLowerCase()} no Clube Desportivo Guajiru.`}
            />
            <ModalityGallery images={modality.gallery} />
          </section>
        ) : null}

        <ModalityCta />
      </div>
    </>
  );
}
