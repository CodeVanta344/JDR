import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Text, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// --- ENHANCED MATERIALS ---
const createDiceMaterial = (color, metalness = 1.0, roughness = 0.15, clearcoat = 0.8) => {
    return (
        <meshPhysicalMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            clearcoat={clearcoat}
            clearcoatRoughness={0.1}
            reflectivity={1}
            envMapIntensity={1.2}
            side={THREE.DoubleSide}
        />
    );
};

const GoldMaterial = ({ color = "#FFD700" }) => createDiceMaterial(color, 1.0, 0.1, 1.0);
const SilverMaterial = ({ color = "#C0C0C0" }) => createDiceMaterial(color, 1.0, 0.15, 0.9);
const BronzeMaterial = ({ color = "#CD7F32" }) => createDiceMaterial(color, 0.9, 0.2, 0.8);

// --- ENHANCED DICE FACE TEXT ---
const DiceFaceText = ({ value, position, rotation, color = "#1a1a1a", scale = 1, type = 'd20' }) => {
    const isCrit = value === 20 || value === '00' || value >= 90;
    const isFail = value === 1 || value === 0;
    
    const textColor = isFail ? "#8B0000" : isCrit ? "#B8860B" : color;
    const emissive = isFail ? "#ff0000" : isCrit ? "#ffd700" : "#000000";
    const emissiveIntensity = (isCrit || isFail) ? 0.3 : 0;

    return (
        <group position={position} rotation={rotation}>
            {/* Main number */}
            <Text
                fontSize={0.55 * scale}
                color={textColor}
                anchorX="center"
                anchorY="middle"
                characters="0123456789"
                outlineWidth={0.02}
                outlineColor="#000000"
            >
                {value}
                <meshStandardMaterial
                    color={textColor}
                    emissive={emissive}
                    emissiveIntensity={emissiveIntensity}
                    metalness={0.5}
                    roughness={0.3}
                />
            </Text>
            {/* Embossed shadow layer for depth */}
            <Text
                position={[0.01, -0.01, -0.02]}
                fontSize={0.55 * scale}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                characters="0123456789"
                opacity={0.4}
            >
                {value}
            </Text>
        </group>
    );
};

// --- ENHANCED D10 GEOMETRY ---
const createD10Geometry = (radius) => {
    const vertices = [];
    const h = radius * 1.15;
    const r = radius * 0.9;
    const offset = Math.PI / 5;

    vertices.push(0, h, 0);
    vertices.push(0, -h, 0);

    for (let i = 0; i < 5; i++) {
        const phi = (i * 2 * Math.PI) / 5;
        vertices.push(r * Math.cos(phi), 0.15 * h, r * Math.sin(phi));
    }
    for (let i = 0; i < 5; i++) {
        const phi = (i * 2 * Math.PI) / 5 + offset;
        vertices.push(r * Math.cos(phi), -0.15 * h, r * Math.sin(phi));
    }

    const indices = [
        0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 2,
        1, 8, 7, 1, 9, 8, 1, 10, 9, 1, 11, 10, 1, 7, 11,
        2, 7, 3, 3, 7, 8, 3, 8, 4, 4, 8, 9, 4, 9, 5, 5, 9, 10, 5, 10, 6, 6, 10, 11, 6, 11, 2, 2, 11, 7
    ];

    const geo = new THREE.PolyhedronGeometry(vertices, indices, radius, 1);
    return geo;
};

// --- ENHANCED DICE MESH ---
const DiceMesh = ({ type, color, resultValue, isSettled }) => {
    const radius = 0.85;
    const d10Geometry = useMemo(() => createD10Geometry(radius), [radius]);

    let geometry;
    let textOffset = radius + 0.08;
    let needsFlatShading = false;

    switch (type) {
        case 'd4':
            geometry = <tetrahedronGeometry args={[radius, 1]} />;
            textOffset = radius * 0.35;
            break;
        case 'd6':
            const boxSize = radius * 1.2;
            geometry = <boxGeometry args={[boxSize, boxSize, boxSize]} />;
            textOffset = (boxSize / 2) + 0.05;
            break;
        case 'd8':
            geometry = <octahedronGeometry args={[radius, 1]} />;
            textOffset = radius * 0.55;
            needsFlatShading = true;
            break;
        case 'd10':
            geometry = d10Geometry;
            textOffset = radius * 0.65;
            needsFlatShading = true;
            break;
        case 'd12':
            geometry = <dodecahedronGeometry args={[radius, 1]} />;
            textOffset = radius * 0.8;
            break;
        case 'd20':
            geometry = <icosahedronGeometry args={[radius, 1]} />;
            textOffset = radius * 0.85;
            break;
        case 'd100':
        case 'd75':
        case 'd50':
            geometry = <icosahedronGeometry args={[radius, 3]} />;
            needsFlatShading = true;
            textOffset = radius * 0.92;
            break;
        default:
            geometry = <icosahedronGeometry args={[radius, 1]} />;
    }

    const isCritSuccess = resultValue === 20 || (type === 'd100' && resultValue >= 95) || (type === 'd10' && resultValue === 10) || (type === 'd10' && resultValue === 0);
    const isCritFail = resultValue === 1 || (type === 'd100' && resultValue <= 5);

    // Create proper material for the mesh
    const diceMaterial = useMemo(() => {
        return new THREE.MeshPhysicalMaterial({
            color: color,
            metalness: 1.0,
            roughness: 0.15,
            clearcoat: 0.8,
            clearcoatRoughness: 0.1,
            reflectivity: 1,
            envMapIntensity: 1.2,
            flatShading: needsFlatShading
        });
    }, [color, needsFlatShading]);

    return (
        <group>
            <mesh castShadow receiveShadow geometry={type === 'd10' ? geometry : undefined} material={diceMaterial}>
                {type !== 'd10' && geometry}
            </mesh>
            <DiceFaceText
                value={resultValue}
                position={[0, 0, textOffset]}
                rotation={[0, 0, 0]}
                scale={type === 'd10' ? 0.65 : 0.75}
                type={type}
            />
            {isSettled && (
                <>
                    <Sparkles
                        count={isCritSuccess ? 24 : 10}
                        scale={1.5}
                        size={isCritSuccess ? 4 : 2}
                        speed={isCritSuccess ? 1.5 : 0.8}
                        color={isCritSuccess ? "#FFD700" : "#ffffff"}
                    />
                    {isCritSuccess && (
                        <pointLight
                            distance={8}
                            intensity={2}
                            color="#FFD700"
                        />
                    )}
                </>
            )}
        </group>
    );
};

// --- ENHANCED PARTICLES ---
const MagicParticles = ({ isRolling, color }) => {
    return (
        <group>
            <Sparkles
                count={12}
                scale={isRolling ? 3 : 4}
                size={isRolling ? 2 : 1}
                speed={isRolling ? 1.5 : 0.3}
                color={color}
                opacity={isRolling ? 0.8 : 0.2}
            />
        </group>
    );
};

// --- MAIN DICE COMPONENT ---
export const Dice3D = ({ type = 'd20', value, onComplete, autoRoll = true }) => {
    const groupRef = useRef();
    const [isRolling, setIsRolling] = useState(autoRoll);
    const velocityRef = useRef({ x: 0, y: 0, z: 0 });
    const rotationVelRef = useRef({ x: 0, y: 0, z: 0 });
    const rollTimeRef = useRef(0);

    const diceColor = useMemo(() => {
        switch (type) {
            case 'd4':
            case 'd6':
                return '#D4AF37';
            case 'd8':
            case 'd10':
                return '#C0C0C0';
            case 'd12':
            case 'd20':
                return '#B87333';
            default:
                return '#D4AF37';
        }
    }, [type]);

    useEffect(() => {
        if (autoRoll) {
            velocityRef.current = {
                x: (Math.random() - 0.5) * 0.5,
                y: -0.25 - (Math.random() * 0.35),
                z: -0.4 - (Math.random() * 0.5)
            };
            rotationVelRef.current = {
                x: (Math.random() - 0.5) * 25,
                y: (Math.random() - 0.5) * 25,
                z: (Math.random() - 0.5) * 25
            };
            rollTimeRef.current = 0;
        }
    }, [autoRoll, type]);

    useFrame((state, delta) => {
        if (!groupRef.current || !isRolling) return;

        rollTimeRef.current += delta;
        const time = rollTimeRef.current;
        const damping = 0.985;
        const gravity = 0.03;

        if (time < 3.5) {
            // Update velocity directly without React state
            let ny = velocityRef.current.y - gravity;
            let nx = velocityRef.current.x * damping;
            let nz = velocityRef.current.z * damping;

            if (groupRef.current.position.y < -1.8) {
                groupRef.current.position.y = -1.8;
                if (Math.abs(ny) > 0.05) {
                    ny = Math.abs(ny) * 0.45;
                } else {
                    ny = 0;
                }
                nx *= 0.75;
                nz *= 0.75;
            }

            velocityRef.current = { x: nx, y: ny, z: nz };

            rotationVelRef.current = {
                x: rotationVelRef.current.x * damping,
                y: rotationVelRef.current.y * damping,
                z: rotationVelRef.current.z * damping
            };

            groupRef.current.position.x += velocityRef.current.x;
            groupRef.current.position.y += velocityRef.current.y;
            groupRef.current.position.z += velocityRef.current.z;

            groupRef.current.rotation.x += rotationVelRef.current.x * delta;
            groupRef.current.rotation.y += rotationVelRef.current.y * delta;
            groupRef.current.rotation.z += rotationVelRef.current.z * delta;

        } else {
            const targetRotation = new THREE.Euler(-0.4, 0, 0);
            
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.x, 0.12);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.y, 0.12);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotation.z, 0.12);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1.8, 0.12);

            if (Math.abs(groupRef.current.rotation.x - targetRotation.x) < 0.015) {
                groupRef.current.rotation.set(-0.4, 0, 0);
                groupRef.current.position.y = -1.8;
                setIsRolling(false);
                if (onComplete) onComplete(value);
            }
        }
    });

    return (
        <group ref={groupRef} position={[0, 12, 0]}>
            <DiceMesh type={type} color={diceColor} resultValue={value} isSettled={!isRolling} />
            <MagicParticles isRolling={isRolling} color={diceColor} />
        </group>
    );
};

// --- ENHANCED DICE BOARD OVERLAY ---
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
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)'
        }}>
            <Canvas 
                shadows 
                dpr={[1, 1.25]}
                gl={{ 
                    antialias: false,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    powerPreference: 'high-performance'
                }}
                style={{ width: '100%', height: '100%' }}
            >
                <PerspectiveCamera makeDefault position={[0, 6, 10]} fov={36} />
                
                <ambientLight intensity={0.4} color="#ffffff" />
                <hemisphereLight intensity={0.3} groundColor="#000000" color="#4a90e2" />
                
                <spotLight 
                    position={[6, 12, 6]} 
                    intensity={1.5} 
                    castShadow 
                    color="#fff8e7"
                    angle={0.5}
                    penumbra={0.5}
                    shadow-mapSize={1024}
                />
                
                <Environment preset="apartment" />

                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial 
                        transparent 
                        opacity={0.2} 
                        color="#000000"
                        roughness={0.8}
                    />
                </mesh>

                {(() => {
                    const expandedDice = diceRolls.flatMap((roll, i) => {
                        if (roll.type === 'd100') {
                            const finalTens = roll.value === 100 ? "00" : (Math.floor(roll.value / 10) * 10);
                            const finalUnits = roll.value % 10;
                            return [
                                { type: 'd10', value: finalTens, key: `${i}-tens`, offset: -1.8 },
                                { type: 'd10', value: finalUnits, key: `${i}-units`, offset: 1.8 }
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
                                    setTimeout(onAllComplete, 1200);
                                }
                            }
                            return next;
                        });
                    };

                    return expandedDice.map((d, idx) => (
                        <group key={d.key} position={[((idx - (totalDiceCount - 1) / 2) * 3.8) + d.offset, 0, 0]}>
                            <Dice3D type={d.type} value={d.value} onComplete={onDiceComplete} autoRoll={true} />
                        </group>
                    ));
                })()}

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} />
            </Canvas>

            {showFinalResults && (
                <div style={{
                    position: 'fixed',
                    bottom: '12%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    pointerEvents: 'none'
                }}>
                    <div style={{
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(20,20,30,0.92) 100%)',
                        border: `1.5px solid ${isCritSuccess ? '#FFD700' : isCritFail ? '#ff4444' : 'rgba(212,175,55,0.4)'}`,
                        borderRadius: '12px',
                        padding: '1.25rem 2rem',
                        boxShadow: isCritSuccess 
                            ? '0 0 40px rgba(255,215,0,0.4), inset 0 0 20px rgba(255,215,0,0.08)' 
                            : isCritFail 
                                ? '0 0 40px rgba(255,68,68,0.3), inset 0 0 20px rgba(255,68,68,0.08)'
                                : '0 0 30px rgba(0,0,0,0.4)'
                    }}>
                        <div style={{ 
                            fontSize: '0.75rem', 
                            color: '#888', 
                            textTransform: 'uppercase', 
                            letterSpacing: '3px',
                            marginBottom: '0.5rem'
                        }}>
                            Résultat
                        </div>
                        <div style={{
                            fontSize: '3.5rem',
                            fontWeight: '800',
                            color: isCritSuccess ? '#FFD700' : isCritFail ? '#ff4444' : '#fff',
                            textShadow: isCritSuccess 
                                ? '0 0 30px rgba(255,215,0,0.6)' 
                                : isCritFail 
                                    ? '0 0 30px rgba(255,68,68,0.4)'
                                    : '0 0 15px rgba(255,255,255,0.2)',
                            fontFamily: '"Cinzel Decorative", serif'
                        }}>
                            {totalNatural}
                        </div>
                        {isCritSuccess && (
                            <div style={{ 
                                fontSize: '0.95rem', 
                                color: '#FFD700', 
                                marginTop: '0.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px'
                            }}>
                                Réussite Critique!
                            </div>
                        )}
                        {isCritFail && (
                            <div style={{ 
                                fontSize: '0.95rem', 
                                color: '#ff4444', 
                                marginTop: '0.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px'
                            }}>
                                Échec Critique...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export const DiceRollScene = ({ diceType, value, onComplete }) => {
    return (
        <div style={{
            width: '280px',
            height: '280px',
            position: 'relative',
            background: 'radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a1a 50%, #000000 100%)',
            borderRadius: '20px',
            border: '1.5px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.15), inset 0 0 20px rgba(0,0,0,0.5)',
            overflow: 'hidden'
        }}>
            <Canvas 
                shadows 
                dpr={[1, 1.25]}
                gl={{ 
                    antialias: false,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.1,
                    powerPreference: 'high-performance'
                }}
                style={{ width: '100%', height: '100%' }}
            >
                <PerspectiveCamera makeDefault position={[0, 2.5, 6]} fov={36} />

                <ambientLight intensity={0.4} color="#ffffff" />
                <hemisphereLight intensity={0.3} groundColor="#000000" color="#4a90e2" />
                
                <spotLight
                    position={[3, 6, 3]}
                    angle={0.4}
                    penumbra={0.6}
                    intensity={1.5}
                    castShadow
                    color="#fff8e7"
                    shadow-mapSize={512}
                />
                
                <Environment preset="apartment" />

                <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                    <Dice3D type={diceType} value={value} onComplete={onComplete} />
                </Float>

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} />
            </Canvas>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                width: '100%',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <div style={{
                    fontSize: '3.8rem',
                    fontFamily: '"Cinzel Decorative", serif',
                    color: value >= 90 ? '#FFD700' : value <= 10 ? '#ff6b6b' : '#fff',
                    textShadow: value >= 90 
                        ? '0 0 30px rgba(255, 215, 0, 0.6)' 
                        : value <= 10 
                            ? '0 0 30px rgba(255, 107, 107, 0.4)'
                            : '0 0 20px rgba(255, 255, 255, 0.3)',
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
