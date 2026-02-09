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
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          {hasSocialLinks && (
            <div className="flex gap-4">
              {Object.entries(socialLinks).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              © {currentYear} All rights reserved. Made with{" "}
              <Heart className="h-3.5 w-3.5 text-destructive fill-destructive" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
