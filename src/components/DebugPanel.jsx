import React, { useState, useEffect } from 'react';
import { CombatLogger } from '../utils/logger';

export const DebugPanel = ({ onTestCombat }) => {
    const [logs, setLogs] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            const interval = setInterval(() => {
                setLogs(CombatLogger.getLogs().slice(-50)); // Last 50 logs
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [visible]);

    if (!visible) {
        return (
            <button
                onClick={() => setVisible(true)}
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    zIndex: 10000,
                    padding: '10px',
                    background: '#333',
                    color: '#0f0',
                    border: '1px solid #0f0',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
                }}
            >
                📊 Debug Logs
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            width: '600px',
            height: '400px',
            background: 'rgba(0, 0, 0, 0.95)',
            color: '#0f0',
            border: '2px solid #0f0',
            zIndex: 10000,
            fontFamily: 'monospace',
            fontSize: '11px',
            padding: '10px',
            overflow: 'auto'
        }}>
            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={() => CombatLogger.exportLogs()} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                    💾 Export
                </button>
                <button onClick={() => { CombatLogger.clear(); setLogs([]); }} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                    🗑️ Clear
                </button>
                <button onClick={() => setVisible(false)} style={{ padding: '5px 10px', cursor: 'pointer', marginLeft: 'auto' }}>
                    ❌ Close
                </button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={onTestCombat} style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    background: '#500',
                    color: '#fff',
                    border: '1px solid #f00',
                    width: '100%'
                }}>
                    ⚔️ Test Combat (Custom Map)
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
        </div>
    );
};
