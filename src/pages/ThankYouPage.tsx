import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4 max-w-lg mx-auto"
        >
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Thank You! Your Request Has Been Received ✅
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            We've received your details. Our team will contact you shortly.
          </p>
          <Button onClick={() => navigate("/")} size="lg">
            Back to Home
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
