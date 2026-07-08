import type { TransparencyDocument } from "@/lib/supabase/types";

const labels: Record<TransparencyDocument["doc_type"], string> = {
  ata: "Atas",
  estatuto: "Estatuto",
  relatório: "Relatórios Financeiros",
};

export function DocumentList({ documents }: { documents: TransparencyDocument[] }) {
  if (!documents.length) {
    return (
      <p className="text-muted-foreground">
        Documentos serão publicados em breve pela diretoria do clube.
      </p>
    );
  }

  const groups = documents.reduce<Record<string, TransparencyDocument[]>>((acc, doc) => {
    acc[doc.doc_type] = acc[doc.doc_type] ?? [];
    acc[doc.doc_type].push(doc);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(groups).map(([type, docs]) => (
        <section key={type}>
          <h3 className="mb-4 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            {labels[type as TransparencyDocument["doc_type"]]}
          </h3>
          <ul className="space-y-3">
            {docs.map((doc) => (
              <li key={doc.id}>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
