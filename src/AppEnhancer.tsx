import React, { useEffect, useCallback, useState, Suspense, lazy } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConnectionStatus } from './components/ConnectionStatus';
import { useTutorial } from './components/Tutorial';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { useGameStore } from './store/gameStore';
import { useKeyboardShortcuts, DEFAULT_GAME_SHORTCUTS } from './hooks/useKeyboardShortcuts';
import { useReconnection } from './hooks/useReconnection';
import './styles/responsive.css';

const QuestTracker = lazy(() => import('./components/QuestTracker'));
const NotesSystem = lazy(() => import('./components/NotesSystem'));

interface AppEnhancerProps {
  children: React.ReactNode;
}

export const AppEnhancer: React.FC<AppEnhancerProps> = ({ children }) => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  
  const { TutorialOverlay, startTutorial, resetTutorial } = useTutorial();
  const { setShowSettings } = useGameStore();

  useReconnection({
    onReconnect: () => console.log('Reconnected to server'),
    onDisconnect: () => console.log('Disconnected from server'),
  });

  const shortcuts = DEFAULT_GAME_SHORTCUTS.map(shortcut => ({
    ...shortcut,
    action: () => {
      switch (shortcut.key.toLowerCase()) {
        case 'f1':
          setShowShortcuts(prev => !prev);
          break;
        case 'n':
          setShowNotes(prev => !prev);
          break;
        case 'j':
          setShowQuests(prev => !prev);
          break;
        case 'escape':
          setShowShortcuts(false);
          setShowNotes(false);
          setShowQuests(false);
          break;
      }
    },
  }));

  useKeyboardShortcuts({
    shortcuts,
    enabled: true,
  });

  return (
    <ErrorBoundary>
      <div className="app-container">
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'rgba(0,0,0,0.3)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}>
          <ConnectionStatus showDetails />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowQuests(true)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                background: 'transparent',
                color: '#d4af37',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Quêtes [J]
            </button>
            <button
              onClick={() => setShowNotes(true)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                background: 'transparent',
                color: '#d4af37',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Notes [N]
            </button>
            <button
              onClick={() => setShowShortcuts(true)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#a0a0b0',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              [F1]
            </button>
            <button
              onClick={resetTutorial}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#a0a0b0',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Tutoriel
            </button>
          </div>
        </header>

        <main style={{ flex: 1, overflow: 'hidden' }}>
          {children}
        </main>

        {TutorialOverlay}

        <KeyboardShortcutsHelp 
          isOpen={showShortcuts} 
          onClose={() => setShowShortcuts(false)} 
        />

        {showNotes && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.8)',
          }}
            onClick={() => setShowNotes(false)}
          >
            <div onClick={e => e.stopPropagation()}>
              <Suspense fallback={<div>Chargement...</div>}>
                <NotesSystem onClose={() => setShowNotes(false)} />
              </Suspense>
            </div>
          </div>
        )}

        {showQuests && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.8)',
          }}
            onClick={() => setShowQuests(false)}
          >
            <div onClick={e => e.stopPropagation()}>
              <Suspense fallback={<div>Chargement...</div>}>
                <QuestTracker onQuestSelect={() => {}} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default AppEnhancer;
