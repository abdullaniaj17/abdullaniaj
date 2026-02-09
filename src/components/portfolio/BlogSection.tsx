import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";

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
    excerpt: "Learn the best practices for creating maintainable and scalable React applications.",
    tags: ["React", "Architecture"],
    published_at: "2024-01-15",
  },
  {
    id: "2",
    title: "The Future of AI in Web Development",
    slug: "future-ai-web-development",
    excerpt: "Exploring how artificial intelligence is transforming web development.",
    tags: ["AI", "Innovation"],
    published_at: "2024-01-10",
  },
  {
    id: "3",
    title: "Design Systems: From Zero to Hero",
    slug: "design-systems-guide",
    excerpt: "A comprehensive guide to building and maintaining design systems.",
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
    <section id="blog" className="relative py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-dots-subtle" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground border border-border/50 rounded-full">
            Blog
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Latest</span>{" "}
            <span className="text-accent">Articles</span>
          </h2>
        </motion.div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="h-full rounded-2xl border border-border/30 bg-card/30 hover:border-border/60 transition-all duration-500 overflow-hidden">
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-muted">
                        <span className="text-4xl font-bold text-muted-foreground/20">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Hover arrow */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                      <ArrowUpRight className="w-4 h-4 text-accent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    {post.published_at && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        {formatDate(post.published_at)}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2.5 py-1 text-xs font-medium rounded-md text-accent bg-accent/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline" 
            size="lg"
            asChild
            className="rounded-full border-border/50 hover:border-border px-8"
          >
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
