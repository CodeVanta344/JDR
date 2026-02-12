import React, { useState, useEffect } from 'react';
import { CLASSES, CLASS_CATEGORIES, ENRICHED_BACKSTORIES, getBackstoriesForClass, formatBackstoryForGM, LOCATION_BACKGROUNDS, BIRTH_ORIGINS, CHILDHOOD_EVENTS, ADOLESCENCE_PATHS } from '../lore';
import { MagicBackground } from './MagicBackground';
import { LifePathWizard } from './character-creation/LifePathWizard';
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
                                <div className="sidebar-title">EFFETS CUMULÉS</div>
                                <div className="sidebar-section">
                                    <h4 className="sidebar-label">STATISTIQUES</h4>
                                    <div className="sidebar-stats-dashboard">
                                        {Object.entries(attributes).map(([key, val]) => (
                                            <div key={key} className={`dashboard-stat ${val > 10 ? 'positive' : ''}`}>
                                                <div className="stat-meta">
                                                    <span className="stat-abbr">{key.toUpperCase()}</span>
                                                    <span className="stat-full-name">{STAT_LABELS[key]}</span>
                                                </div>
                                                <div className="stat-display">
                                                    <span className="stat-number">{val}</span>
                                                    <span className="stat-bracket-mod">{getModifier(val)}</span>
                                                </div>
                                            </div>
                                        ))}
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
                                            <p className="trait-snippet">{CLASSES[selectedClass]?.mechanic?.desc?.slice(0, 100)}...</p>
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
                                        <div className="wizard-options">
                                            {Object.entries(classData?.subclasses || {}).map(([key, sub]) => (
                                                <div key={key} className={`life-choice-card ${selectedSubclass === key ? 'selected' : ''}`} onClick={() => setSelectedSubclass(key)}>
                                                    <div className="card-title">{sub.label}</div>
                                                    <div className="card-desc">{sub.desc}</div>
                                                    <div className="card-traits">
                                                        <span className="stat-tag bonus">{sub.details.feature}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="wizard-footer">
                                            <button className="btn-secondary" onClick={() => setStep(1)}>← Retour</button>
                                            <button className="btn-primary" onClick={() => setStep(3)} disabled={!selectedSubclass}>Confirmer la Spécialisation →</button>
                                        </div>
                                    </>
                                )}

                                {/* STEP 3: LIFEPATH */}
                                {step === 3 && (
                                    <LifePathWizard
                                        hideSidebar={true}
                                        onComplete={(effects) => {
                                            setLifepathData(effects);
                                            setAttributes(prev => ({
                                                str: prev.str + (effects.final_stats.strength || 0),
                                                dex: prev.dex + (effects.final_stats.dexterity || 0),
                                                con: prev.con + (effects.final_stats.constitution || 0),
                                                int: prev.int + (effects.final_stats.intelligence || 0),
                                                wis: prev.wis + (effects.final_stats.wisdom || 0),
                                                cha: prev.cha + (effects.final_stats.charisma || 0)
                                            }));
                                            setStep(4);
                                        }}
                                        onCancel={() => setStep(2)}
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
                                            <button className="btn-primary" onClick={() => setStep(7)} disabled={!allRolled}>Finaliser les Caractéristiques →</button>
                                        </div>
                                    </>
                                )}

                                {/* STEP 7: FINAL */}
                                {step === 7 && (
                                    <>
                                        <div className="final-dossier" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                                            <p className="dossier-intro" style={{ letterSpacing: '4px', color: '#666' }}>Le destin de votre héros est scellé.</p>
                                            <h2 className="dossier-name" style={{ fontSize: '4rem', color: 'var(--gold-primary)', margin: '1rem 0' }}>{name}</h2>
                                            <div className="dossier-subtitle" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                                                <span>{selectedClass}</span>
                                                <span style={{ margin: '0 1rem', color: 'var(--gold-dim)' }}>•</span>
                                                <span>{classData.subclasses[selectedSubclass]?.label}</span>
                                            </div>
                                            <div className="card-lore" style={{ marginTop: '3rem', fontStyle: 'italic', color: '#888', lineHeight: '1.6' }}>
                                                {classData.subclasses[selectedSubclass]?.desc}
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
