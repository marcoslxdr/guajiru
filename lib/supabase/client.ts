import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createSupabaseClient() {
  if (!url || !key) {
    return null;
  }

  return createClient<Database>(url, key);
}

export const hasSupabase = Boolean(url && key);
