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
    };
  };
};
