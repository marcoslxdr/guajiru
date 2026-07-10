-- RLS for modalities: public read published, admin full manage
ALTER TABLE public.modalities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published modalities" ON public.modalities;
CREATE POLICY "Public read published modalities"
  ON public.modalities FOR SELECT
  USING (published = true OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admin manage modalities" ON public.modalities;
CREATE POLICY "Admin manage modalities"
  ON public.modalities FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
