import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

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
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
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
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground border border-border rounded-full">
            Watch & Learn
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-accent">Media Showcase</span>
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
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-card/50 hover:border-accent/30 transition-all duration-500 hover-lift">
                {item.thumbnail_url ? (
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 grid-bg flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-border bg-card flex items-center justify-center">
                      <span className="text-4xl">🎬</span>
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Play button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-accent flex items-center justify-center"
                    >
                      <Play className="h-6 w-6 text-accent-foreground ml-1" fill="currentColor" />
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

                {/* External link */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 p-2.5 rounded-xl border border-border bg-card opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent"
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
