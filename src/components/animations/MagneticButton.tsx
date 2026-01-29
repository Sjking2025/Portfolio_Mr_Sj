import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
    disabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = '',
    strength = 0.3,
    onClick,
    disabled = false,
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            className={className}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Inner content moves opposite for depth effect */}
            <motion.span
                className="block"
                animate={{
                    x: position.x * -0.2,
                    y: position.y * -0.2,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                }}
            >
                {children}
            </motion.span>
        </motion.button>
    );
};

export default MagneticButton;
