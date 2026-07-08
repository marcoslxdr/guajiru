import { safeFetch } from "./client";
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
  return safeFetch<SiteSettings | null>(`*[_type == "siteSettings"][0]`);
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  return safeFetch<Post[]>(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit]`,
    { limit },
  );
}

export async function getAllPosts(): Promise<Post[]> {
  return safeFetch<Post[]>(`*[_type == "post"] | order(publishedAt desc)`);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return safeFetch<Post | null>(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug },
  );
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return safeFetch<GalleryImage[]>(
    `*[_type == "galleryImage" && published == true] | order(trainingDate desc)`,
  );
}

export async function getTransparencyDocuments(): Promise<TransparencyDocument[]> {
  return safeFetch<TransparencyDocument[]>(
    `*[_type == "transparencyDocument"] | order(publishedAt desc)`,
  );
}

export async function getPageInstitucional(): Promise<PageInstitucional | null> {
  return safeFetch<PageInstitucional | null>(`*[_type == "pageInstitucional"][0]`);
}

export async function getPageHistoria(): Promise<PageHistoria | null> {
  return safeFetch<PageHistoria | null>(`*[_type == "pageHistoria"][0]`);
}

export async function getPageDiretoria(): Promise<PageDiretoria | null> {
  return safeFetch<PageDiretoria | null>(`*[_type == "pageDiretoria"][0]`);
}
