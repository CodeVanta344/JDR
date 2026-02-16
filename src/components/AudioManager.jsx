import React, { useEffect, useRef, useState } from 'react';

import { SFX_AUDIO_FILES, SKILL_SFX_TYPES } from '../audio/skillSfx';

/**
 * Mood-based music tracks (CC0 - OpenGameArt.org)
 * - exploration: "The Field of Dreams" 
 * - combat: "Prepare Your Swords" by bojidar-bg
 * - mystery: "Dark Cavern Ambient" by Paul Wortmann
 * - dialogue: "The Old Tower Inn" (Medieval tavern)
 */
const TRACKS = {
    exploration: ["/audio/Peasants_Courtyard.mp3", "/audio/Ettrefemsju.mp3"],
    combat: "/audio/combat.mp3",
    mystery: "/audio/mystery.ogg",
    dialogue: "/audio/tavern.mp3",
};

/**
 * Ambient sounds by time of day
 * - day: "Forest Ambience" (CC0, loops seamlessly)
 * - night: "Dark Cavern Ambient" (CC0, eerie loop)
 */
const AMBIENTS = {
    day: "/audio/ambient_day.mp3",
    night: "/audio/mystery.ogg",
};

const SFX = {
    // Basic SFX
    dice: null,
    gold: null,
    damage: null,
    levelUp: null,
    magic: null,
    notification: null,
    
    // Skill SFX - Physical
    [SKILL_SFX_TYPES.SWORD_SLASH]: null,
    [SKILL_SFX_TYPES.AXE_CLEAVE]: null,
    [SKILL_SFX_TYPES.DAGGER_STRIKE]: null,
    [SKILL_SFX_TYPES.BOW_SHOT]: null,
    
    // Skill SFX - Magic Offensive
    [SKILL_SFX_TYPES.FIREBALL]: null,
    [SKILL_SFX_TYPES.ICE_SHARD]: null,
    [SKILL_SFX_TYPES.LIGHTNING_BOLT]: null,
    [SKILL_SFX_TYPES.ARCANE_MISSILE]: null,
    [SKILL_SFX_TYPES.SHADOW_STRIKE]: null,
    
    // Skill SFX - Magic Defensive
    [SKILL_SFX_TYPES.SHIELD_BLOCK]: null,
    [SKILL_SFX_TYPES.BARRIER_CAST]: null,
    [SKILL_SFX_TYPES.HEAL_SPELL]: null,
    
    // Skill SFX - Utility
    [SKILL_SFX_TYPES.TELEPORT]: null,
    [SKILL_SFX_TYPES.STEALTH]: null,
    [SKILL_SFX_TYPES.HASTE]: null,
    
    // Skill SFX - Special
    [SKILL_SFX_TYPES.RAGE]: null,
    [SKILL_SFX_TYPES.BERSERK]: null,
    [SKILL_SFX_TYPES.INSPIRE]: null,
    [SKILL_SFX_TYPES.COMMAND]: null,
};

const FADE_STEP = 0.02;
const FADE_INTERVAL = 50;

export function AudioManager({ mood = 'exploration', enabled = false, volume = 0.3, hour = 12, sfx = null }) {
    const musicRef = useRef(null);
    const ambientRef = useRef(null);
    const sfxRef = useRef({});
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentAmbient, setCurrentAmbient] = useState(null);
    const musicFade = useRef(null);
    const ambientFade = useRef(null);

    // Crossfade to a new track
    const crossfadeTo = (audioRef, fadeRef, newSrc, targetVolume, onComplete) => {
        if (fadeRef.current) clearInterval(fadeRef.current);

        const audio = audioRef.current;
        if (!audio) return;

        // Fade out current
        fadeRef.current = setInterval(() => {
            if (audio.volume > FADE_STEP) {
                audio.volume = Math.max(0, audio.volume - FADE_STEP);
            } else {
                clearInterval(fadeRef.current);
                audio.volume = 0;

                if (newSrc) {
                    audio.src = newSrc;
                    audio.loop = true;
                    audio.play().catch(() => { });

                    // Fade in
                    let vol = 0;
                    fadeRef.current = setInterval(() => {
                        if (vol < targetVolume) {
                            vol = Math.min(targetVolume, vol + FADE_STEP);
                            audio.volume = vol;
                        } else {
                            clearInterval(fadeRef.current);
                            if (onComplete) onComplete();
                        }
                    }, FADE_INTERVAL);
                }
            }
        }, FADE_INTERVAL);
    };

    // Initialize audio elements
    useEffect(() => {
        musicRef.current = new Audio();
        musicRef.current.loop = true;
        musicRef.current.volume = 0;

        ambientRef.current = new Audio();
        ambientRef.current.loop = true;
        ambientRef.current.volume = 0;
        
        // Preload SFX audio elements
        Object.keys(SFX_AUDIO_FILES).forEach(sfxType => {
            const audio = new Audio();
            audio.src = SFX_AUDIO_FILES[sfxType];
            audio.volume = volume * 0.8; // SFX slightly louder than music
            sfxRef.current[sfxType] = audio;
        });

        return () => {
            if (musicRef.current) { musicRef.current.pause(); musicRef.current = null; }
            if (ambientRef.current) { ambientRef.current.pause(); ambientRef.current = null; }
            if (musicFade.current) clearInterval(musicFade.current);
            if (ambientFade.current) clearInterval(ambientFade.current);
            // Clean up SFX
            Object.values(sfxRef.current).forEach(audio => {
                if (audio) { audio.pause(); }
            });
        };
    }, []);

    // Handle mood changes
    useEffect(() => {
        if (!enabled || !musicRef.current) return;

        let nextTrack = TRACKS[mood] || TRACKS.exploration;
        // Randomly select if array
        if (Array.isArray(nextTrack)) {
            nextTrack = nextTrack[Math.floor(Math.random() * nextTrack.length)];
        }

        if (nextTrack === currentTrack) return;

        crossfadeTo(musicRef, musicFade, nextTrack, volume, () => {
            setCurrentTrack(nextTrack);
        });
    }, [mood, enabled]);

    // Handle ambient changes (day/night)
    useEffect(() => {
        if (!enabled || !ambientRef.current) return;
        const nextAmbient = (hour >= 6 && hour < 18) ? AMBIENTS.day : AMBIENTS.night;
        if (nextAmbient === currentAmbient) return;

        crossfadeTo(ambientRef, ambientFade, nextAmbient, volume * 0.4, () => {
            setCurrentAmbient(nextAmbient);
        });
    }, [hour, enabled]);

    // Handle enable/disable
    useEffect(() => {
        if (enabled) {
            if (musicRef.current && currentTrack) {
                musicRef.current.src = currentTrack;
                musicRef.current.loop = true;
                musicRef.current.volume = volume;
                musicRef.current.play().catch(() => { });
            } else if (musicRef.current && TRACKS[mood]) {
                let track = TRACKS[mood];
                if (Array.isArray(track)) {
                    track = track[Math.floor(Math.random() * track.length)];
                }
                musicRef.current.src = track;
                musicRef.current.loop = true;
                musicRef.current.volume = volume;
                musicRef.current.play().catch(() => { });
                setCurrentTrack(track);
            }

            const ambSrc = (hour >= 6 && hour < 18) ? AMBIENTS.day : AMBIENTS.night;
            if (ambientRef.current && ambSrc) {
                ambientRef.current.src = ambSrc;
                ambientRef.current.loop = true;
                ambientRef.current.volume = volume * 0.4;
                ambientRef.current.play().catch(() => { });
                setCurrentAmbient(ambSrc);
            }
        } else {
            if (musicRef.current) musicRef.current.pause();
            if (ambientRef.current) ambientRef.current.pause();
        }
    }, [enabled]);

    // Handle SFX trigger
    useEffect(() => {
        if (!sfx || !enabled) return;
        
        const { type } = sfx;
        
        // Check if it's a skill SFX
        if (SFX_AUDIO_FILES[type]) {
            const audio = sfxRef.current[type];
            if (audio) {
                audio.currentTime = 0;
                audio.volume = volume * 0.8;
                audio.play().catch(() => { });
            }
        } else if (type === 'dice' || type === 'gold' || type === 'damage' || type === 'levelUp' || type === 'magic' || type === 'notification') {
            // Legacy SFX handling
            const sfxAudio = new Audio();
            const sfxMap = {
                dice: '/audio/sfx/dice_roll.mp3',
                gold: '/audio/sfx/gold_pickup.mp3',
                damage: '/audio/sfx/hit_impact.mp3',
                levelUp: '/audio/sfx/level_up.mp3',
                magic: '/audio/sfx/magic_cast.mp3',
                notification: '/audio/sfx/notification.mp3',
            };
            sfxAudio.src = sfxMap[type] || '/audio/sfx/magic_cast.mp3';
            sfxAudio.volume = volume * 0.7;
            sfxAudio.play().catch(() => { });
        }
    }, [sfx, enabled, volume]);

    return null;
}
