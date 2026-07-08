import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { RichText } from "@/components/portable-text";
import { clubFallbacks } from "@/lib/fallbacks";
import { getPageInstitucional } from "@/lib/sanity/queries";
import type { PortableTextBlock } from "@portabletext/types";

export const metadata: Metadata = {
  title: "Institucional",
  description:
    "Missão, visão e valores do Clube Desportivo Guajiru — esporte e preservação ambiental em Extremoz, RN.",
  keywords: ["clube esportivo Extremoz", "missão Guajiru", "remo RN"],
};

function toBlocks(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: "fallback",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "span", text, marks: [] }],
    },
  ];
}

export default async function InstitucionalPage() {
  const page = await getPageInstitucional();
  const values = page?.values?.length ? page.values : clubFallbacks.values;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Institucional"
        title="Quem somos"
        description="Transformação pelo esporte e preservação ambiental."
      />

      <div className="grid gap-12 lg:grid-cols-3">
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-primary">Missão</h2>
          <RichText value={page?.mission ?? toBlocks(clubFallbacks.mission)} />
        </section>
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-primary">Visão</h2>
          <RichText value={page?.vision ?? toBlocks(clubFallbacks.vision)} />
        </section>
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-primary">Valores</h2>
          <ul className="space-y-2">
            {values.map((value) => (
              <li key={value} className="rounded-lg border border-border bg-background px-4 py-2">
                {value}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
