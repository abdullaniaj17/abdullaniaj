import { motion } from "framer-motion";
import { Play, ExternalLink, Sparkles } from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  type: "video" | "image";
  url: string;
  thumbnail_url?: string;
  description?: string;
}

interface MediaSectionProps {
  items?: MediaItem[];
}

const defaultItems: MediaItem[] = [
  {
    id: "1",
    title: "Project Showcase",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "A walkthrough of my latest project",
  },
  {
    id: "2",
    title: "Tech Talk: Modern Web Development",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Speaking at WebConf 2024",
  },
  {
    id: "3",
    title: "Behind the Scenes",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "A day in my development workflow",
  },
];

const MediaSection = ({ items = defaultItems }: MediaSectionProps) => {
  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section id="media" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="orb orb-primary w-[400px] h-[400px] -top-20 -right-40 opacity-20"
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
            Watch & Learn
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Media Showcase</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Videos, presentations, and media highlights from my work.
          </p>
        </motion.div>

        {/* Media grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden card-premium hover-lift">
                {item.thumbnail_url ? (
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 mesh-gradient flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full glass border border-primary/20 flex items-center justify-center">
                      <span className="text-4xl">🎬</span>
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Play button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50" />
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg glow-primary">
                        <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-foreground font-semibold text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                  )}
                </div>

                {/* External link icon */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 p-2.5 glass border border-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Title below on mobile */}
              <div className="mt-4 md:hidden">
                <h3 className="font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
