import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
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
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, GripVertical, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavItem {
  id: string;
  label: string;
  href: string;
  display_order: number;
  is_visible: boolean;
  open_in_new_tab: boolean;
}

const AdminNavigation = () => {
  const [items, setItems] = useState<NavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [form, setForm] = useState({ label: "", href: "", open_in_new_tab: false });
  const { toast } = useToast();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("nav_menu_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (data) setItems(data as NavItem[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async () => {
    if (!form.label.trim() || !form.href.trim()) {
      toast({ title: "Error", description: "Label and URL are required", variant: "destructive" });
      return;
    }

    if (editingItem) {
      const { error } = await supabase
        .from("nav_menu_items")
        .update({ label: form.label, href: form.href, open_in_new_tab: form.open_in_new_tab })
        .eq("id", editingItem.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Updated", description: "Navigation item updated" });
    } else {
      const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.display_order)) + 1 : 0;
      const { error } = await supabase
        .from("nav_menu_items")
        .insert({ label: form.label, href: form.href, open_in_new_tab: form.open_in_new_tab, display_order: maxOrder });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Created", description: "Navigation item added" });
    }

    setIsDialogOpen(false);
    setEditingItem(null);
    setForm({ label: "", href: "", open_in_new_tab: false });
    fetchItems();
  };

  const handleEdit = (item: NavItem) => {
    setEditingItem(item);
    setForm({ label: item.label, href: item.href, open_in_new_tab: item.open_in_new_tab });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("nav_menu_items").delete().eq("id", id);
    toast({ title: "Deleted", description: "Navigation item removed" });
    fetchItems();
  };

  const handleToggleVisibility = async (item: NavItem) => {
    await supabase
      .from("nav_menu_items")
      .update({ is_visible: !item.is_visible })
      .eq("id", item.id);
    fetchItems();
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const idx = items.findIndex((i) => i.id === id);
    if ((direction === "up" && idx === 0) || (direction === "down" && idx === items.length - 1)) return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const updates = [
      { id: items[idx].id, display_order: items[swapIdx].display_order },
      { id: items[swapIdx].id, display_order: items[idx].display_order },
    ];

    for (const u of updates) {
      await supabase.from("nav_menu_items").update({ display_order: u.display_order }).eq("id", u.id);
    }
    fetchItems();
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Navigation Menu</h1>
          <p className="text-muted-foreground">Manage your site's navigation links</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) { setEditingItem(null); setForm({ label: "", href: "", open_in_new_tab: false }); }
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Navigation Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="e.g. About" />
              </div>
              <div className="space-y-2">
                <Label>URL / Path</Label>
                <Input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} placeholder="e.g. /about or https://..." />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.open_in_new_tab} onCheckedChange={(v) => setForm({ ...form, open_in_new_tab: v })} />
                <Label>Open in new tab</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleSave}>{editingItem ? "Update" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle>Menu Items</CardTitle></CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No navigation items yet</p>
          ) : (
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" className="h-5 w-5" disabled={idx === 0} onClick={() => handleReorder(item.id, "up")}>
                      <span className="text-xs">▲</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-5 w-5" disabled={idx === items.length - 1} onClick={() => handleReorder(item.id, "down")}>
                      <span className="text-xs">▼</span>
                    </Button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      {item.href}
                      {item.open_in_new_tab && <ExternalLink className="h-3 w-3" />}
                    </p>
                  </div>
                  <Switch checked={item.is_visible} onCheckedChange={() => handleToggleVisibility(item)} />
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{item.label}"?</AlertDialogTitle>
                        <AlertDialogDescription>This will remove this item from the navigation menu.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNavigation;
