import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/lib/admin/actions";

const navItems = [
  { href: "/admin/posts", label: "Notícias" },
  { href: "/admin/transparencia", label: "Transparência" },
  { href: "/admin/settings", label: "Configurações" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/admin/posts" className="flex items-center gap-3">
            <Image src="/logo-colorida.png" alt="Clube Guajiru" width={36} height={36} />
            <span className="text-sm font-semibold text-foreground">Admin · Clube Guajiru</span>
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Sair
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[12rem_1fr]">
        <nav className="flex gap-2 lg:flex-col lg:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}
