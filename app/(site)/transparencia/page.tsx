import type { Metadata } from "next";
import { DocumentList } from "@/components/site/document-list";
import { SectionHeading } from "@/components/site/section-heading";
import { getTransparencyDocuments } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Transparência",
  description:
    "Documentos de transparência do Clube Desportivo Guajiru — atas, estatuto e relatórios.",
  keywords: ["transparência clube esportivo", "estatuto Guajiru", "Extremoz"],
};

export default async function TransparenciaPage() {
  const documents = await getTransparencyDocuments();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Transparência"
        title="Documentos oficiais"
        description="Atas, estatuto e relatórios financeiros do clube."
      />
      <DocumentList documents={documents} />
    </div>
  );
}
