# Clube Desportivo Guajiru — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full institutional site and portal for Clube Desportivo Guajiru with Sanity CMS, contact/membership forms, and club branding.

**Architecture:** Next.js 16 App Router serves public pages with SSG/ISR. Sanity hosts all editable content (news, documents, institutional singletons). Route Handlers process form submissions via Resend with Turnstile verification.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, TypeScript, Sanity v3, next-sanity, Resend, Cloudflare Turnstile, Zod

**Design spec:** `docs/superpowers/specs/2026-07-08-clube-guajiru-design.md`

---

## File map

| Path | Responsibility |
|------|----------------|
| `app/globals.css` | Club color tokens, line-height 1.25 |
| `app/layout.tsx` | Root fonts (Bebas Neue + Source Sans 3), default metadata |
| `app/(site)/layout.tsx` | Header + Footer wrapper |
| `app/(site)/page.tsx` | Home |
| `app/(site)/institucional/page.tsx` | Mission, vision, values |
| `app/(site)/historia/page.tsx` | History + founders |
| `app/(site)/diretoria/page.tsx` | Board + fiscal council |
| `app/(site)/noticias/page.tsx` | News listing |
| `app/(site)/noticias/[slug]/page.tsx` | News detail |
| `app/(site)/transparencia/page.tsx` | PDF documents |
| `app/(site)/contato/page.tsx` | Contact + membership forms |
| `app/not-found.tsx` | Custom 404 |
| `app/sitemap.ts` | Dynamic sitemap |
| `app/robots.ts` | Robots config |
| `app/api/contact/route.ts` | Contact form handler |
| `app/api/associacao/route.ts` | Membership form handler |
| `components/site/header.tsx` | Nav + shield logo |
| `components/site/footer.tsx` | Footer links |
| `components/site/hero.tsx` | Home hero |
| `components/site/news-card.tsx` | News preview card |
| `components/site/board-member-card.tsx` | Board member display |
| `components/site/document-list.tsx` | Transparency PDF list |
| `components/site/section-heading.tsx` | Section titles |
| `components/forms/contact-form.tsx` | Contact form client component |
| `components/forms/associacao-form.tsx` | Membership form client component |
| `components/forms/turnstile-widget.tsx` | Turnstile wrapper |
| `components/seo/json-ld.tsx` | SportsOrganization schema |
| `lib/sanity/client.ts` | Sanity read client |
| `lib/sanity/image.ts` | Image URL builder |
| `lib/sanity/queries.ts` | GROQ queries |
| `lib/sanity/types.ts` | TypeScript types |
| `lib/forms/schemas.ts` | Zod schemas |
| `lib/forms/send-email.ts` | Resend helper |
| `lib/forms/verify-turnstile.ts` | Turnstile verification |
| `sanity/sanity.config.ts` | Studio config |
| `sanity/schemaTypes/index.ts` | Schema registry |
| `sanity/schemaTypes/post.ts` | News schema |
| `sanity/schemaTypes/galleryImage.ts` | Training photos |
| `sanity/schemaTypes/document.ts` | Transparency PDFs |
| `sanity/schemaTypes/pageInstitucional.ts` | Institutional page |
| `sanity/schemaTypes/pageHistoria.ts` | History page |
| `sanity/schemaTypes/pageDiretoria.ts` | Board page |
| `sanity/schemaTypes/siteSettings.ts` | Global settings |
| `sanity/seed/content.json` | PRD seed data for Studio import |
| `.env.example` | Required env vars |
| `public/escudo.svg` | Club shield (placeholder until real asset) |

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install packages**

```bash
cd "/Users/marcosalexandre/Projetos Ativos /guajiru"
npm install next-sanity @sanity/image-url @portabletext/react resend zod
npm install -D sanity @sanity/vision
```

- [ ] **Step 2: Verify install**

Run: `npm ls next-sanity sanity resend zod`
Expected: all packages listed without `UNMET DEPENDENCY`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add sanity, resend, and form dependencies"
```

---

### Task 2: Design system tokens

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace theme with club palette**

Replace entire `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --guajiru-verde: #5f9235;
  --guajiru-limao: #c5d14d;
  --guajiru-rosa-claro: #dd8fb8;
  --guajiru-vinho: #b7728a;
  --guajiru-neutro: #f8f6f0;
  --guajiru-texto: #1a1a1a;

  --background: var(--guajiru-neutro);
  --foreground: var(--guajiru-texto);
  --primary: var(--guajiru-verde);
  --primary-foreground: #ffffff;
  --accent: var(--guajiru-limao);
  --secondary: var(--guajiru-vinho);
  --highlight: var(--guajiru-rosa-claro);
  --muted: #eef2e4;
  --muted-foreground: #4a5a3a;
  --border: #d4dcc8;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-secondary: var(--secondary);
  --color-highlight: var(--highlight);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --font-sans: var(--font-source-sans);
  --font-display: var(--font-bebas);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-source-sans), system-ui, sans-serif;
  line-height: 1.25;
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: exit 0 (may still show old page content)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: apply Clube Guajiru color palette and spacing"
```

---

### Task 3: Root layout and fonts

**Files:**
- Modify: `app/layout.tsx`
- Delete: `app/page.tsx` (moves to route group in Task 7)

- [ ] **Step 1: Update root layout**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Bebas_Neue, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://guajiru.vercel.app",
  ),
  title: {
    default: "Clube Desportivo Guajiru | Extremoz, RN",
    template: "%s | Clube Desportivo Guajiru",
  },
  description:
    "Clube Desportivo Guajiru — esporte, remo e impacto social em Extremoz, Rio Grande do Norte. Fundado em 01/03/2024.",
  keywords: [
    "Clube Desportivo Guajiru",
    "esporte Extremoz",
    "remo RN",
    "clube esportivo Rio Grande do Norte",
    "Guajiru",
  ],
  openGraph: {
    title: "Clube Desportivo Guajiru",
    description:
      "Talento é genético: nós forjamos campeões. Esporte e preservação ambiental em Extremoz, RN.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Remove old page (will recreate in route group)**

```bash
rm app/page.tsx
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: may fail with no page — acceptable until Task 7

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git rm app/page.tsx 2>/dev/null || true
git commit -m "refactor: update root layout for club branding"
```

---

### Task 4: Sanity schemas

**Files:**
- Create: `sanity/sanity.config.ts`
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity/schemaTypes/post.ts`
- Create: `sanity/schemaTypes/galleryImage.ts`
- Create: `sanity/schemaTypes/document.ts`
- Create: `sanity/schemaTypes/pageInstitucional.ts`
- Create: `sanity/schemaTypes/pageHistoria.ts`
- Create: `sanity/schemaTypes/pageDiretoria.ts`
- Create: `sanity/schemaTypes/siteSettings.ts`
- Modify: `package.json` (add studio script)

- [ ] **Step 1: Add studio script to package.json**

Add to `"scripts"`:

```json
"studio": "sanity dev --config sanity/sanity.config.ts"
```

- [ ] **Step 2: Create `sanity/sanity.config.ts`**

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "guajiru",
  title: "Clube Desportivo Guajiru",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

- [ ] **Step 3: Create `sanity/schemaTypes/post.ts`**

```ts
import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Notícia / Comunicado",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Data", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "coverImage", title: "Capa", type: "image", options: { hotspot: true } }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: ["notícia", "comunicado"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", title: "Conteúdo", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
```

- [ ] **Step 4: Create `sanity/schemaTypes/galleryImage.ts`**

```ts
import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Foto de Treino",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Imagem", type: "image", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Legenda", type: "string" }),
    defineField({ name: "trainingDate", title: "Data do treino", type: "date" }),
    defineField({ name: "published", title: "Publicado", type: "boolean", initialValue: true }),
  ],
});
```

- [ ] **Step 5: Create `sanity/schemaTypes/document.ts`**

```ts
import { defineField, defineType } from "sanity";

export const transparencyDocument = defineType({
  name: "transparencyDocument",
  title: "Documento de Transparência",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "docType",
      title: "Tipo",
      type: "string",
      options: { list: ["ata", "estatuto", "relatório"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "file", title: "Arquivo PDF", type: "file", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Data de publicação", type: "date", validation: (r) => r.required() }),
  ],
});
```

- [ ] **Step 6: Create `sanity/schemaTypes/pageInstitucional.ts`**

```ts
import { defineField, defineType } from "sanity";

export const pageInstitucional = defineType({
  name: "pageInstitucional",
  title: "Página Institucional",
  type: "document",
  fields: [
    defineField({ name: "mission", title: "Missão", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "vision", title: "Visão", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "values",
      title: "Valores",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
```

- [ ] **Step 7: Create `sanity/schemaTypes/pageHistoria.ts`**

```ts
import { defineField, defineType } from "sanity";

export const pageHistoria = defineType({
  name: "pageHistoria",
  title: "Página História",
  type: "document",
  fields: [
    defineField({ name: "narrative", title: "Narrativa", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "founders",
      title: "Fundadores",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nome", type: "string" },
            { name: "bio", title: "Bio (opcional)", type: "text" },
          ],
        },
      ],
    }),
  ],
});
```

- [ ] **Step 8: Create `sanity/schemaTypes/pageDiretoria.ts`**

```ts
import { defineField, defineType } from "sanity";

export const pageDiretoria = defineType({
  name: "pageDiretoria",
  title: "Página Diretoria",
  type: "document",
  fields: [
    defineField({
      name: "boardMembers",
      title: "Direção",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "role", title: "Cargo", type: "string" },
            { name: "name", title: "Nome", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "fiscalCouncil",
      title: "Conselho Fiscal",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "article13Note",
      title: "Nota Artigo 13 (não remuneração)",
      type: "text",
    }),
  ],
});
```

- [ ] **Step 9: Create `sanity/schemaTypes/siteSettings.ts`**

```ts
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({ name: "contactEmail", title: "E-mail para formulários", type: "string" }),
    defineField({ name: "address", title: "Endereço", type: "text" }),
    defineField({ name: "mapLat", title: "Latitude", type: "number" }),
    defineField({ name: "mapLng", title: "Longitude", type: "number" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
  ],
});
```

- [ ] **Step 10: Create `sanity/schemaTypes/index.ts`**

```ts
import { post } from "./post";
import { galleryImage } from "./galleryImage";
import { transparencyDocument } from "./document";
import { pageInstitucional } from "./pageInstitucional";
import { pageHistoria } from "./pageHistoria";
import { pageDiretoria } from "./pageDiretoria";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  post,
  galleryImage,
  transparencyDocument,
  pageInstitucional,
  pageHistoria,
  pageDiretoria,
  siteSettings,
];
```

- [ ] **Step 11: Commit**

```bash
git add sanity/ package.json
git commit -m "feat: add Sanity schemas for club content"
```

---

### Task 5: Sanity client and queries

**Files:**
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/image.ts`
- Create: `lib/sanity/types.ts`
- Create: `lib/sanity/queries.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create `lib/sanity/client.ts`**

```ts
import { createClient } from "next-sanity";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
});
```

- [ ] **Step 2: Create `lib/sanity/image.ts`**

```ts
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityConfig } from "./client";

const builder = createImageUrlBuilder(sanityConfig);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] **Step 3: Create `lib/sanity/types.ts`**

```ts
import type { PortableTextBlock } from "@portabletext/types";

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: "notícia" | "comunicado";
  coverImage?: { asset: { _ref: string } };
  body?: PortableTextBlock[];
};

export type GalleryImage = {
  _id: string;
  caption?: string;
  trainingDate?: string;
  image: { asset: { _ref: string } };
};

export type TransparencyDocument = {
  _id: string;
  title: string;
  docType: "ata" | "estatuto" | "relatório";
  publishedAt: string;
  file: { asset: { url: string } };
};

export type PageInstitucional = {
  mission?: PortableTextBlock[];
  vision?: PortableTextBlock[];
  values?: string[];
};

export type PageHistoria = {
  narrative?: PortableTextBlock[];
  founders?: { name: string; bio?: string }[];
};

export type PageDiretoria = {
  boardMembers?: { role: string; name: string }[];
  fiscalCouncil?: string[];
  article13Note?: string;
};

export type SiteSettings = {
  contactEmail?: string;
  address?: string;
  mapLat?: number;
  mapLng?: number;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
};
```

- [ ] **Step 4: Create `lib/sanity/queries.ts`**

```ts
import { sanityClient } from "./client";
import type {
  GalleryImage,
  PageDiretoria,
  PageHistoria,
  PageInstitucional,
  Post,
  SiteSettings,
  TransparencyDocument,
} from "./types";

export const revalidate = 60;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]`,
    {},
    { next: { revalidate } },
  );
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit]`,
    { limit },
    { next: { revalidate } },
  );
}

export async function getAllPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc)`,
    {},
    { next: { revalidate } },
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate } },
  );
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return sanityClient.fetch(
    `*[_type == "galleryImage" && published == true] | order(trainingDate desc)`,
    {},
    { next: { revalidate } },
  );
}

export async function getTransparencyDocuments(): Promise<TransparencyDocument[]> {
  return sanityClient.fetch(
    `*[_type == "transparencyDocument"] | order(publishedAt desc)`,
    {},
    { next: { revalidate } },
  );
}

export async function getPageInstitucional(): Promise<PageInstitucional | null> {
  return sanityClient.fetch(
    `*[_type == "pageInstitucional"][0]`,
    {},
    { next: { revalidate } },
  );
}

export async function getPageHistoria(): Promise<PageHistoria | null> {
  return sanityClient.fetch(
    `*[_type == "pageHistoria"][0]`,
    {},
    { next: { revalidate } },
  );
}

export async function getPageDiretoria(): Promise<PageDiretoria | null> {
  return sanityClient.fetch(
    `*[_type == "pageDiretoria"][0]`,
    {},
    { next: { revalidate } },
  );
}
```

- [ ] **Step 5: Allow Sanity images in `next.config.ts`**

```ts
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 6: Commit**

```bash
git add lib/sanity/ next.config.ts
git commit -m "feat: add Sanity client, queries, and image config"
```

---

### Task 6: Shared site components

**Files:**
- Create: `components/site/section-heading.tsx`
- Create: `components/site/header.tsx`
- Create: `components/site/footer.tsx`
- Create: `components/site/hero.tsx`
- Create: `components/site/news-card.tsx`
- Create: `components/site/board-member-card.tsx`
- Create: `components/site/document-list.tsx`
- Create: `public/escudo.svg` (minimal placeholder)

- [ ] **Step 1: Create `components/site/section-heading.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `components/site/header.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/institucional", label: "Institucional" },
  { href: "/historia", label: "História" },
  { href: "/diretoria", label: "Diretoria" },
  { href: "/noticias", label: "Notícias" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/escudo.svg" alt="Escudo Clube Desportivo Guajiru" width={40} height={40} />
          <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-primary">
            Clube Guajiru
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create `components/site/footer.tsx`**

```tsx
import Link from "next/link";

type FooterProps = {
  address?: string;
};

export function Footer({ address }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Clube Desportivo Guajiru · Extremoz, RN</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/transparencia" className="hover:text-foreground">
            Transparência
          </Link>
          <Link href="/contato" className="hover:text-foreground">
            Contato
          </Link>
        </div>
        {address ? <p className="md:text-right">{address}</p> : null}
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create `components/site/hero.tsx`**

```tsx
type HeroProps = {
  slogan: string;
  foundingDate: string;
};

export function Hero({ slogan, foundingDate }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(197,209,77,0.3),_transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-24 sm:py-32">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Extremoz · Rio Grande do Norte · Fundado em {foundingDate}
        </p>
        <h1 className="max-w-4xl font-[family-name:var(--font-bebas)] text-5xl leading-tight tracking-wide sm:text-7xl">
          {slogan}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Esporte, remo e preservação ambiental na lagoa de Extremoz.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `components/site/news-card.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Post } from "@/lib/sanity/types";

export function NewsCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(600).height(340).url()}
          alt={post.title}
          width={600}
          height={340}
          className="mb-4 h-40 w-full rounded-xl object-cover"
        />
      ) : null}
      <p className="text-xs uppercase tracking-wide text-secondary">{post.category}</p>
      <h3 className="mt-2 font-[family-name:var(--font-bebas)] text-2xl tracking-wide">
        <Link href={`/noticias/${post.slug.current}`} className="hover:text-primary">
          {post.title}
        </Link>
      </h3>
    </article>
  );
}
```

- [ ] **Step 6: Create `components/site/board-member-card.tsx`**

```tsx
export function BoardMemberCard({ role, name }: { role: string; name: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <p className="text-sm uppercase tracking-wide text-muted-foreground">{role}</p>
      <p className="mt-2 text-lg font-semibold">{name}</p>
    </div>
  );
}
```

- [ ] **Step 7: Create `components/site/document-list.tsx`**

```tsx
import type { TransparencyDocument } from "@/lib/sanity/types";

const labels: Record<TransparencyDocument["docType"], string> = {
  ata: "Atas",
  estatuto: "Estatuto",
  relatório: "Relatórios Financeiros",
};

export function DocumentList({ documents }: { documents: TransparencyDocument[] }) {
  const groups = documents.reduce<Record<string, TransparencyDocument[]>>((acc, doc) => {
    acc[doc.docType] = acc[doc.docType] ?? [];
    acc[doc.docType].push(doc);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(groups).map(([type, docs]) => (
        <section key={type}>
          <h3 className="mb-4 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
            {labels[type as TransparencyDocument["docType"]]}
          </h3>
          <ul className="space-y-3">
            {docs.map((doc) => (
              <li key={doc._id}>
                <a
                  href={doc.file.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 8: Add placeholder `public/escudo.svg`** (simple green circle with "G" text until real shield provided)

- [ ] **Step 9: Commit**

```bash
git add components/site/ public/escudo.svg
git commit -m "feat: add shared site layout components"
```

---

### Task 7: Site route group and Home page

**Files:**
- Create: `app/(site)/layout.tsx`
- Create: `app/(site)/page.tsx`
- Create: `components/seo/json-ld.tsx`

- [ ] **Step 1: Create `app/(site)/layout.tsx`**

```tsx
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getSiteSettings } from "@/lib/sanity/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer address={settings?.address} />
    </div>
  );
}
```

- [ ] **Step 2: Create `components/seo/json-ld.tsx`**

```tsx
export function SportsOrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Clube Desportivo Guajiru",
    foundingDate: "2024-03-01",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Extremoz",
      addressRegion: "RN",
      addressCountry: "BR",
    },
    sport: "Rowing",
    description:
      "Clube esportivo focado em remo, impacto social e preservação ambiental em Extremoz, RN.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 3: Create `app/(site)/page.tsx`** with Hero, latest 3 posts from Sanity, gallery strip, founding date 01/03/2024, slogan from PRD, and `SportsOrganizationJsonLd`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: exit 0 with Home page generated

- [ ] **Step 5: Commit**

```bash
git add app/(site)/ components/seo/
git commit -m "feat: add site layout and home page"
```

---

### Task 8: Institutional pages

**Files:**
- Create: `app/(site)/institucional/page.tsx`
- Create: `app/(site)/historia/page.tsx`
- Create: `app/(site)/diretoria/page.tsx`
- Create: `components/portable-text.tsx` (Portable Text renderer)

- [ ] **Step 1: Create `components/portable-text.tsx`**

```tsx
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
```

- [ ] **Step 2: Create each page** fetching from Sanity with PRD fallback content when CMS empty (seed text for mission, vision, values, history, board roles, fiscal council, Art. 13 note).

- [ ] **Step 3: Add page-level `metadata` exports** with local SEO keywords per design spec.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: `/institucional`, `/historia`, `/diretoria` in route list

- [ ] **Step 5: Commit**

```bash
git add app/(site)/institucional/ app/(site)/historia/ app/(site)/diretoria/ components/portable-text.tsx
git commit -m "feat: add institutional pages with Sanity content"
```

---

### Task 9: News and transparency pages

**Files:**
- Create: `app/(site)/noticias/page.tsx`
- Create: `app/(site)/noticias/[slug]/page.tsx`
- Create: `app/(site)/transparencia/page.tsx`

- [ ] **Step 1: News listing** — grid of `NewsCard` from `getAllPosts()`, empty state message when no posts.

- [ ] **Step 2: News detail** — `generateStaticParams` from slugs + `getPostBySlug`, render cover image via `urlFor`, body via `RichText`.

- [ ] **Step 3: Transparency page** — `DocumentList` grouped by type (ata, estatuto, relatório), PDF links open in new tab.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add app/(site)/noticias/ app/(site)/transparencia/
git commit -m "feat: add news and transparency pages"
```

---

### Task 10: Form schemas and API routes

**Files:**
- Create: `lib/forms/schemas.ts`
- Create: `lib/forms/verify-turnstile.ts`
- Create: `lib/forms/send-email.ts`
- Create: `app/api/contact/route.ts`
- Create: `app/api/associacao/route.ts`

- [ ] **Step 1: Create `lib/forms/schemas.ts`**

```ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.enum(["Geral", "Parceria", "Imprensa", "Outro"]),
  message: z.string().min(10),
  turnstileToken: z.string().min(1),
  website: z.string().max(0).optional(), // honeypot
});

export const associacaoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  modality: z.enum(["Remo", "Outro esporte", "Apoio/Voluntário"]),
  message: z.string().optional(),
  turnstileToken: z.string().min(1),
  website: z.string().max(0).optional(),
});
```

- [ ] **Step 2: Create `lib/forms/verify-turnstile.ts`**

```ts
export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });

  const data = (await response.json()) as { success: boolean };
  return data.success;
}
```

- [ ] **Step 3: Create `lib/forms/send-email.ts`**

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendFormEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: "Clube Guajiru <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
}
```

Note: replace `from` with verified domain when available.

- [ ] **Step 4: Create `app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/forms/schemas";
import { sendFormEmail } from "@/lib/forms/send-email";
import { verifyTurnstile } from "@/lib/forms/verify-turnstile";
import { getSiteSettings } from "@/lib/sanity/queries";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for") ?? undefined;
  const valid = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!valid) {
    return NextResponse.json({ error: "Verificação anti-spam falhou" }, { status: 403 });
  }

  const settings = await getSiteSettings();
  const to = settings?.contactEmail ?? process.env.CONTACT_EMAIL;
  if (!to) {
    return NextResponse.json({ error: "E-mail de destino não configurado" }, { status: 500 });
  }

  await sendFormEmail({
    to,
    subject: `[Contato] ${parsed.data.subject} — ${parsed.data.name}`,
    html: `<p><strong>Nome:</strong> ${parsed.data.name}</p>
           <p><strong>E-mail:</strong> ${parsed.data.email}</p>
           <p><strong>Mensagem:</strong></p><p>${parsed.data.message}</p>`,
  });

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 5: Create `app/api/associacao/route.ts`** — same pattern with `associacaoSchema`, subject `[Associação]`.

- [ ] **Step 6: Commit**

```bash
git add lib/forms/ app/api/
git commit -m "feat: add contact and membership form API routes"
```

---

### Task 11: Contact page and form components

**Files:**
- Create: `components/forms/turnstile-widget.tsx`
- Create: `components/forms/contact-form.tsx`
- Create: `components/forms/associacao-form.tsx`
- Create: `app/(site)/contato/page.tsx`

- [ ] **Step 1: Create Turnstile widget** — client component loading `https://challenges.cloudflare.com/turnstile/v0/api.js`, renders widget with `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, exposes token via callback.

- [ ] **Step 2: Create contact and associação forms** — client components with controlled state, honeypot field `website` hidden via CSS, POST to respective API routes, show success/error toast text.

- [ ] **Step 3: Create contact page** — two sections (`#contato` and `#associar`), embedded OpenStreetMap iframe using `mapLat`/`mapLng` from Sanity (default Extremoz coords: -5.7056, -35.3044), address from settings.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add components/forms/ app/(site)/contato/
git commit -m "feat: add contact page with dual forms"
```

---

### Task 12: SEO, 404, and env template

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/not-found.tsx`
- Create: `.env.example`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/sanity/queries";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://guajiru.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const staticRoutes = ["", "/institucional", "/historia", "/diretoria", "/noticias", "/transparencia", "/contato"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/noticias/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
    })),
  ];
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://guajiru.vercel.app";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Create `app/not-found.tsx`** — branded 404 with link back to Home.

- [ ] **Step 4: Create `.env.example`**

```env
NEXT_PUBLIC_SITE_URL=https://guajiru.vercel.app
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=diretoria@clubeguajiru.org.br
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/robots.ts app/not-found.tsx .env.example
git commit -m "feat: add SEO routes, 404 page, and env template"
```

---

### Task 13: Sanity seed data and README

**Files:**
- Create: `sanity/seed/content.md`
- Modify: `README.md`

- [ ] **Step 1: Create seed guide** `sanity/seed/content.md` with copy-paste content from design spec section 11 (slogan, values, vision, board roles, fiscal council, founders, Art. 13 note) for manual entry in Studio.

- [ ] **Step 2: Update README** — replace beach tourism description with club portal, add env setup, `npm run studio`, bootstrap order from design spec.

- [ ] **Step 3: Commit**

```bash
git add sanity/seed/ README.md
git commit -m "docs: add Sanity seed guide and update README"
```

---

### Task 14: Bootstrap external services

**Files:** none (manual setup)

- [ ] **Step 1: Create Sanity project**

```bash
npx sanity@latest init --project-plan free --dataset production --output-path sanity-tmp
```

Copy `projectId` into `.env.local`.

- [ ] **Step 2: Create Sanity API read token** (Viewer) at sanity.io/manage → API → Tokens. Add as `SANITY_API_TOKEN`.

- [ ] **Step 3: Create Resend account** — get API key, add to `.env.local`. Use `onboarding@resend.dev` for dev.

- [ ] **Step 4: Create Cloudflare Turnstile widget** — add site key + secret to `.env.local`.

- [ ] **Step 5: Link Vercel**

```bash
vercel link
vercel env pull .env.local
```

- [ ] **Step 6: Seed Sanity Studio** — run `npm run studio`, create singleton docs (`pageInstitucional`, `pageHistoria`, `pageDiretoria`, `siteSettings`) using seed guide content.

---

### Task 15: Final verification

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: exit 0, all routes listed

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: exit 0

- [ ] **Step 3: Manual smoke checklist**

- [ ] Home loads with club branding (not beach tourism)
- [ ] All 7 nav routes return 200
- [ ] `/noticias/[slug]` works after publishing test post in Studio
- [ ] Contact form sends email (dev with Resend sandbox)
- [ ] Associação form sends email
- [ ] Turnstile blocks submission without token
- [ ] Responsive at 375px / 768px / 1280px
- [ ] `/sitemap.xml` and `/robots.txt` accessible

- [ ] **Step 4: Deploy**

```bash
vercel --prod
```

Expected: deployment URL live on Vercel Hobby

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| 5 institutional sections | Tasks 7–9 |
| CMS news/photos/comunicados | Tasks 4, 9 |
| Transparency PDFs | Tasks 4, 9 |
| Two forms | Tasks 10–11 |
| Club color palette + line-height 1.25 | Task 2 |
| BASKETBALL-style headings (Bebas fallback) | Task 3 |
| SEO local + JSON-LD | Tasks 7, 12 |
| Turnstile anti-spam | Tasks 10–11 |
| Sanity for non-technical editors | Tasks 4, 13–14 |
| Vercel Hobby deploy | Task 14–15 |
| Error handling (404, form errors) | Tasks 10–12 |
| ISR revalidate 60s | Task 5 |

## Out of scope (confirmed)

No AI SDK, no E2E tests, no auth, no payments — per design spec section 10.
