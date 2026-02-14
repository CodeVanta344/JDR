import React from 'react';
import { CLASSES } from '../lore';
import { resolveCharacterAbilities } from '../utils/characterUtils';

export const CharacterSheet = ({ character, onUpdateInventory, onEquipItem, onToggleSettings, onConsume, onLevelUpClick, onTradeClick }) => {
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

    const [activeTab, setActiveTab] = React.useState('stats');
    const [enlargedImage, setEnlargedImage] = React.useState(null);

    const knownAbilities = resolveCharacterAbilities(character);

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
                    { id: 'abilities', label: 'APTITUDES' }
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
                padding: '1.2rem',
                scrollbarWidth: 'thin',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch'
            }}>
                {activeTab === 'stats' && (
                    <div className="animate-fade-in">
                        <div className="vitals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', marginBottom: '1.2rem' }}>
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>PV</span>
                                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#54a0ff' }}>{character.hp}</span>
                            </div>
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>CA</span>
                                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--gold-primary)' }}>{totalAC()}</span>
                            </div>
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '0.9rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>ATK</span>
                                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ff6b6b' }}>{totalATK()}</span>
                            </div>
                            <div className="vital-box" style={{ background: 'rgba(212,175,55,0.08)', padding: '0.9rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--gold-dim)' }}>
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

                        <h4 style={{ fontSize: '0.8rem', color: 'var(--gold-dim)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '6px' }}>Caractéristiques</h4>
                        <div className="attributes-list" style={{ display: 'grid', gap: '6px' }}>
                            {Object.entries(character.stats || {})
                                .filter(([key]) => key !== 'mechanic')
                                .map(([key, val]) => {
                                    const bonus = getStatBonus(key);
                                    const total = val + bonus;
                                    return (
                                        <div key={key} title={statNames[key]?.desc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid transparent', transition: 'all 0.2s', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                                            <div>
                                                <span style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: '#fff', fontWeight: '900', display: 'block', letterSpacing: '0.5px' }}>{key}</span>
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{statNames[key]?.full}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
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
                                        <div key={idx} style={{ padding: '0.9rem', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.2)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--gold-primary)', letterSpacing: '0.5px' }}>{trait.name}</span>
                                                {trait.effect && (
                                                    <span style={{ fontSize: '0.75rem', color: '#4cd137', fontWeight: '700', padding: '3px 8px', background: 'rgba(76,209,55,0.15)', borderRadius: '4px', border: '1px solid rgba(76,209,55,0.2)' }}>
                                                        {trait.effect}
                                                    </span>
                                                )}
                                            </div>
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
                                            return (
                                                <div key={idx} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '0.45rem 0.8rem',
                                                    background: 'rgba(84,160,255,0.08)',
                                                    borderRadius: '6px',
                                                    border: '1px solid rgba(84,160,255,0.2)',
                                                    transition: 'all 0.2s ease'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                        <span style={{ fontSize: '0.9rem' }}>{info.icon}</span>
                                                        <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}>{info.label}</span>
                                                    </div>
                                                    <span style={{ fontSize: '0.6rem', color: 'rgba(84,160,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{info.category}</span>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            </div>
                        )}

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
                                                    {ability.cost} RES
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
        </aside >
    );
};
