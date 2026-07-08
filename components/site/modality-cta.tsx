import Link from "next/link";

export function ModalityCta() {
  return (
    <div className="mt-14 rounded-2xl border border-border bg-muted p-6 sm:p-8">
      <h2 className="font-display text-2xl text-foreground">Quer treinar com a gente?</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Manifeste interesse em se associar ao clube e informe a modalidade de sua preferência.
      </p>
      <div className="mt-5 flex flex-wrap gap-4">
        <Link href="/contato#associar" className="btn-outline">
          Quero me associar
        </Link>
        <Link href="/modalidades" className="link-arrow">
          Ver todas as modalidades
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
