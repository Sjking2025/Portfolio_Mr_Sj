import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger, animations, staggerPresets } from '@/lib/animations/gsap-config';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'clipReveal';

interface ScrollRevealProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    stagger?: boolean | number;
    threshold?: number;
    className?: string;
    once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    animation = 'fadeUp',
    delay = 0,
    duration = 0.8,
    stagger = false,
    threshold = 0.85,
    className = '',
    once = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const animPreset = animations[animation];
        const elements = stagger ? container.children : [container];

        // Set initial state
        gsap.set(elements, animPreset.from);

        // Create scroll trigger
        const trigger = ScrollTrigger.create({
            trigger: container,
            start: `top ${threshold * 100}%`,
            onEnter: () => {
                if (once && hasAnimated.current) return;
                hasAnimated.current = true;

                gsap.to(elements, {
                    ...animPreset.to,
                    duration,
                    delay,
                    stagger: stagger === true ? staggerPresets.normal : (stagger || 0),
                    ease: 'power3.out',
                });
            },
            onLeaveBack: () => {
                if (!once) {
                    gsap.to(elements, {
                        ...animPreset.from,
                        duration: duration * 0.5,
                    });
                    hasAnimated.current = false;
                }
            },
        });

        return () => {
            trigger.kill();
        };
    }, [animation, delay, duration, stagger, threshold, once]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default ScrollReveal;
