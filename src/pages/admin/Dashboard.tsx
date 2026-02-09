import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  HelpCircle,
  Mail,
  Users,
  TrendingUp,
  Eye,
} from "lucide-react";

interface Stats {
  projects: number;
  blogPosts: number;
  testimonials: number;
  faqs: number;
  submissions: number;
  services: number;
  skills: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    blogPosts: 0,
    testimonials: 0,
    faqs: 0,
    submissions: 0,
    services: 0,
    skills: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts
        const [projects, blogPosts, testimonials, faqs, submissions, services, skills] = await Promise.all([
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }),
          supabase.from("faqs").select("id", { count: "exact", head: true }),
          supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
          supabase.from("services").select("id", { count: "exact", head: true }),
          supabase.from("skills").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          projects: projects.count || 0,
          blogPosts: blogPosts.count || 0,
          testimonials: testimonials.count || 0,
          faqs: faqs.count || 0,
          submissions: submissions.count || 0,
          services: services.count || 0,
          skills: skills.count || 0,
        });

        // Fetch recent submissions
        const { data: submissionsData } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);
        
        if (submissionsData) {
          setRecentSubmissions(submissionsData);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Projects", value: stats.projects, icon: FolderKanban, color: "text-blue-500" },
    { label: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-green-500" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquare, color: "text-purple-500" },
    { label: "FAQs", value: stats.faqs, icon: HelpCircle, color: "text-orange-500" },
    { label: "Contact Submissions", value: stats.submissions, icon: Mail, color: "text-red-500" },
    { label: "Services", value: stats.services, icon: TrendingUp, color: "text-cyan-500" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your portfolio admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Contact Submissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Recent Contact Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentSubmissions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No contact submissions yet
            </p>
          ) : (
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-start justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{submission.name}</p>
                    <p className="text-sm text-muted-foreground">{submission.email}</p>
                    <p className="text-sm line-clamp-2">{submission.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!submission.is_read && (
                      <span className="px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                        New
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Use the sidebar to navigate between different content types</li>
            <li>• Click on any item to edit its content</li>
            <li>• Mark projects as "Featured" to display them prominently</li>
            <li>• Published blog posts will appear on the public site</li>
            <li>• Update Site Settings to change your profile information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
