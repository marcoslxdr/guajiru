import type { Metadata } from "next";
import { DocumentList } from "@/components/site/document-list";
import { SectionHeading } from "@/components/site/section-heading";
import { TransparencyContact } from "@/components/site/transparency-contact";
import { TransparencyFaq } from "@/components/site/transparency-faq";
import { TransparencyIntegrity } from "@/components/site/transparency-integrity";
import { TransparencyStructure } from "@/components/site/transparency-structure";
import { TransparencyVacancies } from "@/components/site/transparency-vacancies";
import { clubFallbacks } from "@/lib/fallbacks";
import {
  getPageDiretoria,
  getSiteSettings,
  getTransparencyDocuments,
} from "@/lib/supabase/queries";
import { formatTransparencyDate, latestDocumentTimestamp } from "@/lib/transparency";

export const metadata: Metadata = {
  title: "Transparência",
  description:
    "Documentos de transparência do Clube Desportivo Guajiru — atas, estatuto, relatórios, estrutura, vagas e canais de contato.",
  keywords: ["transparência clube esportivo", "estatuto Guajiru", "Extremoz"],
};

const pageNav = [
  { href: "#documentos", label: "Documentos" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#vagas-remuneracoes", label: "Vagas" },
  { href: "#integridade", label: "Integridade" },
  { href: "#faq", label: "FAQ" },
  { href: "#fale-conosco", label: "Fale conosco" },
];

export default async function TransparenciaPage() {
  const [documents, diretoria, settings] = await Promise.all([
    getTransparencyDocuments(),
    getPageDiretoria(),
    getSiteSettings(),
  ]);

  const boardMembers = diretoria?.board_members?.length
    ? diretoria.board_members
    : clubFallbacks.boardMembers;
  const fiscalCouncil = diretoria?.fiscal_council?.length
    ? diretoria.fiscal_council
    : clubFallbacks.fiscalCouncil;
  const article13Note = diretoria?.article13_note ?? clubFallbacks.article13Note;

  const address = settings?.address ?? clubFallbacks.address;
  const email =
    settings?.contact_email ?? process.env.CONTACT_EMAIL ?? clubFallbacks.contactEmail;
  const whatsapp = settings?.whatsapp ?? null;

  const lastUpdated = latestDocumentTimestamp(documents);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        as="h1"
        eyebrow="Transparência ativa"
        title="Documentos e informações públicas"
        description="Atas, estatuto, relatórios, estrutura organizacional, vagas, remunerações e canais oficiais de comunicação."
      />

      <p className="mb-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        {clubFallbacks.transparencyIntro}
      </p>

      {lastUpdated ? (
        <p className="mb-8 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Última atualização dos documentos:</span>{" "}
          <time dateTime={lastUpdated}>{formatTransparencyDate(lastUpdated)}</time>
        </p>
      ) : null}

      <nav aria-label="Seções da transparência" className="mb-12 flex flex-wrap gap-2">
        {pageNav.map((item) => (
          <a key={item.href} href={item.href} className="chip-button">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="space-y-16">
        <section id="documentos" className="scroll-mt-28 space-y-6" aria-labelledby="documentos-titulo">
          <div className="space-y-2">
            <h2 id="documentos-titulo" className="font-display text-3xl leading-tight text-foreground">
              Documentos públicos
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Consulte, abra ou baixe os PDFs oficiais. Tipos disponíveis: estatuto, atas,
              relatórios, estrutura/competências e vagas/remunerações.
            </p>
          </div>
          <DocumentList documents={documents} />
        </section>

        <TransparencyStructure
          boardMembers={boardMembers}
          fiscalCouncil={fiscalCouncil}
          roleCompetencies={clubFallbacks.roleCompetencies}
        />

        <TransparencyVacancies
          article13Note={article13Note}
          summary={clubFallbacks.vacanciesSummary}
          items={clubFallbacks.vacanciesAndRemuneration}
        />

        <TransparencyIntegrity lastUpdated={lastUpdated} documentCount={documents.length} />

        <TransparencyFaq items={clubFallbacks.transparencyFaq} />

        <TransparencyContact address={address} email={email} whatsapp={whatsapp} />
      </div>
    </div>
  );
}
