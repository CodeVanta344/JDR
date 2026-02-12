# 🗺️ DIAGRAMME RELATIONNEL - AETHELGARD

## Carte Visuelle du Monde (Mermaid)

```mermaid
graph TB
    %% MYTHOLOGIE
    AETHER[L'AETHER<br/>Mer d'Énergie Pure]
    AETHER --> SOLARIUS[Solarius<br/>Le Bâtisseur]
    AETHER --> LUNARA[Lunara<br/>La Gardienne]
    AETHER --> OMBRE[L'Ombre<br/>Oubliée]
    
    SOLARIUS --> TERRE[Forge la Terre]
    LUNARA --> OCEANS[Crée les Océans]
    OMBRE --> MIROIR[Miroir des Ombres<br/>⚠️ MENACE PRINCIPALE]
    
    %% RÉGIONS
    TERRE --> NORD[❄️ CÔTE DES ORAGES<br/>Kuldahar]
    TERRE --> CENTRE[☀️ VAL DORÉ<br/>Sol-Aureus]
    TERRE --> EST[⚒️ MONTS CŒUR-DE-FER<br/>Hammerdeep]
    TERRE --> OUEST[🌳 SYLVE D'ÉMERAUDE<br/>Sylmanir]
    TERRE --> SUD[🔥 TERRES BRÛLÉES<br/>Ruines Ashka]
    
    %% FAILLES
    MIROIR --> FAILLE[La Faille de l'Ombre<br/>Sud - Terres Brûlées]
    FAILLE --> DEMONS[Invasions Démoniaques]
    
    %% FACTIONS MAJEURES
    CENTRE --> SOLARIUS_CULT[Culte de Solarius<br/>Religion Lumière]
    OUEST --> VEILED_CULT[Culte Dame Voilée<br/>Religion Ombre]
    SUD --> ASH_CULT[Cercle des Cendres<br/>Nécromanciens]
    
    CENTRE --> SILVER_DAWN[Aube d'Argent<br/>Paladins Anti-Démons]
    FAILLE --> SEAL_GUARDS[Gardiens du Sceau<br/>Protecteurs]
    NORD --> WINTER_WOLVES[Loups d'Hiver<br/>Mercenaires]
    
    %% MENACES
    FAILLE -.Sceaux Faiblissent.-> INVASION[⚠️ INVASION IMMINENTE]
    NORD --> DRAGON[Dragon de Cristal<br/>S'éveille après 500 ans]
    CENTRE --> WAR[Guerre Civile<br/>Conspiration Reine]
    
    %% HÉROS
    INVASION --> HEROES[LES HÉROS<br/>Héritiers Alliance des Sept]
    HEROES --> QUESTS[Quêtes Multi-Actes]
    HEROES --> FACTIONS_REP[Réputation Factions]
    HEROES --> CRAFTS[Métiers & Artisanat]
    
    style AETHER fill:#9370DB,stroke:#4B0082,color:#FFF
    style MIROIR fill:#8B0000,stroke:#FF0000,color:#FFF
    style FAILLE fill:#DC143C,stroke:#FF0000,color:#FFF
    style INVASION fill:#FF4500,stroke:#FF0000,color:#FFF
    style HEROES fill:#FFD700,stroke:#FF8C00,color:#000
    
    style NORD fill:#ADD8E6,stroke:#4682B4,color:#000
    style CENTRE fill:#FFD700,stroke:#DAA520,color:#000
    style EST fill:#A9A9A9,stroke:#696969,color:#FFF
    style OUEST fill:#32CD32,stroke:#228B22,color:#000
    style SUD fill:#FF6347,stroke:#8B0000,color:#FFF
```

---

## Chronologie Historique

```mermaid
timeline
    title Les 4 Grandes Époques d'Aethelgard
    
    section Ère de l'Éveil
        -3000 à -1500 : Apparition des races (Elfes, Nains, Humains)
        : Don de la magie par la Dame Voilée
        : Fondation des premiers royaumes
    
    section Hégémonie d'Ashka
        -1500 à 0 : Empire des mages-empereurs
        : Cités volantes & portails inter-planaires
        : Chute - Faille vers l'Abysse ouverte
    
    section Ère des Cendres
        0 à 500 : Invasion démoniaque massive
        : Empire Ashka devient Terres Brûlées
        : Alliance des Sept scelle la Faille
    
    section Ère de la Reconstruction
        500 à 620 (ACTUEL) : Paix fragile entre royaumes
        : 620 AN (MAINTENANT) : ⚠️ Sceaux faiblissent
        : ⚠️ Portails Ashka se réveillent
```

---

## Architecture des Factions

```mermaid
graph LR
    subgraph RELIGIEUSES
        A1[Culte Solarius<br/>Bon]
        A2[Culte Dame Voilée<br/>Neutre]
        A3[Cercle Cendres<br/>Mauvais]
    end
    
    subgraph MILITAIRES
        B1[Aube d'Argent<br/>Paladins]
        B2[Gardiens Sceau<br/>Défenseurs]
        B3[Loups d'Hiver<br/>Mercenaires]
    end
    
    subgraph GUILDES
        C1[Guilde Arcanique<br/>Mages]
        C2[Syndicat Ombre<br/>Crime]
        C3[Ligue Marchands<br/>Commerce]
        C4[Forge Éternelle<br/>Nains]
    end
    
    A1 -.Alliés.-> B1
    A1 -.Rivaux.-> A2
    A2 -.Alliés.-> C2
    A3 -.Ennemis.-> B1
    A3 -.Ennemis.-> B2
    
    C1 -.Collaboration.-> A1
    C2 -.Infiltre.-> C3
    C4 -.Fournit.-> B1
    
    style A1 fill:#FFD700,stroke:#DAA520,color:#000
    style A2 fill:#9370DB,stroke:#4B0082,color:#FFF
    style A3 fill:#8B0000,stroke:#FF0000,color:#FFF
    style B1 fill:#4169E1,stroke:#0000CD,color:#FFF
    style B2 fill:#32CD32,stroke:#228B22,color:#FFF
    style B3 fill:#708090,stroke:#2F4F4F,color:#FFF
```

---

## Système de Progression des Héros

```mermaid
graph TD
    START[Création Personnage<br/>Niveau 1]
    
    START --> CLASS{Choisir Archétype}
    
    CLASS --> MIGHT[⚔️ SANG ET ACIER]
    CLASS --> MAGIC[🔥 ARCANES]
    CLASS --> SKILL[🗡️ OMBRE]
    
    MIGHT --> MIGHT_SUB[Guerrier/Paladin<br/>+3 Spécialisations]
    MAGIC --> MAGIC_SUB[Mage/Clerc/Druide<br/>+3 Spécialisations]
    SKILL --> SKILL_SUB[Voleur/Rôdeur/Barde<br/>+3 Spécialisations]
    
    MIGHT_SUB --> PROGRESS
    MAGIC_SUB --> PROGRESS
    SKILL_SUB --> PROGRESS
    
    PROGRESS[Progression Parallèle]
    
    PROGRESS --> XP[XP → Niveaux 1-20<br/>Stats & Aptitudes]
    PROGRESS --> REP[Réputation Factions<br/>-1000 à +3000]
    PROGRESS --> CRAFT[Métiers Artisanat<br/>Novice → Maître]
    PROGRESS --> QUESTS[Quêtes Multi-Actes<br/>5 types]
    
    XP --> END_GAME[Niveau 20<br/>⚡ Héros Légendaire]
    REP --> PERKS[Débloque Perks<br/>Items & Sorts]
    CRAFT --> LEGENDARY[Craft Légendaire<br/>Items Uniques]
    QUESTS --> STORY[Impact sur Monde<br/>Événements Majeurs]
    
    style START fill:#90EE90,stroke:#228B22,color:#000
    style END_GAME fill:#FFD700,stroke:#FF8C00,color:#000
    style MIGHT fill:#DC143C,stroke:#8B0000,color:#FFF
    style MAGIC fill:#4169E1,stroke:#0000CD,color:#FFF
    style SKILL fill:#32CD32,stroke:#228B22,color:#000
```

---

## Carte des Menaces Actuelles

```mermaid
mindmap
    root((⚠️ MENACES<br/>AETHELGARD))
        🔴 CRITIQUE
            Sceaux Faiblissent
                Démons Mineurs Émergent
                Portails Ashka Réveillés
                Faille s'Élargit
            Dragon Kuldahar
                1 Œil Ouvert
                Intentions Inconnues
                Jarls Préparent Guerre
            Guerre Civile Val Doré
                Conspiration Reine
                Infiltration Syndicat
                Noblesse Divisée
        🟠 TENSIONS
            Sylve se Ferme
                Mur de Ronces Épaissi
                Elfes Refusent Contact
                Ressources Bloquées
            Conflits Nains
                Guerres de Brevets
                Guildes Rivales
                Production Ralentie
            Hérésie Dame Voilée
                Accusations Publiques
                Persécutions Culte
                Risque Guerre Sainte
            Pirates Côte Nord
                Routes Commerciales
                Pillages Villages
                Kuldahar Affaibli
```

---

## Flow de Quête Type (5 Actes)

```mermaid
stateDiagram-v2
    [*] --> ACTE1: 🎭 Accroche
    
    ACTE1: ACTE 1 - L'ACCROCHE
    ACTE1: Mystère intrigant
    ACTE1: Témoignages contradictoires
    ACTE1: Indices partiels
    
    ACTE1 --> ACTE2: Investigation
    
    ACTE2: ACTE 2 - RÉVÉLATIONS
    ACTE2: Enquête approfondie
    ACTE2: Connexions lore
    ACTE2: Nouveaux PNJ/lieux
    
    ACTE2 --> ACTE3: TWIST
    
    ACTE3: ACTE 3 - COMPLICATION
    ACTE3: ⚡ Allié = Traître
    ACTE3: Enjeux augmentés
    ACTE3: Dilemme moral
    
    ACTE3 --> ACTE4: Escalade
    
    ACTE4: ACTE 4 - CLIMAX
    ACTE4: Confrontation finale
    ACTE4: Boss Fight
    ACTE4: Choix moral critique
    
    ACTE4 --> ACTE5: Résolution
    
    ACTE5: ACTE 5 - ÉPILOGUE
    ACTE5: Impact sur monde
    ACTE5: Récompenses
    ACTE5: ➡️ Tease nouvelle quête
    
    ACTE5 --> [*]: Fin (ou nouvelle quête)
    
    note right of ACTE3
        Le TWIST change
        tout ce qu'on croyait
    end note
    
    note right of ACTE5
        Toujours laisser
        un mystère non-résolu
    end note
```

---

## Économie des Ressources

```mermaid
graph LR
    subgraph RÉCOLTE
        A1[⛏️ Minage]
        A2[🌿 Herboristerie]
        A3[🎣 Pêche]
        A4[🏹 Chasse]
        A5[🔪 Dépouillage]
    end
    
    subgraph RESSOURCES_BRUTES
        B1[Minerais]
        B2[Plantes]
        B3[Poissons]
        B4[Peaux/Viandes]
        B5[Composants Magiques]
    end
    
    subgraph CRAFT
        C1[🔨 Forge]
        C2[🧪 Alchimie]
        C3[✨ Enchantement]
        C4[🍖 Cuisine]
        C5[🧵 Couture]
    end
    
    subgraph PRODUITS_FINIS
        D1[Armes/Armures]
        D2[Potions/Poisons]
        D3[Items Enchantés]
        D4[Buffs Temporaires]
        D5[Sacs/Vêtements]
    end
    
    A1 --> B1 --> C1 --> D1
    A2 --> B2 --> C2 --> D2
    A5 --> B5 --> C3 --> D3
    A3 & A4 --> B3 & B4 --> C4 --> D4
    A4 --> B4 --> C5 --> D5
    
    D1 & D2 & D3 & D4 & D5 --> MARKET[Vente/Commerce<br/>Or & Réputation]
    
    MARKET --> UPGRADE[Amélioration Perso<br/>& Équipement]
    
    style MARKET fill:#FFD700,stroke:#DAA520,color:#000
    style UPGRADE fill:#32CD32,stroke:#228B22,color:#000
```

---

## Pyramide de Pouvoir Politique

```mermaid
graph TD
    subgraph VAL_DORE[☀️ VAL DORÉ]
        VD1[Reine Elara]
        VD1 --> VD2[Conseil des Nobles]
        VD2 --> VD3[Gouverneurs Provinces]
        VD3 --> VD4[Seigneurs Locaux]
    end
    
    subgraph KULDAHAR[❄️ KULDAHAR]
        K1[Grand Jarl]
        K1 --> K2[Jarls de Clans]
        K2 --> K3[Chefs de Guerre]
        K3 --> K4[Guerriers Libres]
    end
    
    subgraph HAMMERDEEP[⚒️ HAMMERDEEP]
        H1[Conseil des Guildes]
        H1 --> H2[Maîtres de Guilde]
        H2 --> H3[Maîtres Artisans]
        H3 --> H4[Compagnons]
    end
    
    subgraph SYLMANIR[🌳 SYLMANIR]
        S1[Conseil des Chênes]
        S1 --> S2[Archidruides]
        S2 --> S3[Druides Cercles]
        S3 --> S4[Gardiens Forêt]
    end
    
    subgraph TERRES_BRULEES[🔥 TERRES BRÛLÉES]
        T1[Seigneurs de Guerre]
        T1 --> T2[Chefs de Bande]
        T2 --> T3[Mercenaires]
        T3 --> T4[Survivants]
    end
    
    VD1 -.Alliances.-> H1
    VD1 -.Tensions.-> K1
    S1 -.Isolement.-> VD1
    T1 -.Raids.-> VD4
    T1 -.Raids.-> K4
    
    style VD1 fill:#FFD700,stroke:#DAA520,color:#000
    style K1 fill:#ADD8E6,stroke:#4682B4,color:#000
    style H1 fill:#A9A9A9,stroke:#696969,color:#FFF
    style S1 fill:#32CD32,stroke:#228B22,color:#000
    style T1 fill:#DC143C,stroke:#8B0000,color:#FFF
```

---

## Légende des Symboles

| Symbole | Signification |
|---------|---------------|
| ⚠️ | Menace/Danger imminent |
| 🔴 | Critique/Urgent |
| 🟠 | Tension/Préoccupant |
| 🟢 | Stable/Sécurisé |
| ⚔️ | Combat/Militaire |
| 🔥 | Magie/Arcanes |
| 🗡️ | Ruse/Agilité |
| ❄️ | Nord/Glace |
| ☀️ | Centre/Lumière |
| ⚒️ | Est/Forge |
| 🌳 | Ouest/Nature |
| 🔥 | Sud/Destruction |
| ➡️ | Progression/Suite |
| ⚡ | Événement majeur |

---

**Créé le:** 2026-02-12  
**Version:** 1.0 - Diagrammes Relationnels Complets
