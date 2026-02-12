import React, { useState, useEffect } from 'react';
import {
    BIRTH_ORIGINS,
    CHILDHOOD_PATHS,
    ADOLESCENCE_PATHS,
    ADULT_PAST,
    calculateCumulativeEffects,
    type BirthOrigin,
    type ChildhoodPath,
    type AdolescencePath,
    type AdultPast,
    type LifePathStepOption
} from '../lore/lifepath-enriched';
import './LifePathBuilder.css';

interface LifePathBuilderProps {
    onComplete: (lifepathData: any) => void;
    onBack: () => void;
}

export function LifePathBuilder({ onComplete, onBack }: LifePathBuilderProps) {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
    const [selectedOrigin, setSelectedOrigin] = useState<BirthOrigin | null>(null);
    const [selectedChildhood, setSelectedChildhood] = useState<ChildhoodPath | null>(null);
    const [selectedAdolescence, setSelectedAdolescence] = useState<AdolescencePath | null>(null);
    const [selectedAdult, setSelectedAdult] = useState<AdultPast | null>(null);

    const canProgress = () => {
        switch (currentStep) {
            case 1: return selectedOrigin !== null;
            case 2: return selectedChildhood !== null;
            case 3: return selectedAdolescence !== null;
            case 4: return selectedAdult !== null;
        }
    };

    const handleNext = () => {
        if (currentStep < 4 && canProgress()) {
            setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
        } else if (currentStep === 4 && canProgress()) {
            // Calcul final et envoi
            const results = calculateCumulativeEffects(
                selectedOrigin!,
                selectedChildhood!,
                selectedAdolescence!,
                selectedAdult!
            );
            onComplete({
                origin: selectedOrigin,
                childhood: selectedChildhood,
                adolescence: selectedAdolescence,
                adult: selectedAdult,
                ...results
            });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
        } else {
            onBack();
        }
    };

    const renderStepIndicator = () => (
        <div className="lifepath-step-indicator">
            {[1, 2, 3, 4].map(step => (
                <div 
                    key={step} 
                    className={`step-dot ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                >
                    <span className="step-number">{step}</span>
                    <span className="step-label">
                        {step === 1 && 'Origine'}
                        {step === 2 && 'Enfance'}
                        {step === 3 && 'Adolescence'}
                        {step === 4 && 'Âge Adulte'}
                    </span>
                </div>
            ))}
        </div>
    );

    const renderStepTitle = () => {
        const titles = {
            1: { icon: '🏰', title: 'Votre Origine', subtitle: 'Où et comment êtes-vous né ?' },
            2: { icon: '👶', title: 'Votre Enfance', subtitle: 'Quelle a été votre famille et vos premiers souvenirs ?' },
            3: { icon: '🎓', title: 'Votre Adolescence', subtitle: 'Quelle formation avez-vous reçue et qui vous a formé ?' },
            4: { icon: '⚔️', title: 'Votre Passé Adulte', subtitle: 'Quelle profession aviez-vous et pourquoi l\'aventure maintenant ?' }
        };

        const { icon, title, subtitle } = titles[currentStep];

        return (
            <div className="lifepath-step-title">
                <span className="step-icon">{icon}</span>
                <div>
                    <h2>{title}</h2>
                    <p className="step-subtitle">{subtitle}</p>
                </div>
            </div>
        );
    };

    const renderOptionCard = (
        option: LifePathStepOption,
        isSelected: boolean,
        onSelect: () => void
    ) => (
        <div 
            className={`lifepath-option-card ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            <div className="option-content">
                {/* HEADER AVEC ICÔNE */}
                <div className="option-header">
                    <h3 className="option-label">{option.label}</h3>
                    {isSelected && <span className="selected-badge">✓ SÉLECTIONNÉ</span>}
                </div>
                
                {/* DESCRIPTION PRINCIPALE */}
                <p className="option-desc">{option.desc}</p>
                
                {/* CITATION LORE - TOUJOURS VISIBLE */}
                <div className="option-lore-quote">
                    <div className="quote-marks">"</div>
                    <em>{option.lore}</em>
                    <div className="quote-marks closing">"</div>
                </div>

                {/* STATS - GRANDE VISIBILITÉ */}
                {option.stats && Object.keys(option.stats).length > 0 && (
                    <div className="option-stats-showcase">
                        <div className="stats-title">
                            <span className="icon">⚡</span>
                            <strong>MODIFICATEURS DE STATS</strong>
                        </div>
                        <div className="stats-grid-large">
                            {Object.entries(option.stats).map(([stat, value]) => (
                                <div key={stat} className={`stat-card ${value > 0 ? 'positive' : 'negative'}`}>
                                    <div className="stat-name">{stat.toUpperCase()}</div>
                                    <div className="stat-value">{value > 0 ? '+' : ''}{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TRAITS MÉCANIQUES - SECTION VISIBLE */}
                <div className="option-traits-section">
                    <div className="section-header">
                        <span className="icon">🎯</span>
                        <strong>EFFETS MÉCANIQUES</strong>
                    </div>
                    {option.mechanical_traits.slice(0, 2).map((trait, idx) => (
                        <div key={idx} className={`trait-card ${trait.type}`}>
                            <div className="trait-header">
                                <span className="trait-icon">{trait.type === 'bonus' ? '✓' : '✗'}</span>
                                <strong className="trait-name">{trait.name}</strong>
                            </div>
                            <p className="trait-desc">{trait.desc}</p>
                        </div>
                    ))}
                    {option.mechanical_traits.length > 2 && (
                        <details className="more-traits">
                            <summary>+ {option.mechanical_traits.length - 2} autres effets</summary>
                            {option.mechanical_traits.slice(2).map((trait, idx) => (
                                <div key={idx} className={`trait-card ${trait.type}`}>
                                    <div className="trait-header">
                                        <span className="trait-icon">{trait.type === 'bonus' ? '✓' : '✗'}</span>
                                        <strong className="trait-name">{trait.name}</strong>
                                    </div>
                                    <p className="trait-desc">{trait.desc}</p>
                                </div>
                            ))}
                        </details>
                    )}
                </div>

                {/* IMPACT SOCIAL - TOUJOURS VISIBLE */}
                <div className="option-social-section">
                    <div className="section-header">
                        <span className="icon">🎭</span>
                        <strong>IMPACT SOCIAL & RÉACTIONS</strong>
                    </div>
                    <p className="social-text">{option.social_impacts.pnj_reactions}</p>
                </div>

                {/* EXTRAS (collapsible) */}
                {(option.starting_items || option.languages || option.gm_hooks) && (
                    <details className="option-extras-collapsible">
                        <summary className="extras-summary">
                            <span className="icon">📜</span>
                            <strong>DÉTAILS SUPPLÉMENTAIRES</strong>
                        </summary>
                        
                        {option.starting_items && option.starting_items.length > 0 && (
                            <div className="extras-block">
                                <strong className="extras-title">📦 Items de départ:</strong>
                                <ul className="extras-list">
                                    {option.starting_items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {option.languages && option.languages.length > 0 && (
                            <div className="extras-section">
                                <strong>🗣️ Langues:</strong>
                                <p>{option.languages.join(', ')}</p>
                            </div>
                        )}

                        {option.skill_bonuses && option.skill_bonuses.length > 0 && (
                            <div className="extras-section">
                                <strong>⭐ Compétences bonus:</strong>
                                <p>{option.skill_bonuses.join(', ')}</p>
                            </div>
                        )}
                    </details>
                )}
            </div>
        </div>
    );

    const renderStep = () => {
        let options: LifePathStepOption[] = [];
        let selected: LifePathStepOption | null = null;
        let onSelect: (option: any) => void = () => {};

        switch (currentStep) {
            case 1:
                options = BIRTH_ORIGINS;
                selected = selectedOrigin;
                onSelect = setSelectedOrigin;
                break;
            case 2:
                options = CHILDHOOD_PATHS;
                selected = selectedChildhood;
                onSelect = setSelectedChildhood;
                break;
            case 3:
                options = ADOLESCENCE_PATHS;
                selected = selectedAdolescence;
                onSelect = setSelectedAdolescence;
                break;
            case 4:
                options = ADULT_PAST;
                selected = selectedAdult;
                onSelect = setSelectedAdult;
                break;
        }

        return (
            <div className="lifepath-options-grid">
                {options.map(option => renderOptionCard(
                    option,
                    selected?.id === option.id,
                    () => onSelect(option)
                ))}
            </div>
        );
    };

    const renderSummary = () => {
        if (!selectedOrigin && !selectedChildhood && !selectedAdolescence && !selectedAdult) {
            return null;
        }

        const partial = [];
        if (selectedOrigin) partial.push(selectedOrigin);
        if (selectedChildhood) partial.push(selectedChildhood);
        if (selectedAdolescence) partial.push(selectedAdolescence);
        if (selectedAdult) partial.push(selectedAdult);

        if (partial.length === 0) return null;

        // Calcul partiel
        const stats = {
            str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
        };

        partial.forEach(choice => {
            if (choice.stats) {
                Object.keys(choice.stats).forEach(stat => {
                    stats[stat] += choice.stats![stat] || 0;
                });
            }
        });

        return (
            <div className="lifepath-summary-sidebar">
                <h3>📋 Résumé de votre parcours</h3>
                
                <div className="summary-stats">
                    <strong>Stats cumulées:</strong>
                    <div className="stats-summary-grid">
                        {Object.entries(stats).map(([stat, value]) => (
                            value !== 0 && (
                                <span key={stat} className={`stat-summary ${value > 0 ? 'positive' : 'negative'}`}>
                                    {stat.toUpperCase()}: {value > 0 ? '+' : ''}{value}
                                </span>
                            )
                        ))}
                    </div>
                </div>

                {selectedOrigin && (
                    <div className="summary-choice">
                        <strong>🏰 Origine:</strong>
                        <p>{selectedOrigin.label}</p>
                    </div>
                )}

                {selectedChildhood && (
                    <div className="summary-choice">
                        <strong>👶 Enfance:</strong>
                        <p>{selectedChildhood.label}</p>
                    </div>
                )}

                {selectedAdolescence && (
                    <div className="summary-choice">
                        <strong>🎓 Adolescence:</strong>
                        <p>{selectedAdolescence.label}</p>
                    </div>
                )}

                {selectedAdult && (
                    <div className="summary-choice">
                        <strong>⚔️ Âge Adulte:</strong>
                        <p>{selectedAdult.label}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="lifepath-builder">
            {renderStepIndicator()}
            {renderStepTitle()}

            <div className="lifepath-main-content">
                {renderStep()}
                {renderSummary()}
            </div>

            <div className="lifepath-actions">
                <button className="btn-lifepath btn-back" onClick={handlePrevious}>
                    ← {currentStep === 1 ? 'Retour' : 'Précédent'}
                </button>

                <button 
                    className="btn-lifepath btn-next" 
                    onClick={handleNext}
                    disabled={!canProgress()}
                >
                    {currentStep === 4 ? 'Terminer →' : 'Suivant →'}
                </button>
            </div>
        </div>
    );
}
