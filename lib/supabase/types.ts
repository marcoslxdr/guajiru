export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  slug: string;
  published_at: string | null;
  category: "notícia" | "comunicado";
  cover_image_url: string | null;
  body: string | null;
  status: PostStatus;
  updated_at: string;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  caption: string | null;
  training_date: string | null;
  published: boolean | null;
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
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: {
          id?: string;
          title: string;
          slug: string;
          published_at?: string | null;
          category: Post["category"];
          cover_image_url?: string | null;
          body?: string | null;
          status?: PostStatus;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          published_at?: string | null;
          category?: Post["category"];
          cover_image_url?: string | null;
          body?: string | null;
          status?: PostStatus;
          updated_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      gallery_images: {
        Row: GalleryImage;
        Insert: {
          id?: string;
          image_url: string;
          caption?: string | null;
          training_date?: string | null;
          published?: boolean | null;
          created_at?: string | null;
        };
        Update: Partial<{
          id: string;
          image_url: string;
          caption: string | null;
          training_date: string | null;
          published: boolean | null;
          created_at: string | null;
        }>;
        Relationships: [];
      };
      transparency_documents: { Row: TransparencyDocument; Insert: TransparencyDocument; Update: Partial<TransparencyDocument>; Relationships: [] };
      page_institucional: { Row: PageInstitucional & { id: number }; Insert: PageInstitucional & { id?: number }; Update: Partial<PageInstitucional>; Relationships: [] };
      page_historia: { Row: PageHistoria & { id: number; founders: { name: string; bio?: string }[] | null }; Insert: PageHistoria; Update: Partial<PageHistoria>; Relationships: [] };
      page_diretoria: { Row: PageDiretoria & { id: number }; Insert: PageDiretoria; Update: Partial<PageDiretoria>; Relationships: [] };
      site_settings: { Row: SiteSettings & { id: number }; Insert: SiteSettings & { id?: number }; Update: Partial<SiteSettings>; Relationships: [] };
      modalities: { Row: ModalityRow; Insert: Partial<ModalityRow>; Update: Partial<ModalityRow>; Relationships: [] };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
