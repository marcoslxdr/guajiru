import type { Modality, ModalityRow } from "./types";
import type { Modality as AppModality } from "@/lib/modalities";

export function mapModalityRow(row: ModalityRow): Modality {
  return {
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    introParagraphs: row.intro_paragraphs ?? [],
    heroImage: {
      src: row.hero_image_url,
      alt: row.hero_image_alt,
    },
    gallery: row.gallery ?? [],
    accent: row.accent,
    keywords: row.keywords ?? [],
    location: row.location,
    audience: row.audience,
    trainingSchedule: row.training_schedule,
    trainingFocus: row.training_focus ?? [],
    highlights: row.highlights ?? [],
  };
}

export function mapFallbackModality(modality: AppModality): Modality {
  return {
    slug: modality.slug,
    name: modality.name,
    shortDescription: modality.shortDescription,
    description: modality.description,
    introParagraphs: modality.introParagraphs,
    heroImage: modality.heroImage,
    gallery: modality.gallery,
    accent: modality.accent,
    keywords: modality.keywords,
    location: modality.location,
    audience: modality.audience,
    trainingSchedule: modality.trainingSchedule,
    trainingFocus: modality.trainingFocus,
    highlights: modality.highlights,
  };
}
