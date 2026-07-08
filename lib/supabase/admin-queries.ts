import { getTypedSupabase } from "@/lib/supabase/typed-server";
import type { Post, SiteSettings } from "@/lib/supabase/types";

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
