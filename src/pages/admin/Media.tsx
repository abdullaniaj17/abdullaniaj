import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Upload, Image, Video, Loader2, Star } from "lucide-react";

interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  alt_text: string | null;
  title: string | null;
  description: string | null;
  display_order: number | null;
  is_visible: boolean | null;
  is_showcase: boolean | null;
  created_at: string;
}

const AdminMedia = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editForm, setEditForm] = useState({ alt_text: "", title: "", description: "", display_order: 0, is_visible: true, is_showcase: false });
  const { toast } = useToast();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setMediaItems((data as MediaItem[]) || []);
    } catch (error) {
      console.error("Error fetching media:", error);
      toast({ title: "Error", description: "Failed to fetch media items", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `media/${fileName}`;

        const { error: uploadError } = await supabase.storage.from("site-assets").upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from("site-assets").getPublicUrl(filePath);
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        const fileType = isVideo ? "video" : isImage ? "image" : "other";

        const { error: dbError } = await supabase.from("media").insert({
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_type: fileType,
          file_size: file.size,
          alt_text: "",
          title: "",
          description: "",
          display_order: 0,
          is_visible: true,
          is_showcase: false,
        });
        if (dbError) throw dbError;
      }

      toast({ title: "Success", description: "Media uploaded successfully" });
      fetchMedia();
    } catch (error) {
      console.error("Error uploading media:", error);
      toast({ title: "Error", description: "Failed to upload media", variant: "destructive" });
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async (item: MediaItem) => {
    try {
      const urlParts = item.file_url.split("/site-assets/");
      if (urlParts.length > 1) {
        await supabase.storage.from("site-assets").remove([urlParts[1]]);
      }
      const { error } = await supabase.from("media").delete().eq("id", item.id);
      if (error) throw error;
      toast({ title: "Success", description: "Media deleted successfully" });
      fetchMedia();
    } catch (error) {
      console.error("Error deleting media:", error);
      toast({ title: "Error", description: "Failed to delete media", variant: "destructive" });
    }
  };

  const handleEditSave = async () => {
    if (!editingItem) return;
    try {
      const { error } = await supabase
        .from("media")
        .update({
          alt_text: editForm.alt_text,
          title: editForm.title,
          description: editForm.description,
          display_order: editForm.display_order,
          is_visible: editForm.is_visible,
          is_showcase: editForm.is_showcase,
        })
        .eq("id", editingItem.id);

      if (error) throw error;
      toast({ title: "Success", description: "Media updated successfully" });
      setIsDialogOpen(false);
      setEditingItem(null);
      fetchMedia();
    } catch (error) {
      console.error("Error updating media:", error);
      toast({ title: "Error", description: "Failed to update media", variant: "destructive" });
    }
  };

  const openEditDialog = (item: MediaItem) => {
    setEditingItem(item);
    setEditForm({
      alt_text: item.alt_text || "",
      title: item.title || "",
      description: item.description || "",
      display_order: item.display_order || 0,
      is_visible: item.is_visible ?? true,
      is_showcase: item.is_showcase ?? false,
    });
    setIsDialogOpen(true);
  };

  const toggleShowcase = async (item: MediaItem) => {
    const newVal = !(item.is_showcase ?? false);
    await supabase.from("media").update({ is_showcase: newVal }).eq("id", item.id);
    fetchMedia();
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading media...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Upload and manage your images and videos. Toggle ★ to add to Media Showcase.</p>
        </div>
        <div className="relative">
          <Input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} disabled={isUploading} className="absolute inset-0 opacity-0 cursor-pointer" />
          <Button disabled={isUploading}>
            {isUploading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</> : <><Upload className="h-4 w-4 mr-2" />Upload Media</>}
          </Button>
        </div>
      </div>

      {mediaItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Image className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No media yet</h3>
            <p className="text-muted-foreground text-center mb-4">Upload your first image or video to get started</p>
            <div className="relative">
              <Input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} disabled={isUploading} className="absolute inset-0 opacity-0 cursor-pointer" />
              <Button><Plus className="h-4 w-4 mr-2" />Add Media</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative aspect-video bg-muted">
                {item.file_type === "video" ? (
                  <video src={item.file_url} className="w-full h-full object-cover" muted preload="metadata" />
                ) : (
                  <img src={item.file_url} alt={item.alt_text || item.file_name} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-2 left-2 flex gap-1">
                  {item.file_type === "video" ? (
                    <div className="bg-background/80 p-1 rounded"><Video className="h-4 w-4" /></div>
                  ) : (
                    <div className="bg-background/80 p-1 rounded"><Image className="h-4 w-4" /></div>
                  )}
                  {item.is_showcase && (
                    <div className="bg-primary/90 text-primary-foreground p-1 rounded"><Star className="h-4 w-4 fill-current" /></div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => toggleShowcase(item)} title="Toggle Showcase">
                    <Star className={`h-4 w-4 ${item.is_showcase ? "fill-current text-yellow-500" : ""}`} />
                  </Button>
                  <Button size="icon" variant="secondary" onClick={() => openEditDialog(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Media</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to delete "{item.file_name}"? This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate">{item.title || item.file_name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(item.file_size)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {editingItem.file_type === "video" ? (
                  <video src={editingItem.file_url} className="w-full h-full object-contain" controls />
                ) : (
                  <img src={editingItem.file_url} alt={editingItem.alt_text || editingItem.file_name} className="w-full h-full object-contain" />
                )}
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={editForm.title} onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))} placeholder="Media title" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={editForm.description} onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))} placeholder="Short description" />
              </div>
              <div className="space-y-2">
                <Label>Alt Text</Label>
                <Input value={editForm.alt_text} onChange={(e) => setEditForm(prev => ({ ...prev, alt_text: e.target.value }))} placeholder="Accessibility text" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input type="number" value={editForm.display_order} onChange={(e) => setEditForm(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Switch checked={editForm.is_visible} onCheckedChange={(v) => setEditForm(prev => ({ ...prev, is_visible: v }))} />
                    <Label>Visible</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={editForm.is_showcase} onCheckedChange={(v) => setEditForm(prev => ({ ...prev, is_showcase: v }))} />
                    <Label>Show in Showcase</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleEditSave}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMedia;
