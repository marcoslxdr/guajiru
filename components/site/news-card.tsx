import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/supabase/types";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryLabels: Record<Post["category"], string> = {
  notícia: "Notícia",
  comunicado: "Comunicado",
};

export function NewsCard({
  post,
  featured = false,
  variant = "default",
}: {
  post: Post;
  featured?: boolean;
  variant?: "default" | "tile";
}) {
  if (variant === "tile") {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_40px_-28px_rgba(26,26,26,0.2)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(95,146,53,0.25)]">
        {post.cover_image_url ? (
          <Link href={`/noticias/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 360px"
            />
          </Link>
        ) : (
          <Link
            href={`/noticias/${post.slug}`}
            className="flex aspect-[16/10] items-end bg-muted p-5 transition-colors group-hover:bg-muted/80"
          >
            <span className="font-display text-3xl text-primary">Guajiru</span>
          </Link>
        )}

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-highlight/30 px-2.5 py-0.5 text-secondary">
              {categoryLabels[post.category]}
            </span>
            <time dateTime={post.published_at ?? undefined} className="text-muted-foreground">
              {formatDate(post.published_at)}
            </time>
          </div>
          <h3 className="font-display text-2xl leading-tight">
            <Link href={`/noticias/${post.slug}`} className="transition-colors hover:text-primary">
              {post.title}
            </Link>
          </h3>
          <Link href={`/noticias/${post.slug}`} className="link-arrow mt-auto w-fit text-xs">
            Ler matéria
            <span aria-hidden>→</span>
          </Link>
        </div>
      </article>
    );
  }

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface lg:col-span-2">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-56 lg:min-h-72">
            {post.cover_image_url ? (
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-muted" />
            )}
          </div>
          <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-highlight/30 px-3 py-0.5 font-semibold text-secondary">
                {categoryLabels[post.category]}
              </span>
              <time dateTime={post.published_at ?? undefined} className="text-muted-foreground">
                {formatDate(post.published_at)}
              </time>
            </div>
            <h3 className="font-display text-3xl leading-tight sm:text-4xl">
              <Link href={`/noticias/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h3>
            <Link href={`/noticias/${post.slug}`} className="link-arrow mt-2 w-fit">
              Ler matéria
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col gap-4 border-b border-border pb-6 last:border-b-0 lg:border-b-0 lg:pb-0">
      {post.cover_image_url ? (
        <Link href={`/noticias/${post.slug}`} className="relative block overflow-hidden rounded-2xl">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            width={600}
            height={340}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </Link>
      ) : (
        <Link
          href={`/noticias/${post.slug}`}
          className="flex aspect-[16/10] items-end rounded-2xl border border-border bg-muted p-4 transition-colors group-hover:bg-muted/80"
        >
          <span className="font-display text-2xl text-primary">Guajiru</span>
        </Link>
      )}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-secondary">{categoryLabels[post.category]}</span>
          <span className="text-muted-foreground/50">·</span>
          <time dateTime={post.published_at ?? undefined} className="text-muted-foreground">
            {formatDate(post.published_at)}
          </time>
        </div>
        <h3 className="font-display text-2xl leading-tight">
          <Link href={`/noticias/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
