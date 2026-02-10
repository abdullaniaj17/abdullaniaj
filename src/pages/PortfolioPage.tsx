import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, ImageIcon } from "lucide-react";

interface MetricItem {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  display_order: number | null;
  is_visible: boolean | null;
  metrics: MetricItem[] | null;
}

const PortfolioPage = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      const { data } = await supabase
        .from("case_studies")
        .select("*")
        .order("display_order", { ascending: true });

      if (data) {
        setCaseStudies(data.map(s => ({
          ...s,
          metrics: Array.isArray(s.metrics) ? (s.metrics as unknown as MetricItem[]) : [],
        })));
      }
      setIsLoading(false);
    };

    fetchCaseStudies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground border border-border/50 rounded-full">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-foreground">Google Ads</span>{" "}
              <span className="text-accent">Results</span>
            </h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Real campaign performance data showcasing measurable results across Google Ads.
            </p>
          </motion.div>

          {/* Case Studies */}
          <div className="space-y-24 max-w-5xl mx-auto">
            {caseStudies.map((study) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border/30 bg-card/20 overflow-hidden"
              >
                {/* Featured Image */}
                {study.image_url ? (
                  <div className="w-full overflow-hidden bg-muted">
                    <img
                      src={study.image_url}
                      alt={study.title}
                      className="w-full h-auto max-h-[500px] object-contain"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-muted/50 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}

                {/* Content */}
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {study.title}
                  </h2>
                  {study.description && (
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line">
                      {study.description}
                    </p>
                  )}

                  {/* Metrics Grid */}
                  {study.metrics && study.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                      {study.metrics.map((metric, i) => (
                        <div key={i} className="rounded-xl bg-muted/50 border border-border/30 p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <TrendingUp className="w-3.5 h-3.5 text-accent" />
                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              {metric.label}
                            </span>
                          </div>
                          <p className="text-xl md:text-2xl font-bold text-foreground">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Privacy note */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground/70 border-t border-border/20 pt-5">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>Client details have been anonymized to protect privacy.</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {caseStudies.length === 0 && (
              <div className="text-center py-16">
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No case studies available yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
