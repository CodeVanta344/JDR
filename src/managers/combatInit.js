/**
 * Combat Initialization Utilities
 *
 * Pure functions used during combat setup and distance resolution.
 * Keeps App.jsx handlers thin and testable.
 */

/**
 * Convert a distance string to the number of travel turns.
 * @param {'close'|'medium'|'far'} distance
 * @returns {number}
 */
export function distanceToTurns(distance) {
    const d = (distance || 'medium').toLowerCase();
    if (d === 'close') return 1;
    if (d === 'far') return 5;
    return 3; // medium default
}

/**
 * Determine the initial player status based on travel turns.
 * @param {number} turns – 0 means already arrived
 * @returns {string} – e.g. 'arrived' | 'traveling:3'
 */
export function resolveJoinStatus(turns) {
    return turns === 0 ? 'arrived' : `traveling:${turns}`;
}

/**
 * Decide whether a distance value should auto-join (no modal).
 * @param {string} distance – raw AI response ('IMMEDIATE', 'CLOSE', etc.)
 * @param {number|undefined} turns – AI-suggested turn count
 * @returns {boolean}
 */
export function isImmediateJoin(distance, turns) {
    const upper = (distance || '').toUpperCase();
    return upper === 'IMMEDIATE' || (upper === 'CLOSE' && turns === 0);
}

/**
 * Build the context string sent to the game-master edge function
 * for distance determination.
 * @param {Array} enemies
 * @returns {string}
 */
export function buildDistancePrompt(enemies) {
    return `Un combat a commencé (ennemis: ${JSON.stringify(enemies)}). ` +
        `Le joueur est-il au même endroit que le déclencheur ? ` +
        `Si oui, distance=IMMEDIATE. Sinon, estime la distance ` +
        `(CLOSE=1 tour, MEDIUM=3 tours, FAR=5 tours).`;
}
