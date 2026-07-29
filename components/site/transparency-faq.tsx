export type FaqItem = {
  question: string;
  answer: string;
};

export function TransparencyFaq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  return (
    <section id="faq" className="scroll-mt-28 space-y-6" aria-labelledby="faq-titulo">
      <div className="space-y-2">
        <h2 id="faq-titulo" className="font-display text-3xl leading-tight text-foreground">
          Perguntas frequentes
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Respostas rápidas sobre transparência, documentos e comunicação com o clube.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const panelId = `faq-painel-${index}`;
          const summaryId = `faq-pergunta-${index}`;
          return (
            <details
              key={item.question}
              className="group rounded-2xl border border-border bg-surface px-5 py-4 open:border-primary/25"
            >
              <summary
                id={summaryId}
                aria-controls={panelId}
                className="cursor-pointer list-none font-semibold text-foreground marker:content-none focus-visible:rounded-lg [&::-webkit-details-marker]:hidden"
              >
                <span className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p
                id={panelId}
                role="region"
                aria-labelledby={summaryId}
                className="mt-3 text-sm leading-relaxed text-muted-foreground"
              >
                {item.answer}
              </p>
            </details>
          );
        })}
      </div>
    </section>
  );
}
