import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-base leading-relaxed">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mb-3 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">{children}</h2>
    ),
  },
};

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
