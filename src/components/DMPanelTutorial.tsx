/**
 * DMPanelTutorial - Tutoriel interactif pour le Livre du MJ
 * S'affiche au premier lancement, accessible via le bouton "?"
 */

import React, { useState, useEffect, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface DMPanelTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TutorialStep {
  title: string;
  content: string[];
  icon: string;
  highlightArea?: 'sidebar' | 'navigation' | 'readAloud' | 'notes' | 'npcs' | 'dice' | 'choices' | 'combat' | 'map' | 'tools' | 'notesTab' | 'dungeons';
}

// ============================================================================
// TUTORIAL STEPS DATA
// ============================================================================

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Bienvenue, Ma\u00eetre du Jeu\u00a0!',
    icon: '\ud83d\udcda',
    content: [
      'Ce livre est votre compagnon pour mener les Chroniques d\u2019Aethelgard. Il contient tout le lore, les sc\u00e8nes, les PNJ, et les outils dont vous avez besoin.',
    ],
  },
  {
    title: 'La Table des Mati\u00e8res',
    icon: '\ud83d\udcd1',
    highlightArea: 'sidebar',
    content: [
      '\u00c0 gauche, la sidebar affiche les 5 Actes de la campagne avec tous leurs chapitres et sc\u00e8nes. Cliquez sur une sc\u00e8ne pour y naviguer directement.',
    ],
  },
  {
    title: 'Navigation entre Sc\u00e8nes',
    icon: '\u2b05\ufe0f\u27a1\ufe0f',
    highlightArea: 'navigation',
    content: [
      'Utilisez les boutons PR\u00c9C\u00c9DENT et SUIVANT pour naviguer s\u00e9quentiellement. La barre de status en haut montre votre position\u00a0: Acte, Chapitre, Sc\u00e8ne.',
    ],
  },
  {
    title: 'Le Texte \u00e0 Lire \u00e0 Voix Haute',
    icon: '\ud83d\udcd6',
    highlightArea: 'readAloud',
    content: [
      'Les encadr\u00e9s dor\u00e9s contiennent le texte narratif \u00e0 lire directement aux joueurs. Le badge en haut \u00e0 droite indique l\u2019ambiance (Quotidien, \u00c9pique, Sombre\u2026).',
      'Conseil\u00a0: Lisez lentement, avec le ton appropri\u00e9. Laissez des pauses dramatiques.',
    ],
  },
  {
    title: 'Les Notes du MJ',
    icon: '\ud83d\udcdd',
    highlightArea: 'notes',
    content: [
      'Les notes color\u00e9es sont pour VOUS uniquement, ne les lisez pas aux joueurs\u00a0:',
      '\ud83d\udcd8 Info \u2014 Contexte et explications',
      '\ud83d\udca1 Conseil \u2014 Suggestions de mise en sc\u00e8ne',
      '\u26a0\ufe0f Attention \u2014 Points importants \u00e0 ne pas oublier',
      '\ud83d\udd12 Secret \u2014 Informations cach\u00e9es, ne r\u00e9v\u00e9ler que si les joueurs cherchent',
      '\ud83d\udcdc Lore \u2014 Contexte historique approfondi',
    ],
  },
  {
    title: 'Les PNJ et Dialogues',
    icon: '\ud83c\udfad',
    highlightArea: 'npcs',
    content: [
      'Chaque sc\u00e8ne liste ses PNJ avec des dialogues pr\u00e9-\u00e9crits (Accueil, Info, Qu\u00eate, Adieu). Adaptez-les \u00e0 votre style, ils sont l\u00e0 comme guide.',
    ],
  },
  {
    title: 'Les Jets de Comp\u00e9tence',
    icon: '\ud83c\udfb2',
    highlightArea: 'dice',
    content: [
      'Les jets utilisent un d100. Cliquez \u00ab\u00a0LANCER\u00a0\u00bb pour simuler le jet. Le r\u00e9sultat compare le jet au CD (Classe de Difficult\u00e9). Les textes de Succ\u00e8s et \u00c9chec sont pr\u00e9-\u00e9crits.',
    ],
  },
  {
    title: 'Les Embranchements',
    icon: '\ud83d\udd00',
    highlightArea: 'choices',
    content: [
      'Les choix des joueurs m\u00e8nent \u00e0 diff\u00e9rentes sc\u00e8nes. Cliquez \u00ab\u00a0\u2192 Aller \u00e0 la sc\u00e8ne\u00a0\u00bb pour suivre le chemin choisi. Les cons\u00e9quences (r\u00e9putation, items) sont appliqu\u00e9es automatiquement.',
    ],
  },
  {
    title: 'Les Rencontres de Combat',
    icon: '\u2694\ufe0f',
    highlightArea: 'combat',
    content: [
      'Les sc\u00e8nes de combat listent les ennemis avec leurs stats (PV, CA, Attaque). Si le MJ IA est actif, le combat se d\u00e9clenche automatiquement avec les bons ennemis.',
    ],
  },
  {
    title: "L'Onglet Carte",
    icon: '\ud83d\uddfa\ufe0f',
    highlightArea: 'map',
    content: [
      "L'onglet CARTE affiche Aethelgard avec tous les lieux. La position actuelle est indiqu\u00e9e par la sc\u00e8ne en cours. Cliquez sur un lieu pour voir ses d\u00e9tails.",
    ],
  },
  {
    title: "L'Onglet Outils",
    icon: '\ud83e\uddf0',
    highlightArea: 'tools',
    content: [
      "OUTILS contient\u00a0: lanceur de d\u00e9s, g\u00e9n\u00e9rateur de noms, m\u00e9t\u00e9o, horloge du monde, tracker d'initiative, et le syst\u00e8me de r\u00e9putation des factions.",
    ],
  },
  {
    title: "L'Onglet Notes",
    icon: '\ud83d\udcdd',
    highlightArea: 'notesTab',
    content: [
      'NOTES est votre carnet personnel. Prenez des notes pendant la session, elles sont sauvegard\u00e9es automatiquement. Notez les d\u00e9cisions des joueurs, les PNJ improvis\u00e9s, les \u00e9v\u00e9nements impr\u00e9vus.',
    ],
  },
  {
    title: 'Les M\u00e9ga-Donjons',
    icon: '\ud83c\udff0',
    highlightArea: 'dungeons',
    content: [
      'Chaque acte contient un donjon optionnel (ex\u00a0: Catacombes de Sol-Aureus, Mines de Karak-Zhul). Ces chapitres sp\u00e9ciaux ont 10-12 salles interconnect\u00e9es avec boss, puzzles et tr\u00e9sors.',
    ],
  },
  {
    title: 'Conseils de Ma\u00eetre du Jeu',
    icon: '\u2728',
    content: [
      '\u2022 Ne pr\u00e9parez pas tout \u2014 improvisez\u00a0!',
      '\u2022 \u00c9coutez vos joueurs, adaptez l\u2019histoire',
      '\u2022 Les r\u00e8gles sont un guide, pas un carcan',
      '\u2022 Le fun prime sur tout',
      '\u2022 Utilisez les sc\u00e8nes bonus pour du contenu optionnel',
      'Bonne aventure, Ma\u00eetre\u00a0! Que les Sceaux tiennent bon.',
    ],
  },
];

// ============================================================================
// HIGHLIGHT AREA DESCRIPTIONS (visual indicator labels)
// ============================================================================

const HIGHLIGHT_LABELS: Record<string, string> = {
  sidebar: 'Sidebar gauche',
  navigation: 'Barre de navigation',
  readAloud: 'Encadr\u00e9 de lecture',
  notes: 'Notes color\u00e9es du MJ',
  npcs: 'Section PNJ',
  dice: 'Jets de comp\u00e9tence',
  choices: 'Embranchements narratifs',
  combat: 'Rencontres de combat',
  map: 'Onglet Carte',
  tools: 'Onglet Outils',
  notesTab: 'Onglet Notes',
  dungeons: 'Chapitres Donjons',
};

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20000,
    animation: 'tutorialFadeIn 0.4s ease',
  },
  container: {
    width: '680px',
    maxWidth: '92vw',
    maxHeight: '85vh',
    background: 'linear-gradient(145deg, #1a1a2e 0%, #0f1729 60%, #1a1020 100%)',
    border: '2px solid #8b7355',
    borderRadius: '16px',
    boxShadow: '0 0 60px rgba(212, 175, 55, 0.15), 0 25px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  header: {
    padding: '1.5rem 2rem 1rem',
    borderBottom: '1px solid rgba(139, 115, 85, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepCounter: {
    fontFamily: "'Cinzel', serif",
    fontSize: '0.85rem',
    color: '#d4af37',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },
  skipBtn: {
    background: 'none',
    border: '1px solid rgba(139, 115, 85, 0.4)',
    color: '#8b7355',
    padding: '0.35rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontFamily: "'Cinzel', serif",
    transition: 'all 0.2s',
  },
  body: {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.2rem',
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  stepIcon: {
    fontSize: '2.5rem',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(212, 175, 55, 0.1)',
    border: '2px solid rgba(212, 175, 55, 0.3)',
    borderRadius: '12px',
    flexShrink: 0,
  },
  stepTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: '1.5rem',
    color: '#f4e4c1',
    margin: 0,
    textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
  },
  contentBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.7rem',
  },
  paragraph: {
    fontFamily: "'Crimson Text', 'Georgia', serif",
    fontSize: '1.1rem',
    lineHeight: 1.7,
    color: '#c8b89a',
    margin: 0,
  },
  highlightBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.9rem',
    background: 'rgba(212, 175, 55, 0.12)',
    border: '1px solid rgba(212, 175, 55, 0.35)',
    borderRadius: '20px',
    color: '#d4af37',
    fontSize: '0.85rem',
    fontFamily: "'Cinzel', serif",
    marginTop: '0.3rem',
    alignSelf: 'flex-start' as const,
  },
  noteItem: {
    paddingLeft: '1rem',
    borderLeft: '3px solid rgba(212, 175, 55, 0.3)',
    color: '#a89880',
    fontFamily: "'Crimson Text', 'Georgia', serif",
    fontSize: '1.05rem',
    lineHeight: 1.6,
    margin: 0,
  },
  tipBox: {
    background: 'rgba(93, 255, 152, 0.06)',
    border: '1px solid rgba(93, 255, 152, 0.2)',
    borderRadius: '8px',
    padding: '0.7rem 1rem',
    color: '#7dcea0',
    fontFamily: "'Crimson Text', 'Georgia', serif",
    fontSize: '1rem',
    fontStyle: 'italic' as const,
  },
  footer: {
    padding: '1rem 2rem 1.5rem',
    borderTop: '1px solid rgba(139, 115, 85, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    display: 'flex',
    gap: '4px',
    flex: 1,
    marginRight: '1.5rem',
  },
  progressDot: (active: boolean, completed: boolean) => ({
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    background: active ? '#d4af37' : completed ? 'rgba(212, 175, 55, 0.5)' : 'rgba(139, 115, 85, 0.2)',
    transition: 'background 0.3s',
  }),
  navButtons: {
    display: 'flex',
    gap: '0.6rem',
    flexShrink: 0,
  },
  navBtn: (primary: boolean) => ({
    padding: '0.6rem 1.4rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Cinzel', serif",
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'all 0.2s',
    border: primary ? '2px solid #d4af37' : '1px solid rgba(139, 115, 85, 0.5)',
    background: primary ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0, 0, 0, 0.3)',
    color: primary ? '#d4af37' : '#8b7355',
  }),
  helpButton: {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #d4af37 0%, #8b7355 100%)',
    border: '2px solid #d4af37',
    color: '#1a1a2e',
    fontSize: '1.3rem',
    fontFamily: "'Cinzel', serif",
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
    zIndex: 19999,
    transition: 'all 0.2s',
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function DMPanelTutorial({ isOpen, onClose }: DMPanelTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = TUTORIAL_STEPS.length;
  const step = TUTORIAL_STEPS[currentStep];

  // Reset to first step when reopened
  useEffect(() => {
    if (isOpen) setCurrentStep(0);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (currentStep < totalSteps - 1) setCurrentStep(s => s + 1);
        else handleClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentStep > 0) setCurrentStep(s => s - 1);
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, currentStep, totalSteps]);

  const handleClose = useCallback(() => {
    localStorage.setItem('aethelgard-gm-tutorial-seen', 'true');
    onClose();
  }, [onClose]);

  const goNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(s => s + 1);
    else handleClose();
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  if (!isOpen) return null;

  // Determine if last content line is a "tip" (starts with "Conseil")
  const isTipLine = (line: string) => line.startsWith('Conseil');
  // Determine if a line is a note-style item (starts with emoji + keyword)
  const isNoteItem = (line: string) => /^[\u{1F4D8}\u{1F4A1}\u{26A0}\u{FE0F}\u{1F512}\u{1F4DC}\u2022]/u.test(line);

  return (
    <>
      {/* Global keyframe styles */}
      <style>{`
        @keyframes tutorialFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tutorialSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div style={styles.overlay} onClick={handleClose}>
        <div
          style={{
            ...styles.container,
            animation: 'tutorialSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.stepCounter}>
              \u00c9tape {currentStep + 1} / {totalSteps}
            </span>
            <button
              style={styles.skipBtn}
              onClick={handleClose}
              onMouseOver={e => {
                (e.target as HTMLElement).style.borderColor = '#d4af37';
                (e.target as HTMLElement).style.color = '#d4af37';
              }}
              onMouseOut={e => {
                (e.target as HTMLElement).style.borderColor = 'rgba(139, 115, 85, 0.4)';
                (e.target as HTMLElement).style.color = '#8b7355';
              }}
            >
              Passer le tutoriel
            </button>
          </div>

          {/* Body */}
          <div style={styles.body} key={currentStep}>
            {/* Icon + Title */}
            <div style={styles.iconRow}>
              <div style={styles.stepIcon}>{step.icon}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
            </div>

            {/* Highlight area indicator */}
            {step.highlightArea && (
              <div style={styles.highlightBadge}>
                <span style={{ fontSize: '0.75rem' }}>\ud83d\udd0d</span>
                {HIGHLIGHT_LABELS[step.highlightArea]}
              </div>
            )}

            {/* Content */}
            <div style={styles.contentBlock}>
              {step.content.map((line, i) => {
                if (isTipLine(line)) {
                  return <div key={i} style={styles.tipBox}>{line}</div>;
                }
                if (isNoteItem(line)) {
                  return <p key={i} style={styles.noteItem}>{line}</p>;
                }
                return <p key={i} style={styles.paragraph}>{line}</p>;
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            {/* Progress bar */}
            <div style={styles.progressBar}>
              {TUTORIAL_STEPS.map((_, i) => (
                <div
                  key={i}
                  style={styles.progressDot(i === currentStep, i < currentStep)}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div style={styles.navButtons}>
              {currentStep > 0 && (
                <button
                  style={styles.navBtn(false)}
                  onClick={goPrev}
                  onMouseOver={e => {
                    (e.target as HTMLElement).style.borderColor = '#d4af37';
                    (e.target as HTMLElement).style.color = '#d4af37';
                  }}
                  onMouseOut={e => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(139, 115, 85, 0.5)';
                    (e.target as HTMLElement).style.color = '#8b7355';
                  }}
                >
                  \u2190 Pr\u00e9c\u00e9dent
                </button>
              )}
              <button
                style={styles.navBtn(true)}
                onClick={goNext}
                onMouseOver={e => {
                  (e.target as HTMLElement).style.background = 'rgba(212, 175, 55, 0.3)';
                }}
                onMouseOut={e => {
                  (e.target as HTMLElement).style.background = 'rgba(212, 175, 55, 0.15)';
                }}
              >
                {currentStep < totalSteps - 1 ? 'Suivant \u2192' : 'Commencer \u2728'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// HELP BUTTON (to re-open tutorial)
// ============================================================================

export function TutorialHelpButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      style={styles.helpButton}
      onClick={onClick}
      title="Rouvrir le tutoriel du MJ"
      onMouseOver={e => {
        (e.target as HTMLElement).style.transform = 'scale(1.1)';
        (e.target as HTMLElement).style.boxShadow = '0 6px 25px rgba(212, 175, 55, 0.5)';
      }}
      onMouseOut={e => {
        (e.target as HTMLElement).style.transform = 'scale(1)';
        (e.target as HTMLElement).style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
      }}
    >
      ?
    </button>
  );
}

export default DMPanelTutorial;
