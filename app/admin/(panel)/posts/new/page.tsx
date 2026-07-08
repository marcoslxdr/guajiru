import { PostForm } from "@/components/admin/post-form";

export default function AdminNewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Nova notícia</h1>
        <p className="mt-1 text-sm text-muted-foreground">Crie um rascunho ou publique diretamente.</p>
      </div>
      <PostForm />
    </div>
  );
}
