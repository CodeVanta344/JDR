import React, { useState, useEffect } from 'react';

export const TypewriterText = ({ text, speed = 30, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
            {displayedText}
            {currentIndex < text.length && <span className="typewriter-cursor"></span>}
        </div>
    );
};
