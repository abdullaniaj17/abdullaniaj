import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Image } from "lucide-react";

interface FaviconUploaderProps {
  currentFaviconUrl: string;
  onFaviconChange: (url: string) => void;
}

const FaviconUploader = ({ currentFaviconUrl, onFaviconChange }: FaviconUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentFaviconUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Sync previewUrl when currentFaviconUrl prop changes
  useEffect(() => {
    setPreviewUrl(currentFaviconUrl);
  }, [currentFaviconUrl]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/x-icon", "image/png", "image/jpeg", "image/svg+xml", "image/ico", "image/vnd.microsoft.icon"];
    if (!validTypes.includes(file.type) && !file.name.endsWith(".ico")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an ICO, PNG, JPG, or SVG file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 500KB for favicon)
    if (file.size > 500 * 1024) {
      toast({
        title: "File too large",
        description: "Favicon should be less than 500KB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `favicon-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("site-assets")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("site-assets")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;
      setPreviewUrl(publicUrl);
      onFaviconChange(publicUrl);

      toast({
        title: "Favicon uploaded",
        description: "Your new favicon has been uploaded. Save settings to apply.",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload favicon",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFavicon = () => {
    setPreviewUrl("");
    onFaviconChange("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Site Favicon
        </CardTitle>
        <CardDescription>
          Upload a favicon for your site. Recommended size: 32x32 or 64x64 pixels.
          Supported formats: ICO, PNG, JPG, SVG.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-6">
          {/* Preview */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center bg-muted/50 overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Favicon preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image className="w-8 h-8 text-muted-foreground/50" />
              )}
            </div>
          </div>

          {/* Upload controls */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".ico,.png,.jpg,.jpeg,.svg,image/x-icon,image/png,image/jpeg,image/svg+xml"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                onClick={handleButtonClick}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload Favicon"}
              </Button>
              {previewUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFavicon}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {previewUrl && (
              <p className="text-xs text-muted-foreground break-all">
                Current: {previewUrl.split("/").pop()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaviconUploader;
