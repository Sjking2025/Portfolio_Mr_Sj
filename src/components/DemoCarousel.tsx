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
    const [currentIndex, setCurrentIndex] = useState(0);

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

    // Auto-scroll
    useEffect(() => {
        const interval = setInterval(goToNext, 6000);
        return () => clearInterval(interval);
    }, [goToNext]);

    // Get card index with wrapping
    const getCardIndex = (offset: number) => {
        return (currentIndex + offset + screenshots.length) % screenshots.length;
    };

    return (
        <div
            className="fixed inset-0 z-[99999] flex flex-col"
            style={{
                background: 'linear-gradient(180deg, #0a1628 0%, #0d1829 50%, #0a1628 100%)'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                    {projectTitle}
                    <span className="text-white/50 ml-2 font-normal">— Demo</span>
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 md:p-3 rounded-full border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 transition-all duration-300"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Carousel Container */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                {/* Left Arrow */}
                <button
                    onClick={goToPrev}
                    className="absolute left-4 md:left-12 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 transition-all duration-300 flex items-center justify-center"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* 3D Cards Container */}
                <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center">
                    {[-2, -1, 0, 1, 2].map((offset) => {
                        const cardIndex = getCardIndex(offset);
                        const screenshot = screenshots[cardIndex];
                        const isCenter = offset === 0;

                        // Position and styling calculations
                        const xOffset = offset * 320; // Horizontal spacing
                        const zOffset = Math.abs(offset) * -150; // Depth
                        const scale = isCenter ? 1 : 0.7 - Math.abs(offset) * 0.05;
                        const rotateY = offset * -20; // Rotation angle

                        return (
                            <motion.div
                                key={`card-${cardIndex}-${offset}`}
                                animate={{
                                    x: xOffset,
                                    z: zOffset,
                                    rotateY: rotateY,
                                    scale: scale,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 25
                                }}
                                className="absolute cursor-pointer"
                                style={{
                                    zIndex: 10 - Math.abs(offset),
                                    transformStyle: 'preserve-3d',
                                    perspective: '1000px',
                                }}
                                onClick={() => !isCenter && setCurrentIndex(cardIndex)}
                            >
                                {/* Card */}
                                <div
                                    className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${isCenter
                                            ? 'shadow-[0_0_80px_rgba(6,182,212,0.5)]'
                                            : 'shadow-xl'
                                        }`}
                                    style={{
                                        width: isCenter ? '480px' : '360px',
                                        maxWidth: '85vw',
                                        border: isCenter ? '3px solid rgba(6, 182, 212, 0.7)' : '1px solid rgba(255,255,255,0.1)',
                                    }}
                                >
                                    {/* Image with grayscale for non-center */}
                                    <img
                                        src={screenshot.url}
                                        alt={screenshot.title}
                                        className="w-full h-52 md:h-64 object-cover transition-all duration-500"
                                        style={{
                                            filter: isCenter
                                                ? 'none'
                                                : 'grayscale(100%) blur(2px) brightness(0.6)',
                                        }}
                                    />

                                    {/* Overlay for side cards */}
                                    {!isCenter && (
                                        <div className="absolute inset-0 bg-black/30" />
                                    )}

                                    {/* Stats bar only on center card */}
                                    {isCenter && (
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
                                            <div className="flex justify-center gap-6 text-white text-xs md:text-sm">
                                                <div className="text-center">
                                                    <div className="font-bold text-cyan-400">Feature</div>
                                                    <div className="text-white/60 uppercase tracking-wider text-[10px]">Highlight</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-cyan-400">Modern</div>
                                                    <div className="text-white/60 uppercase tracking-wider text-[10px]">Design</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-cyan-400">Responsive</div>
                                                    <div className="text-white/60 uppercase tracking-wider text-[10px]">Layout</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Label on side cards */}
                                    {!isCenter && (
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <p className="text-cyan-400/80 text-xs font-medium uppercase tracking-wider truncate">
                                                {screenshot.title}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={goToNext}
                    className="absolute right-4 md:right-12 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 transition-all duration-300 flex items-center justify-center"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Title & Description */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center px-4 pb-4"
            >
                <h3 className="text-2xl md:text-3xl font-bold italic text-white mb-2">
                    {screenshots[currentIndex].title}
                </h3>
                <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    {screenshots[currentIndex].description ||
                        `View of the ${screenshots[currentIndex].title.toLowerCase()} showing key features and functionality. Experience the intuitive design and seamless user interface.`}
                </p>
            </motion.div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-3 pb-6">
                {screenshots.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                ? 'bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                                : 'bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default DemoCarousel;
