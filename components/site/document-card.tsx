"use client";

import { useMemo, useState } from "react";
import type { TransparencyDocument } from "@/lib/supabase/types";
import {
  DEFAULT_DOCUMENT_SOURCE,
  documentUpdatedAt,
  formatTransparencyDate,
  transparencyDocTypeMeta,
} from "@/lib/transparency";

function pdfFilename(title: string) {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `${slug || "documento"}.pdf`;
}

function isSameOrigin(url: string) {
  if (url.startsWith("/")) return true;
  try {
    return new URL(url, window.location.origin).origin === window.location.origin;
  } catch {
    return false;
  }
}

function buildPreviewUrl(fileUrl: string) {
  const base = fileUrl.split("#")[0] ?? fileUrl;
  const joiner = base.includes("?") ? "&" : "#";
  // page 1, fit width, hide chrome when the browser PDF viewer supports it
  return `${base}${joiner}page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`;
}

function PdfIcon() {
  return (
    <svg
      aria-hidden
      className="size-6 shrink-0 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

async function downloadFile(url: string, filename: string) {
  if (isSameOrigin(url)) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    return;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("download failed");
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

export function DocumentCard({ document }: { document: TransparencyDocument }) {
  const isEstatuto = document.doc_type === "estatuto";
  const [downloading, setDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(isEstatuto);
  const filename = pdfFilename(document.title);
  const meta = transparencyDocTypeMeta[document.doc_type];
  const updatedAt = documentUpdatedAt(document);
  const source = document.source_note?.trim() || DEFAULT_DOCUMENT_SOURCE;
  const version = document.version?.trim() || "1.0";
  const previewUrl = useMemo(() => buildPreviewUrl(document.file_url), [document.file_url]);

  async function handleDownload() {
    setDownloading(true);
    try {
      await downloadFile(document.file_url, filename);
    } catch {
      window.open(document.file_url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <article
      className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[0_12px_32px_-24px_rgba(26,26,26,0.18)] transition-[transform,box-shadow,border-color] duration-300 hover:border-primary/25 hover:shadow-[0_20px_40px_-20px_rgba(95,146,53,0.22)]"
      aria-labelledby={`doc-title-${document.id}`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted" aria-hidden>
          <PdfIcon />
        </span>
        <div className="min-w-0 flex-1 space-y-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.badgeClass}`}>
                {meta.shortLabel}
              </span>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                v{version}
              </span>
              {isEstatuto ? (
                <span className="rounded-full bg-primary/12 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  Prévia da 1ª página
                </span>
              ) : null}
            </div>
            <h4 id={`doc-title-${document.id}`} className="font-semibold leading-snug text-foreground">
              {document.title}
            </h4>
          </div>

          <dl className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
            <div>
              <dt className="inline font-semibold text-foreground">Publicado: </dt>
              <dd className="inline">
                <time dateTime={document.published_at}>{formatTransparencyDate(document.published_at)}</time>
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-foreground">Atualizado: </dt>
              <dd className="inline">
                <time dateTime={updatedAt}>{formatTransparencyDate(updatedAt)}</time>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="inline font-semibold text-foreground">Origem: </dt>
              <dd className="inline">{source}</dd>
            </div>
            {document.content_hash ? (
              <div className="sm:col-span-2">
                <dt className="inline font-semibold text-foreground">Hash SHA-256: </dt>
                <dd className="mt-1 break-all font-mono text-[0.7rem] leading-relaxed text-foreground/80">
                  {document.content_hash}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>

      {showPreview ? (
        <div id={`doc-preview-${document.id}`} className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            Visualização prévia — página 1
          </p>
          <div className="overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-inner">
            <div className="relative aspect-[3/4] w-full max-h-[32rem] sm:aspect-[8.5/11] sm:max-h-[36rem]">
              <iframe
                title={`Pré-visualização da primeira página: ${document.title}`}
                src={previewUrl}
                className="absolute inset-0 h-full w-full bg-white"
                loading={isEstatuto ? "eager" : "lazy"}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Prévia da primeira página do PDF. Use “Abrir PDF” para navegar o documento completo.
          </p>
        </div>
      ) : null}

      <div className="flex shrink-0 flex-wrap gap-2 border-t border-border pt-4">
        <button
          type="button"
          className="btn-outline h-10 px-4 text-xs"
          aria-expanded={showPreview}
          aria-controls={`doc-preview-${document.id}`}
          onClick={() => setShowPreview((value) => !value)}
        >
          {showPreview ? "Ocultar prévia" : "Ver prévia"}
        </button>
        <a
          href={document.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline h-10 px-4 text-xs"
          aria-label={`Abrir PDF em nova aba: ${document.title}`}
        >
          Abrir PDF
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="btn-primary h-10 px-4 text-xs"
          aria-label={`Baixar PDF: ${document.title}`}
          aria-busy={downloading}
        >
          {downloading ? "Baixando…" : "Baixar PDF"}
        </button>
      </div>
    </article>
  );
}
