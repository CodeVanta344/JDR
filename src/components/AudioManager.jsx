import React, { useEffect, useRef, useState } from 'react';

/**
 * Mood-based music tracks (CC0 - OpenGameArt.org)
 * - exploration: "The Field of Dreams" 
 * - combat: "Prepare Your Swords" by bojidar-bg
 * - mystery: "Dark Cavern Ambient" by Paul Wortmann
 * - dialogue: "The Old Tower Inn" (Medieval tavern)
 */
const TRACKS = {
    exploration: "/audio/exploration.mp3",
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
    dice: null,
    gold: null,
    damage: null,
    levelUp: null,
};

const FADE_STEP = 0.02;
const FADE_INTERVAL = 50;

export function AudioManager({ mood = 'exploration', enabled = false, volume = 0.3, hour = 12, sfx = null }) {
    const musicRef = useRef(null);
    const ambientRef = useRef(null);
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

        return () => {
            if (musicRef.current) { musicRef.current.pause(); musicRef.current = null; }
            if (ambientRef.current) { ambientRef.current.pause(); ambientRef.current = null; }
            if (musicFade.current) clearInterval(musicFade.current);
            if (ambientFade.current) clearInterval(ambientFade.current);
        };
    }, []);

    // Handle mood changes
    useEffect(() => {
        if (!enabled || !musicRef.current) return;
        const nextTrack = TRACKS[mood] || TRACKS.exploration;
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
                musicRef.current.src = TRACKS[mood];
                musicRef.current.loop = true;
                musicRef.current.volume = volume;
                musicRef.current.play().catch(() => { });
                setCurrentTrack(TRACKS[mood]);
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

    // Handle volume changes
    useEffect(() => {
        if (musicRef.current && enabled) musicRef.current.volume = volume;
        if (ambientRef.current && enabled) ambientRef.current.volume = volume * 0.4;
    }, [volume]);

    return null;
}
