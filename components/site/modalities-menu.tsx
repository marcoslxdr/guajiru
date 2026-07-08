"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type ModalityNavLink = {
  slug: string;
  name: string;
};

type ModalitiesMenuProps = {
  variant: "desktop" | "mobile";
  modalities: ModalityNavLink[];
  onNavigate?: () => void;
};

function buildModalityLinks(modalities: ModalityNavLink[]) {
  return [
    { href: "/modalidades", label: "Todas as modalidades" },
    ...modalities.map((modality) => ({
      href: `/modalidades/${modality.slug}`,
      label: modality.name,
    })),
  ];
}

function isModalitiesActive(pathname: string) {
  return pathname === "/modalidades" || pathname.startsWith("/modalidades/");
}

export function ModalitiesMenu({ variant, modalities, onNavigate }: ModalitiesMenuProps) {
  const pathname = usePathname();
  const active = isModalitiesActive(pathname);
  const [expanded, setExpanded] = useState(false);
  const modalityLinks = buildModalityLinks(modalities);

  if (variant === "desktop") {
    return (
      <div className="group relative">
        <Link
          href="/modalidades"
          className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
            active
              ? "bg-accent text-foreground"
              : "text-primary-foreground/85 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          }`}
          aria-haspopup="menu"
        >
          Modalidades
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <div
          role="menu"
          className="invisible absolute left-0 top-full z-50 mt-1 min-w-[12rem] origin-top scale-95 rounded-xl border border-border bg-surface p-1.5 opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-150 group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100"
        >
          {modalityLinks.map((link) => {
            const linkActive =
              link.href === "/modalidades" ? pathname === "/modalidades" : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  linkActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
          active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
        }`}
      >
        Modalidades
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {expanded ? (
        <div className="mt-1 space-y-0.5 border-l-2 border-primary/30 pl-3">
          {modalityLinks.map((link) => {
            const linkActive =
              link.href === "/modalidades" ? pathname === "/modalidades" : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  linkActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
