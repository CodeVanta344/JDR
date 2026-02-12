import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { Dice3D } from './Dice3D';

/**
 * DieVisual Component (3D Upgrade)
 * Renders an animated 3D die using Dice3D inside a self-contained Canvas.
 */
export const DieVisual = ({ type = 'd20', value, onComplete, isResult = false }) => {
    // Determine size based on type or props (defaulting to standard container)
    // The parent controls the container size, this adapts to it.

    return (
        <div className="die-visual-3d-wrapper" style={{
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
        }}>
            <Canvas gl={{ alpha: true, antialias: true }} style={{ width: '100%', height: '100%' }}>
                <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={40} />
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 10, 5]} angle={0.5} intensity={1} />
                <pointLight position={[-5, -5, 5]} intensity={0.5} color="blue" />
                <Environment preset="city" />

                <Suspense fallback={null}>
                    {/* Add Float for lively idle state if it's a result */}
                    {isResult ? (
                        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                            <Dice3D type={type} value={value} onComplete={onComplete} autoRoll={!isResult} />
                        </Float>
                    ) : (
                        <Dice3D type={type} value={value} onComplete={onComplete} autoRoll={true} />
                    )}
                </Suspense>
            </Canvas>

            {/* Fallback/Overlay for value if needed, but Dice3D handles text now. 
                We might keep a small label if needed for accessibility or clarity? 
                No, the 3D text should be enough.
            */}
        </div>
    );
};
