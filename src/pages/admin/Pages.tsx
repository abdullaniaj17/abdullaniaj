import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink, FileText, GripVertical } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  image_url: string | null;
  page_type: string;
  is_published: boolean;
  is_system: boolean;
  seo_title: string | null;
  seo_description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const AdminPages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image_url: "",
    is_published: false,
    seo_title: "",
    seo_description: "",
  });

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .order("display_order", { ascending: true });

    if (data) {
      setPages(data as Page[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      image_url: "",
      is_published: false,
      seo_title: "",
      seo_description: "",
    });
    setEditingPage(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: editingPage ? form.slug : generateSlug(title),
    });
  };

  const openEditDialog = (page: Page) => {
    setEditingPage(page);
    setForm({
      title: page.title,
      slug: page.slug,
      content: page.content || "",
      excerpt: page.excerpt || "",
      image_url: page.image_url || "",
      is_published: page.is_published,
      seo_title: page.seo_title || "",
      seo_description: page.seo_description || "",
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast({
        title: "Error",
        description: "Title and slug are required",
        variant: "destructive",
      });
      return;
    }

    if (editingPage) {
      const { error } = await supabase
        .from("pages")
        .update({
          title: form.title,
          slug: form.slug,
          content: form.content || null,
          excerpt: form.excerpt || null,
          image_url: form.image_url || null,
          is_published: form.is_published,
          seo_title: form.seo_title || null,
          seo_description: form.seo_description || null,
        })
        .eq("id", editingPage.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update page", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Page updated!" });
        setIsDialogOpen(false);
        resetForm();
        fetchPages();
      }
    } else {
      const { error } = await supabase.from("pages").insert([
        {
          title: form.title,
          slug: form.slug,
          content: form.content || null,
          excerpt: form.excerpt || null,
          image_url: form.image_url || null,
          is_published: form.is_published,
          seo_title: form.seo_title || null,
          seo_description: form.seo_description || null,
          page_type: "custom",
          is_system: false,
          display_order: pages.length,
        },
      ]);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Page created!" });
        setIsDialogOpen(false);
        resetForm();
        fetchPages();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("pages").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete page", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Page deleted!" });
      fetchPages();
    }
  };

  const togglePublish = async (page: Page) => {
    const { error } = await supabase
      .from("pages")
      .update({ is_published: !page.is_published })
      .eq("id", page.id);

    if (!error) {
      fetchPages();
      toast({
        title: page.is_published ? "Page Unpublished" : "Page Published",
        description: `"${page.title}" is now ${page.is_published ? "hidden" : "visible"}.`,
      });
    }
  };

  const getPageUrl = (page: Page) => {
    if (page.is_system) {
      return `/${page.slug}`;
    }
    return `/page/${page.slug}`;
  };

  const systemPages = pages.filter((p) => p.is_system);
  const customPages = pages.filter((p) => !p.is_system);

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
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground">Manage your site pages and create custom ones</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPage ? "Edit Page" : "Create New Page"}</DialogTitle>
              <DialogDescription>
                {editingPage ? "Update your page content and settings" : "Add a new custom page to your site"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Page Title"
                  />
                </div>
                <div>
                  <Label>Slug *</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="page-slug"
                    disabled={editingPage?.is_system}
                  />
                </div>
              </div>
              <div>
                <Label>Excerpt / Summary</Label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Brief description of the page"
                  rows={2}
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Page content..."
                  rows={8}
                />
              </div>
              <div>
                <Label>Featured Image URL</Label>
                <Input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">SEO Settings</h4>
                <div className="space-y-3">
                  <div>
                    <Label>SEO Title</Label>
                    <Input
                      value={form.seo_title}
                      onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                      placeholder="Custom title for search engines"
                    />
                  </div>
                  <div>
                    <Label>SEO Description</Label>
                    <Textarea
                      value={form.seo_description}
                      onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                      placeholder="Description for search engines (max 160 chars)"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.is_published}
                  onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
                />
                <Label>Publish this page</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave}>{editingPage ? "Update" : "Create"} Page</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* System Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Section Pages</CardTitle>
          <CardDescription>Built-in pages for your main site sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{page.title}</span>
                      <Badge variant="secondary" className="text-xs">System</Badge>
                      {page.is_published ? (
                        <Badge variant="default" className="text-xs">Published</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">Draft</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">/{page.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(page)}>
                    {page.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={getPageUrl(page)} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(page)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Pages</CardTitle>
          <CardDescription>Pages you've created</CardDescription>
        </CardHeader>
        <CardContent>
          {customPages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No custom pages yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {customPages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{page.title}</span>
                        {page.is_published ? (
                          <Badge variant="default" className="text-xs">Published</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">Draft</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">/page/{page.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => togglePublish(page)}>
                      {page.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={getPageUrl(page)} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(page)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Page?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete "{page.title}". This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(page.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPages;
