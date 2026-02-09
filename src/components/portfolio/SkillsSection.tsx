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

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground border border-border rounded-full">
            My Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-accent">Skills & Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built over years of experience.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displaySkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon || "code"] || Code;
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full p-6 rounded-2xl border border-border bg-card/50 hover:border-accent/30 transition-all duration-500 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl border border-border text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                      {skill.category && (
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {skill.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-semibold text-accent">{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
