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
import { 
  Plus, Pencil, Trash2, Code, Palette, Database, Globe, 
  Smartphone, Zap, Search, Settings, Target, TrendingUp,
  BarChart, LineChart, PieChart, DollarSign, Users, ShoppingCart,
  Mail, MessageSquare, Share2, Megaphone, Rocket, Award,
  Briefcase, Building, Calculator, CreditCard, FileText
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  category: string | null;
  proficiency: number | null;
  icon: string | null;
  is_visible: boolean | null;
  display_order: number | null;
}

// Available icons for skills
const availableIcons = [
  { name: "code", icon: Code, label: "Code" },
  { name: "palette", icon: Palette, label: "Design" },
  { name: "database", icon: Database, label: "Database" },
  { name: "globe", icon: Globe, label: "Web" },
  { name: "smartphone", icon: Smartphone, label: "Mobile" },
  { name: "zap", icon: Zap, label: "Fast" },
  { name: "search", icon: Search, label: "Search/SEO" },
  { name: "settings", icon: Settings, label: "Settings" },
  { name: "target", icon: Target, label: "Target" },
  { name: "trending-up", icon: TrendingUp, label: "Growth" },
  { name: "bar-chart", icon: BarChart, label: "Analytics" },
  { name: "line-chart", icon: LineChart, label: "Charts" },
  { name: "pie-chart", icon: PieChart, label: "Reports" },
  { name: "dollar-sign", icon: DollarSign, label: "Money" },
  { name: "users", icon: Users, label: "Users" },
  { name: "shopping-cart", icon: ShoppingCart, label: "E-commerce" },
  { name: "mail", icon: Mail, label: "Email" },
  { name: "message-square", icon: MessageSquare, label: "Chat" },
  { name: "share2", icon: Share2, label: "Share" },
  { name: "megaphone", icon: Megaphone, label: "Marketing" },
  { name: "rocket", icon: Rocket, label: "Launch" },
  { name: "award", icon: Award, label: "Award" },
  { name: "briefcase", icon: Briefcase, label: "Business" },
  { name: "building", icon: Building, label: "Corporate" },
  { name: "calculator", icon: Calculator, label: "Calculate" },
  { name: "credit-card", icon: CreditCard, label: "Payment" },
  { name: "file-text", icon: FileText, label: "Document" },
];

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
    icon: "code",
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
      icon: "code",
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
        icon: skill.icon || "code",
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

  const getIconComponent = (iconName: string | null) => {
    const found = availableIcons.find(i => i.name === iconName);
    return found ? found.icon : Code;
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
          <h1 className="text-3xl font-bold">Skills & Technologies</h1>
          <p className="text-muted-foreground">Manage your skill set with icons</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Skill Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Google Ads Expert"
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Marketing, Advertising, Analytics..."
                />
              </div>
              
              {/* Icon Picker */}
              <div>
                <Label className="mb-3 block">Select Icon</Label>
                <div className="grid grid-cols-6 gap-2 p-3 bg-muted/50 rounded-lg max-h-48 overflow-y-auto">
                  {availableIcons.map((iconOption) => {
                    const IconComp = iconOption.icon;
                    return (
                      <button
                        key={iconOption.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: iconOption.name })}
                        className={cn(
                          "p-2 rounded-lg flex flex-col items-center gap-1 transition-all hover:bg-background",
                          formData.icon === iconOption.name 
                            ? "bg-primary text-primary-foreground ring-2 ring-primary" 
                            : "bg-background border border-border"
                        )}
                        title={iconOption.label}
                      >
                        <IconComp className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Selected: {availableIcons.find(i => i.name === formData.icon)?.label || "Code"}
                </p>
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
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${formData.proficiency}%` }}
                  />
                </div>
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
                <TableHead>Icon</TableHead>
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
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No skills yet. Add your first skill!
                  </TableCell>
                </TableRow>
              ) : (
                skills.map((skill) => {
                  const IconComp = getIconComponent(skill.icon);
                  return (
                    <TableRow key={skill.id}>
                      <TableCell>
                        <div className="p-2 rounded-lg bg-primary/10 text-primary inline-flex">
                          <IconComp className="h-4 w-4" />
                        </div>
                      </TableCell>
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
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSkills;
