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
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            My Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Skills & Technologies</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A comprehensive toolkit built over years of experience in digital marketing and advertising.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displaySkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon || "code"] || Code;
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{skill.name}</h3>
                    {skill.category && (
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {skill.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="font-medium">{skill.proficiency}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    />
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
