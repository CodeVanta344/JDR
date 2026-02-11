import React, { useMemo } from 'react';

export const WeatherOverlay = ({ type = 'clear' }) => {
    // Memoize particles to prevent heavy re-renders
    const particles = useMemo(() => {
        if (type === 'clear' || type === 'fog') return [];
        const count = type === 'rain' ? 100 : 60;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100 + '%',
            delay: Math.random() * 2 + 's',
            duration: (type === 'rain' ? 0.5 + Math.random() * 0.5 : 3 + Math.random() * 4) + 's',
            opacity: 0.1 + Math.random() * 0.5,
            size: (type === 'rain' ? (10 + Math.random() * 15) + 'px' : (4 + Math.random() * 8) + 'px')
        }));
    }, [type]);

    if (type === 'clear') return null;

    return (
        <div className="weather-container">
            {type === 'fog' && <div className="fog-layer" />}
            {particles.map(p => (
                <div
                    key={p.id}
                    className={type === 'rain' ? 'rain-drop' : 'snow-flake'}
                    style={{
                        left: p.left,
                        top: '-20px',
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                        opacity: p.opacity,
                        height: type === 'rain' ? p.size : 'auto',
                        width: type === 'snow' ? p.size : '2px',
                        borderRadius: type === 'snow' ? '50%' : '0'
                    }}
                />
            ))}
        </div>
    );
};
