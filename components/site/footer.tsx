import Image from "next/image";
import Link from "next/link";
import { CLUB_LOGO } from "@/lib/brand";

type FooterProps = {
  address?: string;
};

export function Footer({ address }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={CLUB_LOGO.src}
                alt=""
                width={CLUB_LOGO.width}
                height={CLUB_LOGO.height}
                className="h-12 w-auto"
                aria-hidden
              />
              <div>
                <p className="font-display text-2xl text-primary">Clube Guajiru</p>
                <p className="text-sm text-muted-foreground">Esporte e natureza em Extremoz</p>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Clube Desportivo Guajiru · remo, impacto social e preservação ambiental no Rio Grande do Norte.
            </p>
          </div>

          <div>
            <p className="mb-3 font-display text-lg text-foreground">Navegação</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/institucional" className="text-muted-foreground transition-colors hover:text-primary">
                  Institucional
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-muted-foreground transition-colors hover:text-primary">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="text-muted-foreground transition-colors hover:text-primary">
                  Transparência
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground transition-colors hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-display text-lg text-foreground">Localização</p>
            {address ? (
              <p className="text-sm leading-relaxed text-muted-foreground">{address}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Extremoz, Rio Grande do Norte</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Clube Desportivo Guajiru</p>
          <div className="flex items-center gap-3">
            <Image src="/sfa.png" alt="Selo de Formação de Atletas CBC" width={60} height={60} className="h-14 w-auto" />
            <p>Gestão transparente e voluntária</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
