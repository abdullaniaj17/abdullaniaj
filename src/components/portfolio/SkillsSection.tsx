import { motion } from "framer-motion";
import { 
  Code, Palette, Database, Globe, Smartphone, Zap, Search, Settings,
  Target, TrendingUp, BarChart, LineChart, PieChart, DollarSign, Users,
  ShoppingCart, Mail, MessageSquare, Share2, Megaphone, Rocket, Award,
  Briefcase, Building, Calculator, CreditCard, FileText
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category?: string;
  proficiency: number;
  icon?: string;
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  { id: "1", name: "Google Ads", category: "Advertising", proficiency: 95, icon: "target" },
  { id: "2", name: "Analytics", category: "Data", proficiency: 90, icon: "bar-chart" },
  { id: "3", name: "SEO", category: "Marketing", proficiency: 85, icon: "search" },
  { id: "4", name: "PPC", category: "Advertising", proficiency: 90, icon: "trending-up" },
  { id: "5", name: "Conversion Tracking", category: "Analytics", proficiency: 85, icon: "pie-chart" },
  { id: "6", name: "Lead Generation", category: "Marketing", proficiency: 88, icon: "users" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  palette: Palette,
  database: Database,
  globe: Globe,
  smartphone: Smartphone,
  zap: Zap,
  search: Search,
  settings: Settings,
  target: Target,
  "trending-up": TrendingUp,
  "bar-chart": BarChart,
  "line-chart": LineChart,
  "pie-chart": PieChart,
  "dollar-sign": DollarSign,
  users: Users,
  "shopping-cart": ShoppingCart,
  mail: Mail,
  "message-square": MessageSquare,
  share2: Share2,
  megaphone: Megaphone,
  rocket: Rocket,
  award: Award,
  briefcase: Briefcase,
  building: Building,
  calculator: Calculator,
  "credit-card": CreditCard,
  "file-text": FileText,
};

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  const displaySkills = skills.length > 0 ? skills : defaultSkills;

  // Group skills by category
  const groupedSkills = displaySkills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-subtle" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground border border-border/50 rounded-full">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Skills &</span>{" "}
            <span className="text-accent">Technologies</span>
          </h2>
        </motion.div>

        {/* Skills by Category */}
        <div className="max-w-5xl mx-auto space-y-16">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-4">
                <span>{category}</span>
                <span className="flex-1 h-px bg-border/50" />
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill, index) => {
                  const IconComponent = iconMap[skill.icon || "code"] || Code;
                  
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group relative p-5 rounded-xl bg-card/30 border border-border/30 hover:border-border/60 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-foreground">{skill.name}</span>
                        </div>
                        <span className="text-sm text-accent font-medium">{skill.proficiency}%</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-accent rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
