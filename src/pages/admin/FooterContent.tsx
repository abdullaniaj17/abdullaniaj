import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FooterSection {
  id: string;
  section_key: string;
  section_data: Record<string, any>;
  is_visible: boolean;
  display_order: number;
}

const AdminFooterContent = () => {
  const [sections, setSections] = useState<FooterSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copyrightText, setCopyrightText] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaHref, setCtaHref] = useState("");
  const [footerLinksJson, setFooterLinksJson] = useState<{ title: string; url: string }[]>([]);
  const { toast } = useToast();

  const fetchSections = async () => {
    const { data } = await supabase
      .from("footer_content")
      .select("*")
      .order("display_order", { ascending: true });

    if (data) {
      const typed = data as FooterSection[];
      setSections(typed);

      const copyright = typed.find((s) => s.section_key === "copyright");
      if (copyright) setCopyrightText((copyright.section_data as any).text || "");

      const cta = typed.find((s) => s.section_key === "cta_button");
      if (cta) {
        setCtaText((cta.section_data as any).text || "");
        setCtaHref((cta.section_data as any).href || "");
      }

      const links = typed.find((s) => s.section_key === "footer_links");
      if (links) {
        setFooterLinksJson((links.section_data as any).columns || []);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchSections(); }, []);

  const handleToggle = async (section: FooterSection) => {
    await supabase
      .from("footer_content")
      .update({ is_visible: !section.is_visible })
      .eq("id", section.id);
    fetchSections();
  };

  const saveCopyright = async () => {
    const section = sections.find((s) => s.section_key === "copyright");
    if (!section) return;
    await supabase
      .from("footer_content")
      .update({ section_data: { text: copyrightText } })
      .eq("id", section.id);
    toast({ title: "Saved", description: "Copyright text updated" });
  };

  const saveCTA = async () => {
    const section = sections.find((s) => s.section_key === "cta_button");
    if (!section) return;
    await supabase
      .from("footer_content")
      .update({ section_data: { text: ctaText, href: ctaHref } })
      .eq("id", section.id);
    toast({ title: "Saved", description: "CTA button updated" });
  };

  const addFooterLink = () => {
    setFooterLinksJson([...footerLinksJson, { title: "", url: "" }]);
  };

  const removeFooterLink = (idx: number) => {
    setFooterLinksJson(footerLinksJson.filter((_, i) => i !== idx));
  };

  const updateFooterLink = (idx: number, field: "title" | "url", value: string) => {
    const updated = [...footerLinksJson];
    updated[idx] = { ...updated[idx], [field]: value };
    setFooterLinksJson(updated);
  };

  const saveFooterLinks = async () => {
    const section = sections.find((s) => s.section_key === "footer_links");
    if (!section) return;
    await supabase
      .from("footer_content")
      .update({ section_data: { columns: footerLinksJson } })
      .eq("id", section.id);
    toast({ title: "Saved", description: "Footer links updated" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const copyrightSection = sections.find((s) => s.section_key === "copyright");
  const ctaSection = sections.find((s) => s.section_key === "cta_button");
  const linksSection = sections.find((s) => s.section_key === "footer_links");
  const socialSection = sections.find((s) => s.section_key === "social_links");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Footer Content</h1>
        <p className="text-muted-foreground">Manage your site's footer sections</p>
      </div>

      {/* Copyright */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Copyright Text</CardTitle>
          {copyrightSection && (
            <Switch checked={copyrightSection.is_visible} onCheckedChange={() => handleToggle(copyrightSection)} />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Copyright text (year is auto-added)</Label>
            <Input value={copyrightText} onChange={(e) => setCopyrightText(e.target.value)} placeholder="All rights reserved." />
          </div>
          <Button onClick={saveCopyright}><Save className="h-4 w-4 mr-2" />Save</Button>
        </CardContent>
      </Card>

      {/* CTA Button */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>CTA Button</CardTitle>
          {ctaSection && (
            <Switch checked={ctaSection.is_visible} onCheckedChange={() => handleToggle(ctaSection)} />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Let's Talk" />
            </div>
            <div className="space-y-2">
              <Label>Button Link</Label>
              <Input value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} placeholder="/contact" />
            </div>
          </div>
          <Button onClick={saveCTA}><Save className="h-4 w-4 mr-2" />Save</Button>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Footer Links</CardTitle>
          {linksSection && (
            <Switch checked={linksSection.is_visible} onCheckedChange={() => handleToggle(linksSection)} />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {footerLinksJson.map((link, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input value={link.title} onChange={(e) => updateFooterLink(idx, "title", e.target.value)} placeholder="Link title" className="flex-1" />
              <Input value={link.url} onChange={(e) => updateFooterLink(idx, "url", e.target.value)} placeholder="/path or https://..." className="flex-1" />
              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFooterLink(idx)}>×</Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" onClick={addFooterLink}>Add Link</Button>
            <Button onClick={saveFooterLinks}><Save className="h-4 w-4 mr-2" />Save Links</Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Links Note */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Social Links</CardTitle>
          {socialSection && (
            <Switch checked={socialSection.is_visible} onCheckedChange={() => handleToggle(socialSection)} />
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Social links are managed from <strong>Site Settings → Contact Info</strong>. Toggle visibility here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFooterContent;
