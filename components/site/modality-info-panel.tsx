function isPlaceholder(value: string | null | undefined) {
  return Boolean(value?.trim().startsWith("["));
}

type ModalityInfoPanelProps = {
  location: string | null;
  audience: string | null;
  trainingSchedule: string | null;
};

function InfoItem({ label, value }: { label: string; value: string }) {
  const placeholder = isPlaceholder(value);

  return (
    <div
      className={
        placeholder
          ? "rounded-xl border border-dashed border-secondary/40 bg-muted/50 p-4"
          : "rounded-xl border border-border bg-surface p-4"
      }
    >
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <p
        className={
          placeholder
            ? "mt-1 text-sm italic leading-relaxed text-muted-foreground"
            : "mt-1 text-sm leading-relaxed text-foreground"
        }
      >
        {value}
      </p>
    </div>
  );
}

export function ModalityInfoPanel({ location, audience, trainingSchedule }: ModalityInfoPanelProps) {
  const items = [
    location ? { label: "Onde treinamos", value: location } : null,
    audience ? { label: "Público-alvo", value: audience } : null,
    trainingSchedule ? { label: "Horários", value: trainingSchedule } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  if (!items.length) return null;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <InfoItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
}
