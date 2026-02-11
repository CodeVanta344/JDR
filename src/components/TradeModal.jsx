import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const TradeModal = ({ 
    isOpen, 
    onClose, 
    currentPlayer, 
    players, 
    sessionId,
    onTradeComplete,
    incomingTrade,
    onIncomingTradeHandled,
    pendingTradeResponse,
    onPendingResponseHandled
}) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [offeredItems, setOfferedItems] = useState([]);
    const [offeredGold, setOfferedGold] = useState(0);
    const [pendingTrade, setPendingTrade] = useState(null);

    const otherPlayers = players.filter(p => p.id !== currentPlayer?.id);

    useEffect(() => {
        if (pendingTradeResponse && pendingTrade) {
            if (pendingTradeResponse.accepted) {
                onTradeComplete?.(pendingTradeResponse);
                setPendingTrade(null);
                setOfferedItems([]);
                setOfferedGold(0);
                onClose();
            } else {
                setPendingTrade(null);
                alert("L'échange a été refusé.");
            }
            onPendingResponseHandled?.();
        }
    }, [pendingTradeResponse]);

    const toggleItemOffer = (item, index) => {
        const key = `${index}_${item.name}`;
        if (offeredItems.find(o => o.key === key)) {
            setOfferedItems(offeredItems.filter(o => o.key !== key));
        } else {
            setOfferedItems([...offeredItems, { ...item, key, originalIndex: index }]);
        }
    };

    const sendTradeOffer = async () => {
        if (!selectedPlayer || (offeredItems.length === 0 && offeredGold === 0)) return;

        const offer = {
            fromId: currentPlayer.id,
            fromName: currentPlayer.name,
            targetId: selectedPlayer.id,
            targetName: selectedPlayer.name,
            items: offeredItems,
            gold: offeredGold,
            timestamp: Date.now()
        };

        await supabase.channel(`trade_${sessionId}`).send({
            type: 'broadcast',
            event: 'trade_offer',
            payload: offer
        });

        setPendingTrade(offer);
    };

    const respondToTrade = async (accepted) => {
        if (!incomingTrade) return;

        if (accepted) {
            const fromPlayer = players.find(p => p.id === incomingTrade.fromId);
            if (!fromPlayer) return;

            const newFromInventory = fromPlayer.inventory.filter((_, i) => 
                !incomingTrade.items.some(item => item.originalIndex === i)
            );
            const newFromGold = (fromPlayer.gold || 0) - incomingTrade.gold;

            const newCurrentInventory = [...(currentPlayer.inventory || []), ...incomingTrade.items.map(i => {
                const { key, originalIndex, ...item } = i;
                return { ...item, equipped: false };
            })];
            const newCurrentGold = (currentPlayer.gold || 0) + incomingTrade.gold;

            await supabase.from('players').update({ 
                inventory: newFromInventory, 
                gold: newFromGold 
            }).eq('id', incomingTrade.fromId);

            await supabase.from('players').update({ 
                inventory: newCurrentInventory, 
                gold: newCurrentGold 
            }).eq('id', currentPlayer.id);
        }

        await supabase.channel(`trade_${sessionId}`).send({
            type: 'broadcast',
            event: 'trade_response',
            payload: {
                fromId: incomingTrade.fromId,
                targetId: currentPlayer.id,
                accepted
            }
        });

        onIncomingTradeHandled?.();
    };

    if (incomingTrade) {
        return (
            <div className="modal-overlay animate-fade-in" style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
            }}>
                <div className="glass-panel" style={{
                    width: '90%', maxWidth: '500px', padding: '2rem',
                    border: '2px solid var(--gold-primary)', borderRadius: '12px',
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '3rem' }}>🤝</span>
                    </div>
                    <h2 style={{ color: 'var(--gold-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
                        PROPOSITION D'ÉCHANGE
                    </h2>
                    
                    <p style={{ color: '#fff', textAlign: 'center', marginBottom: '1rem' }}>
                        <strong style={{ color: 'var(--gold-light)' }}>{incomingTrade.fromName}</strong> vous propose :
                    </p>

                    {incomingTrade.gold > 0 && (
                        <div style={{ 
                            textAlign: 'center', 
                            marginBottom: '1rem', 
                            padding: '0.8rem',
                            background: 'rgba(212, 175, 55, 0.1)',
                            borderRadius: '8px',
                            border: '1px solid var(--gold-dim)'
                        }}>
                            <span style={{ color: 'var(--gold-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                {incomingTrade.gold}
                            </span>
                            <span style={{ color: 'var(--gold-light)', marginLeft: '0.5rem' }}>pièces d'or</span>
                        </div>
                    )}

                    {incomingTrade.items.length > 0 && (
                        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {incomingTrade.items.map((item, i) => (
                                <div key={i} style={{
                                    padding: '0.8rem', background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)', borderRadius: '6px'
                                }}>
                                    <div style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</div>
                                    {item.desc && <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.desc}</div>}
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button 
                            className="btn-gold" 
                            onClick={() => respondToTrade(true)}
                            style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
                        >
                            ✓ ACCEPTER
                        </button>
                        <button 
                            className="btn-secondary" 
                            onClick={() => respondToTrade(false)}
                            style={{ padding: '0.8rem 2rem' }}
                        >
                            ✕ REFUSER
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isOpen) return null;

    if (pendingTrade) {
        return (
            <div className="modal-overlay animate-fade-in" style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
            }}>
                <div className="glass-panel" style={{
                    width: '90%', maxWidth: '400px', padding: '2rem', textAlign: 'center',
                    border: '1px solid var(--gold-dim)', borderRadius: '12px'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <div className="animate-spin" style={{
                            width: '40px', height: '40px', margin: '0 auto',
                            border: '3px solid var(--gold-dim)', borderTopColor: 'var(--gold-primary)',
                            borderRadius: '50%'
                        }} />
                    </div>
                    <p style={{ color: '#fff' }}>
                        En attente de la réponse de <strong style={{ color: 'var(--gold-light)' }}>{pendingTrade.targetName}</strong>...
                    </p>
                    <button 
                        className="btn-secondary" 
                        onClick={() => setPendingTrade(null)}
                        style={{ marginTop: '1rem' }}
                    >
                        ANNULER
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay animate-fade-in" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
            <div className="glass-panel" style={{
                width: '95%', maxWidth: '700px', maxHeight: '85vh',
                display: 'flex', flexDirection: 'column',
                border: '1px solid var(--gold-dim)', borderRadius: '12px', overflow: 'hidden'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <h2 style={{ color: 'var(--gold-primary)', margin: 0 }}>🤝 ÉCHANGER AVEC UN COMPAGNON</h2>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>
                            CHOISIR UN COMPAGNON
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {otherPlayers.length === 0 ? (
                                <p style={{ color: '#666', fontStyle: 'italic' }}>Aucun autre joueur dans la session.</p>
                            ) : otherPlayers.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedPlayer(p)}
                                    style={{
                                        padding: '0.6rem 1rem',
                                        background: selectedPlayer?.id === p.id ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)',
                                        border: `1px solid ${selectedPlayer?.id === p.id ? 'var(--gold-primary)' : 'var(--glass-border)'}`,
                                        borderRadius: '6px', cursor: 'pointer',
                                        color: selectedPlayer?.id === p.id ? 'var(--gold-primary)' : '#fff'
                                    }}
                                >
                                    {p.name} ({p.class})
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>
                            OR À DONNER (Vous avez: {currentPlayer?.gold || 0} ✧)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max={currentPlayer?.gold || 0}
                            value={offeredGold}
                            onChange={(e) => setOfferedGold(Math.min(parseInt(e.target.value) || 0, currentPlayer?.gold || 0))}
                            style={{
                                width: '120px', padding: '0.5rem', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--glass-border)', borderRadius: '4px',
                                color: 'var(--gold-primary)', fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>
                            OBJETS À DONNER (cliquez pour sélectionner)
                        </label>
                        <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto' }}>
                            {(currentPlayer?.inventory || []).map((item, i) => {
                                if (typeof item !== 'object') return null;
                                const isSelected = offeredItems.some(o => o.originalIndex === i);
                                return (
                                    <div
                                        key={i}
                                        onClick={() => !item.equipped && toggleItemOffer(item, i)}
                                        style={{
                                            padding: '0.8rem',
                                            background: isSelected ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${isSelected ? 'var(--gold-primary)' : 'var(--glass-border)'}`,
                                            borderRadius: '6px',
                                            cursor: item.equipped ? 'not-allowed' : 'pointer',
                                            opacity: item.equipped ? 0.5 : 1
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#fff', fontWeight: 'bold' }}>
                                                {item.name} {item.equipped && '(Équipé)'}
                                            </span>
                                            {isSelected && <span style={{ color: 'var(--gold-primary)' }}>✓ SÉLECTIONNÉ</span>}
                                        </div>
                                        {item.desc && <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.desc}</div>}
                                    </div>
                                );
                            })}
                            {(!currentPlayer?.inventory || currentPlayer.inventory.length === 0) && (
                                <p style={{ color: '#666', fontStyle: 'italic', padding: '1rem' }}>Votre inventaire est vide.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button className="btn-secondary" onClick={onClose}>ANNULER</button>
                    <button 
                        className="btn-gold" 
                        onClick={sendTradeOffer}
                        disabled={!selectedPlayer || (offeredItems.length === 0 && offeredGold === 0)}
                        style={{ opacity: (!selectedPlayer || (offeredItems.length === 0 && offeredGold === 0)) ? 0.5 : 1 }}
                    >
                        PROPOSER L'ÉCHANGE
                    </button>
                </div>
            </div>
        </div>
    );
};
