import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";

interface ContactSettings {
  email: string;
  phone: string;
  location: string;
  social_links: {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
}

const ContactPage = () => {
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "contact")
        .maybeSingle();

      if (data) {
        setContact(data.setting_value as unknown as ContactSettings);
      }
      setIsLoading(false);
    };

    fetchContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert([form]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your message has been sent. I'll get back to you soon!",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {contact?.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                      >
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{contact.email}</p>
                        </div>
                      </a>
                    )}
                    {contact?.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                      >
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{contact.phone}</p>
                        </div>
                      </a>
                    )}
                    {contact?.location && (
                      <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{contact.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {contact?.social_links && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                    <div className="flex gap-3">
                      {contact.social_links.github && (
                        <a
                          href={contact.social_links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-muted rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {contact.social_links.linkedin && (
                        <a
                          href={contact.social_links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-muted rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {contact.social_links.twitter && (
                        <a
                          href={contact.social_links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-muted rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {contact.social_links.instagram && (
                        <a
                          href={contact.social_links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-muted rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
