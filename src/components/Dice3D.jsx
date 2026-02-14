import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Text, Environment, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// --- GEOMETRY & FACE DATA ---
// Helper to create face transforms (pos + rot) would be complex math.
// For now, we use simplified reliable placements for D6 and D20 (approximated).

const D6_FACES = [
    { val: 1, pos: [0, 0, 1.01], rot: [0, 0, 0] },
    { val: 6, pos: [0, 0, -1.01], rot: [0, Math.PI, 0] },
    { val: 2, pos: [0, 1.01, 0], rot: [-Math.PI / 2, 0, 0] },
    { val: 5, pos: [0, -1.01, 0], rot: [Math.PI / 2, 0, 0] },
    { val: 3, pos: [1.01, 0, 0], rot: [0, Math.PI / 2, 0] },
    { val: 4, pos: [-1.01, 0, 0], rot: [0, -Math.PI / 2, 0] },
];

// Approximate D20 Face Centers/Rotations based on a standard Icosahedron
// This is a manual mapping for visual plausibility
const phi = (1 + Math.sqrt(5)) / 2;
const D20_FACES = [
    // Top Cap (5 faces)
    { val: 20, pos: [0, 1, phi], rot: [0.5, 0, 0] }, // Top-most
    { val: 19, pos: [0, 1, -phi], rot: [-0.5, Math.PI, 0] },
    // ... Filling all 20 is math-heavy. We'll implement a procedural placement approach if possible,
    // or just map the most visible ones (Crit/Fail) and scatter the rest for effect.
    // Actually, let's use a clever trick: Render the Icosahedron and place text at vertex/face centers?
];

// Simplified Text Component
const DiceFaceText = ({ value, position, rotation, color = "white", scale = 1 }) => (
    <Text
        position={position}
        rotation={rotation}
        fontSize={0.5 * scale}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://unpkg.com/@fontsource/cinzel@5.0.8/files/cinzel-latin-400-normal.woff" // Fallback to unpkg if local fails
        characters="0123456789"
    >
        {value}
    </Text>
);

// --- MATERIALS ---
const GemMaterial = ({ color }) => (
    <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.6}
        emissive={color}
        emissiveIntensity={0.2}
    />
);

const GoldInlayMaterial = <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />;

// --- DICE MESH COMPONENT ---
const DiceMesh = ({ type, color, resultValue, isSettled }) => {
    const radius = 1.3;

    // Position of the "Result" face - always on top [0, radius, 0] or front [0, 0, radius]
    // We'll use [0, 0, radius] (front) and rotate the group to show it
    const resultFace = (
        <DiceFaceText
            value={resultValue}
            position={[0, 0, radius + 0.05]}
            rotation={[0, 0, 0]}
            color={resultValue === 1 ? "#ff4444" : (resultValue >= 18 || resultValue === 100 ? "#FFD700" : "white")}
            scale={1.2}
        />
    );

    // D20 Logic
    if (type === 'd20') {
        return (
            <mesh castShadow receiveShadow>
                <icosahedronGeometry args={[radius, 0]} />
                <GemMaterial color={color} />
                {resultFace}
                {/* Decorative faces to fill the shape */}
                <DiceFaceText value="1" position={[-0.8, -0.8, -1]} rotation={[0, Math.PI, 0]} color="#444" scale={0.5} />
                <DiceFaceText value="20" position={[0.8, 0.8, -1]} rotation={[0, Math.PI, 0]} color="#444" scale={0.5} />
            </mesh>
        );
    }

    // D100 Logic (Aether Tier)
    if (type === 'd100') {
        return (
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[radius, 32, 32]} />
                <GemMaterial color={color} />
                {resultFace}
                <DiceFaceText value="100" position={[0, -radius, 0]} rotation={[Math.PI / 2, 0, 0]} color="#444" scale={0.6} />
            </mesh>
        );
    }

    // Default Fallback
    return (
        <mesh castShadow receiveShadow>
            {type === 'd12' ? <dodecahedronGeometry args={[radius, 0]} /> :
                type === 'd10' ? <octahedronGeometry args={[radius, 0]} /> :
                    type === 'd8' ? <octahedronGeometry args={[radius, 0]} /> :
                        type === 'd4' ? <tetrahedronGeometry args={[radius, 0]} /> :
                            <icosahedronGeometry args={[radius, 0]} />}
            <GemMaterial color={color} />
            {resultFace}
        </mesh>
    );
};

// --- PARTICLE SYSTEMS ---
const MagicParticles = ({ isRolling, color }) => {
    return (
        <group>
            {/* Aetherial dust */}
            <Sparkles
                count={40}
                scale={isRolling ? 3 : 4}
                size={isRolling ? 2 : 1}
                speed={isRolling ? 2 : 0.2}
                opacity={0.5}
                color={color}
            />
        </group>
    );
};


// --- MAIN COMPONENT ---
export const Dice3D = ({ type = 'd20', value, onComplete, autoRoll = true }) => {
    const meshRef = useRef();
    const groupRef = useRef();
    const [isRolling, setIsRolling] = useState(autoRoll);
    const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
    const [rotationVel, setRotationVel] = useState({ x: 0, y: 0, z: 0 });
    const rollTimeRef = useRef(0);

    const diceColor = useMemo(() => {
        switch (type) {
            case 'd20': return '#cd7f32'; // Bronze (Novice)
            case 'd50': return '#c0c0c0'; // Silver (Exp)
            case 'd75': return '#ffd700'; // Gold (Veteran)
            case 'd100': return '#7b2ff7'; // Aether Purple (Master)
            case 'd12': return '#a3c2ff';
            case 'd10': return '#ff8da1';
            case 'd8': return '#c4a3ff';
            case 'd6': return '#98ff98';
            default: return '#FFD700';
        }
    }, [type]);

    useEffect(() => {
        if (autoRoll) {
            // Strong initial throw
            setVelocity({
                x: (Math.random() - 0.5) * 0.8,
                y: (Math.random() * 0.5) + 0.2,
                z: (Math.random() - 0.5) * 0.8
            });
            setRotationVel({
                x: Math.random() * 10,
                y: Math.random() * 10,
                z: Math.random() * 10
            });
            rollTimeRef.current = 0;
        }
    }, [autoRoll]);

    useFrame((state, delta) => {
        if (!groupRef.current || !isRolling) return;

        rollTimeRef.current += delta;
        const time = rollTimeRef.current;

        // Physics Simulation
        if (time < 3.0) { // Slightly longer roll for gravity to settle
            // Decay
            const damping = 0.992; // Less dampening for more bounces
            const gravity = 0.015;

            setVelocity(v => {
                let ny = v.y - gravity;
                let nx = v.x * damping;
                let nz = v.z * damping;

                // Floor bounce (Y = -1.5 as board surface)
                if (groupRef.current.position.y < -1.5) {
                    groupRef.current.position.y = -1.5;
                    ny = Math.abs(ny) * 0.45; // Bounce energy loss
                    nx *= 0.8; // Friction on bounce
                    nz *= 0.8;
                }

                return { x: nx, y: ny, z: nz };
            });

            setRotationVel(v => ({ x: v.x * damping, y: v.y * damping, z: v.z * damping }));

            // Apply Move
            groupRef.current.position.x += velocity.x;
            groupRef.current.position.y += velocity.y;
            groupRef.current.position.z += velocity.z;

            // Apply Rotate
            groupRef.current.rotation.x += rotationVel.x * delta;
            groupRef.current.rotation.y += rotationVel.y * delta;
            groupRef.current.rotation.z += rotationVel.z * delta;

        } else if (isRolling) {
            // Settle and Snap rotation to target the camera
            // We want the face at [0, 0, radius] to point towards the camera [0, 8, 12]
            // For simplicity, we'll just snap it to a fixed "winning" rotation
            groupRef.current.rotation.set(-0.5, 0, 0); // Slight tilt to face camera
            setIsRolling(false);
            if (onComplete) onComplete(value);
        }
    });

    return (
        <group ref={groupRef} position={[0, 5, 0]}> {/* Even higher start */}
            <DiceMesh type={type} color={diceColor} resultValue={value} isSettled={!isRolling} />
            <MagicParticles isRolling={isRolling} color={diceColor} />
            <pointLight distance={5} intensity={isRolling ? 1.5 : 0.8} color={diceColor} />
        </group>
    );
};

// --- DICE BOARD OVERLAY ---
export const DiceOverlay = ({ diceRolls = [], onAllComplete }) => {
    const [completedCount, setCompletedCount] = useState(0);

    const handleComplete = () => {
        setCompletedCount(prev => {
            const next = prev + 1;
            if (next === diceRolls.length && onAllComplete) {
                setTimeout(onAllComplete, 1000);
            }
            return next;
        });
    };

    if (diceRolls.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 11000,
            pointerEvents: 'none', // Allow clicking through to UI
            background: 'rgba(0,0,0,0.1)' // Very subtle dim
        }}>
            <Canvas shadows gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 10, 15]} fov={35} />
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 20, 10]} intensity={2} castShadow />
                <spotLight position={[-10, 20, -10]} intensity={1} color="#a3c2ff" />
                <Environment preset="night" />

                {/* The Board/Shadow catcher */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial transparent opacity={0.2} color="#000" />
                </mesh>

                {diceRolls.map((roll, i) => (
                    <group key={i} position={[(i - (diceRolls.length - 1) / 2) * 3, 0, 0]}>
                        <Dice3D
                            type={roll.type}
                            value={roll.value}
                            onComplete={handleComplete}
                            autoRoll={true}
                        />
                    </group>
                ))}

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} />
            </Canvas>
        </div>
    );
};

export const DiceRollScene = ({ diceType, value, onComplete }) => {
    return (
        <div style={{
            width: '320px',
            height: '320px',
            position: 'relative',
            background: 'radial-gradient(circle at center, #1a1a2e 0%, #000000 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 0 50px rgba(0,0,0,0.8)',
            overflow: 'hidden'
        }}>
            <Canvas shadows gl={{ antialias: true, toneMappingExposure: 1.2 }}>
                <PerspectiveCamera makeDefault position={[0, 4, 6]} fov={35} />

                {/* Cinematic Lighting */}
                <ambientLight intensity={0.2} />
                <spotLight
                    position={[5, 10, 5]}
                    angle={0.4}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    color="#ffd700"
                />
                <spotLight
                    position={[-5, 2, -5]}
                    angle={0.5}
                    intensity={1.5}
                    color="#4a90e2"
                />
                <Environment preset="city" />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Dice3D type={diceType} value={value} onComplete={onComplete} />
                </Float>

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} />
            </Canvas>

            {/* UI Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                width: '100%',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <div style={{
                    fontSize: '4rem',
                    fontFamily: 'serif',
                    color: '#FFD700',
                    textShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
                    fontWeight: 'bold',
                    opacity: value ? 1 : 0,
                    transform: value ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    {value}
                </div>
            </div>
        </div>
    );
};
