import type { Metadata } from "next";
import Link from "next/link";
import { DocumentList } from "@/components/site/document-list";
import { SectionHeading } from "@/components/site/section-heading";
import { clubFallbacks } from "@/lib/fallbacks";
import { getPageDiretoria, getTransparencyDocuments } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Transparência",
  description:
    "Documentos de transparência do Clube Desportivo Guajiru — atas, estatuto e relatórios.",
  keywords: ["transparência clube esportivo", "estatuto Guajiru", "Extremoz"],
};

export default async function TransparenciaPage() {
  const [documents, diretoria] = await Promise.all([
    getTransparencyDocuments(),
    getPageDiretoria(),
  ]);

  const governanceNote = diretoria?.article13_note ?? clubFallbacks.article13Note;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Transparência"
        title="Documentos públicos"
        description="Atas, estatuto e relatórios financeiros do clube, disponíveis para consulta."
      />

      <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
        {clubFallbacks.transparencyIntro}
      </p>

      <DocumentList documents={documents} />

      <section className="mt-14 rounded-2xl border border-secondary/30 bg-highlight/10 p-6 sm:p-8">
        <h2 className="font-display text-2xl tracking-wide text-secondary">Governança voluntária</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{governanceNote}</p>
        <Link href="/diretoria" className="link-arrow mt-4 inline-flex text-sm">
          Ver diretoria e conselho fiscal
          <span aria-hidden>→</span>
        </Link>
      </section>
    </div>
  );
}
