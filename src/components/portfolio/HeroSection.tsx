import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";

interface HeroSectionProps {
  data?: {
    name?: string;
    tagline?: string;
    bio?: string;
    image_url?: string;
    cta_primary?: string;
    cta_secondary?: string;
  };
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const name = data?.name || "John Doe";
  const tagline = data?.tagline || "Full-Stack Developer & Designer";
  const bio = data?.bio || "I create beautiful, functional digital experiences";
  const ctaPrimary = data?.cta_primary || "View My Work";
  const ctaSecondary = data?.cta_secondary || "Get In Touch";

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg-subtle" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(11,11,11,0.6)_70%)]" />

      {/* Subtle accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.03] rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 text-xs font-medium uppercase tracking-[0.2em] rounded-full border border-border/50 bg-card/30 text-white backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Available for projects
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="block text-white">Hi, I'm</span>
            <span className="block mt-2 text-accent">{name}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-white mb-4 font-light tracking-wide"
          >
            {tagline}
          </motion.p>

          {/* Bio with orange gradient */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg mb-14 max-w-2xl mx-auto leading-relaxed font-medium text-gradient-orange"
          >
            {bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="text-sm font-medium px-8 py-6 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 glow-accent"
              onClick={() => scrollToSection("portfolio")}
            >
              {ctaPrimary}
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm font-medium px-8 py-6 rounded-full border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 backdrop-blur-sm text-white"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="mr-2 h-4 w-4" />
              {ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-border/50 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-accent/80 rounded-full" 
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
