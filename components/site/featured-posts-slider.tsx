"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/supabase/types";

const categoryLabels: Record<Post["category"], string> = {
  "notícia": "Notícia",
  comunicado: "Comunicado",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-5"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

type FeaturedPostsSliderProps = {
  posts: Post[];
};

export function FeaturedPostsSlider({ posts }: FeaturedPostsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      if (!posts.length) return;
      const next = ((index % posts.length) + posts.length) % posts.length;
      setActiveIndex(next);
    },
    [posts.length],
  );

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reducedMotion.current || posts.length <= 1) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % posts.length);
    }, 7000);
  }, [posts.length]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-background px-8 py-20 text-center">
        <p className="text-muted-foreground">
          Em breve publicaremos notícias e comunicados da diretoria.
        </p>
      </div>
    );
  }

  const activePost = posts[activeIndex];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border bg-foreground shadow-[0_32px_80px_-40px_rgba(26,26,26,0.45)]"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Notícias em destaque"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(activeIndex - 1);
          resetAutoplay();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(activeIndex + 1);
          resetAutoplay();
        }
      }}
      tabIndex={0}
    >
      <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[32rem]">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={index !== activeIndex}
          >
            {post.cover_image_url ? (
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1152px) 100vw, 1152px"
                priority={index === 0}
              />
            ) : (
              <div className="absolute inset-0 bg-primary" />
            )}

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground/92 via-foreground/45 to-foreground/10"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-primary/35 via-transparent to-transparent"
            />

            <div className="relative flex h-full flex-col justify-end p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-accent px-3 py-1 font-bold text-foreground">
                    {categoryLabels[post.category]}
                  </span>
                  <time dateTime={post.published_at ?? undefined} className="font-semibold text-primary-foreground/85">
                    {formatDate(post.published_at)}
                  </time>
                </div>

                <h3 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[0.98] text-primary-foreground">
                  <Link
                    href={`/noticias/${post.slug}`}
                    className="transition-colors hover:text-accent"
                    tabIndex={index === activeIndex ? 0 : -1}
                  >
                    {post.title}
                  </Link>
                </h3>

                <Link
                  href={`/noticias/${post.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/12 px-5 py-2.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20"
                  tabIndex={index === activeIndex ? 0 : -1}
                >
                  Ler matéria
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.length > 1 ? (
        <>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-primary-foreground/15">
            <div
              className="h-full bg-accent transition-[width] duration-700 ease-linear"
              style={{ width: `${((activeIndex + 1) / posts.length) * 100}%` }}
              aria-hidden
            />
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-6 sm:top-6">
            <button
              type="button"
              aria-label="Notícia anterior"
              onClick={() => {
                goTo(activeIndex - 1);
                resetAutoplay();
              }}
              className="inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/25 bg-foreground/30 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-foreground/45"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Próxima notícia"
              onClick={() => {
                goTo(activeIndex + 1);
                resetAutoplay();
              }}
              className="inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/25 bg-foreground/30 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-foreground/45"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>

          <div
            className="absolute bottom-6 left-6 flex items-center gap-2 sm:bottom-8 sm:left-8"
            role="tablist"
            aria-label="Slides de notícias"
          >
            {posts.map((post, index) => (
              <button
                key={post.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Ir para: ${post.title}`}
                onClick={() => {
                  goTo(index);
                  resetAutoplay();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-accent"
                    : "w-2 bg-primary-foreground/45 hover:bg-primary-foreground/70"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {activePost.title} — {activeIndex + 1} de {posts.length}
      </p>
    </div>
  );
}
