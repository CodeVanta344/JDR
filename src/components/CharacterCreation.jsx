import React, { useState, useEffect } from 'react';
import { CLASSES, CLASS_CATEGORIES, ENRICHED_BACKSTORIES, getBackstoriesForClass, formatBackstoryForGM } from '../lore';

// Utility: Roll 4d6 drop lowest
const rollAttribute = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => a - b);
    return rolls.slice(1).reduce((a, b) => a + b, 0);
};

export function CharacterCreation({ onCreate, onBack, generateImage, sessionId }) {
    const [step, setStep] = useState(1); // 1: Category, 2: Class, 3: Subclass, 4: Backstory, 5: Equipment, 6: Abilities, 7: Stats, 8: Final
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

    // Archetype portraits for preview
    const [classPortraits, setClassPortraits] = useState({});
    const [subclassPortraits, setSubclassPortraits] = useState({});
    const [generatingSubclasses, setGeneratingSubclasses] = useState(false);

    // Initial load of local portraits and defaults
    useEffect(() => {
        const defaults = {};
        Object.entries(CLASSES).forEach(([key, data]) => {
            if (data.portrait) defaults[key] = data.portrait;
        });
        setClassPortraits(defaults);
    }, []);

    // Sync defaults when class changes
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
            known_npcs: selectedBackstoryData?.known_npcs || [],
            faction_ties: selectedBackstoryData?.faction_ties || [],
            personal_secrets: selectedBackstoryData?.personal_secrets || []
        };
        onCreate(charData);
    };

    const regeneratePortrait = async () => {
        setGenerating(true);
        const prompt = `Detailed character portrait of ${name}, a ${selectedClass} ${CLASSES[selectedClass].subclasses[selectedSubclass].label}, D&D high fantasy, cinematic masterpiece, high resolution`;
        const url = await generateImage(prompt);
        setPortraitUrl(url);
        setGenerating(false);
    };

    const toggleAbility = (name) => {
        setSelectedAbilityNames(prev => {
            if (prev.includes(name)) return prev.filter(n => n !== name);
            if (prev.length >= 2) return prev;
            return [...prev, name];
        });
    };

    // --- VISUAL HELPERS ---
    const STAT_ICONS = {
        str: '⚔️', dex: '🏹', con: '🛡️',
        int: '📜', wis: '👁️', cha: '👑'
    };

    const getStatPriority = (clsName, stat) => {
        const stats = CLASSES[clsName].stats;
        const val = stats[stat.toLowerCase()];
        if (val >= 18) return { label: 'PRIMORDIAL', color: 'var(--gold-primary)' };
        if (val >= 16) return { label: 'MAJEUR', color: 'var(--gold-light)' };
        if (val >= 14) return { label: 'IMPORTANT', color: 'white' };
        if (val >= 12) return { label: 'ÉQUILIBRÉ', color: 'var(--text-secondary)' };
        return { label: 'MINEUR', color: 'var(--text-muted)' };
    };

    const formatLoreText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            if (!line.trim()) return <br key={i} />;

            // Highlight terms with specific styles
            let formattedLine = line
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gold">$1</strong>')
                .replace(/•/g, '<span class="text-gold">◈</span>')
                .replace(/(Adrénaline|Mana|Énergie|Surcharge|Points de vie|PV|MP|Respiration)/g, '<span style="color:var(--gold-light); font-weight:bold;">$1</span>')
                .replace(/(Physique|Magique|Élémentaire|Radieux|Psychique|Sacré|Posturale|Précision|Traque|Ombre|Lumière|Soutien|Psychique)/g, '<span style="color:var(--aether-blue); text-transform:uppercase; font-size:0.7rem; letter-spacing:1px; font-weight:800;">$1</span>')
                .replace(/(Soin|Guérison|Restauration|Vie|Bénédiction)/g, '<span style="color:#4dff88; font-weight:bold;">$1</span>')
                .replace(/(Dégâts|Homicide|Châtiment|Sang|Mort|Brutalité|Injustice)/g, '<span style="color:var(--crimson-blood); font-weight:bold;">$1</span>');

            return <div key={i} className="formatted-line" style={{ marginBottom: '0.4rem' }} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        });
    };

    return (
        <div className="creation-overlay">
            <div className="creation-bg" style={{
                backgroundImage: `url(${classPortraits[selectedClass] || 'https://w0.peakpx.com/wallpaper/243/662/HD-wallpaper-dark-fantasy-castle-dark-fantasy-landscape-mystical.jpg'})`,
                filter: 'blur(4px) brightness(0.4)'
            }} />

            <div className="creation-content animate-fade-in stone-panel" style={{ background: 'rgba(0,0,0,0.6)', border: '2px solid var(--gold-dim)' }}>
                <header className="creation-header stone-panel" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '4px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
                        <button onClick={onBack} className="btn-medieval">← QUITTER</button>
                        <div style={{ flex: 1 }}>
                            <h1 className="text-gold" style={{ fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', margin: 0, lineHeight: 1 }}>FORGE DES HÉROS</h1>
                            <p style={{ color: 'var(--gold-light)', letterSpacing: '4px', fontSize: 'clamp(0.5rem, 1.2vw, 0.7rem)', margin: 0, textTransform: 'uppercase', opacity: 0.8 }}>ÉCRIVEZ VOTRE LÉGENDE DANS LE SANG ET L'OR</p>
                        </div>
                    </div>

                    <div className="invite-section-compact stone-panel" style={{ border: '1px solid var(--gold-dim)', padding: '0.5rem 1rem' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--gold-light)' }}>
                            <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>CHRONIQUE:</span> {sessionId?.slice(0, 8)}
                        </div>
                        <button
                            onClick={() => {
                                const url = window.location.origin + window.location.pathname + '?s=' + sessionId;
                                navigator.clipboard.writeText(url);
                            }}
                            className="btn-gold-small"
                        >
                            INVITER
                        </button>
                    </div>

                    <div className="step-dots">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <div key={n} className={`step-dot ${step >= n ? 'active' : ''}`} />
                        ))}
                    </div>
                </header>

                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>
                    {/* STEP 1: CATEGORY */}
                    {step === 1 && (
                        <div className="creation-step central-step">
                            <h2 className="step-title text-gold" style={{ textAlign: 'center', fontSize: '2rem' }}>CHOISISSEZ VOTRE ARCHÉTYPE</h2>
                            <div className="category-grid">
                                {Object.entries(CLASS_CATEGORIES).map(([key, cat]) => (
                                    <div
                                        key={key}
                                        className={`category-card stone-panel ${selectedCategory === key ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(key)}
                                        style={{ borderTop: `4px solid ${cat.color}` }}
                                    >
                                        <div className="cat-icon" style={{ fontSize: '3.5rem' }}>{cat.icon}</div>
                                        <h3 className="text-gold">{cat.label}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{cat.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="btn-medieval next-btn" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }} onClick={() => setStep(2)}>SUIVANT</button>
                        </div>
                    )}

                    {/* STEP 2: CLASS */}
                    {step === 2 && (
                        <div className="creation-step">
                            <section className="selection-list stone-panel" style={{ background: 'rgba(15, 15, 20, 0.95)', border: '2px solid var(--gold-dim)', padding: '2rem', overflowY: 'auto' }}>
                                <h2 style={{ color: 'var(--gold-primary)', fontSize: '1.4rem', letterSpacing: '2px', fontFamily: 'var(--font-display)', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>VOTRE CLASSE ({CLASS_CATEGORIES[selectedCategory].label})</h2>
                                <div className="class-grid">
                                    {CLASS_CATEGORIES[selectedCategory].classes.map(clsName => (
                                        <div
                                            key={clsName}
                                            className={`class-card-compact stone-panel ${selectedClass === clsName ? 'active' : ''}`}
                                            onClick={() => setSelectedClass(clsName)}
                                            style={{ background: selectedClass === clsName ? 'var(--gold-dim)' : 'rgba(0,0,0,0.6)' }}
                                        >
                                            <h3 style={{ color: selectedClass === clsName ? 'white' : 'var(--gold-primary)' }}>{clsName}</h3>
                                            <p style={{ color: selectedClass === clsName ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', fontSize: '0.85rem' }}>{CLASSES[clsName].desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section className="preview-panel stone-panel ornate-border">
                                <div className="preview-portrait" style={{ border: '4px solid var(--gold-dim)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <img src={classPortraits[selectedClass]} alt={selectedClass} style={{ width: '100%', display: 'block' }} />
                                </div>
                                <div className="preview-details">
                                    <h2 className="text-gold" style={{ fontSize: '2rem' }}>{selectedClass}</h2>
                                    <div className="mechanic-box stone-panel" style={{ padding: '1.2rem', border: '1px solid var(--gold-dim)', background: 'rgba(0,0,0,0.8)', boxShadow: 'inset 0 0 20px rgba(0,0,0,1)' }}>
                                        <strong style={{ color: 'var(--gold-primary)', display: 'block', marginBottom: '0.5rem', borderBottom: '1px solid var(--gold-dim)', paddingBottom: '0.3rem', fontSize: '1.1rem' }}>
                                            ◈ {CLASSES[selectedClass].mechanic.name.toUpperCase()} ◈
                                        </strong>
                                        <div className="mechanic-desc" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                                            {formatLoreText(CLASSES[selectedClass].mechanic.desc)}
                                        </div>
                                    </div>
                                    <div className="stats-preview" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                                        {Object.entries(CLASSES[selectedClass].stats).map(([s, v]) => {
                                            const priority = getStatPriority(selectedClass, s);
                                            return (
                                                <div key={s} className="stat-pill-fancy" style={{
                                                    background: 'rgba(0,0,0,0.6)',
                                                    border: `1px solid ${priority.color === 'white' ? 'var(--gold-dim)' : priority.color}`,
                                                    borderRadius: '4px',
                                                    padding: '0.5rem',
                                                    textAlign: 'center',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.2rem',
                                                    opacity: priority.label === 'MINEUR' ? 0.6 : 1
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                                                        <span style={{ fontSize: '0.8rem' }}>{STAT_ICONS[s]}</span>
                                                        <span style={{ fontSize: '0.65rem', color: 'var(--gold-light)', fontWeight: 'bold' }}>{s.toUpperCase()}</span>
                                                    </div>
                                                    <strong style={{
                                                        display: 'block',
                                                        color: priority.color,
                                                        fontSize: '0.7rem',
                                                        fontFamily: 'var(--font-display)',
                                                        letterSpacing: '1px'
                                                    }}>
                                                        {priority.label}
                                                    </strong>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="step-nav" style={{ marginTop: 'auto' }}>
                                    <button onClick={() => setStep(1)} className="btn-medieval">RETOUR</button>
                                    <button onClick={() => setStep(3)} className="btn-gold">CONFIRMER</button>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* STEP 3: SUBCLASS */}
                    {step === 3 && (
                        <div className="creation-step central-step">
                            <h2 className="step-title text-gold" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>SPÉCIALISATION MARQUÉE</h2>
                            <div className="subclass-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '2rem',
                                width: '100%',
                                maxWidth: '1200px',
                                margin: '0 auto'
                            }}>
                                {Object.entries(CLASSES[selectedClass].subclasses).map(([key, data]) => (
                                    <div
                                        key={key}
                                        className={`subclass-card stone-panel ${selectedSubclass === key ? 'active' : ''}`}
                                        onClick={() => setSelectedSubclass(key)}
                                        style={{
                                            padding: '1.5rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem',
                                            border: selectedSubclass === key ? '2px solid var(--gold-primary)' : '1px solid var(--gold-dim)',
                                            boxShadow: selectedSubclass === key ? '0 0 30px rgba(212, 175, 55, 0.2)' : 'none',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                        }}
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            <h3 className="text-gold" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{data.label}</h3>
                                            <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>"{data.desc}"</p>
                                        </div>

                                        <div className="feature-highlight" style={{
                                            padding: '1.2rem 1.5rem',
                                            color: '#eee',
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            background: 'rgba(0, 0, 0, 0.35)',
                                            border: '1px solid rgba(212, 175, 55, 0.2)',
                                            borderLeft: '3px solid var(--gold-primary)',
                                            borderRadius: '6px'
                                        }}>
                                            <small style={{
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                color: 'var(--gold-primary)',
                                                letterSpacing: '3px',
                                                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                                                display: 'block',
                                                marginBottom: '0.8rem',
                                                paddingBottom: '0.5rem',
                                                fontSize: '0.75rem',
                                                fontFamily: 'var(--font-display)'
                                            }}>
                                                POUVOIR DE SPÉCIALISATION
                                            </small>
                                            <div className="feature-desc" style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: '1.6' }}>
                                                {formatLoreText(data.details.feature)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="step-nav" style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                                <button onClick={() => setStep(2)} className="btn-medieval" style={{ width: '200px' }}>RETOUR</button>
                                <button onClick={() => setStep(4)} className="btn-gold" style={{ padding: '0.8rem 4rem' }}>CONFIRMER</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: BACKSTORY */}
                    {step === 4 && (
                        <div className="creation-step" style={{ display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
                            <section className="backstory-list stone-panel" style={{ flex: '0 0 45%', background: 'rgba(15, 15, 20, 0.95)', border: '2px solid var(--gold-dim)', padding: '1.5rem', overflowY: 'auto', maxHeight: '70vh' }}>
                                <h2 style={{ color: 'var(--gold-primary)', fontSize: '1.4rem', letterSpacing: '2px', fontFamily: 'var(--font-display)', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>VOTRE ORIGINE</h2>
                                <div className="backstory-options" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {getBackstoriesForClass(selectedClass).map(opt => (
                                        <div
                                            key={opt.id}
                                            className={`backstory-card stone-panel ${selectedBackstory === opt.id ? 'active' : ''}`}
                                            onClick={() => setSelectedBackstory(opt.id)}
                                            style={{
                                                padding: '1.2rem',
                                                border: selectedBackstory === opt.id ? '2px solid var(--gold-primary)' : '1px solid rgba(212, 175, 55, 0.2)',
                                                background: selectedBackstory === opt.id ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(0, 0, 0, 0.7) 100%)' : 'rgba(0, 0, 0, 0.6)',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <h3 style={{ color: 'var(--gold-primary)', fontSize: '1rem', margin: 0 }}>{opt.label}</h3>
                                                <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(212,175,55,0.2)', borderRadius: '10px', color: 'var(--gold-light)' }}>{opt.category}</span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: '#aaa', margin: 0, lineHeight: '1.4' }}>{opt.origin.region} - {opt.origin.settlement}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="backstory-details stone-panel" style={{ flex: 1, background: 'rgba(10, 10, 15, 0.95)', border: '2px solid var(--gold-dim)', padding: '1.5rem', overflowY: 'auto', maxHeight: '70vh' }}>
                                {(() => {
                                    const bs = ENRICHED_BACKSTORIES.find(b => b.id === selectedBackstory);
                                    if (!bs) return <p>Sélectionnez une origine</p>;
                                    return (
                                        <>
                                            <h2 className="text-gold" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{bs.label}</h2>
                                            <p style={{ fontStyle: 'italic', color: '#bbb', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', borderBottom: '1px solid var(--gold-dim)', paddingBottom: '1rem' }}>{bs.desc}</p>

                                            <div className="backstory-section" style={{ marginBottom: '1.5rem' }}>
                                                <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>ORIGINE GÉOGRAPHIQUE</h4>
                                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--gold-dim)' }}>
                                                    <p style={{ margin: 0, color: '#ddd' }}><strong style={{ color: 'var(--gold-light)' }}>{bs.origin.region}</strong> - {bs.origin.settlement}</p>
                                                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#999' }}>Connaissances: {bs.origin.regional_knowledge.join(', ')}</p>
                                                </div>
                                            </div>

                                            <div className="backstory-section" style={{ marginBottom: '1.5rem' }}>
                                                <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>CLASSE SOCIALE</h4>
                                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--gold-dim)' }}>
                                                    <p style={{ margin: 0, color: '#ddd' }}><strong style={{ color: 'var(--gold-light)' }}>{bs.social_class.label}</strong> ({bs.social_class.wealth})</p>
                                                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                                        <span style={{ color: '#4dff88' }}>+ {bs.social_class.social_perks.join(', ')}</span>
                                                    </div>
                                                    <div style={{ marginTop: '0.3rem', fontSize: '0.85rem' }}>
                                                        <span style={{ color: '#ff6b6b' }}>- {bs.social_class.social_penalties.join(', ')}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {bs.historical_events.length > 0 && (
                                                <div className="backstory-section" style={{ marginBottom: '1.5rem' }}>
                                                    <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>ÉVÉNEMENTS HISTORIQUES VÉCUS</h4>
                                                    {bs.historical_events.map((ev, i) => (
                                                        <div key={i} style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--gold-dim)', marginBottom: '0.5rem' }}>
                                                            <p style={{ margin: 0, color: 'var(--gold-light)', fontWeight: 'bold' }}>{ev.name} <span style={{ color: '#888', fontWeight: 'normal' }}>({ev.year})</span></p>
                                                            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#bbb' }}>{ev.desc}</p>
                                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#4da6ff' }}>Conséquences: {ev.consequences.join(', ')}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {bs.faction_ties.length > 0 && (
                                                <div className="backstory-section" style={{ marginBottom: '1.5rem' }}>
                                                    <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>AFFILIATIONS</h4>
                                                    {bs.faction_ties.map((f, i) => (
                                                        <div key={i} style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--gold-dim)', marginBottom: '0.5rem' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <strong style={{ color: 'var(--gold-light)' }}>{f.name}</strong>
                                                                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: f.standing === 'enemy' ? 'rgba(255,100,100,0.3)' : f.standing === 'ally' ? 'rgba(100,255,100,0.3)' : 'rgba(150,150,150,0.3)', color: f.standing === 'enemy' ? '#ff6b6b' : f.standing === 'ally' ? '#4dff88' : '#aaa' }}>{f.standing} | Rep: {f.reputation}</span>
                                                            </div>
                                                            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: '#999' }}>Rôle: {f.role}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="backstory-section" style={{ marginBottom: '1.5rem' }}>
                                                <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>PNJ CONNUS</h4>
                                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--gold-dim)' }}>
                                                    <p style={{ margin: 0, color: '#ddd', fontSize: '0.9rem' }}>{bs.known_npcs.join(' | ')}</p>
                                                </div>
                                            </div>

                                            <div className="backstory-section" style={{ marginBottom: '1.5rem' }}>
                                                <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>MODIFICATEURS DE STATS</h4>
                                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                    {bs.stats && Object.entries(bs.stats).map(([stat, mod]) => (
                                                        <div key={stat} style={{
                                                            background: mod > 0 ? 'linear-gradient(to right, rgba(77, 255, 136, 0.2), rgba(77, 255, 136, 0.05))' : 'linear-gradient(to right, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.05))',
                                                            color: mod > 0 ? '#4dff88' : '#ff6b6b',
                                                            padding: '5px 12px',
                                                            borderRadius: '20px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: '800',
                                                            border: `1px solid ${mod > 0 ? 'rgba(77,255,136,0.3)' : 'rgba(255,107,107,0.3)'}`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '6px'
                                                        }}>
                                                            <span style={{ fontSize: '1rem' }}>{STAT_ICONS[stat]}</span>
                                                            <span>{stat.toUpperCase()}</span>
                                                            <span>{mod > 0 ? `+${mod}` : mod}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="backstory-section" style={{ marginBottom: '1rem' }}>
                                                <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>HOOKS DE ROLEPLAY</h4>
                                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--gold-dim)' }}>
                                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#bbb', fontSize: '0.9rem' }}>
                                                        {bs.roleplay_hooks.map((h, i) => <li key={i} style={{ marginBottom: '0.3rem' }}>{h}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </section>

                            <div className="step-nav" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setStep(3)} className="btn-medieval" style={{ width: '200px' }}>RETOUR</button>
                                <button onClick={() => setStep(5)} className="btn-gold" style={{ padding: '0.8rem 4rem' }}>CONFIRMER</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: EQUIPMENT */}
                    {step === 5 && (
                        <div className="creation-step central-step">
                            <h2 className="step-title text-gold" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem' }}>ARSENAL DE DÉPART</h2>
                            <p style={{ color: 'var(--gold-light)', textAlign: 'center', marginBottom: '2rem', opacity: 0.8, letterSpacing: '1px' }}>Choisissez l'équipement qui forgera votre destin</p>

                            <div className="equipment-grid" style={{
                                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                                gap: '2.5rem', width: '100%', maxWidth: '1100px', margin: '0 auto'
                            }}>
                                {CLASSES[selectedClass].starting_equipment_options.map((opt, idx) => (
                                    <div
                                        key={idx}
                                        className={`equipment-card stone-panel ornate-border ${selectedEquipmentIndex === idx ? 'active' : ''}`}
                                        onClick={() => setSelectedEquipmentIndex(idx)}
                                        style={{
                                            padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                                            border: selectedEquipmentIndex === idx ? '2px solid var(--gold-primary)' : '1px solid var(--gold-dim)',
                                            background: 'rgba(20, 20, 25, 0.8)', cursor: 'pointer',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            transform: selectedEquipmentIndex === idx ? 'scale(1.02)' : 'scale(1)',
                                            boxShadow: selectedEquipmentIndex === idx ? '0 0 30px rgba(212, 175, 55, 0.2)' : '0 10px 20px rgba(0,0,0,0.4)'
                                        }}
                                    >
                                        <div style={{
                                            background: selectedEquipmentIndex === idx ? 'var(--gold-dim)' : 'rgba(0,0,0,0.4)',
                                            padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--gold-dim)',
                                            transition: 'background 0.3s ease'
                                        }}>
                                            <h3 className="text-gold" style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '2px' }}>{opt.label.toUpperCase()}</h3>
                                        </div>

                                        <div className="items-container" style={{ padding: '1.5rem', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            {opt.items.map((item, i) => {
                                                const isWeapon = item.category?.toLowerCase().includes('martial') || item.category?.toLowerCase().includes('simple');
                                                const isArmor = item.category?.toLowerCase().includes('heavy') || item.category?.toLowerCase().includes('medium') || item.category?.toLowerCase().includes('light') || item.category?.toLowerCase().includes('shield');
                                                const icon = isWeapon ? '⚔️' : isArmor ? '🛡️' : '📦';

                                                const hasIcon = !!item.img;

                                                return (
                                                    <div key={i} className="item-slot stone-panel" style={{
                                                        padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(212, 175, 55, 0.1)',
                                                        borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.8rem'
                                                    }}>
                                                        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            {hasIcon ? (
                                                                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))' }} />
                                                            ) : (
                                                                <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 5px var(--gold-dim))' }}>{icon}</span>
                                                            )}
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <strong style={{ fontSize: '0.85rem', color: 'white' }}>{item.name}</strong>
                                                            <small style={{ fontSize: '0.65rem', color: 'var(--gold-light)', opacity: 0.7, textTransform: 'uppercase' }}>{item.category}</small>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {selectedEquipmentIndex === idx && (
                                            <div style={{
                                                height: '4px', background: 'var(--gold-primary)',
                                                boxShadow: '0 0 10px var(--gold-primary)'
                                            }} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="step-nav" style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                                <button onClick={() => setStep(4)} className="btn-medieval" style={{ width: '200px' }}>RETOUR</button>
                                <button onClick={() => setStep(6)} className="btn-gold" style={{ padding: '0.8rem 4rem' }}>CONFIRMER L'ARSENAL</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 6: ABILITIES */}
                    {step === 6 && (
                        <div className="creation-step central-step">
                            <h2 className="step-title text-gold" style={{ textAlign: 'center', fontSize: '2.5rem' }}>APTITUDES INITIALES</h2>
                            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '-1.5rem', marginBottom: '2rem' }}>Choisissez vos deux premières compétences</p>
                            <div className="abilities-selection-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '1.5rem',
                                width: '100%',
                                maxWidth: '1200px',
                                margin: '0 auto'
                            }}>
                                {CLASSES[selectedClass].initial_ability_options.map(abi => (
                                    <div
                                        key={abi.name}
                                        className={`ability-select-card stone-panel ${selectedAbilityNames.includes(abi.name) ? 'active' : ''} ${!selectedAbilityNames.includes(abi.name) && selectedAbilityNames.length >= 2 ? 'disabled' : ''}`}
                                        onClick={() => toggleAbility(abi.name)}
                                        style={{
                                            padding: '1.5rem',
                                            border: selectedAbilityNames.includes(abi.name) ? '2px solid var(--gold-primary)' : '1px solid var(--gold-dim)',
                                            background: 'rgba(0,0,0,0.5)',
                                            cursor: 'pointer',
                                            opacity: !selectedAbilityNames.includes(abi.name) && selectedAbilityNames.length >= 2 ? 0.5 : 1
                                        }}
                                    >
                                        <div className="abi-header" style={{ marginBottom: '1rem' }}>
                                            <div className="abi-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <h3 className="text-gold" style={{ margin: 0 }}>{abi.name}</h3>
                                                <span className={`abi-type-tag ${abi.type?.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>{abi.type}</span>
                                            </div>
                                            <div className="abi-cost-row" style={{ fontSize: '0.8rem', color: 'var(--gold-light)' }}>
                                                <span className="abi-action-type">{abi.actionType}</span> | <span className="abi-cost">{abi.cost} {CLASSES[selectedClass].resourceStat === 'con' ? 'Adrénaline' : 'MP'}</span>
                                            </div>
                                        </div>
                                        <div className="abi-flavor" style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>"{abi.flavor}"</div>
                                        <div className="abi-desc" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{formatLoreText(abi.desc)}</div>
                                        <div className="abi-meta" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', borderTop: '1px solid var(--gold-dim)', paddingTop: '1rem' }}>
                                            <div className="meta-item">
                                                <small style={{ display: 'block', opacity: 0.6 }}>Dégâts</small>
                                                <strong>{abi.dice || 'N/A'}</strong>
                                            </div>
                                            <div className="meta-item">
                                                <small style={{ display: 'block', opacity: 0.6 }}>Portée</small>
                                                <strong>{abi.range ? `${abi.range} cases` : 'Contact'}</strong>
                                            </div>
                                            <div className="meta-item">
                                                <small style={{ display: 'block', opacity: 0.6 }}>Recharge</small>
                                                <strong>{abi.cooldown || '0'}T</strong>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="step-nav" style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button onClick={() => setStep(5)} className="btn-medieval" style={{ width: '200px' }}>RETOUR</button>
                                <button
                                    onClick={() => setStep(7)}
                                    className="btn-gold"
                                    style={{ padding: '0.8rem 4rem' }}
                                    disabled={selectedAbilityNames.length !== 2}
                                >
                                    CONFIRMER ({selectedAbilityNames.length}/2)
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 7: STATS */}
                    {step === 7 && (
                        <div className="creation-step central-step">
                            <h2 className="step-title text-gold" style={{ textAlign: 'center', fontSize: '2.5rem' }}>DÉS DU DESTIN</h2>
                            <div className="stats-rolling-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: '1.5rem',
                                width: '100%',
                                maxWidth: '1200px',
                                margin: '0 auto'
                            }}>
                                {Object.entries(attributes).map(([key, val]) => {
                                    const backstoryBonus = ENRICHED_BACKSTORIES.find(b => b.id === selectedBackstory)?.stats?.[key] || 0;
                                    return (
                                        <div key={key} className="stat-roll-card stone-panel ornate-border" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
                                            <label className="text-gold" style={{ fontSize: '0.8rem', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>
                                                {STAT_ICONS[key]} {key.toUpperCase()}
                                            </label>
                                            <div className="stat-value" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', margin: '1rem 0' }}>
                                                {val === 0 ? '?' : (
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                                        <span>{val + backstoryBonus}</span>
                                                        {backstoryBonus !== 0 && (
                                                            <small className="base-val" style={{ fontSize: '0.9rem', opacity: 0.5, color: backstoryBonus > 0 ? '#4dff88' : '#ff4d4d' }}>
                                                                ({val}{backstoryBonus > 0 ? '+' : ''}{backstoryBonus})
                                                            </small>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => rollStat(key)}
                                                disabled={isRolling}
                                                className="btn-medieval"
                                                style={{ width: '100%', marginTop: 'auto' }}
                                            >
                                                LANCER
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="stats-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                <button onClick={rollAll} className="btn-medieval" disabled={allRolled || isRolling} style={{ borderStyle: 'double', borderWidth: '3px', padding: '1rem 3rem' }}>TOUT LANCER</button>
                            </div>
                            <div className="step-nav" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button onClick={() => setStep(6)} className="btn-medieval" style={{ width: '200px' }}>RETOUR</button>
                                <button onClick={() => setStep(8)} className="btn-gold" style={{ padding: '0.8rem 4rem' }} disabled={!allRolled}>FINALISATION</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 8: FINAL */}
                    {step === 8 && (() => {
                        const clsData = CLASSES[selectedClass];
                        const selectedBackstoryData = ENRICHED_BACKSTORIES.find(b => b.id === selectedBackstory);
                        const finalStats = { ...attributes };
                        if (selectedBackstoryData.stats) {
                            Object.entries(selectedBackstoryData.stats).forEach(([stat, mod]) => {
                                finalStats[stat] = (finalStats[stat] || 0) + mod;
                            });
                        }
                        const finalHp = (clsData.hitDie || 8) + 10 + (Math.floor((finalStats.con - 10) / 2) * 2);

                        const STAT_FULL_NAMES = {
                            str: 'Force', dex: 'Dextérité', con: 'Constitution',
                            int: 'Intelligence', wis: 'Sagesse', cha: 'Charisme'
                        };

                        return (
                            <div className="creation-step" style={{
                                display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem',
                                height: '100%', maxHeight: '80vh', overflow: 'hidden'
                            }}>
                                <section className="selection-list stone-panel" style={{
                                    padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem',
                                    overflowY: 'auto', height: '100%', color: '#eee',
                                    background: 'rgba(15, 15, 20, 0.95)', border: '2px solid var(--gold-dim)',
                                    scrollbarWidth: 'thin'
                                }}>
                                    <header style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                                        <h2 style={{ color: 'var(--gold-primary)', margin: 0, fontSize: '2rem', fontFamily: 'var(--font-display)', letterSpacing: '3px' }}>VOTRE LÉGENDE</h2>
                                        <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)', margin: '0.8rem auto 0' }} />
                                    </header>

                                    {/* IDENTITY SECTION */}
                                    <div style={{
                                        padding: '1.2rem 1.5rem', background: 'rgba(212, 175, 55, 0.04)',
                                        border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '8px'
                                    }}>
                                        <label style={{ fontSize: '0.75rem', letterSpacing: '3px', color: 'var(--gold-primary)', fontWeight: '800', display: 'block', marginBottom: '0.6rem', fontFamily: 'var(--font-display)' }}>IDENTITÉ</label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="NOM DU HÉROS..."
                                            style={{
                                                background: 'rgba(0,0,0,0.3)', color: '#fff', border: 'none',
                                                borderBottom: '2px solid var(--gold-dim)', padding: '0.6rem 0.8rem',
                                                width: '100%', fontSize: '1.5rem', fontFamily: 'var(--font-display)',
                                                borderRadius: '4px 4px 0 0', outline: 'none'
                                            }}
                                            autoFocus
                                        />
                                        <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{ fontSize: '1.05rem', color: '#fff', fontWeight: '600' }}>
                                                {selectedClass} <span style={{ color: 'var(--gold-light)', fontWeight: '400' }}>({clsData.subclasses[selectedSubclass].label})</span>
                                            </span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                                ◈ {selectedBackstoryData.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ATTRIBUTES GRID */}
                                    <div style={{
                                        padding: '1.2rem 1.5rem', background: 'rgba(0, 0, 0, 0.25)',
                                        border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px'
                                    }}>
                                        <label style={{ fontSize: '0.75rem', letterSpacing: '3px', color: 'var(--gold-primary)', fontWeight: '800', display: 'block', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>ATTRIBUTS</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                            {Object.entries(finalStats).map(([key, val]) => {
                                                const mod = Math.floor((val - 10) / 2);
                                                const modColor = mod >= 0 ? '#4dff88' : '#ff6b6b';
                                                return (
                                                    <div key={key} style={{
                                                        textAlign: 'center', padding: '0.8rem 0.4rem',
                                                        background: 'rgba(255,255,255,0.03)', borderRadius: '6px',
                                                        border: '1px solid rgba(255,255,255,0.06)',
                                                        transition: 'border-color 0.2s'
                                                    }}
                                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
                                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                                                    >
                                                        <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{STAT_ICONS[key]}</div>
                                                        <div style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '900', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{val}</div>
                                                        <div style={{ fontSize: '0.7rem', color: modColor, fontWeight: '700', margin: '0.2rem 0' }}>{mod >= 0 ? `+${mod}` : mod}</div>
                                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>{STAT_FULL_NAMES[key] || key}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* HP & RESOURCE ROW */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div style={{
                                            padding: '1rem', background: 'rgba(77, 255, 136, 0.06)', textAlign: 'center',
                                            border: '1px solid rgba(77, 255, 136, 0.25)', borderRadius: '8px'
                                        }}>
                                            <div style={{ fontSize: '0.75rem', color: '#4dff88', letterSpacing: '2px', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '0.3rem' }}>POINTS DE VIE</div>
                                            <div style={{ fontSize: '2.2rem', color: '#fff', fontWeight: '900', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{finalHp}</div>
                                        </div>
                                        <div style={{
                                            padding: '1rem', background: 'rgba(77, 166, 255, 0.06)', textAlign: 'center',
                                            border: '1px solid rgba(77, 166, 255, 0.25)', borderRadius: '8px'
                                        }}>
                                            <div style={{ fontSize: '0.75rem', color: '#4da6ff', letterSpacing: '2px', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '0.3rem' }}>{clsData.resourceStat === 'con' ? 'ADRÉNALINE' : 'MANA'}</div>
                                            <div style={{ fontSize: '2.2rem', color: '#fff', fontWeight: '900', fontFamily: 'var(--font-display)', lineHeight: 1 }}>100</div>
                                        </div>
                                    </div>

                                    {/* ABILITIES SECTION */}
                                    <div style={{
                                        padding: '1.2rem 1.5rem', background: 'rgba(0, 0, 0, 0.25)',
                                        border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px'
                                    }}>
                                        <label style={{ fontSize: '0.75rem', letterSpacing: '3px', color: 'var(--gold-primary)', fontWeight: '800', display: 'block', marginBottom: '0.8rem', fontFamily: 'var(--font-display)' }}>APTITUDES</label>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            {selectedAbilityNames.map(n => {
                                                const abi = clsData.initial_ability_options.find(a => a.name === n);
                                                return (
                                                    <div key={n} style={{
                                                        padding: '0.8rem 1rem', background: 'rgba(212, 175, 55, 0.06)',
                                                        border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '6px',
                                                        borderLeft: '3px solid var(--gold-primary)'
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <strong style={{ fontSize: '0.95rem', color: 'var(--gold-light)', letterSpacing: '0.5px' }}>{n}</strong>
                                                            <span style={{
                                                                fontSize: '0.75rem', color: '#fff', background: 'rgba(0,0,0,0.4)',
                                                                padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.3)',
                                                                fontWeight: '700'
                                                            }}>{abi.cost} {clsData.resourceStat === 'con' ? 'ADR' : 'MP'}</span>
                                                        </div>
                                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                                            <span style={{ color: '#48dbfb' }}>⚡ {abi.actionType}</span>
                                                            <span>🎲 {abi.dice || 'N/A'}</span>
                                                            <span style={{ textTransform: 'uppercase', fontSize: '0.7rem', background: 'rgba(72,219,251,0.1)', padding: '1px 6px', borderRadius: '3px', color: '#48dbfb' }}>{abi.type}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* ARSENAL SECTION */}
                                    <div style={{
                                        padding: '1.2rem 1.5rem', background: 'rgba(0, 0, 0, 0.25)',
                                        border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px'
                                    }}>
                                        <label style={{ fontSize: '0.75rem', letterSpacing: '3px', color: 'var(--gold-primary)', fontWeight: '800', display: 'block', marginBottom: '0.8rem', fontFamily: 'var(--font-display)' }}>ARSENAL</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.6rem' }}>
                                            {clsData.starting_equipment_options[selectedEquipmentIndex].items.map((item, i) => (
                                                <div key={i} style={{
                                                    fontSize: '0.85rem', padding: '0.6rem 0.8rem',
                                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.12)',
                                                    borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.6rem',
                                                    color: '#ddd'
                                                }}>
                                                    {item.img ? (
                                                        <img src={item.img} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain', filter: 'drop-shadow(0 0 3px rgba(212,175,55,0.4))' }} />
                                                    ) : (
                                                        <span style={{ fontSize: '1.1rem' }}>⚔️</span>
                                                    )}
                                                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <footer style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '1rem' }}>
                                        <button onClick={() => setStep(7)} className="btn-medieval" style={{ width: '140px', padding: '0.9rem' }}>RETOUR</button>
                                        <button onClick={handleCreate} className="btn-gold" disabled={!name.trim() || generating} style={{ flex: 1, padding: '0.9rem', fontSize: '1.2rem', letterSpacing: '2px' }}>
                                            {generating ? "CONSÉCRATION..." : "COMMENCER L'AVENTURE"}
                                        </button>
                                    </footer>
                                </section>

                                <section className="preview-panel stone-panel ornate-border" style={{ position: 'relative', overflow: 'hidden' }}>
                                    <div className="final-portrait-frame" style={{
                                        border: '4px solid var(--gold-dim)', borderRadius: '4px',
                                        overflow: 'hidden', height: '100%', background: '#000', position: 'relative'
                                    }}>
                                        <img src={portraitUrl || classPortraits[selectedClass]} alt="Final" style={{
                                            width: '100%', height: '100%', objectFit: 'cover',
                                            objectPosition: 'center 20%', opacity: generating ? 0.3 : 1
                                        }} />
                                        <div style={{
                                            position: 'absolute', bottom: 0, left: 0, right: 0,
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.95))',
                                            padding: '1.5rem', textAlign: 'center'
                                        }}>
                                            <button onClick={regeneratePortrait} className="btn-medieval" disabled={generating} style={{ background: 'rgba(0,0,0,0.6)', fontSize: '0.8rem' }}>
                                                {generating ? 'CRÉATION...' : 'RELANCER LE PORTRAIT'}
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        );
                    })()}
                </main>
            </div>
        </div>
    );
}
