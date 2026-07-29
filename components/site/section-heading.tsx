type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const TitleTag = as;

  return (
    <div className={`mb-10 max-w-2xl space-y-3 ${alignment}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold text-secondary">{eyebrow}</p>
      ) : null}
      <TitleTag className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-foreground">
        {title}
      </TitleTag>
      {description ? <p className="text-base leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  );
}
