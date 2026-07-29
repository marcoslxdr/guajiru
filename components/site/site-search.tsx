"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { SiteSearchItem } from "@/lib/site-search";
import { searchSiteContent } from "@/lib/site-search";

type SiteSearchProps = {
  items: SiteSearchItem[];
};

export function SiteSearch({ items }: SiteSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();
  const listboxId = useId();

  const results = useMemo(() => searchSiteContent(items, query), [items, query]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
        aria-label="Abrir pesquisa de conteúdo"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        title="Pesquisar (Ctrl+K)"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="m20 20-3.5-3.5" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/45"
            aria-label="Fechar pesquisa"
            onClick={close}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Pesquisa de conteúdo do site"
            className="absolute left-1/2 top-[12vh] w-[min(36rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-2xl border border-border bg-surface p-4 shadow-2xl"
          >
            <form role="search" onSubmit={(event) => event.preventDefault()} className="space-y-3">
              <label htmlFor="site-search-input" className="block text-sm font-semibold text-foreground">
                Pesquisar no site
              </label>
              <input
                ref={inputRef}
                id="site-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Digite páginas, notícias, modalidades ou documentos…"
                className="input-field w-full"
                autoComplete="off"
                aria-controls={listboxId}
                aria-autocomplete="list"
              />
              <p className="text-xs text-muted-foreground">
                Atalho: Ctrl+K · Esc para fechar
              </p>
            </form>

            <div
              id={listboxId}
              role="listbox"
              aria-label="Resultados da pesquisa"
              className="mt-4 max-h-[50vh] space-y-2 overflow-y-auto"
            >
              {!query.trim() ? (
                <p className="rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                  Busque por transparência, diretoria, modalidades, notícias e mais.
                </p>
              ) : null}

              {query.trim() && !results.length ? (
                <p className="rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground" role="status">
                  Nenhum resultado para “{query}”.
                </p>
              ) : null}

              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  role="option"
                  onClick={close}
                  className="block rounded-xl border border-border px-4 py-3 transition-colors hover:border-primary/40 hover:bg-muted/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {item.category}
                  </span>
                  <span className="mt-1 block font-semibold text-foreground">{item.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
