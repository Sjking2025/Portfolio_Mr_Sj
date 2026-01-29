import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
    children: ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
    delay?: number;
    direction?: 'vertical' | 'horizontal' | 'diagonal';
}

const FloatingElement: React.FC<FloatingElementProps> = ({
    children,
    className = '',
    duration = 3,
    distance = 10,
    delay = 0,
    direction = 'vertical',
}) => {
    const getAnimation = () => {
        switch (direction) {
            case 'horizontal':
                return { x: [-distance, distance, -distance] };
            case 'diagonal':
                return {
                    x: [-distance / 2, distance / 2, -distance / 2],
                    y: [-distance, distance, -distance],
                };
            case 'vertical':
            default:
                return { y: [-distance, distance, -distance] };
        }
    };

    return (
        <motion.div
            className={className}
            animate={getAnimation()}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    );
};

export default FloatingElement;
