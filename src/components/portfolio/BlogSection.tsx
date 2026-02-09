import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image_url?: string;
  author_name?: string;
  tags?: string[];
  published_at?: string;
}

interface BlogSectionProps {
  posts?: BlogPost[];
}

const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Web Applications with React",
    slug: "building-scalable-web-apps",
    excerpt: "Learn the best practices for creating maintainable and scalable React applications that grow with your business.",
    tags: ["React", "Architecture"],
    published_at: "2024-01-15",
  },
  {
    id: "2",
    title: "The Future of AI in Web Development",
    slug: "future-ai-web-development",
    excerpt: "Exploring how artificial intelligence is transforming the way we build and interact with web applications.",
    tags: ["AI", "Innovation"],
    published_at: "2024-01-10",
  },
  {
    id: "3",
    title: "Design Systems: From Zero to Hero",
    slug: "design-systems-guide",
    excerpt: "A comprehensive guide to building and maintaining design systems that accelerate your development workflow.",
    tags: ["Design", "UI/UX"],
    published_at: "2024-01-05",
  },
];

const BlogSection = ({ posts = defaultPosts }: BlogSectionProps) => {
  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : defaultPosts;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="blog" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Latest Articles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Blog & Insights</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my experience in the industry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {post.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.published_at)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      5 min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
