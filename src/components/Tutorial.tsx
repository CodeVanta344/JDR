import React, { useState, useCallback, useEffect } from 'react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Bienvenue en Aethelgard !',
    content: 'Ce tutoriel vous guidera à travers les bases du jeu. Vous pouvez le passer à tout moment en cliquant sur "Passer".',
    position: 'center',
  },
  {
    id: 'character',
    title: 'Votre Personnage',
    content: 'En haut à gauche, vous trouverez les informations de votre personnage : nom, classe, niveau, et points de vie. Gardez un œil sur votre santé !',
    target: '.player-info',
    position: 'right',
  },
  {
    id: 'chat',
    title: 'Communication',
    content: 'Le chat principal est votre moyen de communication avec le Maître du Jeu (MJ) et les autres joueurs. Tapez vos actions et dialogues ici.',
    target: '.chat-input',
    position: 'top',
  },
  {
    id: 'actions',
    title: 'Actions de Jeu',
    content: 'Décrivez vos actions en texte libre. Par exemple : "Je fouille la pièce" ou "Je parle au tavernier". Le MJ répondra à vos actions.',
    position: 'center',
  },
  {
    id: 'combat',
    title: 'Combat',
    content: 'Quand un combat commence, une grille tactique apparaît. Déplacez votre personnage et utilisez vos capacités pour vaincre vos ennemis.',
    target: '.combat-area',
    position: 'left',
  },
  {
    id: 'inventory',
    title: 'Inventaire',
    content: 'Appuyez sur [I] pour ouvrir votre inventaire. Vous y trouverez vos objets, équipements et ressources.',
    position: 'center',
    action: 'Essayez maintenant : appuyez sur [I]',
  },
  {
    id: 'quests',
    title: 'Journal de Quêtes',
    content: 'Appuyez sur [J] pour voir vos quêtes actives. Le journal garde trace de vos missions et objectifs.',
    position: 'center',
    action: 'Essayez maintenant : appuyez sur [J]',
  },
  {
    id: 'notes',
    title: 'Système de Notes',
    content: 'Appuyez sur [N] pour prendre des notes. Gardez trace des informations importantes : noms, lieux, indices...',
    position: 'center',
    action: 'Essayez maintenant : appuyez sur [N]',
  },
  {
    id: 'shortcuts',
    title: 'Raccourcis Clavier',
    content: 'Appuyez sur [F1] à tout moment pour voir tous les raccourcis clavier disponibles.',
    position: 'center',
  },
  {
    id: 'complete',
    title: 'Prêt pour l\'aventure !',
    content: 'Vous avez terminé le tutoriel. Que les dieux d\'Aethelgard veillent sur votre voyage. Bonne aventure !',
    position: 'center',
  },
];

interface TutorialOverlayProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const step = TUTORIAL_STEPS[currentStep];

  const handleNext = useCallback(() => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsVisible(false);
      localStorage.setItem('jdr_tutorial_completed', 'true');
      onComplete();
    }
  }, [currentStep, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem('jdr_tutorial_completed', 'true');
    onSkip?.();
  }, [onSkip]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious, handleSkip]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1c1d22 0%, #0a0b0e 100%)',
        borderRadius: '16px',
        border: '2px solid rgba(212, 175, 55, 0.5)',
        padding: '32px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 0 60px rgba(212, 175, 55, 0.2)',
        animation: 'fadeIn 0.3s ease-out',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}>
          <span style={{
            fontSize: '12px',
            color: '#606070',
          }}>
            Étape {currentStep + 1} / {TUTORIAL_STEPS.length}
          </span>
          <button
            onClick={handleSkip}
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: '#a0a0b0',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Passer le tutoriel
          </button>
        </div>

        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          marginBottom: '24px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #d4af37 0%, #8a6d3b 100%)',
            transition: 'width 0.3s ease',
          }} />
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
          }}>
            {currentStep === 0 ? '⚔️' :
             currentStep === TUTORIAL_STEPS.length - 1 ? '🏆' :
             '📖'}
          </div>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '24px',
            color: '#d4af37',
            marginBottom: '16px',
          }}>
            {step.title}
          </h2>
          <p style={{
            color: '#a0a0b0',
            lineHeight: '1.6',
            fontSize: '14px',
          }}>
            {step.content}
          </p>
          {step.action && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: 'rgba(212, 175, 55, 0.1)',
              borderRadius: '8px',
              border: '1px dashed rgba(212, 175, 55, 0.3)',
            }}>
              <span style={{ color: '#d4af37', fontSize: '13px' }}>
                {step.action}
              </span>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
        }}>
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#a0a0b0',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Précédent
            </button>
          )}
          <button
            onClick={handleNext}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #d4af37 0%, #8a6d3b 100%)',
              color: '#0a0b0e',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
            }}
          >
            {currentStep === TUTORIAL_STEPS.length - 1 ? 'Commencer' : 'Suivant'}
          </button>
        </div>

        <div style={{
          marginTop: '16px',
          textAlign: 'center',
          color: '#606070',
          fontSize: '11px',
        }}>
          Utilisez les flèches ← → ou Entrée pour naviguer
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('jdr_tutorial_completed');
    if (!completed) {
      const timer = setTimeout(() => setShowTutorial(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTutorial = useCallback(() => {
    setShowTutorial(true);
  }, []);

  const completeTutorial = useCallback(() => {
    setShowTutorial(false);
  }, []);

  const resetTutorial = useCallback(() => {
    localStorage.removeItem('jdr_tutorial_completed');
    setShowTutorial(true);
  }, []);

  return {
    showTutorial,
    startTutorial,
    completeTutorial,
    resetTutorial,
    TutorialOverlay: showTutorial ? (
      <TutorialOverlay
        onComplete={completeTutorial}
        onSkip={completeTutorial}
      />
    ) : null,
  };
};

export default TutorialOverlay;
