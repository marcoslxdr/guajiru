import type { Metadata } from "next";
import { BoardMemberCard } from "@/components/site/board-member-card";
import { SectionHeading } from "@/components/site/section-heading";
import { clubFallbacks } from "@/lib/fallbacks";
import { getPageDiretoria } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Diretoria",
  description:
    "Diretoria e governança do Clube Desportivo Guajiru — gestão não remunerada conforme estatuto.",
  keywords: ["diretoria Guajiru", "governança clube esportivo", "Extremoz"],
};

export default async function DiretoriaPage() {
  const page = await getPageDiretoria();

  const boardMembers = page?.board_members?.length
    ? page.board_members
    : clubFallbacks.boardRoles.map((role) => ({ role, name: "" }));

  const fiscalCouncil = page?.fiscal_council?.length
    ? page.fiscal_council
    : clubFallbacks.fiscalCouncil;

  const article13Note = page?.article13_note ?? clubFallbacks.article13Note;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Governança"
        title="Diretoria e Conselho Fiscal"
        description="Transparência na gestão do clube."
      />

      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {boardMembers.map((member) => (
          <BoardMemberCard key={member.role} role={member.role} name={member.name} />
        ))}
      </div>

      <section className="mb-12 rounded-2xl border border-border bg-muted p-6">
        <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">Conselho Fiscal</h2>
        <ul className="space-y-2">
          {fiscalCouncil.map((name) => (
            <li key={name} className="text-base font-medium">
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-secondary/30 bg-highlight/10 p-6">
        <h2 className="mb-2 font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-secondary">
          Artigo 13 do Estatuto
        </h2>
        <p className="text-muted-foreground">{article13Note}</p>
      </section>
    </div>
  );
}
