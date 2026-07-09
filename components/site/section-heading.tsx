type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`mb-10 max-w-2xl space-y-3 ${alignment}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold text-secondary">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground">{title}</h2>
      {description ? <p className="text-base leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  );
}
