import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./server";
import type { Database } from "./types";

export async function getTypedSupabase() {
  const client = await createSupabaseServerClient();
  return client as unknown as SupabaseClient<Database>;
}
