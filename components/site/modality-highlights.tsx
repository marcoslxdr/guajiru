import type { ModalityHighlight } from "@/lib/supabase/types";

type ModalityHighlightsProps = {
  highlights: ModalityHighlight[];
};

export function ModalityHighlights({ highlights }: ModalityHighlightsProps) {
  if (!highlights.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {highlights.map((highlight) => (
        <article
          key={highlight.title}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <h3 className="font-display text-2xl leading-tight text-foreground">{highlight.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{highlight.description}</p>
        </article>
      ))}
    </div>
  );
}
