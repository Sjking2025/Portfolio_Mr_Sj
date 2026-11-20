import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getAnimationSettings } from '@/lib/performance';

interface CustomCursorProps {
    size?: number;
    color?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
    size = 24,
    color,
}) => {
    const { currentTheme } = useTheme();
    const cursorColor = color || currentTheme.preview.primary;
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const settings = getAnimationSettings();
        const hasHover = window.matchMedia('(hover: hover)').matches;

        if (!hasHover || !settings.enableCursor) {
            setIsEnabled(false);
            return;
        }

        setIsEnabled(true);

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let isHoveringInteractive = false;
        let rafId: number;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Immediately position the center dot with zero latency
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            }
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer')) {
                isHoveringInteractive = true;
            } else {
                isHoveringInteractive = false;
            }
        };

        // Smooth 60fps RAF follower for the outer accent ring (lerp with high responsiveness)
        const updateFollower = () => {
            // Fast 0.35 lerp factor for instant, snappy follow without sluggish lag
            ringX += (mouseX - ringX) * 0.35;
            ringY += (mouseY - ringY) * 0.35;

            if (ringRef.current) {
                const scale = isHoveringInteractive ? 1.6 : 1;
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
                ringRef.current.style.borderColor = isHoveringInteractive ? cursorColor : `${cursorColor}80`;
                ringRef.current.style.backgroundColor = isHoveringInteractive ? `${cursorColor}18` : 'transparent';
            }

            rafId = requestAnimationFrame(updateFollower);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        rafId = requestAnimationFrame(updateFollower);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(rafId);
        };
    }, [cursorColor]);

    if (!isEnabled) {
        return null;
    }

    return (
        <>
            {/* Outer accent glow ring - follows smoothly via GPU translate3d with zero React re-renders */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full transition-[background-color,border-color,width,height] duration-150 ease-out"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    border: `1.5px solid ${cursorColor}80`,
                    willChange: 'transform',
                }}
            />

            {/* Instant micro-dot - exact cursor location at 0ms latency */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
                style={{
                    width: '5px',
                    height: '5px',
                    backgroundColor: cursorColor,
                    boxShadow: `0 0 8px ${cursorColor}`,
                    willChange: 'transform',
                }}
            />
        </>
    );
};

export default CustomCursor;