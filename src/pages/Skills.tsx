
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const skills = [
    {
      category: "Frontend Development",
      icon: "🎨",
      skills: [
        { name: "React.js", level: 95, color: "#61DAFB" },
        { name: "TypeScript", level: 90, color: "#3178C6" },
        { name: "CSS/SCSS", level: 92, color: "#1572B6" },
        { name: "Tailwind CSS", level: 94, color: "#06B6D4" }
      ]
    },
    {
      category: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 92, color: "#339933" },
        { name: "Python", level: 88, color: "#3776AB" },
        { name: "Express.js", level: 90, color: "#000000" },
        { name: "REST APIs", level: 93, color: "#FF6B35" }
      ]
    },
    {
      category: "Database & Cloud",
      icon: "☁️",
      skills: [
        { name: "MongoDB", level: 87, color: "#47A248" },
        { name: "SQL", level: 83, color: "#FF9900" },
        { name: "AWS", level: 88, color: "#2496ED" },
        { name: "Superbase", level: 86, color: "#FFCA28" },
      ]
    },
    {
      category: "Tools & Others",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 95, color: "#F05032" },
        { name: "Canva", level: 82, color: "#8DD6F9" },
        { name: "WordPress", level: 88, color: "#C21325" },
        { name: "Figma", level: 85, color: "#F24E1E" },
        { name: "Linux", level: 87, color: "#FCC624" },
        { name: "CI/CD", level: 83, color: "#326CE5" }
      ]
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
              <span className="gradient-text">My Skills</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </div>

          {/* Skills categories */}
          {skills.map((category, categoryIndex) => (
            <SkillCategory
              key={category.category}
              category={category}
              index={categoryIndex}
            />
          ))}

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-center">Certifications & Awards</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
                { title: "Google Cloud Professional", issuer: "Google Cloud", year: "2023" },
                { title: "React Developer Expert", issuer: "Meta", year: "2022" },
                { title: "Full Stack Web Developer", issuer: "FreeCodeCamp", year: "2021" },
                { title: "JavaScript Algorithms", issuer: "FreeCodeCamp", year: "2021" },
                { title: "Responsive Web Design", issuer: "FreeCodeCamp", year: "2021" }
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect p-6 rounded-2xl space-y-3 hover-lift"
                >
                  <div className="text-2xl">🏆</div>
                  <h4 className="font-semibold">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-primary font-medium">{cert.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const SkillCategory = ({ category, index }: { category: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.2 }}
      className="space-y-8"
    >
      <div className="flex items-center space-x-4">
        <span className="text-4xl">{category.icon}</span>
        <h3 className="text-2xl font-bold">{category.category}</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {category.skills.map((skill: any, skillIndex: number) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            index={skillIndex}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SkillBar = ({ skill, index, isInView }: { skill: any; index: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setCount((prev) => {
            if (prev < skill.level) {
              return prev + 1;
            }
            clearInterval(interval);
            return skill.level;
          });
        }, 20);
      }, index * 100);

      return () => clearTimeout(timer);
    }
  }, [isInView, skill.level, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-3"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-primary font-semibold">{count}%</span>
      </div>
      
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${count}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="h-full rounded-full relative"
          style={{ backgroundColor: skill.color }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;
