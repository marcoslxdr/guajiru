import Image from "next/image";
import type { ModalityImage } from "@/lib/supabase/types";

type ModalityGalleryProps = {
  images: ModalityImage[];
};

function GalleryFigure({ image, className }: { image: ModalityImage; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-border bg-surface ${className ?? ""}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={720}
        height={540}
        className="aspect-[4/3] w-full object-cover"
      />
      {image.caption ? (
        <figcaption className="px-4 py-3 text-sm text-muted-foreground">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function ModalityGallery({ images }: ModalityGalleryProps) {
  if (!images.length) return null;

  if (images.length === 1) {
    return (
      <div className="max-w-2xl">
        <GalleryFigure image={images[0]} />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <GalleryFigure key={image.src} image={image} />
        ))}
      </div>
    );
  }

  const [featured, ...rest] = images;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <GalleryFigure image={featured} className="lg:row-span-2" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {rest.map((image) => (
          <GalleryFigure key={image.src} image={image} />
        ))}
      </div>
    </div>
  );
}
