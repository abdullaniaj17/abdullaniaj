import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Facebook, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface FooterSection {
  section_key: string;
  section_data: Record<string, any>;
  is_visible: boolean;
}

interface FooterProps {
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

const Footer = ({ socialLinks = {} }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [sections, setSections] = useState<FooterSection[]>([]);

  useEffect(() => {
    const fetchFooter = async () => {
      const { data } = await supabase
        .from("footer_content")
        .select("section_key, section_data, is_visible")
        .order("display_order", { ascending: true });
      if (data) setSections(data as FooterSection[]);
    };
    fetchFooter();
  }, []);

  const getSection = (key: string) => sections.find((s) => s.section_key === key);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialIcons: Record<string, any> = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
    facebook: Facebook,
  };

  const copyrightSection = getSection("copyright");
  const ctaSection = getSection("cta_button");
  const linksSection = getSection("footer_links");
  const socialSection = getSection("social_links");

  const hasSocialLinks = Object.values(socialLinks).some((url) => url);
  const showSocial = socialSection ? socialSection.is_visible : true;
  const footerLinks: { title: string; url: string }[] = linksSection?.section_data?.columns || [];

  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="absolute inset-0 grid-bg-subtle opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Footer Links Row */}
        {linksSection?.is_visible && footerLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            {footerLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.url}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          {(copyrightSection?.is_visible ?? true) && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm text-muted-foreground"
            >
              © {currentYear} {copyrightSection?.section_data?.text || "All rights reserved."}
            </motion.p>
          )}

          {/* Social Links */}
          {showSocial && hasSocialLinks && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              {Object.entries(socialLinks).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-card/30 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/60 transition-all duration-300"
                    aria-label={platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </motion.div>
          )}

          {/* Back to Top */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
