import { motion } from "framer-motion";
import { 
  Code, Palette, Database, Globe, Smartphone, Zap, Search, Settings,
  Target, TrendingUp, BarChart, LineChart, PieChart, DollarSign, Users,
  ShoppingCart, Mail, MessageSquare, Share2, Megaphone, Rocket, Award,
  Briefcase, Building, Calculator, CreditCard, FileText, Sparkles
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
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="orb orb-primary w-[500px] h-[500px] -bottom-40 -left-40 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full glass border border-primary/20 text-primary"
          >
            <Sparkles className="h-4 w-4" />
            My Expertise
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built over years of experience in digital marketing and advertising.
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
                <div className="relative h-full p-6 rounded-2xl card-premium hover-lift">
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/10 group-hover:via-accent/5 group-hover:to-primary/10 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl glass border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 glow-sm">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                        {skill.category && (
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                            {skill.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Proficiency</span>
                        <span className="font-semibold gradient-text">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent relative overflow-hidden"
                        >
                          <div className="absolute inset-0 shimmer" />
                        </motion.div>
                      </div>
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
