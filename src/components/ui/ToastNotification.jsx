import React, { useEffect } from 'react';

const ToastNotification = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-notification animate-fade-in" style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 10, 15, 0.95)',
            border: '1px solid var(--gold-primary)',
            padding: '1rem 2rem',
            borderRadius: '4px',
            boxShadow: '0 0 20px rgba(0,0,0,0.8), 0 0 10px rgba(212, 175, 55, 0.2)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            minWidth: '300px',
            justifyContent: 'center'
        }}>
            <div style={{
                fontSize: '1.2rem'
            }}>
                {type === 'success' && '✨'}
                {type === 'error' && '⚠️'}
                {type === 'info' && '📜'}
            </div>
            <div style={{
                color: 'var(--gold-light)',
                fontFamily: 'Cinzel, serif',
                fontSize: '1rem',
                textShadow: '0 2px 2px black'
            }}>
                {message}
            </div>
        </div>
    );
};

export default ToastNotification;
