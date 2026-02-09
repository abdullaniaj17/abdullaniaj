import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Globe, Zap, Shield } from "lucide-react";

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
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            What I Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Services</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Comprehensive solutions tailored to meet your unique business needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon || "code"] || Code;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-card p-8 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  {service.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                  )}
                  
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
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
