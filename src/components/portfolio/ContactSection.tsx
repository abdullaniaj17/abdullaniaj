import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactData {
  email?: string;
  phone?: string;
  location?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

interface ContactSectionProps {
  data?: ContactData;
}

const ContactSection = ({ data }: ContactSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = {
    email: data?.email || "hello@example.com",
    phone: data?.phone || "+1 234 567 890",
    location: data?.location || "New York, USA",
    social_links: data?.social_links || {},
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name,
        email: values.email,
        subject: values.subject || null,
        message: values.message,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
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
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-accent">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                <p className="text-muted-foreground">
                  Feel free to reach out. I typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/50 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl border border-border text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-lg">{contactInfo.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/50 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl border border-border text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-lg">{contactInfo.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/50">
                  <div className="p-3 rounded-xl border border-border text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-lg">{contactInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {Object.keys(contactInfo.social_links).some(
                (key) => contactInfo.social_links[key as keyof typeof contactInfo.social_links]
              ) && (
                <div>
                  <h4 className="font-medium mb-4 text-lg">Follow Me</h4>
                  <div className="flex gap-3">
                    {Object.entries(contactInfo.social_links).map(([platform, url]) => {
                      if (!url) return null;
                      const Icon = socialIcons[platform as keyof typeof socialIcons];
                      if (!Icon) return null;
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl border border-border bg-card/50 p-8">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="rounded-xl border-border bg-background h-12 focus:border-accent"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              type="email" 
                              className="rounded-xl border-border bg-background h-12 focus:border-accent"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Subject (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What's this about?" 
                            className="rounded-xl border-border bg-background h-12 focus:border-accent"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            className="min-h-[140px] resize-none rounded-xl border-border bg-background focus:border-accent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-full h-14 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 text-lg font-medium" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
