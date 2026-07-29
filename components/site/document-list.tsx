"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TransparencyDocument } from "@/lib/supabase/types";
import { DocumentCard } from "@/components/site/document-card";
import { TRANSPARENCY_DOC_TYPES, transparencyDocTypeMeta } from "@/lib/transparency";

const FILTER_ALL = "todos" as const;
type DocFilter = typeof FILTER_ALL | TransparencyDocument["doc_type"];

const filterOptions: { value: DocFilter; label: string }[] = [
  { value: FILTER_ALL, label: "Todos" },
  ...TRANSPARENCY_DOC_TYPES.map((type) => ({
    value: type,
    label: transparencyDocTypeMeta[type].shortLabel,
  })),
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function DocumentList({ documents }: { documents: TransparencyDocument[] }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<DocFilter>(FILTER_ALL);

  const availableTypes = useMemo(
    () => TRANSPARENCY_DOC_TYPES.filter((type) => documents.some((doc) => doc.doc_type === type)),
    [documents],
  );

  const visibleFilters = useMemo(
    () =>
      filterOptions.filter(
        (option) => option.value === FILTER_ALL || availableTypes.includes(option.value),
      ),
    [availableTypes],
  );

  const filtered = useMemo(() => {
    const q = normalize(query);
    return documents.filter((doc) => {
      if (typeFilter !== FILTER_ALL && doc.doc_type !== typeFilter) return false;
      if (!q) return true;
      const meta = transparencyDocTypeMeta[doc.doc_type];
      const haystack = normalize(`${doc.title} ${meta.label} ${meta.sectionTitle} ${doc.doc_type}`);
      return haystack.includes(q);
    });
  }, [documents, query, typeFilter]);

  if (!documents.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/50 p-8 text-center sm:p-12">
        <p className="font-display text-2xl text-foreground">Documentos em preparação</p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Atas, estatuto, relatórios e demais documentos de transparência serão publicados aqui pela
          diretoria do clube.
        </p>
        <Link href="/diretoria" className="link-arrow mt-6 inline-flex">
          Conhecer a diretoria
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  const groups = filtered.reduce<Partial<Record<TransparencyDocument["doc_type"], TransparencyDocument[]>>>(
    (acc, doc) => {
      acc[doc.doc_type] = acc[doc.doc_type] ?? [];
      acc[doc.doc_type]!.push(doc);
      return acc;
    },
    {},
  );

  const activeTypes = TRANSPARENCY_DOC_TYPES.filter((type) => groups[type]?.length);
  const hasActiveFilters = query.trim().length > 0 || typeFilter !== FILTER_ALL;

  return (
    <div className="space-y-10">
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <form role="search" onSubmit={(event) => event.preventDefault()} className="space-y-3">
          <label htmlFor="transparencia-busca" className="block text-sm font-semibold text-foreground">
            Buscar documentos
          </label>
          <input
            id="transparencia-busca"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Digite título ou tipo de documento…"
            className="input-field w-full"
            autoComplete="off"
          />
        </form>

        <div className="space-y-2">
          <p id="transparencia-filtro-label" className="text-sm font-semibold text-foreground">
            Filtrar por tipo
          </p>
          <div
            role="group"
            aria-labelledby="transparencia-filtro-label"
            className="flex flex-wrap gap-2"
          >
            {visibleFilters.map((option) => {
              const selected = typeFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setTypeFilter(option.value)}
                  className={`chip-button ${selected ? "is-active" : ""}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted-foreground" aria-live="polite">
          {filtered.length === documents.length
            ? `${documents.length} documento${documents.length === 1 ? "" : "s"} disponível${documents.length === 1 ? "" : "is"}`
            : `${filtered.length} de ${documents.length} documento${documents.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {!filtered.length ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/50 p-8 text-center">
          <p className="font-display text-2xl text-foreground">Nenhum documento encontrado</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Ajuste a busca ou o filtro para ver outros documentos de transparência.
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              className="btn-outline mt-6 h-11 px-5 text-sm"
              onClick={() => {
                setQuery("");
                setTypeFilter(FILTER_ALL);
              }}
            >
              Limpar filtros
            </button>
          ) : null}
        </div>
      ) : (
        <div className="space-y-12">
          {activeTypes.length > 1 && typeFilter === FILTER_ALL && !query.trim() ? (
            <nav aria-label="Categorias de documentos" className="flex flex-wrap gap-2">
              {activeTypes.map((type) => (
                <a
                  key={type}
                  href={`#${transparencyDocTypeMeta[type].anchor}`}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {transparencyDocTypeMeta[type].sectionTitle}
                </a>
              ))}
            </nav>
          ) : null}

          {activeTypes.map((type) => {
            const docs = groups[type] ?? [];
            const meta = transparencyDocTypeMeta[type];
            return (
              <section key={type} id={meta.anchor} className="scroll-mt-28 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display text-3xl leading-tight text-foreground">
                    {meta.sectionTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">{meta.description}</p>
                </div>
                <ul className="grid gap-3">
                  {docs.map((doc) => (
                    <li key={doc.id}>
                      <DocumentCard document={doc} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
