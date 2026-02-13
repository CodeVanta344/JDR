// ============================================================
// LIFEPATH WIZARD - Interface Création Personnage Enrichie
// Navigation par étapes avec sélections multiples
// ============================================================

import React, { useState, useEffect, useMemo } from 'react';
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
  onUpdate?: (effects: AccumulatedEffects) => void;
  onCancel?: () => void;
  hideSidebar?: boolean;
}

export const LifePathWizard: React.FC<Props> = ({ onComplete, onUpdate, onCancel, hideSidebar = false }) => {
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

  // Mapping étapes -> sous-étapes COMPLET
  const subStepsMap: Record<WizardStep, string[]> = {
    birth: ['location', 'socialStatus', 'omen'],
    childhood: ['family', 'education', 'trauma'],
    adolescence: ['training', 'exploit', 'encounter'],
    youngAdult: ['profession', 'motivation', 'connection']
  };

  const subStepLabels: Record<string, string> = {
    location: 'Lieu de Naissance',
    socialStatus: 'Statut Social',
    omen: 'Augure',
    family: 'Famille',
    education: 'Éducation',
    trauma: 'Événement de Jeunesse',
    training: 'Apprentissage',
    exploit: 'Premier Exploit',
    encounter: 'Rencontre Marquant',
    profession: 'Métier & Occupation',
    motivation: 'Motivation',
    connection: 'Relation de Passé'
  };

  // Charger options pour sous-étape actuelle
  useEffect(() => {
    loadOptions();
  }, [currentStep, currentSubStep]);

  // Recalculer effets à chaque sélection
  useEffect(() => {
    // On peut accumuler même si incomplet pour le feedback visuel (sidebars)
    const accumulated = accumulateEffects(selection as LifepathSelection);
    setEffects(accumulated);

    if (onUpdate) {
      onUpdate(accumulated);
    }
  }, [selection, onUpdate]);

  // Groupement des options par sous-catégorie
  const groupedOptions = useMemo(() => {
    const groups: Record<string, LifeChoice[]> = {};
    options.forEach(opt => {
      const cat = opt.subCategory || 'Autres';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(opt);
    });
    return groups;
  }, [options]);

  const loadOptions = async () => {
    setLoading(true);
    try {
      const category = subStepsMap[currentStep][currentSubStep];
      let fetched: LifeChoice[] = [];

      // Dynamic import selon catégorie
      switch (category) {
        case 'location':
          const { BIRTH_LOCATIONS } = await import('../../lore/character-creation/lifepath/birth/locations');
          fetched = BIRTH_LOCATIONS;
          break;
        case 'socialStatus':
          const { SOCIAL_STATUSES } = await import('../../lore/character-creation/lifepath/birth/social-status');
          fetched = SOCIAL_STATUSES;
          break;
        case 'omen':
          const { OMENS } = await import('../../lore/character-creation/lifepath/birth/omens');
          fetched = OMENS;
          break;
        case 'family':
          const { FAMILIES } = await import('../../lore/character-creation/lifepath/childhood/families');
          fetched = FAMILIES;
          break;
        case 'education':
          const { EDUCATIONS } = await import('../../lore/character-creation/lifepath/childhood/education');
          fetched = EDUCATIONS;
          break;
        case 'trauma':
          const { TRAUMAS } = await import('../../lore/character-creation/lifepath/childhood/traumas');
          fetched = TRAUMAS;
          break;
        case 'training':
          const { TRAININGS } = await import('../../lore/character-creation/lifepath/adolescence/training');
          fetched = TRAININGS;
          break;
        case 'exploit':
          const { EXPLOITS } = await import('../../lore/character-creation/lifepath/adolescence/exploits');
          fetched = EXPLOITS;
          break;
        case 'encounter':
          const { ENCOUNTERS } = await import('../../lore/character-creation/lifepath/adolescence/encounters');
          fetched = ENCOUNTERS;
          break;
        case 'profession':
          const { PROFESSIONS } = await import('../../lore/character-creation/lifepath/young-adult/professions');
          fetched = PROFESSIONS;
          break;
        case 'motivation':
          const { MOTIVATIONS } = await import('../../lore/character-creation/lifepath/young-adult/motivations');
          fetched = MOTIVATIONS;
          break;
        case 'connection':
          const { CONNECTIONS } = await import('../../lore/character-creation/lifepath/young-adult/connections');
          fetched = CONNECTIONS;
          break;
        default:
          fetched = [];
      }

      setOptions(fetched);
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
    const subSteps = subStepsMap[currentStep];

    // Aller à la sous-étape suivante si disponible
    if (currentSubStep < subSteps.length - 1) {
      setCurrentSubStep(prev => prev + 1);
      return;
    }

    // Sinon aller à la phase suivante
    const steps: WizardStep[] = ['birth', 'childhood', 'adolescence', 'youngAdult'];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setCurrentSubStep(0);
    } else if (isLifepathComplete(selection as LifepathSelection)) {
      onComplete(accumulateEffects(selection as LifepathSelection));
    }
  };

  const handleBack = () => {
    // Revenir à la sous-étape précédente si disponible
    if (currentSubStep > 0) {
      setCurrentSubStep(prev => prev - 1);
      return;
    }

    // Sinon revenir à la phase précédente
    const steps: WizardStep[] = ['birth', 'childhood', 'adolescence', 'youngAdult'];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      setCurrentStep(prevStep);
      setCurrentSubStep(subStepsMap[prevStep].length - 1);
    } else if (onCancel) {
      onCancel();
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
      <div className="wizard-content-wrapper">
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

            {/* Sous-navigation par tabs */}
            <div className="wizard-sub-nav">
              {subStepsMap[currentStep].map((sub, idx) => {
                const categoryKey = sub;
                const isSelected = (selection[currentStep] as any)?.[categoryKey];
                return (
                  <button
                    key={sub}
                    className={`sub-nav-item ${currentSubStep === idx ? 'active' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => isSelected || idx <= currentSubStep ? setCurrentSubStep(idx) : null}
                  >
                    {subStepLabels[sub]}
                  </button>
                );
              })}
            </div>

            <div className="wizard-subtitle">
              ACTE {['birth', 'childhood', 'adolescence', 'youngAdult'].indexOf(currentStep) + 1}
            </div>

            <h2 className="wizard-title">
              {subStepLabels[currentCategory]}
            </h2>
          </div>

          {/* Grille Options Groupées */}
          {loading ? (
            <div className="wizard-loading">
              <div className="spinner" />
              <p>Chargement des options...</p>
            </div>
          ) : (
            <div className="wizard-options-container">
              {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                <div key={category} className="option-category-group">
                  {category !== 'Autres' && (
                    <div className="category-header-wrap">
                      <h3 className="category-header">{category}</h3>
                      <div className="category-line" />
                    </div>
                  )}
                  <div className="wizard-options">
                    {categoryOptions.map(option => (
                      <LifeChoiceCard
                        key={option.id}
                        choice={option}
                        selected={currentSelection?.id === option.id}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="lifepath-footer">
          <div className="footer-left">
            {onCancel && (
              <button onClick={onCancel} className="btn-tertiary">
                ← Retour
              </button>
            )}
          </div>

          <div className="footer-right" style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleBack} className="btn-secondary" disabled={currentStep === 'birth'}>
              Précédent
            </button>

            <button onClick={handleNext} className="btn-primary" disabled={!canProceed}>
              {currentStep === 'youngAdult' ? 'Terminer' : 'Suivant →'}
            </button>
          </div>
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
      <div className="choice-content-main">
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
      </div>

      <div className="choice-side-content">
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
    </div>
  );
};
