import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-config';
import SplitType from 'split-type';

type RevealType = 'chars' | 'words' | 'lines';

interface TextRevealProps {
    children: string;
    type?: RevealType;
    animation?: 'fadeUp' | 'slideUp' | 'fadeIn' | 'scramble';
    stagger?: number;
    duration?: number;
    delay?: number;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    triggerOnScroll?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({
    children,
    type = 'chars',
    animation = 'fadeUp',
    stagger = 0.02,
    duration = 0.6,
    delay = 0,
    className = '',
    tag = 'div',
    triggerOnScroll = true,
}) => {
    const containerRef = useRef<HTMLElement>(null);
    const splitRef = useRef<SplitType | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Split the text
        splitRef.current = new SplitType(container, {
            types: type === 'chars' ? 'chars,words' : type === 'words' ? 'words' : 'lines',
            tagName: 'span',
        });

        const elements = type === 'chars'
            ? splitRef.current.chars
            : type === 'words'
                ? splitRef.current.words
                : splitRef.current.lines;

        if (!elements) return;

        // Animation configurations
        const animConfigs = {
            fadeUp: {
                from: { opacity: 0, y: 30, rotateX: -40 },
                to: { opacity: 1, y: 0, rotateX: 0 },
            },
            slideUp: {
                from: { y: '100%', opacity: 0 },
                to: { y: '0%', opacity: 1 },
            },
            fadeIn: {
                from: { opacity: 0 },
                to: { opacity: 1 },
            },
            scramble: {
                from: { opacity: 0, scale: 0.8 },
                to: { opacity: 1, scale: 1 },
            },
        };

        const config = animConfigs[animation];

        // Set initial state
        gsap.set(elements, config.from);

        // Create animation
        const tween = gsap.to(elements, {
            ...config.to,
            duration,
            stagger,
            delay,
            ease: 'power3.out',
            paused: triggerOnScroll,
        });

        // Add scroll trigger if needed
        let trigger: ScrollTrigger | null = null;
        if (triggerOnScroll) {
            trigger = ScrollTrigger.create({
                trigger: container,
                start: 'top 85%',
                onEnter: () => tween.play(),
            });
        }

        return () => {
            tween.kill();
            trigger?.kill();
            splitRef.current?.revert();
        };
    }, [children, type, animation, stagger, duration, delay, triggerOnScroll]);

    const Tag = tag;

    return (
        <Tag
            ref={containerRef as React.RefObject<any>}
            className={`${className}`}
            style={{ perspective: '1000px' }}
        >
            {children}
        </Tag>
    );
};

export default TextReveal;
