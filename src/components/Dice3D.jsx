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
const DiceFaceText = ({ value, position, rotation, color = "#222", scale = 1 }) => (
    <Text
        position={position}
        rotation={rotation}
        fontSize={0.5 * scale}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://unpkg.com/@fontsource/cinzel@5.0.8/files/cinzel-latin-700-normal.woff" // Thicker font
        characters="0123456789"
    >
        {value}
    </Text>
);

// --- MATERIALS ---
const MetalMaterial = ({ color, flatShading = false }) => (
    <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={1}
        flatShading={flatShading}
        envMapIntensity={1.5}
    />
);

const GoldInlayMaterial = <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />;

// --- D10 GEOMETRY DATA ---
const createD10Geometry = (radius) => {
    // Pentagonal Trapezohedron approximation
    const vertices = [];
    const h = radius * 1.2;
    const r = radius;
    const offset = Math.PI / 5;

    // Poles
    vertices.push(0, h, 0); // 0: Top
    vertices.push(0, -h, 0); // 1: Bottom

    // Upper ring
    for (let i = 0; i < 5; i++) {
        const phi = (i * 2 * Math.PI) / 5;
        vertices.push(r * Math.cos(phi), 0.2 * h, r * Math.sin(phi));
    }
    // Lower ring
    for (let i = 0; i < 5; i++) {
        const phi = (i * 2 * Math.PI) / 5 + offset;
        vertices.push(r * Math.cos(phi), -0.2 * h, r * Math.sin(phi));
    }

    const indices = [
        // Top cap
        0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 2,
        // Bottom cap
        1, 8, 7, 1, 9, 8, 1, 10, 9, 1, 11, 10, 1, 7, 11,
        // Middle band (triangles connecting rings)
        2, 7, 3, 3, 7, 8, 3, 8, 4, 4, 8, 9, 4, 9, 5, 5, 9, 10, 5, 10, 6, 6, 10, 11, 6, 11, 2, 2, 11, 7
    ];

    const geo = new THREE.PolyhedronGeometry(vertices, indices, radius, 0);
    return geo;
};

// --- DICE MESH COMPONENT ---
const DiceMesh = ({ type, color, resultValue, isSettled }) => {
    const radius = 0.75; // Base radius for all dice

    const d10Geometry = useMemo(() => createD10Geometry(radius), [radius]);

    // Geometry selection based on type
    let geometry;
    let flatShading = false;
    let textOffset = radius + 0.05;

    switch (type) {
        case 'd4':
            geometry = <tetrahedronGeometry args={[radius, 0]} />;
            textOffset = radius * 0.4; // Text sits deeper on D4 surface
            break;
        case 'd6':
            // Perfect Cube for D6
            const boxSize = radius * 1.1;
            geometry = <boxGeometry args={[boxSize, boxSize, boxSize]} />;
            textOffset = (boxSize / 2) + 0.02;
            break;
        case 'd8':
            geometry = <octahedronGeometry args={[radius, 0]} />;
            textOffset = radius * 0.6;
            break;
        case 'd10':
            geometry = d10Geometry;
            flatShading = true;
            textOffset = radius * 0.7;
            break;
        case 'd12':
            geometry = <dodecahedronGeometry args={[radius, 0]} />;
            textOffset = radius * 0.85;
            break;
        case 'd20':
            geometry = <icosahedronGeometry args={[radius, 0]} />;
            textOffset = radius * 0.9;
            break;
        case 'd100':
        case 'd75':
        case 'd50':
            // High-poly sphere but with flat shading to show facets
            geometry = <icosahedronGeometry args={[radius, 2]} />;
            flatShading = true;
            textOffset = radius * 0.95;
            break;
        default:
            geometry = <icosahedronGeometry args={[radius, 0]} />;
    }

    const isCritSuccess = resultValue === 20 || (type === 'd100' && resultValue >= 95) || (type === 'd10' && resultValue === 10);
    const isCritFail = resultValue === 1 || (type === 'd100' && resultValue <= 5) || (type === 'd10' && resultValue === 0);

    const resultFace = (
        <DiceFaceText
            value={resultValue}
            position={[0, 0, textOffset]}
            rotation={[0, 0, 0]}
            color={isCritFail ? "#ff0000" : (isCritSuccess ? "#FFD700" : "#222")}
            scale={type === 'd10' ? 0.7 : 0.8}
        />
    );

    return (
        <mesh castShadow receiveShadow geometry={type === 'd10' ? geometry : undefined}>
            {type !== 'd10' && geometry}
            <MetalMaterial color={color} flatShading={flatShading} />
            {resultFace}
            {isSettled && (
                <Sparkles
                    count={isCritSuccess ? 30 : 10}
                    scale={1.2}
                    size={isCritSuccess ? 3 : 1.5}
                    speed={0.5}
                    color={isCritSuccess ? "#FFD700" : color}
                />
            )}
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
        // Metallic colors inspired by the reference image (Antique Silver/Pewter)
        return '#bbbbbb';
    }, [type]);

    const [collisionCount, setCollisionCount] = useState(0);

    useEffect(() => {
        if (autoRoll) {
            // "Hand thrown" feel: Gentle downward and inward velocity
            setVelocity({
                x: (Math.random() - 0.5) * 0.4,
                y: -0.2 - (Math.random() * 0.3), // Initial downward shove
                z: -0.3 - (Math.random() * 0.4)  // Throwing "into" the screen
            });
            setRotationVel({
                x: (Math.random() - 0.5) * 20,
                y: (Math.random() - 0.5) * 20,
                z: (Math.random() - 0.5) * 20
            });
            setCollisionCount(0);
            rollTimeRef.current = 0;
        }
    }, [autoRoll, type]);

    useFrame((state, delta) => {
        if (!groupRef.current || !isRolling) return;

        rollTimeRef.current += delta;
        const time = rollTimeRef.current;

        // Physics Simulation
        if (time < 3.5) { // Slightly longer roll for "heavier" feel
            // Decay
            const damping = 0.99; // Less damping = slides/rolls longer
            const gravity = 0.025;  // Heavier gravity

            setVelocity(v => {
                let ny = v.y - gravity;
                let nx = v.x * damping;
                let nz = v.z * damping;

                // Floor bounce (Y = -1.5 as board surface)
                if (groupRef.current.position.y < -1.5) {
                    groupRef.current.position.y = -1.5;

                    // Only bounce if falling fast enough
                    if (Math.abs(ny) > 0.05) {
                        ny = Math.abs(ny) * 0.4; // Controlled bounce
                        setCollisionCount(c => c + 1);
                    } else {
                        ny = 0;
                    }

                    nx *= 0.7; // Slide friction
                    nz *= 0.7;
                }

                return { x: nx, y: ny, z: nz };
            });

            setRotationVel(v => ({
                x: v.x * damping,
                y: v.y * damping,
                z: v.z * damping
            }));

            // Apply Move
            groupRef.current.position.x += velocity.x;
            groupRef.current.position.y += velocity.y;
            groupRef.current.position.z += velocity.z;

            // Apply Rotate
            groupRef.current.rotation.x += rotationVel.x * delta;
            groupRef.current.rotation.y += rotationVel.y * delta;
            groupRef.current.rotation.z += rotationVel.z * delta;

        } else if (isRolling) {
            // Settle and Interpolate rotation to target the camera
            const targetRotation = new THREE.Euler(-0.5, 0, 0);

            // Smoothly lerp rotation and position for final snap
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.x, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.y, 0.1);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotation.z, 0.1);

            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1.5, 0.1);

            // Once close enough, finish
            if (Math.abs(groupRef.current.rotation.x - targetRotation.x) < 0.01) {
                groupRef.current.rotation.set(-0.5, 0, 0);
                groupRef.current.position.y = -1.5;
                setIsRolling(false);
                if (onComplete) onComplete(value);
            }
        }
    });

    return (
        <group ref={groupRef} position={[0, 10, 0]}> {/* Higher start for "falling" effect */}
            <DiceMesh type={type} color={diceColor} resultValue={value} isSettled={!isRolling} />
            <MagicParticles isRolling={isRolling} color={diceColor} />
            <pointLight distance={5} intensity={isRolling ? 1.5 : 0.8} color={diceColor} />
        </group>
    );
};

// --- DICE BOARD OVERLAY ---
export const DiceOverlay = ({ diceRolls = [], onAllComplete }) => {
    const [completedCount, setCompletedCount] = useState(0);
    const [showFinalResults, setShowFinalResults] = useState(false);

    const totalNatural = useMemo(() => {
        return diceRolls.reduce((acc, roll) => acc + (roll.value || 0), 0);
    }, [diceRolls]);

    const isCritSuccess = useMemo(() => {
        if (diceRolls.length === 1) {
            const r = diceRolls[0];
            return r.value === 20 || (r.type === 'd100' && r.value >= 95);
        }
        return false;
    }, [diceRolls]);

    const isCritFail = useMemo(() => {
        if (diceRolls.length === 1) {
            const r = diceRolls[0];
            return r.value === 1 || (r.type === 'd100' && r.value <= 5);
        }
        return false;
    }, [diceRolls]);

    if (diceRolls.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 11000,
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.1)'
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

                {(() => {
                    const expandedDice = diceRolls.flatMap((roll, i) => {
                        if (roll.type === 'd100') {
                            const finalTens = roll.value === 100 ? "00" : (Math.floor(roll.value / 10) * 10);
                            const finalUnits = roll.value % 10;
                            return [
                                { type: 'd10', value: finalTens, key: `${i}-tens`, offset: -1.7 },
                                { type: 'd10', value: finalUnits, key: `${i}-units`, offset: 1.7 }
                            ];
                        }
                        return [{ ...roll, key: i, offset: 0 }];
                    });

                    const totalDiceCount = expandedDice.length;
                    const onDiceComplete = () => {
                        setCompletedCount(prev => {
                            const next = prev + 1;
                            if (next === totalDiceCount) {
                                setShowFinalResults(true);
                                if (onAllComplete) {
                                    setTimeout(onAllComplete, 1500);
                                }
                            }
                            return next;
                        });
                    };

                    return expandedDice.map((d, idx) => (
                        <group key={d.key} position={[((idx - (totalDiceCount - 1) / 2) * 5) + d.offset, 0, 0]}>
                            <Dice3D type={d.type} value={d.value} onComplete={onDiceComplete} autoRoll={true} />
                        </group>
                    ));
                })()}

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} />
            </Canvas>

            {/* Results UI Overlay */}
            {showFinalResults && (
                <div className="dice-result-overlay">
                    <div className="dice-result-card">
                        <span className="dice-result-label">Résultat Naturel</span>
                        <div className={`dice-result-val ${isCritSuccess ? 'dice-crit-success' : ''} ${isCritFail ? 'dice-crit-fail' : ''}`}>
                            {totalNatural}
                        </div>
                        {isCritSuccess && <span className="dice-result-label dice-crit-success">Réussite Critique !</span>}
                        {isCritFail && <span className="dice-result-label dice-crit-fail">Échec Critique...</span>}
                    </div>
                </div>
            )}
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
