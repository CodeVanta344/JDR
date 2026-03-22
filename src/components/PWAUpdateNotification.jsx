import React from 'react';
import { usePWAUpdate } from '../hooks/usePWAUpdate';

export function PWAUpdateNotification() {
    const { updateAvailable, applyUpdate } = usePWAUpdate();

    if (!updateAvailable) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            border: '2px solid #d4af37',
            borderRadius: '8px',
            padding: '16px 24px',
            zIndex: 99999,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontFamily: 'Cinzel, serif',
            color: '#f0e6d2',
            minWidth: '300px',
            justifyContent: 'space-between'
        }}>
            <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    Nouvelle version disponible
                </div>
                <div style={{ fontSize: '0.85em', opacity: 0.8 }}>
                    Une mise à jour est prête à être installée
                </div>
            </div>
            <button
                onClick={applyUpdate}
                style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #b8960f 100%)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    color: '#1a1a2e',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.9em',
                    whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                    e.target.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.filter = 'brightness(1)';
                }}
            >
                Mettre à jour
            </button>
        </div>
    );
}
