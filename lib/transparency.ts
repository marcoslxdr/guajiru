import type { TransparencyDocument } from "@/lib/supabase/types";

export const TRANSPARENCY_DOC_TYPES = [
  "estatuto",
  "ata",
  "relatório",
  "estrutura",
  "remuneração",
] as const satisfies readonly TransparencyDocument["doc_type"][];

export type TransparencyDocType = (typeof TRANSPARENCY_DOC_TYPES)[number];

export const TRANSPARENCY_DOC_TYPE_SET = new Set<TransparencyDocType>(TRANSPARENCY_DOC_TYPES);

export const transparencyDocTypeMeta: Record<
  TransparencyDocType,
  {
    label: string;
    shortLabel: string;
    sectionTitle: string;
    description: string;
    anchor: string;
    badgeClass: string;
  }
> = {
  estatuto: {
    label: "Estatuto",
    shortLabel: "Estatuto",
    sectionTitle: "Estatuto",
    description: "Regras de funcionamento e governança do clube.",
    anchor: "estatuto",
    badgeClass: "bg-primary/12 text-primary",
  },
  ata: {
    label: "Ata de reunião",
    shortLabel: "Atas",
    sectionTitle: "Atas de reunião",
    description: "Registros oficiais das reuniões da diretoria e assembleias.",
    anchor: "atas",
    badgeClass: "bg-highlight/35 text-secondary",
  },
  relatório: {
    label: "Relatório financeiro",
    shortLabel: "Relatórios",
    sectionTitle: "Relatórios e dados econômicos",
    description: "Prestação de contas, demonstrativos financeiros e documentos cadastrais.",
    anchor: "relatorios",
    badgeClass: "bg-accent/35 text-foreground",
  },
  estrutura: {
    label: "Estrutura e competências",
    shortLabel: "Estrutura",
    sectionTitle: "Estrutura e competências",
    description: "Documentos sobre organograma, atribuições e competências institucionais.",
    anchor: "docs-estrutura",
    badgeClass: "bg-secondary/15 text-secondary",
  },
  remuneração: {
    label: "Vagas e remunerações",
    shortLabel: "Vagas",
    sectionTitle: "Vagas e remunerações",
    description: "Informações sobre cargos, voluntariado e política de remuneração.",
    anchor: "docs-remuneracao",
    badgeClass: "bg-muted text-foreground",
  },
};

export function isTransparencyDocType(value: string): value is TransparencyDocType {
  return TRANSPARENCY_DOC_TYPE_SET.has(value as TransparencyDocType);
}

export const DEFAULT_DOCUMENT_SOURCE =
  "Publicado pela diretoria do Clube Desportivo Guajiru";

export function formatTransparencyDate(iso: string) {
  const dateOnly = iso.slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    const [year, month, day] = dateOnly.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function documentUpdatedAt(doc: TransparencyDocument) {
  return doc.updated_at || doc.published_at;
}

export function latestDocumentTimestamp(documents: TransparencyDocument[]) {
  return documents.reduce<string | null>((latest, doc) => {
    const stamp = documentUpdatedAt(doc);
    if (!latest || stamp > latest) return stamp;
    return latest;
  }, null);
}
