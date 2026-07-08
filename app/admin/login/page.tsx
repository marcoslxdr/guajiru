import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <h1 className="font-display text-3xl text-foreground">Admin Guajiru</h1>
        <p className="mt-2 text-sm text-muted-foreground">Acesso restrito à diretoria do clube.</p>
        <div className="mt-6">
          <AdminLoginForm sessionMessage={sessionMessage} />
        </div>
      </div>
    </div>
  );
}
