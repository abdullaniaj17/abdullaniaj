
-- Create case_studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  metrics JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Public can view visible case studies
CREATE POLICY "Anyone can view visible case studies"
  ON public.case_studies FOR SELECT
  USING (is_visible = true);

-- Authenticated users can manage case studies
CREATE POLICY "Authenticated users can manage case studies"
  ON public.case_studies FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed existing static case studies
INSERT INTO public.case_studies (title, description, display_order) VALUES
  ('Multi-Channel Google Ads Campaign — 692 Purchases', 'Managed a high-budget Google Ads campaign generating 15.6K clicks at a 4.44% conversion rate, resulting in 692 purchases with a total ad spend of $27.2K. Focused on optimized bidding strategies and audience targeting to maximize ROAS.', 0),
  ('Lead Generation Campaign — 44 Conversions at $10.69 CPA', 'Executed a targeted lead generation campaign delivering 247 clicks and 29 form submissions over a 14-day window. Achieved 44 total conversions at a cost per conversion of $10.69, demonstrating efficient budget allocation for local service leads.', 1),
  ('High-Volume Search Campaign — 232 Conversions at $5.84 CPA', 'Scaled a search-focused campaign to 3.74K clicks with 232 conversions at just $5.84 per conversion over 7 days. Leveraged granular keyword targeting and continuous A/B testing to drive down cost while maintaining conversion volume.', 2);
