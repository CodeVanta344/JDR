/**
 * Skill SFX Mapping - League of Legends style audio feedback
 * Maps each skill/ability to a specific sound effect type
 */

// SFX Categories for different skill types
export const SKILL_SFX_TYPES = {
    // Physical attacks
    SWORD_SLASH: 'sword_slash',
    AXE_CLEAVE: 'axe_cleave',
    DAGGER_STRIKE: 'dagger_strike',
    BOW_SHOT: 'bow_shot',
    
    // Magic - Offensive
    FIREBALL: 'fireball',
    ICE_SHARD: 'ice_shard',
    LIGHTNING_BOLT: 'lightning_bolt',
    ARCANE_MISSILE: 'arcane_missile',
    SHADOW_STRIKE: 'shadow_strike',
    
    // Magic - Defensive
    SHIELD_BLOCK: 'shield_block',
    BARRIER_CAST: 'barrier_cast',
    HEAL_SPELL: 'heal_spell',
    
    // Magic - Utility
    TELEPORT: 'teleport',
    STEALTH: 'stealth',
    HASTE: 'haste',
    
    // Special
    RAGE: 'rage',
    BERSERK: 'berserk',
    INSPIRE: 'inspire',
    COMMAND: 'command',
};

// Mapping of skill names to SFX types
export const SKILL_SFX_MAPPING = {
    // Basic attacks
    'Attaque': SKILL_SFX_TYPES.SWORD_SLASH,
    'Coup d\'épée': SKILL_SFX_TYPES.SWORD_SLASH,
    'Frappe': SKILL_SFX_TYPES.SWORD_SLASH,
    'Coup rapide': SKILL_SFX_TYPES.DAGGER_STRIKE,
    
    // Fire magic
    'Boule de feu': SKILL_SFX_TYPES.FIREBALL,
    'Fireball': SKILL_SFX_TYPES.FIREBALL,
    'Flamme': SKILL_SFX_TYPES.FIREBALL,
    'Incinération': SKILL_SFX_TYPES.FIREBALL,
    'Brûlure': SKILL_SFX_TYPES.FIREBALL,
    
    // Ice magic
    'Éclat de glace': SKILL_SFX_TYPES.ICE_SHARD,
    'Ice Shard': SKILL_SFX_TYPES.ICE_SHARD,
    'Gel': SKILL_SFX_TYPES.ICE_SHARD,
    'Blizzard': SKILL_SFX_TYPES.ICE_SHARD,
    
    // Lightning magic
    'Éclair': SKILL_SFX_TYPES.LIGHTNING_BOLT,
    'Lightning Bolt': SKILL_SFX_TYPES.LIGHTNING_BOLT,
    'Foudre': SKILL_SFX_TYPES.LIGHTNING_BOLT,
    'Chaîne d\'éclairs': SKILL_SFX_TYPES.LIGHTNING_BOLT,
    
    // Arcane magic
    'Missile arcane': SKILL_SFX_TYPES.ARCANE_MISSILE,
    'Arcane Missile': SKILL_SFX_TYPES.ARCANE_MISSILE,
    'Éruption arcane': SKILL_SFX_TYPES.ARCANE_MISSILE,
    'Rayon magique': SKILL_SFX_TYPES.ARCANE_MISSILE,
    
    // Shadow magic
    'Frappe de l\'ombre': SKILL_SFX_TYPES.SHADOW_STRIKE,
    'Shadow Strike': SKILL_SFX_TYPES.SHADOW_STRIKE,
    'Drain de vie': SKILL_SFX_TYPES.SHADOW_STRIKE,
    'Malédiction': SKILL_SFX_TYPES.SHADOW_STRIKE,
    
    // Defensive
    'Bouclier': SKILL_SFX_TYPES.SHIELD_BLOCK,
    'Bouclier magique': SKILL_SFX_TYPES.BARRIER_CAST,
    'Barrière': SKILL_SFX_TYPES.BARRIER_CAST,
    'Protection': SKILL_SFX_TYPES.BARRIER_CAST,
    'Shield': SKILL_SFX_TYPES.SHIELD_BLOCK,
    'Barrier': SKILL_SFX_TYPES.BARRIER_CAST,
    
    // Healing
    'Soin': SKILL_SFX_TYPES.HEAL_SPELL,
    'Guérison': SKILL_SFX_TYPES.HEAL_SPELL,
    'Heal': SKILL_SFX_TYPES.HEAL_SPELL,
    'Régénération': SKILL_SFX_TYPES.HEAL_SPELL,
    'Soins majeurs': SKILL_SFX_TYPES.HEAL_SPELL,
    
    // Stealth
    'Disparition': SKILL_SFX_TYPES.STEALTH,
    'Invisibilité': SKILL_SFX_TYPES.STEALTH,
    'Disparition': SKILL_SFX_TYPES.STEALTH,
    'Stealth': SKILL_SFX_TYPES.STEALTH,
    'Invisibility': SKILL_SFX_TYPES.STEALTH,
    
    // Speed/Haste
    'Hâte': SKILL_SFX_TYPES.HASTE,
    'Célérité': SKILL_SFX_TYPES.HASTE,
    'Haste': SKILL_SFX_TYPES.HASTE,
    'Célérité': SKILL_SFX_TYPES.HASTE,
    'Vitesse': SKILL_SFX_TYPES.HASTE,
    
    // Teleport
    'Téléportation': SKILL_SFX_TYPES.TELEPORT,
    'Blink': SKILL_SFX_TYPES.TELEPORT,
    'Portail': SKILL_SFX_TYPES.TELEPORT,
    
    // Warrior abilities
    'Rage': SKILL_SFX_TYPES.RAGE,
    'Furie': SKILL_SFX_TYPES.BERSERK,
    'Berserk': SKILL_SFX_TYPES.BERSERK,
    'Coup de rage': SKILL_SFX_TYPES.RAGE,
    
    // Support
    'Inspiration': SKILL_SFX_TYPES.INSPIRE,
    'Inspire': SKILL_SFX_TYPES.INSPIRE,
    'Bénédiction': SKILL_SFX_TYPES.INSPIRE,
    'Commandement': SKILL_SFX_TYPES.COMMAND,
    'Command': SKILL_SFX_TYPES.COMMAND,
    'Ordre': SKILL_SFX_TYPES.COMMAND,
    
    // Range
    'Tir à l\'arc': SKILL_SFX_TYPES.BOW_SHOT,
    'Flèche': SKILL_SFX_TYPES.BOW_SHOT,
    'Tir': SKILL_SFX_TYPES.BOW_SHOT,
    'Shot': SKILL_SFX_TYPES.BOW_SHOT,
    
    // Heavy attacks
    'Coup de hache': SKILL_SFX_TYPES.AXE_CLEAVE,
    'Coup de masse': SKILL_SFX_TYPES.AXE_CLEAVE,
    'Cleave': SKILL_SFX_TYPES.AXE_CLEAVE,
};

// Get SFX type for a skill
export function getSkillSFXType(skillName) {
    if (!skillName) return SKILL_SFX_TYPES.SWORD_SLASH;
    
    // Direct match
    if (SKILL_SFX_MAPPING[skillName]) {
        return SKILL_SFX_MAPPING[skillName];
    }
    
    // Partial match (check if skill name contains key words)
    const lowerSkill = skillName.toLowerCase();
    
    if (lowerSkill.includes('feu') || lowerSkill.includes('fire') || lowerSkill.includes('flame')) {
        return SKILL_SFX_TYPES.FIREBALL;
    }
    if (lowerSkill.includes('glace') || lowerSkill.includes('ice') || lowerSkill.includes('froid')) {
        return SKILL_SFX_TYPES.ICE_SHARD;
    }
    if (lowerSkill.includes('éclair') || lowerSkill.includes('lightning') || lowerSkill.includes('foudre')) {
        return SKILL_SFX_TYPES.LIGHTNING_BOLT;
    }
    if (lowerSkill.includes('arcane') || lowerSkill.includes('magique') || lowerSkill.includes('magic')) {
        return SKILL_SFX_TYPES.ARCANE_MISSILE;
    }
    if (lowerSkill.includes('ombre') || lowerSkill.includes('shadow') || lowerSkill.includes('dark')) {
        return SKILL_SFX_TYPES.SHADOW_STRIKE;
    }
    if (lowerSkill.includes('bouclier') || lowerSkill.includes('shield')) {
        return SKILL_SFX_TYPES.SHIELD_BLOCK;
    }
    if (lowerSkill.includes('barrière') || lowerSkill.includes('barrier')) {
        return SKILL_SFX_TYPES.BARRIER_CAST;
    }
    if (lowerSkill.includes('soin') || lowerSkill.includes('heal') || lowerSkill.includes('guérison')) {
        return SKILL_SFX_TYPES.HEAL_SPELL;
    }
    if (lowerSkill.includes('invisible') || lowerSkill.includes('stealth') || lowerSkill.includes('disparition')) {
        return SKILL_SFX_TYPES.STEALTH;
    }
    if (lowerSkill.includes('hâte') || lowerSkill.includes('haste') || lowerSkill.includes('vitesse')) {
        return SKILL_SFX_TYPES.HASTE;
    }
    if (lowerSkill.includes('téléport') || lowerSkill.includes('teleport') || lowerSkill.includes('blink')) {
        return SKILL_SFX_TYPES.TELEPORT;
    }
    if (lowerSkill.includes('rage') || lowerSkill.includes('fury')) {
        return SKILL_SFX_TYPES.RAGE;
    }
    if (lowerSkill.includes('berserk') || lowerSkill.includes('furie')) {
        return SKILL_SFX_TYPES.BERSERK;
    }
    if (lowerSkill.includes('flèche') || lowerSkill.includes('arrow') || lowerSkill.includes('tir') || lowerSkill.includes('shot')) {
        return SKILL_SFX_TYPES.BOW_SHOT;
    }
    if (lowerSkill.includes('hache') || lowerSkill.includes('axe') || lowerSkill.includes('mass')) {
        return SKILL_SFX_TYPES.AXE_CLEAVE;
    }
    
    // Default to sword slash for melee, arcane for magic
    if (lowerSkill.includes('dague') || lowerSkill.includes('dagger')) {
        return SKILL_SFX_TYPES.DAGGER_STRIKE;
    }
    
    return SKILL_SFX_TYPES.SWORD_SLASH;
}

// Audio file paths for each SFX type
export const SFX_AUDIO_FILES = {
    [SKILL_SFX_TYPES.SWORD_SLASH]: '/audio/sfx/sword_slash.mp3',
    [SKILL_SFX_TYPES.AXE_CLEAVE]: '/audio/sfx/axe_cleave.mp3',
    [SKILL_SFX_TYPES.DAGGER_STRIKE]: '/audio/sfx/dagger_strike.mp3',
    [SKILL_SFX_TYPES.BOW_SHOT]: '/audio/sfx/bow_shot.mp3',
    
    [SKILL_SFX_TYPES.FIREBALL]: '/audio/sfx/fireball_cast.mp3',
    [SKILL_SFX_TYPES.ICE_SHARD]: '/audio/sfx/ice_shard_cast.mp3',
    [SKILL_SFX_TYPES.LIGHTNING_BOLT]: '/audio/sfx/lightning_bolt_cast.mp3',
    [SKILL_SFX_TYPES.ARCANE_MISSILE]: '/audio/sfx/arcane_missile_cast.mp3',
    [SKILL_SFX_TYPES.SHADOW_STRIKE]: '/audio/sfx/shadow_strike_cast.mp3',
    
    [SKILL_SFX_TYPES.SHIELD_BLOCK]: '/audio/sfx/shield_block.mp3',
    [SKILL_SFX_TYPES.BARRIER_CAST]: '/audio/sfx/barrier_cast.mp3',
    [SKILL_SFX_TYPES.HEAL_SPELL]: '/audio/sfx/heal_spell.mp3',
    
    [SKILL_SFX_TYPES.TELEPORT]: '/audio/sfx/teleport_cast.mp3',
    [SKILL_SFX_TYPES.STEALTH]: '/audio/sfx/stealth_cast.mp3',
    [SKILL_SFX_TYPES.HASTE]: '/audio/sfx/haste_cast.mp3',
    
    [SKILL_SFX_TYPES.RAGE]: '/audio/sfx/rage_activate.mp3',
    [SKILL_SFX_TYPES.BERSERK]: '/audio/sfx/berserk_activate.mp3',
    [SKILL_SFX_TYPES.INSPIRE]: '/audio/sfx/inspire_cast.mp3',
    [SKILL_SFX_TYPES.COMMAND]: '/audio/sfx/command_shout.mp3',
};
