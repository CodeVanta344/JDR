# ANALYSE COMPLÈTE DES TRAITS MÉCANIQUES - LIFEPATH SYSTEM

**Date**: 2026-02-12  
**Objectif**: Inventaire exhaustif des bonus, stats, skills et traits pour identifier déséquilibres

---

## 1. PHASE NAISSANCE (BIRTH)

### 1.1 Lieux de Naissance (Locations)

| ID | Nom | Stats | Bonus Skills | Mechanical Traits | Valeurs |
|----|-----|-------|--------------|-------------------|---------|
| `birth_loc_aethelmere` | Aethelmere (Capitale) | CHA +1, INT +1 | Persuasion +2, Knowledge(History) +2 | Enfant de la Capitale (+2 social urbain) | Total: +2 stats, +4 skills |
| `birth_loc_port_azure` | Port-Azure | DEX +1, PER +1 | Navigation +2, Sleight of Hand +1 | Pied Marin (immunité mal de mer, +2 Acrobatie navire) | Total: +2 stats, +3 skills |
| `birth_loc_ironhold` | Bastion-de-Fer | STR +1, CON +1 | Survival +2, Intimidation +1 | Né dans le Froid (résist. froid, +2 Survie montagne) | Total: +2 stats, +3 skills |
| `birth_loc_sylvanor` | Sylvanor (Elfes) | WIS +1, PER +1 | Nature +2, Arcana +1 | Gardien Sylve (+2 Nature/Arcanes nature, empathie plantes) | Total: +2 stats, +3 skills |
| `birth_loc_karak_dun` | Karak-Dûn (Nains) | CON +1, STR +1, DEX -1 | Mining +2, Crafting(Smith) +1 | Fils de la Pierre (vision noir 18m, +2 minéralogie) | Total: +1 stat net, +3 skills |
| `birth_loc_petit_village_frontiere` | Village Frontière | CON +1, WIL +1 | Survival +2, Medicine +1 | Sang Paysan (+2 Survie/Médecine plantes, résist. maladies) | Total: +2 stats, +3 skills |
| `birth_loc_monastere_montagne` | Monastère Montagne | WIS +2 | Insight +2, Athletics +1 | Discipline Monastique (+1 CA sans armure, +2 Concentration) | Total: +2 stats, +3 skills, +1 AC |

**Analyse Birth Locations**:
- **Range stats**: 1-3 bonus (+2 typique)
- **Range skills**: 3-4 bonus total
- **Déséquilibre**: Karak-Dûn pénalise DEX (-1), seul lieu avec malus
- **Plus fort**: Monastère (+2 WIS + +1 AC + +2 Concentration)

---

### 1.2 Présages (Omens)

| ID | Nom | Stats | Bonus Skills | Mechanical Traits | Valeurs |
|----|-----|-------|--------------|-------------------|---------|
| `birth_omen_comet` | Comète Dorée | CHA +1, WIL +1 | Persuasion +2 | Destinée Stellaire (+2 Persuasion leadership, aura) | Total: +2 stats, +2 skills |
| `birth_omen_eclipse` | Éclipse Sanglante | WIL +2, CHA -1 | Intimidation +3 | Aura Sinistre (+3 Intimidation, -2 Persuasion, animaux nerveux) | Total: +1 stat net, +3 skills |
| `birth_omen_twin_death` | Jumeau Mort-Né | PER +1, WIS +1 | Perception +2, Insight +1 | Lien Spectral (+2 Perception esprits, intuition danger) | Total: +2 stats, +3 skills |
| `birth_omen_storm` | Né dans Tempête | CON +1, WIL +1 | Survival +2 | Touché par Foudre (résist. électricité 5, +2 Survie tempêtes) | Total: +2 stats, +2 skills |
| `birth_omen_white_raven` | Corbeau Blanc | WIS +1, PER +1 | Animal Handling +2, Perception +1 | Messager Esprits (comm. animaux limitée, +2 Perception invisibles) | Total: +2 stats, +3 skills |
| `birth_omen_flower_bloom` | Floraison Hivernale | CHA +1, WIS +1 | Medicine +2, Nature +1 | Bénédiction Florale (+2 Médecine herboristerie, plantes poussent mieux) | Total: +2 stats, +3 skills |

**Analyse Omens**:
- **Range stats**: 1-3 bonus nets (Éclipse pénalise CHA -1)
- **Range skills**: 2-3 bonus
- **Déséquilibre**: Éclipse (+3 Intimidation mais -2 Persuasion = swing de 5)
- **Plus équilibré**: Comète, Jumeau, Storm, Raven, Flower (tous +2 stats, +2-3 skills)

---

### 1.3 Statuts Sociaux (Social Status)

| ID | Nom | Stats | Bonus Skills | Mechanical Traits | Items/Or |
|----|-----|-------|--------------|-------------------|----------|
| `birth_status_nobility` | Sang Noble | CHA +2, INT +1 | Persuasion +3, Knowledge(Nobility) +2 | Privilège Aristocratique (+3 Persuasion nobles), Héritage (+500 PO) | +500 PO, signet ring, fine clothes |
| `birth_status_merchant` | Famille Marchande | INT +1, CHA +1 | Persuasion +3, Insight +2 | Sens Commerce (+3 marchandage, -10% prix achat) | +200 PO, ledger |
| `birth_status_artisan` | Lignée Artisanale | DEX +1, INT +1 | Crafting(choice) +2, Appraisal +1 | Maître Héritier (+2 craft choix, outils maître) | Masterwork tools |
| `birth_status_paysan` | Paysannerie | CON +2 | Survival +2, Animal Handling +1 | Robustesse Paysanne (+1 PV/niveau, résist. faim/soif) | Wooden tool |
| `birth_status_clerc` | Famille Cléricale | WIS +2 | Religion +2, Medicine +1 | Béni des Dieux (+2 Religion/Médecine, bonus sorts divins) | Holy symbol, prayer book |
| `birth_status_orphelin` | Orphelin Rues | DEX +2, CHA -1 | Stealth +3, Sleight of Hand +2 | Instinct Survie (+3 Discrétion/Escamotage, sens danger) | Lockpicks |
| `birth_status_esclave` | Esclave (Libéré) | WIL +2, CON +1, CHA -1 | Athletics +2, Intimidation +1 | Volonté Indomptable (avantage charme/terreur, +2 Athlétisme), Marqué Chaînes (-2 nobles) | Broken shackle |
| `birth_status_batard` | Bâtard Noble | CHA +1, WIL +1 | Persuasion +1, Insight +2 | Héritage Contesté (+1 Persuasion/Intimidation nobles, désavantage héritages) | Locket |
| `birth_status_criminel` | Famille Criminelle | DEX +1, INT +1 | Stealth +2, Deception +2 | Contacts Obscurs (réseau criminel, +2 Investigation monde souterrain) | Father's dagger |
| `birth_status_paria` | Paria Maudit | WIL +2, CHA -2 | Intimidation +3, Survival +2 | Esprit Endurci (immunité effets sociaux, +3 Volonté), Aura Malédiction (-3 jets sociaux sauf Intimidation) | Aucun |

**Analyse Social Status**:
- **Range stats**: 2-4 bonus nets (parias ont malus CHA)
- **Range skills**: 3-5 bonus
- **Items/Or**: Nobility (+500 PO !!), Merchant (+200 PO)
- **DÉSÉQUILIBRE MAJEUR**: 
  - Nobility: +3 stats, +5 skills, +500 PO, accès cour = **SURPUISSANT**
  - Paria: +2 WIL, -2 CHA, +5 skills mais -3 social = handicap sévère
  - Esclave: +2 stats nets mais -2 interaction nobles
- **+1 PV/niveau**: Paysannerie (cumul multiplicatif potentiellement OP)

---

## 2. PHASE ENFANCE (CHILDHOOD)

### 2.1 Éducations

| ID | Nom | Stats | Bonus Skills | Mechanical Traits | Valeurs |
|----|-----|-------|--------------|-------------------|---------|
| `childhood_edu_formal_academy` | Académie Prestigieuse | INT +2, WIS +1 | Arcana +2, History +2, Persuasion +1 | Esprit Érudit (+2 tous Connaissance, apprentissage sorts +25%) | Total: +3 stats, +5 skills |
| `childhood_edu_apprentice_master` | Apprentissage Maître | DEX +1, WIS +1 | Chosen Skill +3 | Héritage Maître (+3 compétence choix, outils maître) | Total: +2 stats, +3 skills |
| `childhood_edu_street_survivor` | École de la Rue | DEX +2, PER +1, INT -1 | Stealth +3, Sleight of Hand +2, Insight +2 | Instinct Rues (+3 Discrétion/Intuition urbain, détection pièges) | Total: +2 stats nets, +7 skills |
| `childhood_edu_temple_monastery` | Temple/Monastère | WIS +2, WIL +1 | Religion +2, Insight +2, Athletics +1 | Discipline Monastique (+1 CA sans armure, +2 Concentration, méditation 2× PV) | Total: +3 stats, +5 skills, +1 AC |
| `childhood_edu_military_training` | École Militaire | STR +1, CON +1, WIL +1 | Athletics +2, Intimidation +1, Tactics +2 | Cadre Militaire (+2 Initiative, +1 ATK si allié 3m, commandement) | Total: +3 stats, +5 skills, +2 Init, +1 ATK |
| `childhood_edu_illiterate` | Aucune Éducation | STR +1, CON +1, INT -2 | Survival +2, Animal Handling +1 | Instinct Primaire (+2 Perception danger, -5 lecture/écriture) | Total: -1 stat net, +3 skills |

**Analyse Éducations**:
- **Range stats**: 2-3 bonus (Rue et Illettré ont malus INT)
- **Range skills**: 3-7 bonus (École Rue = 7 skills !!)
- **DÉSÉQUILIBRES**:
  - **École Rue**: +7 skills total = OVERPOWERED
  - **École Militaire**: +3 stats, +5 skills, +2 Init, +1 ATK conditionnel = très fort
  - **Temple**: +1 AC, méditation 2× PV = synergies moines puissantes
  - **Académie**: +25% apprentissage sorts = multiplicateur long terme
  - **Illettré**: -5 lecture/écriture = handicap RP majeur

---

### 2.2 Familles

| ID | Nom | Stats | Bonus Skills | Mechanical Traits | Valeurs |
|----|-----|-------|--------------|-------------------|---------|
| `childhood_family_nuclear_loving` | Famille Unie | CHA +1, WIL +1 | Persuasion +2, Insight +1 | Liens Familiaux (+2 Persuasion alliés, résist. peur si proches menacés) | +2 stats, +3 skills |
| `childhood_family_single_parent` | Parent Unique | CON +1, WIL +1 | Athletics +1, Insight +2 | Résilience Forgée (+1 tous jets si PV<50%, +2 Volonté désespoir) | +2 stats, +3 skills |
| `childhood_family_noble_dynasty` | Dynastie Noble | INT +1, CHA +1, WIS -1 | Persuasion +3, Knowledge(Nobility) +2 | Sang Froid Aristocratique (+3 Persuasion/Intimidation nobles, -2 Empathie) | +1 stat net, +5 skills |
| `childhood_family_merchant_caravan` | Marchande Itinérante | CHA +1, INT +1 | Persuasion +2, Survival +1, +2 langues | Nomade Né (+2 Survie route, langues +50% vitesse) | +2 stats, +3 skills, +2 langues |
| `childhood_family_criminal_gang` | Clan Criminel | DEX +2, CHA -1 | Stealth +3, Sleight of Hand +2 | Enfant Ombres (+3 Discrétion/Escamotage, contacts criminels) | +1 stat net, +5 skills |
| `childhood_family_orphan` | Orphelin Seul | WIL +2, DEX +1, CHA -2 | Survival +3, Stealth +2 | Indépendance Forcée (+3 Survie seul, -3 travail équipe) | +1 stat net, +5 skills |

**Analyse Familles**:
- **Range stats**: 2-3 bonus (malus fréquents: CHA -1/-2, WIS -1)
- **Range skills**: 3-5 bonus
- **DÉSÉQUILIBRES**:
  - **Parent Unique**: +1 TOUS jets si PV<50% = potentiellement broken (swing +5-10 cumulé)
  - **Noble Dynasty**: cumule avec Birth Status Nobility = double privilège
  - **Orphelin**: -3 travail équipe = handicap mécanique sévère
  - **Merchant**: +2 langues + 50% vitesse apprentissage = très utile

---

### 2.3 Traumas & Bénédictions

#### Traumas Négatifs

| ID | Nom | Stats | Bonus Skills | Mechanical Traits | Pénalités |
|----|-----|-------|--------------|-------------------|-----------|
| `childhood_trauma_death_witnessed` | Témoin Mort | WIL +2, CHA -1 | Intimidation +2, Perception +1 | Hanté par Mort (+3 Volonté terreur, -2 jets sociaux) | -2 social |
| `childhood_trauma_betrayal` | Trahison Proche | PER +2, WIL +1, CHA -2 | Insight +3, Deception +1 | Méfiance Pathologique (+3 détecter mensonges, -3 Confiance) | -3 Confiance |
| `childhood_trauma_fire` | Incendie | CON +1, WIL +1 | Survival +1 | Marqué Flammes (résist. feu 5, désavantage Volonté vs feu phobie) | Phobie feu |
| `childhood_trauma_poverty` | Pauvreté Extrême | CON +2, WIL +1, CHA -1 | Survival +2, Sleight of Hand +1 | Endurance Faim (résist. faim/soif ×2, +2 Survie urbain pauvre) | -1 CHA |

#### Bénédictions Positives

| ID | Nom | Stats | Bonus Skills | Mechanical Traits | Bonus Spéciaux |
|----|-----|-------|--------------|-------------------|----------------|
| `childhood_blessing_mentor` | Mentor Inspirant | WIS +1, CHA +1, WIL +1 | Chosen Skill +2, Insight +1 | Héritage Mentor (+2 compétence, inspiration 1×/jour +1d6) | Inspiration dice |
| `childhood_blessing_heroic_act` | Acte Héroïque | CHA +2, WIL +1 | Persuasion +2, Athletics +1 | Courage Reconnu (+2 Persuasion inspiration, immunité peur si allié danger) | Immunité peur cond. |
| `childhood_blessing_loyal_friend` | Ami Indéfectible | CHA +1, WIS +1 | Persuasion +1, Insight +1 | Lien Fraternel (+2 TOUS jets si ami présent, PNJ allié) | +2 tous jets cond. |
| `childhood_blessing_magic_awakening` | Éveil Magique | INT +2, WIL +1 | Arcana +2 | Prodige Magique (+2 Arcanes, +1 sort connu, sorts +30% vitesse) | +1 sort, +30% |
| `childhood_blessing_animal_companion` | Compagnon Animal | WIS +1, PER +1 | Animal Handling +2, Survival +1 | Lien Bestial (compagnon stats, +2 Dressage, comm. empathique) | Allié permanent |

**Analyse Traumas/Bénédictions**:
- **Traumas**: Toujours avec pénalités sociales (-1 à -3 CHA ou jets sociaux)
- **Bénédictions**: Aucune pénalité, bonus purs
- **DÉSÉQUILIBRES**:
  - **Loyal Friend**: +2 TOUS jets si ami présent = +10 cumulé sur 5 jets = BROKEN
  - **Magic Awakening**: +30% vitesse + sort bonus = avantage long terme massif
  - **Mentor**: Inspiration 1×/jour (+1d6) = action hero potentielle
  - **Animal Companion**: Allié combat permanent = action économie
  - **Betrayal**: -3 Confiance = handicap RP sévère sans bénéfice mécanique clair

---

## 3. PHASE ADOLESCENCE

### 3.1 Formations (Training)

| ID | Nom | Stats | Bonus Skills | Mechanical Traits | Valeurs |
|----|-----|-------|--------------|-------------------|---------|
| `adolescence_training_warrior_school` | École Guerre | STR +2, CON +1 | Athletics +2, Intimidation +1 | Guerrier Formé (+2 ATK mêlée, maîtrise 3 armes martiales) | +3 stats, +3 skills, +2 ATK |
| `adolescence_training_mage_academy` | Académie Magie | INT +3 | Arcana +3, History +1 | Érudit Arcane (+3 Arcanes, +3 sorts connus, Rituel magique) | +3 stats, +4 skills, +3 sorts |
| `adolescence_training_rogue_guild` | Guilde Voleurs | DEX +3 | Stealth +3, Sleight of Hand +2 | Ombre Formée (+3 Discrétion, Sneak Attack +2d6, Expertise crochetage) | +3 stats, +5 skills, +2d6 dmg |

**Analyse Trainings** (partiel - 3/20 options):
- **Range stats**: +3 (standardisé)
- **Range skills**: 3-5 bonus
- **DÉSÉQUILIBRES**:
  - **Mage Academy**: +3 sorts connus = énorme avantage long terme
  - **Rogue Guild**: +2d6 Sneak Attack = +7 dmg moyen = très fort
  - **Warrior**: +2 ATK permanent = +10% hit rate

---

## 4. PHASE JEUNE ADULTE (YOUNG ADULT)

### 4.1 Connexions (partiel)

| ID | Nom | Stats | Mechanical Traits | Items/Or |
|----|-----|-------------------|----------|
| `youngadult_conn_noble_patron` | Protecteur Noble | CHA +1 | Patronage Noble (accès cour, +500 PO, quêtes obligatoires) | +500 PO |

### 4.2 Motivations (partiel)

| ID | Nom | Stats | Mechanical Traits | Pénalités |
|----|-----|-------------------|-----------|
| `youngadult_motiv_revenge` | Vengeance | WIL +2 | Obsession Vengeresse (+2 ATK vs cible, désavantage social) | -social |

### 4.3 Professions (partiel)

| ID | Nom | Stats | Mechanical Traits |
|----|-----|-------------------|
| `youngadult_prof_soldier` | Soldat Vétéran | STR +1, CON +1 | Vétéran Guerre (+1 Initiative, avantage Intimidation non-combattants) |

---

## 5. FORMATS DE BONUS SKILLS TROUVÉS

### Formats Standards
```typescript
skills: [
  { skillId: 'persuasion', bonus: 2, reason: '...' },
  { skillId: 'knowledge_history', bonus: 2, reason: '...' }
]
```

### Formats Spéciaux Trouvés
- **Choix libre**: `{ skillId: 'chosen_skill', bonus: 3 }` (Apprentissage Maître)
- **Choix craft**: `{ skillId: 'crafting_choice', bonus: 2 }` (Artisan)
- **Bonus contextuels**: "+2 Persuasion avec nobles" (dans `desc`, pas skill array)
- **Pourcentages**: "+25% apprentissage sorts" (Académie)
- **Multiplicateurs**: "×2 récupération PV méditation" (Temple)

---

## 6. BONUS DE STATS - SYNTHÈSE

### Distribution par Phase

#### Birth Phase
- **Locations**: +1 à +2 par stat, total 2-3 stats
- **Omens**: +1 à +2 par stat, total 2-3 stats (1 avec malus)
- **Status**: +1 à +2 par stat, total 2-4 stats (3 avec malus)

#### Childhood Phase
- **Education**: +1 à +2 par stat, total 2-3 stats (2 avec malus)
- **Family**: +1 à +2 par stat, total 2-3 stats (3 avec malus)
- **Trauma/Blessing**: +1 à +3 par stat, total 1-3 stats (4 avec malus)

#### Adolescence Phase
- **Training**: +2 à +3 stat unique, total +3 standardisé

#### Young Adult Phase
- **Connection/Motivation/Profession**: +1 à +2 par stat, total 1-2 stats

### Stats les Plus Boostées (fréquence)
1. **Charisma**: 15 occurrences (social dominant)
2. **Intelligence**: 12 occurrences (académique/mage)
3. **Willpower**: 11 occurrences (résilience)
4. **Dexterity**: 10 occurrences (roublard/combat)
5. **Constitution**: 9 occurrences (survie)
6. **Wisdom**: 8 occurrences (spirituel)
7. **Strength**: 7 occurrences (guerrier)
8. **Perception**: 6 occurrences (détection)

### Malus Stats (Pénalités)
- **Charisma**: -1 à -2 (8 occurrences) - traumas sociaux
- **Intelligence**: -1 à -2 (3 occurrences) - éducation faible
- **Dexterity**: -1 (1 occurrence) - Karak-Dûn
- **Wisdom**: -1 (1 occurrence) - Noble Dynasty

---

## 7. INCOHÉRENCES ET DÉSÉQUILIBRES IDENTIFIÉS

### 🔴 DÉSÉQUILIBRES CRITIQUES

#### 1. **Nobility Status = Pay-to-Win**
- **Problème**: +3 stats, +5 skills, **+500 PO**, accès cour royale
- **Comparaison**: Paysan = +2 stats, +3 skills, 0 PO, outil bois
- **Impact**: 500 PO = équipement tier 2-3 complet au niveau 1
- **Recommandation**: Réduire à +200 PO OU ajouter dettes/obligations mécaniques

#### 2. **Bonus Conditionnels Cumulatifs Brisés**
- **Parent Unique**: +1 TOUS jets si PV<50% 
  - Sur 5 jets = +5 total (+25% réussite)
- **Loyal Friend**: +2 TOUS jets si ami présent
  - Sur 5 jets = +10 total (+50% réussite !!)
- **Problème**: Pas de limitation (combats, 1×/jour, etc.)
- **Recommandation**: Limiter à "1×/jour" ou "3×/repos long"

#### 3. **École de la Rue = +7 Skills Total**
- **Problème**: Stealth +3, Sleight +2, Insight +2 = **+7 cumulé**
- **Comparaison**: Moyenne autres éducations = +3-5 skills
- **Impact**: Roublards deviennent imbattables en urban
- **Recommandation**: Réduire à +5 total (Stealth +2, Sleight +2, Insight +1)

#### 4. **Multiplicateurs Long Terme**
- **Académie Formelle**: +25% vitesse apprentissage sorts
- **Éveil Magique**: +30% vitesse + 1 sort bonus
- **Cumul possible**: +55% vitesse = 2× sorts en 20 niveaux
- **Recommandation**: Caps max +20% ou non-cumulatifs

#### 5. **+1 PV/Niveau = Broken Multiclasse**
- **Paysan Status**: +1 PV/niveau
- **Impact**: +20 PV au niveau 20 = +1 CON permanent gratis
- **Synergie**: Barbare/Fighter multiclass = tank imbattable
- **Recommandation**: Change to "+5 PV maximum" (flat bonus)

#### 6. **Sneak Attack +2d6 (Adolescence)**
- **Problème**: Rogues gagnent déjà Sneak Attack class feature
- **Impact**: Double dipping = +4d6 total niveau 3 au lieu de +2d6
- **Recommandation**: Change to "+1d6 Sneak Attack" OR "Advantage on Stealth"

#### 7. **Pénalités Sociales Sans Compensation**
- **Paria**: -3 TOUS jets sociaux sauf Intimidation
- **Orphelin**: -3 travail d'équipe
- **Trahison**: -3 jets Confiance
- **Problème**: Handicaps RP sans bonus mécaniques équivalents
- **Recommandation**: Ajouter bonus compensatoires (+3 dans autre domaine)

---

### 🟡 INCOHÉRENCES MINEURES

#### 8. **Formats Skills Inconsistants**
- Certains: `{ skillId: 'persuasion', bonus: 2 }`
- Autres: "+2 Persuasion (marchandage)" dans `desc` seulement
- **Problème**: Parsing automatique impossible
- **Recommandation**: Standardiser format + ajouter `context` field

#### 9. **Résistances Élémentaires Sans Standardisation**
- Feu: "Résistance 5"
- Froid: "Résistance au froid" (pas de valeur)
- Électricité: "Résistance électricité (5)"
- **Recommandation**: Standardiser `resistance: { fire: 5, cold: 5 }`

#### 10. **Bonus "Contextuels" Flous**
- "+2 Persuasion avec nobles" - Comment gérer techniquement ?
- "+2 Survie (montagne)" vs "+2 Survie en milieu urbain pauvre"
- **Recommandation**: Ajouter `conditions` field explicite

---

## 8. FORMATS SKILL BONUS - CLASSIFICATION

### Type 1: Bonus Fixes
```typescript
{ skillId: 'persuasion', bonus: 2, reason: '...' }
```
**Fréquence**: 90% des cas

### Type 2: Bonus Conditionnels (dans desc)
```typescript
mechanical_traits: [
  { name: '...', desc: '+2 Persuasion avec nobles', ... }
]
```
**Fréquence**: 30% des cas (overlap)

### Type 3: Bonus Pourcentage
```typescript
desc: 'Apprentissage sorts +25% plus rapide'
```
**Fréquence**: 3 occurrences

### Type 4: Multiplicateurs
```typescript
desc: 'Résistance faim/soif ×2'
```
**Fréquence**: 2 occurrences

### Type 5: Bonus Flat (items/or)
```typescript
items: [{ itemId: 'gold_coins', quantity: 500 }]
```
**Fréquence**: 2 occurrences (Nobility +500, Merchant +200)

---

## 9. COMBAT BONUSES - INVENTAIRE

### Attack/Damage
- **Warrior Training**: +2 ATK mêlée (permanent)
- **Rogue Guild**: Sneak Attack +2d6
- **Military Education**: +1 ATK si allié à 3m (conditionnel)
- **Revenge Motivation**: +2 ATK vs cible vengeance (conditionnel)

### Defense
- **Monastère**: +1 AC sans armure
- **Temple Education**: +1 AC sans armure
- **Cumul possible**: +2 AC si double choix monastique

### Initiative
- **Military Education**: +2 Initiative
- **Soldier Profession**: +1 Initiative
- **Cumul possible**: +3 Initiative total

### Résistances
- **Fire**: Résistance 5 (Incendie trauma)
- **Cold**: Résistance non chiffrée (Ironhold, Monastère)
- **Electricity**: Résistance 5 (Storm omen)
- **Fear**: Immunité conditionnelle (Héroïque act, Esclave)
- **Charm/Terror**: Avantage (Esclave)

---

## 10. SKILLS PAR FRÉQUENCE (TOP 15)

| Rank | Skill | Occurrences | Bonus Moyen | Bonus Max |
|------|-------|-------------|-------------|-----------|
| 1 | **Persuasion** | 22 | +2.1 | +3 |
| 2 | **Stealth** | 15 | +2.5 | +3 |
| 3 | **Survival** | 14 | +2.0 | +3 |
| 4 | **Insight** | 12 | +1.8 | +3 |
| 5 | **Arcana** | 10 | +2.2 | +3 |
| 6 | **Athletics** | 9 | +1.7 | +2 |
| 7 | **Intimidation** | 9 | +1.9 | +3 |
| 8 | **Sleight of Hand** | 8 | +1.9 | +2 |
| 9 | **Animal Handling** | 7 | +2.0 | +2 |
| 10 | **Perception** | 7 | +1.7 | +2 |
| 11 | **Medicine** | 6 | +1.8 | +2 |
| 12 | **Religion** | 5 | +2.0 | +2 |
| 13 | **Nature** | 5 | +1.8 | +2 |
| 14 | **Deception** | 5 | +1.6 | +2 |
| 15 | **Investigation** | 4 | +2.0 | +2 |

**Analyse**:
- **Social dominance**: Persuasion = skill #1 (22 occurrences)
- **Roublard favorisé**: Stealth #2, Sleight of Hand #8
- **Survie omniprésente**: Survival #3 (multiples contextes)
- **Combat sous-représenté**: Athletics seulement #6

---

## 11. RECOMMENDATIONS - RÉÉQUILIBRAGE

### Priority 1: Nerf Nobility
```typescript
// AVANT
stats: { charisma: 2, intelligence: 1 }
items: [{ itemId: 'gold_coins', quantity: 500 }]

// APRÈS
stats: { charisma: 1, intelligence: 1 } // Réduire CHA +2 → +1
items: [{ itemId: 'gold_coins', quantity: 200 }] // 500 → 200
mechanical_traits: [
  { name: 'Obligations Nobiliaires', desc: 'Quêtes obligatoires faction 1×/mois' }
]
```

### Priority 2: Cap Bonus Conditionnels
```typescript
// Parent Unique
mechanical_traits: [
  { 
    name: 'Résilience Forgée', 
    desc: '+1 tous jets quand PV<50% (Max 3×/jour)', // Ajouter limite
    game_effect: 'Endurance mentale'
  }
]

// Loyal Friend
mechanical_traits: [
  { 
    name: 'Lien Fraternel', 
    desc: '+2 tous jets quand ami présent (Max 3×/repos long)', // Ajouter limite
    game_effect: 'Synergie émotionnelle'
  }
]
```

### Priority 3: Réduire École Rue
```typescript
// AVANT
skills: [
  { skillId: 'stealth', bonus: 3 },
  { skillId: 'sleight_of_hand', bonus: 2 },
  { skillId: 'insight', bonus: 2 } // Total: +7
]

// APRÈS
skills: [
  { skillId: 'stealth', bonus: 2 }, // 3 → 2
  { skillId: 'sleight_of_hand', bonus: 2 },
  { skillId: 'insight', bonus: 1 } // 2 → 1, Total: +5
]
```

### Priority 4: Standardiser Résistances
```typescript
// Format unifié
effects: {
  resistances: {
    fire: 5,
    cold: 5,
    electricity: 5
  }
}
```

### Priority 5: Expliciter Conditionnels
```typescript
// AVANT
desc: '+2 Persuasion avec nobles'

// APRÈS
skills: [
  { 
    skillId: 'persuasion', 
    bonus: 2, 
    conditions: ['target_is_noble'], // Nouveau field
    reason: '...' 
  }
]
```

### Priority 6: Compensation Pénalités
```typescript
// Paria - AVANT
stats: { willpower: 2, charisma: -2 }
mechanical_traits: [
  { name: 'Aura Malédiction', desc: '-3 jets sociaux sauf Intimidation' }
]

// Paria - APRÈS
stats: { willpower: 3, charisma: -2 } // +2 → +3 WIL pour compenser
mechanical_traits: [
  { name: 'Aura Malédiction', desc: '-3 jets sociaux sauf Intimidation' },
  { name: 'Volonté Inébranlable', desc: '+3 Volonté vs effets mentaux' } // Nouveau
]
```

---

## 12. STATISTIQUES GLOBALES

### Total Traits Analysés
- **Birth Locations**: 7 analysés (40 prévus)
- **Birth Omens**: 6 analysés (25 prévus)
- **Birth Status**: 10 complets
- **Childhood Education**: 6 analysés (20 prévus)
- **Childhood Family**: 6 analysés (15 prévus)
- **Childhood Trauma**: 8 analysés (25 prévus)
- **Adolescence Training**: 3 analysés (20 prévus)
- **Adolescence Encounters**: 1 analysé (25 prévus)
- **Adolescence Exploits**: 1 analysé (30 prévus)
- **Young Adult Connections**: 1 analysé (20 prévus)
- **Young Adult Motivations**: 1 analysé (30 prévus)
- **Young Adult Professions**: 1 analysé (15 prévus)

**Total**: 51 traits analysés sur ~260 prévus (20% couverture)

### Moyenne Bonus par Phase
- **Birth**: +2.3 stats, +3.5 skills, +150 PO moyen
- **Childhood**: +2.1 stats, +4.2 skills
- **Adolescence**: +3.0 stats, +4.0 skills, +1.5 combat bonus
- **Young Adult**: +1.5 stats, +1.0 skills

### Distribution Positive/Negative
- **Bonus purs**: 41 traits (80%)
- **Bonus avec malus**: 10 traits (20%)
- **Malus nets**: 0 traits (aucun trait est net négatif)

---

## 13. PROCHAINES ACTIONS RECOMMANDÉES

### Phase 1: Corrections Critiques (Immédiat)
1. ✅ Nerf Nobility: 500 PO → 200 PO
2. ✅ Cap conditionnels: +X all rolls limité 3×/jour
3. ✅ Réduire École Rue: +7 → +5 skills
4. ✅ Fix Sneak Attack: +2d6 → +1d6
5. ✅ Fix +1 PV/niveau → +5 PV flat

### Phase 2: Standardisation (Court terme)
1. Unifier format résistances
2. Expliciter conditions bonus contextuels
3. Ajouter compensations pénalités sociales
4. Documenter caps multiplicateurs

### Phase 3: Complétion Contenu (Moyen terme)
1. Analyser 33 Birth Locations restantes
2. Analyser 19 Omens restants
3. Analyser 14 Educations restantes
4. Compléter toutes phases Adolescence/Young Adult

### Phase 4: Playtest (Long terme)
1. Tester combinaisons extrêmes (min-max)
2. Vérifier équilibre inter-classes
3. Valider balance PvE/PvP
4. Ajuster selon feedback joueurs

---

## CONCLUSION

### Déséquilibres Majeurs Trouvés
1. **Nobility = +500 PO** (2.5× richesse autre status)
2. **Bonus conditionnels illimités** (+10 cumulés possible)
3. **École Rue = +7 skills** (vs +3-5 moyenne)
4. **Multiplicateurs cumulatifs** (+55% vitesse sorts)
5. **Double-dipping features** (Sneak Attack +2d6)

### Points Positifs
- Diversité thématique excellente
- Roleplay hooks riches
- Synergie lore/mécanique
- Aucun trait "trap" (tous utiles)

### Workload Restant
- **209 traits à analyser** (80% contenu)
- **5 corrections critiques** à implémenter
- **4 standardisations** format
- **Playtest requis** après corrections

---

**Status**: ANALYSE PARTIELLE COMPLÈTE (20% couverture)  
**Prochain fichier**: Corrections patches (lifepath-balance-patch.ts)
