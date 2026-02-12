import React, { useState, useEffect } from 'react';
import { CLASSES, CLASS_CATEGORIES, ENRICHED_BACKSTORIES, getBackstoriesForClass, formatBackstoryForGM, LOCATION_BACKGROUNDS, BIRTH_ORIGINS, CHILDHOOD_EVENTS, ADOLESCENCE_PATHS } from '../lore';
import { MagicBackground } from './MagicBackground';
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
        const selectedEquipment = clsData.starting_equipment_options[selectedEquipmentIndex].items;
        const chosenAbilities = clsData.initial_ability_options.filter(a => selectedAbilityNames.includes(a.name));
        const finalStats = { ...attributes };

        // Apply all Life Path Stat Bonuses
        const lifePathStages = [selectedBirthOrigin, selectedChildhoodEvent, selectedAdolescencePath, selectedBackstory];
        lifePathStages.forEach(stage => {
            if (stage && stage.stats) {
                Object.entries(stage.stats).forEach(([stat, mod]) => {
                    finalStats[stat] = (finalStats[stat] || 0) + mod;
                });
            }
        });

        // Accumulate mechanical traits
        const allTraits = [
            ...(selectedBirthOrigin?.mechanical_traits || []),
            ...(selectedChildhoodEvent?.mechanical_traits || []),
            ...(selectedAdolescencePath?.mechanical_traits || []),
            ...(selectedBackstory?.mechanical_traits || [])
        ];

        // Format Complete Narrative for GM with Extreme Detailing
        const formatStageImpacts = (stage, title) => {
            if (!stage) return '';
            let s = `### ${title}: ${stage.label}\n> ${stage.lore}\n`;
            if (stage.social_impacts) s += `**Réactions Sociales**: ${stage.social_impacts.pnj_reactions}\n`;
            if (stage.personal_secrets) s += `**Secret Personnel**: ${stage.personal_secrets}\n`;
            if (stage.gm_hooks) s += `**Accroche MJ**: ${stage.gm_hooks}\n`;
            if (stage.roleplay_hooks) s += `**Accroches RP**: ${stage.roleplay_hooks.join(' ; ')}\n`;
            return s + '\n';
        };

        const fullNarrative = `
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

        const charData = {
            name,
            class: `${selectedClass} (${clsData.subclasses[selectedSubclass].label})`,
            mechanic: clsData.mechanic,
            desc: clsData.desc,
            stats: finalStats,
            gold: Math.floor(100 * (selectedBackstory?.social_class?.starting_gold_modifier || 1.0)),
            abilities: chosenAbilities,
            equipment: selectedEquipment,
            hp: (clsData.hitDie || 8) + 10 + (Math.floor((finalStats.con - 10) / 2) * 2),
            maxHp: (clsData.hitDie || 8) + 10 + (Math.floor((finalStats.con - 10) / 2) * 2),
            resource: 100,
            max_resource: 100,
            inventory: [...selectedEquipment],
            portrait_url: portraitUrl || classPortraits[selectedClass],
            backstory: selectedBackstory?.label,
            life_path: {
                birth: selectedBirthOrigin.label,
                childhood: selectedChildhoodEvent.label,
                adolescence: selectedAdolescencePath.label
            },
            mechanical_traits: allTraits,
            backstory_gm_context: fullNarrative,
            starting_reputation: {
                ...(selectedBackstory?.starting_reputation || {}),
                ...(selectedChildhoodEvent?.reputation_impact || {})
            },
            visited_npcs: selectedBackstory?.known_npcs || [],
            faction_ties: selectedBackstory?.faction_ties || [],
            discovered_secrets: selectedBackstory?.personal_secrets || [],
            discovered_locations: [],
            active_quests: [],
            important_events: []
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
                        {/* Navigation Header */}
                        <div className="spellbook-nav">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(s => (
                                <div key={s} className={`nav-dot ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`} />
                            ))}
                        </div>

                        {/* === STEP 1: ARCHETYPES === */}
                        {step === 1 && (
                            <div className="spellbook-section">
                                {/* Quick Start Option relocated inside section */}
                                {onQuickStart && (
                                    <div className="quick-start-banner" onClick={onQuickStart}>
                                        <span>⚡ BESOIN D'ÉXÉCUTION ? lancez un héros aléatoire</span>
                                    </div>
                                )}

                                <div className="section-header">
                                    <span className="section-icon">📜</span>
                                    <h3>Choisissez votre Archétype</h3>
                                </div>

                                <div className="selection-grid">
                                    {Object.entries(CATEGORY_META).map(([key, meta]) => (
                                        <div
                                            key={key}
                                            className={`selection-card ${selectedCategory === key ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelectedCategory(key);
                                                const firstClass = CLASS_CATEGORIES[key]?.classes?.[0];
                                                if (firstClass) setSelectedClass(firstClass);
                                            }}
                                        >
                                            <div className="card-image">
                                                <img src={meta.img} alt={meta.name} />
                                                <div className="card-overlay">
                                                    <div className="card-title">
                                                        <span style={{ marginRight: '0.8rem', opacity: 0.7 }}>{meta.icon}</span>
                                                        {meta.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-description">{meta.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={onBack}>
                                        ← Annuler
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(2)}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 2: CLASSE === */}
                        {step === 2 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">⚔️</span>
                                    <h3>Choisissez votre Classe</h3>
                                </div>

                                <div className="selection-grid">
                                    {categoryClasses.map(cls => (
                                        <div
                                            key={cls}
                                            className={`selection-card ${selectedClass === cls ? 'selected' : ''}`}
                                            onClick={() => setSelectedClass(cls)}
                                        >
                                            <div className="card-image">
                                                <img
                                                    src={classPortraits[cls] || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop'}
                                                    alt={cls}
                                                />
                                                <div className="card-overlay">
                                                    <div className="card-title">{cls}</div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-description">
                                                    {CLASSES[cls].desc?.substring(0, 100)}...
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(1)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(3)}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 3: SOUS-CLASSE === */}
                        {step === 3 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">🎯</span>
                                    <h3>Choisissez votre Spécialisation</h3>
                                </div>

                                <div className="selection-grid">
                                    {Object.entries(classData?.subclasses || {}).map(([key, sub]) => (
                                        <div
                                            key={key}
                                            className={`selection-card ${selectedSubclass === key ? 'selected' : ''}`}
                                            onClick={() => setSelectedSubclass(key)}
                                        >
                                            <div className="card-image">
                                                <img
                                                    src={sub.image || classPortraits[selectedClass]}
                                                    alt={sub.label}
                                                />
                                                <div className="card-overlay">
                                                    <div className="card-title">{sub.label}</div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-description">{sub.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(2)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(4)}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 4: ORIGINE DE NAISSANCE === */}
                        {step === 4 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">👶</span>
                                    <h3>Origine de Naissance</h3>
                                </div>

                                <div className="selection-grid">
                                    {BIRTH_ORIGINS.map((origin) => (
                                        <div
                                            key={origin.id}
                                            className={`selection-card ${selectedBirthOrigin?.id === origin.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedBirthOrigin(origin)}
                                        >
                                            <div className="card-image">
                                                <img src={origin.img} alt={origin.label} />
                                                <div className="card-overlay">
                                                    <div className="card-title">{origin.label}</div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-description" style={{ marginBottom: '0.8rem' }}>{origin.desc}</p>
                                                <p style={{ fontSize: '0.75rem', opacity: 0.7, fontStyle: 'italic', marginBottom: '1rem' }}>"{origin.lore}"</p>

                                                <div className="mechanical-traits-preview">
                                                    {origin.mechanical_traits.map((trait, tIdx) => (
                                                        <span key={tIdx} className={`trait-tag ${trait.type}`}>
                                                            {trait.type === 'bonus' ? '⊕' : '⊖'} {trait.name}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="impact-tags-container">
                                                    {origin.social_impacts && <span className="impact-tag social">👥 Social</span>}
                                                    {origin.rp_hooks && <span className="impact-tag rp-hook">🎭 Roleplay</span>}
                                                    {origin.personal_secrets && <span className="impact-tag secret">🤫 Secret</span>}
                                                </div>

                                                {selectedBirthOrigin?.id === origin.id && (
                                                    <div className="impact-details-box">
                                                        {origin.social_impacts && (
                                                            <div>
                                                                <h5>Impact Social</h5>
                                                                <p>{origin.social_impacts.pnj_reactions}</p>
                                                            </div>
                                                        )}
                                                        {origin.roleplay_hooks && (
                                                            <div style={{ marginTop: '0.5rem' }}>
                                                                <h5>Accroches RP</h5>
                                                                <ul style={{ paddingLeft: '1.2rem', margin: '0.2rem 0' }}>
                                                                    {origin.roleplay_hooks?.map((hook, hI) => <li key={hI}>{hook}</li>)}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(3)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(5)}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 5: ÉVÉNEMENT D'ENFANCE === */}
                        {step === 5 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">🧸</span>
                                    <h3>Événement d'Enfance</h3>
                                </div>

                                <div className="selection-grid">
                                    {CHILDHOOD_EVENTS.map((event) => (
                                        <div
                                            key={event.id}
                                            className={`selection-card ${selectedChildhoodEvent?.id === event.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedChildhoodEvent(event)}
                                        >
                                            <div className="card-image">
                                                <img src={event.img} alt={event.label} />
                                                <div className="card-overlay">
                                                    <div className="card-title">{event.label}</div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-description" style={{ marginBottom: '0.8rem' }}>{event.desc}</p>
                                                <p style={{ fontSize: '0.75rem', opacity: 0.7, fontStyle: 'italic', marginBottom: '1rem' }}>"{event.lore}"</p>

                                                <div className="mechanical-traits-preview">
                                                    {event.mechanical_traits.map((trait, tIdx) => (
                                                        <span key={tIdx} className={`trait-tag ${trait.type}`}>
                                                            {trait.type === 'bonus' ? '⊕' : '⊖'} {trait.name}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="impact-tags-container">
                                                    {event.social_impacts && <span className="impact-tag social">👥 Social</span>}
                                                    {event.rp_hooks && <span className="impact-tag rp-hook">🎭 Roleplay</span>}
                                                    {event.personal_secrets && <span className="impact-tag secret">🤫 Secret</span>}
                                                </div>

                                                {selectedChildhoodEvent?.id === event.id && (
                                                    <div className="impact-details-box">
                                                        {event.social_impacts && (
                                                            <div>
                                                                <h5>Impact Social</h5>
                                                                <p>{event.social_impacts.pnj_reactions}</p>
                                                            </div>
                                                        )}
                                                        {event.roleplay_hooks && (
                                                            <div style={{ marginTop: '0.5rem' }}>
                                                                <h5>Accroches RP</h5>
                                                                <ul style={{ paddingLeft: '1.2rem', margin: '0.2rem 0' }}>
                                                                    {event.roleplay_hooks?.map((hook, hI) => <li key={hI}>{hook}</li>)}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(4)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(6)}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 6: APPRENTISSAGE ADOLESCENT === */}
                        {step === 6 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">🏹</span>
                                    <h3>Apprentissage Adolescent</h3>
                                </div>

                                <div className="selection-grid">
                                    {ADOLESCENCE_PATHS.map((path) => (
                                        <div
                                            key={path.id}
                                            className={`selection-card ${selectedAdolescencePath?.id === path.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedAdolescencePath(path)}
                                        >
                                            <div className="card-image">
                                                <img src={path.img} alt={path.label} />
                                                <div className="card-overlay">
                                                    <div className="card-title">{path.label}</div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-description" style={{ marginBottom: '0.8rem' }}>{path.desc}</p>
                                                <p style={{ fontSize: '0.75rem', opacity: 0.7, fontStyle: 'italic', marginBottom: '1rem' }}>"{path.lore}"</p>

                                                <div className="mechanical-traits-preview">
                                                    {path.mechanical_traits.map((trait, tIdx) => (
                                                        <span key={tIdx} className={`trait-tag ${trait.type}`}>
                                                            {trait.type === 'bonus' ? '⊕' : '⊖'} {trait.name}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="impact-tags-container">
                                                    {path.social_impacts && <span className="impact-tag social">👥 Social</span>}
                                                    {path.rp_hooks && <span className="impact-tag rp-hook">🎭 Roleplay</span>}
                                                    {path.personal_secrets && <span className="impact-tag secret">🤫 Secret</span>}
                                                </div>

                                                {selectedAdolescencePath?.id === path.id && (
                                                    <div className="impact-details-box">
                                                        {path.social_impacts && (
                                                            <div>
                                                                <h5>Impact Social</h5>
                                                                <p>{path.social_impacts.pnj_reactions}</p>
                                                            </div>
                                                        )}
                                                        {path.roleplay_hooks && (
                                                            <div style={{ marginTop: '0.5rem' }}>
                                                                <h5>Accroches RP</h5>
                                                                <ul style={{ paddingLeft: '1.2rem', margin: '0.2rem 0' }}>
                                                                    {path.roleplay_hooks?.map((hook, hI) => <li key={hI}>{hook}</li>)}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(5)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(7)}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 7: BACKSTORY (ADULTE) === */}
                        {step === 7 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">📖</span>
                                    <h3>Passé Adulte (Histoire)</h3>
                                </div>

                                <div className="selection-grid" style={{ gridTemplateColumns: '1fr' }}>
                                    {getBackstoriesForClass(selectedClass).map((bg, idx) => (
                                        <div
                                            key={idx}
                                            className={`selection-card ${selectedBackstory?.label === bg.label ? 'selected' : ''}`}
                                            onClick={() => setSelectedBackstory(bg)}
                                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
                                        >
                                            <div className="card-image" style={{ width: '200px', height: 'auto' }}>
                                                <img
                                                    src={LOCATION_BACKGROUNDS[bg.region] || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop'}
                                                    alt={bg.region}
                                                />
                                            </div>
                                            <div className="card-body" style={{ textAlign: 'left', flexGrow: 1 }}>
                                                <div className="card-title" style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{bg.label}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Région: {bg.region}</div>
                                                <p className="card-description">{bg.desc}</p>
                                                <div className="mechanical-traits-preview">
                                                    {bg.mechanical_traits.map((trait, tIdx) => (
                                                        <span key={tIdx} className={`trait-tag ${trait.type}`}>
                                                            {trait.type === 'bonus' ? '⊕' : '⊖'} {trait.name}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="impact-tags-container">
                                                    <span className="impact-tag social">👥 Social</span>
                                                    {bg.personal_secrets?.length > 0 && <span className="impact-tag secret">🤫 Secret</span>}
                                                    {bg.roleplay_hooks?.length > 0 && <span className="impact-tag rp-hook">🎭 Roleplay</span>}
                                                </div>

                                                {selectedBackstory?.label === bg.label && (
                                                    <div className="impact-details-box">
                                                        <div>
                                                            <h5>Relations Mondiales</h5>
                                                            <p>Réputation initiale : {bg.starting_reputation && Object.entries(bg.starting_reputation).map(([k, v]) => `${k} (${v > 0 ? '+' : ''}${v})`).join(', ')}</p>
                                                        </div>
                                                        {bg.roleplay_hooks?.length > 0 && (
                                                            <div style={{ marginTop: '0.5rem' }}>
                                                                <h5>Accroches de l'Âge Adulte</h5>
                                                                <ul style={{ paddingLeft: '1.2rem', margin: '0.2rem 0' }}>
                                                                    {bg.roleplay_hooks.map((hook, hI) => <li key={hI}>{hook}</li>)}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(6)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(8)}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 8: ÉQUIPEMENT ET CAPACITÉS === */}
                        {step === 8 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">⚔️</span>
                                    <h3>Équipement et Capacités</h3>
                                </div>

                                <div style={{ marginBottom: '2.5rem' }}>
                                    <h4 style={{ color: 'var(--gold-dim)', letterSpacing: '2px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>PAQUETAGE DE DÉPART</h4>
                                    <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', maxHeight: 'none' }}>
                                        {classData?.starting_equipment_options.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                className={`selection-card ${selectedEquipmentIndex === idx ? 'selected' : ''}`}
                                                onClick={() => setSelectedEquipmentIndex(idx)}
                                                style={{ padding: '1.5rem' }}
                                            >
                                                <div className="card-title" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{opt.label}</div>
                                                <p className="card-description" style={{ fontSize: '0.75rem' }}>
                                                    {opt.items.map(i => i.name).join(', ')}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ color: 'var(--gold-dim)', letterSpacing: '2px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>CAPACITÉS INITIALES (CHOISISSEZ 2)</h4>
                                    <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', maxHeight: '250px' }}>
                                        {classData?.initial_ability_options.map(ability => (
                                            <div
                                                key={ability.name}
                                                className={`selection-card ${selectedAbilityNames.includes(ability.name) ? 'selected' : ''}`}
                                                onClick={() => toggleAbility(ability.name)}
                                                style={{ padding: '1rem' }}
                                            >
                                                <div className="card-title" style={{ fontSize: '0.85rem' }}>✨ {ability.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(7)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(9)} disabled={selectedAbilityNames.length !== 2}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 9: NOM === */}
                        {step === 9 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">📜</span>
                                    <h3>Nommez votre Héros</h3>
                                </div>

                                <div style={{ padding: '2rem 3rem' }}>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Entrez un nom légendaire..."
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        maxLength={30}
                                        autoFocus
                                    />
                                    {name && (
                                        <div style={{ marginTop: '3rem', textAlign: 'center', fontFamily: 'var(--font-decorative)', fontSize: '3rem', color: 'var(--gold-primary)', textShadow: '0 0 20px rgba(212,175,55,0.4)' }}>
                                            {name}
                                        </div>
                                    )}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(8)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(10)} disabled={!name.trim()}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 10: STATS === */}
                        {step === 10 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">🎲</span>
                                    <h3>Caractéristiques de Destin</h3>
                                </div>

                                <div className="stats-grid">
                                    {Object.entries(attributes).map(([key, val]) => (
                                        <div key={key} className={`stat-card ${rollingStat === key ? 'rolling' : ''}`} onClick={() => rollStat(key)} style={{ cursor: 'pointer' }}>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--gold-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                                                {STAT_ICONS[key]} {STAT_LABELS[key]}
                                            </div>
                                            <div className="stat-value">{val === 0 ? '?' : val}</div>
                                            {val > 0 && <div style={{ color: 'var(--gold-bright)', fontWeight: 'bold' }}>{getModifier(val)}</div>}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                                    <button className="btn-spellbook btn-next" onClick={rollAll} disabled={isRolling || allRolled} style={{ minWidth: '300px' }}>
                                        🎲 Lancer le Destin
                                    </button>
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(9)}>
                                        ← Retour
                                    </button>
                                    <button className="btn-spellbook btn-next" onClick={() => setStep(11)} disabled={!allRolled}>
                                        Suivant →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* === STEP 11: RÉCAPITULATIF === */}
                        {step === 11 && (
                            <div className="spellbook-section">
                                <div className="section-header">
                                    <span className="section-icon">✨</span>
                                    <h3>L'Éveil de la Légende</h3>
                                </div>

                                <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', marginBottom: '2rem' }}>
                                    <div style={{ flexShrink: 0 }}>
                                        <img
                                            src={portraitUrl || classPortraits[selectedClass]}
                                            alt="Portrait"
                                            style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '12px', border: '3px solid var(--gold-primary)', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}
                                        />
                                    </div>
                                    <div style={{ flexGrow: 1 }}>
                                        <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '3rem', color: 'var(--gold-primary)', margin: '0 0 0.5rem 0' }}>{name}</h2>
                                        <div style={{ fontSize: '1.2rem', color: 'var(--gold-dim)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                            {selectedClass} • {classData?.subclasses[selectedSubclass]?.label}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--gold-bright)', marginBottom: '0.5rem' }}>
                                            Né : {selectedBirthOrigin.label} | Événement : {selectedChildhoodEvent.label}
                                        </div>
                                        <p style={{ fontStyle: 'italic', opacity: 0.8, lineHeight: '1.4', fontSize: '0.9rem' }}>{selectedBackstory?.desc}</p>
                                    </div>
                                </div>

                                <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', maxHeight: 'none', marginBottom: '2rem' }}>
                                    {Object.entries(attributes).map(([key, val]) => {
                                        // Calculate final stat with bonuses
                                        let finalVal = val;
                                        [selectedBirthOrigin, selectedChildhoodEvent, selectedAdolescencePath, selectedBackstory].forEach(s => {
                                            if (s?.stats?.[key]) finalVal += s.stats[key];
                                        });
                                        return (
                                            <div key={key} className="stat-card" style={{ padding: '0.8rem' }}>
                                                <div style={{ fontSize: '0.6rem', color: 'var(--gold-dim)' }}>{STAT_ICONS[key]} {STAT_LABELS[key]}</div>
                                                <div className="stat-value" style={{ fontSize: '1.5rem' }}>{finalVal}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="spellbook-actions">
                                    <button className="btn-spellbook btn-back" onClick={() => setStep(10)}>
                                        ← Modifier
                                    </button>
                                    <button className="btn-spellbook btn-next btn-create" onClick={handleCreate}>
                                        ✨ Commencer l'Aventure
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
