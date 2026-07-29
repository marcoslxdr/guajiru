import Link from "next/link";

type TransparencyContactProps = {
  address: string;
  email: string | null;
  whatsapp: string | null;
};

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function TransparencyContact({ address, email, whatsapp }: TransparencyContactProps) {
  return (
    <section id="fale-conosco" className="scroll-mt-28 space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-3xl leading-tight text-foreground">Fale conosco</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Canais oficiais para comunicação eletrônica ou telefônica com o Clube Desportivo Guajiru.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Endereço</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{address}</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">E-mail</p>
          {email ? (
            <a
              href={`mailto:${email}`}
              className="mt-2 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {email}
            </a>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Consulte a página de contato.</p>
          )}
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Preferencial para solicitações de documentos e informações institucionais.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">WhatsApp / telefone</p>
          {whatsapp ? (
            <a
              href={whatsappHref(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {whatsapp}
            </a>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Disponível sob demanda via e-mail ou formulário.</p>
          )}
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Horário de atendimento conforme disponibilidade da gestão voluntária.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/contato" className="btn-primary h-11 px-5 text-sm">
          Ir para o formulário de contato
        </Link>
        <Link href="/contato#associar" className="btn-outline h-11 px-5 text-sm">
          Quero me associar
        </Link>
      </div>
    </section>
  );
}
