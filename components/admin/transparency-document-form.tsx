"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteTransparencyDocumentAction, saveTransparencyDocumentAction } from "@/lib/admin/actions";
import type { TransparencyDocument } from "@/lib/supabase/types";
import { PdfUpload } from "./pdf-upload";

export function TransparencyDocumentForm({ document }: { document?: TransparencyDocument }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  function submit(formData: FormData) {
    setMessage(null);
    if (document?.id) {
      formData.set("id", document.id);
    }

    startTransition(async () => {
      const result = await saveTransparencyDocumentAction(formData);
      if (!result.ok) {
        setMessage({ type: "error", text: result.error ?? "Erro ao salvar." });
        return;
      }

      setMessage({ type: "success", text: "Documento salvo com sucesso." });
      router.push(`/admin/transparencia/${result.id}/edit`);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!document?.id) return;
    if (!window.confirm("Excluir este documento permanentemente?")) return;

    startTransition(async () => {
      const result = await deleteTransparencyDocumentAction(document.id);
      if (!result.ok) {
        setMessage({ type: "error", text: result.error ?? "Erro ao excluir." });
        return;
      }
      router.push("/admin/transparencia");
      router.refresh();
    });
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      {message ? (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-primary/10 text-primary"}`}
        >
          {message.text}
        </p>
      ) : null}

      <form action={submit} className="space-y-5">
        <div>
          <label htmlFor="doc-title" className="mb-1 block text-sm font-medium">
            Título
          </label>
          <input
            id="doc-title"
            name="title"
            required
            defaultValue={document?.title ?? ""}
            placeholder="Ex.: Ata da assembleia geral 2025"
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="doc-type" className="mb-1 block text-sm font-medium">
            Tipo
          </label>
          <select
            id="doc-type"
            name="doc_type"
            required
            defaultValue={document?.doc_type ?? "ata"}
            className="input-field"
          >
            <option value="estatuto">Estatuto</option>
            <option value="ata">Ata de reunião</option>
            <option value="relatório">Relatório financeiro</option>
          </select>
        </div>

        <div>
          <label htmlFor="doc-published-at" className="mb-1 block text-sm font-medium">
            Data de publicação
          </label>
          <input
            id="doc-published-at"
            name="published_at"
            type="date"
            required
            defaultValue={document?.published_at?.slice(0, 10) ?? today}
            className="input-field"
          />
        </div>

        <div>
          <p className="mb-1 block text-sm font-medium">Arquivo PDF</p>
          <PdfUpload name="file" currentUrl={document?.file_url} required={!document} />
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={isPending} className="btn-primary h-11">
            {document ? "Salvar alterações" : "Publicar documento"}
          </button>
          <Link href="/admin/transparencia" className="btn-outline h-11">
            Voltar
          </Link>
        </div>
      </form>

      {document?.id ? (
        <div className="border-t border-border pt-4">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex h-11 items-center justify-center rounded-full border border-red-200 px-6 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            Excluir documento
          </button>
        </div>
      ) : null}
    </div>
  );
}
