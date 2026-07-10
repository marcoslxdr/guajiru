import Image from "next/image";

type BoardMemberCardProps = {
  role: string;
  name: string;
  photo?: string | null;
};

export function BoardMemberCard({ role, name, photo }: BoardMemberCardProps) {
  return (
    <article className="flex flex-col gap-4 border-b border-border py-6 first:pt-0 last:border-b-0 sm:border-b-0 sm:py-0">
      {photo ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={photo}
            alt={name ? `Retrato de ${name}` : role}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <div>
        <p className="font-display text-2xl leading-none text-primary">{role}</p>
        <p className="mt-2 text-base font-semibold text-foreground">{name || "A definir"}</p>
      </div>
    </article>
  );
}
