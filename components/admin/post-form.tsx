"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deletePostAction, savePostAction, unpublishPostAction } from "@/lib/admin/actions";
import { slugify } from "@/lib/admin/slugify";
import type { Post } from "@/lib/supabase/types";
import { ImageUpload } from "./image-upload";
import { RichTextEditor } from "./rich-text-editor";

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  function submit(intent: string) {
    return (formData: FormData) => {
      setMessage(null);
      formData.set("intent", intent);
      if (post?.id) {
        formData.set("id", post.id);
      }

      startTransition(async () => {
        const result = await savePostAction(formData);
        if (!result.ok) {
          setMessage({ type: "error", text: result.error ?? "Erro ao salvar." });
          return;
        }

        setMessage({ type: "success", text: "Notícia salva com sucesso." });
        router.push(`/admin/posts/${result.id}/edit`);
        router.refresh();
      });
    };
  }

  function handleUnpublish() {
    if (!post?.id) return;
    if (!window.confirm("Despublicar esta notícia? Ela deixará de aparecer no site.")) return;

    startTransition(async () => {
      const result = await unpublishPostAction(post.id);
      if (!result.ok) {
        setMessage({ type: "error", text: result.error ?? "Erro ao despublicar." });
        return;
      }
      setMessage({ type: "success", text: "Notícia despublicada." });
      router.refresh();
    });
  }

  function handleDelete() {
    if (!post?.id) return;
    if (!window.confirm("Excluir esta notícia permanentemente?")) return;

    startTransition(async () => {
      const result = await deletePostAction(post.id);
      if (!result.ok) {
        setMessage({ type: "error", text: result.error ?? "Erro ao excluir." });
        return;
      }
      router.push("/admin/posts");
      router.refresh();
    });
  }

  const isPublished = post?.status === "published";

  return (
    <div className="space-y-6">
      {message ? (
        <p className={`rounded-xl px-4 py-3 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-primary/10 text-primary"}`}>
          {message.text}
        </p>
      ) : null}

      <form action={submit(isPublished ? "save" : "draft")} className="space-y-5">
        {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}

        <div>
          <label htmlFor="post-title" className="mb-1 block text-sm font-medium">
            Título
          </label>
          <input
            id="post-title"
            name="title"
            required
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="post-slug" className="mb-1 block text-sm font-medium">
            Endereço (slug)
          </label>
          <input
            id="post-slug"
            name="slug"
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            className="input-field"
          />
          <p className="mt-1 text-xs text-muted-foreground">/noticias/{slug || "..."}</p>
        </div>

        <div>
          <label htmlFor="post-category" className="mb-1 block text-sm font-medium">
            Categoria
          </label>
          <select
            id="post-category"
            name="category"
            defaultValue={post?.category ?? "notícia"}
            className="input-field"
          >
            <option value="notícia">Notícia</option>
            <option value="comunicado">Comunicado</option>
          </select>
        </div>

        <div>
          <p className="mb-1 block text-sm font-medium">Capa</p>
          <ImageUpload name="cover" currentUrl={post?.cover_image_url} />
        </div>

        <div>
          <p className="mb-1 block text-sm font-medium">Conteúdo</p>
          <RichTextEditor key={post?.id ?? "new"} name="body" initialContent={post?.body} />
        </div>

        <div className="flex flex-wrap gap-3">
          {!isPublished ? (
            <>
              <button type="submit" disabled={isPending} className="btn-outline h-11">
                Salvar rascunho
              </button>
              <button
                type="submit"
                disabled={isPending}
                formAction={submit("publish")}
                className="btn-primary h-11"
              >
                Publicar
              </button>
            </>
          ) : (
            <button type="submit" disabled={isPending} className="btn-primary h-11">
              Salvar alterações
            </button>
          )}
          <Link href="/admin/posts" className="btn-outline h-11">
            Voltar
          </Link>
        </div>
      </form>

      {post?.id ? (
        <div className="flex flex-wrap gap-3 border-t border-border pt-4">
          {isPublished ? (
            <button type="button" onClick={handleUnpublish} disabled={isPending} className="btn-outline h-11">
              Despublicar
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex h-11 items-center justify-center rounded-full border border-red-200 px-6 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            Excluir
          </button>
        </div>
      ) : null}
    </div>
  );
}
