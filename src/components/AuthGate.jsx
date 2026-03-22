import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function AuthGate({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // DEV AUTO-LOGIN: auto sign-in in development
    useEffect(() => {
        if (import.meta.env.DEV && import.meta.env.VITE_DEV_BYPASS === 'true') {
            supabase.auth.getSession().then(async ({ data: { session } }) => {
                if (session?.user) {
                    setUser(session.user);
                    setLoading(false);
                } else {
                    const devEmail = import.meta.env.VITE_DEV_EMAIL;
                    const devPwd = import.meta.env.VITE_DEV_PWD;
                    // Try sign in first
                    let res = await supabase.auth.signInWithPassword({ email: devEmail, password: devPwd });
                    if (res.error) {
                        // Try signup then immediate sign in
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

    // Loading state
    if (loading) {
        return (
            <div style={{
                position: 'fixed', inset: 0,
                background: '#0a0b0e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1.5rem'
            }}>
                <div style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    color: '#fff',
                    fontFamily: 'var(--font-display, "Cinzel", serif)',
                    letterSpacing: '8px',
                    textShadow: '0 0 40px rgba(229,192,109,0.3)'
                }}>
                    AETHELGARD
                </div>
                <div style={{
                    width: '120px', height: '2px',
                    background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
                <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
            </div>
        );
    }

    // Authenticated — render the app
    if (user) {
        return typeof children === 'function' ? children(user) : children;
    }

    // Auth form
    return (
        <div style={{
            position: 'fixed', inset: 0,
            background: '#0a0b0e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-body, "Inter", sans-serif)'
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '8px',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                width: '90%',
                maxWidth: '420px',
                boxShadow: '0 0 60px rgba(0,0,0,0.5)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        fontSize: '0.7rem', color: 'rgba(212,175,55,0.6)',
                        letterSpacing: '4px', marginBottom: '0.5rem'
                    }}>TALES FROM THE VOID</div>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        color: '#fff',
                        fontFamily: 'var(--font-display, "Cinzel", serif)',
                        letterSpacing: '6px',
                        textShadow: '0 0 30px rgba(229,192,109,0.2)',
                        margin: 0
                    }}>AETHELGARD</h1>
                    <div style={{
                        width: '80px', height: '1px',
                        background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                        margin: '0.8rem auto'
                    }}></div>
                </div>

                {/* Mode Toggle */}
                <div style={{
                    display: 'flex', gap: '0', marginBottom: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    {['login', 'signup'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => { setAuthMode(mode); setError(''); }}
                            style={{
                                flex: 1, padding: '0.7rem',
                                background: authMode === mode ? 'rgba(212,175,55,0.15)' : 'transparent',
                                border: 'none', cursor: 'pointer',
                                color: authMode === mode ? '#d4af37' : 'rgba(255,255,255,0.4)',
                                fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 'bold',
                                transition: 'all 0.2s'
                            }}
                        >
                            {mode === 'login' ? 'CONNEXION' : 'INSCRIPTION'}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {authMode === 'signup' && (
                        <input
                            type="text"
                            placeholder="Nom d'aventurier"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            style={inputStyle}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        style={inputStyle}
                    />

                    {error && (
                        <div style={{
                            padding: '0.6rem 1rem', borderRadius: '4px',
                            background: 'rgba(255,68,68,0.1)',
                            border: '1px solid rgba(255,68,68,0.3)',
                            color: '#ff6666', fontSize: '0.8rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            padding: '1rem',
                            background: submitting ? 'rgba(212,175,55,0.2)' : 'linear-gradient(135deg, #d4af37, #e5c06d)',
                            border: 'none', borderRadius: '4px',
                            color: submitting ? 'rgba(0,0,0,0.5)' : '#000',
                            fontWeight: 'bold', fontSize: '0.9rem',
                            letterSpacing: '2px', cursor: submitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: submitting ? 'none' : '0 0 20px rgba(212,175,55,0.2)'
                        }}
                    >
                        {submitting ? '...' : (authMode === 'login' ? 'ENTRER DANS LE MONDE' : 'FORGER MON DESTIN')}
                    </button>
                </form>

                <div style={{
                    marginTop: '1.5rem', textAlign: 'center',
                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '1px'
                }}>
                    © 2026 AETHELGARD ENGINE
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: '0.8rem 1rem',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    color: '#e5c06d',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
    letterSpacing: '1px'
};
