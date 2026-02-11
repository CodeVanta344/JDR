/**
 * Utility for JDR Speech Synthesis
 * Enhanced NPC Voice System with distinct archetypes
 */

/**
 * Voice profiles for different NPC archetypes.
 * Matched by keywords in the NPC name.
 */
const VOICE_PROFILES = {
    // Small creatures - High-pitched, fast
    gobelin: { pitch: 1.6, rate: 1.15, volume: 0.9 },
    lutin: { pitch: 1.7, rate: 1.2, volume: 0.85 },
    petit: { pitch: 1.5, rate: 1.1, volume: 0.9 },
    gnome: { pitch: 1.5, rate: 1.1, volume: 0.85 },
    halfelin: { pitch: 1.3, rate: 1.05, volume: 0.9 },

    // Large creatures - Deep, slow
    orc: { pitch: 0.5, rate: 0.75, volume: 1.0 },
    ogre: { pitch: 0.4, rate: 0.7, volume: 1.0 },
    troll: { pitch: 0.45, rate: 0.7, volume: 1.0 },
    dragon: { pitch: 0.3, rate: 0.65, volume: 1.0 },

    // Authority figures - Deep, measured, commanding
    garde: { pitch: 0.7, rate: 0.85, volume: 1.0 },
    chevalier: { pitch: 0.75, rate: 0.85, volume: 1.0 },
    capitaine: { pitch: 0.7, rate: 0.8, volume: 1.0 },
    roi: { pitch: 0.65, rate: 0.8, volume: 1.0 },
    noble: { pitch: 0.8, rate: 0.85, volume: 0.95 },
    seigneur: { pitch: 0.7, rate: 0.8, volume: 1.0 },

    // Merchants - Warm, mid-pitch, inviting
    marchand: { pitch: 1.1, rate: 1.0, volume: 0.95 },
    tavernier: { pitch: 1.05, rate: 0.95, volume: 1.0 },
    aubergiste: { pitch: 1.0, rate: 0.9, volume: 1.0 },
    forgeron: { pitch: 0.75, rate: 0.85, volume: 1.0 },
    alchimiste: { pitch: 0.9, rate: 0.9, volume: 0.9 },

    // Magic users - Raspy, slow, mysterious
    sorcier: { pitch: 0.85, rate: 0.8, volume: 0.85 },
    mage: { pitch: 0.9, rate: 0.85, volume: 0.9 },
    enchanteur: { pitch: 0.95, rate: 0.8, volume: 0.85 },

    // Rogues/Thieves - Fast, sharp, sneaky  
    voleur: { pitch: 1.15, rate: 1.1, volume: 0.8 },
    bandit: { pitch: 0.85, rate: 1.05, volume: 0.95 },
    assassin: { pitch: 1.0, rate: 1.1, volume: 0.75 },
    espion: { pitch: 1.05, rate: 1.05, volume: 0.8 },

    // Elders - Slow, wise, gentle
    vieux: { pitch: 0.8, rate: 0.75, volume: 0.85 },
    vieille: { pitch: 0.95, rate: 0.75, volume: 0.85 },
    sage: { pitch: 0.85, rate: 0.8, volume: 0.9 },
    ancien: { pitch: 0.8, rate: 0.75, volume: 0.85 },
    ermite: { pitch: 0.75, rate: 0.7, volume: 0.8 },

    // Children - High-pitched, fast, energetic
    enfant: { pitch: 1.4, rate: 1.1, volume: 0.9 },
    fille: { pitch: 1.3, rate: 1.05, volume: 0.9 },

    // Undead/Dark - Hollow, slow, unsettling
    mort: { pitch: 0.4, rate: 0.6, volume: 0.7 },
    spectre: { pitch: 0.5, rate: 0.65, volume: 0.65 },
    liche: { pitch: 0.35, rate: 0.55, volume: 0.75 },
    vampire: { pitch: 0.6, rate: 0.8, volume: 0.85 },

    // Female NPCs - Slightly higher default
    femme: { pitch: 1.15, rate: 0.95, volume: 0.95 },
    reine: { pitch: 1.1, rate: 0.85, volume: 1.0 },
    pretresse: { pitch: 1.1, rate: 0.85, volume: 0.9 },
};

// Default voice for unmatched NPCs
const DEFAULT_VOICE = { pitch: 1.0, rate: 0.92, volume: 0.95 };

/**
 * Find the best voice profile for a character name
 */
const getVoiceProfile = (characterName) => {
    if (!characterName) return DEFAULT_VOICE;
    const name = characterName.toLowerCase();

    for (const [keyword, profile] of Object.entries(VOICE_PROFILES)) {
        if (name.includes(keyword)) return profile;
    }

    return DEFAULT_VOICE;
};

export const extractSpokenText = (content) => {
    if (!content) return "";

    // Regex for various quote types used in RPG narration
    const dialogueRegex = /(?:"|«|"|'|'|»|")([^"»"'']{3,})(?:"|«|"|'|'|»|")/g;
    let match;
    let spokenText = "";

    while ((match = dialogueRegex.exec(content)) !== null) {
        spokenText += match[1] + " ";
    }

    // Fallback: If no quotes, or text is too short, use full content
    if (!spokenText.trim()) return content;

    return spokenText.trim();
};

export const speakText = (text, characterName = "", onEnd = null) => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;

    // Stop current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';

    // Get voice profile based on character name
    const profile = getVoiceProfile(characterName);
    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;
    utterance.volume = profile.volume;

    // Try to find the best French voice
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find(v => v.lang === 'fr-FR') || voices.find(v => v.lang.startsWith('fr'));
    if (frenchVoice) {
        utterance.voice = frenchVoice;
    }

    if (onEnd) utterance.onend = onEnd;

    window.speechSynthesis.speak(utterance);

    return utterance;
};

/**
 * Browsers often block speech until a user gesture.
 * This should be called on the first user interaction
 */
export const initSpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(utterance);
};
