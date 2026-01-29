// Performance detection and animation optimization utilities

export interface PerformanceProfile {
    isLowEnd: boolean;
    prefersReducedMotion: boolean;
    isMobile: boolean;
    hasLowBattery: boolean;
    shouldReduceAnimations: boolean;
}

// Detect device performance capabilities
export const detectPerformance = (): PerformanceProfile => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.matchMedia('(max-width: 768px)').matches;

    // Check hardware concurrency (CPU cores)
    const cpuCores = navigator.hardwareConcurrency || 4;
    const isLowCPU = cpuCores <= 4;

    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory || 8;
    const isLowMemory = deviceMemory <= 4;

    // Check battery status (if available)
    let hasLowBattery = false;
    if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
            hasLowBattery = battery.level < 0.2 || (battery.charging === false && battery.level < 0.5);
        }).catch(() => { });
    }

    // Determine if device is low-end
    const isLowEnd = isLowCPU || isLowMemory || isMobile;

    // Should reduce animations if any of these conditions are true
    const shouldReduceAnimations = prefersReducedMotion || isLowEnd || hasLowBattery;

    return {
        isLowEnd,
        prefersReducedMotion,
        isMobile,
        hasLowBattery,
        shouldReduceAnimations
    };
};

// Store the performance profile
let cachedProfile: PerformanceProfile | null = null;

export const getPerformanceProfile = (): PerformanceProfile => {
    if (!cachedProfile) {
        cachedProfile = detectPerformance();
    }
    return cachedProfile;
};

// Animation settings based on performance
export const getAnimationSettings = () => {
    const profile = getPerformanceProfile();

    if (profile.prefersReducedMotion) {
        return {
            enableCursor: false,
            enableSmoothScroll: false,
            enable3DScene: true, // Keep but simplify
            enableParticles: false,
            enableTilt: false,
            enableTextSplit: false,
            scrollDuration: 0.1,
            transitionDuration: 0.1,
        };
    }

    if (profile.isLowEnd || profile.hasLowBattery) {
        return {
            enableCursor: false, // Disable custom cursor on mobile/low-end
            enableSmoothScroll: true,
            enable3DScene: true,
            enableParticles: false, // Disable particles
            enableTilt: false, // Disable 3D tilt
            enableTextSplit: false, // Disable text splitting
            scrollDuration: 0.8,
            transitionDuration: 0.3,
        };
    }

    // High-end defaults
    return {
        enableCursor: true,
        enableSmoothScroll: true,
        enable3DScene: true,
        enableParticles: true,
        enableTilt: true,
        enableTextSplit: true,
        scrollDuration: 1.2,
        transitionDuration: 0.8,
    };
};

// CSS class to add to body for performance mode
export const applyPerformanceMode = () => {
    const profile = getPerformanceProfile();

    if (profile.shouldReduceAnimations) {
        document.body.classList.add('reduced-motion');
    }

    if (profile.isLowEnd) {
        document.body.classList.add('low-end-device');
    }

    if (profile.isMobile) {
        document.body.classList.add('is-mobile');
    }
};
