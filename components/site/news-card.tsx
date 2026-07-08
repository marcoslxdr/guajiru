import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Post } from "@/lib/sanity/types";

export function NewsCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(600).height(340).url()}
          alt={post.title}
          width={600}
          height={340}
          className="mb-4 h-40 w-full rounded-xl object-cover"
        />
      ) : (
        <div className="mb-4 h-40 w-full rounded-xl bg-muted" />
      )}
      <p className="text-xs uppercase tracking-wide text-secondary">{post.category}</p>
      <h3 className="mt-2 font-[family-name:var(--font-bebas)] text-2xl tracking-wide">
        <Link href={`/noticias/${post.slug.current}`} className="hover:text-primary">
          {post.title}
        </Link>
      </h3>
    </article>
  );
}
