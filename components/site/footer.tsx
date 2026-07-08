import Link from "next/link";

type FooterProps = {
  address?: string;
};

export function Footer({ address }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Clube Desportivo Guajiru · Extremoz, RN</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/transparencia" className="hover:text-foreground">
            Transparência
          </Link>
          <Link href="/contato" className="hover:text-foreground">
            Contato
          </Link>
        </div>
        {address ? <p className="md:text-right">{address}</p> : null}
      </div>
    </footer>
  );
}
