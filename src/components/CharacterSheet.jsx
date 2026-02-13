import React from 'react';
import { CLASSES } from '../lore';

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

    const modStr = (val) => {
        const mod = Math.floor((val - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    const getStatBonus = (stat) => {
        if (!character.inventory) return 0;
        let bonus = 0;
        character.inventory.forEach(item => {
            if (item.equipped && item.stats && item.stats[stat]) {
                bonus += item.stats[stat];
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

    // Robust Ability Lookup
    const getClassAbilities = () => {
        if (!character?.class) return [];
        const classData = CLASSES[character.class.split(' ')[0]] || CLASSES[character.class];
        if (!classData) return [];

        const playerAbilities = [...(character.abilities || []), ...(character.spells || [])];
        let baseAbilities = [];
        if (playerAbilities.length > 0) {
            baseAbilities = playerAbilities.map(s => {
                if (typeof s === 'string') {
                    const fromInitial = (classData.initial_ability_options || []).find(a => a.name === s);
                    const fromUnlockables = (classData.unlockables || []).find(u => u.name === s);
                    return fromInitial || fromUnlockables || { name: s, desc: "Aptitude apprise", level: 1, cost: 0 };
                }
                return s;
            });
        } else {
            baseAbilities = classData.initial_ability_options || classData.abilities || [];
        }

        const unlocked = (classData.unlockables || []).filter(u => u.level <= (character.level || 1));
        const all = [...baseAbilities, ...unlocked];
        return Array.from(new Map(all.map(item => [item.name, item])).values());
    };

    const knownAbilities = getClassAbilities();

    // Utility to check if item is equippable
    const isEquippable = (item) => {
        const equippableTypes = ['weapon', 'armor', 'shield', 'ring', 'amulet', 'boots', 'cloak', 'helmet', 'gloves', 'head', 'chest', 'mainhand', 'offhand'];
        const consumableTypes = ['consumable', 'potion', 'scroll', 'food', 'drink'];

        if (consumableTypes.includes(item.type?.toLowerCase())) return false;

        return equippableTypes.includes(item.type?.toLowerCase()) || (item.slot && item.slot !== 'none' && item.slot !== 'consumable');
    };

    return (
        <aside className="character-sheet" style={{
            position: 'fixed', left: '1rem', top: '1rem', bottom: '1rem', width: '310px',
            background: 'rgba(10,10,15,0.95)', border: '1px solid var(--glass-border)', borderRadius: '8px',
            display: 'flex', flexDirection: 'column', color: '#fff', backdropFilter: 'blur(10px)', zIndex: 100,
            pointerEvents: 'auto'
        }}>
            {/* Header */}
            <div className="sheet-header" style={{ padding: '1.2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '55px', height: '55px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--gold-primary)', background: '#000', boxShadow: '0 0 10px rgba(212,175,55,0.2)' }}>
                    <img src={character.portrait_url || 'https://placehold.co/60'} alt="Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--gold-primary)', letterSpacing: '0.5px' }}>{character.name}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{character.class} - NIV. {character.level}</div>
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
                            flex: 1, padding: '0.9rem 0', background: activeTab === tab.id ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                            border: 'none', borderBottom: activeTab === tab.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
                            color: activeTab === tab.id ? 'var(--gold-primary)' : 'var(--text-muted)',
                            fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="sheet-content" style={{ flex: 1, overflowY: 'auto', padding: '1.2rem', scrollbarWidth: 'thin' }}>
                {activeTab === 'stats' && (
                    <div className="animate-fade-in">
                        <div className="vitals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', marginBottom: '1.2rem' }}>
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>VITALITÉ (PV)</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#54a0ff' }}>{character.hp}</span>
                            </div>
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>ARMURE (CA)</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--gold-primary)' }}>{totalAC()}</span>
                            </div>
                            <div className="vital-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>ATTAQUE (ATK)</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#ff6b6b' }}>{totalATK()}</span>
                            </div>
                            <div className="vital-box" style={{ background: 'rgba(212,175,55,0.05)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center', border: '1px solid var(--gold-dim)' }}>
                                <span style={{ fontSize: '0.6rem', color: 'var(--gold-dim)', display: 'block', marginBottom: '2px' }}>ÉCLATS (OR)</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--gold-primary)' }}>{character.gold || 0}</span>
                            </div>
                        </div>

                        {/* Resource Bar */}
                        {(() => {
                            const manaClasses = ["Mage", "Clerc", "Paladin", "Druide", "Barde"];
                            const isMana = manaClasses.includes(character.class.split(' ')[0]);
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

                        <h4 style={{ fontSize: '0.7rem', color: 'var(--gold-dim)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '4px' }}>Caractéristiques</h4>
                        <div className="attributes-list" style={{ display: 'grid', gap: '4px' }}>
                            {Object.entries(character.stats || {})
                                .filter(([key]) => key !== 'mechanic')
                                .map(([key, val]) => {
                                    const bonus = getStatBonus(key);
                                    const total = val + bonus;
                                    return (
                                        <div key={key} title={statNames[key]?.desc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', border: '1px solid transparent', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                                            <div>
                                                <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: '#fff', fontWeight: '900', display: 'block' }}>{key}</span>
                                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{statNames[key]?.full}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                <span style={{ fontWeight: '900', color: '#fff', fontSize: '1.1rem' }}>{total}</span>
                                                <span style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>({modStr(total)})</span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Traits et Aptitudes LifePath */}
                        {character.mechanical_traits && character.mechanical_traits.length > 0 && (
                            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(212,175,55,0.05)', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.2)' }}>
                                <h4 style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>✨</span>
                                    <span>Aptitudes Spéciales</span>
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {character.mechanical_traits.map((trait, idx) => (
                                        <div key={idx} style={{ padding: '0.7rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.15)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--gold-primary)' }}>{trait.name}</span>
                                                {trait.effect && (
                                                    <span style={{ fontSize: '0.7rem', color: '#4cd137', fontWeight: '600', padding: '2px 6px', background: 'rgba(76,209,55,0.1)', borderRadius: '3px' }}>
                                                        {trait.effect}
                                                    </span>
                                                )}
                                            </div>
                                            {trait.desc && (
                                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                                                    {trait.desc}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Compétences acquises */}
                        {character.skill_bonuses && character.skill_bonuses.length > 0 && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(84,160,255,0.05)', borderRadius: '8px', border: '1px solid rgba(84,160,255,0.2)' }}>
                                <h4 style={{ fontSize: '0.7rem', color: '#54a0ff', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>🎯</span>
                                    <span>Compétences Maîtrisées</span>
                                </h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {character.skill_bonuses.map((skill, idx) => {
                                        const label = typeof skill === 'string' ? skill : (skill.skillId || 'Compétence');
                                        return (
                                            <div key={idx} style={{ padding: '0.4rem 0.7rem', background: 'rgba(84,160,255,0.1)', borderRadius: '4px', border: '1px solid rgba(84,160,255,0.3)' }}>
                                                <span style={{ fontSize: '0.7rem', color: '#54a0ff', fontWeight: '600' }}>{label}</span>
                                            </div>
                                        );
                                    })}
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
                    <div className="animate-fade-in gallery-view">
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
                            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#666' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎒</div>
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>Inventaire vide</div>
                                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                                    Trouvez des objets en explorant le monde
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '0.8rem' }}>
                                {character.inventory.map((item, i) => {
                                    const equipped = item.equipped;
                                    const isConsumable = (item.stats && (item.stats.heal || item.stats.resource || item.stats.hp)) ||
                                        ['consumable', 'potion', 'scroll'].includes(item.type?.toLowerCase());
                                    const equippable = isEquippable(item);

                                    return (
                                        <div key={i} style={{
                                            padding: '1rem',
                                            background: equipped ? 'rgba(212, 175, 55, 0.08)' : 'rgba(0,0,0,0.3)',
                                            borderRadius: '6px',
                                            border: equipped ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.05)',
                                            boxShadow: equipped ? '0 0 15px rgba(212,175,55,0.1)' : 'none'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 'bold', color: equipped ? 'var(--gold-primary)' : '#fff', fontSize: '0.9rem' }}>{item.name}</div>
                                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>{item.desc}</div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '10px' }}>
                                                    {isConsumable && (
                                                        <button
                                                            style={{ fontSize: '0.65rem', padding: '5px 10px', background: 'rgba(84, 160, 255, 0.1)', border: '1px solid #54a0ff', color: '#54a0ff', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
                                                            onClick={() => onConsume && onConsume(item, i)}
                                                        >
                                                            USER
                                                        </button>
                                                    )}
                                                    {equippable && (
                                                        <button
                                                            style={{
                                                                fontSize: '0.65rem', padding: '5px 10px',
                                                                background: equipped ? 'rgba(255,107,107,0.1)' : 'rgba(212,175,55,0.1)',
                                                                border: '1px solid currentColor',
                                                                color: equipped ? '#ff6b6b' : 'var(--gold-primary)',
                                                                cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold'
                                                            }}
                                                            onClick={() => {
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
                                            {item.stats && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                                    {Object.entries(item.stats).map(([k, v]) => (
                                                        <span key={k} style={{ fontSize: '0.6rem', color: '#48dbfb', textTransform: 'uppercase', background: 'rgba(72,219,251,0.05)', padding: '2px 6px', borderRadius: '3px', border: '1px solid rgba(72,219,251,0.1)' }}>{k} +{v}</span>
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
                    <div className="animate-fade-in list-view">
                        <h4 style={{ fontSize: '0.7rem', color: 'var(--gold-dim)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Aptitudes Connues</h4>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {knownAbilities.map((ability, i) => (
                                <div key={i} className="ability-card" style={{
                                    padding: '1.2rem',
                                    background: 'linear-gradient(135deg, rgba(72, 219, 251, 0.05) 0%, transparent 100%)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(72, 219, 251, 0.1)',
                                    position: 'relative',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                        <div>
                                            <div style={{ color: '#48dbfb', fontWeight: '900', fontSize: '0.95rem', letterSpacing: '0.5px' }}>{ability.name.toUpperCase()}</div>
                                            <div style={{ fontSize: '0.6rem', color: 'rgba(72,219,251,0.6)', marginTop: '2px' }}>NIVEAU REQUIS: {ability.level || 1}</div>
                                        </div>
                                        {ability.cost > 0 && (
                                            <div style={{ fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(72,219,251,0.3)' }}>
                                                {ability.cost} RES
                                            </div>
                                        )}
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#ccd1d9', margin: 0, lineHeight: '1.5', fontStyle: 'italic' }}>"{ability.desc}"</p>
                                    {(ability.heal || ability.resource || ability.range || ability.dice || ability.scaling) && (
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
                                    )}
                                    {ability.cooldown > 0 && (
                                        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right' }}>
                                            ⏳ RECHARGE: {ability.cooldown} TOURS
                                        </div>
                                    )}
                                </div>
                            ))}
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

            {enlargedImage && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }} onClick={() => setEnlargedImage(null)}>
                    <img src={enlargedImage} style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px', border: '2px solid var(--gold-primary)' }} />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>×</div>
                </div>
            )}
        </aside>
    );
};
