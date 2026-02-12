// ============================================================
// LIFEPATH WIZARD - Interface Création Personnage Enrichie
// Navigation par étapes avec sélections multiples
// ============================================================

import React, { useState, useEffect } from 'react';
import type { LifepathSelection, LifeChoice, AccumulatedEffects } from '../../types/lore';
import { accumulateEffects, isLifepathComplete, preloadNextStage } from '../../lore/character-creation/lifepath';
import { EffectsSidebar } from './EffectsSidebar';
import './LifePathWizard.css';

type WizardStep = 'birth' | 'childhood' | 'adolescence' | 'youngAdult';
type SubStep = {
  birth: 'location' | 'status' | 'omen';
  childhood: 'family' | 'education' | 'trauma';
  adolescence: 'training' | 'exploit' | 'encounter';
  youngAdult: 'profession' | 'motivation' | 'connection';
};

interface Props {
  onComplete: (effects: AccumulatedEffects) => void;
  onCancel?: () => void;
  hideSidebar?: boolean;
}

export const LifePathWizard: React.FC<Props> = ({ onComplete, onCancel, hideSidebar = false }) => {
  // État navigation
  const [currentStep, setCurrentStep] = useState<WizardStep>('birth');
  const [currentSubStep, setCurrentSubStep] = useState<number>(0);

  // Sélections
  const [selection, setSelection] = useState<Partial<LifepathSelection>>({
    birth: {},
    childhood: {},
    adolescence: {},
    youngAdult: {}
  });

  // Options chargées
  const [options, setOptions] = useState<LifeChoice[]>([]);
  const [loading, setLoading] = useState(false);

  // Effets cumulés
  const [effects, setEffects] = useState<AccumulatedEffects | null>(null);

  // Mapping étapes -> sous-étapes (SIMPLIFIÉ : 1 choix par phase)
  const subStepsMap: Record<WizardStep, string[]> = {
    birth: ['location'],
    childhood: ['family'],
    adolescence: ['training'],
    youngAdult: ['profession']
  };

  const subStepLabels: Record<string, string> = {
    location: 'Origines et Naissance',
    family: 'Enfance',
    training: 'Adolescence',
    profession: 'Jeune Adulte'
  };

  // Charger options pour sous-étape actuelle
  useEffect(() => {
    loadOptions();
  }, [currentStep, currentSubStep]);

  // Recalculer effets à chaque sélection
  useEffect(() => {
    if (isLifepathComplete(selection as LifepathSelection)) {
      const accumulated = accumulateEffects(selection as LifepathSelection);
      setEffects(accumulated);
    }
  }, [selection]);

  const loadOptions = async () => {
    setLoading(true);
    try {
      const category = subStepsMap[currentStep][currentSubStep];
      let fetched: LifeChoice[] = [];

      // Dynamic import selon catégorie (SIMPLIFIÉ : 1 par phase)
      switch (category) {
        // Birth - Origines
        case 'location':
          const { BIRTH_LOCATIONS } = await import('../../lore/character-creation/lifepath/birth/locations');
          fetched = BIRTH_LOCATIONS;
          break;

        // Childhood - Enfance
        case 'family':
          const { FAMILIES } = await import('../../lore/character-creation/lifepath/childhood/families');
          fetched = FAMILIES;
          break;

        // Adolescence - Formation
        case 'training':
          const { TRAININGS } = await import('../../lore/character-creation/lifepath/adolescence/training');
          fetched = TRAININGS;
          break;

        // Young Adult - Profession
        case 'profession':
          const { PROFESSIONS } = await import('../../lore/character-creation/lifepath/young-adult/professions');
          fetched = PROFESSIONS;
          break;

        default:
          console.warn(`Catégorie inconnue : ${category}`);
          fetched = [];
      }

      setOptions(fetched);

      // Précharger étape suivante en background (plus besoin car 1 seul choix/phase)
      // if (currentSubStep === 0) {
      //   preloadNextStage(currentStep);
      // }
    } catch (error) {
      console.error('Erreur chargement options:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (choice: LifeChoice) => {
    const category = subStepsMap[currentStep][currentSubStep] as any;
    setSelection(prev => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [category]: choice
      }
    }));

    // SIMPLIFIÉ : Plus de sous-étapes, donc on ne fait rien ici
    // L'utilisateur clique sur "Suivant" pour passer à la phase suivante
  };

  const handleNext = () => {
    // SIMPLIFIÉ : 1 choix par phase, donc on passe directement à la phase suivante
    const steps: WizardStep[] = ['birth', 'childhood', 'adolescence', 'youngAdult'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setCurrentSubStep(0);
    } else if (isLifepathComplete(selection as LifepathSelection)) {
      // Terminé !
      onComplete(accumulateEffects(selection as LifepathSelection));
    }
  };

  const handleBack = () => {
    // SIMPLIFIÉ : Retour à la phase précédente
    const steps: WizardStep[] = ['birth', 'childhood', 'adolescence', 'youngAdult'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      setCurrentSubStep(0);
    }
  };

  const currentCategory = subStepsMap[currentStep][currentSubStep];
  const currentSelection = (selection[currentStep] as any)?.[currentCategory];
  const canProceed = !!currentSelection;

  return (
    <div className="lifepath-wizard">
      {/* Sidebar Effets */}
      {!hideSidebar && <EffectsSidebar selection={selection} />}

      {/* Zone Principale */}
      <div className="wizard-main">
        {/* Header Navigation */}
        <div className="wizard-header">
          <div className="wizard-progress">
            {['birth', 'childhood', 'adolescence', 'youngAdult'].map((step, idx) => (
              <div
                key={step}
                className={`progress-step ${currentStep === step ? 'active' : ''} ${['birth', 'childhood', 'adolescence', 'youngAdult'].indexOf(currentStep) > idx ? 'completed' : ''
                  }`}
              >
                <span className="step-tag">Phase 0{idx + 1}</span>
                <span className="step-label">
                  {step === 'birth' && 'Naissance'}
                  {step === 'childhood' && 'Enfance'}
                  {step === 'adolescence' && 'Adolescence'}
                  {step === 'youngAdult' && 'Jeune Adulte'}
                </span>
              </div>
            ))}
          </div>

          <div className="wizard-subtitle">
            ACTE {['birth', 'childhood', 'adolescence', 'youngAdult'].indexOf(currentStep) + 1} • {subStepLabels[currentCategory]}
          </div>

          <h2 className="wizard-title">
            {subStepLabels[currentCategory]}
          </h2>
        </div>

        {/* Grille Options */}
        {loading ? (
          <div className="wizard-loading">
            <div className="spinner" />
            <p>Chargement des options...</p>
          </div>
        ) : (
          <div className="wizard-options">
            {options.map(option => (
              <LifeChoiceCard
                key={option.id}
                choice={option}
                selected={currentSelection?.id === option.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="wizard-footer">
          <button onClick={handleBack} className="btn-secondary" disabled={currentStep === 'birth'}>
            ← Précédent
          </button>

          {onCancel && (
            <button onClick={onCancel} className="btn-tertiary">
              Annuler
            </button>
          )}

          <button onClick={handleNext} className="btn-primary" disabled={!canProceed}>
            {currentStep === 'youngAdult' ? 'Terminer' : 'Suivant →'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== CARTE OPTION =====
interface CardProps {
  choice: LifeChoice;
  selected: boolean;
  onSelect: (choice: LifeChoice) => void;
}

const LifeChoiceCard: React.FC<CardProps> = ({ choice, selected, onSelect }) => {
  return (
    <div
      className={`life-choice-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(choice)}
    >
      {/* Titre */}
      <h3 className="card-title">{choice.label}</h3>

      {/* Description courte */}
      <p className="card-desc">{choice.desc}</p>

      {/* Lore Citation */}
      {choice.detailed_lore.defining_moment && (
        <blockquote className="card-lore">
          "{choice.detailed_lore.defining_moment}"
        </blockquote>
      )}

      {/* Effets Stats */}
      <div className="card-effects">
        {Object.entries(choice.effects.stats).map(([stat, value]) => (
          value ? (
            <span key={stat} className="stat-tag bonus">
              +{value} {stat.toUpperCase().slice(0, 3)}
            </span>
          ) : null
        ))}
        {choice.effects.stats_penalty && Object.entries(choice.effects.stats_penalty).map(([stat, value]) => (
          value ? (
            <span key={stat} className="stat-tag malus">
              -{value} {stat.toUpperCase().slice(0, 3)}
            </span>
          ) : null
        ))}
      </div>

      {/* Traits Mécaniques */}
      {choice.effects.mechanical_traits.length > 0 && (
        <div className="card-traits">
          {choice.effects.mechanical_traits.slice(0, 2).map((trait, idx) => (
            <div key={idx} className="trait-item">
              <strong>{trait.name}</strong>: {trait.desc}
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="card-tags">
        {choice.tags.slice(0, 3).map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};
