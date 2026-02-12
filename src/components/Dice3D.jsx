import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const Dice3D = ({ type = 'd20', value, onComplete, autoRoll = true }) => {
    const meshRef = useRef();
    const [isRolling, setIsRolling] = useState(autoRoll);
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
    const rollTimeRef = useRef(0);

    useEffect(() => {
        if (autoRoll) {
            // Initial velocity for rolling animation
            setVelocity({
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3,
                z: (Math.random() - 0.5) * 0.3
            });
            rollTimeRef.current = 0;
        }
    }, [autoRoll]);

    useFrame((state, delta) => {
        if (!meshRef.current || !isRolling) return;

        rollTimeRef.current += delta;

        // Deceleration over time
        const damping = 0.95;
        const newVelocity = {
            x: velocity.x * damping,
            y: velocity.y * damping,
            z: velocity.z * damping
        };

        setVelocity(newVelocity);

        // Update rotation
        meshRef.current.rotation.x += newVelocity.x;
        meshRef.current.rotation.y += newVelocity.y;
        meshRef.current.rotation.z += newVelocity.z;

        // Stop after 2 seconds
        if (rollTimeRef.current > 2) {
            setIsRolling(false);
            // Align to show the result face
            const finalRotation = getFinalRotation(type, value);
            meshRef.current.rotation.set(finalRotation.x, finalRotation.y, finalRotation.z);
            if (onComplete) {
                setTimeout(() => onComplete(value), 300);
            }
        }
    });

    const getFinalRotation = (diceType, resultValue) => {
        // Simplified: rotate to show top face
        // For d20, each face has a specific rotation
        const angle = (resultValue / 20) * Math.PI * 2;
        return { x: angle, y: angle * 0.7, z: 0 };
    };

    const getDiceGeometry = () => {
        switch (type) {
            case 'd20':
                return <icosahedronGeometry args={[1, 0]} />;
            case 'd12':
                return <dodecahedronGeometry args={[1, 0]} />;
            case 'd10':
            case 'd8':
                return <octahedronGeometry args={[1, 0]} />;
            case 'd6':
                return <boxGeometry args={[1.4, 1.4, 1.4]} />;
            case 'd4':
                return <tetrahedronGeometry args={[1.2, 0]} />;
            default:
                return <icosahedronGeometry args={[1, 0]} />;
        }
    };

    const getColor = () => {
        switch (type) {
            case 'd20': return '#d4af37';
            case 'd12': return '#4a90e2';
            case 'd10': return '#e74c3c';
            case 'd8': return '#9b59b6';
            case 'd6': return '#2ecc71';
            case 'd4': return '#f39c12';
            default: return '#d4af37';
        }
    };

    return (
        <mesh ref={meshRef} castShadow receiveShadow>
            {getDiceGeometry()}
            <meshStandardMaterial
                color={getColor()}
                metalness={0.3}
                roughness={0.4}
                emissive={getColor()}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

export const DiceRollScene = ({ diceType, value, onComplete }) => {
    return (
        <div style={{
            width: '200px',
            height: '200px',
            position: 'relative'
        }}>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <spotLight
                    position={[-10, 10, 10]}
                    angle={0.3}
                    penumbra={1}
                    intensity={0.5}
                    castShadow
                />
                <Dice3D type={diceType} value={value} onComplete={onComplete} />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#d4af37',
                fontSize: '2rem',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
                opacity: value ? 1 : 0,
                transition: 'opacity 0.5s'
            }}>
                {value}
            </div>
        </div>
    );
};
