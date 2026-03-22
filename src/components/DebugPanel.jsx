import React, { useState, useEffect, useRef } from 'react';
import { CombatLogger } from '../utils/logger';
import { supabase } from '../supabaseClient';

export const DebugPanel = ({ onTestCombat, session, character, profile }) => {
    const [logs, setLogs] = useState([]);
    const [visible, setVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('logs'); // 'logs' | 'report'
    const [reportText, setReportText] = useState('');
    const [screenshots, setScreenshots] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (visible) {
            const interval = setInterval(() => {
                setLogs(CombatLogger.getLogs().slice(-50)); // Last 50 logs
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [visible]);

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + screenshots.length > 5) {
            alert('Maximum 5 screenshots allowed');
            return;
        }
        
        const validFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                alert(`${file.name} n'est pas une image`);
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name} est trop grand (max 5MB)`);
                return false;
            }
            return true;
        });

        setScreenshots(prev => [...prev, ...validFiles].slice(0, 5));
    };

    const removeScreenshot = (index) => {
        setScreenshots(prev => prev.filter((_, i) => i !== index));
    };

    const uploadScreenshots = async () => {
        const uploadedUrls = [];
        
        for (const file of screenshots) {
            const fileName = `bugreports/${Date.now()}_${Math.random().toString(36).substring(7)}_${file.name}`;
            
            try {
                const { data, error } = await supabase.storage
                    .from('bug-reports')
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: false
                    });
                
                if (error) {
                    console.error('Upload error:', error);
                    if (error.message?.includes('Bucket not found')) {
                        alert('Erreur: Le bucket de stockage "bug-reports" n\'existe pas. Veuillez exécuter: node scripts/setup-bug-reports-bucket.mjs');
                    }
                    continue;
                }
                
                const { data: { publicUrl } } = supabase.storage
                    .from('bug-reports')
                    .getPublicUrl(fileName);
                
                uploadedUrls.push(publicUrl);
            } catch (uploadErr) {
                console.error('Upload exception:', uploadErr);
            }
        }
        
        return uploadedUrls;
    };

    const handleSubmitReport = async () => {
        if (!reportText.trim() && screenshots.length === 0) {
            alert('Veuillez ajouter une description ou des screenshots');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Upload screenshots first
            const screenshotUrls = screenshots.length > 0 ? await uploadScreenshots() : [];

            // Get recent logs
            const recentLogs = CombatLogger.getLogs().slice(-100);

            // Prepare report data
            const reportData = {
                session_id: session?.id || null,
                player_id: character?.id || profile?.id || null,
                player_name: character?.name || profile?.name || 'Anonymous',
                description: reportText.trim(),
                screenshots: screenshotUrls,
                logs: recentLogs,
                user_agent: navigator.userAgent,
                url: window.location.href,
                timestamp: new Date().toISOString(),
                status: 'open'
            };

            // Submit to Supabase
            console.log('Submitting bug report:', reportData);
            const { error } = await supabase
                .from('bug_reports')
                .insert(reportData);

            if (error) {
                console.error('Supabase insert error:', error);
                throw new Error(`Insert failed: ${error.message || JSON.stringify(error)}`);
            }

            setSubmitStatus('success');
            setReportText('');
            setScreenshots([]);
            
            // Reset success message after 3 seconds
            setTimeout(() => setSubmitStatus(null), 3000);
        } catch (err) {
            console.error('Error submitting report:', err);
            alert(`Erreur d'envoi: ${err.message}`);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!visible) {
        return (
            <button
                onClick={() => setVisible(true)}
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    zIndex: 99999,
                    padding: '12px 16px',
                    background: '#1a1a1a',
                    color: '#00ff00',
                    border: '2px solid #00ff00',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 0 15px rgba(0,255,0,0.5)'
                }}
            >
                📊 DEBUG
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            width: '650px',
            maxHeight: '500px',
            background: 'rgba(0, 0, 0, 0.98)',
            color: '#0f0',
            border: '2px solid #0f0',
            zIndex: 99999,
            fontFamily: 'monospace',
            fontSize: '12px',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header Tabs */}
            <div style={{
                display: 'flex',
                borderBottom: '1px solid #0f0',
                background: 'rgba(0,50,0,0.3)'
            }}>
                <button
                    onClick={() => setActiveTab('logs')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: activeTab === 'logs' ? 'rgba(0,255,0,0.2)' : 'transparent',
                        color: '#0f0',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        fontSize: '13px',
                        fontWeight: activeTab === 'logs' ? 'bold' : 'normal'
                    }}
                >
                    📋 Logs & Debug
                </button>
                <button
                    onClick={() => setActiveTab('report')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: activeTab === 'report' ? 'rgba(255,100,0,0.3)' : 'transparent',
                        color: '#ffaa00',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        fontSize: '13px',
                        fontWeight: activeTab === 'report' ? 'bold' : 'normal'
                    }}
                >
                    🐛 Signaler un Bug
                </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '10px' }}>
                {activeTab === 'logs' ? (
                    <>
                        <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button onClick={() => CombatLogger.exportLogs()} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                                💾 Export Logs
                            </button>
                            <button onClick={() => { CombatLogger.clear(); setLogs([]); }} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                                🗑️ Clear
                            </button>
                            <button onClick={onTestCombat} style={{
                                padding: '5px 10px',
                                cursor: 'pointer',
                                background: '#500',
                                color: '#fff',
                                border: '1px solid #f00'
                            }}>
                                ⚔️ Test Combat
                            </button>
                            <button onClick={() => setVisible(false)} style={{ padding: '5px 10px', cursor: 'pointer', marginLeft: 'auto' }}>
                                ❌ Fermer
                            </button>
                        </div>
                        <div>
                            {logs.map((log, i) => (
                                <div key={i} style={{ marginBottom: '5px', borderBottom: '1px solid #333', paddingBottom: '5px' }}>
                                    <div style={{ color: '#888' }}>{new Date(log.timestamp).toLocaleTimeString()}</div>
                                    <div style={{ color: '#0ff' }}>[{log.category}] {log.message}</div>
                                    {log.data && <pre style={{ color: '#ff0', fontSize: '10px', marginTop: '3px' }}>{log.data}</pre>}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div style={{ color: '#fff' }}>
                        <h3 style={{ color: '#ffaa00', margin: '0 0 15px 0', fontSize: '16px' }}>
                            🐛 Signaler un problème
                        </h3>
                        
                        <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '15px' }}>
                            Décrivez le bug rencontré et ajoutez des screenshots pour nous aider à le corriger rapidement.
                            Les logs récents seront automatiquement inclus.
                        </p>

                        {/* Screenshot Upload */}
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ color: '#0f0', display: 'block', marginBottom: '8px' }}>
                                📸 Screenshots ({screenshots.length}/5):
                            </label>
                            
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                                {screenshots.map((file, index) => (
                                    <div key={index} style={{
                                        position: 'relative',
                                        width: '80px',
                                        height: '80px',
                                        border: '1px solid #0f0',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Screenshot ${index + 1}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <button
                                            onClick={() => removeScreenshot(index)}
                                            style={{
                                                position: 'absolute',
                                                top: '2px',
                                                right: '2px',
                                                background: '#f00',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                
                                {screenshots.length < 5 && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            border: '2px dashed #0f0',
                                            background: 'transparent',
                                            color: '#0f0',
                                            cursor: 'pointer',
                                            fontSize: '24px',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                            
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                            
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{
                                        padding: '5px 10px',
                                        background: 'rgba(0,255,0,0.2)',
                                        color: '#0f0',
                                        border: '1px solid #0f0',
                                        cursor: 'pointer',
                                        fontSize: '11px'
                                    }}
                                >
                                    📁 Choisir des fichiers
                                </button>
                            </div>
                        </div>

                        {/* Description Text */}
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ color: '#0f0', display: 'block', marginBottom: '8px' }}>
                                📝 Description du problème:
                            </label>
                            <textarea
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                placeholder="Décrivez ce qui s'est passé, les étapes pour reproduire le bug, etc..."
                                style={{
                                    width: '100%',
                                    minHeight: '100px',
                                    background: 'rgba(0,0,0,0.5)',
                                    color: '#fff',
                                    border: '1px solid #0f0',
                                    padding: '8px',
                                    fontFamily: 'monospace',
                                    fontSize: '12px',
                                    resize: 'vertical',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>

                        {/* Submit Button */}
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button
                                onClick={handleSubmitReport}
                                disabled={isSubmitting || (!reportText.trim() && screenshots.length === 0)}
                                style={{
                                    padding: '10px 20px',
                                    background: isSubmitting ? '#666' : '#ffaa00',
                                    color: '#000',
                                    border: 'none',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    borderRadius: '4px',
                                    opacity: (!reportText.trim() && screenshots.length === 0) ? 0.5 : 1
                                }}
                            >
                                {isSubmitting ? '⏳ Envoi...' : '🚀 Envoyer le rapport'}
                            </button>
                            
                            <button
                                onClick={() => setVisible(false)}
                                style={{
                                    padding: '10px 15px',
                                    background: 'transparent',
                                    color: '#888',
                                    border: '1px solid #888',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    borderRadius: '4px'
                                }}
                            >
                                Annuler
                            </button>
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div style={{
                                marginTop: '15px',
                                padding: '10px',
                                background: 'rgba(0,255,0,0.2)',
                                border: '1px solid #0f0',
                                borderRadius: '4px',
                                color: '#0f0'
                            }}>
                                ✅ Rapport envoyé avec succès ! Merci pour votre aide.
                            </div>
                        )}
                        
                        {submitStatus === 'error' && (
                            <div style={{
                                marginTop: '15px',
                                padding: '10px',
                                background: 'rgba(255,0,0,0.2)',
                                border: '1px solid #f00',
                                borderRadius: '4px',
                                color: '#f00'
                            }}>
                                ❌ Erreur lors de l'envoi. Veuillez réessayer.
                            </div>
                        )}

                        {/* Info */}
                        <div style={{
                            marginTop: '20px',
                            padding: '10px',
                            background: 'rgba(0,100,255,0.1)',
                            border: '1px solid #00aaff',
                            borderRadius: '4px',
                            fontSize: '10px',
                            color: '#88ccff'
                        }}>
                            <strong>ℹ️ Informations incluses automatiquement:</strong><br />
                            • Logs des 100 dernières actions<br />
                            • Navigateur et version<br />
                            • URL de la page<br />
                            • Session ID et Player ID
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
