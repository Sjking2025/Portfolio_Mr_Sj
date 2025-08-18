
import React from 'react';
import { motion } from 'framer-motion';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt: "Learn how to structure and build maintainable React applications using TypeScript and modern development practices.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 2,
      title: "The Future of Web Development: AI and Machine Learning",
      excerpt: "Exploring how artificial intelligence is revolutionizing web development and what developers need to know.",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 3,
      title: "Optimizing Performance in Modern Web Applications",
      excerpt: "Best practices and techniques for building lightning-fast web applications that provide excellent user experience.",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    },
    {
      id: 4,
      title: "Understanding Microservices Architecture",
      excerpt: "A comprehensive guide to designing and implementing microservices for scalable backend systems.",
      date: "2023-12-28",
      readTime: "15 min read",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    }
  ];

  return (
    <div className="min-h-screen px-4 pt-32 pb-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">Featured Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on modern web development and technology trends
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-effect rounded-3xl overflow-hidden group cursor-pointer"
              >
                {/* Article image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 text-primary font-medium pt-2"
                  >
                    <span >Read More</span>
                    <span>→</span>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter signup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-effect p-8 rounded-3xl text-center space-y-6"
          >
            <h3 className="text-2xl font-bold">Stay Updated</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Subscribe to my newsletter to get the latest articles and updates on web development trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Articles;
