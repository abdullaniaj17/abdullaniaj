-- Fix the contact_submissions INSERT policy to be more explicit
-- The current policy allows anyone to insert, which is intentional for a contact form
-- But we'll add a rate-limiting concept by requiring non-empty required fields

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (
    name IS NOT NULL AND 
    name <> '' AND 
    email IS NOT NULL AND 
    email <> '' AND 
    message IS NOT NULL AND 
    message <> ''
  );