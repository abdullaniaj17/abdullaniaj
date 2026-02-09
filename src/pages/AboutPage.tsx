import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { motion } from "framer-motion";

interface AboutSettings {
  title: string;
  content: string;
  image_url: string;
  highlights: string[];
}

const AboutPage = () => {
  const [about, setAbout] = useState<AboutSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "about")
        .maybeSingle();

      if (data) {
        setAbout(data.setting_value as unknown as AboutSettings);
      }
      setIsLoading(false);
    };

    fetchAbout();
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
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              {about?.title || "About Me"}
            </h1>
            
            {about?.image_url && (
              <img
                src={about.image_url}
                alt="About"
                className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
              />
            )}

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                {about?.content}
              </p>
            </div>

            {about?.highlights && about.highlights.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {about.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-muted rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-medium">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
