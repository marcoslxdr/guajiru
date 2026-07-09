import type { TransparencyDocument } from "@/lib/supabase/types";

const typeLabels: Record<TransparencyDocument["doc_type"], string> = {
  ata: "Ata",
  estatuto: "Estatuto",
  relatório: "Relatório",
};

const typeBadgeClasses: Record<TransparencyDocument["doc_type"], string> = {
  estatuto: "bg-primary/12 text-primary",
  ata: "bg-highlight/35 text-secondary",
  relatório: "bg-accent/35 text-foreground",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PdfIcon() {
  return (
    <svg
      aria-hidden
      className="size-6 shrink-0 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

export function DocumentCard({ document }: { document: TransparencyDocument }) {
  return (
    <a
      href={document.file_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[0_12px_32px_-24px_rgba(26,26,26,0.18)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_20px_40px_-20px_rgba(95,146,53,0.22)] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
          <PdfIcon />
        </span>
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeBadgeClasses[document.doc_type]}`}
            >
              {typeLabels[document.doc_type]}
            </span>
            <time dateTime={document.published_at} className="text-xs text-muted-foreground">
              {formatDate(document.published_at)}
            </time>
          </div>
          <p className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {document.title}
          </p>
        </div>
      </div>
      <span className="link-arrow shrink-0 text-xs sm:pl-4">
        Abrir PDF
        <span aria-hidden>→</span>
      </span>
    </a>
  );
}
