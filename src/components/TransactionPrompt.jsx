import React from 'react';

export function TransactionPrompt({ transaction, onConfirm, onRefuse }) {
    if (!transaction) return null;

    const { amount, type, reason } = transaction;
    const isLoss = type === 'loss';

    return (
        <div className="transaction-overlay">
            <div className="transaction-card glass-panel animate-fade-in">
                <div className="transaction-header">
                    <span className="transaction-icon">{isLoss ? '💰' : '🎁'}</span>
                    <h3>{isLoss ? 'PAIEMENT REQUIS' : 'RÉCOMPENSE DISPONIBLE'}</h3>
                </div>

                <div className="transaction-body">
                    <p className="transaction-reason">{reason || (isLoss ? "Un service ou un objet vous est proposé." : "Vous recevez une gratification.")}</p>
                    <div className="transaction-amount">
                        <span className="amount-val">{amount}</span>
                        <span className="amount-label">OR</span>
                    </div>
                </div>

                <div className="transaction-actions">
                    <button className="btn-refuse" onClick={onRefuse}>REFUSER</button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        {isLoss ? 'PAYER' : 'ACCEPTER'}
                    </button>
                </div>
            </div>
        </div>
    );
}
