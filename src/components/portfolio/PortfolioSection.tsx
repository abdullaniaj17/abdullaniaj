import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

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
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground border border-border/50 rounded-full">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Selected</span>{" "}
            <span className="text-accent">Work</span>
          </h2>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as string)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-card/30 text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-2xl bg-card/30 border border-border/30 overflow-hidden hover:border-border/60 transition-all duration-500"
              >
                {/* Project Image */}
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-muted">
                      <span className="text-4xl font-bold text-muted-foreground/20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full border border-border/50 bg-card/50 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full border border-border/50 bg-card/50 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Category badge */}
                  {project.category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full border border-border/30 bg-card/80 text-muted-foreground backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
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
                          className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted/30 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
