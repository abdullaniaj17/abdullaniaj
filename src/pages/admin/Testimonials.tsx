import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string | null;
  client_company: string | null;
  client_avatar: string | null;
  content: string;
  rating: number | null;
  is_visible: boolean | null;
  display_order: number | null;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    client_name: "",
    client_title: "",
    client_company: "",
    client_avatar: "",
    content: "",
    rating: 5,
    is_visible: true,
    display_order: 0,
  });

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch testimonials", variant: "destructive" });
    } else {
      setTestimonials(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const resetForm = () => {
    setFormData({
      client_name: "",
      client_title: "",
      client_company: "",
      client_avatar: "",
      content: "",
      rating: 5,
      is_visible: true,
      display_order: testimonials.length,
    });
    setEditingTestimonial(null);
  };

  const openDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        client_name: testimonial.client_name,
        client_title: testimonial.client_title || "",
        client_company: testimonial.client_company || "",
        client_avatar: testimonial.client_avatar || "",
        content: testimonial.content,
        rating: testimonial.rating || 5,
        is_visible: testimonial.is_visible ?? true,
        display_order: testimonial.display_order || 0,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const testimonialData = {
      client_name: formData.client_name,
      client_title: formData.client_title || null,
      client_company: formData.client_company || null,
      client_avatar: formData.client_avatar || null,
      content: formData.content,
      rating: formData.rating,
      is_visible: formData.is_visible,
      display_order: formData.display_order,
    };

    if (editingTestimonial) {
      const { error } = await supabase
        .from("testimonials")
        .update(testimonialData)
        .eq("id", editingTestimonial.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update testimonial", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Testimonial updated successfully" });
        fetchTestimonials();
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("testimonials").insert(testimonialData);

      if (error) {
        toast({ title: "Error", description: "Failed to create testimonial", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Testimonial created successfully" });
        fetchTestimonials();
        setIsDialogOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete testimonial", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Testimonial deleted successfully" });
      fetchTestimonials();
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
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client Name *</Label>
                  <Input
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Title/Position</Label>
                  <Input
                    value={formData.client_title}
                    onChange={(e) => setFormData({ ...formData, client_title: e.target.value })}
                    placeholder="CEO"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={formData.client_company}
                    onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                    placeholder="Company Inc."
                  />
                </div>
                <div>
                  <Label>Avatar URL</Label>
                  <Input
                    value={formData.client_avatar}
                    onChange={(e) => setFormData({ ...formData, client_avatar: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <Label>Testimonial Content *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="What did the client say?"
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rating (1-5)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                  />
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                />
                <Label>Visible on Site</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingTestimonial ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No testimonials yet. Add your first testimonial!
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{testimonial.client_name}</p>
                        {testimonial.client_title && (
                          <p className="text-sm text-muted-foreground">{testimonial.client_title}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{testimonial.client_company || "-"}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < (testimonial.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${testimonial.is_visible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {testimonial.is_visible ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openDialog(testimonial)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestimonials;
