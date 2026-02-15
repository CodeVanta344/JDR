import React from 'react';
import { CLASSES } from '../lore';
import { resolveCharacterAbilities } from '../utils/characterUtils';
import { gameSystemsManager } from '../lore/game-systems-manager';
import { gatheringSystem, getGatheringStat } from '../lore/gathering-system';
import { ALL_RESOURCES } from '../lore/resources';

export const CharacterSheet = ({ character, onUpdateInventory, onEquipItem, onToggleSettings, onConsume, onLevelUpClick, onTradeClick }) => {
    const [activeTab, setActiveTab] = React.useState('stats');
    const [enlargedImage, setEnlargedImage] = React.useState(null);
    const [selectedTrait, setSelectedTrait] = React.useState(null);
    const [selectedSkill, setSelectedSkill] = React.useState(null);
    const [selectedProfessionRank, setSelectedProfessionRank] = React.useState(null);
    const [craftingState, setCraftingState] = React.useState({ isCrafting: false, recipeId: null, result: null });
    const [craftFeedback, setCraftFeedback] = React.useState(null);
    const [gatheringSpots, setGatheringSpots] = React.useState([]);
    const [selectedGatheringSpot, setSelectedGatheringSpot] = React.useState(null);
    const [gatheringResult, setGatheringResult] = React.useState(null);
    const statNames = {
        str: { full: "Force", desc: "Puissance et impact" },
        dex: { full: "Dextérité", desc: "Agilité et tir" },
        con: { full: "Constitution", desc: "Santé et résistance" },
        int: { full: "Intelligence", desc: "Savoir et arcanes" },
        wis: { full: "Sagesse", desc: "Instinct et foi" },
        cha: { full: "Charisme", desc: "Aura et volonté" },
        level: { full: "Niveau", desc: "Puissance acquise" }
    };

    const SKILL_INFO = {
        // Combat
        melee: { label: 'Mêlée', icon: '⚔️', category: 'Combat' },
        ranged: { label: 'Distance', icon: '🏹', category: 'Combat' },
        magic: { label: 'Magie', icon: '✨', category: 'Combat' },
        defense: { label: 'Défense', icon: '🛡️', category: 'Combat' },
        tactics: { label: 'Tactique', icon: '♟️', category: 'Combat' },
        // Social
        persuasion: { label: 'Persuasion', icon: '🤝', category: 'Social' },
        intimidation: { label: 'Intimidation', icon: '💀', category: 'Social' },
        deception: { label: 'Tromperie', icon: '🎭', category: 'Social' },
        insight: { label: 'Perspicacité', icon: '👁️', category: 'Social' },
        animal_handling: { label: 'Dressage', icon: '🐴', category: 'Social' },
        // Exploration
        investigation: { label: 'Investigation', icon: '🔍', category: 'Exploration' },
        perception: { label: 'Perception', icon: '👂', category: 'Exploration' },
        survival: { label: 'Survie', icon: '🏕️', category: 'Exploration' },
        stealth: { label: 'Discrétion', icon: '👣', category: 'Exploration' },
        athletics: { label: 'Athlétisme', icon: '🏃', category: 'Exploration' },
        acrobatics: { label: 'Acrobatie', icon: '🤸', category: 'Exploration' },
        // Crafting
        smithing: { label: 'Forge', icon: '🔨', category: 'Artisanat' },
        alchemy: { label: 'Alchimie', icon: '🧪', category: 'Artisanat' },
        enchanting: { label: 'Enchantement', icon: '🔮', category: 'Artisanat' },
        cooking: { label: 'Cuisine', icon: '🍳', category: 'Artisanat' },
        engineering: { label: 'Ingénierie', icon: '⚙️', category: 'Artisanat' },
        leatherworking: { label: 'Tannerie', icon: '🧵', category: 'Artisanat' },
        carpentry: { label: 'Menuiserie', icon: '🪚', category: 'Artisanat' },
        // Gathering
        mining: { label: 'Minage', icon: '⛏️', category: 'Récolte' },
        herbalism: { label: 'Herboristerie', icon: '🌿', category: 'Récolte' },
        fishing: { label: 'Pêche', icon: '🎣', category: 'Récolte' },
        hunting: { label: 'Chasse', icon: '🏹', category: 'Récolte' },
        // Knowledge
        arcana: { label: 'Arcanes', icon: '📜', category: 'Savoir' },
        history: { label: 'Histoire', icon: '📚', category: 'Savoir' },
        religion: { label: 'Religion', icon: '⚖️', category: 'Savoir' },
        nature: { label: 'Nature', icon: '🌳', category: 'Savoir' },
        medicine: { label: 'Médecine', icon: '💊', category: 'Savoir' },
        // Performance & Arts
        performance: { label: 'Performance', icon: '🎭', category: 'Arts' },
        sleight_of_hand: { label: 'Prestidigitation', icon: '🤹', category: 'Arts' },
        // Fallback aliases
        knowledge_history: { label: 'Histoire', icon: '📚', category: 'Savoir' },
        knowledge_religion: { label: 'Religion', icon: '⚖️', category: 'Savoir' },
        chosen_skill: { label: 'Spécialité', icon: '⭐', category: 'Autre' }
    };

    const modStr = (val) => {
        const mod = Math.floor((val - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    const getStatBonus = (stat) => {
        if (!character.inventory) return 0;
        let bonus = 0;

        const reverseStatMap = {
            str: 'strength',
            dex: 'dexterity',
            con: 'constitution',
            int: 'intelligence',
            wis: 'wisdom',
            cha: 'charisma',
            per: 'perception',
            wil: 'willpower'
        };

        character.inventory.forEach(item => {
            if (item.equipped && item.stats) {
                // Check both short and long keys
                const val = item.stats[stat] || (reverseStatMap[stat] ? item.stats[reverseStatMap[stat]] : 0);
                if (typeof val === 'number') {
                    bonus += val;
                }
            }
        });
        return bonus;
    };

    const totalAC = () => {
        let base = 10;
        let dexBonus = Math.floor(((character.stats.dex || 10) - 10) / 2);
        const armor = character.inventory?.find(i => i.equipped && i.type === 'armor');
        if (armor) {
            base = armor.stats.ac || 10;
        } else {
            base = 10 + dexBonus;
        }

        const otherBonus = (character.inventory || [])
            .filter(i => i.equipped && i.type !== 'armor' && i.stats?.ac)
            .reduce((acc, i) => acc + i.stats.ac, 0);

        return base + otherBonus;
    };

    const totalATK = () => {
        const prof = 2 + Math.floor(((character.level || 1) - 1) / 4);
        const strMod = Math.floor(((character.stats.str || 10) - 10) / 2);
        const dexMod = Math.floor(((character.stats.dex || 10) - 10) / 2);
        const bestMod = Math.max(strMod, dexMod);
        const weapon = character.inventory?.find(i => i.equipped && i.type === 'weapon');
        const weaponBonus = weapon?.stats?.atk || 0;
        return `+${bestMod + prof + weaponBonus}`;
    };

    const knownAbilities = resolveCharacterAbilities(character);

    // Fonction de crafting
    const handleCraft = async (recipe, professionId) => {
        if (craftingState.isCrafting) return;
        
        setCraftingState({ isCrafting: true, recipeId: recipe.id, result: null });
        
        // Calculer le taux de réussite
        const profData = gameSystemsManager.getProfessionData?.(professionId);
        const prof = gameSystemsManager.gameState?.player_professions?.find(p => p.profession_id === professionId);
        const playerLevel = prof?.level || 1;
        const strMod = Math.floor(((character.stats?.str || 10) - 10) / 2);
        const dexMod = Math.floor(((character.stats?.dex || 10) - 10) / 2);
        const intMod = Math.floor(((character.stats?.int || 10) - 10) / 2);
        
        // Évaluer la formule de taux de réussite
        let successRate = 60;
        if (recipe.success_rate_formula) {
            try {
                successRate = eval(recipe.success_rate_formula.replace('level', playerLevel).replace('str_mod', strMod).replace('dex_mod', dexMod).replace('int_mod', intMod));
            } catch {
                successRate = 60 + (playerLevel * 3);
            }
        }
        
        // Simulation du délai de fabrication
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Lancer le dé
        const roll = Math.random() * 100;
        const success = roll <= successRate;
        const isCritical = roll <= Math.max(5, successRate * 0.15); // 15% du taux de réussite ou minimum 5%
        
        // Calculer l'XP gagnée
        const baseXP = recipe.level_required * 10;
        const xpGained = success ? baseXP : Math.floor(baseXP * 0.25);
        
        if (success) {
            // Créer l'objet crafté
            const craftedItem = {
                id: recipe.result.itemId,
                name: recipe.name,
                type: 'weapon',
                desc: `Objet crafté - Qualité ${isCritical ? 'exceptionnelle' : 'standard'}`,
                equipped: false,
                stats: {
                    quality: isCritical ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 50,
                    ...(isCritical && { crit: 1 })
                }
            };
            
            // Mettre à jour l'inventaire (ajouter l'objet, retirer les ingrédients)
            const currentInventory = character.inventory || [];
            const newInventory = [...currentInventory];
            
            // Retirer les ingrédients
            recipe.ingredients.forEach(ing => {
                let remaining = ing.quantity;
                for (let i = 0; i < newInventory.length && remaining > 0; i++) {
                    const item = newInventory[i];
                    if (item && (item.id === ing.itemId || item.name?.toLowerCase().includes(ing.itemId.toLowerCase()))) {
                        const qty = item.quantity || 1;
                        if (qty <= remaining) {
                            newInventory.splice(i, 1);
                            i--;
                            remaining -= qty;
                        } else {
                            item.quantity = qty - remaining;
                            remaining = 0;
                        }
                    }
                }
            });
            
            // Ajouter l'objet crafté
            newInventory.push(craftedItem);
            
            // Mettre à jour le personnage
            onUpdateInventory(newInventory);
            
            // Gagner XP dans le métier
            gameSystemsManager.gainProfessionXP(professionId, xpGained);
            
            setCraftFeedback({
                success: true,
                message: isCritical 
                    ? `Vous avez créé ${recipe.name} avec une qualité exceptionnelle ! ${recipe.critical_success_bonus || ''}`
                    : `Vous avez créé ${recipe.name} avec succès !`,
                xp: xpGained,
                item: craftedItem
            });
        } else {
            // Échec : retirer les ingrédients (perdus)
            const currentInventory = character.inventory || [];
            const newInventory = [...currentInventory];
            
            recipe.ingredients.forEach(ing => {
                let remaining = ing.quantity;
                for (let i = 0; i < newInventory.length && remaining > 0; i++) {
                    const item = newInventory[i];
                    if (item && (item.id === ing.itemId || item.name?.toLowerCase().includes(ing.itemId.toLowerCase()))) {
                        const qty = item.quantity || 1;
                        if (qty <= remaining) {
                            newInventory.splice(i, 1);
                            i--;
                            remaining -= qty;
                        } else {
                            item.quantity = qty - remaining;
                            remaining = 0;
                        }
                    }
                }
            });
            
            onUpdateInventory(newInventory);
            
            // Gagner XP réduite
            gameSystemsManager.gainProfessionXP(professionId, xpGained);
            
            setCraftFeedback({
                success: false,
                message: recipe.fail_consequence || 'Le craft a échoué et les matériaux sont perdus.',
                xp: xpGained
            });
        }
        
        setCraftingState({ isCrafting: false, recipeId: null, result: null });
    };

    // Fonction pour scanner les ressources de la zone
    const scanForResources = (biome = 'forest') => {
        const spots = gatheringSystem.generateSpotsForLocation(
            character.current_location || 'Zone Inconnue',
            biome,
            character.level || 1,
            3
        );
        // Découvrir automatiquement les spots évidents
        const discovered = gatheringSystem.discoverObviousSpots(character.current_location || 'Zone Inconnue');
        setGatheringSpots([...spots, ...discovered]);
        return spots.length + discovered.length;
    };

    // Fonction pour tenter une récolte
    const attemptGathering = async (spotId) => {
        const spot = gatheringSpots.find(s => s.id === spotId);
        if (!spot) return;

        const resource = ALL_RESOURCES.find(r => r.id === spot.resourceId);
        if (!resource) return;

        // Déterminer le stat à utiliser
        const statKey = getGatheringStat(resource.category);
        const statValue = character.stats?.[statKey] || 10;
        const statModifier = Math.floor((statValue - 10) / 2);

        // Lancer le dé (1d20)
        const roll = Math.floor(Math.random() * 20) + 1;

        // Obtenir le niveau de métier approprié
        const professionLevels = {
            'mining': character.professions?.find(p => p.profession_id === 'mining')?.level || 1,
            'herbalism': character.professions?.find(p => p.profession_id === 'herbalism')?.level || 1,
            'fishing': character.professions?.find(p => p.profession_id === 'fishing')?.level || 1,
            'hunting': character.professions?.find(p => p.profession_id === 'hunting')?.level || 1,
            'skinning': character.professions?.find(p => p.profession_id === 'skinning')?.level || 1,
            'logging': character.professions?.find(p => p.profession_id === 'logging')?.level || 1,
        };
        const professionLevel = professionLevels[resource.gatheredBy] || 1;

        // Effectuer la tentative
        const result = gatheringSystem.attemptGathering(
            spotId,
            character.user_id || 'player',
            professionLevel,
            statModifier,
            roll
        );

        setGatheringResult({
            ...result,
            resourceName: resource.name,
            roll,
            total: roll + statModifier
        });

        // Si succès, ajouter à l'inventaire
        if (result.success && result.quantityGathered > 0) {
            const item = gatheringSystem.createResourceItem(spot.resourceId, result.quantityGathered);
            if (item) {
                const currentInventory = character.inventory || [];
                onUpdateInventory([...currentInventory, item]);
            }

            // Gain d'XP dans le métier
            if (resource.gatheredBy) {
                gameSystemsManager.gainProfessionXP(resource.gatheredBy, result.experienceGained);
            }
        }

        // Mettre à jour le spot (quantité réduite)
        setGatheringSpots(prev => prev.map(s => 
            s.id === spotId ? { ...s, quantity: Math.max(0, s.quantity - 1) } : s
        ));

        // Réinitialiser après 3 secondes
        setTimeout(() => setGatheringResult(null), 3000);
    };

    // Utility to check if item is equippable
    const isEquippable = (item) => {
        const equippableTypes = ['weapon', 'armor', 'shield', 'ring', 'amulet', 'boots', 'cloak', 'helmet', 'gloves', 'head', 'chest', 'mainhand', 'offhand'];
        const consumableTypes = ['consumable', 'potion', 'scroll', 'food', 'drink'];

        if (consumableTypes.includes(item.type?.toLowerCase())) return false;

        return equippableTypes.includes(item.type?.toLowerCase()) || (item.slot && item.slot !== 'none' && item.slot !== 'consumable');
    };

    return (
        <aside className="character-sheet" style={{
            position: 'fixed', left: '1.2rem', top: '1.2rem', bottom: '1.2rem', width: '360px',
            background: 'rgba(10,10,15,0.95)', border: '1px solid var(--glass-border)', borderRadius: '12px',
            display: 'flex', flexDirection: 'column', color: '#fff', backdropFilter: 'blur(15px)', zIndex: 100,
            pointerEvents: 'auto', boxShadow: '0 0 30px rgba(0,0,0,0.5)'
        }}>
            {/* Header */}
            <div className="sheet-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <div style={{ width: '65px', height: '65px', borderRadius: '50%', overflow: 'hidden', border: '2.5px solid var(--gold-primary)', background: '#000', boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}>
                    <img src={character.portrait_url || 'https://placehold.co/60'} alt="Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <div style={{ fontWeight: '900', fontSize: '1.3rem', color: 'var(--gold-primary)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{character.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold', marginTop: '2px' }}>{character.class} - NIV. {character.level}</div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                {[
                    { id: 'stats', label: 'STATS' },
                    { id: 'equip', label: 'ÉQUIP.' },
                    { id: 'abilities', label: 'APTITUDES' },
                    { id: 'professions', label: 'MÉTIERS' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1, padding: '1rem 0', background: activeTab === tab.id ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                            border: 'none', borderBottom: activeTab === tab.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--gold-primary)' : 'var(--text-muted)',
                            fontSize: '0.8rem', fontWeight: '900', cursor: 'pointer', letterSpacing: '1.5px',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="sheet-content" style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0.8rem',
                scrollbarWidth: 'thin',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch'
            }}>
                {activeTab === 'stats' && (
                    <div className="animate-fade-in">
                        <div className="vitals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', marginBottom: '1.2rem' }}>
                            {/* PV - Cœur */}
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '8px', left: '8px', opacity: 0.15 }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#54a0ff">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                </div>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>PV</span>
                                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#54a0ff' }}>{character.hp}</span>
                            </div>
                            
                            {/* CA - Bouclier */}
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '8px', left: '8px', opacity: 0.15 }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#d4af37">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                                    </svg>
                                </div>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>CA</span>
                                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--gold-primary)' }}>{totalAC()}</span>
                            </div>
                            
                            {/* ATK - Épée croisée */}
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '8px', left: '8px', opacity: 0.15 }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#ff6b6b">
                                        <path d="M6.92 5L5 6.92l2.05 2.05L4 12l4.04 4.04 2.05-2.05L12 16l4.04-4.04-2.05-2.05L16 6.92 14.08 5 12 7.08 9.92 5zM12 13.17L9.83 11 12 8.83 14.17 11 12 13.17z"/>
                                    </svg>
                                </div>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>ATK</span>
                                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ff6b6b' }}>{totalATK()}</span>
                            </div>
                            
                            {/* ÉCLATS - Pièce */}
                            <div className="vital-box" style={{ background: 'rgba(212,175,55,0.08)', padding: '0.9rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--gold-dim)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '8px', left: '8px', opacity: 0.2 }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#d4af37">
                                        <circle cx="12" cy="12" r="10" stroke="#d4af37" strokeWidth="2" fill="none"/>
                                        <text x="12" y="16" textAnchor="middle" fill="#d4af37" fontSize="10" fontWeight="bold">¤</text>
                                    </svg>
                                </div>
                                <span style={{ fontSize: '0.65rem', color: 'var(--gold-dim)', display: 'block', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>ÉCLATS</span>
                                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--gold-primary)' }}>{character.gold || 0}</span>
                            </div>
                        </div>

                        {/* Resource Bar */}
                        {(() => {
                            const baseClassName = (character.class || "").split(' ')[0].toLowerCase();
                            const manaClasses = ["mage", "clerc", "paladin", "druide", "barde"];
                            const isMana = manaClasses.includes(baseClassName);
                            const resourceLabel = isMana ? "ÉNERGIE ARCANIQUE" : "ENDURANCE";
                            const resourceColor = isMana ? "#48dbfb" : "var(--gold-primary)";
                            const percent = Math.min(100, Math.max(0, (character.resource / (character.max_resource || 100)) * 100));

                            return (
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', marginBottom: '5px', fontWeight: 'bold' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{resourceLabel}</span>
                                        <span style={{ color: resourceColor }}>{character.resource} / {character.max_resource || 100}</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ height: '100%', width: `${percent}%`, background: resourceColor, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `0 0 10px ${resourceColor}44` }} />
                                    </div>
                                </div>
                            );
                        })()}

                        <h4 style={{ fontSize: '0.8rem', color: 'var(--gold-dim)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '6px' }}>Caractéristiques</h4>
                        <div className="attributes-list" style={{ display: 'grid', gap: '4px' }}>
                            {Object.entries(character.stats || {})
                                .filter(([key]) => key !== 'mechanic')
                                .map(([key, val]) => {
                                    const bonus = getStatBonus(key);
                                    const total = val + bonus;
                                    return (
                                        <div key={key} title={statNames[key]?.desc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid transparent', transition: 'all 0.2s', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                                            <div>
                                                <span style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: '#fff', fontWeight: '900', display: 'block', letterSpacing: '0.5px' }}>{key}</span>
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{statNames[key]?.full}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                <span style={{ fontWeight: '900', color: '#fff', fontSize: '1.25rem' }}>{total}</span>
                                                <span style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 'bold' }}>({modStr(total)})</span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Traits et Aptitudes LifePath */}
                        {character.mechanical_traits && character.mechanical_traits.length > 0 && (
                            <div style={{ marginTop: '1.8rem', padding: '1.5rem', background: 'rgba(212,175,55,0.06)', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.25)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                                <h4 style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '900' }}>
                                    <span>✨</span>
                                    <span>Aptitudes Spéciales</span>
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {character.mechanical_traits.map((trait, idx) => (
                                        <div key={idx} 
                                            style={{ 
                                                padding: '0.9rem', 
                                                background: 'rgba(0,0,0,0.4)', 
                                                borderRadius: '8px', 
                                                border: '1px solid rgba(212,175,55,0.2)', 
                                                transition: 'all 0.2s',
                                                cursor: 'pointer'
                                            }} 
                                            onClick={() => setSelectedTrait(trait)}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.15)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--gold-primary)', letterSpacing: '0.5px' }}>{trait.name}</span>
                                            </div>
                                            {(trait.effect || trait.desc || trait.game_effect) && (
                                                <div style={{ 
                                                    marginTop: '0.5rem',
                                                    padding: '0.4rem 0.6rem',
                                                    background: 'rgba(76,209,55,0.1)', 
                                                    borderRadius: '4px', 
                                                    border: '1px solid rgba(76,209,55,0.2)'
                                                }}>
                                                    <span style={{ fontSize: '0.75rem', color: '#4cd137', fontWeight: '700' }}>
                                                        {trait.effect || trait.desc || trait.game_effect}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Compétences acquises */}
                        {character.skill_bonuses && character.skill_bonuses.length > 0 && (
                            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(84,160,255,0.05)', borderRadius: '12px', border: '1px solid rgba(84,160,255,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                                <h4 style={{ fontSize: '0.85rem', color: '#54a0ff', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '2.5px', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: '900' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🎯</span>
                                    <span>Compétences Maîtrisées</span>
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.4rem' }}>
                                    {(() => {
                                        // Deduplicate and map skills
                                        const skills = character.skill_bonuses.map(s => typeof s === 'string' ? s : s.skillId);
                                        const uniqueSkills = [...new Set(skills)];

                                        return uniqueSkills.map((skillId, idx) => {
                                            const info = SKILL_INFO[skillId] || { label: skillId, icon: '▪️', category: 'Inconnu' };
                                            const skillData = character.skill_bonuses.find(s => (typeof s === 'string' ? s : s.skillId) === skillId);
                                            const bonus = typeof skillData === 'object' ? skillData.bonus : null;
                                            const reason = typeof skillData === 'object' ? skillData.reason : null;
                                            
                                            return (
                                                <div key={idx} 
                                                    onClick={() => setSelectedSkill({ info, bonus, reason, skillId })}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '0.45rem 0.8rem',
                                                        background: 'rgba(84,160,255,0.08)',
                                                        borderRadius: '6px',
                                                        border: '1px solid rgba(84,160,255,0.2)',
                                                        transition: 'all 0.2s ease',
                                                        cursor: 'pointer'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(84,160,255,0.2)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(84,160,255,0.08)'}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                        <span style={{ fontSize: '0.9rem' }}>{info.icon}</span>
                                                        <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}>{info.label}</span>
                                                    </div>
                                                    {bonus ? (
                                                        <span style={{ fontSize: '0.7rem', color: '#4cd137', fontWeight: '700', padding: '2px 6px', background: 'rgba(76,209,55,0.15)', borderRadius: '4px' }}>
                                                            +{bonus}
                                                        </span>
                                                    ) : (
                                                        <span style={{ fontSize: '0.6rem', color: 'rgba(84,160,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{info.category}</span>
                                                    )}
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            </div>
                        )}

                        {/* Serments et Hiérarchies de Métiers */}
                        {(() => {
                            // Récupérer les professions depuis gameSystemsManager si non présentes dans character
                            const professions = character.professions || gameSystemsManager.gameState?.player_professions?.map(pp => {
                                const profData = gameSystemsManager.getProfessionData?.(pp.profession_id);
                                if (!profData) return null;
                                const currentRank = profData.ranks?.find(r => r.level === pp.level);
                                const nextRank = profData.ranks?.find(r => r.level === pp.level + 1);
                                return {
                                    profession_id: pp.profession_id,
                                    name: profData.name,
                                    level: pp.level,
                                    xp: pp.xp,
                                    next_rank_xp: nextRank?.xp_required,
                                    ranks: profData.ranks?.map(r => ({
                                        level: r.level,
                                        title: r.title
                                    })),
                                    isGathering: ['mining', 'herbalism', 'fishing', 'hunting', 'skinning', 'logging'].includes(pp.profession_id)
                                };
                            }).filter(Boolean) || [];
                            
                            if (professions.length === 0) {
                                return (
                                    <div style={{ 
                                        marginTop: '1.5rem', 
                                        padding: '1.5rem', 
                                        background: 'rgba(139,115,85,0.08)', 
                                        borderRadius: '12px', 
                                        border: '1px solid rgba(139,115,85,0.3)', 
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚒️</div>
                                        <h4 style={{ fontSize: '0.9rem', color: '#d4af37', marginBottom: '0.5rem' }}>
                                            Aucun métier appris
                                        </h4>
                                        <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem' }}>
                                            Vous n'avez pas encore prêté serment à une guilde. 
                                            Ouvrez le Codex pour apprendre un métier.
                                        </p>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>
                                            Métiers disponibles : Forge, Alchimie, Minage, Herboristerie...
                                        </div>
                                    </div>
                                );
                            }
                            
                            // Séparer les métiers de récolte et de craft
                            const gatheringProfessions = professions.filter(p => p.isGathering);
                            const craftingProfessions = professions.filter(p => !p.isGathering);
                            
                            return (
                                <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(139,115,85,0.08)', borderRadius: '12px', border: '1px solid rgba(139,115,85,0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                                    <h4 style={{ fontSize: '0.85rem', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '900' }}>
                                        <span style={{ fontSize: '1.2rem' }}>⚒️</span>
                                        <span>Serments Prêtés</span>
                                    </h4>
                                    
                                    {/* Section Récolte */}
                                    {gatheringProfessions.length > 0 && (
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h5 style={{ fontSize: '0.75rem', color: '#4cd137', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <span>🌿</span>
                                                <span>Métiers de Récolte</span>
                                            </h5>
                                            
                                            {/* Bouton Scanner */}
                                            <button
                                                onClick={() => scanForResources('forest')}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.6rem',
                                                    marginBottom: '1rem',
                                                    background: 'rgba(76,209,55,0.15)',
                                                    border: '1px solid #4cd137',
                                                    color: '#4cd137',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.75rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <span>🔍</span>
                                                <span>Scanner la zone pour des ressources</span>
                                            </button>
                                            
                                            {/* Spots de récolte découverts */}
                                            {gatheringSpots.length > 0 && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                                                    <h6 style={{ fontSize: '0.7rem', color: '#aaa', margin: 0 }}>Ressources découvertes :</h6>
                                                    {gatheringSpots.filter(s => s.discovered).map((spot, idx) => {
                                                        const resource = ALL_RESOURCES.find(r => r.id === spot.resourceId);
                                                        if (!resource) return null;
                                                        const canGather = gatheringProfessions.some(p => {
                                                            const profData = gameSystemsManager.getProfessionData?.(p.profession_id);
                                                            return profData?.gatheringType === resource.gatheredBy || p.profession_id === resource.gatheredBy;
                                                        });
                                                        
                                                        return (
                                                            <div key={idx} style={{
                                                                padding: '0.6rem',
                                                                background: 'rgba(0,0,0,0.3)',
                                                                borderRadius: '6px',
                                                                border: '1px solid rgba(139,115,85,0.2)',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}>
                                                                <div>
                                                                    <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold' }}>
                                                                        {resource.name}
                                                                    </div>
                                                                    <div style={{ fontSize: '0.65rem', color: '#888' }}>
                                                                        {spot.description} • DD: {spot.difficulty}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => attemptGathering(spot.id)}
                                                                    disabled={!canGather || spot.quantity <= 0}
                                                                    style={{
                                                                        padding: '0.4rem 0.8rem',
                                                                        background: canGather && spot.quantity > 0 ? 'rgba(76,209,55,0.2)' : 'rgba(100,100,100,0.2)',
                                                                        border: '1px solid ' + (canGather && spot.quantity > 0 ? '#4cd137' : '#666'),
                                                                        color: canGather && spot.quantity > 0 ? '#4cd137' : '#666',
                                                                        borderRadius: '4px',
                                                                        cursor: canGather && spot.quantity > 0 ? 'pointer' : 'not-allowed',
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >
                                                                    {spot.quantity > 0 ? 'Récolter' : 'Épuisé'}
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                            
                                            {/* Résultat de la récolte */}
                                            {gatheringResult && (
                                                <div style={{
                                                    padding: '0.8rem',
                                                    background: gatheringResult.success ? 'rgba(76,209,55,0.15)' : 'rgba(255,107,107,0.15)',
                                                    borderRadius: '6px',
                                                    border: '1px solid ' + (gatheringResult.success ? '#4cd137' : '#ff6b6b'),
                                                    marginBottom: '1rem'
                                                }}>
                                                    <div style={{ fontSize: '0.8rem', color: gatheringResult.success ? '#4cd137' : '#ff6b6b', fontWeight: 'bold' }}>
                                                        {gatheringResult.success ? '✅ Réussite !' : '❌ Échec'}
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', color: '#ccc' }}>
                                                        {gatheringResult.message}
                                                    </div>
                                                    <div style={{ fontSize: '0.65rem', color: '#888', marginTop: '0.3rem' }}>
                                                        Jet: {gatheringResult.roll} + {gatheringResult.statModifier} = {gatheringResult.total}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Liste des métiers de récolte */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {gatheringProfessions.map((prof, idx) => (
                                                    <div key={idx} style={{ padding: '0.6rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ fontSize: '0.8rem', color: '#d4af37' }}>{prof.name}</span>
                                                            <span style={{ fontSize: '0.65rem', color: '#4cd137' }}>Niv. {prof.level}</span>
                                                        </div>
                                                        {prof.next_rank_xp && (
                                                            <div style={{ marginTop: '0.4rem' }}>
                                                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                                                    <div style={{ 
                                                                        height: '100%', 
                                                                        width: `${Math.min(100, (prof.xp / prof.next_rank_xp) * 100)}%`, 
                                                                        background: '#4cd137'
                                                                    }} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Section Craft */}
                                    {craftingProfessions.length > 0 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <h5 style={{ fontSize: '0.75rem', color: '#d4af37', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <span>🔨</span>
                                                <span>Métiers de Fabrication</span>
                                            </h5>
                                            {craftingProfessions.map((prof, idx) => (
                                                <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(139,115,85,0.2)' }}>
                                                    {/* Nom du métier et niveau actuel */}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                                        <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#d4af37' }}>{prof.name}</span>
                                                        <span style={{ fontSize: '0.7rem', color: '#4cd137', fontWeight: '700', padding: '3px 8px', background: 'rgba(76,209,55,0.15)', borderRadius: '4px' }}>
                                                            Niv. {prof.level}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Barre de progression vers le prochain niveau */}
                                                    {prof.next_rank_xp && (
                                                        <div style={{ marginBottom: '0.8rem' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', marginBottom: '3px' }}>
                                                                <span style={{ color: 'var(--text-muted)' }}>Progression</span>
                                                                <span style={{ color: '#4cd137' }}>{prof.xp} / {prof.next_rank_xp} XP</span>
                                                            </div>
                                                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                                                <div style={{ 
                                                                    height: '100%', 
                                                                    width: `${Math.min(100, (prof.xp / prof.next_rank_xp) * 100)}%`, 
                                                                    background: 'linear-gradient(90deg, #4cd137, #5dff98)', 
                                                                    transition: 'width 0.4s ease',
                                                                    boxShadow: '0 0 8px rgba(76,209,55,0.4)'
                                                                }} />
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Liste des rangs avec les atteints en vert */}
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                        {prof.ranks?.map((rank, ridx) => {
                                                            const isAchieved = rank.level <= prof.level;
                                                            const isCurrent = rank.level === prof.level + 1;
                                                            return (
                                                                <div key={ridx} 
                                                                    onClick={() => {
                                                                        // Récupérer les données complètes de la profession pour les crafts
                                                                        const fullProfData = gameSystemsManager.getProfessionData?.(prof.profession_id || prof.id);
                                                                        if (fullProfData) {
                                                                            // Filtrer les recipes disponibles à ce niveau
                                                                            const availableRecipes = fullProfData.recipes?.filter(r => r.level_required <= rank.level) || [];
                                                                            // Ajouter les nouvelles recettes débloquées à ce niveau spécifique
                                                                            const newRecipes = fullProfData.recipes?.filter(r => r.level_required === rank.level) || [];
                                                                            setSelectedProfessionRank({
                                                                                rank: rank,
                                                                                professionName: prof.name,
                                                                                professionId: prof.profession_id || prof.id,
                                                                                allRecipes: availableRecipes,
                                                                                newRecipes: newRecipes,
                                                                                playerLevel: prof.level
                                                                            });
                                                                        }
                                                                    }}
                                                                    style={{ 
                                                                        display: 'flex', 
                                                                        alignItems: 'center', 
                                                                        gap: '0.5rem',
                                                                        padding: '0.4rem 0.6rem',
                                                                        background: isAchieved ? 'rgba(76,209,55,0.1)' : isCurrent ? 'rgba(212,175,55,0.1)' : 'transparent',
                                                                        borderRadius: '4px',
                                                                        border: isAchieved ? '1px solid rgba(76,209,55,0.3)' : isCurrent ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                    onMouseEnter={e => {
                                                                        if (!isAchieved) {
                                                                            e.currentTarget.style.background = 'rgba(139,115,85,0.2)';
                                                                        }
                                                                    }}
                                                                    onMouseLeave={e => {
                                                                        if (!isAchieved) {
                                                                            e.currentTarget.style.background = isCurrent ? 'rgba(212,175,55,0.1)' : 'transparent';
                                                                        }
                                                                    }}
                                                                >
                                                                    <span style={{ 
                                                                        fontSize: '0.7rem', 
                                                                        color: isAchieved ? '#4cd137' : isCurrent ? '#d4af37' : '#666',
                                                                        fontWeight: isAchieved ? '700' : '400'
                                                                    }}>
                                                                        {isAchieved ? '✓' : isCurrent ? '▸' : '○'}
                                                                    </span>
                                                                    <span style={{ 
                                                                        fontSize: '0.75rem', 
                                                                        color: isAchieved ? '#4cd137' : isCurrent ? '#d4af37' : '#666',
                                                                        fontWeight: isAchieved ? '700' : '400',
                                                                        flex: 1
                                                                    }}>
                                                                        {rank.title}
                                                                    </span>
                                                                    <span style={{ 
                                                                        fontSize: '0.6rem', 
                                                                        color: isAchieved ? '#4cd137' : '#666'
                                                                    }}>
                                                                        Niv. {rank.level}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })()}

                        {character.attribute_points > 0 && (
                            <button
                                onClick={onLevelUpClick}
                                className="btn-gold pulse"
                                style={{ width: '100%', marginTop: '1.5rem', padding: '0.8rem', fontSize: '0.8rem', borderRadius: '6px' }}
                            >
                                ✨ AMÉLIORER (+{character.attribute_points} POINTS)
                            </button>
                        )}
                    </div>
                )}

                {activeTab === 'equip' && (
                    <div style={{
                        display: 'block',
                        width: '100%',
                        animation: 'fadeIn 0.4s ease-out',
                        border: '1px solid rgba(255,255,255,0.05)',
                        background: 'rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        padding: '0.5rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h4 style={{ fontSize: '0.7rem', color: 'var(--gold-dim)', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Besace & Equipement</h4>
                            {onTradeClick && (
                                <button
                                    onClick={onTradeClick}
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--gold-dim)', borderRadius: '4px', color: 'var(--gold-primary)', cursor: 'pointer' }}
                                >
                                    ECHANGER
                                </button>
                            )}
                        </div>
                        {/* DEBUG: Log inventory */}
                        {console.log('[CharacterSheet] Inventory:', character.inventory, 'Count:', character.inventory?.length)}

                        {(!character.inventory || character.inventory.length === 0) ? (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#666', background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎒</div>
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>Inventaire vide</div>
                                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                                    Trouvez des objets en explorant le monde
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
                                {character.inventory.map((item, i) => {
                                    if (!item) return null; // Safety check for null items

                                    const equipped = item.equipped;
                                    const isConsumable = (item.stats && (item.stats.heal || item.stats.resource || item.stats.hp)) ||
                                        ['consumable', 'potion', 'scroll', 'nourriture', 'boisson'].includes(item.type?.toLowerCase());
                                    const equippable = isEquippable(item);

                                    return (
                                        <div key={i} style={{
                                            padding: '1rem',
                                            background: equipped ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255,255,255,0.03)',
                                            borderRadius: '8px',
                                            border: equipped ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.1)',
                                            boxShadow: equipped ? '0 0 15px rgba(212,175,55,0.1)' : 'none',
                                            transition: 'all 0.2s ease'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 'bold', color: equipped ? 'var(--gold-primary)' : '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        {item.name}
                                                        {equipped && <span style={{ fontSize: '0.6rem', background: 'var(--gold-primary)', color: '#000', padding: '1px 4px', borderRadius: '3px', fontWeight: '900' }}>ÉQUIPÉ</span>}
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginTop: '4px', lineHeight: '1.3' }}>{item.desc || 'Aucune description.'}</div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                    {isConsumable && (
                                                        <button
                                                            style={{ fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(84, 160, 255, 0.1)', border: '1px solid #54a0ff', color: '#54a0ff', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                                                            onClick={(e) => { e.stopPropagation(); onConsume && onConsume(item, i); }}
                                                        >
                                                            UTILISER
                                                        </button>
                                                    )}
                                                    {equippable && (
                                                        <button
                                                            style={{
                                                                fontSize: '0.6rem', padding: '4px 8px',
                                                                background: equipped ? 'rgba(255,107,107,0.1)' : 'rgba(212,175,55,0.1)',
                                                                border: '1px solid currentColor',
                                                                color: equipped ? '#ff6b6b' : 'var(--gold-primary)',
                                                                cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', whiteSpace: 'nowrap'
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (onEquipItem) onEquipItem(i);
                                                                else {
                                                                    const newInv = character.inventory.map((invItem, idx) => idx === i ? { ...invItem, equipped: !equipped } : invItem);
                                                                    onUpdateInventory(newInv);
                                                                }
                                                            }}
                                                        >
                                                            {equipped ? 'RETIRER' : 'ÉQUIPER'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {item.stats && Object.keys(item.stats).length > 0 && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                    {Object.entries(item.stats).map(([k, v]) => (
                                                        <span key={k} style={{ fontSize: '0.55rem', color: '#48dbfb', textTransform: 'uppercase', background: 'rgba(72,219,251,0.05)', padding: '2px 6px', borderRadius: '3px', border: '1px solid rgba(72,219,251,0.1)', fontWeight: 'bold' }}>
                                                            {k} {v > 0 ? `+${v}` : v}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'abilities' && (
                    <div className="animate-fade-in abilities-list-scroll-area">
                        {knownAbilities.length === 0 && (
                            <div className="chat-message system" style={{ margin: '1rem 0' }}>
                                <div className="msg-author">Système</div>
                                <div style={{ fontSize: '0.85rem' }}>Aucune aptitude particulière n'a été trouvée pour votre profil actuel.</div>
                            </div>
                        )}
                        <h4 style={{ fontSize: '0.7rem', color: 'var(--gold-dim)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '1.8px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '8px' }}>✧</span> Aptitudes Connues <span style={{ marginLeft: 'auto', color: 'var(--gold-primary)', opacity: 0.6 }}>{knownAbilities.length}</span>
                        </h4>

                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                            {knownAbilities.map((ability, i) => {
                                return (
                                    <div key={i} className="ability-card" style={{
                                        padding: '1.2rem',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(212, 175, 55, 0.15)',
                                        position: 'relative',
                                        transition: 'all 0.3s ease',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0, left: 0, width: '2px', height: '100%',
                                            background: 'var(--gold-primary)',
                                            boxShadow: '0 0 10px var(--gold-primary)'
                                        }} />

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                            <div>
                                                <div style={{
                                                    color: 'var(--gold-light)',
                                                    fontWeight: '800',
                                                    fontSize: '1rem',
                                                    letterSpacing: '0.8px',
                                                    textShadow: '0 0 10px rgba(251, 238, 168, 0.2)'
                                                }}>
                                                    {ability.name?.toUpperCase() || "SANS NOM"}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.65rem',
                                                    color: 'rgba(255,255,255,0.4)',
                                                    marginTop: '4px',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    NIVEAU REQUIS: {ability.level || 1}
                                                </div>
                                            </div>
                                            {ability.cost > 0 && (
                                                <div style={{ fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(72,219,251,0.3)' }}>
                                                    {(() => {
                                                        const baseClassName = (character.class || "").split(' ')[0].toLowerCase();
                                                        const manaClasses = ["mage", "clerc", "paladin", "druide", "barde"];
                                                        const resourceType = manaClasses.includes(baseClassName) ? "MANA" : "ENDURANCE";
                                                        return `${ability.cost} ${resourceType}`;
                                                    })()}
                                                </div>
                                            )}
                                        </div>

                                        {ability.flavor && (
                                            <div style={{ fontSize: '0.7rem', color: '#888', fontStyle: 'italic', marginBottom: '8px', lineHeight: '1.4' }}>
                                                "{ability.flavor}"
                                            </div>
                                        )}

                                        {ability.desc && (
                                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', marginBottom: '10px', lineHeight: '1.5' }}>
                                                {ability.desc}
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                            {ability.dice && (
                                                <span style={{ fontSize: '0.65rem', color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                                    🎲 DÉS: {ability.dice} {ability.scaling && ` + ${statNames[ability.scaling]?.full || ability.scaling}`}
                                                </span>
                                            )}
                                            {/* Indicateur de cible */}
                                            {(() => {
                                                // Déterminer le type de cible
                                                const isFriendly = ability.friendly === true;
                                                const isSelf = ability.target === 'self' || (!ability.friendly && ability.heal && !ability.range);
                                                const isAlly = isFriendly || ability.heal || ability.target === 'ally';
                                                const isEnemy = !isFriendly && !isSelf && !isAlly;
                                                
                                                if (isSelf) {
                                                    return (
                                                        <span style={{ fontSize: '0.65rem', color: '#48dbfb', background: 'rgba(72,219,251,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(72,219,251,0.3)' }}>
                                                            👤 SOI
                                                        </span>
                                                    );
                                                } else if (isAlly) {
                                                    return (
                                                        <span style={{ fontSize: '0.65rem', color: '#4cd137', background: 'rgba(76,209,55,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(76,209,55,0.3)' }}>
                                                            🛡️ ALLIÉ
                                                        </span>
                                                    );
                                                } else if (isEnemy) {
                                                    return (
                                                        <span style={{ fontSize: '0.65rem', color: '#ff6b6b', background: 'rgba(255,107,107,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,107,107,0.3)' }}>
                                                            ⚔️ ENNEMI
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })()}
                                            {ability.heal && <span style={{ fontSize: '0.65rem', color: '#ff6b6b', background: 'rgba(255,107,107,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,107,107,0.2)' }}>❤️ SOIN</span>}
                                            {ability.resource && <span style={{ fontSize: '0.65rem', color: '#48dbfb', background: 'rgba(72,219,251,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(72,219,251,0.2)' }}>⚡ RES: +{ability.resource}</span>}
                                            {ability.range && <span style={{ fontSize: '0.65rem', color: '#f39c12', background: 'rgba(243,156,18,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(243,156,18,0.2)' }}>🎯 PORTÉE: {ability.range}m</span>}
                                        </div>

                                        {ability.cooldown > 0 && (
                                            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right' }}>
                                                ⏳ RECHARGE: {ability.cooldown} TOURS
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'professions' && (
                    <div style={{
                        display: 'block',
                        width: '100%',
                        animation: 'fadeIn 0.4s ease-out',
                        border: '1px solid rgba(255,255,255,0.05)',
                        background: 'rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        padding: '1rem'
                    }}>
                        {/* Serments et Hiérarchies de Métiers */}
                        {(() => {
                            // Récupérer les professions depuis gameSystemsManager si non présentes dans character
                            const professions = character.professions || gameSystemsManager.gameState?.player_professions?.map(pp => {
                                const profData = gameSystemsManager.getProfessionData?.(pp.profession_id);
                                if (!profData) return null;
                                const currentRank = profData.ranks?.find(r => r.level === pp.level);
                                const nextRank = profData.ranks?.find(r => r.level === pp.level + 1);
                                return {
                                    profession_id: pp.profession_id,
                                    name: profData.name,
                                    level: pp.level,
                                    xp: pp.xp,
                                    next_rank_xp: nextRank?.xp_required,
                                    ranks: profData.ranks?.map(r => ({
                                        level: r.level,
                                        title: r.title
                                    })),
                                    isGathering: ['mining', 'herbalism', 'fishing', 'hunting', 'skinning', 'logging'].includes(pp.profession_id)
                                };
                            }).filter(Boolean) || [];
                            
                            if (professions.length === 0) {
                                return (
                                    <div style={{ 
                                        marginTop: '1.5rem', 
                                        padding: '1.5rem', 
                                        background: 'rgba(139,115,85,0.08)', 
                                        borderRadius: '12px', 
                                        border: '1px solid rgba(139,115,85,0.3)', 
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚒️</div>
                                        <h4 style={{ fontSize: '0.9rem', color: '#d4af37', marginBottom: '0.5rem' }}>
                                            Aucun métier appris
                                        </h4>
                                        <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem' }}>
                                            Vous n'avez pas encore prêté serment à une guilde. 
                                            Ouvrez le Codex pour apprendre un métier.
                                        </p>
                                        <div style={{ fontSize: '0.7rem', color: '#666' }}>
                                            Métiers disponibles : Forge, Alchimie, Minage, Herboristerie...
                                        </div>
                                    </div>
                                );
                            }
                            
                            // Séparer les métiers de récolte et de craft
                            const gatheringProfessions = professions.filter(p => p.isGathering);
                            const craftingProfessions = professions.filter(p => !p.isGathering);
                            
                            return (
                                <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(139,115,85,0.08)', borderRadius: '12px', border: '1px solid rgba(139,115,85,0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                                    <h4 style={{ fontSize: '0.85rem', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '900' }}>
                                        <span style={{ fontSize: '1.2rem' }}>⚒️</span>
                                        <span>Serments Prêtés</span>
                                    </h4>
                                    
                                    {/* Section Récolte */}
                                    {gatheringProfessions.length > 0 && (
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h5 style={{ fontSize: '0.75rem', color: '#4cd137', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <span>🌿</span>
                                                <span>Métiers de Récolte</span>
                                            </h5>
                                            
                                            {/* Bouton Scanner */}
                                            <button
                                                onClick={() => scanForResources('forest')}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.6rem',
                                                    marginBottom: '1rem',
                                                    background: 'rgba(76,209,55,0.15)',
                                                    border: '1px solid #4cd137',
                                                    color: '#4cd137',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.75rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <span>🔍</span>
                                                <span>Scanner la zone pour des ressources</span>
                                            </button>
                                            
                                            {/* Spots de récolte découverts */}
                                            {gatheringSpots.length > 0 && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                                                    <h6 style={{ fontSize: '0.7rem', color: '#aaa', margin: 0 }}>Ressources découvertes :</h6>
                                                    {gatheringSpots.filter(s => s.discovered).map((spot, idx) => {
                                                        const resource = ALL_RESOURCES.find(r => r.id === spot.resourceId);
                                                        if (!resource) return null;
                                                        const canGather = gatheringProfessions.some(p => {
                                                            const profData = gameSystemsManager.getProfessionData?.(p.profession_id);
                                                            return profData?.gatheringType === resource.gatheredBy || p.profession_id === resource.gatheredBy;
                                                        });
                                                        
                                                        return (
                                                            <div key={idx} style={{
                                                                padding: '0.6rem',
                                                                background: 'rgba(0,0,0,0.3)',
                                                                borderRadius: '6px',
                                                                border: '1px solid rgba(139,115,85,0.2)',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}>
                                                                <div>
                                                                    <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold' }}>
                                                                        {resource.name}
                                                                    </div>
                                                                    <div style={{ fontSize: '0.65rem', color: '#888' }}>
                                                                        {spot.description} • DD: {spot.difficulty}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => attemptGathering(spot.id)}
                                                                    disabled={!canGather || spot.quantity <= 0}
                                                                    style={{
                                                                        padding: '0.4rem 0.8rem',
                                                                        background: canGather && spot.quantity > 0 ? 'rgba(76,209,55,0.2)' : 'rgba(100,100,100,0.2)',
                                                                        border: '1px solid ' + (canGather && spot.quantity > 0 ? '#4cd137' : '#666'),
                                                                        color: canGather && spot.quantity > 0 ? '#4cd137' : '#666',
                                                                        borderRadius: '4px',
                                                                        cursor: canGather && spot.quantity > 0 ? 'pointer' : 'not-allowed',
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >
                                                                    {spot.quantity > 0 ? 'Récolter' : 'Épuisé'}
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                            
                                            {/* Résultat de la récolte */}
                                            {gatheringResult && (
                                                <div style={{
                                                    padding: '0.8rem',
                                                    background: gatheringResult.success ? 'rgba(76,209,55,0.15)' : 'rgba(255,107,107,0.15)',
                                                    borderRadius: '6px',
                                                    border: '1px solid ' + (gatheringResult.success ? '#4cd137' : '#ff6b6b'),
                                                    marginBottom: '1rem'
                                                }}>
                                                    <div style={{ fontSize: '0.8rem', color: gatheringResult.success ? '#4cd137' : '#ff6b6b', fontWeight: 'bold' }}>
                                                        {gatheringResult.success ? '✅ Réussite !' : '❌ Échec'}
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', color: '#ccc' }}>
                                                        {gatheringResult.message}
                                                    </div>
                                                    <div style={{ fontSize: '0.65rem', color: '#888', marginTop: '0.3rem' }}>
                                                        Jet: {gatheringResult.roll} + {gatheringResult.statModifier} = {gatheringResult.total}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Liste des métiers de récolte */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {gatheringProfessions.map((prof, idx) => (
                                                    <div key={idx} style={{ padding: '0.6rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ fontSize: '0.8rem', color: '#d4af37' }}>{prof.name}</span>
                                                            <span style={{ fontSize: '0.65rem', color: '#4cd137' }}>Niv. {prof.level}</span>
                                                        </div>
                                                        {prof.next_rank_xp && (
                                                            <div style={{ marginTop: '0.4rem' }}>
                                                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                                                    <div style={{ 
                                                                        height: '100%', 
                                                                        width: `${Math.min(100, (prof.xp / prof.next_rank_xp) * 100)}%`, 
                                                                        background: '#4cd137'
                                                                    }} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Section Craft */}
                                    {craftingProfessions.length > 0 && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <h5 style={{ fontSize: '0.75rem', color: '#d4af37', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <span>🔨</span>
                                                <span>Métiers de Fabrication</span>
                                            </h5>
                                            {craftingProfessions.map((prof, idx) => (
                                                <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(139,115,85,0.2)' }}>
                                                    {/* Nom du métier et niveau actuel */}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                                        <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#d4af37' }}>{prof.name}</span>
                                                        <span style={{ fontSize: '0.7rem', color: '#4cd137', fontWeight: '700', padding: '3px 8px', background: 'rgba(76,209,55,0.15)', borderRadius: '4px' }}>
                                                            Niv. {prof.level}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Barre de progression vers le prochain niveau */}
                                                    {prof.next_rank_xp && (
                                                        <div style={{ marginBottom: '0.8rem' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', marginBottom: '3px' }}>
                                                                <span style={{ color: 'var(--text-muted)' }}>Progression</span>
                                                                <span style={{ color: '#4cd137' }}>{prof.xp} / {prof.next_rank_xp} XP</span>
                                                            </div>
                                                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                                                <div style={{ 
                                                                    height: '100%', 
                                                                    width: `${Math.min(100, (prof.xp / prof.next_rank_xp) * 100)}%`, 
                                                                    background: 'linear-gradient(90deg, #4cd137, #5dff98)', 
                                                                    transition: 'width 0.4s ease',
                                                                    boxShadow: '0 0 8px rgba(76,209,55,0.4)'
                                                                }} />
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Liste des rangs avec les atteints en vert */}
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                        {prof.ranks?.map((rank, ridx) => {
                                                            const isAchieved = rank.level <= prof.level;
                                                            const isCurrent = rank.level === prof.level + 1;
                                                            return (
                                                                <div key={ridx} 
                                                                    onClick={() => {
                                                                        // Récupérer les données complètes de la profession pour les crafts
                                                                        const fullProfData = gameSystemsManager.getProfessionData?.(prof.profession_id || prof.id);
                                                                        if (fullProfData) {
                                                                            // Filtrer les recipes disponibles à ce niveau
                                                                            const availableRecipes = fullProfData.recipes?.filter(r => r.level_required <= rank.level) || [];
                                                                            // Ajouter les nouvelles recettes débloquées à ce niveau spécifique
                                                                            const newRecipes = fullProfData.recipes?.filter(r => r.level_required === rank.level) || [];
                                                                            setSelectedProfessionRank({
                                                                                rank: rank,
                                                                                professionName: prof.name,
                                                                                professionId: prof.profession_id || prof.id,
                                                                                allRecipes: availableRecipes,
                                                                                newRecipes: newRecipes,
                                                                                playerLevel: prof.level
                                                                            });
                                                                        }
                                                                    }}
                                                                    style={{ 
                                                                        display: 'flex', 
                                                                        alignItems: 'center', 
                                                                        gap: '0.5rem',
                                                                        padding: '0.4rem 0.6rem',
                                                                        background: isAchieved ? 'rgba(76,209,55,0.1)' : isCurrent ? 'rgba(212,175,55,0.1)' : 'transparent',
                                                                        borderRadius: '4px',
                                                                        border: isAchieved ? '1px solid rgba(76,209,55,0.3)' : isCurrent ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                    onMouseEnter={e => {
                                                                        if (!isAchieved) {
                                                                            e.currentTarget.style.background = 'rgba(139,115,85,0.2)';
                                                                        }
                                                                    }}
                                                                    onMouseLeave={e => {
                                                                        if (!isAchieved) {
                                                                            e.currentTarget.style.background = isCurrent ? 'rgba(212,175,55,0.1)' : 'transparent';
                                                                        }
                                                                    }}
                                                                >
                                                                    <span style={{ 
                                                                        fontSize: '0.7rem', 
                                                                        color: isAchieved ? '#4cd137' : isCurrent ? '#d4af37' : '#666',
                                                                        fontWeight: isAchieved ? '700' : '400'
                                                                    }}>
                                                                        {isAchieved ? '✓' : isCurrent ? '▸' : '○'}
                                                                    </span>
                                                                    <span style={{ 
                                                                        fontSize: '0.75rem', 
                                                                        color: isAchieved ? '#4cd137' : isCurrent ? '#d4af37' : '#666',
                                                                        fontWeight: isAchieved ? '700' : '400',
                                                                        flex: 1
                                                                    }}>
                                                                        {rank.title}
                                                                    </span>
                                                                    <span style={{ 
                                                                        fontSize: '0.6rem', 
                                                                        color: isAchieved ? '#4cd137' : '#666'
                                                                    }}>
                                                                        Niv. {rank.level}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                )}


            </div>

            {/* Footer */}
            <div className="sheet-footer" style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)' }}>
                <button
                    onClick={onToggleSettings}
                    style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px', transition: 'all 0.2s', letterSpacing: '1px' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
                >
                    SANCTUAIRE (PARAMÈTRES)
                </button>
            </div>

            {
                enlargedImage && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setEnlargedImage(null)}>
                        <img src={enlargedImage} style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px', border: '2px solid var(--gold-primary)' }} />
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>×</div>
                    </div>
                )
            }

            {/* Modal Aptitude Spéciale */}
            {selectedTrait && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setSelectedTrait(null)}>
                    <div style={{ 
                        maxWidth: '400px', 
                        width: '100%',
                        padding: '1.5rem', 
                        background: 'rgba(20,20,25,0.95)', 
                        border: '1px solid rgba(212,175,55,0.4)', 
                        borderRadius: '12px',
                        boxShadow: '0 0 40px rgba(212,175,55,0.2)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold-primary)', fontWeight: '800', margin: 0 }}>{selectedTrait.name}</h3>
                            <button onClick={() => setSelectedTrait(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>
                        
                        {selectedTrait.effect && (
                            <div style={{ 
                                fontSize: '0.9rem', 
                                color: '#4cd137', 
                                fontWeight: '700', 
                                padding: '0.8rem', 
                                background: 'rgba(76,209,55,0.1)', 
                                borderRadius: '8px', 
                                border: '1px solid rgba(76,209,55,0.3)',
                                marginBottom: '1rem'
                            }}>
                                {selectedTrait.effect}
                            </div>
                        )}
                        
                        <div style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.5', marginBottom: '1rem' }}>
                            {selectedTrait.desc || selectedTrait.game_effect || 'Aucune description'}
                        </div>
                        
                        {selectedTrait._source && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(212,175,55,0.6)', fontStyle: 'italic' }}>
                                Source: {selectedTrait._source}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal des Crafts de Profession */}
            {selectedProfessionRank && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => !craftingState.isCrafting && setSelectedProfessionRank(null)}>
                    <div style={{ 
                        maxWidth: '550px', 
                        width: '100%',
                        maxHeight: '85vh',
                        overflowY: 'auto',
                        padding: '1.5rem', 
                        background: 'rgba(20,20,25,0.98)', 
                        border: '1px solid rgba(139,115,85,0.5)', 
                        borderRadius: '12px',
                        boxShadow: '0 0 50px rgba(0,0,0,0.8)',
                        position: 'relative'
                    }} onClick={e => e.stopPropagation()}>
                        {/* Overlay de crafting */}
                        {craftingState.isCrafting && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.9)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 100,
                                borderRadius: '12px'
                            }}>
                                <div style={{
                                    fontSize: '4rem',
                                    animation: 'anvilStrike 0.8s ease-in-out infinite',
                                    marginBottom: '1rem'
                                }}>⚒️</div>
                                <div style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    Fabrication en cours...
                                </div>
                                <style>{`
                                    @keyframes anvilStrike {
                                        0%, 100% { transform: translateY(0) rotate(0deg); }
                                        25% { transform: translateY(-10px) rotate(-5deg); }
                                        50% { transform: translateY(0) rotate(0deg); }
                                        75% { transform: translateY(2px) rotate(2deg); }
                                    }
                                `}</style>
                            </div>
                        )}

                        {/* Feedback du craft */}
                        {craftFeedback && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                padding: '1.5rem',
                                background: craftFeedback.success ? 'rgba(76,209,55,0.95)' : 'rgba(255,107,107,0.95)',
                                borderRadius: '12px',
                                border: `2px solid ${craftFeedback.success ? '#4cd137' : '#ff6b6b'}`,
                                textAlign: 'center',
                                zIndex: 101,
                                minWidth: '300px'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                                    {craftFeedback.success ? '✨' : '💥'}
                                </div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                                    {craftFeedback.success ? 'CRAFT RÉUSSI !' : 'ÉCHEC DU CRAFT'}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.5rem' }}>
                                    {craftFeedback.message}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: craftFeedback.success ? '#a8e6cf' : '#ffb3b3' }}>
                                    +{craftFeedback.xp} XP
                                </div>
                                <button 
                                    onClick={() => setCraftFeedback(null)}
                                    style={{
                                        marginTop: '1rem',
                                        padding: '0.5rem 1.5rem',
                                        background: 'rgba(255,255,255,0.2)',
                                        border: '1px solid #fff',
                                        color: '#fff',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    FERMER
                                </button>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(139,115,85,0.3)' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: '#d4af37', fontWeight: '800', margin: 0 }}>{selectedProfessionRank.rank.title}</h3>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                    {selectedProfessionRank.professionName} - Niveau {selectedProfessionRank.rank.level}
                                </div>
                            </div>
                            <button 
                                onClick={() => !craftingState.isCrafting && setSelectedProfessionRank(null)} 
                                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: craftingState.isCrafting ? 'not-allowed' : 'pointer', opacity: craftingState.isCrafting ? 0.5 : 1 }}>×</button>
                        </div>
                        
                        {/* Crafts disponibles */}
                        <div>
                            <h4 style={{ fontSize: '0.8rem', color: '#4cd137', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>⚒️</span>
                                <span>Crafts Disponibles</span>
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {selectedProfessionRank.allRecipes.map((recipe, idx) => {
                                    const isNew = recipe.level_required === selectedProfessionRank.rank.level;
                                    const canCraft = (() => {
                                        const inventory = character.inventory || [];
                                        return recipe.ingredients.every(ing => {
                                            const count = inventory.filter(item => item.id === ing.itemId || item.name?.toLowerCase().includes(ing.itemId.toLowerCase())).reduce((sum, item) => sum + (item.quantity || 1), 0);
                                            return count >= ing.quantity;
                                        });
                                    })();
                                    
                                    return (
                                        <div key={idx} style={{ 
                                            padding: '0.8rem', 
                                            background: isNew ? 'rgba(76,209,55,0.08)' : 'rgba(255,255,255,0.03)', 
                                            borderRadius: '8px', 
                                            border: `1px solid ${canCraft ? (isNew ? 'rgba(76,209,55,0.3)' : 'rgba(212,175,55,0.3)') : 'rgba(255,107,107,0.2)'}`
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: canCraft ? '#fff' : '#666' }}>
                                                    {isNew && '✨ '}{recipe.name}
                                                </span>
                                                <span style={{ fontSize: '0.65rem', color: isNew ? '#4cd137' : 'var(--text-muted)', padding: '2px 6px', background: isNew ? 'rgba(76,209,55,0.15)' : 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                                    Niv. {recipe.level_required}
                                                </span>
                                            </div>
                                            
                                            {/* Ingrédients avec indicateur de possession */}
                                            <div style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                                                {recipe.ingredients.map((ing, iidx) => {
                                                    const inventory = character.inventory || [];
                                                    const count = inventory.filter(item => item.id === ing.itemId || item.name?.toLowerCase().includes(ing.itemId.toLowerCase())).reduce((sum, item) => sum + (item.quantity || 1), 0);
                                                    const hasEnough = count >= ing.quantity;
                                                    return (
                                                        <span key={iidx} style={{ 
                                                            color: hasEnough ? '#4cd137' : '#ff6b6b',
                                                            marginRight: '0.5rem'
                                                        }}>
                                                            {hasEnough ? '✓' : '✗'} {ing.quantity}x {ing.itemId} (vous avez {count})
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                                ⏱️ {recipe.crafting_time_minutes} min | 🎯 {recipe.success_rate_formula}
                                            </div>
                                            
                                            {recipe.critical_success_bonus && (
                                                <div style={{ fontSize: '0.65rem', color: '#4cd137', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                                                    ✨ Critique: {recipe.critical_success_bonus}
                                                </div>
                                            )}
                                            
                                            {/* Bouton Craft */}
                                            {canCraft ? (
                                                <button
                                                    onClick={() => handleCraft(recipe, selectedProfessionRank.professionId)}
                                                    disabled={craftingState.isCrafting}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.6rem',
                                                        background: 'rgba(212,175,55,0.2)',
                                                        border: '1px solid #d4af37',
                                                        color: '#d4af37',
                                                        borderRadius: '6px',
                                                        cursor: craftingState.isCrafting ? 'not-allowed' : 'pointer',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.8rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.5rem',
                                                        opacity: craftingState.isCrafting ? 0.5 : 1
                                                    }}
                                                >
                                                    <span>⚒️</span>
                                                    <span>FABRIQUER</span>
                                                </button>
                                            ) : (
                                                <div style={{
                                                    width: '100%',
                                                    padding: '0.6rem',
                                                    background: 'rgba(255,107,107,0.1)',
                                                    border: '1px solid rgba(255,107,107,0.3)',
                                                    color: '#ff6b6b',
                                                    borderRadius: '6px',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.75rem',
                                                    textAlign: 'center'
                                                }}>
                                                    ❌ Ressources manquantes
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Compétence */}
            {selectedSkill && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setSelectedSkill(null)}>
                    <div style={{ 
                        maxWidth: '350px', 
                        width: '100%',
                        padding: '1.5rem', 
                        background: 'rgba(20,20,30,0.95)', 
                        border: '1px solid rgba(84,160,255,0.4)', 
                        borderRadius: '12px',
                        boxShadow: '0 0 40px rgba(84,160,255,0.2)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{selectedSkill.info.icon}</span>
                                <h3 style={{ fontSize: '1.2rem', color: '#54a0ff', fontWeight: '800', margin: 0 }}>{selectedSkill.info.label}</h3>
                            </div>
                            <button onClick={() => setSelectedSkill(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>
                        
                        <div style={{ fontSize: '0.8rem', color: 'rgba(84,160,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                            {selectedSkill.info.category}
                        </div>
                        
                        {selectedSkill.bonus && (
                            <div style={{ 
                                fontSize: '1rem', 
                                color: '#4cd137', 
                                fontWeight: '700', 
                                padding: '0.6rem 1rem', 
                                background: 'rgba(76,209,55,0.1)', 
                                borderRadius: '8px', 
                                border: '1px solid rgba(76,209,55,0.3)',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}>
                                Bonus: +{selectedSkill.bonus}
                            </div>
                        )}
                        
                        {selectedSkill.reason && (
                            <div style={{ fontSize: '0.9rem', color: '#aaa', fontStyle: 'italic', textAlign: 'center' }}>
                                "{selectedSkill.reason}"
                            </div>
                        )}
                    </div>
                </div>
            )}
        </aside >
    );
};
