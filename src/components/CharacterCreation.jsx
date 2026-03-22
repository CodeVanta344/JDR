import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CLASSES, CLASS_CATEGORIES } from '../lore';
import { ITEMS_BY_ID } from '../lore/items-catalog';
import { MagicBackground } from './MagicBackground';
import { LifePathWizard } from './character-creation/LifePathWizard';
import './CharacterCreation.css';

// ── Constants ──────────────────────────────────────────────────────────
const STAT_LABELS = {
    str: 'Force', dex: 'Dextérité', con: 'Constitution',
    int: 'Intelligence', wis: 'Sagesse', cha: 'Charisme'
};

const STAT_ICONS = {
    str: '⚔️', dex: '🏹', con: '🛡️',
    int: '📜', wis: '👁️', cha: '👑'
};

const STEP_LABELS = ['Identité', 'Classe', 'Parcours', 'Stats', 'Équipement'];

const CATEGORY_KEYS = ['MIGHT', 'MAGIC', 'SKILL'];

const EMPTY_STATS = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };

// ── Utilities ──────────────────────────────────────────────────────────
const rollAttribute = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => a - b);
    return rolls.slice(1).reduce((a, b) => a + b, 0);
};

const getModifier = (val) => {
    const num = parseInt(val);
    if (isNaN(num) || num <= 0) return '--';
    const mod = Math.floor((num - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
};

const resolveLifepathItems = (lifepathItems) => {
    if (!lifepathItems || lifepathItems.length === 0) return [];
    return lifepathItems.map(({ itemId, quantity, reason }) => {
        const itemDef = ITEMS_BY_ID[itemId];
        if (!itemDef) { console.warn(`[CharacterCreation] Item "${itemId}" not found`); return null; }
        return { ...itemDef, quantity: quantity || 1, equipped: false, lifepathReason: reason };
    }).filter(Boolean);
};

// ── Main Component ─────────────────────────────────────────────────────
export function CharacterCreation({ onCreate, onBack, onQuickStart, sessionId }) {
    // Navigation
    const [step, setStep] = useState(1);
    const [slideDir, setSlideDir] = useState('right');

    // Step 1: Identity
    const [name, setName] = useState('');
    const [portraitUrl, setPortraitUrl] = useState(null);
    const [classPortraits, setClassPortraits] = useState({});

    // Step 2: Class & Subclass
    const [selectedCategory, setSelectedCategory] = useState('MIGHT');
    const [selectedClass, setSelectedClass] = useState('Guerrier');
    const [selectedSubclass, setSelectedSubclass] = useState(null);

    // Step 3: Lifepath
    const [lifepathData, setLifepathData] = useState(null);
    const [lifepathStats, setLifepathStats] = useState({ ...EMPTY_STATS });
    const [lifepathProgress, setLifepathProgress] = useState(null);

    // Step 4: Stats & Abilities
    const [attributes, setAttributes] = useState({ ...EMPTY_STATS });
    const [rollingStat, setRollingStat] = useState(null);
    const [selectedAbilityNames, setSelectedAbilityNames] = useState([]);

    // Step 5: Equipment
    const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(null);

    const classData = CLASSES[selectedClass];

    // ── Derived state ──────────────────────────────────────────────────
    const allRolled = Object.values(attributes).every(v => v > 0);
    const isRolling = rollingStat !== null;

    const finalStats = useMemo(() => {
        const result = {};
        for (const key of Object.keys(EMPTY_STATS)) {
            result[key] = Math.min((attributes[key] || 0) + (lifepathStats[key] || 0), 18);
        }
        return result;
    }, [attributes, lifepathStats]);

    const conMod = useMemo(() => Math.floor(((finalStats.con || 10) - 10) / 2), [finalStats.con]);
    const computedHp = useMemo(() => (classData?.hitDie || 8) + 6 + conMod, [classData, conMod]);

    // ── Init portraits from class data ─────────────────────────────────
    useEffect(() => {
        const defaults = {};
        Object.entries(CLASSES).forEach(([key, data]) => {
            if (data.portrait) defaults[key] = data.portrait;
        });
        setClassPortraits(defaults);
    }, []);

    // ── Reset dependent state on class change ──────────────────────────
    useEffect(() => {
        if (CLASSES[selectedClass]) {
            setSelectedSubclass(null);
            setLifepathData(null);
            setSelectedEquipmentIndex(null);
            setSelectedAbilityNames([]);
        }
    }, [selectedClass]);

    // ── Navigation helpers ─────────────────────────────────────────────
    const goToStep = useCallback((target) => {
        setSlideDir(target > step ? 'right' : 'left');
        setStep(target);
    }, [step]);

    // ── Stat rolling ───────────────────────────────────────────────────
    const rollStatPromise = (statKey) => new Promise((resolve) => {
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

    const rollAll = async () => {
        if (isRolling) return;
        for (const stat of Object.keys(attributes)) {
            await rollStatPromise(stat);
        }
    };

    // ── Lifepath callbacks ─────────────────────────────────────────────
    const handleLifepathUpdate = useCallback((effects) => {
        setLifepathProgress(effects);
        const stats = effects.final_stats;
        setLifepathStats({
            str: stats.strength || 0, dex: stats.dexterity || 0, con: stats.constitution || 0,
            int: stats.intelligence || 0, wis: stats.wisdom || 0, cha: stats.charisma || 0
        });
    }, []);

    const handleLifepathComplete = useCallback((effects) => {
        setLifepathData(effects);
        const stats = effects.final_stats;
        setLifepathStats({
            str: stats.strength || 0, dex: stats.dexterity || 0, con: stats.constitution || 0,
            int: stats.intelligence || 0, wis: stats.wisdom || 0, cha: stats.charisma || 0
        });
        goToStep(4);
    }, [goToStep]);

    // ── Ability toggle ─────────────────────────────────────────────────
    const toggleAbility = (abilityName) => {
        setSelectedAbilityNames(prev => {
            if (prev.includes(abilityName)) return prev.filter(n => n !== abilityName);
            if (prev.length >= 2) return prev;
            return [...prev, abilityName];
        });
    };

    // ── Final creation ─────────────────────────────────────────────────
    const handleCreate = () => {
        if (!name.trim()) return;
        const clsData = CLASSES[selectedClass];
        const selectedSubclassData = clsData.subclasses[selectedSubclass];
        const selectedEquipment = clsData.starting_equipment_options[selectedEquipmentIndex].items;
        const chosenAbilities = clsData.initial_ability_options.filter(a => selectedAbilityNames.includes(a.name));

        let allTraits = [];
        let fullNarrative = '';
        let startingReputation = {};
        let knownNpcs = [];
        let factionTies = [];
        let discoveredSecrets = [];
        let lifePathRecord = {};

        if (lifepathData) {
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
        }

        const charData = {
            name,
            class: `${selectedClass} (${selectedSubclassData?.label || '...'})`,
            mechanic: clsData.mechanic,
            desc: clsData.desc,
            stats: { ...finalStats },
            gold: Math.floor(100 * (lifepathData?.social_class_modifier || 1.0)),
            abilities: chosenAbilities,
            equipment: selectedEquipment,
            hp: computedHp,
            maxHp: computedHp,
            resource: 100,
            max_resource: 100,
            inventory: [...selectedEquipment, ...resolveLifepathItems(lifepathData?.items)],
            portrait_url: portraitUrl || classPortraits[selectedClass],
            backstory: lifepathData?.adult?.label,
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

    // ── Classes filtered by category ───────────────────────────────────
    const classesByCategory = useMemo(() => {
        const result = {};
        for (const cat of CATEGORY_KEYS) {
            result[cat] = Object.entries(CLASSES).filter(([, cls]) => cls.category === cat);
        }
        return result;
    }, []);

    // ════════════════════════════════════════════════════════════════════
    // RENDER
    // ════════════════════════════════════════════════════════════════════
    return (
        <>
            <MagicBackground />
            <div className="creation-container">
                <div className="creation-layout">
                    {/* ── Progress Bar ───────────────────────────────── */}
                    <div className="progress-bar-5">
                        {STEP_LABELS.map((label, i) => (
                            <div key={i} className={`progress-step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'completed' : ''}`}
                                onClick={() => step > i + 1 ? goToStep(i + 1) : null}>
                                <div className="progress-dot">{step > i + 1 ? '✓' : i + 1}</div>
                                <span className="progress-label">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="creation-body">
                        {/* ── Persistent Sidebar (steps 2+) ─────────── */}
                        {step >= 2 && (
                            <div className="effects-sidebar">
                                <div className="sidebar-title">FICHE EN COURS</div>

                                {name && (
                                    <div className="sidebar-section">
                                        <h4 className="sidebar-label">IDENTITÉ</h4>
                                        <div className="sidebar-hero-name">{name}</div>
                                    </div>
                                )}

                                <div className="sidebar-section">
                                    <h4 className="sidebar-label">CLASSE</h4>
                                    <div className="sidebar-class-info">
                                        <span className="sidebar-class-name">{classData?.label}</span>
                                        {selectedSubclass && classData?.subclasses?.[selectedSubclass] && (
                                            <span className="sidebar-subclass-name">{classData.subclasses[selectedSubclass].label}</span>
                                        )}
                                    </div>
                                </div>

                                {(lifepathProgress || lifepathData) && (
                                    <div className="sidebar-section">
                                        <h4 className="sidebar-label">CHRONIQUES</h4>
                                        <div className="narrative-timeline">
                                            {(() => {
                                                const source = lifepathProgress || lifepathData;
                                                return (
                                                    <>
                                                        {source.origin && <div className="narrative-entry"><div className="narrative-step-label">Origine</div><div className="narrative-content">{source.origin.label}</div></div>}
                                                        {source.childhood && <div className="narrative-entry"><div className="narrative-step-label">Enfance</div><div className="narrative-content">{source.childhood.label}</div></div>}
                                                        {source.adolescence && <div className="narrative-entry"><div className="narrative-step-label">Adolescence</div><div className="narrative-content">{source.adolescence.label}</div></div>}
                                                        {source.adult && <div className="narrative-entry"><div className="narrative-step-label">Adulte</div><div className="narrative-content">{source.adult.label}</div></div>}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                )}

                                {(allRolled || Object.values(lifepathStats).some(v => v !== 0)) && (
                                    <div className="sidebar-section">
                                        <h4 className="sidebar-label">STATISTIQUES</h4>
                                        <div className="sidebar-stats-dashboard">
                                            {Object.entries(finalStats).map(([key, val]) => (
                                                <div key={key} className={`dashboard-stat ${val > 10 ? 'positive' : ''}`}>
                                                    <div className="stat-meta">
                                                        <span className="stat-abbr">{key.toUpperCase()}</span>
                                                        <span className="stat-full-name">{STAT_LABELS[key]}</span>
                                                    </div>
                                                    <div className="stat-display">
                                                        <span className="stat-number">{val || '?'}</span>
                                                        <span className="stat-bracket-mod">{getModifier(val)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

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
                        )}

                        {/* ── Main Content Area ─────────────────────── */}
                        <div className={`wizard-main step-slide-${slideDir}`} key={step}>

                            {/* ═══════════ STEP 1: IDENTITY ═══════════ */}
                            {step === 1 && (
                                <div className="step-identity">
                                    {onQuickStart && (
                                        <div className="quick-start-banner" onClick={onQuickStart}>
                                            <span>BESOIN D'ACTION ? Lancez un héros aléatoire</span>
                                        </div>
                                    )}
                                    <div className="identity-content">
                                        <h2 className="step-headline">NOMMEZ VOTRE HÉROS</h2>
                                        <input
                                            type="text"
                                            className="magical-input"
                                            placeholder="Nom du Héros"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            autoFocus
                                        />
                                        {name && <div className="name-preview">{name}</div>}

                                        <div className="portrait-selection">
                                            <h3 className="portrait-title">Portrait</h3>
                                            <div className="portrait-grid">
                                                {Object.entries(classPortraits).map(([cls, url]) => (
                                                    <div
                                                        key={cls}
                                                        className={`portrait-option ${(portraitUrl || classPortraits[selectedClass]) === url ? 'selected' : ''}`}
                                                        onClick={() => setPortraitUrl(url)}
                                                    >
                                                        <img src={url} alt={cls} className="portrait-thumb" />
                                                        <span className="portrait-class-label">{CLASSES[cls]?.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wizard-footer">
                                        <button className="btn-secondary" onClick={onBack}>Retour</button>
                                        <button className="btn-primary" onClick={() => goToStep(2)} disabled={!name.trim()}>
                                            Choisir ma Classe
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ═══════════ STEP 2: CLASS & SUBCLASS ═══════════ */}
                            {step === 2 && (
                                <div className="step-class-subclass">
                                    <h2 className="step-headline">VOIE & SPÉCIALISATION</h2>
                                    <div className="class-subclass-layout">
                                        {/* Left: Category tabs + class list */}
                                        <div className="class-picker">
                                            <div className="category-tabs">
                                                {CATEGORY_KEYS.map(cat => (
                                                    <button
                                                        key={cat}
                                                        className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                                                        onClick={() => setSelectedCategory(cat)}
                                                        style={{ '--cat-color': CLASS_CATEGORIES[cat]?.color }}
                                                    >
                                                        <span className="cat-icon">{CLASS_CATEGORIES[cat]?.icon}</span>
                                                        <span className="cat-name">{CLASS_CATEGORIES[cat]?.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="class-list">
                                                {classesByCategory[selectedCategory]?.map(([key, cls]) => (
                                                    <div
                                                        key={key}
                                                        className={`class-list-card ${selectedClass === key ? 'selected' : ''}`}
                                                        onClick={() => setSelectedClass(key)}
                                                    >
                                                        <div className="class-list-icon">{CLASS_CATEGORIES[cls.category]?.icon || '🛡️'}</div>
                                                        <div className="class-list-info">
                                                            <div className="class-list-title">{cls.label}</div>
                                                            <div className="class-list-desc">{cls.desc}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right: Class detail + subclass cards */}
                                        <div className="class-detail-panel">
                                            {classData && (
                                                <>
                                                    <div className="class-detail-header">
                                                        <img src={classData.portrait || ''} className="class-detail-portrait" alt={selectedClass} />
                                                        <div className="class-detail-meta">
                                                            <h3 className="class-detail-name">{classData.label}</h3>
                                                            <p className="class-detail-desc">{classData.desc}</p>
                                                            {classData.recommended_stats && (
                                                                <div className="recommended-stats-container">
                                                                    <div className="rec-stat-group">
                                                                        <span className="rec-stat-label">MAJEUR :</span>
                                                                        {classData.recommended_stats.major.map(stat => (
                                                                            <span key={stat} className="rec-stat-badge major">{STAT_LABELS[stat]}</span>
                                                                        ))}
                                                                    </div>
                                                                    <div className="rec-stat-group">
                                                                        <span className="rec-stat-label">MINEUR :</span>
                                                                        {classData.recommended_stats.minor.map(stat => (
                                                                            <span key={stat} className="rec-stat-badge minor">{STAT_LABELS[stat]}</span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="class-mechanic-box">
                                                                <span className="mechanic-title">{classData.mechanic.name}</span>
                                                                <p className="mechanic-desc">
                                                                    {classData.mechanic.desc.split('**').map((part, i) =>
                                                                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h4 className="subclass-heading">SPÉCIALISATIONS</h4>
                                                    <div className="subclass-grid">
                                                        {Object.entries(classData.subclasses || {}).map(([key, sub]) => (
                                                            <div
                                                                key={key}
                                                                className={`subclass-card ${selectedSubclass === key ? 'selected' : ''}`}
                                                                onClick={() => setSelectedSubclass(key)}
                                                            >
                                                                <div className="subclass-header">
                                                                    <h3 className="subclass-title">{sub.label}</h3>
                                                                    {sub.details?.style && <div className="subclass-style-badge">{sub.details.style}</div>}
                                                                </div>
                                                                <div className="subclass-body">
                                                                    <div className="subclass-desc">{sub.desc}</div>
                                                                    {sub.details?.feature && (
                                                                        <div className="subclass-feature">
                                                                            <span className="feature-label">Capacité Unique</span>
                                                                            <div className="feature-text">{sub.details.feature}</div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="wizard-footer">
                                        <button className="btn-secondary" onClick={() => goToStep(1)}>Retour</button>
                                        <button className="btn-primary" onClick={() => goToStep(3)} disabled={!selectedClass || !selectedSubclass}>
                                            Forger mon Parcours
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ═══════════ STEP 3: LIFEPATH ═══════════ */}
                            {step === 3 && (
                                <div className="step-lifepath">
                                    <LifePathWizard
                                        hideSidebar={true}
                                        onUpdate={handleLifepathUpdate}
                                        onComplete={handleLifepathComplete}
                                        onCancel={() => {
                                            setLifepathStats({ ...EMPTY_STATS });
                                            goToStep(2);
                                        }}
                                    />
                                </div>
                            )}

                            {/* ═══════════ STEP 4: STATS & ABILITIES ═══════════ */}
                            {step === 4 && (
                                <div className="step-stats-abilities">
                                    <h2 className="step-headline">ATTRIBUTS & CAPACITÉS</h2>

                                    {/* Stat Allocator */}
                                    <div className="stats-section">
                                        <h3 className="subsection-title">Détermination du Potentiel</h3>
                                        <p className="subsection-hint">Cliquez sur chaque attribut pour lancer les dés, ou lancez tout d'un coup.</p>
                                        <div className="stat-rune-grid">
                                            {Object.entries(attributes).map(([key, val]) => {
                                                const bonus = lifepathStats[key] || 0;
                                                const capped = Math.min((val || 0) + bonus, 18);
                                                return (
                                                    <div
                                                        key={key}
                                                        className={`stat-rune ${rollingStat === key ? 'rolling' : ''} ${val > 0 ? 'rolled' : ''}`}
                                                        onClick={() => !isRolling && rollStatPromise(key)}
                                                    >
                                                        <div className="stat-label">{STAT_LABELS[key].toUpperCase()}</div>
                                                        <div className="stat-value">{val || '?'}</div>
                                                        {bonus !== 0 && val > 0 && (
                                                            <div className={`stat-bonus ${bonus > 0 ? 'positive' : 'negative'}`}>
                                                                {bonus > 0 ? '+' : ''}{bonus}
                                                            </div>
                                                        )}
                                                        <div className="stat-modifier">{capped > 0 ? getModifier(capped) : '--'}</div>
                                                        {bonus !== 0 && val > 0 && (
                                                            <div className="stat-total">= {capped}</div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <button className="btn-roll-all" onClick={rollAll} disabled={isRolling}>
                                            {isRolling ? 'LANÇAGE...' : 'TOUT LANCER'}
                                        </button>
                                    </div>

                                    {/* Abilities */}
                                    {allRolled && (
                                        <div className="abilities-section">
                                            <h3 className="subsection-title">Capacités de Départ</h3>
                                            <p className="subsection-hint">Choisissez 2 capacités parmi les 3 suivantes.</p>

                                            {/* Subclass passive */}
                                            {selectedSubclass && classData?.subclasses?.[selectedSubclass] && (
                                                <div className="passive-ability-card">
                                                    <div className="passive-badge">PASSIF - AUTO</div>
                                                    <div className="passive-name">{classData.subclasses[selectedSubclass].label}</div>
                                                    <div className="passive-desc">{classData.subclasses[selectedSubclass].details.feature}</div>
                                                </div>
                                            )}

                                            <div className="ability-cards-grid">
                                                {classData?.initial_ability_options?.map((ability) => (
                                                    <div
                                                        key={ability.name}
                                                        className={`ability-card ${selectedAbilityNames.includes(ability.name) ? 'selected' : ''} ${selectedAbilityNames.length >= 2 && !selectedAbilityNames.includes(ability.name) ? 'disabled' : ''}`}
                                                        onClick={() => toggleAbility(ability.name)}
                                                    >
                                                        <div className="ability-header">
                                                            <h4 className="ability-name">{ability.name}</h4>
                                                            <div className="ability-meta">
                                                                {ability.actionType && <span className="ability-tag action">{ability.actionType}</span>}
                                                                {ability.cost > 0 && <span className="ability-tag cost">{ability.cost} PR</span>}
                                                                {ability.cooldown > 0 && <span className="ability-tag cd">{ability.cooldown}T CD</span>}
                                                            </div>
                                                        </div>
                                                        <p className="ability-flavor">{ability.flavor}</p>
                                                        <p className="ability-desc">{ability.desc}</p>
                                                        {ability.dice && <div className="ability-dice">{ability.dice}</div>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="wizard-footer">
                                        <button className="btn-secondary" onClick={() => goToStep(3)}>Retour</button>
                                        <button className="btn-primary" onClick={() => goToStep(5)} disabled={!allRolled || selectedAbilityNames.length < 2}>
                                            Équipement & Révision
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ═══════════ STEP 5: EQUIPMENT & FINAL REVIEW ═══════════ */}
                            {step === 5 && (
                                <div className="step-equipment-review">
                                    <h2 className="step-headline">ARSENAL & REVUE FINALE</h2>

                                    {/* Equipment loadouts */}
                                    <div className="equipment-section">
                                        <h3 className="subsection-title">Choisissez votre Arsenal</h3>
                                        <div className="equipment-options">
                                            {classData?.starting_equipment_options.map((opt, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`equipment-loadout ${selectedEquipmentIndex === idx ? 'selected' : ''}`}
                                                    onClick={() => setSelectedEquipmentIndex(idx)}
                                                >
                                                    <div className="loadout-label">{opt.label}</div>
                                                    <ul className="loadout-items">
                                                        {opt.items.map((item, i) => (
                                                            <li key={i} className="loadout-item">
                                                                <span className="item-name">{item.name}</span>
                                                                <span className="item-stats">
                                                                    {item.stats.atk && `+${item.stats.atk} ATK`}
                                                                    {item.stats.ac && `+${item.stats.ac} CA`}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Lifepath heritage items */}
                                        {lifepathData?.items?.length > 0 && (
                                            <div className="heritage-items">
                                                <h4 className="heritage-title">Objets Hérités du Parcours</h4>
                                                {resolveLifepathItems(lifepathData.items).map((item, i) => (
                                                    <div key={i} className="heritage-item">
                                                        <span>{item.name}</span>
                                                        {item.lifepathReason && <span className="heritage-reason">{item.lifepathReason}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Final Review Sheet */}
                                    <div className="final-dossier">
                                        <div className="dossier-header">
                                            <h2 className="dossier-name">{name}</h2>
                                            <div className="dossier-subtitle">
                                                <span>{selectedClass}</span>
                                                <span className="dossier-separator">-</span>
                                                <span>{classData?.subclasses[selectedSubclass]?.label}</span>
                                                <span className="dossier-separator">-</span>
                                                <span>Niveau 1</span>
                                            </div>
                                            <div className="dossier-hp">PV : {computedHp}</div>
                                        </div>

                                        <div className="dossier-content-grid">
                                            {/* Stats */}
                                            <div className="dossier-section">
                                                <h3 className="dossier-section-title">Attributs</h3>
                                                <div className="dossier-stats-grid">
                                                    {Object.entries(finalStats).map(([key, val]) => (
                                                        <div key={key} className="dossier-stat-row">
                                                            <span className="stat-label">{STAT_LABELS[key]}</span>
                                                            <span className="stat-val">{val}</span>
                                                            <span className="stat-mod">{getModifier(val)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Abilities */}
                                            <div className="dossier-section">
                                                <h3 className="dossier-section-title">Capacités</h3>
                                                <div className="dossier-abilities">
                                                    {classData?.initial_ability_options
                                                        .filter(a => selectedAbilityNames.includes(a.name))
                                                        .map((a, i) => (
                                                            <div key={i} className="dossier-ability">{a.name}</div>
                                                        ))}
                                                    {selectedSubclass && classData?.subclasses?.[selectedSubclass] && (
                                                        <div className="dossier-ability passive">{classData.subclasses[selectedSubclass].label} (Passif)</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Lifepath summary */}
                                            <div className="dossier-section">
                                                <h3 className="dossier-section-title">Origines</h3>
                                                <div className="dossier-lifepath">
                                                    {lifepathData?.origin && <div className="lifepath-item"><span className="lp-label">Naissance</span><span className="lp-val">{lifepathData.origin.label}</span></div>}
                                                    {lifepathData?.childhood && <div className="lifepath-item"><span className="lp-label">Enfance</span><span className="lp-val">{lifepathData.childhood.label}</span></div>}
                                                    {lifepathData?.adolescence && <div className="lifepath-item"><span className="lp-label">Adolescence</span><span className="lp-val">{lifepathData.adolescence.label}</span></div>}
                                                    {lifepathData?.adult && <div className="lifepath-item"><span className="lp-label">Adulte</span><span className="lp-val">{lifepathData.adult.label}</span></div>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Equipment preview */}
                                        {selectedEquipmentIndex !== null && (
                                            <div className="dossier-equipment-section">
                                                <h3 className="dossier-section-title">Inventaire</h3>
                                                <ul className="dossier-equipment">
                                                    {classData.starting_equipment_options[selectedEquipmentIndex].items.map((item, i) => (
                                                        <li key={i}>{item.name}</li>
                                                    ))}
                                                    {resolveLifepathItems(lifepathData?.items).map((item, i) => (
                                                        <li key={`lp-${i}`} className="heritage">{item.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="wizard-footer">
                                        <button className="btn-secondary" onClick={() => goToStep(4)}>Retour</button>
                                        <button
                                            className="btn-create-final"
                                            onClick={handleCreate}
                                            disabled={selectedEquipmentIndex === null}
                                        >
                                            FORGER MON DESTIN
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
