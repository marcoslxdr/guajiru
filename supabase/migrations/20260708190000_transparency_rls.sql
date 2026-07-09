-- RLS policies for public read on club content tables
-- Mirrors policies applied to project aempatqmyufrocssntfw

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transparency_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_institucional ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_historia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_diretoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read posts" ON public.posts;
CREATE POLICY "Public read posts" ON public.posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read gallery" ON public.gallery_images;
CREATE POLICY "Public read gallery" ON public.gallery_images FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read documents" ON public.transparency_documents;
CREATE POLICY "Public read documents" ON public.transparency_documents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read institucional" ON public.page_institucional;
CREATE POLICY "Public read institucional" ON public.page_institucional FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read historia" ON public.page_historia;
CREATE POLICY "Public read historia" ON public.page_historia FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read diretoria" ON public.page_diretoria;
CREATE POLICY "Public read diretoria" ON public.page_diretoria FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read settings" ON public.site_settings;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
