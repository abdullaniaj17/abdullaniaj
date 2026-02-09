import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description?: string | null;
  short_description?: string | null;
  image_url?: string | null;
  category?: string | null;
  tags?: string[] | null;
  live_url?: string | null;
  github_url?: string | null;
}

interface FeaturedProjectsSectionProps {
  projects?: Project[];
}

const FeaturedProjectsSection = ({ projects = [] }: FeaturedProjectsSectionProps) => {
  if (projects.length === 0) return null;
  
  const displayProjects = projects.slice(0, 3);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="featured-projects" className="relative py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-dots-subtle" />
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
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Highlighted</span>{" "}
            <span className="text-accent">Projects</span>
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 max-w-6xl mx-auto">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border/30 group">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-muted">
                      <span className="text-6xl font-bold text-muted-foreground/20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border border-border/20" />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span className="inline-block text-sm font-medium uppercase tracking-wider text-accent mb-4">
                  {project.category}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {project.description || project.short_description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted/30 rounded-lg border border-border/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.live_url && (
                    <Button
                      asChild
                      className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full"
                    >
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        View Project
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button
                      variant="outline"
                      asChild
                      className="rounded-full border-border/50 hover:border-border"
                    >
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Source
                      </a>
                    </Button>
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
          className="text-center mt-16"
        >
          <Button 
            variant="outline" 
            size="lg" 
            onClick={scrollToPortfolio}
            className="rounded-full border-border/50 hover:border-border px-8"
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
