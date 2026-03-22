import { useState } from 'react';

// Developer authentication hook - credentials from environment variables
const DEV_ID = import.meta.env.VITE_DEV_ID || null;
const DEV_PASSWORD = import.meta.env.VITE_DEV_PASSWORD || null;

export function useDeveloperAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('dev_auth') === 'true';
    });

    const login = (id, password) => {
        if (!DEV_ID || !DEV_PASSWORD) return false; // No dev access if env vars not set
        if (id === DEV_ID && password === DEV_PASSWORD) {
            sessionStorage.setItem('dev_auth', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('dev_auth');
        setIsAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
}
