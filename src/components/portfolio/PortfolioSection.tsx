import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Sparkles } from "lucide-react";

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
  
  const categories = ["All", ...new Set(displayProjects.map(p => p.category).filter(Boolean))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? displayProjects 
    : displayProjects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="orb orb-accent w-[500px] h-[500px] -top-20 -right-40 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full glass border border-primary/20 text-primary"
          >
            <Sparkles className="h-4 w-4" />
            My Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my complete collection of projects across various domains.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category as string)}
              className={`rounded-full transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-gradient-to-r from-primary to-accent glow-sm" 
                  : "glass border-border/50 hover:border-primary/50"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative h-full rounded-2xl card-premium hover-lift overflow-hidden">
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 mesh-gradient flex items-center justify-center">
                        <span className="text-4xl">💼</span>
                      </div>
                    )}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4 gap-3">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full glass border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full glass border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {/* Category badge */}
                    {project.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full glass border border-primary/20 text-primary">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1.5 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.short_description && (
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {project.short_description}
                      </p>
                    )}
                    
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground border border-border/50"
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
