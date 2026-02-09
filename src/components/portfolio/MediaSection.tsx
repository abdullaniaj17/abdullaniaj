import { motion } from "framer-motion";
import media1 from "@/assets/media-1.jpg";
import media2 from "@/assets/media-2.jpg";
import media3 from "@/assets/media-3.jpg";
import media4 from "@/assets/media-4.png";
import media5 from "@/assets/media-5.png";
import media6 from "@/assets/media-6.jpg";
import media7 from "@/assets/media-7.jpg";
import media8 from "@/assets/media-8.png";
import media9 from "@/assets/media-9.jpg";
import media10 from "@/assets/media-10.jpg";

const mediaItems = [
  { id: "1", title: "Google Ads Campaign Performance", image: media1, description: "15.6K clicks with 4.44% conversion rate" },
  { id: "2", title: "Lead Generation Results", image: media2, description: "247 clicks, 44 conversions at $10.69 cost/conv" },
  { id: "3", title: "PPC Campaign Analytics", image: media3, description: "3.74K clicks, 232 conversions at $5.84 cost/conv" },
  { id: "4", title: "Google PPC Campaign Specialist", image: media4, description: "Professional Google Ads management" },
  { id: "5", title: "Google Ads for Local Business", image: media5, description: "Setup & manage with keyword research" },
  { id: "6", title: "CRO Certification", image: media6, description: "Mastering Conversion Rate Optimization (CRO)" },
  { id: "7", title: "Google Ads Strategy Certification", image: media7, description: "Google Ads Management & Strategy Proposal" },
  { id: "8", title: "Google Ads for Plumbing Service", image: media8, description: "10.2K impressions, 8.5K conv value, $9.8K cost" },
  { id: "9", title: "Plumbing Campaign Metrics", image: media9, description: "12.8K clicks, 398 calls at $2.07 avg CPC" },
  { id: "10", title: "Campaign Overview Analytics", image: media10, description: "13.6K clicks, 1.96K conversions at $2.25 CPC" },
];

const MediaSection = () => {
  return (
    <section id="media" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg-subtle" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground border border-border/50 rounded-full">
            Media
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Media</span>{" "}
            <span className="text-accent">Showcase</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/30 bg-card/30 hover:border-border/60 transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-foreground font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              </div>
              <div className="mt-4 md:hidden">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
