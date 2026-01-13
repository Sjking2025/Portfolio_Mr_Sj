
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Settings, Cloud, Wrench, Award } from 'lucide-react';

// TypeScript interfaces
interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategoryData {
  category: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const Skills = () => {
  const skills = [
    {
      category: "Frontend Development",
      icon: <Palette className="w-8 h-8 text-cyber-blue" />,
      skills: [
        { name: "React.js", level: 95, color: "#61DAFB" },
        { name: "TypeScript", level: 90, color: "#3178C6" },
        { name: "CSS/SCSS", level: 92, color: "#1572B6" },
        { name: "Tailwind CSS", level: 94, color: "#06B6D4" }
      ]
    },
    {
      category: "Backend Development",
      icon: <Settings className="w-8 h-8 text-neon-green" />,
      skills: [
        { name: "Node.js", level: 92, color: "#339933" },
        { name: "Python", level: 88, color: "#3776AB" },
        { name: "Express.js", level: 90, color: "#000000" },
        { name: "REST APIs", level: 93, color: "#FF6B35" }
      ]
    },
    {
      category: "Database & Cloud",
      icon: <Cloud className="w-8 h-8 text-cyber-purple" />,
      skills: [
        { name: "MongoDB", level: 87, color: "#47A248" },
        { name: "SQL", level: 83, color: "#FF9900" },
        { name: "AWS", level: 88, color: "#2496ED" },
        { name: "Superbase", level: 86, color: "#FFCA28" },
      ]
    },
    {
      category: "Tools & Others",
      icon: <Wrench className="w-8 h-8 text-electric-pink" />,
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
          <CertificationsSection />
        </motion.div>
      </div>
    </div>
  );
};

// Certificate interface
interface Certificate {
  title: string;
  issuer: string;
  year: string;
  file: string;
  thumbnail: string;
}

// Certifications Section Component with hover effects
const CertificationsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const certificates: Certificate[] = [
    { title: "Google Cloud Data Analytics", issuer: "Naan Mudhalvan", year: "2024", file: "/certificates/Google_Cloud_Data_Analytics_NM_SANJAY R.pdf", thumbnail: "/certificates/Google_Cloud_Data_Analytics_NM_SANJAY R_page-0001.jpg" },
    { title: "Google Cloud Engineering", issuer: "Naan Mudhalvan", year: "2024", file: "/certificates/Google_Cloud_Engineering_NM_SANJAY R.pdf", thumbnail: "/certificates/Google_Cloud_Engineering_NM_SANJAY R_page-0001.jpg" },
    { title: "Salesforce Developer", issuer: "SmartBridge / Naan Mudhalvan", year: "2024", file: "/certificates/Salesforce_Developer_SmartBridge_NM_SANJAY R.pdf", thumbnail: "/certificates/Salesforce_Developer_SmartBridge_NM_SANJAY R_page-0001.jpg" },
    { title: "Java Development", issuer: "Besant Technologies", year: "2024", file: "/certificates/SANJAY_R_Java_Besant_Technologies.png", thumbnail: "/certificates/SANJAY_R_Java_Besant_Technologies.png" },
    { title: "Experience Based Project Learning", issuer: "Naan Mudhalvan", year: "2024", file: "/certificates/Experience Based Project Learning_NM_SANJAY R.pdf", thumbnail: "/certificates/Experience Based Project Learning_NM_SANJAY R_page-0001.jpg" },
    { title: "Microsoft Office Essentials", issuer: "Naan Mudhalvan", year: "2024", file: "/certificates/Microsoft Office Essentials_NM_SANJAY R.pdf", thumbnail: "/certificates/Microsoft Office Essentials_NM_SANJAY R_page-0001.jpg" },
    { title: "Young Turks 2025 - Round 1", issuer: "Naukri Campus", year: "2025", file: "/certificates/young_turks25_round_1_achievement.pdf", thumbnail: "/certificates/young_turks25_round_1_achievement_page-0001.jpg" },
    { title: "CodeQuest Participation", issuer: "Naukri Campus", year: "2024", file: "/certificates/NaukriCampus_CodeQuest_Certificate_Participation.pdf", thumbnail: "/certificates/NaukriCampus_CodeQuest_Certificate_Participation_page-0001.jpg" },
    { title: "BrandQuest Participation", issuer: "Naukri Campus", year: "2024", file: "/certificates/NaukriCampus_BrandQuest_Certificate_Participation.pdf", thumbnail: "/certificates/NaukriCampus_BrandQuest_Certificate_Participation_page-0001.jpg" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="space-y-8"
    >
      <h3 className="text-3xl font-bold text-center">Certifications & Awards</h3>
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {certificates.map((cert, index) => (
          <motion.a
            key={cert.title}
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: hoveredIndex === null ? 1 : hoveredIndex === index ? 1 : 0.4,
              scale: hoveredIndex === null ? 1 : hoveredIndex === index ? 1.1 : 0.95,
              y: hoveredIndex === index ? -15 : 0,
              filter: hoveredIndex === null ? 'blur(0px)' : hoveredIndex === index ? 'blur(0px)' : 'blur(2px)',
              zIndex: hoveredIndex === index ? 10 : 1
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 0.8
            }}
            className="glass-effect rounded-2xl overflow-hidden cursor-pointer group relative"
            style={{ transformOrigin: 'center center' }}
          >
            {/* Glow effect on hover */}
            <motion.div
              animate={{
                boxShadow: hoveredIndex === index
                  ? '0 25px 50px -12px rgba(139, 92, 246, 0.5), 0 0 30px rgba(0, 217, 255, 0.3)'
                  : '0 0 0 rgba(0,0,0,0)'
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
            />

            {/* Certificate Image Preview */}
            <div className="h-40 relative overflow-hidden">
              <motion.img
                src={cert.thumbnail}
                alt={cert.title}
                className="w-full h-full object-cover"
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                  opacity: hoveredIndex === index ? 1 : 0.7
                }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* View badge */}
              <motion.div
                className="absolute top-3 right-3 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1"
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                  opacity: hoveredIndex === index ? 1 : 0.8
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                View
              </motion.div>
            </div>

            {/* Certificate Info */}
            <div className="p-5 space-y-3 relative">
              <div className="flex items-start gap-3">
                <motion.div
                  className="text-2xl text-yellow-500"
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                    rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Award size={24} />
                </motion.div>
                <div>
                  <motion.h4
                    className="font-bold text-base leading-tight"
                    animate={{
                      color: hoveredIndex === index ? '#8b5cf6' : '#ffffff'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {cert.title}
                  </motion.h4>
                  <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-sm text-primary font-semibold">{cert.year}</span>
                <motion.span
                  className="text-sm font-medium flex items-center gap-1"
                  animate={{
                    x: hoveredIndex === index ? 5 : 0,
                    color: hoveredIndex === index ? '#00d9ff' : '#888888'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Open Certificate →
                </motion.span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};


const SkillCategory = ({ category, index }: { category: SkillCategoryData; index: number }) => {
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
        {category.skills.map((skill: Skill, skillIndex: number) => (
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

const SkillBar = ({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) => {
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
