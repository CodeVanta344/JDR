import React, { useState, useEffect } from 'react';
import './ScrollLore.css';

const LORE_SECTIONS = [
    {
        title: "✦ Le Monde d'Aethelgard",
        icon: "🌍",
        content: `Bienvenue en Aethelgard, un monde dont les fondations tremblent encore des échos de l'Ère des Cendres.

Ici, la lumière de Solarius lutte quotidiennement contre les incursions de l'Abysse. Vous arrivez à une époque charnière : les anciens portails de l'Hégémonie d'Ashka recommencent à briller d'une lueur funeste dans les déserts du sud, et les Jarls du nord murmurent que le dragon de cristal de Kuldahar a ouvert un œil.`
    },
    {
        title: "✦ La Genèse",
        icon: "🔥",
        content: `Avant le temps, il n'y avait que l'Aether, une mer d'énergie pure.

De cette soupe primordiale émergèrent les Primordiaux :
• Solarius le Bâtisseur — forgea la terre et les cieux
• Lunara la Gardienne — donna naissance aux océans et au souffle de vie  
• L'Ombre dont le nom est oublié — créa le Miroir des Ombres

Après la Grande Guerre des Cendres, les Dieux se retirèrent derrière le Voile de Cristal. On dit qu'ils observent toujours...`
    },
    {
        title: "✦ Les Royaumes",
        icon: "👑",
        content: `⚔ Kuldahar — Forteresse des Jarls de Glace
   La force est le seul langage que le froid comprend.

🏛 Sol-Aureus — Cité du Verre et de l'Or
   Cœur diplomatique où la Reine Elara règne.

⛏ Hammerdeep — Cité sous la montagne
   15 niveaux de forges naines et de guildes minières.

🌿 Sylmanir — Cité Tissée dans les branches
   Théocratie druidique des Elfes isolationnistes.

🔥 Terres Brûlées — Ruines de l'Empire Ashka
   Où les démons du Miroir rôdent encore...`
    },
    {
        title: "✦ Les Classes d'Héros",
        icon: "⚔",
        content: `SANG ET ACIER — Guerrier & Paladin
Maîtres de la force brute et de la résilience.

ARCANES ET MYSTÈRES — Mage, Clerc & Druide  
Maîtres des énergies cosmiques et divines.

OMBRE ET RUSE — Voleur, Rôdeur & Barde
Spécialistes de l'agilité et de la précision.

Chaque héros possède une mécanique unique qui définit son style de combat.`
    },
    {
        title: "✦ Les Menaces",
        icon: "☠",
        content: `Le Miroir des Ombres — Une dimension parallèle d'où s'échappent les démons.

Le Cercle des Cendres — Société secrète cherchant à réveiller les anciens dragons.

La Faille de l'Ombre — Une fissure béante dans les Terres Brûlées qui murmure...`
    },
    {
        title: "✦ Votre Légende",
        icon: "⭐",
        content: `Vous n'êtes pas de simples voyageurs.

Dans vos veines coule peut-être un fragment de l'essence des héros de l'Alliance des Sept, ou le destin vous a simplement jeté dans l'arène pour voir si vous seriez consumé par les flammes ou forgé par elles.

L'histoire d'Aethelgard s'écrit avec le sang des braves et les larmes des traîtres.

Quelle sera votre marque sur cette terre millénaire ?`
    }
];

export function ScrollLore({ isVisible, onComplete, isHost }) {
    const [currentSection, setCurrentSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (isVisible && !hasStarted) {
            setHasStarted(true);
            setIsAnimating(true);
        }
    }, [isVisible, hasStarted]);

    const handleNext = () => {
        if (currentSection < LORE_SECTIONS.length - 1) {
            setCurrentSection(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        setIsAnimating(false);
        setTimeout(() => {
            onComplete?.();
        }, 500);
    };

    const handleSkip = () => {
        handleComplete();
    };

    if (!isVisible) return null;

    const section = LORE_SECTIONS[currentSection];

    return (
        <div className={`scroll-lore-overlay ${isAnimating ? 'visible' : 'hidden'}`}>
            <div className="scroll-lore-container">
                {/* Ornements de parchemin */}
                <div className="scroll-ends top"></div>
                
                <div className="scroll-content">
                    {/* Header */}
                    <div className="scroll-header">
                        <div className="scroll-seal">⚔</div>
                        <h1 className="scroll-title">Chroniques d'Aethelgard</h1>
                        <div className="scroll-subtitle">Les Légendes Oubliées</div>
                    </div>

                    {/* Progress */}
                    <div className="scroll-progress">
                        {LORE_SECTIONS.map((_, index) => (
                            <div 
                                key={index}
                                className={`progress-dot ${index === currentSection ? 'active' : ''} ${index < currentSection ? 'completed' : ''}`}
                            />
                        ))}
                    </div>

                    {/* Content Section */}
                    <div className="scroll-section" key={currentSection}>
                        <div className="section-icon">{section.icon}</div>
                        <h2 className="section-title">{section.title}</h2>
                        <div className="section-content">
                            {section.content.split('\n').map((line, i) => (
                                <p key={i} className={line.trim().startsWith('•') || line.trim().startsWith('⚔') || line.trim().startsWith('🏛') || line.trim().startsWith('⛏') || line.trim().startsWith('🌿') || line.trim().startsWith('🔥') ? 'bullet' : ''}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="scroll-navigation">
                        <button 
                            className="nav-btn skip"
                            onClick={handleSkip}
                        >
                            Passer
                        </button>
                        
                        <div className="page-indicator">
                            {currentSection + 1} / {LORE_SECTIONS.length}
                        </div>

                        <button 
                            className="nav-btn next"
                            onClick={handleNext}
                        >
                            {currentSection === LORE_SECTIONS.length - 1 ? 'Commencer' : 'Suivant'}
                            <span className="arrow">→</span>
                        </button>
                    </div>
                </div>

                <div className="scroll-ends bottom"></div>
            </div>
        </div>
    );
}
