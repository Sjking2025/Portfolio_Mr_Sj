import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
    // Optional customization
    size?: number;
    color?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
    size = 20,
    color = 'hsl(var(--primary))',
}) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click' | 'text'>('default');
    const [cursorText, setCursorText] = useState('');

    // Mouse position with spring for smooth following
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Check if device supports hover (not touch)
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (!hasHover) return;

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Track hover states
        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for interactive elements
            const isButton = target.closest('button, a, [role="button"]');
            const isInput = target.closest('input, textarea, select');
            const hasViewText = target.closest('[data-cursor="view"]');
            const hasClickText = target.closest('[data-cursor="click"]');

            if (hasViewText) {
                setCursorVariant('text');
                setCursorText('View');
            } else if (hasClickText) {
                setCursorVariant('text');
                setCursorText('Click');
            } else if (isButton) {
                setCursorVariant('hover');
                setCursorText('');
            } else if (isInput) {
                setCursorVariant('default');
                setCursorText('');
            } else {
                setCursorVariant('default');
                setCursorText('');
            }
        };

        const handleClick = () => {
            setCursorVariant('click');
            setTimeout(() => {
                setCursorVariant('default');
            }, 150);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousemove', handleElementHover);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('click', handleClick);

        setIsVisible(true);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousemove', handleElementHover);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('click', handleClick);
        };
    }, [mouseX, mouseY]);

    const variants = {
        default: {
            width: size,
            height: size,
            backgroundColor: 'transparent',
            border: `2px solid ${color}`,
            mixBlendMode: 'difference' as const,
        },
        hover: {
            width: size * 2.5,
            height: size * 2.5,
            backgroundColor: `${color}20`,
            border: `2px solid ${color}`,
            mixBlendMode: 'normal' as const,
        },
        click: {
            width: size * 0.8,
            height: size * 0.8,
            backgroundColor: color,
            border: `2px solid ${color}`,
            mixBlendMode: 'normal' as const,
        },
        text: {
            width: size * 4,
            height: size * 4,
            backgroundColor: `${color}90`,
            border: 'none',
            mixBlendMode: 'normal' as const,
        },
    };

    // Don't render on mobile/touch devices
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
        return null;
    }

    return (
        <>
            {/* Main cursor */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                variants={variants}
                animate={cursorVariant}
                transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                    mass: 0.5,
                }}
            >
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="text-white text-xs font-medium"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>

            {/* Cursor dot (always follows precisely) */}
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9999]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    backgroundColor: color,
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Hide default cursor */}
            <style>{`
        * {
          cursor: none !important;
        }
        @media (hover: none) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
        </>
    );
};

export default CustomCursor;
