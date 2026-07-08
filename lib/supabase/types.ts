export type Post = {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  category: "notícia" | "comunicado";
  cover_image_url: string | null;
  body: string | null;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  caption: string | null;
  training_date: string | null;
};

export type TransparencyDocument = {
  id: string;
  title: string;
  doc_type: "ata" | "estatuto" | "relatório";
  file_url: string;
  published_at: string;
};

export type PageInstitucional = {
  mission: string | null;
  vision: string | null;
  values: string[] | null;
};

export type PageHistoria = {
  narrative: string | null;
  founders: { name: string; bio?: string }[] | null;
};

export type PageDiretoria = {
  board_members: { role: string; name: string }[] | null;
  fiscal_council: string[] | null;
  article13_note: string | null;
};

export type SiteSettings = {
  contact_email: string | null;
  address: string | null;
  map_lat: number | null;
  map_lng: number | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
};

export type ModalityHighlight = {
  title: string;
  description: string;
};

export type ModalityImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ModalityRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  intro_paragraphs: string[] | null;
  hero_image_url: string;
  hero_image_alt: string;
  accent: "primary" | "secondary" | "accent";
  keywords: string[] | null;
  location: string | null;
  audience: string | null;
  training_schedule: string | null;
  training_focus: string[] | null;
  highlights: ModalityHighlight[] | null;
  gallery: ModalityImage[] | null;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export type Modality = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  introParagraphs: string[];
  heroImage: ModalityImage;
  gallery: ModalityImage[];
  accent: ModalityRow["accent"];
  keywords: string[];
  location: string | null;
  audience: string | null;
  trainingSchedule: string | null;
  trainingFocus: string[];
  highlights: ModalityHighlight[];
};

export type Database = {
  public: {
    Tables: {
      posts: { Row: Post };
      gallery_images: { Row: GalleryImage };
      transparency_documents: { Row: TransparencyDocument };
      page_institucional: { Row: PageInstitucional & { id: number } };
      page_historia: { Row: PageHistoria & { id: number; founders: { name: string; bio?: string }[] | null } };
      page_diretoria: { Row: PageDiretoria & { id: number } };
      site_settings: { Row: SiteSettings & { id: number } };
      modalities: { Row: ModalityRow };
    };
  };
};
