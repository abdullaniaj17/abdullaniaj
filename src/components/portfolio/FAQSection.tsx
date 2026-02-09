import { motion } from "framer-motion";
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
    answer: "I offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, and technical consulting.",
  },
  {
    id: "2",
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months.",
  },
  {
    id: "3",
    question: "How do you handle project communication?",
    answer: "I believe in transparent and regular communication with scheduled check-ins and availability via email or Slack.",
  },
  {
    id: "4",
    question: "What technologies do you specialize in?",
    answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases.",
  },
  {
    id: "5",
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes! I offer various maintenance and support packages including bug fixes, security updates, and feature enhancements.",
  },
  {
    id: "6",
    question: "What is your pricing structure?",
    answer: "I offer both project-based and hourly pricing. Contact me for a personalized quote based on your specific needs.",
  },
];

const FAQSection = ({ faqs = defaultFAQs }: FAQSectionProps) => {
  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground border border-border rounded-full">
            Have Questions?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-accent">Frequently Asked Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about my services.
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
                  className="rounded-2xl border border-border bg-card/50 px-6 data-[state=open]:border-accent/30 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 group">
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg border border-border flex items-center justify-center text-sm font-semibold text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors">
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
