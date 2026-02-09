import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

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
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Get to know me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">{title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                {data?.image_url ? (
                  <img 
                    src={data.image_url} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <span className="text-4xl">👨‍💻</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Your photo here</p>
                  </div>
                )}
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {content}
              </p>

              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
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
