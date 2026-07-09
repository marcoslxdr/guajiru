import type { Metadata } from "next";
import { BodyText } from "@/components/body-text";
import { SectionHeading } from "@/components/site/section-heading";
import { clubFallbacks } from "@/lib/fallbacks";
import { getPageInstitucional } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Institucional",
  description:
    "Missão, visão e valores do Clube Desportivo Guajiru — esporte e preservação ambiental em Extremoz, RN.",
  keywords: ["clube esportivo Extremoz", "missão Guajiru", "remo RN"],
};

function resolveValues(valueNames: string[] | null | undefined) {
  const names = valueNames?.length
    ? valueNames
    : clubFallbacks.values.map((value) => value.name);

  return names.map((name) => {
    const fallback = clubFallbacks.values.find((value) => value.name === name);
    return { name, description: fallback?.description ?? "" };
  });
}

export default async function InstitucionalPage() {
  const page = await getPageInstitucional();
  const values = resolveValues(page?.values);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Institucional"
        title="Quem somos"
        description="Esporte, consciência ambiental e impacto social no Rio Grande do Norte."
      />

      <div className="mb-12 max-w-3xl">
        <BodyText text={clubFallbacks.institutionalIntro} />
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-primary">Missão</h2>
          <BodyText text={page?.mission ?? clubFallbacks.mission} />
        </section>
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-primary">Visão</h2>
          <BodyText text={page?.vision ?? clubFallbacks.vision} />
        </section>
      </div>

      <section className="mt-12 space-y-6">
        <div>
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-primary">Valores</h2>
          <p className="mt-2 text-muted-foreground">
            Os princípios que guiam cada passo do nosso clube:
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <li
              key={value.name}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <p className="font-semibold text-foreground">{value.name}</p>
              {value.description ? (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
