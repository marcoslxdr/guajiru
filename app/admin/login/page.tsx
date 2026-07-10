import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { CLUB_LOGO } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Login",
};

type PageProps = {
  searchParams: Promise<{ reason?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { reason } = await searchParams;
  const sessionMessage = reason === "session" ? "Sessão expirada. Faça login novamente." : undefined;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(95,146,53,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(183,114,138,0.12),_transparent_45%)]"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-3">
          <Image
            src={CLUB_LOGO.src}
            alt={CLUB_LOGO.alt}
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="font-display text-xl text-primary">Clube Guajiru</span>
        </Link>
        <h1 className="font-display text-3xl text-foreground">Área de login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Acesso restrito à diretoria do clube.</p>
        <div className="mt-6">
          <AdminLoginForm sessionMessage={sessionMessage} />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="font-medium text-primary transition-colors hover:text-primary/80">
            Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  );
}
