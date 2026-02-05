import React, { useRef, useState, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Environment, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Screenshot {
    id: number;
    url: string;
    title: string;
}

interface GenieDemoRevealProps {
    screenshots: Screenshot[];
    onScreenshotClick?: (screenshot: Screenshot) => void;
}

// Floating Screenshot Card in 3D space
const ScreenshotCard: React.FC<{
    screenshot: Screenshot;
    position: [number, number, number];
    rotation: number;
    isHovered: boolean;
    isVisible: boolean;
    isFocused: boolean;
    onClick: () => void;
    onHover: (hovered: boolean) => void;
}> = ({ screenshot, position, rotation, isHovered, isVisible, isFocused, onClick, onHover }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    // Load texture
    const texture = useTexture(screenshot.url);

    // Animation state
    const targetScale = isFocused ? 2 : isHovered ? 1.1 : 1;
    const targetZ = isFocused ? 3 : isHovered ? position[2] + 0.5 : position[2];

    useFrame((state, delta) => {
        if (!meshRef.current || !isVisible) return;

        // Smooth scale
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, 1),
            delta * 5
        );

        // Smooth Z movement
        meshRef.current.position.z = THREE.MathUtils.lerp(
            meshRef.current.position.z,
            targetZ,
            delta * 5
        );

        // Glow effect on hover
        if (materialRef.current) {
            materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
                materialRef.current.emissiveIntensity,
                isHovered ? 0.3 : 0,
                delta * 3
            );
        }
    });

    if (!isVisible) return null;

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={[0, rotation, 0]}
            onClick={onClick}
            onPointerEnter={() => onHover(true)}
            onPointerLeave={() => onHover(false)}
        >
            <planeGeometry args={[2, 1.5]} />
            <meshStandardMaterial
                ref={materialRef}
                map={texture}
                emissive="#ff6b35"
                emissiveIntensity={0}
                transparent
                opacity={1}
            />
        </mesh>
    );
};

// Particle system for genie effect
const GenieParticles: React.FC<{ active: boolean; phase: 'emerging' | 'dissolving' | 'idle' }> = ({ active, phase }) => {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 200;

    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.5;

            positions[i * 3] = Math.cos(theta) * radius;
            positions[i * 3 + 1] = -2;
            positions[i * 3 + 2] = Math.sin(theta) * radius;

            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = Math.random() * 0.05 + 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        return { positions, velocities };
    }, []);

    useFrame((state, delta) => {
        if (!particlesRef.current || !active) return;

        const positionArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            if (phase === 'emerging') {
                // Spiral upward
                const theta = state.clock.elapsedTime * 2 + i * 0.1;
                positionArray[i * 3] += Math.cos(theta) * 0.01;
                positionArray[i * 3 + 1] += velocities[i * 3 + 1];
                positionArray[i * 3 + 2] += Math.sin(theta) * 0.01;

                // Reset when too high
                if (positionArray[i * 3 + 1] > 2) {
                    positionArray[i * 3 + 1] = -2;
                }
            } else if (phase === 'dissolving') {
                // Spiral downward
                positionArray[i * 3 + 1] -= 0.03;
                if (positionArray[i * 3 + 1] < -3) {
                    positionArray[i * 3 + 1] = -3;
                }
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    if (!active) return null;

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ff6b35"
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Glowing center orb
const CenterOrb: React.FC<{ visible: boolean }> = ({ visible }) => {
    const orbRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!orbRef.current || !visible) return;
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
        orbRef.current.scale.setScalar(pulse);
    });

    if (!visible) return null;

    return (
        <mesh ref={orbRef}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
                color="#ff6b35"
                emissive="#ff6b35"
                emissiveIntensity={1}
                transparent
                opacity={0.6}
            />
        </mesh>
    );
};

// Chakra Orbit Controller
const ChakraOrbit: React.FC<{
    screenshots: Screenshot[];
    isActive: boolean;
    isPaused: boolean;
    focusedIndex: number | null;
    onScreenshotClick: (index: number) => void;
    onHover: (index: number | null) => void;
}> = ({ screenshots, isActive, isPaused, focusedIndex, onScreenshotClick, onHover }) => {
    const groupRef = useRef<THREE.Group>(null);
    const rotationSpeed = useRef(0.02);

    useFrame((state, delta) => {
        if (!groupRef.current || !isActive) return;

        // Slow down when hovered/paused
        const targetSpeed = isPaused ? 0.006 : 0.02;
        rotationSpeed.current = THREE.MathUtils.lerp(rotationSpeed.current, targetSpeed, delta * 2);

        // Don't rotate when focused
        if (focusedIndex === null) {
            groupRef.current.rotation.y += rotationSpeed.current;
        }
    });

    const radius = 4;
    const tiltAngle = 0.3; // X-axis tilt for 3D depth

    return (
        <group ref={groupRef} rotation={[tiltAngle, 0, 0]}>
            {screenshots.map((screenshot, index) => {
                const angle = (index / screenshots.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <ScreenshotCard
                        key={screenshot.id}
                        screenshot={screenshot}
                        position={[x, 0, z]}
                        rotation={-angle + Math.PI / 2}
                        isHovered={focusedIndex === null && index === focusedIndex}
                        isVisible={isActive}
                        isFocused={focusedIndex === index}
                        onClick={() => onScreenshotClick(index)}
                        onHover={(hovered) => onHover(hovered ? index : null)}
                    />
                );
            })}
            <CenterOrb visible={isActive} />
        </group>
    );
};

// Main 3D Scene
const Scene: React.FC<{
    screenshots: Screenshot[];
    phase: 'idle' | 'emerging' | 'orbiting' | 'focused' | 'dissolving';
    focusedIndex: number | null;
    hoveredIndex: number | null;
    onScreenshotClick: (index: number) => void;
    onHover: (index: number | null) => void;
}> = ({ screenshots, phase, focusedIndex, hoveredIndex, onScreenshotClick, onHover }) => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 5, 0]} intensity={1} color="#ff6b35" />
            <pointLight position={[0, -2, 0]} intensity={0.5} color="#ff6b35" />

            <GenieParticles
                active={phase === 'emerging' || phase === 'dissolving'}
                phase={phase === 'dissolving' ? 'dissolving' : 'emerging'}
            />

            <Suspense fallback={null}>
                <ChakraOrbit
                    screenshots={screenshots}
                    isActive={phase === 'orbiting' || phase === 'focused'}
                    isPaused={hoveredIndex !== null || phase === 'focused'}
                    focusedIndex={focusedIndex}
                    onScreenshotClick={onScreenshotClick}
                    onHover={onHover}
                />
            </Suspense>

            {phase === 'orbiting' && (
                <Sparkles
                    count={50}
                    scale={8}
                    size={2}
                    speed={0.3}
                    color="#ff6b35"
                    opacity={0.5}
                />
            )}

            <Environment preset="night" />
        </>
    );
};

// View Demo Button Component
const ViewDemoButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
}> = ({ onClick, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            className="relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                boxShadow: isHovered
                    ? '0 0 40px rgba(255, 107, 53, 0.6), 0 0 80px rgba(255, 107, 53, 0.3)'
                    : '0 0 20px rgba(255, 107, 53, 0.4)',
            }}
            initial={{ scale: 1, z: 0 }}
            animate={{
                scale: isActive ? 0 : isHovered ? 1.05 : 1,
                z: isHovered ? 20 : 0,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
            }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isActive}
        >
            {/* Pulse glow animation */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <span className="relative z-10 text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Demo
            </span>
        </motion.button>
    );
};

// Close Button for focused view
const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <motion.button
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </motion.button>
);

// Main Component
const GenieDemoReveal: React.FC<GenieDemoRevealProps> = ({ screenshots, onScreenshotClick }) => {
    const [phase, setPhase] = useState<'idle' | 'emerging' | 'orbiting' | 'focused' | 'dissolving'>('idle');
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleButtonClick = useCallback(() => {
        if (phase === 'idle') {
            setPhase('emerging');
            // Transition to orbiting after emergence animation
            setTimeout(() => setPhase('orbiting'), 2000);
        }
    }, [phase]);

    const handleScreenshotClick = useCallback((index: number) => {
        if (phase === 'orbiting') {
            setFocusedIndex(index);
            setPhase('focused');
            onScreenshotClick?.(screenshots[index]);
        }
    }, [phase, screenshots, onScreenshotClick]);

    const handleClose = useCallback(() => {
        if (phase === 'focused') {
            setFocusedIndex(null);
            setPhase('orbiting');
        } else if (phase === 'orbiting') {
            setPhase('dissolving');
            setTimeout(() => {
                setPhase('idle');
            }, 1500);
        }
    }, [phase]);

    return (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                className="absolute inset-0"
                dpr={[1, 2]}
            >
                <Scene
                    screenshots={screenshots}
                    phase={phase}
                    focusedIndex={focusedIndex}
                    hoveredIndex={hoveredIndex}
                    onScreenshotClick={handleScreenshotClick}
                    onHover={setHoveredIndex}
                />
            </Canvas>

            {/* Backdrop blur when focused */}
            <AnimatePresence>
                {phase === 'focused' && (
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>

            {/* View Demo Button - centered at bottom */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <AnimatePresence mode="wait">
                    {phase === 'idle' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                        >
                            <ViewDemoButton onClick={handleButtonClick} isActive={phase !== 'idle'} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Close/Exit Button */}
            <AnimatePresence>
                {(phase === 'focused' || phase === 'orbiting') && (
                    <CloseButton onClick={handleClose} />
                )}
            </AnimatePresence>

            {/* Focused Screenshot Info */}
            <AnimatePresence>
                {phase === 'focused' && focusedIndex !== null && (
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                            <p className="text-white font-medium">{screenshots[focusedIndex]?.title}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GenieDemoReveal;
