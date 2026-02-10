import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, GripVertical, Upload, X, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MetricItem {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  display_order: number | null;
  is_visible: boolean | null;
  metrics: MetricItem[] | null;
}

const AdminCaseStudies = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    is_visible: true,
    metrics: [] as MetricItem[],
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchStudies = async () => {
    const { data } = await supabase
      .from("case_studies")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) {
      setStudies(data.map(s => ({
        ...s,
        metrics: Array.isArray(s.metrics) ? (s.metrics as unknown as MetricItem[]) : [],
      })));
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchStudies(); }, []);

  const openCreate = () => {
    setEditingStudy(null);
    setForm({ title: "", description: "", image_url: "", is_visible: true, metrics: [] });
    setDialogOpen(true);
  };

  const openEdit = (study: CaseStudy) => {
    setEditingStudy(study);
    setForm({
      title: study.title,
      description: study.description || "",
      image_url: study.image_url || "",
      is_visible: study.is_visible ?? true,
      metrics: study.metrics || [],
    });
    setDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `case-studies/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("site-assets").getPublicUrl(path);
    setForm(f => ({ ...f, image_url: urlData.publicUrl }));
    setUploading(false);
    toast({ title: "Image uploaded" });
  };

  const removeImage = () => {
    setForm(f => ({ ...f, image_url: "" }));
  };

  const addMetric = () => {
    setForm(f => ({ ...f, metrics: [...f.metrics, { label: "", value: "" }] }));
  };

  const updateMetric = (index: number, field: "label" | "value", val: string) => {
    setForm(f => {
      const metrics = [...f.metrics];
      metrics[index] = { ...metrics[index], [field]: val };
      return { ...f, metrics };
    });
  };

  const removeMetric = (index: number) => {
    setForm(f => ({ ...f, metrics: f.metrics.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    const metricsJson = form.metrics.filter(m => m.label.trim() || m.value.trim()) as unknown as import("@/integrations/supabase/types").Json;
    const payload = {
      title: form.title,
      description: form.description || null,
      image_url: form.image_url || null,
      is_visible: form.is_visible,
      metrics: metricsJson,
    };

    if (editingStudy) {
      await supabase.from("case_studies").update(payload).eq("id", editingStudy.id);
      toast({ title: "Case study updated" });
    } else {
      const maxOrder = studies.length > 0 ? Math.max(...studies.map(s => s.display_order ?? 0)) + 1 : 0;
      await supabase.from("case_studies").insert([{ ...payload, display_order: maxOrder }]);
      toast({ title: "Case study created" });
    }
    setDialogOpen(false);
    fetchStudies();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    await supabase.from("case_studies").delete().eq("id", id);
    toast({ title: "Case study deleted" });
    fetchStudies();
  };

  const moveOrder = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= studies.length) return;
    const updates = [
      { id: studies[index].id, display_order: studies[target].display_order },
      { id: studies[target].id, display_order: studies[index].display_order },
    ];
    for (const u of updates) {
      await supabase.from("case_studies").update({ display_order: u.display_order }).eq("id", u.id);
    }
    fetchStudies();
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Case Studies</h1>
          <p className="text-muted-foreground">Manage your portfolio case studies and Google Ads results.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Case Study</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStudy ? "Edit" : "New"} Case Study</DialogTitle>
            </DialogHeader>
            <div className="space-y-5">
              {/* Title */}
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. E-commerce Campaign — 340% ROAS" />
              </div>

              {/* Description */}
              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the campaign results..." rows={4} />
              </div>

              {/* Featured Image */}
              <div>
                <Label>Featured Image</Label>
                {form.image_url ? (
                  <div className="mt-2 relative rounded-lg overflow-hidden border border-border">
                    <img src={form.image_url} alt="Preview" className="w-full h-48 object-cover" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={removeImage}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploading ? "Uploading..." : "Click to upload an image"}
                    </p>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {!form.image_url && (
                  <div className="mt-2">
                    <Label className="text-xs text-muted-foreground">Or paste image URL</Label>
                    <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." className="mt-1" />
                  </div>
                )}
              </div>

              {/* Metrics */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Metrics</Label>
                  <Button variant="outline" size="sm" onClick={addMetric}><Plus className="w-3 h-3 mr-1" />Add Metric</Button>
                </div>
                {form.metrics.length === 0 && (
                  <p className="text-sm text-muted-foreground">No metrics yet. Add metrics like CPA, Conversions, ROAS, etc.</p>
                )}
                <div className="space-y-2">
                  {form.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input value={metric.label} onChange={e => updateMetric(i, "label", e.target.value)} placeholder="Label (e.g. CPA)" className="flex-1" />
                      <Input value={metric.value} onChange={e => updateMetric(i, "value", e.target.value)} placeholder="Value (e.g. $4.20)" className="flex-1" />
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeMetric(i)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visibility */}
              <div className="flex items-center gap-2">
                <Switch checked={form.is_visible} onCheckedChange={v => setForm(f => ({ ...f, is_visible: v }))} />
                <Label>Visible on portfolio page</Label>
              </div>

              <Button onClick={handleSave} className="w-full" disabled={uploading}>
                {editingStudy ? "Update" : "Create"} Case Study
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {studies.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No case studies yet. Add your first one!</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {studies.map((study, index) => (
            <Card key={study.id}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveOrder(index, -1)} disabled={index === 0}>
                    <GripVertical className="w-4 h-4 rotate-90" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveOrder(index, 1)} disabled={index === studies.length - 1}>
                    <GripVertical className="w-4 h-4 rotate-90" />
                  </Button>
                </div>
                {study.image_url ? (
                  <img src={study.image_url} alt="" className="w-20 h-14 object-cover rounded" />
                ) : (
                  <div className="w-20 h-14 rounded bg-muted flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{study.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{study.description}</p>
                  {study.metrics && study.metrics.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">{study.metrics.length} metric(s)</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded ${study.is_visible ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                  {study.is_visible ? "Visible" : "Hidden"}
                </span>
                <Button variant="ghost" size="icon" onClick={() => openEdit(study)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(study.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCaseStudies;
