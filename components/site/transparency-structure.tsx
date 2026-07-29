import Image from "next/image";
import Link from "next/link";
import type { BoardMember } from "@/lib/supabase/types";

type TransparencyStructureProps = {
  boardMembers: BoardMember[];
  fiscalCouncil: string[];
  roleCompetencies: Record<string, string>;
};

const DEFAULT_COMPETENCY =
  "Atribuições definidas pelo estatuto e deliberações da diretoria do clube.";

function MemberInitials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span className="flex size-full items-center justify-center bg-muted text-sm font-semibold text-primary">
      {initials || "?"}
    </span>
  );
}

export function TransparencyStructure({
  boardMembers,
  fiscalCouncil,
  roleCompetencies,
}: TransparencyStructureProps) {
  return (
    <section id="estrutura" className="scroll-mt-28 space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-3xl leading-tight text-foreground">
          Estrutura organizacional
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Registro das competências e da composição da diretoria e do conselho fiscal do clube.
          Documentos complementares ficam na seção de PDFs (tipo “Estrutura”).
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <h3 className="font-display text-2xl text-foreground">Diretoria</h3>
          <ul className="mt-4 space-y-4">
            {boardMembers.map((member) => {
              const competency = roleCompetencies[member.role] ?? DEFAULT_COMPETENCY;
              return (
                <li
                  key={`${member.role}-${member.name}`}
                  className="flex gap-3 border-b border-border pb-4 last:border-0 last:pb-0 sm:gap-4"
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-border bg-muted sm:size-16">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={`Retrato de ${member.name}`}
                        fill
                        className="object-cover object-top"
                        sizes="64px"
                      />
                    ) : (
                      <MemberInitials name={member.name} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                      {member.role}
                    </p>
                    <p className="mt-1 font-semibold text-foreground">{member.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{competency}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <h3 className="font-display text-2xl text-foreground">Conselho Fiscal</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Fiscaliza a gestão financeira e patrimonial, zelando pela regularidade das contas do
            clube.
          </p>
          <ul className="mt-4 space-y-2">
            {fiscalCouncil.map((name) => (
              <li key={name} className="text-sm font-medium text-foreground">
                {name}
              </li>
            ))}
          </ul>
          <Link href="/diretoria" className="link-arrow mt-6 inline-flex text-sm">
            Ver página da diretoria
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
