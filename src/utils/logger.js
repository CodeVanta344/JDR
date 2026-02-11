// Combat Logger - Stores logs in localStorage for debugging

const MAX_LOGS = 1000;
const LOG_KEY = 'combat_debug_logs';

export const CombatLogger = {
    log: (category, message, data = null) => {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            category,
            message,
            data: data ? JSON.stringify(data, null, 2) : null
        };

        // Console log (always)
        console.log(`[${category}] ${message}`, data || '');

        // Store in localStorage
        try {
            const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
            logs.push(logEntry);
            
            // Keep only last MAX_LOGS entries
            if (logs.length > MAX_LOGS) {
                logs.shift();
            }
            
            localStorage.setItem(LOG_KEY, JSON.stringify(logs));
        } catch (e) {
            console.error('Failed to store log:', e);
        }
    },

    getLogs: () => {
        try {
            return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
        } catch (e) {
            return [];
        }
    },

    exportLogs: () => {
        const logs = CombatLogger.getLogs();
        const text = logs.map(l => 
            `[${l.timestamp}] [${l.category}] ${l.message}${l.data ? '\n' + l.data : ''}`
        ).join('\n\n');
        
        // Download as file
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `combat-logs-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    },

    clear: () => {
        localStorage.removeItem(LOG_KEY);
    }
};

// Expose globally for debugging
if (typeof window !== 'undefined') {
    window.CombatLogger = CombatLogger;
}
