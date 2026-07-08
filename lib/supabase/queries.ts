import { clubFallbacks } from "@/lib/fallbacks";
import { modalityFallbacks } from "@/lib/modalities";
import { createSupabaseClient, hasSupabase } from "./client";
import { mapFallbackModality, mapModalityRow } from "./modality-mapper";
import type {
  GalleryImage,
  Modality,
  PageDiretoria,
  PageHistoria,
  PageInstitucional,
  Post,
  SiteSettings,
  TransparencyDocument,
} from "./types";

export const revalidate = 60;

function getClient() {
  return createSupabaseClient();
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!hasSupabase) return null;
  const supabase = getClient();
  if (!supabase) return null;

  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  if (!hasSupabase) return [];
  const supabase = getClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}

export async function getAllPosts(): Promise<Post[]> {
  if (!hasSupabase) return [];
  const supabase = getClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!hasSupabase) return null;
  const supabase = getClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!hasSupabase) return [];
  const supabase = getClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("published", true)
    .order("training_date", { ascending: false });

  return data ?? [];
}

export async function getTransparencyDocuments(): Promise<TransparencyDocument[]> {
  if (!hasSupabase) return [];
  const supabase = getClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("transparency_documents")
    .select("*")
    .order("published_at", { ascending: false });

  return data ?? [];
}

export async function getPageInstitucional(): Promise<PageInstitucional | null> {
  if (!hasSupabase) {
    return {
      mission: clubFallbacks.mission,
      vision: clubFallbacks.vision,
      values: clubFallbacks.values.map((value) => value.name),
    };
  }
  const supabase = getClient();
  if (!supabase) return null;

  const { data } = await supabase.from("page_institucional").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getPageHistoria(): Promise<PageHistoria | null> {
  if (!hasSupabase) {
    return {
      narrative: clubFallbacks.historyIntro,
      founders: clubFallbacks.founders,
    };
  }
  const supabase = getClient();
  if (!supabase) return null;

  const { data } = await supabase.from("page_historia").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getPageDiretoria(): Promise<PageDiretoria | null> {
  if (!hasSupabase) {
    return {
      board_members: clubFallbacks.boardRoles.map((role) => ({ role, name: "" })),
      fiscal_council: clubFallbacks.fiscalCouncil,
      article13_note: clubFallbacks.article13Note,
    };
  }
  const supabase = getClient();
  if (!supabase) return null;

  const { data } = await supabase.from("page_diretoria").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getContactEmail(): Promise<string | null> {
  const settings = await getSiteSettings();
  return settings?.contact_email ?? process.env.CONTACT_EMAIL ?? null;
}

export async function getAllModalities(): Promise<Modality[]> {
  if (!hasSupabase) {
    return modalityFallbacks.map(mapFallbackModality);
  }

  const supabase = getClient();
  if (!supabase) {
    return modalityFallbacks.map(mapFallbackModality);
  }

  const { data } = await supabase
    .from("modalities")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (!data?.length) {
    return modalityFallbacks.map(mapFallbackModality);
  }

  return data.map(mapModalityRow);
}

export async function getModalityBySlug(slug: string): Promise<Modality | null> {
  const modalities = await getAllModalities();
  return modalities.find((modality) => modality.slug === slug) ?? null;
}

export async function getAllModalitySlugs(): Promise<string[]> {
  const modalities = await getAllModalities();
  return modalities.map((modality) => modality.slug);
}
