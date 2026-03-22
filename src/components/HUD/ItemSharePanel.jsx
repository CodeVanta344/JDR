import React, { useRef, useEffect } from 'react';

export const ItemSharePanel = ({ itemShares, onClose }) => {
    const panelRef = useRef(null);
    const closeButtonRef = useRef(null);
    const onCloseRef = useRef(onClose);

    // Keep callback reference up to date
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    // Close on click outside - use ref to avoid re-attaching listeners
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                console.log('[ItemSharePanel] Clicked outside, closing');
                onCloseRef.current();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []); // Empty deps - listener only attached once

    // Native event listener for close button
    useEffect(() => {
        const button = closeButtonRef.current;
        if (!button) return;

        const handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('[ItemSharePanel] Close button clicked');
            onCloseRef.current();
        };

        button.addEventListener('click', handleClick, true);
        return () => button.removeEventListener('click', handleClick, true);
    }, []); // Empty deps - listener only attached once

    if (!itemShares || itemShares.length === 0) return null;

    return (
        <div
            ref={panelRef}
            className="item-share-panel"
            style={{
                position: 'fixed',
                top: '20px',
                right: '420px',
                width: '300px',
                maxHeight: '400px',
                background: 'rgba(10, 11, 14, 0.95)',
                border: '1px solid rgba(155, 89, 182, 0.4)',
                borderRadius: '12px',
                padding: '12px',
                zIndex: 101,
                overflowY: 'auto',
                boxShadow: '0 0 20px rgba(155, 89, 182, 0.2)'
            }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid rgba(155, 89, 182, 0.3)'
            }}>
                <span style={{ fontSize: '1.2rem' }}>📦</span>
                <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: '#9b59b6',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Objets Partagés
                </span>
                <span style={{
                    fontSize: '0.7rem',
                    color: '#888',
                    marginLeft: 'auto'
                }}>
                    {itemShares.length}
                </span>
                {/* Close button wrapper with maximum event priority */}
                <div style={{
                    position: 'relative',
                    zIndex: 99999,
                    marginLeft: 'auto',
                    pointerEvents: 'auto'
                }}>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#888',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            lineHeight: 1,
                            pointerEvents: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="Fermer"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                {[...itemShares].reverse().map((share, idx) => (
                    <div
                        key={share.id || idx}
                        style={{
                            background: 'rgba(155, 89, 182, 0.1)',
                            border: `1px solid ${share.item.rarityColor}`,
                            borderRadius: '8px',
                            padding: '10px',
                            boxShadow: `0 0 10px ${share.item.rarityColor}22`
                        }}
                    >
                        {/* Header: Player name */}
                        <div style={{
                            fontSize: '0.7rem',
                            color: '#888',
                            marginBottom: '6px'
                        }}>
                            📤 {share.player}
                        </div>

                        {/* Item name and rarity */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            flexWrap: 'wrap',
                            marginBottom: '6px'
                        }}>
                            <span style={{
                                fontSize: '0.95rem',
                                fontWeight: 'bold',
                                color: share.item.rarityColor,
                                textShadow: `0 0 8px ${share.item.rarityColor}66`
                            }}>
                                {share.item.name}
                            </span>
                            <span style={{
                                fontSize: '0.6rem',
                                padding: '2px 6px',
                                background: `${share.item.rarityColor}22`,
                                border: `1px solid ${share.item.rarityColor}`,
                                borderRadius: '4px',
                                color: share.item.rarityColor,
                                textTransform: 'uppercase',
                                fontWeight: 'bold'
                            }}>
                                {share.item.rarityLabel}
                            </span>
                            {share.item.equipped && (
                                <span style={{
                                    fontSize: '0.6rem',
                                    padding: '1px 4px',
                                    background: 'rgba(212, 175, 55, 0.2)',
                                    border: '1px solid #d4af37',
                                    borderRadius: '3px',
                                    color: '#d4af37'
                                }}>
                                    ✓
                                </span>
                            )}
                        </div>

                        {/* Type */}
                        <div style={{
                            fontSize: '0.65rem',
                            color: '#666',
                            textTransform: 'uppercase',
                            marginBottom: '4px'
                        }}>
                            {share.item.type}
                        </div>

                        {/* Description */}
                        {share.item.description && (
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#aaa',
                                fontStyle: 'italic',
                                marginBottom: '6px',
                                lineHeight: '1.3'
                            }}>
                                {share.item.description}
                            </div>
                        )}

                        {/* Stats */}
                        {share.item.stats && (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px',
                                marginTop: '6px'
                            }}>
                                {share.item.stats.split(' | ').map((stat, sidx) => (
                                    <span key={sidx} style={{
                                        fontSize: '0.65rem',
                                        padding: '2px 6px',
                                        background: 'rgba(72, 219, 251, 0.15)',
                                        border: '1px solid rgba(72, 219, 251, 0.3)',
                                        borderRadius: '4px',
                                        color: '#48dbfb'
                                    }}>
                                        {stat}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Effects */}
                        {share.item.effects && (
                            <div style={{
                                marginTop: '6px',
                                padding: '6px',
                                background: 'rgba(76, 209, 55, 0.1)',
                                border: '1px solid rgba(76, 209, 55, 0.2)',
                                borderRadius: '4px'
                            }}>
                                <span style={{
                                    fontSize: '0.6rem',
                                    color: '#4cd137',
                                    fontWeight: 'bold'
                                }}>
                                    Effets
                                </span>
                                <div style={{
                                    fontSize: '0.7rem',
                                    color: '#4cd137',
                                    whiteSpace: 'pre-wrap',
                                    marginTop: '2px'
                                }}>
                                    {share.item.effects}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
