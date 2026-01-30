import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [phase, setPhase] = useState<'pulling' | 'carousel'>('pulling');
    const [pulledCount, setPulledCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Tissue-pull effect: reveal screenshots one by one
    useEffect(() => {
        if (phase === 'pulling' && pulledCount < screenshots.length) {
            const timer = setTimeout(() => {
                setPulledCount(prev => prev + 1);
            }, 250);
            return () => clearTimeout(timer);
        } else if (phase === 'pulling' && pulledCount >= screenshots.length) {
            // All pulled, transition to carousel
            const timer = setTimeout(() => setPhase('carousel'), 600);
            return () => clearTimeout(timer);
        }
    }, [phase, pulledCount, screenshots.length]);

    // Navigation
    const goToPrev = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + screenshots.length) % screenshots.length);
    }, [screenshots.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % screenshots.length);
    }, [screenshots.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToPrev, goToNext, onClose]);

    // Auto-scroll in carousel phase
    useEffect(() => {
        if (phase === 'carousel') {
            const interval = setInterval(goToNext, 5000);
            return () => clearInterval(interval);
        }
    }, [phase, goToNext]);

    return (
        <div
            className="fixed inset-0 z-[99999] flex flex-col"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                    {projectTitle}
                    <span className="text-white/50 ml-2">— Demo</span>
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
                {/* Pulling Phase */}
                {phase === 'pulling' && (
                    <div className="relative w-80 md:w-96 h-60 md:h-72">
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
                                    className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/10"
                                    style={{ zIndex: idx }}
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

                        {/* Progress indicator */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                            Loading... {pulledCount}/{screenshots.length}
                        </div>
                    </div>
                )}

                {/* Carousel Phase */}
                {phase === 'carousel' && (
                    <div className="w-full max-w-4xl mx-auto">
                        {/* Main Card */}
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                                >
                                    <img
                                        src={screenshots[currentIndex].url}
                                        alt={screenshots[currentIndex].title}
                                        className="w-full h-64 md:h-96 object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <button
                                onClick={goToPrev}
                                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Description */}
                        <motion.div
                            key={`desc-${currentIndex}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-center"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-white">
                                {screenshots[currentIndex].title}
                            </h3>
                            <p className="mt-2 text-white/70 max-w-2xl mx-auto">
                                {screenshots[currentIndex].description ||
                                    `View of the ${screenshots[currentIndex].title.toLowerCase()} showing key features and functionality.`}
                            </p>
                        </motion.div>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {screenshots.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex
                                        ? 'bg-white scale-125'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Keyboard hint */}
                        <p className="mt-4 text-center text-white/40 text-xs">
                            ← → to navigate • ESC to close
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemoCarousel;
