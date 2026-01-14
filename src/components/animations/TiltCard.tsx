import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltStrength?: number;
    glareEnabled?: boolean;
    scale?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = '',
    tiltStrength = 15,
    glareEnabled = true,
    scale = 1.02,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate tilt
        const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -tiltStrength;
        const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * tiltStrength;

        // Calculate glare position (as percentage)
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        setTilt({ x: tiltX, y: tiltY });
        setGlarePosition({ x: glareX, y: glareY });
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
                scale: isHovered ? scale : 1,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
        >
            {/* Card content */}
            <div style={{ transform: 'translateZ(20px)' }}>
                {children}
            </div>

            {/* Glare effect */}
            {glareEnabled && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                        opacity: isHovered ? 0.15 : 0,
                        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, white 0%, transparent 60%)`,
                    }}
                    transition={{ duration: 0.2 }}
                />
            )}

            {/* Border glow */}
            <motion.div
                className="absolute inset-0 rounded-[inherit] pointer-events-none"
                animate={{
                    boxShadow: isHovered
                        ? '0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 1px rgba(255,255,255,0.2)'
                        : '0 0 0px rgba(139, 92, 246, 0)',
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default TiltCard;
