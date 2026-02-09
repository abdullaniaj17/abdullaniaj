import { motion } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";

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
      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="orb orb-accent w-[400px] h-[400px] top-20 -right-40 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full glass border border-primary/20 text-primary"
            >
              <Sparkles className="h-4 w-4" />
              Get to know me
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">{title}</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Gradient border effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary opacity-30 blur-xl" />
                <div className="relative aspect-square rounded-3xl overflow-hidden card-premium">
                  {data?.image_url ? (
                    <img 
                      src={data.image_url} 
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center mesh-gradient">
                      <div className="text-center p-8">
                        <div className="w-32 h-32 mx-auto rounded-full glass flex items-center justify-center mb-4">
                          <span className="text-5xl">👨‍💻</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Your photo here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -right-6 glass-strong rounded-2xl px-6 py-4 glow-sm"
              >
                <div className="text-2xl font-bold gradient-text">5+</div>
                <div className="text-sm text-muted-foreground">Years Exp.</div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {content}
              </p>

              {/* Highlights */}
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl glass border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
