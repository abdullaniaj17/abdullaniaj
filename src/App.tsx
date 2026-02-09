import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminBlog from "./pages/admin/Blog";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminFAQs from "./pages/admin/FAQs";
import AdminServices from "./pages/admin/Services";
import AdminSkills from "./pages/admin/Skills";
import AdminSubmissions from "./pages/admin/Submissions";
import AdminSettings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="faqs" element={<AdminFAQs />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
