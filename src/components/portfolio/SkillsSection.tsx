import { motion } from "framer-motion";
import { Code, Palette, Database, Globe, Smartphone, Zap } from "lucide-react";

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
  { id: "1", name: "React / Next.js", category: "Frontend", proficiency: 95, icon: "code" },
  { id: "2", name: "TypeScript", category: "Frontend", proficiency: 90, icon: "code" },
  { id: "3", name: "Node.js", category: "Backend", proficiency: 85, icon: "database" },
  { id: "4", name: "UI/UX Design", category: "Design", proficiency: 80, icon: "palette" },
  { id: "5", name: "PostgreSQL", category: "Backend", proficiency: 85, icon: "database" },
  { id: "6", name: "Mobile Development", category: "Mobile", proficiency: 75, icon: "smartphone" },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  palette: Palette,
  database: Database,
  globe: Globe,
  smartphone: Smartphone,
  zap: Zap,
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
            A comprehensive toolkit built over years of experience in software development and design.
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
