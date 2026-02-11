import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export const MerchantModal = ({ merchant, playerGold, playerInventory, onBuy, onSell, onClose, affinity = 0 }) => {
    const [generating, setGenerating] = useState({}); // { itemId: boolean }
    const [itemImages, setItemImages] = useState({}); // { itemId: url }

    // Calculate price modifier: 1 point = 0.5% discount/markup. Max +/- 50%
    const priceMultiplier = Math.max(0.5, Math.min(1.5, 1 - (affinity * 0.005)));
    const sellMultiplier = Math.max(0.1, Math.min(0.8, 0.5 + (affinity * 0.002)));

    if (!merchant) return null;

    const generateItemImage = async (item) => {
        if (!item.visual_prompt || itemImages[item.id] || generating[item.id]) return;

        setGenerating(prev => ({ ...prev, [item.id]: true }));
        try {
            const { data } = await supabase.functions.invoke('game-master', {
                body: { action: 'generate-image', prompt: `Fantasy RPG Item icon, ${item.visual_prompt}, white background, high quality, isometric` }
            });
            if (data?.url) {
                setItemImages(prev => ({ ...prev, [item.id]: data.url }));
            }
        } catch (e) {
            console.error("Image gen failed", e);
        } finally {
            setGenerating(prev => ({ ...prev, [item.id]: false }));
        }
    };

    return (
        <div className="modal-overlay animate-fade-in" style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
        }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '900px',
                height: '85vh',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--gold-dim)',
                boxShadow: '0 0 40px rgba(0,0,0,0.5)',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--gold-primary)', fontSize: '1.5rem' }}>{merchant.npcName}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{merchant.greeting || "Que puis-je pour vous ?"}</p>
                            {affinity !== 0 && (
                                <span style={{ fontSize: '0.8rem', padding: '2px 6px', borderRadius: '4px', background: affinity > 0 ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)', color: affinity > 0 ? '#4ade80' : '#ef4444' }}>
                                    {affinity > 0 ? `Amitié: ${affinity}` : `Méfiance: ${affinity}`}
                                </span>
                            )}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>VOTRE SOLDE</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--gold-primary)' }}>{playerGold} ÉCLATS ✧</span>
                    </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', overflow: 'hidden' }}>
                    {/* Merchant Inventory */}
                    <div style={{ borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', minWidth: 0, background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.05)', fontWeight: 'bold', color: 'var(--gold-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Marchandises
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', alignContent: 'start' }}>
                            {merchant.inventory && merchant.inventory.map((item) => {
                                const realPrice = Math.ceil(item.price * priceMultiplier);
                                return (
                                    <div key={item.id} className="item-card" style={{
                                        padding: '0.8rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Image Area */}
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '120px',
                                                background: '#0a0a0a',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: item.visual_prompt ? 'pointer' : 'default',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                position: 'relative'
                                            }}
                                            onClick={() => generateItemImage(item)}
                                        >
                                            {itemImages[item.id] ? (
                                                <img src={itemImages[item.id]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                generating[item.id] ? (
                                                    <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid var(--gold-dim)', borderTopColor: 'transparent', borderRadius: '50%' }} />
                                                ) : (
                                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0.5rem' }}>
                                                        {item.visual_prompt ? "Cliquez pour voir" : "Pas d'image"}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>{item.name}</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                {realPrice !== item.price && (
                                                    <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '0.7rem' }}>{item.price} ✧</span>
                                                )}
                                                <span style={{ color: realPrice < item.price ? '#4ade80' : (realPrice > item.price ? '#ef4444' : 'var(--gold-primary)'), fontWeight: 'bold', fontSize: '0.9rem' }}>{realPrice} ✧</span>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.2' }}>{item.desc}</p>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'auto' }}>
                                            {item.stats && Object.entries(item.stats).map(([k, v]) => (
                                                <span key={k} style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: 'var(--aether-blue)', textTransform: 'uppercase' }}>
                                                    {k} {v > 0 ? `+${v}` : v}
                                                </span>
                                            ))}
                                        </div>

                                        <button
                                            className="btn-gold"
                                            style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', marginTop: '0.5rem' }}
                                            disabled={playerGold < realPrice}
                                            onClick={() => onBuy({ ...item, price: realPrice })}
                                        >
                                            ACHETER
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Player Inventory (To Sell) */}
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', fontWeight: 'bold', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Votre Sac (Vendre)
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'grid', gap: '0.8rem' }}>
                            {playerInventory.map((item, i) => {
                                const isObj = typeof item === 'object';
                                if (!isObj) return null;
                                const sellPrice = Math.floor((item.price || 50) * 0.5);
                                return (
                                    <div key={i} style={{
                                        padding: '0.8rem',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 'bold', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.name} {item.equipped && "(Équipé)"}</span>
                                            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem', color: '#666' }}>
                                                <span>Val: {item.price || 50}</span>
                                                <span style={{ color: 'var(--aether-blue)' }}>Vente: {sellPrice}</span>
                                            </div>
                                        </div>
                                        <button
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: 'transparent', border: '1px solid #ff4757', color: '#ff4757', cursor: 'pointer', borderRadius: '4px' }}
                                            onClick={() => onSell(item, i)}
                                        >
                                            VENDRE
                                        </button>
                                    </div>
                                );
                            })}
                            {(!playerInventory || playerInventory.length === 0) && (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>Votre sac est vide.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
                    <button className="btn-secondary" onClick={onClose} style={{ padding: '0.8rem 2rem' }}>QUITTER LE MARCHÉ</button>
                </div>
            </div>
        </div>
    );
};
