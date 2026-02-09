import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Heart } from "lucide-react";

interface FooterProps {
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

const Footer = ({ socialLinks = {} }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
  };

  const hasSocialLinks = Object.values(socialLinks).some((url) => url);

  return (
    <footer className="relative py-16 overflow-hidden border-t border-border">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Social Links */}
          {hasSocialLinks && (
            <div className="flex gap-3">
              {Object.entries(socialLinks).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl border border-border hover:border-accent/50 hover:text-accent transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          )}

          {/* Divider */}
          <div className="w-24 h-px bg-border" />

          {/* Copyright */}
          <div className="text-center">
            <p className="flex items-center justify-center gap-2 text-muted-foreground">
              © {currentYear} All rights reserved. Made with
              <Heart className="h-4 w-4 text-accent fill-accent" />
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
