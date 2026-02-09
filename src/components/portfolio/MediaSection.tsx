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
    <section id="media" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Watch & Learn
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Media Showcase</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Videos, presentations, and media highlights from my work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                {item.thumbnail_url ? (
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-3xl">🎬</span>
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/80 text-sm mt-1">{item.description}</p>
                  )}
                </div>

                {/* External link icon */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                >
                  <ExternalLink className="h-4 w-4 text-white" />
                </a>
              </div>

              {/* Title below on mobile */}
              <div className="mt-3 md:hidden">
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
