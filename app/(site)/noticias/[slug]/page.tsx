import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RichText } from "@/components/portable-text";
import { urlFor } from "@/lib/sanity/image";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Notícia não encontrada" };

  return {
    title: post.title,
    description: `${post.category} do Clube Desportivo Guajiru`,
  };
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-20">
      <p className="text-sm uppercase tracking-wide text-secondary">{post.category}</p>
      <h1 className="mt-2 font-[family-name:var(--font-bebas)] text-5xl tracking-wide">{post.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
      </p>
      {post.coverImage ? (
        <Image
          src={urlFor(post.coverImage).width(1200).height(630).url()}
          alt={post.title}
          width={1200}
          height={630}
          className="mt-8 w-full rounded-2xl object-cover"
        />
      ) : null}
      <div className="mt-8">
        <RichText value={post.body} />
      </div>
    </article>
  );
}
