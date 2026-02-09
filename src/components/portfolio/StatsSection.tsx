import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  label: string;
  value: string;
}

interface StatsSectionProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Awards Won", value: "10+" },
];

const AnimatedCounter = ({ value, inView }: { value: string; inView: boolean }) => {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    if (!inView) return;
    
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");
    
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(numericValue * easedProgress);
      setDisplayValue(currentValue + suffix);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <span>{displayValue}</span>;
};

const StatsSection = ({ stats }: StatsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const displayStats = stats || defaultStats;

  return (
    <section id="stats" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Accent background */}
      <div className="absolute inset-0 bg-accent" />
      <div className="absolute inset-0 grid-bg-large opacity-10" />
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-transparent to-accent opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent-foreground mb-2 tracking-tight">
                <AnimatedCounter value={stat.value} inView={isInView} />
              </div>
              <div className="text-accent-foreground/70 text-xs sm:text-sm font-medium uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
