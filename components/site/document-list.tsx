import Link from "next/link";
import type { TransparencyDocument } from "@/lib/supabase/types";
import { DocumentCard } from "@/components/site/document-card";

const sectionLabels: Record<TransparencyDocument["doc_type"], string> = {
  estatuto: "Estatuto",
  ata: "Atas de reunião",
  relatório: "Relatórios financeiros",
};

const sectionDescriptions: Record<TransparencyDocument["doc_type"], string> = {
  estatuto: "Regras de funcionamento e governança do clube.",
  ata: "Registros oficiais das reuniões da diretoria e assembleias.",
  relatório: "Prestação de contas e demonstrativos financeiros.",
};

const sectionAnchors: Record<TransparencyDocument["doc_type"], string> = {
  estatuto: "estatuto",
  ata: "atas",
  relatório: "relatorios",
};

const DOC_TYPE_ORDER: TransparencyDocument["doc_type"][] = ["estatuto", "ata", "relatório"];

export function DocumentList({ documents }: { documents: TransparencyDocument[] }) {
  if (!documents.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/50 p-8 text-center sm:p-12">
        <p className="font-display text-2xl text-foreground">Documentos em preparação</p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Atas, estatuto e relatórios financeiros serão publicados aqui pela diretoria do clube.
          A gestão é voluntária e transparente.
        </p>
        <Link href="/diretoria" className="link-arrow mt-6 inline-flex">
          Conhecer a diretoria
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  const groups = documents.reduce<Record<string, TransparencyDocument[]>>((acc, doc) => {
    acc[doc.doc_type] = acc[doc.doc_type] ?? [];
    acc[doc.doc_type].push(doc);
    return acc;
  }, {});

  const activeTypes = DOC_TYPE_ORDER.filter((type) => groups[type]?.length);

  return (
    <div className="space-y-12">
      {activeTypes.length > 1 ? (
        <nav aria-label="Categorias de documentos" className="flex flex-wrap gap-2">
          {activeTypes.map((type) => (
            <a
              key={type}
              href={`#${sectionAnchors[type]}`}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {sectionLabels[type]}
            </a>
          ))}
        </nav>
      ) : null}

      {activeTypes.map((type) => {
        const docs = groups[type];
        return (
          <section key={type} id={sectionAnchors[type]} className="scroll-mt-28 space-y-4">
            <div className="space-y-1">
              <h3 className="font-display text-3xl leading-tight text-foreground">
                {sectionLabels[type]}
              </h3>
              <p className="text-sm text-muted-foreground">{sectionDescriptions[type]}</p>
            </div>
            <ul className="grid gap-3">
              {docs.map((doc) => (
                <li key={doc.id}>
                  <DocumentCard document={doc} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
