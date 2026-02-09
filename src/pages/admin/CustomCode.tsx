import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Code, FileCode, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CustomCodeSettings {
  head_code: string;
  body_start_code: string;
  body_end_code: string;
}

const AdminCustomCode = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [customCode, setCustomCode] = useState<CustomCodeSettings>({
    head_code: "",
    body_start_code: "",
    body_end_code: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value")
        .eq("setting_key", "custom_code")
        .single();

      if (data) {
        const value = data.setting_value as unknown as CustomCodeSettings;
        setCustomCode({
          head_code: value.head_code || "",
          body_start_code: value.body_start_code || "",
          body_end_code: value.body_end_code || "",
        });
      }
      setIsLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error: updateError } = await supabase
        .from("site_settings")
        .update({ setting_value: JSON.parse(JSON.stringify(customCode)) })
        .eq("setting_key", "custom_code");

      if (updateError) {
        await supabase.from("site_settings").insert([{
          setting_key: "custom_code",
          setting_value: JSON.parse(JSON.stringify(customCode)),
        }]);
      }

      toast({ title: "Success", description: "Custom code saved successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save custom code", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Custom Code</h1>
          <p className="text-muted-foreground">Add custom HTML, CSS, or JavaScript to your site</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Be careful when adding custom code. Invalid code may break your site. Always test changes thoroughly.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="head" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="head" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Head
          </TabsTrigger>
          <TabsTrigger value="body-start" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Body Start
          </TabsTrigger>
          <TabsTrigger value="body-end" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Body End
          </TabsTrigger>
        </TabsList>

        <TabsContent value="head">
          <Card>
            <CardHeader>
              <CardTitle>Head Code</CardTitle>
              <CardDescription>
                Code added here will be injected into the {"<head>"} section. Perfect for:
                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                  <li>Google Analytics / Tag Manager</li>
                  <li>Meta tags and SEO scripts</li>
                  <li>External stylesheets</li>
                  <li>Fonts (Google Fonts, etc.)</li>
                  <li>Favicon configurations</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customCode.head_code}
                onChange={(e) => setCustomCode({ ...customCode, head_code: e.target.value })}
                placeholder={`<!-- Example: Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Example: Custom CSS -->
<style>
  /* Your custom styles */
</style>`}
                className="font-mono text-sm min-h-[300px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="body-start">
          <Card>
            <CardHeader>
              <CardTitle>Body Start Code</CardTitle>
              <CardDescription>
                Code added here will be injected right after the opening {"<body>"} tag. Perfect for:
                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                  <li>Google Tag Manager (noscript)</li>
                  <li>Facebook Pixel</li>
                  <li>Chat widgets</li>
                  <li>Cookie consent banners</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customCode.body_start_code}
                onChange={(e) => setCustomCode({ ...customCode, body_start_code: e.target.value })}
                placeholder={`<!-- Example: Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX"
    height="0" width="0" style="display:none;visibility:hidden">
  </iframe>
</noscript>

<!-- Example: Cookie Consent Banner -->
<div id="cookie-banner">
  <!-- Your cookie consent HTML -->
</div>`}
                className="font-mono text-sm min-h-[300px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="body-end">
          <Card>
            <CardHeader>
              <CardTitle>Body End Code</CardTitle>
              <CardDescription>
                Code added here will be injected before the closing {"</body>"} tag. Perfect for:
                <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                  <li>Third-party scripts that should load last</li>
                  <li>Live chat widgets</li>
                  <li>Tracking pixels</li>
                  <li>Custom JavaScript</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customCode.body_end_code}
                onChange={(e) => setCustomCode({ ...customCode, body_end_code: e.target.value })}
                placeholder={`<!-- Example: Intercom Chat Widget -->
<script>
  window.intercomSettings = {
    api_base: "https://api-iam.intercom.io",
    app_id: "YOUR_APP_ID"
  };
</script>
<script>
  (function(){var w=window;var ic=w.Intercom;...})();
</script>

<!-- Example: Custom JavaScript -->
<script>
  console.log('Custom script loaded!');
</script>`}
                className="font-mono text-sm min-h-[300px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
};

export default AdminCustomCode;
