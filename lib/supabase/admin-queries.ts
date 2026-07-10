import { getTypedSupabase } from "@/lib/supabase/typed-server";
import type { ModalityRow, Post, SiteSettings, TransparencyDocument } from "@/lib/supabase/types";

export async function getAdminPosts(): Promise<Post[]> {
  const supabase = await getTypedSupabase();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });

  return (data ?? []) as Post[];
}

export async function getAdminPostById(id: string): Promise<Post | null> {
  const supabase = await getTypedSupabase();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  return data as Post | null;
}

export async function getAdminSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await getTypedSupabase();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data as SiteSettings | null;
}

export async function getAdminTransparencyDocuments(): Promise<TransparencyDocument[]> {
  const supabase = await getTypedSupabase();
  const { data } = await supabase
    .from("transparency_documents")
    .select("*")
    .order("published_at", { ascending: false });

  return (data ?? []) as TransparencyDocument[];
}

export async function getAdminTransparencyDocumentById(id: string): Promise<TransparencyDocument | null> {
  const supabase = await getTypedSupabase();
  const { data } = await supabase.from("transparency_documents").select("*").eq("id", id).maybeSingle();
  return data as TransparencyDocument | null;
}

export async function getAdminModalities(): Promise<ModalityRow[]> {
  const supabase = await getTypedSupabase();
  const { data } = await supabase
    .from("modalities")
    .select("*")
    .order("sort_order", { ascending: true });

  return (data ?? []) as ModalityRow[];
}

export async function getAdminModalityById(id: string): Promise<ModalityRow | null> {
  const supabase = await getTypedSupabase();
  const { data } = await supabase.from("modalities").select("*").eq("id", id).maybeSingle();
  return data as ModalityRow | null;
}
