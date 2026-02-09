import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string | null;
  proficiency: number | null;
  icon: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  Code: LucideIcons.Code,
  Code2: LucideIcons.Code2,
  Laptop: LucideIcons.Laptop,
  Monitor: LucideIcons.Monitor,
  Smartphone: LucideIcons.Smartphone,
  Globe: LucideIcons.Globe,
  Database: LucideIcons.Database,
  Server: LucideIcons.Server,
  Cloud: LucideIcons.Cloud,
  Palette: LucideIcons.Palette,
  Figma: LucideIcons.Figma,
  Brush: LucideIcons.Brush,
  PenTool: LucideIcons.PenTool,
  Layout: LucideIcons.Layout,
  Layers: LucideIcons.Layers,
  Box: LucideIcons.Box,
  Cpu: LucideIcons.Cpu,
  Settings: LucideIcons.Settings,
  Terminal: LucideIcons.Terminal,
  FileCode: LucideIcons.FileCode,
  GitBranch: LucideIcons.GitBranch,
  Workflow: LucideIcons.Workflow,
  Zap: LucideIcons.Zap,
  Target: LucideIcons.Target,
  BarChart: LucideIcons.BarChart,
  TrendingUp: LucideIcons.TrendingUp,
  PieChart: LucideIcons.PieChart,
  Sparkles: LucideIcons.Sparkles,
};

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await supabase
        .from("skills")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });

      if (data) {
        setSkills(data);
      }
      setIsLoading(false);
    };

    fetchSkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h1>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
              A comprehensive overview of my technical skills and expertise across various domains.
            </p>

            <div className="space-y-12">
              {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-semibold mb-6">{category}</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categorySkills.map((skill, index) => {
                      const IconComponent = skill.icon && iconMap[skill.icon] ? iconMap[skill.icon] : LucideIcons.Code;
                      return (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="p-4 bg-card border border-border rounded-xl hover:shadow-lg transition-all"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency || 80}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-primary rounded-full"
                            />
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 block text-right">
                            {skill.proficiency || 80}%
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SkillsPage;
