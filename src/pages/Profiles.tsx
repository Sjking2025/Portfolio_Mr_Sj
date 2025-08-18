
import React from 'react';
import { motion } from 'framer-motion';

const Profiles = () => {
  const profiles = [
    {
      name: "GitHub",
      description: "Check out my open source contributions and personal projects",
      stats: "150+ repositories • 500+ contributions",
      icon: "💻",
      url: "https://github.com",
      color: "#181717",
      bgGradient: "from-gray-900 to-gray-700"
    },
    {
      name: "LeetCode",
      description: "Algorithmic problem solving and competitive programming",
      stats: "300+ problems solved • Top 15%",
      icon: "🧠",
      url: "https://leetcode.com",
      color: "#FFA116",
      bgGradient: "from-orange-600 to-yellow-500"
    },
    {
      name: "LinkedIn",
      description: "Professional network and career achievements",
      stats: "1000+ connections • Tech Industry",
      icon: "💼",
      url: "https://linkedin.com",
      color: "#0077B5",
      bgGradient: "from-blue-600 to-blue-800"
    },

    {
      name: "CodePen",
      description: "Creative coding experiments and frontend demos",
      stats: "50+ pens • 1k+ hearts",
      icon: "🎨",
      url: "https://codepen.io",
      color: "#47CF73",
      bgGradient: "from-green-500 to-teal-500"
    },
  
    {
      name: "Dev.to",
      description: "Technical articles and programming tutorials",
      stats: "25+ articles • 10k+ views",
      icon: "✍️",
      url: "https://dev.to",
      color: "#0A0A0A",
      bgGradient: "from-gray-800 to-black"
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
              <span className="gradient-text">Coding Profiles</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with me across various platforms where I share code, insights, and collaborate with the developer community
            </p>
          </div>

          {/* Profiles grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, index) => (
              <motion.a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: `0 20px 40px ${profile.color}30`
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-3xl p-6 glass-effect hover:bg-white/5 transition-all duration-300"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${profile.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                
                {/* Content */}
                <div className="relative space-y-4">
                  {/* Icon and name */}
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl"
                    >
                      {profile.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {profile.name}
                      </h3>
                      <div className="w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="pt-2">
                    <p className="text-sm font-medium" style={{ color: profile.color }}>
                      {profile.stats}
                    </p>
                  </div>
                  
                  {/* Hover arrow */}
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="flex items-center space-x-2 text-primary font-medium pt-2"
                  >
                    <span>Visit Profile</span>
                    <span>→</span>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -top-2 -right-2 w-16 h-16 rounded-full opacity-20"
                  style={{ backgroundColor: profile.color }}
                ></motion.div>
              </motion.a>
            ))}
          </div>

          {/* Stats overview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-effect p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Overall Stats</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { label: "Total Repositories", value: "10+", icon: "📁" },
                { label: "Problems Solved", value: "100+", icon: "🧩" },
                { label: "Contributions", value: "50+", icon: "📊" },
                { label: "Community Reach", value: "2k+", icon: "🌍" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center space-y-2"
                >
                  <div className="text-3xl">{stat.icon}</div>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profiles;
