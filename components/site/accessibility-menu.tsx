"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useAccessibility, type FontScale } from "./accessibility-provider";

const FONT_OPTIONS: { value: FontScale; label: string }[] = [
  { value: 100, label: "100%" },
  { value: 112, label: "112%" },
  { value: 125, label: "125%" },
  { value: 150, label: "150%" },
];

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const a11y = useAccessibility();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
        aria-label="Abrir ferramentas de acessibilidade"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        title="Acessibilidade PCD"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="4.5" r="1.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 0 3.5 6.5M12 12 8.5 18.5M7 10.5h10" />
        </svg>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Ferramentas de acessibilidade para PCD"
          className="absolute right-0 top-full z-[70] mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-border bg-surface p-4 shadow-xl"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Acessibilidade PCD</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Ajuste leitura e contraste. Preferências salvas neste navegador.
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              Fechar
            </button>
          </div>

          <div className="space-y-4">
            <fieldset className="space-y-2">
              <legend className="text-xs font-semibold uppercase tracking-wide text-secondary">
                Tamanho do texto
              </legend>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="chip-button" onClick={a11y.decreaseFont} aria-label="Diminuir texto">
                  A−
                </button>
                {FONT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`chip-button ${a11y.fontScale === option.value ? "is-active" : ""}`}
                    aria-pressed={a11y.fontScale === option.value}
                    onClick={() => a11y.setFontScale(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
                <button type="button" className="chip-button" onClick={a11y.increaseFont} aria-label="Aumentar texto">
                  A+
                </button>
              </div>
            </fieldset>

            <fieldset className="space-y-2">
              <legend className="text-xs font-semibold uppercase tracking-wide text-secondary">
                Contraste e leitura
              </legend>
              <div className="space-y-2">
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border px-3 py-2 text-sm">
                  <span>Alto contraste</span>
                  <input
                    type="checkbox"
                    checked={a11y.contrast === "high"}
                    onChange={a11y.toggleContrast}
                    className="size-4 accent-[var(--primary)]"
                  />
                </label>
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border px-3 py-2 text-sm">
                  <span>Sublinhar links</span>
                  <input
                    type="checkbox"
                    checked={a11y.underlineLinks}
                    onChange={(event) => a11y.setUnderlineLinks(event.target.checked)}
                    className="size-4 accent-[var(--primary)]"
                  />
                </label>
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border px-3 py-2 text-sm">
                  <span>Fonte mais legível</span>
                  <input
                    type="checkbox"
                    checked={a11y.readableFont}
                    onChange={(event) => a11y.setReadableFont(event.target.checked)}
                    className="size-4 accent-[var(--primary)]"
                  />
                </label>
              </div>
            </fieldset>

            <button type="button" className="btn-outline h-10 w-full px-4 text-sm" onClick={a11y.reset}>
              Restaurar padrão
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
