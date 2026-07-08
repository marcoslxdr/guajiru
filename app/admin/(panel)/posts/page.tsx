import Link from "next/link";
import { PostList } from "@/components/admin/post-list";
import { getAdminPosts } from "@/lib/supabase/admin-queries";

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Notícias</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie comunicados e notícias do site.</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary h-11">
          Nova notícia
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
