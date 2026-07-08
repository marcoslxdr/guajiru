-- Admin can insert site_settings singleton

DROP POLICY IF EXISTS "Admin insert settings" ON public.site_settings;
CREATE POLICY "Admin insert settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (id = 1 AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
