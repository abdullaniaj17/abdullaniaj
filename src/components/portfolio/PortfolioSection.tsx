import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description?: string;
  short_description?: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  live_url?: string;
  github_url?: string;
}

interface PortfolioSectionProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    short_description: "A full-featured online store with payment processing.",
    category: "Web Development",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    id: "2",
    title: "Mobile Banking App",
    short_description: "Secure mobile banking with biometric auth.",
    category: "Mobile App",
    tags: ["React Native", "TypeScript"],
  },
  {
    id: "3",
    title: "Analytics Dashboard",
    short_description: "Real-time data visualization dashboard.",
    category: "Data Visualization",
    tags: ["D3.js", "PostgreSQL"],
  },
  {
    id: "4",
    title: "Social Media Platform",
    short_description: "Community-focused social networking app.",
    category: "Web Development",
    tags: ["Next.js", "Prisma"],
  },
  {
    id: "5",
    title: "Fitness Tracker",
    short_description: "Health and workout tracking application.",
    category: "Mobile App",
    tags: ["Flutter", "Firebase"],
  },
  {
    id: "6",
    title: "CRM System",
    short_description: "Customer relationship management solution.",
    category: "Enterprise",
    tags: ["Vue.js", "Laravel"],
  },
];

const PortfolioSection = ({ projects = defaultProjects }: PortfolioSectionProps) => {
  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  
  // Get unique categories
  const categories = ["All", ...new Set(displayProjects.map(p => p.category).filter(Boolean))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? displayProjects 
    : displayProjects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Portfolio</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore my complete collection of projects across various domains.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category as string)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl">💼</span>
                      </div>
                    )}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-background rounded-full hover:scale-110 transition-transform"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 bg-background rounded-full hover:scale-110 transition-transform"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {project.category && (
                      <span className="text-xs font-medium text-primary uppercase tracking-wide">
                        {project.category}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold mt-1.5 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.short_description && (
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-2 flex-1">
                        {project.short_description}
                      </p>
                    )}
                    
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
