import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  twitter_site: string;
}

interface SEOSettings {
  homepage: PageSEO;
  global: {
    site_name: string;
    default_og_image: string;
    twitter_site: string;
  };
}

export const useSEO = () => {
  const [seoSettings, setSeoSettings] = useState<SEOSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSEO = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "seo_settings")
        .maybeSingle();

      if (data && !error) {
        setSeoSettings(data.setting_value as unknown as SEOSettings);
      }
      setIsLoading(false);
    };

    fetchSEO();
  }, []);

  useEffect(() => {
    if (!seoSettings || isLoading) return;

    const { homepage, global } = seoSettings;

    // Helper to set or update meta tag
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      if (!content) return;
      
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Set document title
    if (homepage.title) {
      document.title = homepage.title;
    }

    // Basic meta tags
    setMetaTag("description", homepage.description);
    setMetaTag("keywords", homepage.keywords);

    // Open Graph tags
    setMetaTag("og:title", homepage.og_title || homepage.title, true);
    setMetaTag("og:description", homepage.og_description || homepage.description, true);
    setMetaTag("og:image", homepage.og_image || global.default_og_image, true);
    setMetaTag("og:type", homepage.og_type || "website", true);
    if (global.site_name) {
      setMetaTag("og:site_name", global.site_name, true);
    }

    // Twitter Card tags
    setMetaTag("twitter:card", homepage.twitter_card || "summary_large_image");
    setMetaTag("twitter:title", homepage.twitter_title || homepage.og_title || homepage.title);
    setMetaTag("twitter:description", homepage.twitter_description || homepage.og_description || homepage.description);
    setMetaTag("twitter:image", homepage.twitter_image || homepage.og_image || global.default_og_image);
    setMetaTag("twitter:site", homepage.twitter_site || global.twitter_site);

  }, [seoSettings, isLoading]);

  return { seoSettings, isLoading };
};
