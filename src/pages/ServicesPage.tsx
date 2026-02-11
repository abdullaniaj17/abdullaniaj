import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { LucideIcon, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
  price: string | null;
  image_url: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  Code: LucideIcons.Code,
  Palette: LucideIcons.Palette,
  Globe: LucideIcons.Globe,
  Smartphone: LucideIcons.Smartphone,
  Server: LucideIcons.Server,
  Cloud: LucideIcons.Cloud,
  Settings: LucideIcons.Settings,
  Zap: LucideIcons.Zap,
  Target: LucideIcons.Target,
  TrendingUp: LucideIcons.TrendingUp,
  BarChart: LucideIcons.BarChart,
  PenTool: LucideIcons.PenTool,
  Layers: LucideIcons.Layers,
  Monitor: LucideIcons.Monitor,
  Cpu: LucideIcons.Cpu,
  Database: LucideIcons.Database,
};

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });

      if (data) {
        setServices(data);
      }
      setIsLoading(false);
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Services</h1>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
              Professional services tailored to help you achieve your goals.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : LucideIcons.Sparkles;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group">
                      {service.image_url ? (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={service.image_url}
                            alt={service.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-muted/30 flex items-center justify-center">
                          <IconComponent className="w-12 h-12 text-muted-foreground/40" />
                        </div>
                      )}
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {service.features && service.features.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {service.price && (
                          <div className="pt-4 border-t">
                            <span className="text-2xl font-bold text-primary">{service.price}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {services.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No services available yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
