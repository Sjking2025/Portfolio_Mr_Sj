// Smooth scrolling setup with Lenis
import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;

export const initSmoothScroll = (): Lenis => {
    if (lenisInstance) return lenisInstance;

    lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    // Animation frame loop
    function raf(time: number) {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

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
    lenisInstance?.destroy();
    lenisInstance = null;
};
