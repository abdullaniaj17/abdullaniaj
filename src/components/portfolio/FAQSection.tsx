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
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Have Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Find answers to common questions about my services and process.
          </p>
        </motion.div>

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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={faq.id}
                  className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-medium pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
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
