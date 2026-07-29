-- Authenticity / integrity metadata for transparency documents
ALTER TABLE public.transparency_documents
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS source_note text,
  ADD COLUMN IF NOT EXISTS version text,
  ADD COLUMN IF NOT EXISTS content_hash text;

UPDATE public.transparency_documents
SET updated_at = COALESCE(published_at::timestamptz, now())
WHERE updated_at IS NULL;
