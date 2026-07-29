import {
  DEFAULT_DOCUMENT_SOURCE,
  formatTransparencyDate,
} from "@/lib/transparency";

type TransparencyIntegrityProps = {
  lastUpdated: string | null;
  documentCount: number;
};

export function TransparencyIntegrity({ lastUpdated, documentCount }: TransparencyIntegrityProps) {
  return (
    <section
      id="integridade"
      className="scroll-mt-28 rounded-2xl border border-border bg-surface p-5 sm:p-6"
      aria-labelledby="integridade-titulo"
    >
      <h2 id="integridade-titulo" className="font-display text-3xl leading-tight text-foreground">
        Autenticidade e atualização
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Os documentos desta página são publicados pela gestão do clube para consulta pública. Cada
        arquivo exibe data de publicação, data de atualização, origem e, quando disponível, hash
        SHA-256 do PDF para verificação de integridade.
      </p>

      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-secondary">
            Última atualização
          </dt>
          <dd className="mt-2 text-sm font-semibold text-foreground">
            {lastUpdated ? (
              <time dateTime={lastUpdated}>{formatTransparencyDate(lastUpdated)}</time>
            ) : (
              "Sem documentos publicados"
            )}
          </dd>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-secondary">
            Documentos listados
          </dt>
          <dd className="mt-2 text-sm font-semibold text-foreground">{documentCount}</dd>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-secondary">Origem padrão</dt>
          <dd className="mt-2 text-sm font-semibold text-foreground">{DEFAULT_DOCUMENT_SOURCE}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Para conferir o hash: baixe o PDF, calcule o SHA-256 no seu computador e compare com o valor
        exibido no card do documento. Divergências devem ser reportadas à diretoria pelos canais
        oficiais.
      </p>
    </section>
  );
}
