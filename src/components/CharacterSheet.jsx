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

    // Robust Ability Lookup
    const getClassAbilities = () => {
        if (!character?.class) return [];
        const classData = CLASSES[character.class.split(' ')[0]] || CLASSES[character.class];
        if (!classData) return [];

        // Get player's chosen abilities from character creation (stored in spells or abilities)
        const playerAbilities = [...(character.abilities || []), ...(character.spells || [])];

        // If player has chosen abilities, use those as base
        let baseAbilities = [];
        if (playerAbilities.length > 0) {
            baseAbilities = playerAbilities.map(s => {
                if (typeof s === 'string') {
                    // Find full data from class definition
                    const fromInitial = (classData.initial_ability_options || []).find(a => a.name === s);
                    const fromUnlockables = (classData.unlockables || []).find(u => u.name === s);
                    return fromInitial || fromUnlockables || { name: s, desc: "Aptitude apprise", level: 1, cost: 0 };
                }
                return s;
            });
        } else {
            // Fallback to class base abilities if none chosen
            baseAbilities = classData.initial_ability_options || classData.abilities || [];
        }

        // Add unlocked abilities based on level
        const unlocked = (classData.unlockables || []).filter(u => u.level <= (character.level || 1));

        const all = [...baseAbilities, ...unlocked];
        // Unique by name
        return Array.from(new Map(all.map(item => [item.name, item])).values());
    };

    const knownAbilities = getClassAbilities();

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
                    { id: 'abilities', label: 'APTITUDES' },
                    { id: 'codex', label: 'CODEX' }
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
                        {
                            (() => {
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
                            })()
                        }

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

                {/* INVENTORY TAB */}
                {activeTab === 'equip' && (
                    <div className="animate-fade-in gallery-view">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h4 style={{ fontSize: '0.7rem', color: 'var(--gold-dim)', margin: 0, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Besace & Equipement</h4>
                            {onTradeClick && (
                                <button
                                    onClick={onTradeClick}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        fontSize: '0.7rem',
                                        background: 'rgba(212,175,55,0.1)',
                                        border: '1px solid var(--gold-dim)',
                                        borderRadius: '4px',
                                        color: 'var(--gold-primary)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ECHANGER
                                </button>
                            )}
                        </div>
                        <div style={{ display: 'grid', gap: '0.8rem' }}>
                            {(character.inventory || []).map((item, i) => {
                                const equipped = item.equipped;
                                const isConsumable = item.stats && (item.stats.heal || item.stats.resource);

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
                                                <button
                                                    style={{
                                                        fontSize: '0.65rem',
                                                        padding: '5px 10px',
                                                        background: equipped ? 'rgba(255,107,107,0.1)' : 'rgba(212,175,55,0.1)',
                                                        border: '1px solid currentColor',
                                                        color: equipped ? '#ff6b6b' : 'var(--gold-primary)',
                                                        cursor: 'pointer',
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold'
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
                            {(!character.inventory || character.inventory.length === 0) && (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '3rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                    La besace est vide... pour le moment.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ABILITIES TAB */}
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

                                    {/* Detailed Effects */}
                                    {(ability.heal || ability.resource || ability.range || ability.dice || ability.scaling) && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                            {ability.dice && (
                                                <span style={{ fontSize: '0.65rem', color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                                    🎲 DÉS: {ability.dice}
                                                    {ability.scaling && ` + ${statNames[ability.scaling]?.full || ability.scaling}`}
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
                {activeTab === 'codex' && (
                    <div className="animate-fade-in list-view">
                        <h4 style={{ fontSize: '0.7rem', color: 'var(--gold-dim)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Journal d'Aventure</h4>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {/* Quêtes Actives */}
                            {(character.active_quests && character.active_quests.length > 0) && (
                                <div style={{ padding: '1rem', background: 'rgba(255,200,50,0.05)', borderRadius: '6px', borderLeft: '3px solid #ffc832' }}>
                                    <div style={{ fontWeight: 'bold', color: '#ffc832', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>⚔</span> QUÊTES ACTIVES
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        {character.active_quests.map((quest, i) => (
                                            <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div style={{ color: '#fff', fontWeight: 'bold' }}>▸ {quest.name || quest}</div>
                                                {quest.description && <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '2px' }}>{quest.description}</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Personnages Rencontrés */}
                            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '3px solid var(--gold-primary)' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--gold-primary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>👤</span> PERSONNAGES RENCONTRÉS
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                    {(character.visited_npcs && character.visited_npcs.length > 0) ? character.visited_npcs.map((npc, i) => (
                                        <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            • {typeof npc === 'object' ? npc.name : npc}
                                            {npc.role && <span style={{ color: '#666', marginLeft: '0.5rem' }}>({npc.role})</span>}
                                        </div>
                                    )) : (
                                        <div style={{ color: '#555', fontStyle: 'italic' }}>Aucun personnage rencontré pour l'instant.</div>
                                    )}
                                </div>
                            </div>

                            {/* Lieux Découverts */}
                            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '3px solid var(--aether-blue)' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--aether-blue)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>🗺</span> LIEUX DÉCOUVERTS
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                    {(character.discovered_locations && character.discovered_locations.length > 0) ? character.discovered_locations.map((loc, i) => (
                                        <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            ◈ {typeof loc === 'object' ? loc.name : loc}
                                            {loc.region && <span style={{ color: '#666', marginLeft: '0.5rem' }}>- {loc.region}</span>}
                                        </div>
                                    )) : (
                                        <div style={{ color: '#555', fontStyle: 'italic' }}>Aucun lieu découvert pour l'instant.</div>
                                    )}
                                </div>
                            </div>

                            {/* Secrets & Indices */}
                            {(character.discovered_secrets && character.discovered_secrets.length > 0) && (
                                <div style={{ padding: '1rem', background: 'rgba(150,100,255,0.05)', borderRadius: '6px', borderLeft: '3px solid #9664ff' }}>
                                    <div style={{ fontWeight: 'bold', color: '#9664ff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>🔮</span> SECRETS & INDICES
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        {character.discovered_secrets.map((secret, i) => (
                                            <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                ✦ {secret}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Événements Importants */}
                            {(character.important_events && character.important_events.length > 0) && (
                                <div style={{ padding: '1rem', background: 'rgba(255,100,100,0.05)', borderRadius: '6px', borderLeft: '3px solid #ff6464' }}>
                                    <div style={{ fontWeight: 'bold', color: '#ff6464', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span>📜</span> ÉVÉNEMENTS MARQUANTS
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        {character.important_events.map((event, i) => (
                                            <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                ◆ {event}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Message si codex vide */}
                            {(!character.visited_npcs || character.visited_npcs.length === 0) &&
                                (!character.discovered_locations || character.discovered_locations.length === 0) &&
                                (!character.active_quests || character.active_quests.length === 0) && (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: '#555', fontStyle: 'italic' }}>
                                        Votre aventure commence à peine...<br />
                                        Le codex se remplira au fil de vos découvertes.
                                    </div>
                                )}
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
        </aside>
    );
};
