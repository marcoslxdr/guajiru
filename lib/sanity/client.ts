import { createClient } from "next-sanity";

export const revalidate = 60;

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

const hasSanity = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

export const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
});

export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!hasSanity) {
    if (query.includes("[0]")) {
      return null as T;
    }
    return [] as T;
  }

  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate } });
  } catch {
    if (query.includes("[0]")) {
      return null as T;
    }
    return [] as T;
  }
}
