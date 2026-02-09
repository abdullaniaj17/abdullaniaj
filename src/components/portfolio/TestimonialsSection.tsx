import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star } from "lucide-react";
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
    content: "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded all expectations. The attention to detail and communication throughout the process was exceptional.",
    rating: 5,
  },
  {
    id: "2",
    client_name: "Michael Chen",
    client_title: "Product Manager",
    client_company: "Innovate Labs",
    content: "Incredibly talented and professional. They transformed our vision into a stunning reality. I highly recommend their services to anyone looking for top-quality development work.",
    rating: 5,
  },
  {
    id: "3",
    client_name: "Emily Williams",
    client_title: "Founder",
    client_company: "Creative Solutions",
    content: "The best developer I've ever worked with. They brought creative solutions to complex problems and delivered a product that our users love. Can't wait to work together again!",
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
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="orb orb-primary w-[400px] h-[400px] top-20 -left-40 opacity-20"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="orb orb-accent w-[500px] h-[500px] -bottom-40 -right-40 opacity-20"
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
            Client Feedback
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            What my clients say about working with me.
          </p>
        </motion.div>

        {/* Testimonial card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl card-premium p-8 md:p-12 overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-8 left-8">
              <Quote className="h-16 w-16 text-primary/10" />
            </div>

            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />

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
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-50 blur-lg" />
                    <div className="relative w-24 h-24 rounded-full glass border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                      {currentTestimonial.client_avatar ? (
                        <img
                          src={currentTestimonial.client_avatar}
                          alt={currentTestimonial.client_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl font-bold gradient-text">
                          {currentTestimonial.client_name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  {currentTestimonial.rating && (
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < currentTestimonial.rating! 
                              ? "text-yellow-500 fill-yellow-500" 
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <blockquote className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8 font-light italic">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Client info */}
                  <div>
                    <p className="font-semibold text-lg gradient-text">{currentTestimonial.client_name}</p>
                    {(currentTestimonial.client_title || currentTestimonial.client_company) && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentTestimonial.client_title}
                        {currentTestimonial.client_title && currentTestimonial.client_company && " at "}
                        <span className="text-primary">{currentTestimonial.client_company}</span>
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
                  className="rounded-full glass border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
                          ? "w-8 bg-gradient-to-r from-primary to-accent" 
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="rounded-full glass border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
