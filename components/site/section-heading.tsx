type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl space-y-3">
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide sm:text-5xl">
        {title}
      </h2>
      {description ? <p className="text-base text-muted-foreground">{description}</p> : null}
    </div>
  );
}
