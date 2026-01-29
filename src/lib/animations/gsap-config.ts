// GSAP Configuration and ScrollTrigger setup
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Default animation settings
export const defaultEase = 'power3.out';
export const defaultDuration = 0.8;

// Configure GSAP defaults
gsap.defaults({
    ease: defaultEase,
    duration: defaultDuration,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    start: 'top 85%',
    end: 'bottom 15%',
});

// Refresh ScrollTrigger (call after route changes)
export const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
};

// Kill all ScrollTriggers (cleanup)
export const killAllScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Common animation presets
export const animations = {
    fadeUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 },
    },
    fadeDown: {
        from: { opacity: 0, y: -60 },
        to: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0 },
    },
    fadeRight: {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0 },
    },
    scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
    },
    clipReveal: {
        from: { clipPath: 'inset(100% 0% 0% 0%)' },
        to: { clipPath: 'inset(0% 0% 0% 0%)' },
    },
};

// Stagger preset
export const staggerPresets = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    cascade: 0.08,
};

export { gsap, ScrollTrigger };
