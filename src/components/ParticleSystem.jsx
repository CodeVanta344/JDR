import React, { useState, useEffect, useRef } from 'react';

/**
 * COMBAT VFX PARTICLE SYSTEM
 * Types: blood, magic, stun, spark, heal, fire, slash, shield
 */

const VFX_PRESETS = {
    blood: {
        count: 18,
        spread: 40,
        speed: 8,
        size: 6,
        gravity: 0.4,
        decay: 0.025,
        colors: ['#ff0000', '#cc0000', '#990000', '#ff3333'],
        shape: 'drop',
        trail: true,
    },
    magic: {
        count: 20,
        spread: 60,
        speed: 5,
        size: 5,
        gravity: -0.1,
        decay: 0.018,
        colors: ['#5eead4', '#00ffaa', '#80ffcc', '#00ccff'],
        shape: 'star',
        trail: false,
    },
    stun: {
        count: 8,
        spread: 30,
        speed: 2,
        size: 12,
        gravity: -0.05,
        decay: 0.012,
        colors: ['#ffff00', '#ffcc00', '#ffee44'],
        shape: 'star',
        trail: false,
        orbit: true,
    },
    spark: {
        count: 14,
        spread: 35,
        speed: 12,
        size: 3,
        gravity: 0.1,
        decay: 0.035,
        colors: ['#FFD700', '#FFA500', '#ffee88'],
        shape: 'circle',
        trail: true,
    },
    heal: {
        count: 12,
        spread: 40,
        speed: 3,
        size: 8,
        gravity: -0.15,
        decay: 0.015,
        colors: ['#00ff88', '#44ffaa', '#88ffcc', '#00ff44'],
        shape: 'cross',
        trail: false,
    },
    fire: {
        count: 22,
        spread: 50,
        speed: 6,
        size: 7,
        gravity: -0.2,
        decay: 0.02,
        colors: ['#ff4400', '#ff6600', '#ff8800', '#ffaa00', '#ffcc00'],
        shape: 'circle',
        trail: true,
    },
    slash: {
        count: 6,
        spread: 20,
        speed: 15,
        size: 20,
        gravity: 0,
        decay: 0.05,
        colors: ['#ffffff', '#cccccc', '#aaaaaa'],
        shape: 'slash',
        trail: false,
    },
    shield: {
        count: 10,
        spread: 50,
        speed: 2,
        size: 6,
        gravity: -0.08,
        decay: 0.015,
        colors: ['#60a5fa', '#3b82f6', '#93c5fd'],
        shape: 'hex',
        trail: false,
    },
};

const getShape = (type, size) => {
    switch (type) {
        case 'drop':
            return { borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)' };
        case 'star':
            return {
                borderRadius: '2px',
                transform: 'rotate(45deg)',
                boxShadow: `0 0 ${size}px currentColor`,
            };
        case 'cross':
            return {
                borderRadius: '2px',
                width: size * 0.4,
                height: size,
                boxShadow: `0 0 ${size}px currentColor`,
            };
        case 'slash':
            return {
                borderRadius: '2px',
                width: size * 3,
                height: 2,
                transform: `rotate(${-30 + Math.random() * 60}deg)`,
                boxShadow: `0 0 ${size}px currentColor`,
            };
        case 'hex':
            return {
                borderRadius: '3px',
                transform: `rotate(${Math.random() * 360}deg)`,
                border: '1px solid currentColor',
                background: 'transparent',
            };
        default:
            return { borderRadius: '50%' };
    }
};

export const ParticleSystem = ({ vfx }) => {
    const [particles, setParticles] = useState([]);
    const frameRef = useRef();

    useEffect(() => {
        if (!vfx) return;

        const preset = VFX_PRESETS[vfx.type] || VFX_PRESETS.spark;
        const count = vfx.count || preset.count;
        const cx = vfx.x || window.innerWidth / 2;
        const cy = vfx.y || window.innerHeight / 2;

        const newParticles = Array.from({ length: count }).map(() => {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 0.7 + 0.3) * preset.speed;
            const color = preset.colors[Math.floor(Math.random() * preset.colors.length)];

            return {
                id: Math.random(),
                x: cx + (Math.random() - 0.5) * preset.spread,
                y: cy + (Math.random() - 0.5) * preset.spread,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                color,
                type: preset.shape,
                size: Math.random() * preset.size + preset.size * 0.5,
                gravity: preset.gravity,
                decay: preset.decay + Math.random() * 0.005,
                trail: preset.trail,
                orbit: preset.orbit,
                angle: Math.random() * 360,
                orbitRadius: 20 + Math.random() * 15,
                orbitSpeed: 2 + Math.random() * 3,
                originX: cx,
                originY: cy,
            };
        });

        setParticles(prev => [...prev, ...newParticles]);
    }, [vfx]);

    useEffect(() => {
        let lastTime = performance.now();

        const update = (now) => {
            const dt = Math.min((now - lastTime) / 16, 3);
            lastTime = now;

            setParticles(prev => {
                if (prev.length === 0) return prev;

                return prev
                    .map(p => {
                        if (p.orbit) {
                            // Orbital motion (for stun stars)
                            const newAngle = p.angle + p.orbitSpeed * dt;
                            return {
                                ...p,
                                x: p.originX + Math.cos(newAngle * Math.PI / 180) * p.orbitRadius,
                                y: p.originY + Math.sin(newAngle * Math.PI / 180) * p.orbitRadius - p.orbitRadius,
                                angle: newAngle,
                                life: p.life - p.decay * dt,
                            };
                        }
                        return {
                            ...p,
                            x: p.x + p.vx * dt,
                            y: p.y + p.vy * dt,
                            vy: p.vy + p.gravity * dt,
                            life: p.life - p.decay * dt,
                            size: p.size * (1 - p.decay * 0.3 * dt),
                        };
                    })
                    .filter(p => p.life > 0 && p.size > 0.5);
            });
            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none',
            zIndex: 15000,
            overflow: 'hidden',
        }}>
            {particles.map(p => {
                const shapeStyle = getShape(p.type, p.size);
                return (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            left: p.x,
                            top: p.y,
                            width: shapeStyle.width || p.size,
                            height: shapeStyle.height || p.size,
                            backgroundColor: shapeStyle.background !== 'transparent' ? p.color : 'transparent',
                            color: p.color,
                            opacity: Math.min(1, p.life * 1.5),
                            borderRadius: shapeStyle.borderRadius,
                            transform: `translate(-50%, -50%) scale(${0.5 + p.life * 0.5}) ${shapeStyle.transform || ''}`,
                            boxShadow: shapeStyle.boxShadow || `0 0 ${p.size * 2}px ${p.color}`,
                            border: shapeStyle.border || 'none',
                            filter: p.trail ? `blur(${(1 - p.life) * 2}px)` : 'none',
                        }}
                    />
                );
            })}
        </div>
    );
};
