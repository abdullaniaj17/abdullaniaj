import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Globe, Zap, Shield } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  features?: string[];
  image_url?: string | null;
}

interface ServicesSectionProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description: "Custom web applications built with modern technologies for optimal performance.",
    icon: "code",
    features: ["React & Next.js", "Responsive Design", "API Integration"],
  },
  {
    id: "2",
    title: "UI/UX Design",
    description: "User-centered design solutions that combine aesthetics with functionality.",
    icon: "palette",
    features: ["Wireframing", "Prototyping", "User Research"],
  },
  {
    id: "3",
    title: "Mobile Development",
    description: "Cross-platform mobile applications that deliver native-like experiences.",
    icon: "smartphone",
    features: ["React Native", "Flutter", "App Store Deployment"],
  },
  {
    id: "4",
    title: "SEO Optimization",
    description: "Improve your online visibility with data-driven SEO strategies.",
    icon: "globe",
    features: ["Technical SEO", "Content Strategy", "Analytics"],
  },
  {
    id: "5",
    title: "Performance Optimization",
    description: "Speed up your applications with advanced optimization techniques.",
    icon: "zap",
    features: ["Core Web Vitals", "Caching", "Code Splitting"],
  },
  {
    id: "6",
    title: "Security Consulting",
    description: "Protect your applications with comprehensive security audits.",
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
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-dots-subtle" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground border border-border/50 rounded-full">
            What I Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Services</span>{" "}
            <span className="text-accent">Offered</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
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
                className="group relative rounded-2xl bg-card/30 border border-border/30 hover:border-border/60 transition-all duration-500 overflow-hidden"
              >
                {/* Image */}
                {service.image_url ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="p-8">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <IconComponent className="w-7 h-7 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
