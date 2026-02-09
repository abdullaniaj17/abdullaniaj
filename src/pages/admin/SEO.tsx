import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Search, Share2, Twitter, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

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

const defaultPageSEO: PageSEO = {
  title: "",
  description: "",
  keywords: "",
  og_title: "",
  og_description: "",
  og_image: "",
  og_type: "website",
  twitter_card: "summary_large_image",
  twitter_title: "",
  twitter_description: "",
  twitter_image: "",
  twitter_site: "",
};

const defaultSEOSettings: SEOSettings = {
  homepage: { ...defaultPageSEO },
  global: {
    site_name: "",
    default_og_image: "",
    twitter_site: "",
  },
};

const AdminSEO = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(defaultSEOSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "seo_settings")
        .maybeSingle();

      if (data && !error) {
        const value = data.setting_value as unknown as SEOSettings;
        setSeoSettings({
          homepage: { ...defaultPageSEO, ...value.homepage },
          global: { ...defaultSEOSettings.global, ...value.global },
        });
      }
      setIsLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Check if record exists
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("setting_key", "seo_settings")
        .maybeSingle();

      let error;
      if (existing) {
        // Update existing record
        const result = await supabase
          .from("site_settings")
          .update({ setting_value: JSON.parse(JSON.stringify(seoSettings)) })
          .eq("setting_key", "seo_settings");
        error = result.error;
      } else {
        // Insert new record
        const result = await supabase
          .from("site_settings")
          .insert({
            setting_key: "seo_settings",
            setting_value: JSON.parse(JSON.stringify(seoSettings)),
          });
        error = result.error;
      }

      if (error) throw error;

      toast({ title: "Success", description: "SEO settings saved successfully!" });
    } catch (error) {
      console.error("Save error:", error);
      toast({ title: "Error", description: "Failed to save SEO settings", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const updateHomepage = (field: keyof PageSEO, value: string) => {
    setSeoSettings(prev => ({
      ...prev,
      homepage: { ...prev.homepage, [field]: value },
    }));
  };

  const updateGlobal = (field: keyof SEOSettings["global"], value: string) => {
    setSeoSettings(prev => ({
      ...prev,
      global: { ...prev.global, [field]: value },
    }));
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
          <h1 className="text-3xl font-bold">SEO Settings</h1>
          <p className="text-muted-foreground">Manage meta tags, Open Graph, and Twitter cards for better SEO</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="homepage" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Homepage
          </TabsTrigger>
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Global Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="homepage" className="space-y-6">
          {/* Basic Meta Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Basic Meta Tags
              </CardTitle>
              <CardDescription>
                These appear in search engine results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Meta Title</Label>
                <Input
                  id="title"
                  value={seoSettings.homepage.title}
                  onChange={(e) => updateHomepage("title", e.target.value)}
                  placeholder="Your Portfolio - Professional Web Developer"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {seoSettings.homepage.title.length}/60 characters (recommended max)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea
                  id="description"
                  value={seoSettings.homepage.description}
                  onChange={(e) => updateHomepage("description", e.target.value)}
                  placeholder="Professional web developer specializing in React and modern web technologies. View my portfolio and get in touch."
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {seoSettings.homepage.description.length}/160 characters (recommended max)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Meta Keywords</Label>
                <Input
                  id="keywords"
                  value={seoSettings.homepage.keywords}
                  onChange={(e) => updateHomepage("keywords", e.target.value)}
                  placeholder="web developer, react, portfolio, frontend, javascript"
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated keywords (less important for modern SEO but still used by some engines)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Open Graph Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Open Graph Tags (Facebook, LinkedIn)
              </CardTitle>
              <CardDescription>
                Control how your site appears when shared on social media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="og_title">OG Title</Label>
                <Input
                  id="og_title"
                  value={seoSettings.homepage.og_title}
                  onChange={(e) => updateHomepage("og_title", e.target.value)}
                  placeholder="Leave empty to use Meta Title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_description">OG Description</Label>
                <Textarea
                  id="og_description"
                  value={seoSettings.homepage.og_description}
                  onChange={(e) => updateHomepage("og_description", e.target.value)}
                  placeholder="Leave empty to use Meta Description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  value={seoSettings.homepage.og_image}
                  onChange={(e) => updateHomepage("og_image", e.target.value)}
                  placeholder="https://example.com/og-image.jpg (1200x630px recommended)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_type">OG Type</Label>
                <Input
                  id="og_type"
                  value={seoSettings.homepage.og_type}
                  onChange={(e) => updateHomepage("og_type", e.target.value)}
                  placeholder="website"
                />
              </div>
            </CardContent>
          </Card>

          {/* Twitter Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Twitter className="h-5 w-5" />
                Twitter Card Tags
              </CardTitle>
              <CardDescription>
                Control how your site appears when shared on Twitter/X
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter_card">Card Type</Label>
                <Input
                  id="twitter_card"
                  value={seoSettings.homepage.twitter_card}
                  onChange={(e) => updateHomepage("twitter_card", e.target.value)}
                  placeholder="summary_large_image"
                />
                <p className="text-xs text-muted-foreground">
                  Options: summary, summary_large_image, app, player
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_title">Twitter Title</Label>
                <Input
                  id="twitter_title"
                  value={seoSettings.homepage.twitter_title}
                  onChange={(e) => updateHomepage("twitter_title", e.target.value)}
                  placeholder="Leave empty to use OG Title or Meta Title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_description">Twitter Description</Label>
                <Textarea
                  id="twitter_description"
                  value={seoSettings.homepage.twitter_description}
                  onChange={(e) => updateHomepage("twitter_description", e.target.value)}
                  placeholder="Leave empty to use OG Description or Meta Description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_image">Twitter Image URL</Label>
                <Input
                  id="twitter_image"
                  value={seoSettings.homepage.twitter_image}
                  onChange={(e) => updateHomepage("twitter_image", e.target.value)}
                  placeholder="Leave empty to use OG Image"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_site">Twitter @username</Label>
                <Input
                  id="twitter_site"
                  value={seoSettings.homepage.twitter_site}
                  onChange={(e) => updateHomepage("twitter_site", e.target.value)}
                  placeholder="@yourusername"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global SEO Settings</CardTitle>
              <CardDescription>
                These settings apply site-wide as defaults
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={seoSettings.global.site_name}
                  onChange={(e) => updateGlobal("site_name", e.target.value)}
                  placeholder="Your Portfolio Name"
                />
                <p className="text-xs text-muted-foreground">
                  Used for og:site_name tag
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default_og_image">Default OG Image</Label>
                <Input
                  id="default_og_image"
                  value={seoSettings.global.default_og_image}
                  onChange={(e) => updateGlobal("default_og_image", e.target.value)}
                  placeholder="https://example.com/default-og.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  Fallback image when page-specific OG image is not set
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="global_twitter_site">Default Twitter @username</Label>
                <Input
                  id="global_twitter_site"
                  value={seoSettings.global.twitter_site}
                  onChange={(e) => updateGlobal("twitter_site", e.target.value)}
                  placeholder="@yourusername"
                />
              </div>
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

export default AdminSEO;
