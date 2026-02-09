-- Create pages table for custom and section pages
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  page_type TEXT NOT NULL DEFAULT 'custom',
  is_published BOOLEAN DEFAULT false,
  is_system BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Anyone can view published pages
CREATE POLICY "Anyone can view published pages"
ON public.pages
FOR SELECT
USING (is_published = true);

-- Authenticated users can manage pages
CREATE POLICY "Authenticated users can manage pages"
ON public.pages
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_pages_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default system pages
INSERT INTO public.pages (title, slug, page_type, is_system, is_published, display_order) VALUES
('About', 'about', 'system', true, true, 1),
('Skills', 'skills', 'system', true, true, 2),
('Portfolio', 'portfolio', 'system', true, true, 3),
('Services', 'services', 'system', true, true, 4),
('Blog', 'blog', 'system', true, true, 5),
('Contact', 'contact', 'system', true, true, 6);