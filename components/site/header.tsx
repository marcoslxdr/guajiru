import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/institucional", label: "Institucional" },
  { href: "/historia", label: "História" },
  { href: "/diretoria", label: "Diretoria" },
  { href: "/noticias", label: "Notícias" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/escudo.svg" alt="Escudo Clube Desportivo Guajiru" width={40} height={40} />
          <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-primary">
            Clube Guajiru
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
