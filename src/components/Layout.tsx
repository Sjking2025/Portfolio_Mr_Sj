
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import ParticleBackground from './ParticleBackground';
import { useDemo } from '@/contexts/DemoContext';

interface LayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -50,
    scale: 1.05,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.6,
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isDemoActive } = useDemo();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      {/* Hide main navigation when demo is active */}
      {!isDemoActive && <Navigation />}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
