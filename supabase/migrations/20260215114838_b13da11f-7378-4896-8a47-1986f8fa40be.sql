
-- Add showcase-related columns to media table
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS is_visible boolean DEFAULT true;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS is_showcase boolean DEFAULT false;
