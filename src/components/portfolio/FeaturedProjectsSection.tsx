import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  short_description?: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  live_url?: string;
  github_url?: string;
}

interface FeaturedProjectsSectionProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    short_description: "A full-featured online store with payment processing and inventory management.",
    category: "Web Development",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    id: "2",
    title: "Mobile Banking App",
    short_description: "Secure mobile banking solution with biometric authentication and real-time transactions.",
    category: "Mobile App",
    tags: ["React Native", "TypeScript"],
  },
  {
    id: "3",
    title: "Analytics Dashboard",
    short_description: "Real-time data visualization dashboard for business intelligence and reporting.",
    category: "Data Visualization",
    tags: ["D3.js", "PostgreSQL"],
  },
];

const FeaturedProjectsSection = ({ projects = defaultProjects }: FeaturedProjectsSectionProps) => {
  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : defaultProjects;

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="featured-projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Selected Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Projects</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills in design and development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">🚀</span>
                    </div>
                  )}
                  
                  {/* Overlay with links */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-background rounded-full hover:scale-110 transition-transform"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-background rounded-full hover:scale-110 transition-transform"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {project.category && (
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">
                      {project.category}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mt-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.short_description && (
                    <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
                      {project.short_description}
                    </p>
                  )}
                  
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
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
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" onClick={scrollToPortfolio}>
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
