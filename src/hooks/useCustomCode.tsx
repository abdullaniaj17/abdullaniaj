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
      const { data } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "custom_code")
        .single();

      if (data) {
        setCustomCode(data.setting_value as unknown as CustomCodeSettings);
      }
      setIsLoading(false);
    };

    fetchCustomCode();
  }, []);

  useEffect(() => {
    if (!customCode || isLoading) return;

    // Inject head code
    if (customCode.head_code) {
      const headContainer = document.createElement("div");
      headContainer.id = "custom-head-code";
      headContainer.innerHTML = customCode.head_code;
      
      // Remove existing custom head code
      const existingHead = document.getElementById("custom-head-code");
      if (existingHead) existingHead.remove();
      
      // Move elements to head
      const fragment = document.createDocumentFragment();
      while (headContainer.firstChild) {
        fragment.appendChild(headContainer.firstChild);
      }
      
      const wrapper = document.createElement("div");
      wrapper.id = "custom-head-code";
      wrapper.appendChild(fragment);
      document.head.appendChild(wrapper);
    }

    // Inject body start code
    if (customCode.body_start_code) {
      const existingBodyStart = document.getElementById("custom-body-start-code");
      if (existingBodyStart) existingBodyStart.remove();
      
      const bodyStartContainer = document.createElement("div");
      bodyStartContainer.id = "custom-body-start-code";
      bodyStartContainer.innerHTML = customCode.body_start_code;
      document.body.insertBefore(bodyStartContainer, document.body.firstChild);
    }

    // Inject body end code
    if (customCode.body_end_code) {
      const existingBodyEnd = document.getElementById("custom-body-end-code");
      if (existingBodyEnd) existingBodyEnd.remove();
      
      const bodyEndContainer = document.createElement("div");
      bodyEndContainer.id = "custom-body-end-code";
      bodyEndContainer.innerHTML = customCode.body_end_code;
      document.body.appendChild(bodyEndContainer);
      
      // Execute scripts manually since innerHTML doesn't execute them
      const scripts = bodyEndContainer.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }

    // Cleanup function
    return () => {
      const headCode = document.getElementById("custom-head-code");
      const bodyStartCode = document.getElementById("custom-body-start-code");
      const bodyEndCode = document.getElementById("custom-body-end-code");
      
      if (headCode) headCode.remove();
      if (bodyStartCode) bodyStartCode.remove();
      if (bodyEndCode) bodyEndCode.remove();
    };
  }, [customCode, isLoading]);

  return { customCode, isLoading };
};
