import Image from "next/image";
import Link from "next/link";
import type { Modality } from "@/lib/supabase/types";

const accentClasses: Record<Modality["accent"], string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-primary-foreground",
  accent: "bg-accent text-foreground",
};

export function ModalityCard({ modality }: { modality: Modality }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_40px_-28px_rgba(26,26,26,0.2)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(95,146,53,0.25)]">
      <Link href={`/modalidades/${modality.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={modality.heroImage.src}
          alt={modality.heroImage.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 480px"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${accentClasses[modality.accent]}`}
        >
          {modality.name}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-3xl leading-tight">
          <Link href={`/modalidades/${modality.slug}`} className="transition-colors hover:text-primary">
            {modality.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{modality.shortDescription}</p>
        <Link href={`/modalidades/${modality.slug}`} className="link-arrow mt-auto w-fit text-xs">
          Conhecer modalidade
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
