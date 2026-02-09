import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
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

  // Auto-advance carousel
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
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Client Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Testimonials</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            What my clients say about working with me.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/10" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 overflow-hidden">
                    {currentTestimonial.client_avatar ? (
                      <img
                        src={currentTestimonial.client_avatar}
                        alt={currentTestimonial.client_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        {currentTestimonial.client_name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {currentTestimonial.rating && (
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < currentTestimonial.rating! ? "text-yellow-500" : "text-muted"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 italic">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Client info */}
                  <div>
                    <p className="font-semibold text-lg">{currentTestimonial.client_name}</p>
                    {(currentTestimonial.client_title || currentTestimonial.client_company) && (
                      <p className="text-sm text-muted-foreground">
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
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex gap-2">
                  {displayTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
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
