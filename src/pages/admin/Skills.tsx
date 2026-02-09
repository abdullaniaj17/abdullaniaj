import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Skill {
  id: string;
  name: string;
  category: string | null;
  proficiency: number | null;
  icon: string | null;
  is_visible: boolean | null;
  display_order: number | null;
}

const AdminSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: 80,
    icon: "",
    is_visible: true,
    display_order: 0,
  });

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch skills", variant: "destructive" });
    } else {
      setSkills(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      proficiency: 80,
      icon: "",
      is_visible: true,
      display_order: skills.length,
    });
    setEditingSkill(null);
  };

  const openDialog = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category || "",
        proficiency: skill.proficiency || 80,
        icon: skill.icon || "",
        is_visible: skill.is_visible ?? true,
        display_order: skill.display_order || 0,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const skillData = {
      name: formData.name,
      category: formData.category || null,
      proficiency: formData.proficiency,
      icon: formData.icon || null,
      is_visible: formData.is_visible,
      display_order: formData.display_order,
    };

    if (editingSkill) {
      const { error } = await supabase
        .from("skills")
        .update(skillData)
        .eq("id", editingSkill.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update skill", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Skill updated successfully" });
        fetchSkills();
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("skills").insert(skillData);

      if (error) {
        toast({ title: "Error", description: "Failed to create skill", variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Skill created successfully" });
        fetchSkills();
        setIsDialogOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete skill", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Skill deleted successfully" });
      fetchSkills();
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
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground">Manage your skill set</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Skill Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="React / Next.js"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Frontend"
                  />
                </div>
                <div>
                  <Label>Icon (code, palette, database, globe, smartphone, zap)</Label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="code"
                  />
                </div>
              </div>
              <div>
                <Label>Proficiency (0-100)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) || 80 })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch
                    checked={formData.is_visible}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                  />
                  <Label>Visible on Site</Label>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingSkill ? "Update" : "Create"}</Button>
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
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Proficiency</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No skills yet. Add your first skill!
                  </TableCell>
                </TableRow>
              ) : (
                skills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell className="font-medium">{skill.name}</TableCell>
                    <TableCell>{skill.category || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${skill.proficiency || 0}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${skill.is_visible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {skill.is_visible ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openDialog(skill)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(skill.id)}>
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

export default AdminSkills;
