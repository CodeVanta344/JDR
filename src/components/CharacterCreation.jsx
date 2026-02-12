import React, { useState, useEffect } from 'react';
import { CLASSES, CLASS_CATEGORIES, ENRICHED_BACKSTORIES, getBackstoriesForClass, formatBackstoryForGM } from '../lore';
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
    MIGHT: { icon: '⚔️', name: 'Sang et Acier', desc: 'Héros de la force brute et de la résilience. Ils dominent le champ de bataille par la puissance physique.' },
    MAGIC: { icon: '🔥', name: 'Arcanes et Mystères', desc: 'Maîtres des énergies cosmiques et divines. Ils plient la réalité à leur volonté.' },
    SKILL: { icon: '🗡️', name: 'Ombre et Ruse', desc: 'Spécialistes de l\'agilité et de la précision. Ils frappent là où ça fait mal, souvent sans être vus.' }
};

export function CharacterCreation({ onCreate, onBack, onQuickStart, generateImage, sessionId }) {
    const [step, setStep] = useState(1); 
    const [selectedCategory, setSelectedCategory] = useState('MIGHT');
    const [name, setName] = useState('');
    const [selectedClass, setSelectedClass] = useState('Guerrier');
    const [selectedSubclass, setSelectedSubclass] = useState(null);
    const [selectedBackstory, setSelectedBackstory] = useState(null);
    const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(0);
    const [selectedAbilityNames, setSelectedAbilityNames] = useState([]);
    const [attributes, setAttributes] = useState({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 });
    const [rollingStat, setRollingStat] = useState(null);
    const [portraitUrl, setPortraitUrl] = useState(null);
    const [generating, setGenerating] = useState(false);
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
                setSelectedBackstory(availableBackstories[0].id);
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
        const selectedBackstoryData = ENRICHED_BACKSTORIES.find(b => b.id === selectedBackstory);
        const finalStats = { ...attributes };
        
        if (selectedBackstoryData && selectedBackstoryData.stats) {
            Object.entries(selectedBackstoryData.stats).forEach(([stat, mod]) => {
                finalStats[stat] = (finalStats[stat] || 0) + mod;
            });
        }

        const gmBackstoryContext = selectedBackstoryData ? formatBackstoryForGM(selectedBackstoryData, name) : '';
        const charData = {
            name,
            class: selectedClass,
            subclass: clsData.subclasses[selectedSubclass].label,
            mechanic: clsData.mechanic,
            desc: clsData.desc,
            stats: finalStats,
            gold: Math.floor(100 * (selectedBackstoryData?.social_class?.starting_gold_modifier || 1.0)),
            abilities: chosenAbilities,
            equipment: selectedEquipment,
            hp: (clsData.hitDie || 8) + 10 + (Math.floor((finalStats.con - 10) / 2) * 2),
            maxHp: (clsData.hitDie || 8) + 10 + (Math.floor((finalStats.con - 10) / 2) * 2),
            resource: 100,
            max_resource: 100,
            inventory: [...selectedEquipment],
            portrait_url: portraitUrl || classPortraits[selectedClass],
            backstory: selectedBackstoryData,
            backstory_gm_context: gmBackstoryContext,
            starting_reputation: selectedBackstoryData?.starting_reputation || {},
            visited_npcs: selectedBackstoryData?.known_npcs || [],
            faction_ties: selectedBackstoryData?.faction_ties || [],
            discovered_secrets: selectedBackstoryData?.personal_secrets || [],
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
            <div className="creation-overlay">
                <div className="spellbook-container" style={{ maxWidth: step === 7 ? '1400px' : '900px' }}>
                    {/* Titre */}
                    <div className="spellbook-title">
                        <h2>FORGE DES HÉROS</h2>
                        <div className="spellbook-subtitle">Écrivez votre légende dans le sang et l'or</div>
                        <div className="title-ornament-line"></div>
                    </div>

                    {/* Indicateur d'étapes */}
                    <div className="step-indicator">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                            <div 
                                key={s} 
                                className={`step-dot ${step === s ? 'active' : step > s ? 'completed' : ''}`}
                            />
                        ))}
                    </div>

                    {/* === STEP 1: ARCHÉTYPE === */}
                    {step === 1 && (
                        <div className="spellbook-section" style={{ animationDelay: '0.1s' }}>
                            <div className="section-header">
                                <span className="section-icon">🛡️</span>
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
                                        <div className="card-icon">{meta.icon}</div>
                                        <div className="card-title">{meta.name}</div>
                                        <div className="card-description">{meta.desc}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="spellbook-actions">
                                <button className="btn-spellbook btn-back" onClick={onBack}>
                                    ← Retour
                                </button>
                                <button className="btn-spellbook btn-next" onClick={() => setStep(2)}>
                                    Suivant →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* === STEP 2: CLASSE === */}
                    {step === 2 && (
                        <div className="spellbook-section" style={{ animationDelay: '0.1s' }}>
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
                                        <div className="card-icon">{CLASSES[cls].icon || '🎭'}</div>
                                        <div className="card-title">{cls}</div>
                                        <div className="card-description" style={{ fontSize: '0.85rem', maxHeight: '80px', overflow: 'hidden' }}>
                                            {CLASSES[cls].desc?.substring(0, 120)}...
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
                    {step === 3 && classData.subclasses && (
                        <div className="spellbook-section" style={{ animationDelay: '0.1s' }}>
                            <div className="section-header">
                                <span className="section-icon">🎯</span>
                                <h3>Choisissez votre Spécialisation</h3>
                            </div>

                            <div className="selection-grid">
                                {Object.entries(classData.subclasses).map(([key, sub]) => (
                                    <div
                                        key={key}
                                        className={`selection-card ${selectedSubclass === key ? 'selected' : ''}`}
                                        onClick={() => setSelectedSubclass(key)}
                                    >
                                        <div className="card-icon">{sub.icon || '✨'}</div>
                                        <div className="card-title">{sub.label}</div>
                                        <div className="card-description">{sub.desc?.substring(0, 120)}...</div>
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

                    {/* === STEP 4: NOM === */}
                    {step === 4 && (
                        <div className="spellbook-section" style={{ animationDelay: '0.1s' }}>
                            <div className="section-header">
                                <span className="section-icon">📜</span>
                                <h3>Nommez votre Héros</h3>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Nom du personnage</label>
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
                                    <div style={{ marginTop: '1rem', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#d4af37' }}>
                                        {name}, {classData.subclasses[selectedSubclass].label}
                                    </div>
                                )}
                            </div>

                            <div className="spellbook-actions">
                                <button className="btn-spellbook btn-back" onClick={() => setStep(3)}>
                                    ← Retour
                                </button>
                                <button className="btn-spellbook btn-next" onClick={() => setStep(5)} disabled={!name.trim()}>
                                    Suivant →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* === STEP 5: STATS === */}
                    {step === 5 && (
                        <div className="spellbook-section" style={{ animationDelay: '0.1s' }}>
                            <div className="section-header">
                                <span className="section-icon">🎲</span>
                                <h3>Lancez vos Caractéristiques</h3>
                            </div>

                            <div style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-narrative)', fontStyle: 'italic', color: '#5d4e37' }}>
                                Lancez 4d6 et gardez les 3 meilleurs pour chaque caractéristique
                            </div>

                            <div className="stats-grid">
                                {Object.entries(attributes).map(([key, val]) => {
                                    const label = STAT_LABELS[key];
                                    const icon = STAT_ICONS[key];
                                    const isRollingThis = rollingStat === key;

                                    return (
                                        <div key={key} className={`stat-card ${isRollingThis ? 'rolling' : ''}`}>
                                            <div className="stat-name">{icon} {label}</div>
                                            <div className="stat-value">
                                                {val === 0 ? '?' : val}
                                            </div>
                                            {val > 0 && (
                                                <div className="stat-modifier">{getModifier(val)}</div>
                                            )}
                                            <button
                                                className="stat-button"
                                                onClick={() => rollStat(key)}
                                                disabled={isRolling}
                                            >
                                                {val === 0 ? 'Lancer' : 'Re-lancer'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                <button
                                    className="btn-spellbook btn-next"
                                    onClick={rollAll}
                                    disabled={isRolling || allRolled}
                                    style={{ minWidth: '250px' }}
                                >
                                    🎲 Lancer toutes les stats
                                </button>
                            </div>

                            <div className="spellbook-actions">
                                <button className="btn-spellbook btn-back" onClick={() => setStep(4)}>
                                    ← Retour
                                </button>
                                <button className="btn-spellbook btn-next" onClick={() => setStep(6)} disabled={!allRolled}>
                                    Suivant →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* === STEP 6: BACKSTORY === */}
                    {step === 6 && (
                        <div className="spellbook-section" style={{ animationDelay: '0.1s' }}>
                            <div className="section-header">
                                <span className="section-icon">📖</span>
                                <h3>Choisissez votre Histoire</h3>
                            </div>

                            <div className="selection-grid">
                                {getBackstoriesForClass(selectedClass).map(story => (
                                    <div
                                        key={story.id}
                                        className={`selection-card ${selectedBackstory === story.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedBackstory(story.id)}
                                    >
                                        <div className="card-title">{story.label}</div>
                                        <div className="card-description">
                                            {story.desc?.substring(0, 120) || story.personal_secrets?.[0]?.substring(0, 100) || 'Histoire mystérieuse...'}
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

                    {/* === STEP 7: ÉQUIPEMENT ET CAPACITÉS === */}
                    {step === 7 && (
                        <div className="spellbook-section" style={{ animationDelay: '0.1s' }}>
                            <div className="section-header">
                                <span className="section-icon">⚔️</span>
                                <h3>Équipement et Capacités</h3>
                            </div>

                            {/* Équipement */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#5d4e37', marginBottom: '1rem' }}>
                                    Choisissez votre équipement de départ
                                </h4>
                                <div className="selection-grid">
                                    {classData.starting_equipment_options.map((opt, idx) => (
                                        <div
                                            key={idx}
                                            className={`selection-card ${selectedEquipmentIndex === idx ? 'selected' : ''}`}
                                            onClick={() => setSelectedEquipmentIndex(idx)}
                                        >
                                            <div className="card-title">{opt.label}</div>
                                            <div className="card-description">
                                                {opt.items.join(', ')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Capacités */}
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#5d4e37', marginBottom: '1rem' }}>
                                    Choisissez 2 capacités initiales
                                </h4>
                                <div className="selection-grid">
                                    {classData.initial_ability_options.map(ability => (
                                        <div
                                            key={ability.name}
                                            className={`selection-card ${selectedAbilityNames.includes(ability.name) ? 'selected' : ''}`}
                                            onClick={() => toggleAbility(ability.name)}
                                        >
                                            <div className="card-title">{ability.name}</div>
                                            <div className="card-description" style={{ fontSize: '0.8rem' }}>
                                                {ability.desc?.substring(0, 80)}...
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="spellbook-actions">
                                <button className="btn-spellbook btn-back" onClick={() => setStep(6)}>
                                    ← Retour
                                </button>
                                <button className="btn-spellbook btn-next" onClick={() => setStep(8)} disabled={selectedAbilityNames.length !== 2}>
                                    Suivant →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* === STEP 8: RÉCAPITULATIF ET CRÉATION === */}
                    {step === 8 && (
                        <div className="spellbook-section" style={{ animationDelay: '0.1s' }}>
                            <div className="section-header">
                                <span className="section-icon">✨</span>
                                <h3>Récapitulatif de votre Héros</h3>
                            </div>

                            <div style={{ background: 'rgba(255, 255, 255, 0.3)', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
                                <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '2rem', color: '#2d2a26', textAlign: 'center', marginBottom: '1rem' }}>
                                    {name}
                                </h2>
                                <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#8a6d3b', marginBottom: '2rem' }}>
                                    {selectedClass} - {classData.subclasses[selectedSubclass].label}
                                </div>

                                <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
                                    {Object.entries(attributes).map(([key, val]) => (
                                        <div key={key} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.7rem', color: '#8a6d3b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {STAT_LABELS[key]}
                                            </div>
                                            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2d2a26' }}>
                                                {val}
                                            </div>
                                            <div style={{ fontSize: '0.9rem', color: '#5d4e37' }}>
                                                {getModifier(val)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="spellbook-actions">
                                <button className="btn-spellbook btn-back" onClick={() => setStep(7)}>
                                    ← Retour
                                </button>
                                <button className="btn-spellbook btn-create" onClick={handleCreate}>
                                    ✨ Forger le Héros
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
