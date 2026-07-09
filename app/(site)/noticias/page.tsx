import type { Metadata } from "next";
import { NewsCard } from "@/components/site/news-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getAllPosts } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Notícias e comunicados do Clube Desportivo Guajiru.",
  keywords: ["notícias Guajiru", "comunicados clube esportivo", "remo Extremoz"],
};

export default async function NoticiasPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Notícias"
        title="Comunicados e novidades"
        description="Acompanhe as atualizações oficiais do clube."
      />

      {posts.length ? (
        <div className="space-y-10">
          <NewsCard post={posts[0]} featured />
          {posts.length > 1 ? (
            <div className="grid gap-8 border-t border-border pt-10 md:grid-cols-2">
              {posts.slice(1).map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <p className="text-muted-foreground">Nenhuma notícia publicada ainda. Volte em breve.</p>
      )}
    </div>
  );
}
