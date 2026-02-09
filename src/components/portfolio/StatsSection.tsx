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
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-90" />
      
      {/* Animated orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl -top-20 -left-20"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl -bottom-40 -right-20"
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px),
                           linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="relative inline-block">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-2xl bg-white/30 rounded-full scale-150" />
                <div className="relative text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} inView={isInView} />
                </div>
              </div>
              <div className="text-white/80 text-sm md:text-base font-medium tracking-wide uppercase">
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
