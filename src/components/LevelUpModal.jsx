import React, { useState } from 'react';

export const LevelUpModal = ({
    character,
    onSave,
    onClose
}) => {
    const [attributePoints, setAttributePoints] = useState(character.attribute_points || 0);
    const [stats, setStats] = useState({ ...character.stats });
    const [spentPoints, setSpentPoints] = useState(0);

    const attributes = [
        { key: 'for', label: 'FORCE', desc: 'Dégâts physiques, athlétisme' },
        { key: 'dex', label: 'DEXTÉRITÉ', desc: 'Initiative, esquive, tir' },
        { key: 'con', label: 'CONSTITUTION', desc: 'Points de vie, résistance' },
        { key: 'int', label: 'INTELLIGENCE', desc: 'Magie, connaissances' },
        { key: 'sag', label: 'SAGESSE', desc: 'Perception, volonté, survie' },
        { key: 'cha', label: 'CHARISME', desc: 'Persuasion, tromperie' }
    ];

    const handleStatChange = (key, delta) => {
        const currentVal = stats[key] || 10;
        const newVal = currentVal + delta;
        const newSpent = spentPoints + delta;

        // Limit: Can't spend more than available, can't reduce below start
        if (newSpent > character.attribute_points || newVal < (character.stats[key] || 10)) return;

        setStats(prev => ({ ...prev, [key]: newVal }));
        setSpentPoints(newSpent);
        setAttributePoints(character.attribute_points - newSpent);
    };

    const handleConfirm = () => {
        // Only save changes to stats, points are handled by spent
        // Calculate remaining points to save back if any (usually force spend all?)
        // Let's allow saving with remaining points
        onSave({
            stats: stats,
            attribute_points: attributePoints
        });
        onClose();
    };

    return (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.85)', zIndex: 10000 }}>
            <div className="glass-panel" style={{ maxWidth: '500px', width: '90%', padding: '2rem', border: '1px solid var(--gold-primary)' }}>
                <h2 style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-display)', textAlign: 'center', marginBottom: '0.5rem' }}>
                    NIVEAU SUPÉRIEUR !
                </h2>
                <div style={{ textAlign: 'center', color: '#ccc', marginBottom: '1.5rem' }}>
                    Vous avez gagné en puissance. Répartissez vos points d'attributs.
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: '#aaa' }}>POINTS DISPONIBLES :</span>
                    <span style={{ fontSize: '1.5rem', color: 'var(--gold-light)', fontWeight: 'bold' }}>{attributePoints}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    {attributes.map(attr => {
                        const val = stats[attr.key] || 10;
                        const original = character.stats[attr.key] || 10;
                        const increased = val > original;

                        return (
                            <div key={attr.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', border: increased ? '1px solid var(--gold-dim)' : '1px solid transparent' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 'bold', color: increased ? 'var(--gold-primary)' : '#ddd' }}>{attr.label}</span>
                                    <span style={{ fontSize: '0.6rem', color: '#888' }}>{attr.desc}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleStatChange(attr.key, -1)}
                                        disabled={val <= original}
                                        style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #444', background: 'transparent', color: '#fff', cursor: 'pointer', opacity: val <= original ? 0.3 : 1 }}
                                    >-</button>
                                    <span style={{ width: '20px', textAlign: 'center', fontWeight: 'bold', color: increased ? '#4f4' : '#fff' }}>{val}</span>
                                    <button
                                        onClick={() => handleStatChange(attr.key, 1)}
                                        disabled={attributePoints <= 0}
                                        style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #444', background: 'transparent', color: '#fff', cursor: 'pointer', opacity: attributePoints <= 0 ? 0.3 : 1 }}
                                    >+</button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button className="btn-gold" onClick={handleConfirm}>CONFIRMER</button>
                </div>
            </div>
        </div>
    );
};
