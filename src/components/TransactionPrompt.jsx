import React from 'react';

export function TransactionPrompt({ transaction, onConfirm, onRefuse, playerGold = 0 }) {
    if (!transaction) return null;

    const { amount, type, reason, itemName, originalPrice, negotiated } = transaction;
    const isLoss = type === 'loss';
    const displayAmount = amount ?? 0;
    const canAfford = playerGold >= displayAmount;
    const discount = originalPrice && negotiated ? Math.round((1 - displayAmount / originalPrice) * 100) : 0;

    return (
        <div className="transaction-overlay">
            <div className="transaction-card glass-panel animate-fade-in">
                <div className="transaction-header">
                    <span className="transaction-icon">{isLoss ? '💰' : '🎁'}</span>
                    <h3>{isLoss ? 'PAIEMENT REQUIS' : 'RÉCOMPENSE DISPONIBLE'}</h3>
                </div>

                <div className="transaction-body">
                    {itemName && (
                        <p className="transaction-item" style={{ 
                            color: 'var(--gold-primary)', 
                            fontSize: '1.1rem', 
                            fontWeight: 'bold',
                            marginBottom: '0.5rem'
                        }}>
                            {itemName}
                        </p>
                    )}
                    <p className="transaction-reason">
                        {reason || (isLoss ? "Un service ou un objet vous est proposé." : "Vous recevez une gratification.")}
                    </p>
                    
                    <div className="transaction-amount" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        {negotiated && originalPrice && discount > 0 && (
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem',
                                fontSize: '0.9rem'
                            }}>
                                <span style={{ 
                                    textDecoration: 'line-through', 
                                    color: '#888' 
                                }}>
                                    {originalPrice}
                                </span>
                                <span style={{ 
                                    color: '#4dff88', 
                                    fontWeight: 'bold',
                                    background: 'rgba(77, 255, 136, 0.2)',
                                    padding: '2px 8px',
                                    borderRadius: '10px'
                                }}>
                                    -{discount}%
                                </span>
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            <span className="amount-val" style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: 'bold',
                                color: isLoss ? (canAfford ? 'var(--gold-primary)' : '#ff6b6b') : '#4dff88'
                            }}>
                                {displayAmount}
                            </span>
                            <span className="amount-label" style={{ 
                                fontSize: '1rem', 
                                color: 'var(--gold-light)' 
                            }}>
                                OR
                            </span>
                        </div>
                        
                        {isLoss && (
                            <p style={{ 
                                fontSize: '0.85rem', 
                                color: canAfford ? '#aaa' : '#ff6b6b',
                                marginTop: '0.5rem'
                            }}>
                                Votre bourse : {playerGold} Or
                                {!canAfford && " (insuffisant)"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="transaction-actions">
                    <button className="btn-refuse" onClick={onRefuse}>REFUSER</button>
                    <button 
                        className="btn-confirm" 
                        onClick={onConfirm}
                        disabled={isLoss && !canAfford}
                        style={{
                            opacity: isLoss && !canAfford ? 0.5 : 1,
                            cursor: isLoss && !canAfford ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoss ? 'PAYER' : 'ACCEPTER'}
                    </button>
                </div>
            </div>
        </div>
    );
}
