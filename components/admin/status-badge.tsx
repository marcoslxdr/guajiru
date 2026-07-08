import type { PostStatus } from "@/lib/supabase/types";

const labels: Record<PostStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
};

const styles: Record<PostStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-primary/15 text-primary",
};

export function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
