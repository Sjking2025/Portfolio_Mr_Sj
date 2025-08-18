
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const achievements = [
    {
      title: "Full-Stack Mastery",
      description: "Expert in React, Node.js, Python, and modern web technologies",
      icon: "🚀"
    },
    
    {
      title: "Team Leadership",
      description: "Led development teams of 5+ developers on complex projects",
      icon: "👥"
    },
    
  ];

  return (
    <div className="min-h-screen px-4 pt-32 pb-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">About Me</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate developer with a mission to create digital experiences that inspire and innovate
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Image and personal info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-80 h-80 mx-auto lg:mx-0 rounded-3xl overflow-hidden glass-effect"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"></div>
                  <img
                    src="/src/pages/AboutMe.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl"
                >
                  ⚡
                </motion.div>
              </div>

              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-3xl font-bold">SANJAY R</h2>
                <p className="text-primary font-semibold">Full-Stack Developer</p>
              
              </div>
            </motion.div>

            {/* Right side - Story */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">My Journey</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    My journey into tech began with a simple curiosity about how websites work.
                    What started as tinkering with HTML and CSS evolved into a deep passion for
                    creating sophisticated web applications that solve real-world problems.
                  </p>
                  
                  <p>
                    Today, I specialize in building scalable web applications using React, Node.js,
                    and modern cloud technologies. I believe in writing clean, maintainable code
                    and creating intuitive user experiences that delight users.
                  </p>
                  
                  <p>
                    sharing knowledge through technical writing and
                    mentoring junior developers.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 glass-effect rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div variants={itemVariants} className="space-y-12">
            <h3 className="text-3xl font-bold text-center">Key Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass-effect p-6 rounded-2xl text-center space-y-4 hover-lift"
                >
                  <div className="text-4xl">{achievement.icon}</div>
                  <h4 className="text-lg font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h3 className="text-2xl font-bold">Let's Build Something Amazing Together</h3>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
