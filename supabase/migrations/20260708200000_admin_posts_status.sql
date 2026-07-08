-- Admin panel: post draft/publish workflow

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

UPDATE public.posts SET status = 'published' WHERE published_at IS NOT NULL;

ALTER TABLE public.posts ALTER COLUMN published_at DROP DEFAULT;
ALTER TABLE public.posts ALTER COLUMN published_at DROP NOT NULL;

CREATE OR REPLACE FUNCTION public.set_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at ON public.posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_posts_updated_at();
