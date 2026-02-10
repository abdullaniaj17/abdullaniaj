import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageIcon, Upload, Loader2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  alt_text: string | null;
}

interface MediaPickerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const MediaPicker = ({ value, onChange, label = "Featured Image" }: MediaPickerProps) => {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchMedia = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("media")
      .select("id, file_name, file_url, file_type, alt_text")
      .eq("file_type", "image")
      .order("created_at", { ascending: false });
    setMedia(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (open) fetchMedia();
  }, [open]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `media/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("site-assets").getPublicUrl(path);
    // Save to media table
    await supabase.from("media").insert({
      file_name: file.name,
      file_url: urlData.publicUrl,
      file_type: "image",
      file_size: file.size,
      alt_text: "",
    });
    onChange(urlData.publicUrl);
    setUploading(false);
    setOpen(false);
    toast({ title: "Image uploaded and selected" });
  };

  const selectImage = (url: string) => {
    onChange(url);
    setOpen(false);
  };

  const filtered = media.filter(m =>
    m.file_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-border group">
          <img src={value} alt="Selected" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Change</Button>
            <Button size="sm" variant="destructive" onClick={() => onChange("")}>Remove</Button>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setOpen(true)}
        >
          <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Click to select from Media Library or upload</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search media..."
                className="pl-9"
              />
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
              Upload New
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto mt-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="w-10 h-10 mx-auto mb-2" />
                <p>No images found. Upload one to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {filtered.map(item => (
                  <button
                    key={item.id}
                    onClick={() => selectImage(item.file_url)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:ring-2 hover:ring-primary ${
                      value === item.file_url ? "border-primary ring-2 ring-primary" : "border-border"
                    }`}
                  >
                    <img src={item.file_url} alt={item.alt_text || item.file_name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaPicker;
