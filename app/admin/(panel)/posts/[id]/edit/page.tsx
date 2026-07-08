import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { getAdminPostById } from "@/lib/supabase/admin-queries";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Editar notícia</h1>
        <p className="mt-1 text-sm text-muted-foreground">{post.title}</p>
      </div>
      <PostForm post={post} />
    </div>
  );
}
