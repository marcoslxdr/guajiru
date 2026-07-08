import type { Metadata } from "next";
import { ModalityCard } from "@/components/site/modality-card";
import { ModalityCta } from "@/components/site/modality-cta";
import { SectionHeading } from "@/components/site/section-heading";
import { getAllModalities } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Modalidades",
  description:
    "Remo, basquete e atletismo no Clube Desportivo Guajiru — treinos, formação de atletas e esporte em Extremoz, RN.",
  keywords: ["modalidades Guajiru", "basquete Extremoz", "remo Extremoz", "atletismo RN"],
};

export default async function ModalidadesPage() {
  const modalities = await getAllModalities();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Esporte"
        title="Nossas modalidades"
        description="Remo na lagoa, basquete na quadra e atletismo em pista: formação esportiva no Clube Desportivo Guajiru."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modalities.map((modality) => (
          <ModalityCard key={modality.slug} modality={modality} />
        ))}
      </div>

      <ModalityCta />
    </div>
  );
}
