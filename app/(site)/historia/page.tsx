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

export default async function HistoriaPage() {
  const page = await getPageHistoria();
  const founders = page?.founders?.length ? page.founders : clubFallbacks.founders;

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
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">Fundadores</h2>
          <ul className="space-y-4">
            {founders.map((founder) => (
              <li key={founder.name}>
                <p className="font-semibold">{founder.name}</p>
                {founder.bio ? <p className="text-sm text-muted-foreground">{founder.bio}</p> : null}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
