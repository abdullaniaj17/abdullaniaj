-- Create a public storage bucket for site assets (favicon, logos, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true);

-- Allow anyone to view site assets
CREATE POLICY "Anyone can view site assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Allow authenticated users to upload site assets
CREATE POLICY "Authenticated users can upload site assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-assets' AND auth.uid() IS NOT NULL);

-- Allow authenticated users to update site assets
CREATE POLICY "Authenticated users can update site assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-assets' AND auth.uid() IS NOT NULL);

-- Allow authenticated users to delete site assets
CREATE POLICY "Authenticated users can delete site assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-assets' AND auth.uid() IS NOT NULL);