import Link from "next/link";

export type VacancyRemunerationItem = {
  title: string;
  detail: string;
  status: "aberta" | "encerrada" | "politica";
};

type TransparencyVacanciesProps = {
  article13Note: string;
  summary: string;
  items: VacancyRemunerationItem[];
};

const statusLabels: Record<VacancyRemunerationItem["status"], string> = {
  aberta: "Vaga aberta",
  encerrada: "Encerrada",
  politica: "Política",
};

const statusClasses: Record<VacancyRemunerationItem["status"], string> = {
  aberta: "bg-primary/12 text-primary",
  encerrada: "bg-muted text-muted-foreground",
  politica: "bg-highlight/35 text-secondary",
};

export function TransparencyVacancies({
  article13Note,
  summary,
  items,
}: TransparencyVacanciesProps) {
  return (
    <section id="vagas-remuneracoes" className="scroll-mt-28 space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-3xl leading-tight text-foreground">
          Vagas e remunerações
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{summary}</p>
      </div>

      <div className="rounded-2xl border border-secondary/30 bg-highlight/10 p-5 sm:p-6">
        <h3 className="font-display text-2xl text-secondary">Política de remuneração</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article13Note}</p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-border bg-surface p-5 shadow-[0_12px_32px_-24px_rgba(26,26,26,0.18)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClasses[item.status]}`}
              >
                {statusLabels[item.status]}
              </span>
            </div>
            <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link href="/contato#associar" className="btn-primary h-11 px-5 text-sm">
          Manifestar interesse em associar-se
        </Link>
        <a href="#documentos" className="btn-outline h-11 px-5 text-sm">
          Ver documentos públicos
        </a>
      </div>
    </section>
  );
}
