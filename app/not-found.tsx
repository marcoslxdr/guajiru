import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-start justify-center gap-4 px-6 py-20">
      <p className="text-sm uppercase tracking-wide text-muted-foreground">404</p>
      <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide">Página não encontrada</h1>
      <p className="text-muted-foreground">O conteúdo que você procura não existe ou foi movido.</p>
      <Link href="/" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
        Voltar ao início
      </Link>
    </div>
  );
}
