import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Sparkles } from "lucide-react";

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
    <section id="featured-projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="orb orb-primary w-[500px] h-[500px] top-1/4 -left-40 opacity-20"
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
            Selected Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills in design and development.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative h-full rounded-3xl card-premium hover-lift overflow-hidden">
                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 mesh-gradient flex items-center justify-center">
                      <span className="text-5xl">🚀</span>
                    </div>
                  )}
                  
                  {/* Overlay with links */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6 gap-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>

                  {/* Category badge */}
                  {project.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full glass border border-primary/20 text-primary">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.short_description && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {project.short_description}
                    </p>
                  )}
                  
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-1 text-xs rounded-lg bg-muted/50 text-muted-foreground border border-border/50"
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

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline" 
            size="lg" 
            onClick={scrollToPortfolio}
            className="rounded-full glass border-primary/30 hover:bg-primary hover:text-primary-foreground px-8"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
