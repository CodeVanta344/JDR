import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export const MerchantPanel = ({ merchant, playerGold, playerInventory, onBuy, onSell, onClose, onChat, affinity = 0, messages = [], loading = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('buy');
    const [generating, setGenerating] = useState({});
    const [itemImages, setItemImages] = useState({});
    const [chatInput, setChatInput] = useState('');
    const scrollRef = React.useRef(null);

    React.useEffect(() => {
        if (activeTab === 'chat' && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, activeTab, loading]);

    const priceMultiplier = Math.max(0.5, Math.min(1.5, 1 - (affinity * 0.005)));
    const sellMultiplier = Math.max(0.1, Math.min(0.8, 0.5 + (affinity * 0.002)));

    if (!merchant) return null;

    const handleClose = () => {
        setIsExpanded(false);
        onClose();
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim() && onChat) {
            onChat(chatInput, merchant.npcName);
            setChatInput('');
        }
    };

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
        <>
            {!isExpanded && (
                <div
                    className="merchant-icon animate-fade-in"
                    onClick={() => setIsExpanded(true)}
                    style={{
                        position: 'fixed',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)',
                        border: '2px solid var(--gold-primary)',
                        borderRadius: '12px',
                        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
                    }}
                >
                    <span style={{ fontSize: '2rem' }}>🏪</span>
                    <span style={{
                        color: 'var(--gold-primary)',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        maxWidth: '100px',
                        lineHeight: '1.2'
                    }}>
                        {merchant.npcName}
                    </span>
                    <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--gold-light)',
                        opacity: 0.8
                    }}>
                        Cliquez pour ouvrir
                    </span>
                </div>
            )}

            <div
                className="merchant-panel"
                style={{
                    position: 'fixed',
                    right: isExpanded ? '0' : '-450px',
                    top: '0',
                    bottom: '0',
                    width: '450px',
                    background: 'linear-gradient(180deg, rgba(15, 15, 20, 0.98) 0%, rgba(5, 5, 10, 0.98) 100%)',
                    borderLeft: '2px solid var(--gold-dim)',
                    boxShadow: '-5px 0 30px rgba(0, 0, 0, 0.5)',
                    zIndex: 950,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'right 0.3s ease',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    padding: '1rem 1.2rem',
                    borderBottom: '1px solid var(--gold-dim)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(212, 175, 55, 0.05)'
                }}>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--gold-primary)', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>🏪</span> {merchant.npcName}
                        </h2>
                        <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.85rem' }}>
                            {merchant.greeting || "Que puis-je pour vous ?"}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '0.5rem'
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{
                    padding: '0.8rem 1.2rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>VOTRE BOURSE</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--gold-primary)' }}>{playerGold} OR ✧</span>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid var(--gold-dim)' }}>
                    <button
                        onClick={() => setActiveTab('buy')}
                        style={{
                            flex: 1,
                            padding: '0.8rem',
                            background: activeTab === 'buy' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'buy' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                            color: activeTab === 'buy' ? 'var(--gold-primary)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                        }}
                    >
                        ACHETER
                    </button>
                    <button
                        onClick={() => setActiveTab('sell')}
                        style={{
                            flex: 1,
                            padding: '0.8rem',
                            background: activeTab === 'sell' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'sell' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                            color: activeTab === 'sell' ? 'var(--gold-primary)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                        }}
                    >
                        VENDRE
                    </button>
                    <button
                        onClick={() => setActiveTab('chat')}
                        style={{
                            flex: 1,
                            padding: '0.8rem',
                            background: activeTab === 'chat' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'chat' ? '2px solid var(--gold-primary)' : '2px solid transparent',
                            color: activeTab === 'chat' ? 'var(--gold-primary)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                        }}
                    >
                        PARLER
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {activeTab === 'buy' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {merchant.inventory && merchant.inventory.map((item) => {
                                const realPrice = Math.ceil(item.price * priceMultiplier);
                                const canAfford = playerGold >= realPrice;
                                return (
                                    <div key={item.id} style={{
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        gap: '1rem',
                                        alignItems: 'center'
                                    }}>
                                        <div
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                background: '#0a0a0a',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                cursor: item.visual_prompt ? 'pointer' : 'default',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                            onClick={() => generateItemImage(item)}
                                        >
                                            {itemImages[item.id] ? (
                                                <img src={itemImages[item.id]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                                            ) : (
                                                generating[item.id] ? (
                                                    <div className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid var(--gold-dim)', borderTopColor: 'transparent', borderRadius: '50%' }} />
                                                ) : (
                                                    <span style={{ fontSize: '1.5rem' }}>📦</span>
                                                )
                                            )}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.3rem' }}>
                                                <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>{item.name}</span>
                                                <span style={{
                                                    color: canAfford ? 'var(--gold-primary)' : '#ff6b6b',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.9rem',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {realPrice} ✧
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: '1.3' }}>{item.desc}</p>
                                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                {item.stats && Object.entries(item.stats).map(([k, v]) => (
                                                    <span key={k} style={{
                                                        fontSize: '0.6rem',
                                                        background: 'rgba(100, 200, 255, 0.15)',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        color: 'var(--aether-blue)'
                                                    }}>
                                                        {k.toUpperCase()} {v > 0 ? `+${v}` : v}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            className="btn-gold"
                                            style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.75rem',
                                                opacity: canAfford ? 1 : 0.5,
                                                cursor: canAfford ? 'pointer' : 'not-allowed'
                                            }}
                                            disabled={!canAfford}
                                            onClick={() => onBuy({ ...item, price: realPrice })}
                                        >
                                            ACHETER
                                        </button>
                                    </div>
                                );
                            })}
                            {(!merchant.inventory || merchant.inventory.length === 0) && (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                                    Aucun article disponible.
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'sell' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {playerInventory && playerInventory.filter(item => typeof item === 'object').map((item, i) => {
                                const sellPrice = Math.floor((item.price || 50) * sellMultiplier);
                                return (
                                    <div key={i} style={{
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>
                                                {item.name} {item.equipped && <span style={{ color: 'var(--gold-dim)', fontSize: '0.75rem' }}>(Équipé)</span>}
                                            </span>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                                Valeur: {item.price || 50} ✧ → Vente: <span style={{ color: '#4dff88' }}>{sellPrice} ✧</span>
                                            </div>
                                        </div>
                                        <button
                                            style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.75rem',
                                                background: 'transparent',
                                                border: '1px solid #ff6b6b',
                                                color: '#ff6b6b',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s'
                                            }}
                                            onClick={() => onSell(item, i)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            VENDRE
                                        </button>
                                    </div>
                                );
                            })}
                            {(!playerInventory || playerInventory.filter(item => typeof item === 'object').length === 0) && (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                                    Votre sac est vide.
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'chat' && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div
                                ref={scrollRef}
                                style={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    marginBottom: '1rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                {messages.length === 0 && (
                                    <div style={{
                                        textAlign: 'center',
                                        color: 'var(--text-muted)',
                                        marginTop: '2rem',
                                        fontStyle: 'italic'
                                    }}>
                                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>💬</span>
                                        <p>Commencez la discussion avec {merchant.npcName}...</p>
                                    </div>
                                )}

                                {messages.map((m, i) => (
                                    <div key={i} style={{
                                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '8px',
                                        background: m.role === 'user' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.05)',
                                        border: m.role === 'user' ? '1px solid var(--gold-dim)' : '1px solid rgba(255,255,255,0.1)',
                                        color: m.role === 'user' ? 'var(--gold-primary)' : '#fff',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.4'
                                    }}>
                                        {m.content}
                                    </div>
                                ))}

                                {loading && (
                                    <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic', padding: '0.5rem' }}>
                                        {merchant.npcName} écrit...
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Parlez au marchand..."
                                    disabled={loading}
                                    style={{
                                        flex: 1,
                                        padding: '0.8rem 1rem',
                                        background: 'rgba(0,0,0,0.4)',
                                        border: '1px solid var(--gold-dim)',
                                        borderRadius: '6px',
                                        color: '#fff',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="btn-gold"
                                    style={{ padding: '0.8rem 1.2rem' }}
                                    disabled={!chatInput.trim() || loading}
                                >
                                    ➤
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <div style={{
                    padding: '1rem',
                    borderTop: '1px solid var(--gold-dim)',
                    background: 'rgba(0,0,0,0.3)'
                }}>
                    <button
                        className="btn-secondary"
                        onClick={handleClose}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span>👋</span> QUITTER LE MARCHAND
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div
                    onClick={handleClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: '450px',
                        bottom: 0,
                        background: 'rgba(0,0,0,0.3)',
                        zIndex: 940
                    }}
                />
            )}
        </>
    );
};

export const MerchantModal = MerchantPanel;
