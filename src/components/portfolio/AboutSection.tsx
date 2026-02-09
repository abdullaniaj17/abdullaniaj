import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface AboutSectionProps {
  data?: {
    title?: string;
    content?: string;
    image_url?: string;
    highlights?: string[];
  };
}

const AboutSection = ({ data }: AboutSectionProps) => {
  const title = data?.title || "About Me";
  const content = data?.content || "I am a passionate developer with over 5 years of experience creating web applications and digital solutions. My journey in tech started with a curiosity about how things work, and it has evolved into a career focused on building impactful products that solve real problems.";
  const highlights = data?.highlights || [
    "5+ Years Experience",
    "50+ Projects Completed", 
    "100% Client Satisfaction"
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-dots-subtle" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {data?.image_url ? (
                <img
                  src={data.image_url}
                  alt="About"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-card via-muted to-card flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-accent">JD</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Your photo here</p>
                  </div>
                </div>
              )}
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-2xl border border-border/30" />
            </div>
            
            {/* Floating accent element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/5 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-border/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground border border-border/50 rounded-full">
              About
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
              {title}
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {content}
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/30 hover:border-border/60 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium text-foreground/80">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
