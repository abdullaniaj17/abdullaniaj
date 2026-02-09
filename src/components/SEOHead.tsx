import { useSEO } from "@/hooks/useSEO";

/**
 * Component that manages SEO meta tags from admin settings.
 * This component doesn't render anything visible - it just
 * handles the meta tag management side effects.
 */
const SEOHead = () => {
  useSEO();
  return null;
};

export default SEOHead;
