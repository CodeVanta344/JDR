import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CLASSES, CLASS_CATEGORIES, ENRICHED_BACKSTORIES, getBackstoriesForClass, formatBackstoryForGM, LOCATION_BACKGROUNDS, BIRTH_ORIGINS, CHILDHOOD_EVENTS, ADOLESCENCE_PATHS } from '../lore';
import { ITEMS_BY_ID } from '../lore/items-catalog';
import { MagicBackground } from './MagicBackground';
import { LifePathWizard } from './character-creation/LifePathWizard';
import './CharacterCreation.css';

// Utility: Roll 4d6 drop lowest
const rollAttribute = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => a - b);
    return rolls.slice(1).reduce((a, b) => a + b, 0);
};

// Utility: Convert lifepath itemIds to full item objects
const resolveLifepathItems = (lifepathItems) => {
    if (!lifepathItems || lifepathItems.length === 0) return [];

    return lifepathItems.map(({ itemId, quantity, reason }) => {
        const itemDef = ITEMS_BY_ID[itemId];
        if (!itemDef) {
            console.warn(`[CharacterCreation] Item "${itemId}" not found in catalog`);
            return null;
        }

        // Return full item object with quantity
        return {
            ...itemDef,
            quantity: quantity || 1,
            equipped: false,
            lifepathReason: reason // Keep reason for lore
        };
    }).filter(Boolean); // Remove nulls
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
    const [selectedBirthOrigin, setSelectedBirthOrigin] = useState(null);
    const [selectedChildhoodEvent, setSelectedChildhoodEvent] = useState(null);
    const [selectedAdolescencePath, setSelectedAdolescencePath] = useState(null);

    const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(null);
    const [selectedAbilityNames, setSelectedAbilityNames] = useState([]);
    const [attributes, setAttributes] = useState({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 });
    const [lifepathStats, setLifepathStats] = useState({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }); // New state for real-time bonuses
    const [lifepathProgress, setLifepathProgress] = useState(null); // New state for real-time narrative
    const [rollingStat, setRollingStat] = useState(null);
    const [portraitUrl, setPortraitUrl] = useState(null);
    const [classPortraits, setClassPortraits] = useState({});
    const [isMuted, setIsMuted] = useState(false);
    const [needsAudioGesture, setNeedsAudioGesture] = useState(false);
    const audioRef = useRef(null);

    // Callback for real-time lifepath stats
    const handleLifepathUpdate = useCallback((effects) => {
        setLifepathProgress(effects);
        const stats = effects.final_stats;
        setLifepathStats({
            str: stats.strength || 0,
            dex: stats.dexterity || 0,
            con: stats.constitution || 0,
            int: stats.intelligence || 0,
            wis: stats.wisdom || 0,
            cha: stats.charisma || 0
        });
    }, []);

    useEffect(() => {
        const defaults = {};
        Object.entries(CLASSES).forEach(([key, data]) => {
            if (data.portrait) defaults[key] = data.portrait;
        });
        setClassPortraits(defaults);
    }, []);

    useEffect(() => {
        if (CLASSES[selectedClass]) {
            setSelectedSubclass(null);
            setSelectedBackstory(null);
            setLifepathData(null);
            setSelectedEquipmentIndex(null);
            setSelectedAbilityNames([]);
        }
    }, [selectedClass]);

    // Music effect: Play character creation theme
    useEffect(() => {
        const audio = new Audio('/Music/Creation de personnages/Wii Sports Theme (Medieval Cover).mp3');
        audio.loop = true;
        audio.volume = 0.3; // Volume à 30%
        audioRef.current = audio;

        if (!isMuted) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Browser blocked autoplay: wait for first user interaction.
                    setNeedsAudioGesture(true);
                });
            }
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
            audioRef.current = null;
        };
    }, []);

    // Handle mute state changes
    useEffect(() => {
        if (!audioRef.current) return;

        if (isMuted) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {
                setNeedsAudioGesture(true);
            });
        }
    }, [isMuted]);

    useEffect(() => {
        if (!needsAudioGesture || isMuted) return;

        const handleFirstInteraction = () => {
            if (!audioRef.current || isMuted) return;

            audioRef.current.play()
                .then(() => setNeedsAudioGesture(false))
                .catch(() => { });
        };

        window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
        window.addEventListener('keydown', handleFirstInteraction, { once: true });

        return () => {
            window.removeEventListener('pointerdown', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
        };
    }, [needsAudioGesture, isMuted]);

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
        if (rollingStat) return;
        const stats = Object.keys(attributes);
        for (let stat of stats) {
            await rollStatPromise(stat);
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
            allTraits = lifepathData.all_traits || [];
            fullNarrative = lifepathData.narrative_summary || '';
            startingReputation = lifepathData.reputation_map || {};
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
            inventory: [...selectedEquipment, ...resolveLifepathItems(lifepathData?.items)],
            portrait_url: portraitUrl || classPortraits[selectedClass],
            backstory: lifepathData?.adult?.label || selectedBackstory?.label,
            life_path: lifePathRecord,
            mechanical_traits: allTraits,
            skill_bonuses: lifepathData?.skills || [],
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
        const num = parseInt(val);
        if (isNaN(num) || num <= 0) return "--";
        const mod = Math.floor((num - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    const classData = CLASSES[selectedClass];

    return (
        <>
            <MagicBackground />
            <div className="creation-container">
                <button
                    className="mute-toggle"
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Réactiver la musique" : "Couper la musique"}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
                <div className="creation-layout">
                    {/* STEP 1: SÉLECTION DE CLASSE (SPLIT VIEW) */}
                    {step === 1 && (
                        <div className="spellbook-shell">
                            <div className="spellbook-nav">
                                {[1, 2, 3, 4, 5, 6, 7].map(s => (
                                    <div key={s} className={`nav-dot ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`} />
                                ))}
                            </div>
                            <div className="spellbook-section">
                                {onQuickStart && (
                                    <div className="quick-start-banner" onClick={onQuickStart}>
                                        <span>⚡ BESOIN D'ÉXÉCUTION ? lancez un héros aléatoire</span>
                                    </div>
                                )}
                                <div className="section-header">
                                    <span className="section-icon">⚔️</span>
                                    <h3>Choisissez votre Voie</h3>
                                </div>

                                <div className="class-selection-container">
                                    <div className="class-list">
                                        {Object.entries(CLASSES).map(([key, cls]) => (
                                            <div key={key} className={`class-list-card ${selectedClass === key ? 'selected' : ''}`} onClick={() => setSelectedClass(key)}>
                                                <div className="class-list-icon">{CLASS_CATEGORIES[cls.category]?.icon || '🛡️'}</div>
                                                <div className="class-list-info">
                                                    <div className="class-list-title">{cls.label}</div>
                                                    <div className="class-list-desc">{cls.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="class-preview-panel">
                                        {selectedClass && CLASSES[selectedClass] ? (
                                            <>
                                                <img src={CLASSES[selectedClass].portrait || CATEGORY_META[CLASSES[selectedClass].category]?.img} className="class-preview-image" alt={selectedClass} />
                                                <div className="class-preview-content">
                                                    <h2 className="class-preview-title">{CLASSES[selectedClass].label}</h2>
                                                    <div className="class-preview-quote">"{CLASSES[selectedClass].quote}"</div>

                                                    {/* Recommended Attributes */}
                                                    {CLASSES[selectedClass].recommended_stats && (
                                                        <div className="recommended-stats-container">
                                                            <div className="rec-stat-group">
                                                                <span className="rec-stat-label">MAJEUR :</span>
                                                                {CLASSES[selectedClass].recommended_stats.major.map(stat => (
                                                                    <span key={stat} className="rec-stat-badge major">{STAT_LABELS[stat]}</span>
                                                                ))}
                                                            </div>
                                                            <div className="rec-stat-group">
                                                                <span className="rec-stat-label">MINEUR :</span>
                                                                {CLASSES[selectedClass].recommended_stats.minor.map(stat => (
                                                                    <span key={stat} className="rec-stat-badge minor">{STAT_LABELS[stat]}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="class-mechanic-box">
                                                        <span className="mechanic-title">Mécanique Unique : {CLASSES[selectedClass].mechanic.name}</span>
                                                        <p className="mechanic-desc">
                                                            {CLASSES[selectedClass].mechanic.desc.split('**').map((part, i) =>
                                                                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="preview-actions">
                                                    <button className="btn-spellbook btn-back" onClick={onBack} style={{ width: 'auto', marginRight: '1rem' }}>← Retour</button>
                                                    <button className="btn-select-class" onClick={() => setStep(2)}>Choisir la Spécialisation</button>
                                                </div>
                                            </>
                                        ) : (
                                            <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Sélectionnez une classe</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEPS 2-7: UNIFIED WIZARD LAYOUT WITH SIDEBAR */}
                    {step > 1 && (
                        <div className="wizard-sidebar-layout">
                            <div className="effects-sidebar">
                                <div className="sidebar-title">HISTOIRE & STATUTS</div>

                                {/* CHRONIQUES DU PARCOURS */}
                                {(lifepathProgress || lifepathData || selectedBackstory) && (
                                    <div className="sidebar-section">
                                        <h4 className="sidebar-label">CHRONIQUES</h4>
                                        <div className="narrative-timeline">
                                            {/* Data source: lifepathProgress (active), lifepathData (finished), or legacy selected items */}
                                            {(() => {
                                                const source = lifepathProgress || lifepathData;
                                                if (source) {
                                                    return (
                                                        <>
                                                            {source.origin && (
                                                                <div className="narrative-entry">
                                                                    <div className="narrative-step-label">Origine</div>
                                                                    <div className="narrative-content">{source.origin.label}</div>
                                                                </div>
                                                            )}
                                                            {source.childhood && (
                                                                <div className="narrative-entry">
                                                                    <div className="narrative-step-label">Enfance</div>
                                                                    <div className="narrative-content">{source.childhood.label}</div>
                                                                </div>
                                                            )}
                                                            {source.adolescence && (
                                                                <div className="narrative-entry">
                                                                    <div className="narrative-step-label">Adolescence</div>
                                                                    <div className="narrative-content">{source.adolescence.label}</div>
                                                                </div>
                                                            )}
                                                            {source.adult && (
                                                                <div className="narrative-entry">
                                                                    <div className="narrative-step-label">Âge Adulte</div>
                                                                    <div className="narrative-content">{source.adult.label}</div>
                                                                </div>
                                                            )}
                                                        </>
                                                    );
                                                } else if (selectedBackstory) {
                                                    // Legacy fallback or just backstory
                                                    return (
                                                        <div className="narrative-entry">
                                                            <div className="narrative-step-label">Passé</div>
                                                            <div className="narrative-content">{selectedBackstory.label}</div>
                                                        </div>
                                                    );
                                                }
                                                return <div className="placeholder-text">Votre histoire s'écrit...</div>;
                                            })()}
                                        </div>
                                    </div>
                                )}
                                <div className="sidebar-section">
                                    <h4 className="sidebar-label">STATISTIQUES</h4>
                                    <div className="sidebar-stats-dashboard">
                                        {Object.entries(attributes).map(([key, baseVal]) => {
                                            const bonusVal = lifepathStats[key] || 0;
                                            const totalVal = baseVal + bonusVal;
                                            return (
                                                <div key={key} className={`dashboard-stat ${totalVal > 10 ? 'positive' : ''}`}>
                                                    <div className="stat-meta">
                                                        <span className="stat-abbr">{key.toUpperCase()}</span>
                                                        <span className="stat-full-name">{STAT_LABELS[key]}</span>
                                                    </div>
                                                    <div className="stat-display">
                                                        <span className="stat-number">{totalVal}</span>
                                                        <span className="stat-bracket-mod">{getModifier(totalVal)}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="sidebar-section">
                                    <h4 className="sidebar-label">CAPACITÉS</h4>
                                    <div className="sidebar-traits-container">
                                        <div className="trait-card-mini">
                                            <div className="trait-header">
                                                <span className="trait-source">{selectedClass}</span>
                                                <span className="trait-separator">•</span>
                                                <strong className="trait-title">{CLASSES[selectedClass]?.mechanic?.name}</strong>
                                            </div>
                                            <p className="trait-snippet">{CLASSES[selectedClass]?.mechanic?.desc}</p>
                                        </div>
                                        {selectedSubclass && classData?.subclasses?.[selectedSubclass] && (
                                            <div className="trait-card-mini highlighted">
                                                <div className="trait-header">
                                                    <span className="trait-source">SPÉCIALISATION</span>
                                                    <span className="trait-separator">•</span>
                                                    <strong className="trait-title">{classData.subclasses[selectedSubclass].label}</strong>
                                                </div>
                                                <p className="trait-snippet">{classData.subclasses[selectedSubclass].details.feature}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectedEquipmentIndex !== null && classData?.starting_equipment_options?.[selectedEquipmentIndex] && (
                                    <div className="sidebar-section">
                                        <h4 className="sidebar-label">ÉQUIPEMENT</h4>
                                        <div className="sidebar-equipment-list">
                                            {classData.starting_equipment_options[selectedEquipmentIndex].items.map((item, i) => (
                                                <div key={i} className="equipment-item-mini">{item.name}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="wizard-main">
                                <div className="wizard-header">
                                    <div className="wizard-tabs-nav">
                                        {[2, 3, 4, 5, 6, 7].map(s => (
                                            <div key={s}
                                                className={`wizard-tab-item ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`}
                                                onClick={() => step > s ? setStep(s) : null}>
                                                <span className="tab-number">0{s - 1}</span>
                                                <span className="tab-label">
                                                    {s === 2 ? 'SPÉCIALISATION' : s === 3 ? 'PARCOURS' : s === 4 ? 'ÉQUIPEMENT' : s === 5 ? 'NOM' : s === 6 ? 'ATTRIBUTS' : 'FINAL'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <h2 className="wizard-title-headline">
                                        {step === 2 && 'CHOIX DE LA SPÉCIALISATION'}
                                        {step === 3 && 'CHRONIQUES DU PARCOURS'}
                                        {step === 4 && 'ARSENAL & ÉQUIPEMENT'}
                                        {step === 5 && 'NOM DE L\'ÉVEILLÉ'}
                                        {step === 6 && 'DÉTERMINATION DU POTENTIEL'}
                                        {step === 7 && 'L\'ÉVEIL DU HÉROS'}
                                    </h2>
                                </div>

                                {/* STEP 2: SUBCLASS */}
                                {step === 2 && (
                                    <>
                                        <div className="subclass-selection-container">
                                            <div className="subclass-grid">
                                                {Object.entries(classData?.subclasses || {}).map(([key, sub]) => (
                                                    <div
                                                        key={key}
                                                        className={`subclass-card ${selectedSubclass === key ? 'selected' : ''}`}
                                                        onClick={() => setSelectedSubclass(key)}
                                                    >
                                                        <div className="subclass-header">
                                                            <h3 className="subclass-title">{sub.label}</h3>
                                                            {sub.details && sub.details.style && (
                                                                <div className="subclass-style-badge">{sub.details.style}</div>
                                                            )}
                                                        </div>

                                                        <div className="subclass-body">
                                                            <div className="subclass-desc">"{sub.desc}"</div>

                                                            {sub.details && sub.details.feature && (
                                                                <div className="subclass-feature">
                                                                    <span className="feature-label">Capacité Unique</span>
                                                                    <div className="feature-text">{sub.details.feature}</div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="subclass-icon-watermark">
                                                            {CLASS_CATEGORIES[classData.category]?.icon || '⚔️'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="wizard-footer" style={{ marginTop: '2rem' }}>
                                            <button className="btn-secondary" onClick={() => setStep(1)}>← Retour</button>
                                            <button className="btn-primary" onClick={() => setStep(3)} disabled={!selectedSubclass}>Confirmer la Spécialisation →</button>
                                        </div>
                                    </>
                                )}

                                {/* STEP 3: LIFEPATH */}
                                {step === 3 && (
                                    <LifePathWizard
                                        hideSidebar={true}
                                        onUpdate={handleLifepathUpdate}
                                        onComplete={(effects) => {
                                            setLifepathData(effects);
                                            // Permanently apply to attributes and clear lifepathStats
                                            setAttributes(prev => ({
                                                str: prev.str + (effects.final_stats.strength || 0),
                                                dex: prev.dex + (effects.final_stats.dexterity || 0),
                                                con: prev.con + (effects.final_stats.constitution || 0),
                                                int: prev.int + (effects.final_stats.intelligence || 0),
                                                wis: prev.wis + (effects.final_stats.wisdom || 0),
                                                cha: prev.cha + (effects.final_stats.charisma || 0)
                                            }));
                                            setLifepathStats({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 });
                                            setStep(4);
                                        }}
                                        onCancel={() => {
                                            setLifepathStats({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 });
                                            setStep(2);
                                        }}
                                    />
                                )}

                                {/* STEP 4: EQUIPMENT */}
                                {step === 4 && (
                                    <>
                                        <div className="wizard-options">
                                            {classData?.starting_equipment_options.map((opt, idx) => (
                                                <div key={idx} className={`life-choice-card ${selectedEquipmentIndex === idx ? 'selected' : ''}`} onClick={() => setSelectedEquipmentIndex(idx)}>
                                                    <div className="card-title">{opt.label}</div>
                                                    <div className="card-desc">
                                                        <ul className="items-list" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                                                            {opt.items.map((item, i) => (
                                                                <li key={i} style={{ background: 'rgba(0,0,0,0.2)', marginBottom: '0.4rem', padding: '0.5rem', borderRadius: '4px' }}>{item.name}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="wizard-footer">
                                            <button className="btn-secondary" onClick={() => setStep(3)}>← Retour</button>
                                            <button className="btn-primary" onClick={() => setStep(5)} disabled={selectedEquipmentIndex === null}>Valider l'Équipement →</button>
                                        </div>
                                    </>
                                )}

                                {/* STEP 5: NAME */}
                                {step === 5 && (
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '4rem 0' }}>
                                            <input type="text" className="magical-input" placeholder="Nom du Héros" value={name} onChange={e => setName(e.target.value)} autoFocus />
                                            {name && <div className="name-preview" style={{ marginTop: '2rem', fontSize: '1.5rem', color: 'var(--gold-dim)' }}>{name}</div>}
                                        </div>
                                        <div className="wizard-footer">
                                            <button className="btn-secondary" onClick={() => setStep(4)}>← Retour</button>
                                            <button className="btn-primary" onClick={() => setStep(6)} disabled={!name}>Confirmer l'Identité →</button>
                                        </div>
                                    </>
                                )}

                                {/* STEP 6: ATTRIBUTES */}
                                {step === 6 && (
                                    <>
                                        <div className="wizard-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                                            {Object.entries(attributes).map(([key, val]) => (
                                                <div key={key} className={`stat-rune ${rollingStat === key ? 'rolling' : ''}`} onClick={() => rollStat(key)} style={{ cursor: 'pointer' }}>
                                                    <div className="stat-label" style={{ fontSize: '0.8rem', color: '#666', letterSpacing: '2px' }}>{STAT_LABELS[key].toUpperCase()}</div>
                                                    <div className="stat-value" style={{ fontSize: '3rem', color: 'var(--gold-primary)', fontFamily: '"Cinzel Decorative", serif' }}>{val || '?'}</div>
                                                    <div className="stat-modifier" style={{ fontSize: '1rem', color: '#888' }}>{val ? getModifier(val) : '--'}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="wizard-footer">
                                            <button className="btn-secondary" onClick={() => setStep(5)}>← Retour</button>
                                            <button
                                                className="btn-medieval btn-epic-roll"
                                                onClick={rollAll}
                                                disabled={isRolling}
                                                style={{ margin: '0 1rem' }}
                                            >
                                                {isRolling ? '⚡ LANÇAGE...' : '✨ TOUT LANCER'}
                                            </button>
                                            <button className="btn-primary" onClick={() => setStep(7)} disabled={!allRolled || isRolling}>Finaliser les Caractéristiques →</button>
                                        </div>
                                    </>
                                )}

                                {/* STEP 7: FINAL */}
                                {step === 7 && (
                                    <>
                                        <div className="final-dossier">
                                            <div className="dossier-header">
                                                <h2 className="dossier-name">{name}</h2>
                                                <div className="dossier-subtitle">
                                                    <span>{selectedClass}</span>
                                                    <span className="dossier-separator">•</span>
                                                    <span>{classData.subclasses[selectedSubclass]?.label}</span>
                                                    <span className="dossier-separator">•</span>
                                                    <span>Niveau 1</span>
                                                </div>
                                            </div>

                                            <div className="dossier-content-grid">
                                                {/* Column 1: Stats */}
                                                <div className="dossier-section">
                                                    <h3 className="dossier-section-title">Attributs</h3>
                                                    <div className="dossier-stats-grid">
                                                        {Object.entries(attributes).map(([key, val]) => (
                                                            <div key={key} className="dossier-stat-row">
                                                                <span className="stat-label">{STAT_LABELS[key]}</span>
                                                                <span className="stat-val">{val}</span>
                                                                <span className="stat-mod">{getModifier(val)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Column 2: Lifepath */}
                                                <div className="dossier-section">
                                                    <h3 className="dossier-section-title">Origines</h3>
                                                    <div className="dossier-lifepath">
                                                        <div className="lifepath-item">
                                                            <span className="lp-label">Naissance</span>
                                                            <span className="lp-val">{lifepathData?.origin?.label || selectedBirthOrigin?.label || 'Inconnu'}</span>
                                                        </div>
                                                        <div className="lifepath-item">
                                                            <span className="lp-label">Enfance</span>
                                                            <span className="lp-val">{lifepathData?.childhood?.label || selectedChildhoodEvent?.label || 'Ordinaire'}</span>
                                                        </div>
                                                        <div className="lifepath-item">
                                                            <span className="lp-label">Vécu</span>
                                                            <span className="lp-val">{lifepathData?.adult?.label || selectedBackstory?.label || 'Aventurier'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Column 3: Equipment & Bio */}
                                                <div className="dossier-section">
                                                    <h3 className="dossier-section-title">Inventaire</h3>
                                                    <ul className="dossier-equipment">
                                                        {classData?.starting_equipment_options[selectedEquipmentIndex]?.items.map((item, i) => (
                                                            <li key={i}>{item.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="dossier-bio">
                                                <p>"{classData.subclasses[selectedSubclass]?.desc}"</p>
                                            </div>
                                        </div>
                                        <div className="wizard-footer">
                                            <button className="btn-secondary" onClick={() => setStep(6)}>← Retour</button>
                                            <button className="btn-primary" onClick={handleCreate}>Lancer l'Aventure →</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
