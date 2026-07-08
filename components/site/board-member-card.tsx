export function BoardMemberCard({ role, name }: { role: string; name: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <p className="text-sm uppercase tracking-wide text-muted-foreground">{role}</p>
      <p className="mt-2 text-lg font-semibold">{name || "A definir"}</p>
    </div>
  );
}
