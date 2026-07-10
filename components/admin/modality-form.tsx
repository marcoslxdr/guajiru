"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveModalityAction } from "@/lib/admin/actions";
import type { ModalityRow } from "@/lib/supabase/types";

export function ModalityForm({ modality }: { modality: ModalityRow }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  function handleSubmit(formData: FormData) {
    setMessage(null);
    formData.set("id", modality.id);

    startTransition(async () => {
      const result = await saveModalityAction(formData);
      if (!result.ok) {
        setMessage({ type: "error", text: result.error ?? "Erro ao salvar." });
        return;
      }
      setMessage({ type: "success", text: "Modalidade salva." });
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {message ? (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-primary/10 text-primary"}`}
        >
          {message.text}
        </p>
      ) : null}

      <form action={handleSubmit} className="max-w-2xl space-y-4">
        <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm">
          <p className="font-semibold text-foreground">{modality.name}</p>
          <p className="text-muted-foreground">Slug: /modalidades/{modality.slug}</p>
        </div>

        <div>
          <label htmlFor="short_description" className="mb-1 block text-sm font-medium">
            Resumo
          </label>
          <textarea
            id="short_description"
            name="short_description"
            required
            rows={2}
            defaultValue={modality.short_description}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            defaultValue={modality.description}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="location" className="mb-1 block text-sm font-medium">
            Local
          </label>
          <input id="location" name="location" defaultValue={modality.location ?? ""} className="input-field" />
        </div>

        <div>
          <label htmlFor="audience" className="mb-1 block text-sm font-medium">
            Público / categorias etárias
          </label>
          <textarea
            id="audience"
            name="audience"
            rows={2}
            defaultValue={modality.audience ?? ""}
            placeholder="Ex.: Sub-12, Sub-15 e adulto"
            className="input-field"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Remova o texto entre colchetes ao preencher o valor real.
          </p>
        </div>

        <div>
          <label htmlFor="training_schedule" className="mb-1 block text-sm font-medium">
            Horários de treino
          </label>
          <textarea
            id="training_schedule"
            name="training_schedule"
            rows={3}
            defaultValue={modality.training_schedule ?? ""}
            placeholder="Ex.: Terças e quintas, 18h–20h"
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="training_focus" className="mb-1 block text-sm font-medium">
            Foco dos treinos
          </label>
          <textarea
            id="training_focus"
            name="training_focus"
            rows={4}
            defaultValue={(modality.training_focus ?? []).join("\n")}
            placeholder="Uma linha por item"
            className="input-field"
          />
          <p className="mt-1 text-xs text-muted-foreground">Uma linha por item.</p>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="published"
            defaultChecked={modality.published}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Publicada no site
        </label>

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" disabled={isPending} className="btn-primary h-11">
            {isPending ? "Salvando..." : "Salvar modalidade"}
          </button>
          <Link href="/admin/modalidades" className="btn-outline h-11">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
