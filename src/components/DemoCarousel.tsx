import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useDemo } from '@/contexts/DemoContext';

interface Screenshot {
    id: number;
    url: string;
    title: string;
    description?: string;
}

interface DemoCarouselProps {
    screenshots: Screenshot[];
    projectTitle: string;
    onClose: () => void;
}

const DemoCarousel: React.FC<DemoCarouselProps> = ({ screenshots, projectTitle, onClose }) => {
    // Get theme for dynamic glow color
    const { currentTheme } = useTheme();
    const primaryColor = currentTheme.preview.primary;

    // Set demo active state to hide main navbar
    const { setDemoActive } = useDemo();
    useEffect(() => {
        setDemoActive(true);
        return () => setDemoActive(false);
    }, [setDemoActive]);

    // Phases: pulling → carousel
    const [phase, setPhase] = useState<'pulling' | 'carousel'>('pulling');
    const [pulledCount, setPulledCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // ========== TISSUE-PULL PHASE ==========
    useEffect(() => {
        if (phase === 'pulling' && pulledCount < screenshots.length) {
            const timer = setTimeout(() => {
                setPulledCount(prev => prev + 1);
            }, 250);
            return () => clearTimeout(timer);
        } else if (phase === 'pulling' && pulledCount >= screenshots.length) {
            const timer = setTimeout(() => setPhase('carousel'), 800);
            return () => clearTimeout(timer);
        }
    }, [phase, pulledCount, screenshots.length]);

    // ========== CAROUSEL NAVIGATION ==========
    const goToPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex(prev => (prev - 1 + screenshots.length) % screenshots.length);
    }, [screenshots.length]);

    const goToNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex(prev => (prev + 1) % screenshots.length);
    }, [screenshots.length]);

    const goToIndex = useCallback((idx: number) => {
        setDirection(idx > currentIndex ? 1 : -1);
        setCurrentIndex(idx);
    }, [currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && phase === 'carousel') goToPrev();
            if (e.key === 'ArrowRight' && phase === 'carousel') goToNext();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToPrev, goToNext, onClose, phase]);

    // Auto-scroll in carousel phase (pauses on hover)
    useEffect(() => {
        if (phase !== 'carousel' || isPaused) return;
        const interval = setInterval(goToNext, 3000);
        return () => clearInterval(interval);
    }, [goToNext, phase, isPaused]);

    // Get wrapped index for side cards
    const getIndex = (offset: number) => {
        return (currentIndex + offset + screenshots.length) % screenshots.length;
    };

    // Slide animation variants
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 400 : -400,
            scale: 0.8,
            opacity: 0.5,
            rotateY: dir > 0 ? 25 : -25,
        }),
        center: {
            x: 0,
            scale: 1,
            opacity: 1,
            rotateY: 0,
            zIndex: 20,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -400 : 400,
            scale: 0.8,
            opacity: 0.5,
            rotateY: dir > 0 ? -25 : 25,
            zIndex: 10,
        }),
    };

    const sideCardStyle = (isLeft: boolean) => ({
        x: isLeft ? -280 : 280,
        scale: 0.75,
        rotateY: isLeft ? 20 : -20,
        opacity: 0.6,
    });

    // Helper to convert hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <div
            className="fixed inset-0 z-[99999] flex flex-col overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0a1628 0%, #0c1a2e 50%, #0a1628 100%)'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 shrink-0">
                <div className="flex items-center gap-3">
                    {/* Back Button */}
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300"
                        style={{
                            borderColor: hexToRgba(primaryColor, 0.3),
                            color: primaryColor,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = primaryColor;
                            e.currentTarget.style.backgroundColor = hexToRgba(primaryColor, 0.1);
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = hexToRgba(primaryColor, 0.3);
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm font-medium hidden md:inline">Back</span>
                    </button>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                        {projectTitle}
                        <span className="text-white/50 ml-2 font-normal">— Demo</span>
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 md:p-3 rounded-full border transition-all duration-300"
                    style={{
                        borderColor: hexToRgba(primaryColor, 0.3),
                        color: primaryColor,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = primaryColor;
                        e.currentTarget.style.backgroundColor = hexToRgba(primaryColor, 0.1);
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = hexToRgba(primaryColor, 0.3);
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* ========== TISSUE-PULL PHASE ========== */}
            {phase === 'pulling' && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-80 md:w-96 h-56 md:h-64">
                        {screenshots.slice(0, pulledCount).map((screenshot, idx) => {
                            const stackOffset = (pulledCount - 1 - idx) * 6;
                            return (
                                <motion.div
                                    key={screenshot.id}
                                    initial={{ y: 80, opacity: 0, scale: 0.9 }}
                                    animate={{
                                        y: -stackOffset,
                                        x: stackOffset * 0.5,
                                        opacity: 1,
                                        scale: 1,
                                        rotate: (idx % 2 === 0 ? 1 : -1) * (idx * 0.5)
                                    }}
                                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                                    className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
                                    style={{
                                        zIndex: idx,
                                        border: `1px solid ${hexToRgba(primaryColor, 0.2)}`
                                    }}
                                >
                                    <img
                                        src={screenshot.url}
                                        alt={screenshot.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                                        <p className="text-white font-medium text-sm">{screenshot.title}</p>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Loading indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-sm font-medium"
                            style={{ color: hexToRgba(primaryColor, 0.8) }}
                        >
                            Loading... {pulledCount}/{screenshots.length}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* ========== CAROUSEL PHASE ========== */}
            {phase === 'carousel' && (
                <>
                    {/* Carousel Container */}
                    <div className="flex-1 flex items-center justify-center relative px-4">
                        {/* Left Arrow */}
                        <button
                            onClick={goToPrev}
                            className="absolute left-4 md:left-12 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                            style={{
                                borderColor: hexToRgba(primaryColor, 0.5),
                                color: primaryColor,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = primaryColor;
                                e.currentTarget.style.backgroundColor = hexToRgba(primaryColor, 0.1);
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = hexToRgba(primaryColor, 0.5);
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Cards Container - pause on hover here */}
                        <div
                            className="relative w-full max-w-4xl h-[300px] md:h-[380px] mx-auto flex items-center justify-center"
                            style={{ perspective: '1200px' }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Left Side Card */}
                            <motion.div
                                className="absolute cursor-pointer"
                                animate={sideCardStyle(true)}
                                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                onClick={goToPrev}
                                style={{ transformStyle: 'preserve-3d', zIndex: 5 }}
                            >
                                <div className="w-[280px] md:w-[340px] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                    <img
                                        src={screenshots[getIndex(-1)].url}
                                        alt={screenshots[getIndex(-1)].title}
                                        className="w-full h-36 md:h-44 object-cover grayscale brightness-75 blur-[1px]"
                                    />
                                    <div className="absolute bottom-2 left-2 right-2">
                                        <p
                                            className="text-xs font-medium uppercase tracking-wider truncate"
                                            style={{ color: hexToRgba(primaryColor, 0.8) }}
                                        >
                                            {screenshots[getIndex(-1)].title}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Center Card (Animated) */}
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: 'spring', stiffness: 150, damping: 25 },
                                        scale: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                                        opacity: { duration: 0.4 },
                                        rotateY: { duration: 0.5 },
                                    }}
                                    className="absolute z-20"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div
                                        className="w-[320px] md:w-[420px] rounded-xl md:rounded-2xl overflow-hidden"
                                        style={{
                                            border: `2px solid ${hexToRgba(primaryColor, 0.6)}`,
                                            boxShadow: `0 0 60px ${hexToRgba(primaryColor, 0.5)}`
                                        }}
                                    >
                                        <img
                                            src={screenshots[currentIndex].url}
                                            alt={screenshots[currentIndex].title}
                                            className="w-full h-44 md:h-56 object-cover"
                                        />
                                        {/* Screenshot description bar */}
                                        <div className="bg-gradient-to-t from-slate-900 via-slate-900/95 to-slate-900/80 p-3 -mt-10 relative z-10">
                                            <p
                                                className="font-semibold text-sm mb-1"
                                                style={{ color: primaryColor }}
                                            >
                                                {screenshots[currentIndex].title}
                                            </p>
                                            <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                                                {screenshots[currentIndex].description ||
                                                    `View of the ${screenshots[currentIndex].title.toLowerCase()} interface.`}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Right Side Card */}
                            <motion.div
                                className="absolute cursor-pointer"
                                animate={sideCardStyle(false)}
                                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                onClick={goToNext}
                                style={{ transformStyle: 'preserve-3d', zIndex: 5 }}
                            >
                                <div className="w-[280px] md:w-[340px] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                    <img
                                        src={screenshots[getIndex(1)].url}
                                        alt={screenshots[getIndex(1)].title}
                                        className="w-full h-36 md:h-44 object-cover grayscale brightness-75 blur-[1px]"
                                    />
                                    <div className="absolute bottom-2 left-2 right-2">
                                        <p
                                            className="text-xs font-medium uppercase tracking-wider truncate"
                                            style={{ color: hexToRgba(primaryColor, 0.8) }}
                                        >
                                            {screenshots[getIndex(1)].title}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={goToNext}
                            className="absolute right-4 md:right-12 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                            style={{
                                borderColor: hexToRgba(primaryColor, 0.5),
                                color: primaryColor,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = primaryColor;
                                e.currentTarget.style.backgroundColor = hexToRgba(primaryColor, 0.1);
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = hexToRgba(primaryColor, 0.5);
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Title & Description */}
                    <motion.div
                        key={`desc-${currentIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="text-center px-4 pb-3 shrink-0"
                    >
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold italic text-white mb-1">
                            {screenshots[currentIndex].title}
                        </h3>
                        <p className="text-white/60 max-w-lg mx-auto text-xs md:text-sm leading-relaxed">
                            {screenshots[currentIndex].description ||
                                `View of the ${screenshots[currentIndex].title.toLowerCase()} showing key features and functionality.`}
                        </p>
                    </motion.div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 pb-5 shrink-0">
                        {screenshots.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToIndex(idx)}
                                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                                style={{
                                    backgroundColor: idx === currentIndex ? primaryColor : 'rgba(255,255,255,0.3)',
                                    boxShadow: idx === currentIndex ? `0 0 10px ${hexToRgba(primaryColor, 0.7)}` : 'none',
                                    transform: idx === currentIndex ? 'scale(1.1)' : 'scale(1)',
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default DemoCarousel;
