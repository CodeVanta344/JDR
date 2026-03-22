import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthGate } from './components/AuthGate'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'
 import './styles/global-scale.css'
import './styles/responsive.css'
import { setSWRegistration } from './hooks/usePWAUpdate'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <AuthGate>
                {(user) => <App user={user} />}
            </AuthGate>
        </ErrorBoundary>
    </React.StrictMode>,
)


// Register Service Worker with update handling
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('[PWA] Service Worker registered:', registration.scope)
                setSWRegistration(registration)
            })
            .catch(error => {
                console.log('[PWA] Service Worker registration failed:', error)
            })
    })
}
