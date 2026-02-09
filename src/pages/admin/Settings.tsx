import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, User, Mail, MapPin, Share2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import FaviconUploader from "@/components/admin/FaviconUploader";

interface HeroSettings {
  name: string;
  tagline: string;
  bio: string;
  image_url: string;
  cta_primary: string;
  cta_secondary: string;
}

interface AboutSettings {
  title: string;
  content: string;
  image_url: string;
  highlights: string[];
}

interface ContactSettings {
  email: string;
  phone: string;
  location: string;
  social_links: {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
}

interface StatsSettings {
  items: Array<{ label: string; value: string }>;
}

interface FaviconSettings {
  favicon_url: string;
}

const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [hero, setHero] = useState<HeroSettings>({
    name: "",
    tagline: "",
    bio: "",
    image_url: "",
    cta_primary: "View My Work",
    cta_secondary: "Get In Touch",
  });

  const [about, setAbout] = useState<AboutSettings>({
    title: "About Me",
    content: "",
    image_url: "",
    highlights: [],
  });

  const [contact, setContact] = useState<ContactSettings>({
    email: "",
    phone: "",
    location: "",
    social_links: {
      twitter: "",
      linkedin: "",
      github: "",
      instagram: "",
    },
  });

  const [stats, setStats] = useState<StatsSettings>({
    items: [
      { label: "Years Experience", value: "5+" },
      { label: "Projects Completed", value: "50+" },
      { label: "Happy Clients", value: "30+" },
      { label: "Awards Won", value: "10+" },
    ],
  });

  const [favicon, setFavicon] = useState<FaviconSettings>({
    favicon_url: "",
  });

  const [highlightsText, setHighlightsText] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value");

      if (data) {
        data.forEach((item) => {
          const value = item.setting_value as Record<string, unknown>;
          switch (item.setting_key) {
            case "hero":
              setHero(value as unknown as HeroSettings);
              break;
            case "about":
              const aboutData = value as unknown as AboutSettings;
              setAbout(aboutData);
              setHighlightsText(aboutData.highlights?.join("\n") || "");
              break;
            case "contact":
              setContact(value as unknown as ContactSettings);
              break;
            case "stats":
              setStats(value as unknown as StatsSettings);
              break;
            case "favicon":
              setFavicon(value as unknown as FaviconSettings);
              break;
          }
        });
      }
      setIsLoading(false);
    };

    fetchSettings();
  }, []);

  const saveSetting = async (key: string, value: object) => {
    const { error } = await supabase
      .from("site_settings")
      .update({ setting_value: JSON.parse(JSON.stringify(value)) })
      .eq("setting_key", key);

    if (error) {
      await supabase.from("site_settings").insert([{
        setting_key: key,
        setting_value: JSON.parse(JSON.stringify(value)),
      }]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedAbout = {
        ...about,
        highlights: highlightsText.split("\n").filter((h) => h.trim()),
      };

      await Promise.all([
        saveSetting("hero", hero),
        saveSetting("about", updatedAbout),
        saveSetting("contact", contact),
        saveSetting("stats", stats),
        saveSetting("favicon", favicon),
      ]);

      toast({ title: "Success", description: "Settings saved successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFaviconChange = (url: string) => {
    setFavicon({ favicon_url: url });
  };

  const updateStatItem = (index: number, field: "label" | "value", value: string) => {
    const newItems = [...stats.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setStats({ items: newItems });
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
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">Configure your portfolio content</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      {/* Favicon */}
      <FaviconUploader
        currentFaviconUrl={favicon.favicon_url}
        onFaviconChange={handleFaviconChange}
      />

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Hero Section
          </CardTitle>
          <CardDescription>Your main introduction on the home page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Your Name</Label>
              <Input
                value={hero.name}
                onChange={(e) => setHero({ ...hero, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input
                value={hero.tagline}
                onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
                placeholder="Full-Stack Developer & Designer"
              />
            </div>
          </div>
          <div>
            <Label>Short Bio</Label>
            <Textarea
              value={hero.bio}
              onChange={(e) => setHero({ ...hero, bio: e.target.value })}
              placeholder="A brief introduction about yourself"
              rows={2}
            />
          </div>
          <div>
            <Label>Profile Image URL</Label>
            <Input
              value={hero.image_url}
              onChange={(e) => setHero({ ...hero, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Primary CTA Text</Label>
              <Input
                value={hero.cta_primary}
                onChange={(e) => setHero({ ...hero, cta_primary: e.target.value })}
                placeholder="View My Work"
              />
            </div>
            <div>
              <Label>Secondary CTA Text</Label>
              <Input
                value={hero.cta_secondary}
                onChange={(e) => setHero({ ...hero, cta_secondary: e.target.value })}
                placeholder="Get In Touch"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Your detailed background and highlights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Section Title</Label>
            <Input
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              placeholder="About Me"
            />
          </div>
          <div>
            <Label>About Content</Label>
            <Textarea
              value={about.content}
              onChange={(e) => setAbout({ ...about, content: e.target.value })}
              placeholder="Tell your story..."
              rows={4}
            />
          </div>
          <div>
            <Label>About Image URL</Label>
            <Input
              value={about.image_url}
              onChange={(e) => setAbout({ ...about, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label>Highlights (one per line)</Label>
            <Textarea
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="5+ Years Experience&#10;50+ Projects Completed&#10;100% Client Satisfaction"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>Your contact details and social links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                placeholder="+1 234 567 890"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={contact.location}
                onChange={(e) => setContact({ ...contact, location: e.target.value })}
                placeholder="New York, USA"
              />
            </div>
          </div>
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Share2 className="h-4 w-4" />
              Social Media Links
            </Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Twitter</Label>
                <Input
                  value={contact.social_links?.twitter || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social_links: { ...contact.social_links, twitter: e.target.value },
                    })
                  }
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">LinkedIn</Label>
                <Input
                  value={contact.social_links?.linkedin || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social_links: { ...contact.social_links, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">GitHub</Label>
                <Input
                  value={contact.social_links?.github || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social_links: { ...contact.social_links, github: e.target.value },
                    })
                  }
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Instagram</Label>
                <Input
                  value={contact.social_links?.instagram || ""}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social_links: { ...contact.social_links, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle>Stats / Achievements</CardTitle>
          <CardDescription>Key metrics displayed on your site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {stats.items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Label</Label>
                  <Input
                    value={item.label}
                    onChange={(e) => updateStatItem(index, "label", e.target.value)}
                    placeholder="Years Experience"
                  />
                </div>
                <div className="w-24">
                  <Label className="text-xs text-muted-foreground">Value</Label>
                  <Input
                    value={item.value}
                    onChange={(e) => updateStatItem(index, "value", e.target.value)}
                    placeholder="5+"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
