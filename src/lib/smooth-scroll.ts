// Smooth scrolling setup with Lenis - Performance optimized
import Lenis from '@studio-freight/lenis';
import { getAnimationSettings, getPerformanceProfile } from './performance';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export const initSmoothScroll = (): Lenis | null => {
    if (lenisInstance) return lenisInstance;

    const settings = getAnimationSettings();
    const profile = getPerformanceProfile();

    // Skip smooth scrolling if disabled or reduced motion preferred
    if (!settings.enableSmoothScroll || profile.prefersReducedMotion) {
        console.log('[Performance] Smooth scrolling disabled for better performance');
        return null;
    }

    lenisInstance = new Lenis({
        duration: settings.scrollDuration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: profile.isLowEnd ? 1.5 : 1, // Faster scroll on low-end
        touchMultiplier: 2,
    });

    // Animation frame loop with cleanup support
    function raf(time: number) {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return lenisInstance;
};

export const getLenis = (): Lenis | null => lenisInstance;

export const scrollTo = (target: string | number | HTMLElement, options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
}) => {
    lenisInstance?.scrollTo(target, options);
};

export const stopScroll = () => {
    lenisInstance?.stop();
};

export const startScroll = () => {
    lenisInstance?.start();
};

export const destroySmoothScroll = () => {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
    lenisInstance?.destroy();
    lenisInstance = null;
};
