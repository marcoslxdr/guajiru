import Link from "next/link";
import type { ModalityRow } from "@/lib/supabase/types";

function isPlaceholder(value: string | null) {
  return Boolean(value?.startsWith("[") && value?.endsWith("]"));
}

export function ModalityList({ modalities }: { modalities: ModalityRow[] }) {
  if (modalities.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
        Nenhuma modalidade cadastrada.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
      {modalities.map((modality) => {
        const pending =
          isPlaceholder(modality.audience) || isPlaceholder(modality.training_schedule);

        return (
          <li key={modality.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
            <div>
              <p className="font-semibold text-foreground">{modality.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{modality.short_description}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span
                  className={`rounded-full px-2.5 py-0.5 font-medium ${
                    modality.published ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {modality.published ? "Publicada" : "Oculta"}
                </span>
                {pending ? (
                  <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 font-medium text-secondary">
                    Horários/categorias pendentes
                  </span>
                ) : null}
              </div>
            </div>
            <Link
              href={`/admin/modalidades/${modality.id}/edit`}
              className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Editar
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
