-- Admin RLS: published-only public read, admin full access

DROP POLICY IF EXISTS "Public read posts" ON public.posts;

CREATE POLICY "Public read published posts"
  ON public.posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admin manage posts"
  ON public.posts FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admin update settings" ON public.site_settings;
CREATE POLICY "Admin update settings"
  ON public.site_settings FOR UPDATE
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
