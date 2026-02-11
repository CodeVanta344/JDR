import React, { useState, useEffect } from 'react';

/**
 * DieVisual Component
 * Renders an animated 3D-style die for a specified type (d4, d6, d8, d10, d12, d20).
 */
export const DieVisual = ({ type = 'd20', value, onComplete }) => {
    const [isRolling, setIsRolling] = useState(true);
    const [displayValue, setDisplayValue] = useState('?');

    useEffect(() => {
        let startTime = Date.now();
        const duration = 1200; // 1.2s roll animation

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed < duration) {
                // Randomize numbers during roll
                const max = parseInt(type.substring(1));
                setDisplayValue(Math.floor(Math.random() * max) + 1);
                requestAnimationFrame(animate);
            } else {
                setIsRolling(false);
                setDisplayValue(value);
                if (onComplete) setTimeout(onComplete, 800);
            }
        };

        requestAnimationFrame(animate);
    }, [type, value, onComplete]);

    const getSides = () => {
        if (type === 'd4') return 'polygon(50% 0%, 100% 100%, 0% 100%)';
        if (type === 'd6') return 'none'; // Square
        if (type === 'd8') return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
        if (type === 'd10' || type === 'd100') return 'polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)';
        if (type === 'd12') return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        if (type === 'd20') return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
        return 'none';
    };

    const display = type === 'd100' && !isRolling ? String(value).padStart(2, '0') : displayValue;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 10000,
            margin: '0 10px'
        }}>
            <div className={isRolling ? 'die-rolling' : 'die-settled'} style={{
                width: type === 'd100' ? '90px' : '80px',
                height: type === 'd100' ? '90px' : '80px',
                background: type === 'd100' ? 'var(--gradient-aether)' : 'var(--gradient-gold)',
                clipPath: getSides(),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: type === 'd100' ? '1.8rem' : '2rem',
                fontWeight: '900',
                color: 'var(--void-dark)',
                boxShadow: `0 0 30px ${type === 'd100' ? 'rgba(74, 158, 255, 0.4)' : 'rgba(212, 175, 55, 0.5)'}`,
                border: '2px solid rgba(0,0,0,0.2)',
                textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                position: 'relative',
                animation: isRolling ? 'die-spin 0.2s linear infinite' : 'die-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
                <span style={{ transform: isRolling ? 'none' : 'scale(1.1)' }}>{display}</span>

                {/* Visual Flair */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                    pointerEvents: 'none'
                }} />
            </div>

            <div style={{
                marginTop: '1.5rem',
                color: 'var(--gold-light)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                letterSpacing: '2px',
                opacity: isRolling ? 0.6 : 1,
                transition: 'opacity 0.3s'
            }}>
                {isRolling ? 'JETER DE DÉS...' : `RÉSULTAT: ${value}`}
            </div>
        </div>
    );
};
