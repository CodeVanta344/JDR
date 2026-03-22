import React from 'react';
import { Dice2D } from './Dice2D';

/**
 * DieVisual Component (2D CSS Upgrade)
 * Renders an animated 2D die using Dice2D with premium CSS animations.
 */
export const DieVisual = ({ type = 'd20', value, onComplete, isResult = false }) => {
    return (
        <div className="die-visual-2d-wrapper" style={{
            width: '140px',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            <Dice2D 
                type={type} 
                value={value} 
                onComplete={onComplete} 
                autoRoll={!isResult}
                delay={0}
            />
        </div>
    );
};
