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

export const LazyCombatManager = lazy(() => import('./CombatManager'));
export const LazyCharacterSheet = lazy(() => import('./CharacterSheet'));
export const LazyInventory = lazy(() => import('./Inventory'));
export const LazyQuestTracker = lazy(() => import('./QuestTracker'));
export const LazyNotesSystem = lazy(() => import('./NotesSystem'));
export const LazyTutorial = lazy(() => import('./Tutorial'));
export const LazyNPCDialog = lazy(() => import('./NPCDialog'));
export const LazyMerchantShop = lazy(() => import('./MerchantShop'));

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
