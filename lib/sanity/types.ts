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
