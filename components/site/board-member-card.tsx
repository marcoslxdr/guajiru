export function BoardMemberCard({ role, name }: { role: string; name: string }) {
  return (
    <div className="border-b border-border py-5 first:pt-0 last:border-b-0 sm:border-b-0 sm:py-0">
      <p className="font-display text-2xl leading-none text-primary">{role}</p>
      <p className="mt-2 text-base font-semibold text-foreground">{name || "A definir"}</p>
    </div>
  );
}
