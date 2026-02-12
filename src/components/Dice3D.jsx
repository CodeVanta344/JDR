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
    <meshPhysicalMaterial
        color={color}
        transmission={0.6} // Glass-like
        thickness={1.5}    // Refraction depth
        roughness={0.1}    // Polish
        metalness={0.1}    // Slight metallic shine
        ior={1.5}          // Index of Refraction (Gemstone)
        emissive={color}
        emissiveIntensity={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        bgToneMapping={1}
    />
);

const GoldInlayMaterial = <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />;

// --- DICE MESH COMPONENT ---
const DiceMesh = ({ type, color }) => {
    // D20 Logic
    if (type === 'd20') {
        const radius = 1.2;
        return (
            <mesh castShadow receiveShadow>
                <icosahedronGeometry args={[radius, 0]} />
                <GemMaterial color={color} />

                <DiceFaceText value="20" position={[0.4, 0.4, 1.05]} rotation={[0.4, -0.2, 0.1]} color="#FFD700" scale={0.6} />
                <DiceFaceText value="1" position={[-0.4, -0.4, -1.05]} rotation={[0, Math.PI, 0]} color="#ff4444" scale={0.6} />
                <DiceFaceText value="19" position={[-0.8, 0.5, 0.5]} rotation={[0.7, 0.6, -0.2]} color="white" scale={0.5} />
                <DiceFaceText value="2" position={[0.8, -0.5, 0.5]} rotation={[-0.5, -0.6, 0]} color="white" scale={0.5} />

                {/* Additional numbers for fullness */}
                <DiceFaceText value="18" position={[0, 1.1, 0.2]} rotation={[-Math.PI / 2, 0, 0]} color="white" scale={0.5} />
                <DiceFaceText value="3" position={[0, -1.1, -0.2]} rotation={[Math.PI / 2, 0, 0]} color="white" scale={0.5} />
                <DiceFaceText value="10" position={[1.1, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="white" scale={0.5} />
                <DiceFaceText value="11" position={[-1.1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color="white" scale={0.5} />
                <DiceFaceText value="15" position={[0.5, 0.5, -0.8]} rotation={[0, Math.PI, 0]} color="white" scale={0.5} />
                <DiceFaceText value="6" position={[-0.5, -0.5, 0.8]} rotation={[0, 0, 0]} color="white" scale={0.5} />
            </mesh>
        );
    }

    // D6 Logic
    if (type === 'd6') {
        return (
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 2, 2]} />
                <GemMaterial color={color} />
                {D6_FACES.map((f, i) => (
                    <DiceFaceText
                        key={i}
                        value={f.val}
                        position={f.pos}
                        rotation={f.rot}
                        color={f.val === 6 ? '#FFD700' : (f.val === 1 ? '#ff4444' : 'white')}
                    />
                ))}
            </mesh>
        );
    }

    // Default Fallback
    return (
        <mesh castShadow receiveShadow>
            {type === 'd12' ? <dodecahedronGeometry args={[1.1, 0]} /> :
                type === 'd10' ? <octahedronGeometry args={[1.2, 0]} /> :
                    type === 'd8' ? <octahedronGeometry args={[1.2, 0]} /> :
                        type === 'd4' ? <tetrahedronGeometry args={[1.3, 0]} /> :
                            <icosahedronGeometry args={[1.2, 0]} />}
            <GemMaterial color={color} />
            <DiceFaceText value={type.toUpperCase()} position={[0, 0, 1.1]} rotation={[0, 0, 0]} />
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
            case 'd20': return '#FFD700'; // Gold
            case 'd12': return '#a3c2ff'; // Blueish
            case 'd10': return '#ff8da1'; // Reddish
            case 'd8': return '#c4a3ff';  // Purple
            case 'd6': return '#98ff98';  // Green
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
        if (time < 2.0) {
            // Decay
            const damping = 0.98;
            setVelocity(v => ({ x: v.x * damping, y: v.y - 0.02, z: v.z * damping })); // Gravity
            setRotationVel(v => ({ x: v.x * damping, y: v.y * damping, z: v.z * damping }));

            // Apply Move
            groupRef.current.position.x += velocity.x;
            groupRef.current.position.y += velocity.y;
            groupRef.current.position.z += velocity.z;

            // Apply Rotate
            groupRef.current.rotation.x += rotationVel.x * delta;
            groupRef.current.rotation.y += rotationVel.y * delta;
            groupRef.current.rotation.z += rotationVel.z * delta;

            // Simple floor bounce
            if (groupRef.current.position.y < -1) {
                groupRef.current.position.y = -1;
                setVelocity(v => ({ ...v, y: Math.abs(v.y) * 0.6 })); // Bounce
            }
        } else {
            // Settle to final face
            setIsRolling(false);

            // Snap to show the result "face up" cleanly
            // For now, we just reset rotation to 0 and show the text
            // In a pro version, we would lerp to the exact quaternion of the result face
            groupRef.current.rotation.set(0, 0, 0);
            groupRef.current.position.set(0, 0, 0);

            if (onComplete) onComplete(value);
        }
    });

    return (
        <group ref={groupRef}>
            <DiceMesh type={type} color={diceColor} />
            <MagicParticles isRolling={isRolling} color={diceColor} />

            {/* Inner Glow light */}
            <pointLight distance={3} intensity={0.5} color={diceColor} />
        </group>
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
