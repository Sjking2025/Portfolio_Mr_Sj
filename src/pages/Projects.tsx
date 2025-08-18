
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Unique To-Do App",
      description: "A unique take on the classic to-do app with advanced features and a sleek design",
      image: "https://media.istockphoto.com/id/2214686927/photo/checklist-clipboard-with-chat-icon-to-do-list-goal-achievement-concept-3d-illustration.webp?a=1&b=1&s=612x612&w=0&k=20&c=k268W4TThNJyKWp2FKRe6-nR3KQYPzhpDRS5GeWwOts=",
      category: "fullstack",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#"
    }
    ,
    {
      id: 2,
      title: "Weather App",
      description: "Real-time weather application with interactive UI and global coverage",
      image: "https://images.unsplash.com/photo-1705077296278-d82dd5c8662f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYXRoZXIlMjBhcHB8ZW58MHx8MHx8fDA%3D",
      category: "frontend",
      technologies: ["React", "TypeScript", "OpenWeatherMap API"],
      liveUrl: "#",
      githubUrl: "#"
    },
    
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      image: "https://plus.unsplash.com/premium_photo-1684179639963-e141ce2f8074?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "AI Dashboard",
      description: "Modern dashboard with AI-powered analytics and real-time data",
      image: "https://media.istockphoto.com/id/1979289147/photo/data-analysis-science-and-big-data-with-ai-technology-analyst-or-scientist-uses-a-computer.jpg?s=1024x1024&w=is&k=20&c=WqGfiIeod3kNA5XFFRRa0w5uhoL3c2PfxoWYNXfvl68=",
      category: "frontend",
      technologies: ["React", "TypeScript", "D3.js", "TensorFlow.js"],
      liveUrl: "#",
      githubUrl: "#"
    },
    
    {
      id: 5,
      title: "Smart Home IoT System",
      description: "IoT platform for smart home automation and monitoring",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      category: "iot",
      technologies: ["Python", "React", "AWS IoT", "MQTT"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Social Media Analytics",
      description: "Advanced analytics platform for social media insights",
      image: "https://media.istockphoto.com/id/1465545513/photo/chatbot.jpg?s=2048x2048&w=is&k=20&c=cSb5mc4E9ga6EDTMxwxoC5tYHBihId6Isc8OiK_Vgz8=",
      category: "fullstack",
      technologies: ["Vue.js", "Python", "Django", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Front End' },

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
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  filter === category.id
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
