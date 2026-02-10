
-- Navigation menu items table
CREATE TABLE public.nav_menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  open_in_new_tab BOOLEAN DEFAULT false,
  parent_id UUID REFERENCES public.nav_menu_items(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.nav_menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible nav items"
ON public.nav_menu_items FOR SELECT
USING (is_visible = true);

CREATE POLICY "Authenticated users can manage nav items"
ON public.nav_menu_items FOR ALL
USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_nav_menu_items_updated_at
BEFORE UPDATE ON public.nav_menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Footer content table (key-value like site_settings but dedicated)
CREATE TABLE public.footer_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  section_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.footer_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible footer content"
ON public.footer_content FOR SELECT
USING (is_visible = true);

CREATE POLICY "Authenticated users can manage footer content"
ON public.footer_content FOR ALL
USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_footer_content_updated_at
BEFORE UPDATE ON public.footer_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default nav items matching current hardcoded values
INSERT INTO public.nav_menu_items (label, href, display_order) VALUES
  ('Home', '/', 0),
  ('About', '/about', 1),
  ('Skills', '/skills', 2),
  ('Portfolio', '/portfolio', 3),
  ('Services', '/services', 4),
  ('Blog', '/blog', 5),
  ('Contact', '/contact', 6);

-- Seed default footer content
INSERT INTO public.footer_content (section_key, section_data, display_order) VALUES
  ('copyright', '{"text": "All rights reserved."}'::jsonb, 0),
  ('social_links', '{"links": []}'::jsonb, 1),
  ('footer_links', '{"columns": []}'::jsonb, 2),
  ('cta_button', '{"text": "Let''s Talk", "href": "/contact"}'::jsonb, 3);
