import { useState, useEffect } from 'react';

// Global modal state
let showModalCallback = null;
let showAlertCallback = null;

export function showConfirmModal(options) {
    if (showModalCallback) {
        showModalCallback(options);
    }
}

export function showAlertModal(message, title = 'Information') {
    if (showAlertCallback) {
        showAlertCallback({ message, title });
    }
}

export function GameModalProvider({ children }) {
    const [confirmModal, setConfirmModal] = useState(null);
    const [alertModal, setAlertModal] = useState(null);

    useEffect(() => {
        showModalCallback = setConfirmModal;
        showAlertCallback = setAlertModal;
        return () => {
            showModalCallback = null;
            showAlertCallback = null;
        };
    }, []);

    const handleConfirm = () => {
        if (confirmModal?.onConfirm) {
            confirmModal.onConfirm();
        }
        setConfirmModal(null);
    };

    const handleCancel = () => {
        if (confirmModal?.onCancel) {
            confirmModal.onCancel();
        }
        setConfirmModal(null);
    };

    const handleAlertClose = () => {
        if (alertModal?.onClose) {
            alertModal.onClose();
        }
        setAlertModal(null);
    };

    return (
        <>
            {children}
            
            {/* Confirmation Modal */}
            {confirmModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10000,
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div style={{
                        maxWidth: '450px',
                        width: '90%',
                        padding: '2rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
                        border: '2px solid #d4af37',
                        borderRadius: '12px',
                        boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), 0 20px 60px rgba(0,0,0,0.8)',
                        position: 'relative'
                    }}>
                        {/* Corner ornaments */}
                        <div style={{ position: 'absolute', top: '8px', left: '8px', width: '20px', height: '20px', borderTop: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }}></div>
                        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', borderTop: '2px solid #d4af37', borderRight: '2px solid #d4af37' }}></div>
                        <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '20px', height: '20px', borderBottom: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }}></div>
                        <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '20px', height: '20px', borderBottom: '2px solid #d4af37', borderRight: '2px solid #d4af37' }}></div>

                        {/* Icon */}
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            color: confirmModal.type === 'danger' ? '#ff4444' : '#d4af37'
                        }}>
                            {confirmModal.type === 'danger' ? '⚠️' : '❓'}
                        </div>

                        {/* Title */}
                        <h2 style={{
                            color: '#d4af37',
                            fontFamily: 'Cinzel, serif',
                            fontSize: '1.4rem',
                            marginBottom: '1rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}>
                            {confirmModal.title || 'Confirmation'}
                        </h2>

                        {/* Message */}
                        <p style={{
                            color: '#ccc',
                            marginBottom: '2rem',
                            lineHeight: '1.6',
                            fontSize: '1rem'
                        }}>
                            {confirmModal.message}
                        </p>

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={handleCancel}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    background: 'transparent',
                                    border: '1px solid #666',
                                    borderRadius: '6px',
                                    color: '#888',
                                    fontSize: '0.9rem',
                                    fontFamily: 'Cinzel, serif',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.borderColor = '#999';
                                    e.target.style.color = '#ccc';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.borderColor = '#666';
                                    e.target.style.color = '#888';
                                }}
                            >
                                {confirmModal.cancelText || 'Annuler'}
                            </button>
                            <button
                                onClick={handleConfirm}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    background: confirmModal.type === 'danger' 
                                        ? 'linear-gradient(135deg, #dc2626, #991b1b)' 
                                        : 'linear-gradient(135deg, #d4af37, #fbeea8)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: confirmModal.type === 'danger' ? '#fff' : '#000',
                                    fontSize: '0.9rem',
                                    fontFamily: 'Cinzel, serif',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                                }}
                            >
                                {confirmModal.confirmText || 'Confirmer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Alert Modal */}
            {alertModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10000,
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div style={{
                        maxWidth: '400px',
                        width: '90%',
                        padding: '2rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
                        border: '2px solid #d4af37',
                        borderRadius: '12px',
                        boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), 0 20px 60px rgba(0,0,0,0.8)',
                        position: 'relative'
                    }}>
                        {/* Corner ornaments */}
                        <div style={{ position: 'absolute', top: '8px', left: '8px', width: '20px', height: '20px', borderTop: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }}></div>
                        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', borderTop: '2px solid #d4af37', borderRight: '2px solid #d4af37' }}></div>
                        <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '20px', height: '20px', borderBottom: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }}></div>
                        <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '20px', height: '20px', borderBottom: '2px solid #d4af37', borderRight: '2px solid #d4af37' }}></div>

                        {/* Icon */}
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            ℹ️
                        </div>

                        {/* Title */}
                        <h2 style={{
                            color: '#d4af37',
                            fontFamily: 'Cinzel, serif',
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}>
                            {alertModal.title}
                        </h2>

                        {/* Message */}
                        <p style={{
                            color: '#ccc',
                            marginBottom: '2rem',
                            lineHeight: '1.6',
                            fontSize: '1rem'
                        }}>
                            {alertModal.message}
                        </p>

                        {/* Button */}
                        <button
                            onClick={handleAlertClose}
                            style={{
                                padding: '0.8rem 2rem',
                                background: 'linear-gradient(135deg, #d4af37, #fbeea8)',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#000',
                                fontSize: '0.9rem',
                                fontFamily: 'Cinzel, serif',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

// Helper functions for easy usage
export function confirmDelete(message, onConfirm, onCancel) {
    showConfirmModal({
        title: '⚠️ Attention',
        message,
        confirmText: 'Supprimer',
        cancelText: 'Annuler',
        type: 'danger',
        onConfirm,
        onCancel
    });
}

export function confirmAction(message, onConfirm, onCancel, title = 'Confirmation') {
    showConfirmModal({
        title,
        message,
        confirmText: 'Confirmer',
        cancelText: 'Annuler',
        type: 'normal',
        onConfirm,
        onCancel
    });
}

export function alert(message, title = 'Information', onClose) {
    showAlertModal(message, title);
    if (onClose) {
        // Allow callback after alert closes
        setTimeout(onClose, 100);
    }
}
