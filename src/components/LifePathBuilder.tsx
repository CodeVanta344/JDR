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
            {option.img && (
                <div className="option-image" style={{ backgroundImage: `url(${option.img})` }} />
            )}
            
            <div className="option-content">
                <h3 className="option-label">{option.label}</h3>
                <p className="option-desc">{option.desc}</p>
                
                <div className="option-lore">
                    <span className="lore-icon">📜</span>
                    <em>{option.lore}</em>
                </div>

                {/* STATS */}
                {option.stats && Object.keys(option.stats).length > 0 && (
                    <div className="option-stats">
                        <strong>Statistiques:</strong>
                        <div className="stats-grid">
                            {Object.entries(option.stats).map(([stat, value]) => (
                                <span key={stat} className={`stat-badge ${value > 0 ? 'positive' : 'negative'}`}>
                                    {stat.toUpperCase()}: {value > 0 ? '+' : ''}{value}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* MECHANICAL TRAITS */}
                <div className="option-traits">
                    <strong>Effets mécaniques:</strong>
                    {option.mechanical_traits.map((trait, idx) => (
                        <div key={idx} className={`trait ${trait.type}`}>
                            <span className="trait-icon">{trait.type === 'bonus' ? '✅' : '⚠️'}</span>
                            <div>
                                <strong>{trait.name}</strong>
                                <p>{trait.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SOCIAL IMPACTS */}
                <div className="option-social">
                    <strong>🎭 Impact social:</strong>
                    <p className="social-reactions">{option.social_impacts.pnj_reactions}</p>
                    
                    <div className="reputation-list">
                        <strong>Réputation:</strong>
                        {Object.entries(option.social_impacts.reputation_bonus).map(([faction, value]) => (
                            <span key={faction} className={`rep-badge ${value > 0 ? 'positive' : 'negative'}`}>
                                {faction}: {value > 0 ? '+' : ''}{value}
                            </span>
                        ))}
                    </div>
                </div>

                {/* GM HOOKS */}
                <details className="option-secrets">
                    <summary>🎲 Accroches pour le MJ</summary>
                    <p className="gm-hooks">{option.gm_hooks}</p>
                    <p className="personal-secret"><strong>Secret personnel:</strong> {option.personal_secrets}</p>
                </details>

                {/* ROLEPLAY HOOKS */}
                <details className="option-roleplay">
                    <summary>🎭 Conseils Roleplay</summary>
                    <ul>
                        {option.roleplay_hooks.map((hook, idx) => (
                            <li key={idx}>{hook}</li>
                        ))}
                    </ul>
                </details>

                {/* ITEMS/LANGUAGES */}
                {(option.starting_items || option.languages || option.skill_bonuses) && (
                    <div className="option-extras">
                        {option.starting_items && option.starting_items.length > 0 && (
                            <div className="extras-section">
                                <strong>📦 Items de départ:</strong>
                                <ul>
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
                    </div>
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
