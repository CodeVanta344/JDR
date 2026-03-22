import { useEffect, useState, useCallback } from 'react';

let swRegistration = null;
let onUpdateCallback = null;

export function setOnUpdateCallback(callback) {
    onUpdateCallback = callback;
}

export function usePWAUpdate() {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [updatePending, setUpdatePending] = useState(false);

    const applyUpdate = useCallback(() => {
        if (swRegistration && swRegistration.waiting) {
            // Send message to SW to skip waiting
            swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
            setUpdatePending(true);
        }
        // Fallback: force reload after a short delay if SW doesn't respond
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }, []);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            // Register callback for when update is found
            setOnUpdateCallback(() => {
                setUpdateAvailable(true);
            });

            // Listen for controller change (new SW activated)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (updatePending) {
                    // Reload to apply new version
                    window.location.reload();
                }
            });

            // Check for updates periodically
            const checkInterval = setInterval(() => {
                if (swRegistration) {
                    swRegistration.update().catch(() => {
                        // Silently fail
                    });
                }
            }, 60000); // Check every minute

            return () => clearInterval(checkInterval);
        }
    }, [updatePending]);

    return { updateAvailable, updatePending, applyUpdate };
}

// Initialize SW registration reference
export function setSWRegistration(reg) {
    swRegistration = reg;
    
    // Listen for new waiting SW
    if (reg) {
        reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        if (onUpdateCallback) {
                            onUpdateCallback();
                        }
                    }
                });
            }
        });
    }
}
