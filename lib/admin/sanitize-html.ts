import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "a",
];

const ALLOWED_ATTR = ["href", "target", "rel"];

export function sanitizePostHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
}
