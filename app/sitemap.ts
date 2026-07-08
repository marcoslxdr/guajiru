import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/supabase/queries";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://guajiru.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const staticRoutes = [
    "",
    "/institucional",
    "/historia",
    "/diretoria",
    "/noticias",
    "/transparencia",
    "/contato",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/noticias/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    })),
  ];
}
