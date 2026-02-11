import React, { useState, useEffect, useRef } from 'react';

export const ParticleSystem = ({ vfx }) => {
    const [particles, setParticles] = useState([]);
    const frameRef = useRef();

    useEffect(() => {
        if (!vfx) return;

        const count = vfx.count || 10;
        const newParticles = Array.from({ length: count }).map(() => ({
            id: Math.random(),
            x: vfx.x + (Math.random() - 0.5) * (vfx.spread || 50),
            y: vfx.y + (Math.random() - 0.5) * (vfx.spread || 50),
            vx: (Math.random() - 0.5) * (vfx.speed || 10),
            vy: (Math.random() - 0.5) * (vfx.speed || 10),
            life: 1.0,
            color: vfx.color || 'white',
            type: vfx.type || 'spark',
            size: Math.random() * (vfx.size || 5) + 2
        }));

        setParticles(prev => [...prev, ...newParticles]);
    }, [vfx]);

    useEffect(() => {
        const update = () => {
            setParticles(prev => {
                if (prev.length === 0) return prev;

                return prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        vy: p.vy + 0.2, // Gravity
                        life: p.life - 0.02,
                        size: p.size * 0.95
                    }))
                    .filter(p => p.life > 0);
            });
            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    return (
        <div className="particle-layer" style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        opacity: p.life,
                        borderRadius: '50%',
                        transform: `scale(${p.life})`,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`
                    }}
                />
            ))}
        </div>
    );
};
