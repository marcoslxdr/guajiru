"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModalitiesMenu, type ModalityNavLink } from "./modalities-menu";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/institucional", label: "Institucional" },
  { href: "/historia", label: "História" },
  { href: "/diretoria", label: "Diretoria" },
  { href: "/noticias", label: "Notícias" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/contato", label: "Contato" },
];

export function MobileNav({ modalities }: { modalities: ModalityNavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
      >
        <span className="sr-only">{open ? "Fechar" : "Menu"}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <>
              <path strokeLinecap="round" d="M4 7h16" />
              <path strokeLinecap="round" d="M4 12h16" />
              <path strokeLinecap="round" d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 top-[65px] z-40 bg-foreground/30" onClick={() => setOpen(false)} />
      ) : null}

      <nav
        id="mobile-menu"
        className={`absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-2xl border border-border bg-surface p-2 shadow-lg transition-[opacity,transform] duration-200 ease-out ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        aria-hidden={!open}
      >
        {navItems.slice(0, 2).map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <ModalitiesMenu variant="mobile" modalities={modalities} onNavigate={() => setOpen(false)} />

        {navItems.slice(2).map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
