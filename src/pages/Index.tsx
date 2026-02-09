import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import FeaturedProjectsSection from "@/components/portfolio/FeaturedProjectsSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import BlogSection from "@/components/portfolio/BlogSection";
import MediaSection from "@/components/portfolio/MediaSection";
import StatsSection from "@/components/portfolio/StatsSection";
import FAQSection from "@/components/portfolio/FAQSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

interface HeroSettings {
  name?: string;
  tagline?: string;
  bio?: string;
  image_url?: string;
  cta_primary?: string;
  cta_secondary?: string;
}

interface AboutSettings {
  title?: string;
  content?: string;
  image_url?: string;
  highlights?: string[];
}

interface ContactSettings {
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

interface StatsSettings {
  items?: Array<{ label: string; value: string }>;
}

interface SectionsSettings {
  hero?: boolean;
  about?: boolean;
  skills?: boolean;
  featured_projects?: boolean;
  portfolio?: boolean;
  services?: boolean;
  testimonials?: boolean;
  blog?: boolean;
  media?: boolean;
  stats?: boolean;
  faq?: boolean;
  contact?: boolean;
}

interface Project {
  id: string;
  title: string;
  description?: string | null;
  short_description?: string | null;
  image_url?: string | null;
  category?: string | null;
  tags?: string[] | null;
  live_url?: string | null;
  github_url?: string | null;
  is_featured?: boolean | null;
}

interface Skill {
  id: string;
  name: string;
  category?: string | null;
  proficiency: number;
  icon?: string | null;
}

interface Service {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  features?: string[] | null;
}

interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string | null;
  client_company?: string | null;
  client_avatar?: string | null;
  content: string;
  rating?: number | null;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image_url?: string | null;
  author_name?: string | null;
  tags?: string[] | null;
  published_at?: string | null;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
}

const Index = () => {
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({});
  const [aboutSettings, setAboutSettings] = useState<AboutSettings>({});
  const [contactSettings, setContactSettings] = useState<ContactSettings>({});
  const [statsSettings, setStatsSettings] = useState<StatsSettings>({});
  const [sectionsSettings, setSectionsSettings] = useState<SectionsSettings>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all settings
        const { data: settingsData } = await supabase
          .from("site_settings")
          .select("setting_key, setting_value");

        if (settingsData) {
          settingsData.forEach((item) => {
            const value = item.setting_value as Record<string, unknown>;
            switch (item.setting_key) {
              case "hero":
                setHeroSettings(value as HeroSettings);
                break;
              case "about":
                setAboutSettings(value as AboutSettings);
                break;
              case "contact":
                setContactSettings(value as ContactSettings);
                break;
              case "stats":
                setStatsSettings(value as StatsSettings);
                break;
              case "sections":
                setSectionsSettings(value as SectionsSettings);
                break;
            }
          });
        }

        // Fetch projects
        const { data: projectsData } = await supabase
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true });
        if (projectsData) setProjects(projectsData);

        // Fetch skills
        const { data: skillsData } = await supabase
          .from("skills")
          .select("*")
          .order("display_order", { ascending: true });
        if (skillsData) setSkills(skillsData);

        // Fetch services
        const { data: servicesData } = await supabase
          .from("services")
          .select("*")
          .order("display_order", { ascending: true });
        if (servicesData) setServices(servicesData);

        // Fetch testimonials
        const { data: testimonialsData } = await supabase
          .from("testimonials")
          .select("*")
          .order("display_order", { ascending: true });
        if (testimonialsData) setTestimonials(testimonialsData);

        // Fetch blog posts
        const { data: blogData } = await supabase
          .from("blog_posts")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(3);
        if (blogData) setBlogPosts(blogData);

        // Fetch FAQs
        const { data: faqsData } = await supabase
          .from("faqs")
          .select("*")
          .order("display_order", { ascending: true });
        if (faqsData) setFaqs(faqsData);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Section visibility (all true by default)
  const sections: SectionsSettings = {
    hero: sectionsSettings.hero ?? true,
    about: sectionsSettings.about ?? true,
    skills: sectionsSettings.skills ?? true,
    featured_projects: sectionsSettings.featured_projects ?? true,
    portfolio: sectionsSettings.portfolio ?? true,
    services: sectionsSettings.services ?? true,
    testimonials: sectionsSettings.testimonials ?? true,
    blog: sectionsSettings.blog ?? true,
    media: sectionsSettings.media ?? true,
    stats: sectionsSettings.stats ?? true,
    faq: sectionsSettings.faq ?? true,
    contact: sectionsSettings.contact ?? true,
  };

  // Featured projects
  const featuredProjects = projects.filter((p) => p.is_featured);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {sections.hero && <HeroSection data={heroSettings} />}
      {sections.about && <AboutSection data={aboutSettings} />}
      {sections.skills && <SkillsSection skills={skills} />}
      {sections.featured_projects && <FeaturedProjectsSection projects={featuredProjects} />}
      {sections.portfolio && <PortfolioSection projects={projects} />}
      {sections.services && <ServicesSection services={services} />}
      {sections.testimonials && <TestimonialsSection testimonials={testimonials} />}
      {sections.blog && <BlogSection posts={blogPosts} />}
      {sections.media && <MediaSection />}
      {sections.stats && <StatsSection stats={statsSettings.items} />}
      {sections.faq && <FAQSection faqs={faqs} />}
      {sections.contact && <ContactSection data={contactSettings} />}
      
      <Footer socialLinks={contactSettings.social_links} />
    </div>
  );
};

export default Index;
