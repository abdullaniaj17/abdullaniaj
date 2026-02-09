import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FaviconSettings {
  favicon_url: string;
}

export const useFavicon = () => {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavicon = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "favicon")
        .maybeSingle();

      if (data && !error) {
        const settings = data.setting_value as unknown as FaviconSettings;
        if (settings?.favicon_url) {
          setFaviconUrl(settings.favicon_url);
        }
      }
      setIsLoading(false);
    };

    fetchFavicon();
  }, []);

  useEffect(() => {
    if (!faviconUrl || isLoading) return;

    // Update favicon link elements
    const updateFavicon = (url: string) => {
      // Remove existing favicon links
      const existingFavicons = document.querySelectorAll("link[rel*='icon']");
      existingFavicons.forEach(el => el.remove());

      // Create new favicon link
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/x-icon";
      link.href = url;
      document.head.appendChild(link);

      // Also add for Apple touch icon
      const appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      appleLink.href = url;
      document.head.appendChild(appleLink);
    };

    updateFavicon(faviconUrl);
  }, [faviconUrl, isLoading]);

  return { faviconUrl, isLoading };
};
