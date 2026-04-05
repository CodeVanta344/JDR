import React, { lazy, Suspense } from 'react';

const LoadingFallback: React.FC<{ message?: string }> = ({ message = 'Chargement...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    color: '#a0a0b0',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(212, 175, 55, 0.2)',
      borderTopColor: '#d4af37',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px',
    }} />
    <span>{message}</span>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// LazyCombatManager removed — replaced by CardCombat
export const LazyCharacterSheet = lazy(() => import('./CharacterSheet').then(m => ({ default: (m as any).CharacterSheet ?? m.default })));
export const LazyInventory = lazy(() => import('./InventoryPanel').then(m => ({ default: (m as any).InventoryPanel ?? m.default })));
export const LazyQuestTracker = lazy(() => import('./QuestTracker'));
export const LazyNotesSystem = lazy(() => import('./NotesSystem'));
export const LazyTutorial = lazy(() => import('./Tutorial'));
export const LazyNPCDialog = lazy(() => import('./NPCDialogueModal').then(m => ({ default: (m as any).NPCDialogueModal ?? m.default })));
export const LazyMerchantShop = lazy(() => import('./MerchantModal').then(m => ({ default: (m as any).MerchantPanel ?? m.default })));
export const LazyCodexPanel = lazy(() => import('./CodexPanel').then(m => ({ default: (m as any).CodexPanel ?? m.default })));
export const LazyDMPanel = lazy(() => import('./DMPanel').then(m => ({ default: (m as any).DMPanel ?? m.default })));
export const LazyCharacterCreation = lazy(() => import('./CharacterCreation').then(m => ({ default: (m as any).CharacterCreation ?? m.default })));
export const LazySessionLobby = lazy(() => import('./SessionLobby').then(m => ({ default: (m as any).SessionLobby ?? m.default })));
export const LazyMerchantModal = lazy(() => import('./MerchantModal').then(m => ({ default: (m as any).MerchantModal ?? m.default })));
export const LazyTradeModal = lazy(() => import('./TradeModal').then(m => ({ default: (m as any).TradeModal ?? m.default })));
export const LazyDebugPanel = lazy(() => import('./DebugPanel').then(m => ({ default: (m as any).DebugPanel ?? m.default })));
export const LazyVoiceChatPanel = lazy(() => import('./VoiceChatPanel').then(m => ({ default: (m as any).VoiceChatPanel ?? m.default })));

interface LazyWrapperProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallbackMessage 
}) => (
  <Suspense fallback={<LoadingFallback message={fallbackMessage} />}>
    {children}
  </Suspense>
);

export const withLazyLoading = <P extends object>(
  LazyComponent: React.LazyExoticComponent<React.ComponentType<P>>,
  fallbackMessage?: string
) => {
  return function LazyLoadedComponent(props: P) {
    return (
      <LazyWrapper fallbackMessage={fallbackMessage}>
        <LazyComponent {...props} />
      </LazyWrapper>
    );
  };
};

export default LoadingFallback;
