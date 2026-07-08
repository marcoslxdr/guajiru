-- Admin RLS + storage for transparency documents

CREATE POLICY "Admin manage transparency documents"
  ON public.transparency_documents FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admin upload transparency files" ON storage.objects;
CREATE POLICY "Admin upload transparency files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'club-assets'
    AND (storage.foldername(name))[1] = 'transparency'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

DROP POLICY IF EXISTS "Admin update transparency files" ON storage.objects;
CREATE POLICY "Admin update transparency files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'club-assets'
    AND (storage.foldername(name))[1] = 'transparency'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

DROP POLICY IF EXISTS "Admin delete transparency files" ON storage.objects;
CREATE POLICY "Admin delete transparency files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'club-assets'
    AND (storage.foldername(name))[1] = 'transparency'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
