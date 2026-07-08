import Link from "next/link";
import type { TransparencyDocument } from "@/lib/supabase/types";

const DOC_TYPE_LABELS: Record<TransparencyDocument["doc_type"], string> = {
  ata: "Ata",
  estatuto: "Estatuto",
  relatório: "Relatório",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function TransparencyDocumentList({ documents }: { documents: TransparencyDocument[] }) {
  if (!documents.length) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-muted-foreground">Nenhum documento publicado ainda.</p>
        <Link href="/admin/transparencia/new" className="btn-primary mt-4 inline-flex h-11">
          Anexar primeiro documento
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Publicado em</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 font-medium">{doc.title}</td>
                <td className="px-4 py-3">{DOC_TYPE_LABELS[doc.doc_type]}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(doc.published_at)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/transparencia/${doc.id}/edit`} className="link-arrow">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
