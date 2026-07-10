import type { Metadata } from "next";
import { BodyText } from "@/components/body-text";
import { SectionHeading } from "@/components/site/section-heading";
import { clubFallbacks } from "@/lib/fallbacks";
import { getPageHistoria } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "História",
  description:
    "História do Clube Desportivo Guajiru — remo, movimento olímpico e fundação em Extremoz, RN.",
  keywords: ["história Guajiru", "remo Extremoz", "clube esportivo RN"],
};

const modalityLabel: Record<string, string> = {
  clube: "Clube",
  basquete: "Basquete",
  atletismo: "Atletismo",
  remo: "Remo",
};

export default async function HistoriaPage() {
  const page = await getPageHistoria();
  const founders = page?.founders?.length ? page.founders : clubFallbacks.founders;
  const milestones = clubFallbacks.historyMilestones;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="História"
        title="Origem do clube"
        description="Movimento olímpico e remo na lagoa de Extremoz."
      />

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <BodyText text={page?.narrative ?? clubFallbacks.historyIntro} />
        <aside className="rounded-2xl border border-border bg-muted p-6">
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            Fundadores
          </h2>
          <ul className="space-y-4">
            {founders.map((founder) => (
              <li key={founder.name}>
                <p className="font-semibold">{founder.name}</p>
                {founder.bio ? (
                  <p className="text-sm text-muted-foreground">{founder.bio}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Linha do tempo"
          title="Marcos do clube"
          description="Eventos realizados e participações em ordem cronológica."
        />
        <ol className="mt-10 space-y-0 border-l border-border pl-6">
          {milestones.map((milestone) => (
            <li key={`${milestone.date}-${milestone.title}`} className="relative pb-10 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full bg-primary"
              />
              <div className="flex flex-wrap items-center gap-2">
                <time className="text-sm font-semibold text-primary">{milestone.date}</time>
                {milestone.modality ? (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    {modalityLabel[milestone.modality] ?? milestone.modality}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
                {milestone.title}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {milestone.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
