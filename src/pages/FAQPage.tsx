import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import FAQSection from "@/components/portfolio/FAQSection";

const FAQPage = () => {
  const [faqs, setFaqs] = useState<{ id: string; question: string; answer: string; category?: string }[]>([]);

  useEffect(() => {
    document.title = "FAQ – Frequently Asked Questions";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Find answers to commonly asked questions about our services, process, and pricing.");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Find answers to commonly asked questions about our services, process, and pricing.";
      document.head.appendChild(newMeta);
    }

    const fetchFaqs = async () => {
      const { data } = await supabase
        .from("faqs")
        .select("id, question, answer, category")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });
      if (data) setFaqs(data);
    };
    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <FAQSection faqs={faqs} />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
