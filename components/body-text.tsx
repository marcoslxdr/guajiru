export function BodyText({ text }: { text?: string | null }) {
  if (!text) return null;

  return text.split("\n\n").map((paragraph) => (
    <p key={paragraph.slice(0, 24)} className="mb-4 text-base leading-relaxed">
      {paragraph}
    </p>
  ));
}
