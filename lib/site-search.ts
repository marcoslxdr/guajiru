import type { Modality, Post, TransparencyDocument } from "@/lib/supabase/types";
import { transparencyDocTypeMeta } from "@/lib/transparency";

export type SiteSearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  keywords?: string;
};

const STATIC_PAGES: SiteSearchItem[] = [
  {
    id: "page-home",
    title: "Início",
    description: "Página inicial do Clube Desportivo Guajiru.",
    href: "/",
    category: "Páginas",
    keywords: "home clube guajiru extremoz",
  },
  {
    id: "page-institucional",
    title: "Institucional",
    description: "Missão, visão e valores do clube.",
    href: "/institucional",
    category: "Páginas",
    keywords: "missão visão valores institucional",
  },
  {
    id: "page-historia",
    title: "História",
    description: "Fundação, marcos e trajetória do clube.",
    href: "/historia",
    category: "Páginas",
    keywords: "história fundação marcos",
  },
  {
    id: "page-diretoria",
    title: "Diretoria",
    description: "Diretoria, conselho fiscal e governança voluntária.",
    href: "/diretoria",
    category: "Páginas",
    keywords: "diretoria conselho fiscal cargos",
  },
  {
    id: "page-noticias",
    title: "Notícias",
    description: "Comunicados e notícias do clube.",
    href: "/noticias",
    category: "Páginas",
    keywords: "notícias comunicados",
  },
  {
    id: "page-transparencia",
    title: "Transparência",
    description: "Documentos públicos, estrutura, vagas e FAQ.",
    href: "/transparencia",
    category: "Páginas",
    keywords: "transparência documentos atas estatuto relatório",
  },
  {
    id: "page-transparencia-docs",
    title: "Documentos de transparência",
    description: "Lista de PDFs oficiais para consulta e download.",
    href: "/transparencia#documentos",
    category: "Transparência",
    keywords: "pdf ata estatuto relatório download",
  },
  {
    id: "page-transparencia-estrutura",
    title: "Estrutura organizacional",
    description: "Competências da diretoria e conselho fiscal.",
    href: "/transparencia#estrutura",
    category: "Transparência",
    keywords: "estrutura competências organograma",
  },
  {
    id: "page-transparencia-vagas",
    title: "Vagas e remunerações",
    description: "Política de remuneração e oportunidades.",
    href: "/transparencia#vagas-remuneracoes",
    category: "Transparência",
    keywords: "vagas remuneração voluntariado",
  },
  {
    id: "page-transparencia-faq",
    title: "FAQ de transparência",
    description: "Perguntas frequentes sobre documentos e contato.",
    href: "/transparencia#faq",
    category: "Transparência",
    keywords: "faq perguntas frequentes",
  },
  {
    id: "page-contato",
    title: "Contato",
    description: "Fale com o clube ou manifeste interesse em associar-se.",
    href: "/contato",
    category: "Páginas",
    keywords: "contato e-mail associação telefone",
  },
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function buildSiteSearchIndex(input?: {
  posts?: Post[];
  documents?: TransparencyDocument[];
  modalities?: Pick<Modality, "slug" | "name" | "shortDescription">[];
}): SiteSearchItem[] {
  const posts = (input?.posts ?? []).map((post) => ({
    id: `post-${post.id}`,
    title: post.title,
    description: post.category === "comunicado" ? "Comunicado oficial" : "Notícia do clube",
    href: `/noticias/${post.slug}`,
    category: "Notícias",
    keywords: `${post.category} ${post.slug}`,
  }));

  const documents = (input?.documents ?? []).map((doc) => {
    const meta = transparencyDocTypeMeta[doc.doc_type];
    return {
      id: `doc-${doc.id}`,
      title: doc.title,
      description: meta.description,
      href: `/transparencia#${meta.anchor}`,
      category: "Documentos",
      keywords: `${meta.label} ${doc.doc_type} pdf transparência`,
    };
  });

  const modalities = (input?.modalities ?? []).map((modality) => ({
    id: `modality-${modality.slug}`,
    title: modality.name,
    description: modality.shortDescription || `Modalidade ${modality.name}`,
    href: `/modalidades/${modality.slug}`,
    category: "Modalidades",
    keywords: `esporte treino ${modality.slug}`,
  }));

  return [...STATIC_PAGES, ...modalities, ...posts, ...documents];
}

export function searchSiteContent(items: SiteSearchItem[], query: string, limit = 12) {
  const q = normalize(query);
  if (!q) return [];

  const scored = items
    .map((item) => {
      const title = normalize(item.title);
      const description = normalize(item.description);
      const keywords = normalize(item.keywords ?? "");
      const category = normalize(item.category);
      const haystack = `${title} ${description} ${keywords} ${category}`;

      let score = 0;
      if (title === q) score += 100;
      if (title.startsWith(q)) score += 60;
      if (title.includes(q)) score += 40;
      if (category.includes(q)) score += 20;
      if (keywords.includes(q)) score += 15;
      if (description.includes(q)) score += 10;
      if (haystack.includes(q)) score += 5;

      const terms = q.split(/\s+/).filter(Boolean);
      if (terms.length > 1 && terms.every((term) => haystack.includes(term))) {
        score += 25;
      }

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "pt-BR"));

  return scored.slice(0, limit).map((entry) => entry.item);
}
