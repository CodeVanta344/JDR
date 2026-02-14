import React, { useMemo } from 'react';
import './CombatManager.css'; // Ensure styles are applied

const TurnTracker = ({ combatants, currentTurnIndex }) => {

    // Sort logic should match CombatManager's sorted logic if passed unsorted, 
    // but typically combatants are already sorted by initiative in CombatManager.
    // We'll assume 'combatants' prop is the ordered list used for the turn queue.

    // We want to show a window of combatants centered on the current turn, 
    // or just the full list if it fits. 
    // For a simple start matching the CSS, let's render the list.

    // Logic to scroll or window the list could be added here if the list is very long.

    return (
        <div className="turn-tracker">
            {combatants.map((combatant, index) => {
                const isCurrent = index === currentTurnIndex;
                const isEnemy = combatant.isEnemy;
                const isDead = combatant.hp <= 0;

                if (isDead) return null; // Optionally hide dead combatants from tracker

                return (
                    <div
                        key={combatant.id}
                        className={`turn-actor-card ${isCurrent ? 'current' : ''} ${isEnemy ? 'enemy' : ''}`}
                        title={`${combatant.name} (Init: ${combatant.initiative})`}
                    >
                        <img
                            src={combatant.portrait_url || 'https://placehold.co/50'}
                            alt={combatant.name}
                            className="turn-actor-portrait"
                        />

                        {isCurrent && (
                            <div className="turn-focus-badge">ACTIF</div>
                        )}

                        {isEnemy && (
                            <div className="turn-enemy-pip" />
                        )}

                        {/* Optional: Add HP bar or other status indicators here if needed */}
                    </div>
                );
            })}
        </div>
    );
};

export default TurnTracker;
