"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLUB_LOGO } from "@/lib/brand";
import type { SiteSearchItem } from "@/lib/site-search";
import { AccessibilityMenu } from "./accessibility-menu";
import { MobileNav } from "./mobile-nav";
import { ModalitiesMenu, type ModalityNavLink } from "./modalities-menu";
import { SiteSearch } from "./site-search";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/institucional", label: "Institucional" },
  { href: "/historia", label: "História" },
  { href: "/diretoria", label: "Diretoria" },
  { href: "/noticias", label: "Notícias" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/contato", label: "Contato" },
];

export function Header({
  modalities,
  searchItems,
}: {
  modalities: ModalityNavLink[];
  searchItems: SiteSearchItem[];
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary shadow-[0_4px_24px_-4px_rgba(26,26,26,0.35)]">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={CLUB_LOGO.src}
            alt={CLUB_LOGO.alt}
            width={CLUB_LOGO.width}
            height={CLUB_LOGO.height}
            className="h-11 w-auto drop-shadow-sm"
            priority
          />
          <div className="leading-none">
            <span className="font-display text-2xl text-primary-foreground">Clube Guajiru</span>
            <span className="mt-0.5 block text-[11px] font-medium text-primary-foreground/70">
              Extremoz · RN
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {navItems.slice(0, 2).map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-accent text-foreground"
                      : "text-primary-foreground/85 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <ModalitiesMenu variant="desktop" modalities={modalities} />

            {navItems.slice(2).map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-accent text-foreground"
                      : "text-primary-foreground/85 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2" aria-label="Ferramentas de conteúdo e acessibilidade">
            <SiteSearch items={searchItems} />
            <AccessibilityMenu />
          </div>

          <Link
            href="/admin/login"
            aria-label="Área de login"
            title="Entrar"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>

          <MobileNav modalities={modalities} />
        </div>
      </div>
    </header>
  );
}
