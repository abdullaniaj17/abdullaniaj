import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
}

const defaultFAQs: FAQ[] = [
  {
    id: "1",
    question: "What services do you offer?",
    answer: "I offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, and technical consulting. Each project is tailored to meet your specific needs and business goals.",
  },
  {
    id: "2",
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. I'll provide a detailed timeline estimate after understanding your requirements.",
  },
  {
    id: "3",
    question: "How do you handle project communication?",
    answer: "I believe in transparent and regular communication. We'll have scheduled check-ins (weekly or bi-weekly), and I'm always available via email or Slack for quick questions. You'll have access to project management tools to track progress.",
  },
  {
    id: "4",
    question: "What technologies do you specialize in?",
    answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases. I stay current with industry trends and choose the best technology stack for each project's specific needs.",
  },
  {
    id: "5",
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes! I offer various maintenance and support packages to ensure your project continues to run smoothly after launch. This includes bug fixes, security updates, performance optimization, and feature enhancements.",
  },
  {
    id: "6",
    question: "What is your pricing structure?",
    answer: "I offer both project-based and hourly pricing depending on the nature of the work. For fixed projects, I provide detailed quotes after scoping. For ongoing work or consulting, I offer competitive hourly rates. Contact me for a personalized quote.",
  },
];

const FAQSection = ({ faqs = defaultFAQs }: FAQSectionProps) => {
  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="orb orb-accent w-[400px] h-[400px] top-20 -right-40 opacity-20"
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
            Have Questions?
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about my services and process.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {displayFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={faq.id}
                  className="rounded-2xl card-premium px-6 border-none data-[state=open]:glow-sm transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 group">
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg glass border border-primary/20 flex items-center justify-center text-sm font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-lg pr-4">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 pl-12">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
