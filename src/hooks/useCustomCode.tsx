import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CustomCodeSettings {
  head_code: string;
  body_start_code: string;
  body_end_code: string;
}

export const useCustomCode = () => {
  const [customCode, setCustomCode] = useState<CustomCodeSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomCode = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "custom_code")
        .maybeSingle();

      if (data && !error) {
        setCustomCode(data.setting_value as unknown as CustomCodeSettings);
      }
      setIsLoading(false);
    };

    fetchCustomCode();
  }, []);

  useEffect(() => {
    if (!customCode || isLoading) return;

    const executeScripts = (container: HTMLElement) => {
      const scripts = container.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    };

    // Inject head code (for analytics, meta tags, styles)
    if (customCode.head_code) {
      const existingHead = document.getElementById("custom-head-code");
      if (existingHead) existingHead.remove();
      
      const headContainer = document.createElement("div");
      headContainer.id = "custom-head-code";
      headContainer.innerHTML = customCode.head_code;
      document.head.appendChild(headContainer);
      executeScripts(headContainer);
    }

    // Inject body start code (for GTM noscript, etc.)
    if (customCode.body_start_code) {
      const existingBodyStart = document.getElementById("custom-body-start-code");
      if (existingBodyStart) existingBodyStart.remove();
      
      const bodyStartContainer = document.createElement("div");
      bodyStartContainer.id = "custom-body-start-code";
      bodyStartContainer.innerHTML = customCode.body_start_code;
      document.body.insertBefore(bodyStartContainer, document.body.firstChild);
      executeScripts(bodyStartContainer);
    }

    // Inject body end code (for chat widgets, tracking pixels)
    if (customCode.body_end_code) {
      const existingBodyEnd = document.getElementById("custom-body-end-code");
      if (existingBodyEnd) existingBodyEnd.remove();
      
      const bodyEndContainer = document.createElement("div");
      bodyEndContainer.id = "custom-body-end-code";
      bodyEndContainer.innerHTML = customCode.body_end_code;
      document.body.appendChild(bodyEndContainer);
      executeScripts(bodyEndContainer);
    }

    // No cleanup - code persists until manually deleted from admin
  }, [customCode, isLoading]);

  return { customCode, isLoading };
};
