/**
 * NarrativeDedup — shared deduplication logic for GM narrative messages.
 *
 * Replaces the copy-pasted similarity checks in:
 *   - handleSubmit
 *   - handleNPCMessage
 *   - handleChallengeResult
 *   - _handleGMInitiative
 */

// Utility function to calculate text similarity (word-overlap based)
const calculateSimilarity = (str1, str2) => {
    if (!str1 || !str2) return 0;
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();

    if (s1 === s2) return 1;

    if (s1.includes(s2) || s2.includes(s1)) {
        const minLen = Math.min(s1.length, s2.length);
        const maxLen = Math.max(s1.length, s2.length);
        return minLen / maxLen;
    }

    const words1 = s1.split(/\s+/).filter(w => w.length > 3);
    const words2 = s2.split(/\s+/).filter(w => w.length > 3);
    const common = words1.filter(w => words2.includes(w));
    const total = new Set([...words1, ...words2]).size;

    return total > 0 ? common.length / total : 0;
};

/**
 * Check if a narrative text is too similar to recent assistant messages.
 *
 * @param {object[]} messages — current message array
 * @param {string} narrative — new narrative to check
 * @param {object} [options]
 * @param {number} [options.count=5] — number of recent messages to check
 * @param {number} [options.threshold=0.75] — similarity threshold (0-1)
 * @returns {boolean} true if the narrative is a duplicate
 */
export function isDuplicateNarrative(messages, narrative, { count = 5, threshold = 0.75 } = {}) {
    if (!narrative) return false;
    const recent = messages.slice(-count).filter(m => m.role === 'assistant');
    for (const msg of recent) {
        if (msg.content && calculateSimilarity(msg.content, narrative) > threshold) {
            return true;
        }
    }
    return false;
}

export { calculateSimilarity };
