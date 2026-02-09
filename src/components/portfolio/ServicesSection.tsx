import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Globe, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  features?: string[];
}

interface ServicesSectionProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description: "Custom web applications built with modern technologies for optimal performance and user experience.",
    icon: "code",
    features: ["React & Next.js", "Responsive Design", "API Integration"],
  },
  {
    id: "2",
    title: "UI/UX Design",
    description: "User-centered design solutions that combine aesthetics with functionality for engaging experiences.",
    icon: "palette",
    features: ["Wireframing", "Prototyping", "User Research"],
  },
  {
    id: "3",
    title: "Mobile Development",
    description: "Cross-platform mobile applications that deliver native-like experiences on iOS and Android.",
    icon: "smartphone",
    features: ["React Native", "Flutter", "App Store Deployment"],
  },
  {
    id: "4",
    title: "SEO Optimization",
    description: "Improve your online visibility with data-driven SEO strategies and technical optimizations.",
    icon: "globe",
    features: ["Technical SEO", "Content Strategy", "Analytics"],
  },
  {
    id: "5",
    title: "Performance Optimization",
    description: "Speed up your applications with advanced optimization techniques and best practices.",
    icon: "zap",
    features: ["Core Web Vitals", "Caching", "Code Splitting"],
  },
  {
    id: "6",
    title: "Security Consulting",
    description: "Protect your applications with comprehensive security audits and implementation.",
    icon: "shield",
    features: ["Security Audits", "Penetration Testing", "Best Practices"],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  palette: Palette,
  smartphone: Smartphone,
  globe: Globe,
  zap: Zap,
  shield: Shield,
};

const ServicesSection = ({ services = defaultServices }: ServicesSectionProps) => {
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="orb orb-accent w-[600px] h-[600px] -top-40 -right-40 opacity-20"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 40, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="orb orb-primary w-[400px] h-[400px] bottom-0 left-1/4 opacity-15"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full glass border border-primary/20 text-primary"
          >
            <Sparkles className="h-4 w-4" />
            What I Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to meet your unique business needs.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon || "code"] || Code;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-2xl card-premium hover-lift">
                  {/* Number indicator */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-muted/20 group-hover:text-primary/10 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl glass border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-300 glow-sm">
                      <IconComponent className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    {service.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                    )}
                    
                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Learn more link */}
                    <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
