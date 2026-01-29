
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "MERN Unique Todo App",
      description: "A modern, full-stack To-Do application built with the MERN stack featuring a unique design, real-time updates, and seamless user experience.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60",
      category: "fullstack",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/MERN-UNIQUETODO-APP"
    },
    {
      id: 2,
      title: "React Weather App",
      description: "Real-time weather application with interactive UI, location-based forecasts, and global weather coverage using OpenWeatherMap API.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60",
      category: "frontend",
      technologies: ["React", "JavaScript", "CSS", "OpenWeatherMap API"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/React_Weather_App"
    },
    {
      id: 3,
      title: "Kanban Board",
      description: "Modern Kanban board with drag & drop functionality, multiple themes, and local storage. Built with vanilla JavaScript for seamless task management.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60",
      category: "frontend",
      technologies: ["JavaScript", "HTML5", "CSS3", "Drag & Drop API"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/kanban-board"
    },
    {
      id: 4,
      title: "Lift Simulator 3D",
      description: "Interactive 3D elevator simulator implementing the SCAN disk scheduling algorithm. Features realistic physics, floor animations, and activity logging.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60",
      category: "3d",
      technologies: ["React", "Three.js", "React Three Fiber", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/Lift_Simulator_3D"
    },
    {
      id: 5,
      title: "HR Recruitment Chatbot",
      description: "AI-powered HR Management Chatbot that helps with recruitment, candidate screening, and job application tracking with intelligent responses.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60",
      category: "ai",
      technologies: ["Python", "NLP", "React", "FastAPI"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/HR-Recruitment-Chatbot"
    },
    {
      id: 6,
      title: "Resume Builder & Analyzer Pro",
      description: "AI-powered resume builder with parsing capabilities, ATS compatibility checker, and intelligent suggestions for resume optimization.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60",
      category: "ai",
      technologies: ["Python", "React", "AI/ML", "PDF Generation"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/Resume-Builder-Parser-Analyzer-Pro"
    },
    {
      id: 7,
      title: "AI-Driven Learning Platform",
      description: "Personalized incremental learning platform powered by AI that adapts to user's learning pace and provides customized educational content.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60",
      category: "ai",
      technologies: ["React", "Python", "TensorFlow", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/AI-Driven-Incremental-Learning-Platform"
    },
    {
      id: 8,
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration built with React.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/Ecommerce_platform_reactjs"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Front End' },
    { id: 'ai', name: 'AI / ML' },
    { id: '3d', name: '3D / Graphics' }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen px-4 pt-32 pb-16">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">My Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my latest work, featuring innovative solutions and cutting-edge technologies
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${filter === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'glass-effect hover:bg-white/10 text-muted-foreground hover:text-foreground'
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Projects grid */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-effect rounded-3xl overflow-hidden group cursor-pointer"
                  data-cursor="view"
                >
                  {/* Project image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

                    {/* Overlay buttons */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-background/80 flex items-center justify-center space-x-4"
                    >
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveUrl}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
                      >
                        Live Demo
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        className="px-4 py-2 glass-effect rounded-xl font-medium"
                      >
                        GitHub
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Project content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-6 pt-16"
          >
            <h3 className="text-3xl font-bold">Have a Project in Mind?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm always excited to work on new and challenging projects. Let's discuss how we can bring your ideas to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300"
            >
              Start a Project
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
