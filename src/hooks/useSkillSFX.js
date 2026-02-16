import { useCallback } from 'react';
import { getSkillSFXType, SKILL_SFX_TYPES } from '../audio/skillSfx';

/**
 * Hook for triggering skill sound effects
 * @param {Function} triggerSFX - The SFX trigger function from game store
 * @returns {Object} Skill SFX utilities
 */
export function useSkillSFX(triggerSFX) {
    /**
     * Play SFX for a specific skill
     * @param {string} skillName - Name of the skill/ability
     */
    const playSkillSFX = useCallback((skillName) => {
        if (!triggerSFX || !skillName) return;
        
        const sfxType = getSkillSFXType(skillName);
        triggerSFX(sfxType);
    }, [triggerSFX]);
    
    /**
     * Play SFX for physical attacks
     * @param {string} weaponType - Type of weapon (sword, axe, dagger, bow)
     */
    const playAttackSFX = useCallback((weaponType = 'sword') => {
        if (!triggerSFX) return;
        
        const weaponSFXMap = {
            sword: SKILL_SFX_TYPES.SWORD_SLASH,
            axe: SKILL_SFX_TYPES.AXE_CLEAVE,
            dagger: SKILL_SFX_TYPES.DAGGER_STRIKE,
            bow: SKILL_SFX_TYPES.BOW_SHOT,
        };
        
        triggerSFX(weaponSFXMap[weaponType] || SKILL_SFX_TYPES.SWORD_SLASH);
    }, [triggerSFX]);
    
    /**
     * Play SFX for magic spells
     * @param {string} element - Magic element (fire, ice, lightning, arcane, shadow)
     */
    const playMagicSFX = useCallback((element = 'arcane') => {
        if (!triggerSFX) return;
        
        const elementSFXMap = {
            fire: SKILL_SFX_TYPES.FIREBALL,
            ice: SKILL_SFX_TYPES.ICE_SHARD,
            lightning: SKILL_SFX_TYPES.LIGHTNING_BOLT,
            arcane: SKILL_SFX_TYPES.ARCANE_MISSILE,
            shadow: SKILL_SFX_TYPES.SHADOW_STRIKE,
        };
        
        triggerSFX(elementSFXMap[element] || SKILL_SFX_TYPES.ARCANE_MISSILE);
    }, [triggerSFX]);
    
    /**
     * Play SFX for defensive abilities
     * @param {string} type - Defense type (shield, barrier, heal)
     */
    const playDefenseSFX = useCallback((type = 'shield') => {
        if (!triggerSFX) return;
        
        const defenseSFXMap = {
            shield: SKILL_SFX_TYPES.SHIELD_BLOCK,
            barrier: SKILL_SFX_TYPES.BARRIER_CAST,
            heal: SKILL_SFX_TYPES.HEAL_SPELL,
        };
        
        triggerSFX(defenseSFXMap[type] || SKILL_SFX_TYPES.SHIELD_BLOCK);
    }, [triggerSFX]);
    
    /**
     * Play SFX for utility abilities
     * @param {string} type - Utility type (teleport, stealth, haste)
     */
    const playUtilitySFX = useCallback((type = 'haste') => {
        if (!triggerSFX) return;
        
        const utilitySFXMap = {
            teleport: SKILL_SFX_TYPES.TELEPORT,
            stealth: SKILL_SFX_TYPES.STEALTH,
            haste: SKILL_SFX_TYPES.HASTE,
        };
        
        triggerSFX(utilitySFXMap[type] || SKILL_SFX_TYPES.HASTE);
    }, [triggerSFX]);
    
    /**
     * Play SFX for special/buff abilities
     * @param {string} type - Special type (rage, berserk, inspire, command)
     */
    const playSpecialSFX = useCallback((type = 'rage') => {
        if (!triggerSFX) return;
        
        const specialSFXMap = {
            rage: SKILL_SFX_TYPES.RAGE,
            berserk: SKILL_SFX_TYPES.BERSERK,
            inspire: SKILL_SFX_TYPES.INSPIRE,
            command: SKILL_SFX_TYPES.COMMAND,
        };
        
        triggerSFX(specialSFXMap[type] || SKILL_SFX_TYPES.RAGE);
    }, [triggerSFX]);
    
    return {
        playSkillSFX,
        playAttackSFX,
        playMagicSFX,
        playDefenseSFX,
        playUtilitySFX,
        playSpecialSFX,
        SKILL_SFX_TYPES,
        getSkillSFXType,
    };
}
