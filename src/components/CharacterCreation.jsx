import React, { useState, useEffect } from 'react';
import { CLASSES, CLASS_CATEGORIES, ENRICHED_BACKSTORIES, getBackstoriesForClass, formatBackstoryForGM, LOCATION_BACKGROUNDS, BIRTH_ORIGINS, CHILDHOOD_EVENTS, ADOLESCENCE_PATHS } from '../lore';
import { MagicBackground } from './MagicBackground';
import { LifePathBuilder } from './LifePathBuilder.tsx';
import './CharacterCreation.css';

// Utility: Roll 4d6 drop lowest
const rollAttribute = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => a - b);
    return rolls.slice(1).reduce((a, b) => a + b, 0);
};

const STAT_LABELS = {
    str: 'Force', dex: 'Dextérité', con: 'Constitution',
    int: 'Intelligence', wis: 'Sagesse', cha: 'Charisme'
};

const STAT_ICONS = {
    str: '⚔️', dex: '🏹', con: '🛡️',
    int: '📜', wis: '👁️', cha: '👑'
};

const CATEGORY_META = {
    MIGHT: {
        icon: '⚔️',
        name: 'Sang et Acier',
        desc: 'Héros de la force brute et de la résilience. Ils dominent le champ de bataille par la puissance physique.',
        img: 'https://images.unsplash.com/photo-1599140842249-1c1e894fd4c1?q=80&w=1000&auto=format&fit=crop'
    },
    MAGIC: {
        icon: '🔥',
        name: 'Arcanes et Mystères',
        desc: 'Maîtres des énergies cosmiques et divines. Ils plient la réalité à leur volonté.',
        img: 'https://images.unsplash.com/photo-1519074063912-ad2a602159d7?q=80&w=1000&auto=format&fit=crop'
    },
    SKILL: {
        icon: '🗡️',
        name: 'Ombre et Ruse',
        desc: 'Spécialistes de l\'agilité et de la précision. Ils frappent là où ça fait mal, souvent sans être vus.',
        img: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1000&auto=format&fit=crop'
    }
};

export function CharacterCreation({ onCreate, onBack, onQuickStart, generateImage, sessionId }) {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('MIGHT');
    const [name, setName] = useState('');
    const [selectedClass, setSelectedClass] = useState('Guerrier');
    const [selectedSubclass, setSelectedSubclass] = useState(null);
    const [selectedBackstory, setSelectedBackstory] = useState(null);
    const [lifepathData, setLifepathData] = useState(null);
    // Old states kept for compatibility but will be replaced by lifepathData
    const [selectedBirthOrigin, setSelectedBirthOrigin] = useState(BIRTH_ORIGINS[0]);
    const [selectedChildhoodEvent, setSelectedChildhoodEvent] = useState(CHILDHOOD_EVENTS[0]);
    const [selectedAdolescencePath, setSelectedAdolescencePath] = useState(ADOLESCENCE_PATHS[0]);
    const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(0);
    const [selectedAbilityNames, setSelectedAbilityNames] = useState([]);
    const [attributes, setAttributes] = useState({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 });
    const [rollingStat, setRollingStat] = useState(null);
    const [portraitUrl, setPortraitUrl] = useState(null);
    const [classPortraits, setClassPortraits] = useState({});

    useEffect(() => {
        const defaults = {};
        Object.entries(CLASSES).forEach(([key, data]) => {
            if (data.portrait) defaults[key] = data.portrait;
        });
        setClassPortraits(defaults);
    }, []);

    useEffect(() => {
        if (CLASSES[selectedClass]) {
            if (CLASSES[selectedClass].subclasses) {
                setSelectedSubclass(Object.keys(CLASSES[selectedClass].subclasses)[0]);
            }
            const availableBackstories = getBackstoriesForClass(selectedClass);
            if (availableBackstories.length > 0) {
                setSelectedBackstory(availableBackstories[0]);
            }
            setSelectedEquipmentIndex(0);
            setSelectedAbilityNames([]);
        }
    }, [selectedClass]);

    const rollStatPromise = (statKey) => {
        return new Promise((resolve) => {
            setRollingStat(statKey);
            let duration = 0;
            const interval = setInterval(() => {
                setAttributes(prev => ({ ...prev, [statKey]: Math.floor(Math.random() * 13) + 6 }));
                duration += 50;
                if (duration > 600) {
                    clearInterval(interval);
                    const finalValue = rollAttribute();
                    setAttributes(prev => ({ ...prev, [statKey]: finalValue }));
                    setRollingStat(null);
                    resolve();
                }
            }, 50);
        });
    };

    const rollStat = async (statKey) => {
        if (rollingStat) return;
        await rollStatPromise(statKey);
    };

    const rollAll = async () => {
        const stats = Object.keys(attributes);
        for (let stat of stats) {
            if (attributes[stat] === 0) {
                await rollStatPromise(stat);
            }
        }
    };

    const allRolled = Object.values(attributes).every(v => v > 0);
    const isRolling = rollingStat !== null;

    const handleCreate = async () => {
        if (!name.trim()) return;
        const clsData = CLASSES[selectedClass];
        const selectedSubclassData = clsData.subclasses[selectedSubclass];
        const selectedEquipment = clsData.starting_equipment_options[selectedEquipmentIndex].items;
        const chosenAbilities = clsData.initial_ability_options.filter(a => selectedAbilityNames.includes(a.name));
        const finalStats = { ...attributes };

        // Use NEW lifepath data if available, fallback to old system
        let allTraits = [];
        let fullNarrative = '';
        let startingReputation = {};
        let knownNpcs = [];
        let factionTies = [];
        let discoveredSecrets = [];
        let lifePathRecord = {};

        if (lifepathData) {
            // NEW SYSTEM: Use comprehensive lifepath data
            allTraits = lifepathData.mechanical_traits || [];
            fullNarrative = lifepathData.narrative_summary || '';
            startingReputation = lifepathData.reputation || {};
            knownNpcs = lifepathData.allies || [];
            factionTies = Object.keys(startingReputation).filter(f => Math.abs(startingReputation[f]) >= 10);
            discoveredSecrets = lifepathData.personal_secrets || [];
            lifePathRecord = {
                birth: lifepathData.origin?.label || '',
                childhood: lifepathData.childhood?.label || '',
                adolescence: lifepathData.adolescence?.label || '',
                adult: lifepathData.adult?.label || ''
            };
        } else {
            // OLD SYSTEM: Fallback to legacy states
            const lifePathStages = [selectedBirthOrigin, selectedChildhoodEvent, selectedAdolescencePath, selectedBackstory];
            lifePathStages.forEach(stage => {
                if (stage && stage.stats) {
                    Object.entries(stage.stats).forEach(([stat, mod]) => {
                        finalStats[stat] = (finalStats[stat] || 0) + mod;
                    });
                }
            });

            allTraits = [
                ...(selectedBirthOrigin?.mechanical_traits || []),
                ...(selectedChildhoodEvent?.mechanical_traits || []),
                ...(selectedAdolescencePath?.mechanical_traits || []),
                ...(selectedBackstory?.mechanical_traits || [])
            ];

            const formatStageImpacts = (stage, title) => {
                if (!stage) return '';
                let s = `### ${title}: ${stage.label}\n> ${stage.lore}\n`;
                if (stage.social_impacts) s += `**Réactions Sociales**: ${stage.social_impacts.pnj_reactions}\n`;
                if (stage.personal_secrets) s += `**Secret Personnel**: ${stage.personal_secrets}\n`;
                if (stage.gm_hooks) s += `**Accroche MJ**: ${stage.gm_hooks}\n`;
                if (stage.roleplay_hooks) s += `**Accroches RP**: ${stage.roleplay_hooks.join(' ; ')}\n`;
                return s + '\n';
            };

            fullNarrative = `
# CHRONIQUES DE ${name.toUpperCase()}

${formatStageImpacts(selectedBirthOrigin, "1. ORIGINE")}
${formatStageImpacts(selectedChildhoodEvent, "2. ENFANCE")}
${formatStageImpacts(selectedAdolescencePath, "3. ADOLESCENCE")}

${selectedBackstory ? `## PASSÉ ADULTE: ${selectedBackstory.label}
> ${selectedBackstory.desc}
**Relations Mondiales**: ${Object.entries(selectedBackstory.starting_reputation).map(([k, v]) => `${k} (${v > 0 ? '+' : ''}${v})`).join(', ')}
**Secrets**: ${selectedBackstory.personal_secrets?.join(' ; ')}
**Accroches RP**: ${selectedBackstory.roleplay_hooks?.join(' ; ')}
**Notes de l'MJ**: ${selectedBackstory.gm_notes?.join(' ; ')}` : ''}
            `.trim();

            startingReputation = {
                ...(selectedBackstory?.starting_reputation || {}),
                ...(selectedChildhoodEvent?.reputation_impact || {})
            };
            knownNpcs = selectedBackstory?.known_npcs || [];
            factionTies = selectedBackstory?.faction_ties || [];
            discoveredSecrets = selectedBackstory?.personal_secrets || [];
            lifePathRecord = {
                birth: selectedBirthOrigin?.label,
                childhood: selectedChildhoodEvent?.label,
                adolescence: selectedAdolescencePath?.label
            };
        }

        const charData = {
            name,
            class: `${selectedClass} (${selectedSubclassData?.label || '...'})`,
            mechanic: clsData.mechanic,
            desc: clsData.desc,
            stats: finalStats,
            gold: Math.floor(100 * (lifepathData?.social_class_modifier || selectedBackstory?.social_class?.starting_gold_modifier || 1.0)),
            abilities: chosenAbilities,
            equipment: selectedEquipment,
            hp: (clsData.hitDie || 8) + 10 + (Math.floor((finalStats.con - 10) / 2) * 2),
            maxHp: (clsData.hitDie || 8) + 10 + (Math.floor((finalStats.con - 10) / 2) * 2),
            resource: 100,
            max_resource: 100,
            inventory: [...selectedEquipment, ...(lifepathData?.starting_items || [])],
            portrait_url: portraitUrl || classPortraits[selectedClass],
            backstory: lifepathData?.adult?.label || selectedBackstory?.label,
            life_path: lifePathRecord,
            mechanical_traits: allTraits,
            backstory_gm_context: fullNarrative,
            starting_reputation: startingReputation,
            visited_npcs: knownNpcs,
            faction_ties: factionTies,
            discovered_secrets: discoveredSecrets,
            discovered_locations: [],
            active_quests: [],
            important_events: [],
            languages: lifepathData?.languages || []
        };
        onCreate(charData);
    };

    const toggleAbility = (name) => {
        setSelectedAbilityNames(prev => {
            if (prev.includes(name)) return prev.filter(n => n !== name);
            if (prev.length >= 2) return prev;
            return [...prev, name];
        });
    };

    const getModifier = (val) => {
        const mod = Math.floor((val - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    const categoryClasses = CLASS_CATEGORIES[selectedCategory]?.classes || [];
    const classData = CLASSES[selectedClass];

    return (
        <>
            <MagicBackground />
            <div className="creation-container">
                <div className="creation-layout">
                    {/* Character History Sidebar */}
                    <div className="history-sidebar">
                        <h4><span className="section-icon">📜</span> Chroniques</h4>

                        <div className="history-item">
                            <span className="history-label">Voie</span>
                            <span className="history-value">{selectedClass} {selectedSubclass && classData?.subclasses?.[selectedSubclass] ? `(${classData.subclasses[selectedSubclass]?.label || '...'})` : ''}</span>
                        </div>

                        {step > 4 && selectedBirthOrigin && (
                            <div className="history-item">
                                <span className="history-label">Naissance</span>
                                <span className="history-value">{selectedBirthOrigin.label}</span>
                                <div className="history-traits">
                                    {selectedBirthOrigin.mechanical_traits?.map((t, i) => (
                                        <span key={i} className={`trait-tag ${t.type}`}>{t.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step > 5 && selectedChildhoodEvent && (
                            <div className="history-item">
                                <span className="history-label">Enfance</span>
                                <span className="history-value">{selectedChildhoodEvent.label}</span>
                                <div className="history-traits">
                                    {selectedChildhoodEvent.mechanical_traits?.map((t, i) => (
                                        <span key={i} className={`trait-tag ${t.type}`}>{t.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step > 6 && selectedAdolescencePath && (
                            <div className="history-item">
                                <span className="history-label">Adolescence</span>
                                <span className="history-value">{selectedAdolescencePath.label}</span>
                                <div className="history-traits">
                                    {selectedAdolescencePath.mechanical_traits?.map((t, i) => (
                                        <span key={i} className={`trait-tag ${t.type}`}>{t.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step > 7 && selectedBackstory && (
                            <div className="history-item">
                                <span className="history-label">Passé Adulte</span>
                                <span className="history-value">{selectedBackstory.label}</span>
                                <div className="history-traits">
                                    {selectedBackstory.mechanical_traits.map((t, i) => (
                                        <span key={i} className={`trait-tag ${t.type}`}>{t.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {name && (
                            <div className="history-item" style={{ borderLeftColor: 'var(--gold-primary)', marginTop: '2rem' }}>
                                <span className="history-label">Légende</span>
                                <span className="history-value" style={{ color: 'var(--gold-primary)', fontSize: '1rem' }}>{name}</span>
                            </div>
                        )}
                    </div>

                    <div className="spellbook-shell">
                        <div className="spellbook-nav">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(s => (
                                <div key={s} className={`nav-dot ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`} />
                            ))}
                        </div>

                        {/* STEP 1: ARCHETYPES */}
                        {step === 1 && (
                            <div className="spellbook-section">
                                {onQuickStart && (
                                    <div className="quick-start-banner" onClick={onQuickStart}>
                                        <span>⚡ BESOIN D'ÉXÉCUTION ? lancez un héros aléatoire</span>
                                    </div>
                                )}
                                <div className="section-header">
                                    <span className="section-icon">📜</span>
                                    <h3>Archétype</h3>
                                </div>
                                <div className="selection-grid">
                                    {Object.entries(CATEGORY_META).map(([key, meta]) => (
                                        <div key={key} className={`selection-card ${selectedCategory === key ? 'selected' : ''}`} onClick={() => setSelectedCategory(key)}>
                                            <div className="card-title">{meta.icon} {meta.name}</div>
                                            <div className="card-body"><p className="card-description">{meta.desc}</p></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={onBack}>← Annuler</button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(2)}>Suivant →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: CLASSE */}
                        {step === 2 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">⚔️</span>
                                    <h3>Classe</h3>
                                </div>
                                <div className="selection-grid">
                                    {categoryClasses.map(cls => (
                                        <div key={cls} className={`selection-card ${selectedClass === cls ? 'selected' : ''}`} onClick={() => setSelectedClass(cls)}>
                                            <div className="card-title">{cls}</div>
                                            <div className="card-body"><p className="card-description">{CLASSES[cls].desc?.substring(0, 100)}...</p></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(1)}>← Retour</button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(3)}>Suivant →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: SOUS-CLASSE */}
                        {step === 3 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">🎯</span>
                                    <h3>Spécialisation</h3>
                                </div>
                                <div className="selection-grid">
                                    {Object.entries(classData?.subclasses || {}).map(([key, sub]) => (
                                        <div key={key} className={`selection-card ${selectedSubclass === key ? 'selected' : ''}`} onClick={() => setSelectedSubclass(key)}>
                                            <div className="card-title">{sub.label}</div>
                                            <div className="card-body">
                                                <p className="card-description">{sub.desc}</p>
                                                <div style={{ marginTop: '0.8rem' }} className="trait-tag neutral">{sub.details.feature}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(2)}>← Retour</button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(4)}>Suivant →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: LIFEPATH COMPLET (Origine, Enfance, Adolescence, Passé Adulte) */}
                        {step === 4 && (
                            <LifePathBuilder
                                onComplete={(data) => {
                                    setLifepathData(data);
                                    // Appliquer les stats cumulées aux attributs
                                    setAttributes(prev => ({
                                        str: prev.str + (data.stats.str || 0),
                                        dex: prev.dex + (data.stats.dex || 0),
                                        con: prev.con + (data.stats.con || 0),
                                        int: prev.int + (data.stats.int || 0),
                                        wis: prev.wis + (data.stats.wis || 0),
                                        cha: prev.cha + (data.stats.cha || 0)
                                    }));
                                    setStep(5); // Passe à l'équipement
                                }}
                                onBack={() => setStep(3)}
                            />
                        )}

                        {/* STEP 5: ÉQUIPEMENT */}
                        {step === 5 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">🛡️</span>
                                    <h3>Paquetage & Capacités</h3>
                                </div>
                                <div className="selection-grid">
                                    {classData?.starting_equipment_options.map((opt, idx) => (
                                        <div key={idx} className={`selection-card ${selectedEquipmentIndex === idx ? 'selected' : ''}`} onClick={() => setSelectedEquipmentIndex(idx)}>
                                            <div className="card-title">{opt.label}</div>
                                            <div className="card-body">
                                                <p className="card-description">{opt.items.map(i => i.name).join(', ')}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(4)}>← Retour</button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(6)}>Suivant →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 6: NOM */}
                        {step === 6 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">📜</span>
                                    <h3>Identité</h3>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <input type="text" className="input-field" placeholder="Nom du héros..." value={name} onChange={e => setName(e.target.value)} autoFocus />
                                    {name && <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '2.5rem', fontFamily: 'Cinzel Decorative', color: 'var(--gold-primary)' }}>{name}</div>}
                                </div>
                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(5)}>← Retour</button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(7)}>Suivant →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 7: ATTRIBUTS */}
                        {step === 7 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">🎲</span>
                                    <h3>Jet d'Attributs</h3>
                                </div>
                                <div className="stats-grid">
                                    {Object.entries(attributes).map(([key, val]) => (
                                        <div key={key} className={`stat-card ${rollingStat === key ? 'rolling' : ''}`} onClick={() => rollStat(key)}>
                                            <div style={{ color: 'var(--gold-dim)', fontSize: '0.8rem' }}>{STAT_LABELS[key].toUpperCase()}</div>
                                            <div className="stat-value">{val || '?'}</div>
                                            <div style={{ color: 'var(--gold-primary)', fontSize: '1.2rem' }}>{val ? getModifier(val) : '--'}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(6)}>← Retour</button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(8)} disabled={!allRolled || isRolling}>Suivant →</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 8: FINALISATION */}
                        {step === 8 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">✨</span>
                                    <h3>L'Éveil</h3>
                                </div>
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <p className="card-description">Votre personnage est prêt à entrer dans la légende.</p>
                                    <h2 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--gold-primary)', margin: '1.5rem 0' }}>{name}</h2>
                                    <p style={{ color: 'var(--gold-dim)' }}>{selectedClass} ({classData.subclasses[selectedSubclass]?.label})</p>
                                </div>
                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(7)}>← Retour</button>
                                    <button className="btn-spellbook btn-next" onClick={handleCreate}>Commencer l'Aventure →</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
