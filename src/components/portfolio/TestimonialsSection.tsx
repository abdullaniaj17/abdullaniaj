import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string;
  client_company?: string;
  client_avatar?: string;
  content: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    client_name: "Sarah Johnson",
    client_title: "CEO",
    client_company: "TechStart Inc.",
    content: "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded all expectations.",
    rating: 5,
  },
  {
    id: "2",
    client_name: "Michael Chen",
    client_title: "Product Manager",
    client_company: "Innovate Labs",
    content: "Incredibly talented and professional. They transformed our vision into a stunning reality.",
    rating: 5,
  },
  {
    id: "3",
    client_name: "Emily Williams",
    client_title: "Founder",
    client_company: "Creative Solutions",
    content: "The best developer I've ever worked with. They brought creative solutions to complex problems.",
    rating: 5,
  },
];

const TestimonialsSection = ({ testimonials = defaultTestimonials }: TestimonialsSectionProps) => {
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const currentTestimonial = displayTestimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      {/* Grid background */}
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
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Client</span>{" "}
            <span className="text-accent">Reviews</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-border/30 bg-card/30 p-8 md:p-12 overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-8 left-8 h-16 w-16 text-border/50" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-border/30 bg-card/50 flex items-center justify-center overflow-hidden">
                    {currentTestimonial.client_avatar ? (
                      <img
                        src={currentTestimonial.client_avatar}
                        alt={currentTestimonial.client_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-accent">
                        {currentTestimonial.client_name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {currentTestimonial.rating && (
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < currentTestimonial.rating! 
                              ? "text-accent fill-accent" 
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <blockquote className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8 font-light">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Client info */}
                  <div>
                    <p className="font-semibold text-lg text-foreground">{currentTestimonial.client_name}</p>
                    {(currentTestimonial.client_title || currentTestimonial.client_company) && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentTestimonial.client_title}
                        {currentTestimonial.client_title && currentTestimonial.client_company && " at "}
                        {currentTestimonial.client_company}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {displayTestimonials.length > 1 && (
              <div className="flex justify-center items-center gap-6 mt-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  className="rounded-full border-border/50 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <div className="flex gap-2">
                  {displayTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentIndex 
                          ? "w-8 bg-accent" 
                          : "w-2 bg-border/50 hover:bg-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="rounded-full border-border/50 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
