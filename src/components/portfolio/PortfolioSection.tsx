import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";

const caseStudies = [
  {
    id: "1",
    title: "Multi-Channel Google Ads Campaign — 692 Purchases",
    description:
      "Managed a high-budget Google Ads campaign generating 15.6K clicks at a 4.44% conversion rate, resulting in 692 purchases with a total ad spend of $27.2K. Focused on optimized bidding strategies and audience targeting to maximize ROAS.",
    image: caseStudy1,
  },
  {
    id: "2",
    title: "Lead Generation Campaign — 44 Conversions at $10.69 CPA",
    description:
      "Executed a targeted lead generation campaign delivering 247 clicks and 29 form submissions over a 14-day window. Achieved 44 total conversions at a cost per conversion of $10.69, demonstrating efficient budget allocation for local service leads.",
    image: caseStudy2,
  },
  {
    id: "3",
    title: "High-Volume Search Campaign — 232 Conversions at $5.84 CPA",
    description:
      "Scaled a search-focused campaign to 3.74K clicks with 232 conversions at just $5.84 per conversion over 7 days. Leveraged granular keyword targeting and continuous A/B testing to drive down cost while maintaining conversion volume.",
    image: caseStudy3,
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg-subtle" />
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
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Google Ads</span>{" "}
            <span className="text-accent">Results</span>
          </h2>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-24 max-w-5xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border/30 bg-card/20 overflow-hidden"
            >
              {/* Image */}
              <div className="w-full overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {study.title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                  {study.description}
                </p>

                {/* Privacy note */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground/70 border-t border-border/20 pt-5">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                  <span>Client details have been anonymized to protect privacy.</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
