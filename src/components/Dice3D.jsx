import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Particle system for dice roll effect
const DiceParticles = ({ isRolling }) => {
    const particlesRef = useRef();
    const particleCount = 50;
    
    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
            velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            });
        }
        
        return { positions, velocities };
    }, []);

    useFrame(() => {
        if (!isRolling || !particlesRef.current) return;
        
        const positions = particlesRef.current.geometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] += particles.velocities[i].x;
            positions[i * 3 + 1] += particles.velocities[i].y;
            positions[i * 3 + 2] += particles.velocities[i].z;
        }
        
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particles.positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial 
                size={0.05} 
                color="#d4af37" 
                transparent 
                opacity={isRolling ? 0.6 : 0}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const Dice3D = ({ type = 'd20', value, onComplete, autoRoll = true }) => {
    const meshRef = useRef();
    const groupRef = useRef();
    const [isRolling, setIsRolling] = useState(autoRoll);
    const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
    const rollTimeRef = useRef(0);

    useEffect(() => {
        if (autoRoll) {
            // Initial velocity for rolling animation (stronger)
            setVelocity({
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            });
            setPosition({ x: 0, y: 2, z: 0 }); // Start from above
            rollTimeRef.current = 0;
        }
    }, [autoRoll]);

    useFrame((state, delta) => {
        if (!meshRef.current || !isRolling) return;

        rollTimeRef.current += delta;

        // Gravity and bounce physics
        const gravity = -0.02;
        const damping = 0.97;
        const newVelocity = {
            x: velocity.x * damping,
            y: velocity.y + gravity,
            z: velocity.z * damping
        };

        setVelocity(newVelocity);

        // Update position
        const newPos = {
            x: position.x + newVelocity.x,
            y: position.y + newVelocity.y,
            z: position.z + newVelocity.z
        };

        // Bounce on ground
        if (newPos.y < 0) {
            newPos.y = 0;
            newVelocity.y = -newVelocity.y * 0.6; // Bounce with energy loss
            setVelocity(newVelocity);
        }

        setPosition(newPos);
        groupRef.current.position.set(newPos.x, newPos.y, newPos.z);

        // Update rotation
        meshRef.current.rotation.x += newVelocity.x * 2;
        meshRef.current.rotation.y += newVelocity.y * 2;
        meshRef.current.rotation.z += newVelocity.z * 2;

        // Stop after 2.5 seconds or when settled
        const isSettled = Math.abs(newVelocity.y) < 0.01 && newPos.y < 0.1;
        if (rollTimeRef.current > 2.5 || (rollTimeRef.current > 1 && isSettled)) {
            setIsRolling(false);
            // Align to show the result face
            const finalRotation = getFinalRotation(type, value);
            meshRef.current.rotation.set(finalRotation.x, finalRotation.y, finalRotation.z);
            groupRef.current.position.set(0, 0, 0);
            if (onComplete) {
                setTimeout(() => onComplete(value), 300);
            }
        }
    });

    const getFinalRotation = (diceType, resultValue) => {
        // D20 face rotations to show specific numbers on top
        const d20Rotations = {
            1: { x: 0, y: 0, z: 0 },
            20: { x: Math.PI, y: 0, z: 0 },
            2: { x: Math.PI * 0.31, y: 0, z: 0 },
            19: { x: Math.PI * 0.69, y: 0, z: 0 },
            3: { x: Math.PI * 0.31, y: Math.PI * 0.4, z: 0 },
            18: { x: Math.PI * 0.69, y: Math.PI * 0.4, z: 0 },
            // Add more precise rotations for each face
        };
        
        if (diceType === 'd20' && d20Rotations[resultValue]) {
            return d20Rotations[resultValue];
        }
        
        // Fallback: semi-random but stable rotation
        const angle = (resultValue / 20) * Math.PI * 2;
        return { x: angle, y: angle * 0.7, z: angle * 0.3 };
    };

    const getDiceGeometry = () => {
        switch (type) {
            case 'd20':
                return <icosahedronGeometry args={[1.2, 0]} />;
            case 'd12':
                return <dodecahedronGeometry args={[1.1, 0]} />;
            case 'd10':
            case 'd8':
                return <octahedronGeometry args={[1.2, 0]} />;
            case 'd6':
                return <boxGeometry args={[1.5, 1.5, 1.5]} />;
            case 'd4':
                return <tetrahedronGeometry args={[1.3, 0]} />;
            default:
                return <icosahedronGeometry args={[1.2, 0]} />;
        }
    };

    const getColor = () => {
        switch (type) {
            case 'd20': return '#d4af37'; // Gold
            case 'd12': return '#4a90e2'; // Blue
            case 'd10': return '#e74c3c'; // Red
            case 'd8': return '#9b59b6';  // Purple
            case 'd6': return '#2ecc71';  // Green
            case 'd4': return '#f39c12';  // Orange
            default: return '#d4af37';
        }
    };

    // Enhanced material with better lighting
    const material = (
        <meshStandardMaterial
            color={getColor()}
            metalness={0.7}
            roughness={0.3}
            emissive={getColor()}
            emissiveIntensity={0.3}
            envMapIntensity={1.5}
        />
    );

    return (
        <group ref={groupRef}>
            <mesh ref={meshRef} castShadow receiveShadow>
                {getDiceGeometry()}
                {material}
            </mesh>
            <DiceParticles isRolling={isRolling} />
        </group>
    );
};

export const DiceRollScene = ({ diceType, value, onComplete }) => {
    return (
        <div style={{
            width: '300px',
            height: '300px',
            position: 'relative',
            background: 'radial-gradient(circle, rgba(20,20,30,0.9) 0%, rgba(0,0,0,1) 100%)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(212, 175, 55, 0.1)'
        }}>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={45} />
                
                {/* Enhanced lighting setup */}
                <ambientLight intensity={0.3} />
                <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={1.5} 
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <spotLight
                    position={[-5, 10, 5]}
                    angle={0.4}
                    penumbra={1}
                    intensity={1}
                    castShadow
                    color="#d4af37"
                />
                <pointLight position={[0, -2, 0]} intensity={0.5} color="#4a90e2" />
                
                {/* Environment map for reflections */}
                <Environment preset="city" />
                
                {/* Ground plane */}
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <meshStandardMaterial 
                        color="#0a0a15" 
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
                
                <Dice3D type={diceType} value={value} onComplete={onComplete} />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
            
            {/* Result overlay with glow */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#d4af37',
                fontSize: '3rem',
                fontWeight: '900',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)',
                opacity: value ? 1 : 0,
                transition: 'opacity 0.5s',
                fontFamily: 'var(--font-display)',
                letterSpacing: '4px'
            }}>
                {value}
            </div>
            
            {/* Animated border glow */}
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '20px',
                border: '2px solid var(--gold-primary)',
                opacity: 0.3,
                animation: 'pulse 2s ease-in-out infinite',
                pointerEvents: 'none'
            }} />
        </div>
    );
};
