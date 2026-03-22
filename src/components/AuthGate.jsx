import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function AuthGate({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authMode, setAuthMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        if (import.meta.env.DEV && import.meta.env.VITE_DEV_BYPASS === 'true') {
            supabase.auth.getSession().then(async ({ data: { session } }) => {
                if (session?.user) {
                    setUser(session.user);
                    setLoading(false);
                } else {
                    const devEmail = import.meta.env.VITE_DEV_EMAIL;
                    const devPwd = import.meta.env.VITE_DEV_PWD;
                    let res = await supabase.auth.signInWithPassword({ email: devEmail, password: devPwd });
                    if (res.error) {
                        await supabase.auth.signUp({ email: devEmail, password: devPwd, options: { data: { display_name: 'DevMaster' } } });
                        res = await supabase.auth.signInWithPassword({ email: devEmail, password: devPwd });
                    }
                    if (res.data?.user) setUser(res.data.user);
                    else console.error('[DevAuth]', res.error?.message || 'Failed');
                    setLoading(false);
                }
            });
            return;
        }
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            if (authMode === 'signup') {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { display_name: displayName || email.split('@')[0] }
                    }
                });
                if (signUpError) throw signUpError;
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (signInError) throw signInError;
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{
                position: 'fixed', inset: 0,
                background: 'radial-gradient(ellipse at center, #151520 0%, #0a0b0e 70%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1.5rem'
            }}>
                <div style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    color: '#fff',
                    fontFamily: '"Cinzel", serif',
                    letterSpacing: '8px',
                    textShadow: '0 0 40px rgba(229,192,109,0.3)'
                }}>
                    AETHELGARD
                </div>
                <div style={{
                    width: '120px', height: '2px',
                    background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                    animation: 'authPulse 1.5s ease-in-out infinite'
                }} />
                <style>{`@keyframes authPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
                    @keyframes authFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes authGlow { 0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.05); } 50% { box-shadow: 0 0 60px rgba(212,175,55,0.15); } }
                    @keyframes authShine { from { left: -100%; } to { left: 200%; } }
                `}</style>
            </div>
        );
    }

    if (user) {
        return typeof children === 'function' ? children(user) : children;
    }

    return (
        <div style={{
            position: 'fixed', inset: 0,
            background: 'radial-gradient(ellipse at 30% 20%, #1a1520 0%, #0a0b0e 50%, #080a0f 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            overflow: 'hidden'
        }}>
            {/* Background particles */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${2 + Math.random() * 3}px`,
                        height: `${2 + Math.random() * 3}px`,
                        borderRadius: '50%',
                        background: `rgba(212, 175, 55, ${0.05 + Math.random() * 0.15})`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `authFloat${i % 3} ${8 + Math.random() * 12}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 5}s`
                    }} />
                ))}
            </div>

            {/* Main card */}
            <div style={{
                position: 'relative',
                background: 'linear-gradient(170deg, rgba(25,22,35,0.95) 0%, rgba(12,12,18,0.98) 100%)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '16px',
                padding: 'clamp(2rem, 5vw, 3.5rem)',
                width: '90%',
                maxWidth: '440px',
                animation: 'authFadeIn 0.6s ease-out, authGlow 4s ease-in-out infinite',
                backdropFilter: 'blur(20px)'
            }}>
                {/* Decorative corner accents */}
                <div style={{ position: 'absolute', top: -1, left: 20, right: 20, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
                <div style={{ position: 'absolute', bottom: -1, left: 20, right: 20, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    {/* Logo symbol */}
                    <div style={{
                        width: '48px', height: '48px', margin: '0 auto 1.2rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
                        border: '1px solid rgba(212,175,55,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem'
                    }}>
                        <span role="img" aria-label="shield">&#9876;</span>
                    </div>

                    <div style={{
                        fontSize: '0.65rem', color: 'rgba(212,175,55,0.5)',
                        letterSpacing: '5px', marginBottom: '0.6rem',
                        fontWeight: 300
                    }}>TALES FROM THE VOID</div>

                    <h1 style={{
                        fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
                        color: '#f4e8d0',
                        fontFamily: '"Cinzel", serif',
                        letterSpacing: '6px',
                        textShadow: '0 2px 20px rgba(229,192,109,0.15)',
                        margin: 0,
                        fontWeight: 400
                    }}>AETHELGARD</h1>

                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '12px', marginTop: '1rem'
                    }}>
                        <div style={{ flex: 1, maxWidth: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(212,175,55,0.4)', boxShadow: '0 0 8px rgba(212,175,55,0.3)' }} />
                        <div style={{ flex: 1, maxWidth: '60px', height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />
                    </div>

                    <p style={{
                        fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)',
                        marginTop: '0.8rem', letterSpacing: '1px', fontWeight: 300
                    }}>
                        {authMode === 'login' ? 'Reprenez votre queste, aventurier' : 'Forgez votre destin dans les terres oubliees'}
                    </p>
                </div>

                {/* Mode Toggle */}
                <div style={{
                    display: 'flex', marginBottom: '1.8rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    padding: '3px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {['login', 'signup'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => { setAuthMode(mode); setError(''); }}
                            style={{
                                flex: 1, padding: '0.65rem',
                                background: authMode === mode
                                    ? 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))'
                                    : 'transparent',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                color: authMode === mode ? '#e5c06d' : 'rgba(255,255,255,0.3)',
                                fontSize: '0.7rem',
                                letterSpacing: '2.5px',
                                fontWeight: authMode === mode ? 600 : 400,
                                transition: 'all 0.3s ease',
                                position: 'relative'
                            }}
                        >
                            {mode === 'login' ? 'CONNEXION' : 'INSCRIPTION'}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    {authMode === 'signup' && (
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                fontSize: '0.85rem', opacity: 0.3, pointerEvents: 'none'
                            }}>&#9876;</div>
                            <input
                                type="text"
                                placeholder="Nom d'aventurier"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                style={{
                                    ...inputStyle,
                                    paddingLeft: '2.5rem',
                                    borderColor: focusedField === 'name' ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)',
                                    boxShadow: focusedField === 'name' ? '0 0 20px rgba(212,175,55,0.1)' : 'none'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                            fontSize: '0.8rem', opacity: 0.3, pointerEvents: 'none'
                        }}>&#9993;</div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            style={{
                                ...inputStyle,
                                paddingLeft: '2.5rem',
                                borderColor: focusedField === 'email' ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)',
                                boxShadow: focusedField === 'email' ? '0 0 20px rgba(212,175,55,0.1)' : 'none'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                            fontSize: '0.85rem', opacity: 0.3, pointerEvents: 'none'
                        }}>&#128274;</div>
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            required
                            minLength={6}
                            style={{
                                ...inputStyle,
                                paddingLeft: '2.5rem',
                                borderColor: focusedField === 'password' ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)',
                                boxShadow: focusedField === 'password' ? '0 0 20px rgba(212,175,55,0.1)' : 'none'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            padding: '0.7rem 1rem', borderRadius: '8px',
                            background: 'rgba(255,68,68,0.08)',
                            border: '1px solid rgba(255,68,68,0.2)',
                            color: '#ff8888', fontSize: '0.78rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1rem' }}>&#9888;</span>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            marginTop: '0.5rem',
                            padding: '1rem',
                            background: submitting
                                ? 'rgba(212,175,55,0.15)'
                                : 'linear-gradient(135deg, #c9a227 0%, #e5c06d 50%, #c9a227 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            color: submitting ? 'rgba(255,255,255,0.3)' : '#0a0a0a',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            letterSpacing: '3px',
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: submitting ? 'none' : '0 4px 25px rgba(212,175,55,0.25)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {submitting ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <span style={{ animation: 'authPulse 1s infinite' }}>&#9876;</span>
                                INVOCATION EN COURS...
                            </span>
                        ) : (
                            authMode === 'login' ? 'ENTRER DANS LE MONDE' : 'FORGER MON DESTIN'
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div style={{
                    marginTop: '2rem', textAlign: 'center',
                    display: 'flex', flexDirection: 'column', gap: '0.4rem'
                }}>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '1.5px' }}>
                        VERSION 0.99.1 ALPHA
                    </div>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.1)', letterSpacing: '1px' }}>
                        &copy; 2026 AETHELGARD ENGINE &bull; POWERED BY CLAUDE SONNET 4
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes authPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
                @keyframes authFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes authGlow { 0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.05); } 50% { box-shadow: 0 0 60px rgba(212,175,55,0.15); } }
                @keyframes authFloat0 { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-30px) translateX(10px); } }
                @keyframes authFloat1 { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(20px) translateX(-15px); } }
                @keyframes authFloat2 { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-15px) translateX(-8px); } }
                input::placeholder { color: rgba(255,255,255,0.2) !important; }
                input:focus { outline: none; }
            `}</style>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem',
    paddingLeft: '2.5rem',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    color: '#e8dcc8',
    fontSize: '0.88rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
    boxSizing: 'border-box'
};
