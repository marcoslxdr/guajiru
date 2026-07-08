import Link from "next/link";

type HeroProps = {
  slogan: string;
  foundingDate: string;
};

export function Hero({ slogan, foundingDate }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(197,209,77,0.3),_transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-24 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Extremoz · Rio Grande do Norte · Fundado em {foundingDate}
        </p>
        <h1 className="max-w-4xl font-[family-name:var(--font-bebas)] text-5xl leading-tight tracking-wide sm:text-7xl">
          {slogan}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Esporte, remo e preservação ambiental na lagoa de Extremoz.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/noticias"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Ver notícias
          </Link>
          <Link
            href="/contato#associar"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            Quero me associar
          </Link>
        </div>
      </div>
    </section>
  );
}
