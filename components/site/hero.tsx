import Link from "next/link";
import { HeroBackgroundSlider } from "@/components/site/hero-background-slider";

type HeroProps = {
  slogan: string;
  foundingDate: string;
};

export function Hero({ slogan, foundingDate }: HeroProps) {
  return (
    <section className="relative min-h-[min(88vh,900px)] overflow-hidden border-b border-primary/40">
      <HeroBackgroundSlider />

      <div aria-hidden className="hero-overlay absolute inset-0" />

      <div className="relative mx-auto flex min-h-[min(88vh,900px)] w-full max-w-6xl flex-col justify-end px-6 pb-14 pt-28 sm:pb-16 sm:pt-32 lg:justify-center lg:pb-24">
        <div className="hero-readable max-w-2xl space-y-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-bold text-foreground">
              Remo · Basquete · Atletismo
            </span>
            <p className="text-sm font-semibold text-primary-foreground/90">
              Extremoz, RN · Fundado em {foundingDate}
            </p>
          </div>

          <h1 className="font-display text-[clamp(2.85rem,7vw,5.25rem)] leading-[0.98] text-primary-foreground">
            {slogan}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/90 sm:text-xl">
            Remo, basquete e atletismo com preservação ambiental: formação de atletas e cidadãos em Extremoz.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Link href="/noticias" className="btn-hero-primary">
              Ver notícias
            </Link>
            <Link href="/contato#associar" className="btn-hero-outline">
              Quero me associar
            </Link>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
    </section>
  );
}
