import Link from "next/link";
import type { Post } from "@/lib/supabase/types";
import { StatusBadge } from "./status-badge";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function PostList({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-muted-foreground">Nenhuma notícia ainda.</p>
        <Link href="/admin/posts/new" className="btn-primary mt-4 inline-flex h-11">
          Criar primeira notícia
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Atualizado</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3 capitalize">{post.category}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={post.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(post.updated_at)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/posts/${post.id}/edit`} className="link-arrow">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
