
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DemoCarousel from '@/components/DemoCarousel';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "MERN Unique Todo App",
      description: "A modern, full-stack To-Do application built with the MERN stack featuring a unique design, real-time updates, and seamless user experience.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60",
      category: "fullstack",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/MERN-UNIQUETODO-APP",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop', title: 'Dashboard' },
        { id: 2, url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop', title: 'Task List' },
        { id: 3, url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop', title: 'Add Task' },
        { id: 4, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', title: 'Analytics' },
        { id: 5, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', title: 'Settings' },
        { id: 6, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop', title: 'Mobile View' },
      ]
    },
    {
      id: 2,
      title: "React Weather App",
      description: "Real-time weather application with interactive UI, location-based forecasts, and global weather coverage using OpenWeatherMap API.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60",
      category: "frontend",
      technologies: ["React", "JavaScript", "CSS", "OpenWeatherMap API"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/React_Weather_App",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop', title: 'Current Weather' },
        { id: 2, url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop', title: 'Forecast' },
        { id: 3, url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=300&fit=crop', title: 'Hourly View' },
        { id: 4, url: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=400&h=300&fit=crop', title: 'Location Search' },
        { id: 5, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop', title: 'Map View' },
        { id: 6, url: 'https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=400&h=300&fit=crop', title: 'Night Mode' },
      ]
    },
    {
      id: 3,
      title: "Kanban Board",
      description: "Modern Kanban board with drag & drop functionality, multiple themes, and local storage. Built with vanilla JavaScript for seamless task management.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60",
      category: "frontend",
      technologies: ["JavaScript", "HTML5", "CSS3", "Drag & Drop API"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/kanban-board",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop', title: 'Board View' },
        { id: 2, url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop', title: 'Drag & Drop' },
        { id: 3, url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop', title: 'Task Details' },
        { id: 4, url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop', title: 'Themes' },
        { id: 5, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop', title: 'Team View' },
        { id: 6, url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop', title: 'Mobile' },
      ]
    },
    {
      id: 4,
      title: "Lift Simulator 3D",
      description: "Interactive 3D elevator simulator implementing the SCAN disk scheduling algorithm. Features realistic physics, floor animations, and activity logging.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60",
      category: "3d",
      technologies: ["React", "Three.js", "React Three Fiber", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/Lift_Simulator_3D",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', title: '3D View' },
        { id: 2, url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', title: 'Elevator Interior' },
        { id: 3, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop', title: 'Building View' },
        { id: 4, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', title: 'Floor Selection' },
        { id: 5, url: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400&h=300&fit=crop', title: 'Controls' },
        { id: 6, url: 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=400&h=300&fit=crop', title: 'Activity Log' },
      ]
    },
    {
      id: 5,
      title: "HR Recruitment Chatbot",
      description: "AI-powered HR Management Chatbot that helps with recruitment, candidate screening, and job application tracking with intelligent responses.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60",
      category: "ai",
      technologies: ["Python", "NLP", "React", "FastAPI"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/HR-Recruitment-Chatbot",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop', title: 'Chat Interface' },
        { id: 2, url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop', title: 'AI Response' },
        { id: 3, url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop', title: 'Job Matching' },
        { id: 4, url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop', title: 'Resume Upload' },
        { id: 5, url: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop', title: 'Analytics' },
        { id: 6, url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop', title: 'Candidates' },
      ]
    },
    {
      id: 6,
      title: "Resume Builder & Analyzer Pro",
      description: "AI-powered resume builder with parsing capabilities, ATS compatibility checker, and intelligent suggestions for resume optimization.",
      image: "/screenshots/resume-builder/cover.png",
      category: "ai",
      technologies: ["Python", "React", "AI/ML", "PDF Generation"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/Resume-Builder-Parser-Analyzer-Pro",
      screenshots: [
        // Resume Editor Features
        { id: 1, url: '/screenshots/resume-builder/01-homepage.png', title: 'Homepage', description: 'AI-powered resume builder with 18 professional templates, ATS optimization, and privacy-first approach.' },
        { id: 2, url: '/screenshots/resume-builder/03-editor-experience.png', title: 'Experience Editor', description: 'Add work experience with real-time live preview showing your resume updates instantly.' },
        { id: 3, url: '/screenshots/resume-builder/06-editor-skills.png', title: 'Skills & Languages', description: 'Add technical skills, soft skills, and languages with smart tag-based input system.' },
        { id: 4, url: '/screenshots/resume-builder/08-template-sidebar.png', title: 'Template Customization', description: 'Choose from ATS-friendly and Modern templates with adjustable text sizes and layouts.' },
        // Template Showcase
        { id: 5, url: '/screenshots/resume-builder/14-template-classic.png', title: 'Classic Template', description: 'Clean, professional design perfect for traditional industries and corporate roles.' },
        { id: 6, url: '/screenshots/resume-builder/15-template-executive.png', title: 'Executive Template', description: 'Premium executive layout for senior positions and leadership roles.' },
        { id: 7, url: '/screenshots/resume-builder/11-full-resume-preview.png', title: 'Full Resume Preview', description: 'Complete resume with all sections - experience, education, projects, skills, and certifications.' },
        { id: 8, url: '/screenshots/resume-builder/10-pdf-export.png', title: 'PDF Export', description: 'Export to PDF with custom margins and professional formatting for applications.' },
        // Portfolio Generator
        { id: 9, url: '/screenshots/resume-builder/portfolio-gen/01-portfolio-preview.png', title: 'Portfolio Generator', description: 'Generate a professional portfolio website from your resume with multiple themes.' },
        // Skill Gap Analyzer (user-specified order)
        { id: 10, url: '/screenshots/resume-builder/skill-gap/06-job-input.png', title: 'Job Description Input', description: 'Paste a job description to analyze skill gaps. Auto-extracts key skills and matches against your resume (18 skills, 2 experiences).' },
        { id: 11, url: '/screenshots/resume-builder/skill-gap/01-gap-analysis-report.png', title: 'Gap Analysis Report', description: 'Full Stack Developer role shows 63% match score with estimated 8-12 weeks prep time. Shows 14 matched, 7 missing, and 3 needs-work skills.' },
        { id: 12, url: '/screenshots/resume-builder/skill-gap/02-skills-breakdown.png', title: 'Detailed Skills Breakdown', description: 'Complete breakdown: Matched skills (Node.js, JavaScript, MongoDB), Missing skills (React Native, Authentication), and AI-generated recommendations.' },
        { id: 13, url: '/screenshots/resume-builder/skill-gap/04-learning-roadmap.png', title: 'Customize Your Roadmap', description: 'Set learning preferences: Available time (1-6 hrs/day), speed, timeline (14 days to 3 months), style, and video language options.' },
        { id: 14, url: '/screenshots/resume-builder/skill-gap/07-analysis-steps.png', title: 'Generating Roadmap', description: 'AI generates personalized 8-week roadmap with weekly modules: Authentication, React Native, Flutter, Next.js, DevOps, and UX.' },
        { id: 15, url: '/screenshots/resume-builder/skill-gap/generated-roadmap.png', title: 'Your Practice Roadmap', description: 'Week 1: React Native & TypeScript with 6 hrs learning, 9 hrs practice. Includes video courses, docs, projects, and validation questions.' },
      ]
    },
    {
      id: 7,
      title: "AI-Driven Learning Platform",
      description: "Personalized incremental learning platform powered by AI that adapts to user's learning pace and provides customized educational content.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60",
      category: "ai",
      technologies: ["React", "Python", "TensorFlow", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/AI-Driven-Incremental-Learning-Platform",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop', title: 'Dashboard' },
        { id: 2, url: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&h=300&fit=crop', title: 'Courses' },
        { id: 3, url: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop', title: 'Lesson' },
        { id: 4, url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop', title: 'Quiz' },
        { id: 5, url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop', title: 'Progress' },
        { id: 6, url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop', title: 'AI Tutor' },
      ]
    },
    {
      id: 8,
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration built with React.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/Ecommerce_platform_reactjs",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop', title: 'Homepage' },
        { id: 2, url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop', title: 'Products' },
        { id: 3, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', title: 'Product Detail' },
        { id: 4, url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop', title: 'Cart' },
        { id: 5, url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop', title: 'Checkout' },
        { id: 6, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', title: 'Order History' },
      ]
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
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(project.id);
                        }}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
                      >
                        Live Demo
                      </motion.button>
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

      {/* Demo Carousel Modal */}
      <AnimatePresence>
        {activeProject !== null && (
          <DemoCarousel
            screenshots={projects.find(p => p.id === activeProject)?.screenshots || []}
            projectTitle={projects.find(p => p.id === activeProject)?.title || ''}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
