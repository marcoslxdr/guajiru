-- Admin storage: upload/delete post cover images

DROP POLICY IF EXISTS "Admin upload post images" ON storage.objects;
CREATE POLICY "Admin upload post images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'club-assets'
    AND (storage.foldername(name))[1] = 'posts'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

DROP POLICY IF EXISTS "Admin update post images" ON storage.objects;
CREATE POLICY "Admin update post images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'club-assets'
    AND (storage.foldername(name))[1] = 'posts'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

DROP POLICY IF EXISTS "Admin delete post images" ON storage.objects;
CREATE POLICY "Admin delete post images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'club-assets'
    AND (storage.foldername(name))[1] = 'posts'
    AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
