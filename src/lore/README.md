# README - Lore Aethelgard

Ce dossier contient toute la base de données lore (monde, personnages, règles) du RPG Aethelgard.

## 📁 Fichiers

### 📜 Système de Jeu
- **`rules.ts`** : Règles MJ (autorité absolue, cohérence, DC, refus roleplay)
- **`classes.ts`** : 10 classes jouables avec capacités
- **`backstories.ts`** : Backstories narratives par race/classe

### 🗺️ Monde
- **`locations.ts`** : Lieux (villes, donjons, régions, points d'intérêt)
- **`npcs.ts`** : PNJ (marchands, forgerons, gardes, quêtes)

### 🎒 Équipement
- **`items.ts`** : Armes, armures, potions, objets magiques

### 🎲 Création Personnage
- **`character-creation/`** : Système lifepath 13 phases
  - `phase1.ts` : Nom
  - `phase2.ts` : Race
  - `phase3.ts` : Région
  - `phase4.ts` : Classe
  - `phase5-13.ts` : Événements narratifs

---

## 🌍 Le Monde d'Aethelgard

### Géographie

**Kuldahar** (Capitale)
- Cité humaine fortifiée
- Marché, forges, auberges, temples
- Population ~15,000
- Dialecte : Commun d'Aethelgard

**Faille de l'Ombre**
- Brèche magique nécromantique
- Zone extrême (DC 70+)
- Créatures mortes-vivantes

**Autres lieux** : Voir `locations.ts`

---

## 👥 Races (5)

| Race | Bonus Stats | Traits |
|------|------------|--------|
| **Humain** | +5 tous | Polyvalent, adaptable |
| **Elfe** | +10 DEX, +10 INT | Longue vie, magie naturelle |
| **Nain** | +15 FOR, +10 CON | Résistant, forgeron |
| **Orque** | +20 FOR, -5 INT | Puissant, guerrier |
| **Demi-Elfe** | +5 CHA, +5 DEX | Diplomate, hybride |

---

## ⚔️ Classes (10)

### Guerrier
- **Rôle** : Tank, DPS mêlée
- **Stats** : +15 FOR, +10 CON
- **Capacités** :
  - Charge (bonus dégâts)
  - Défense héroïque (réduit dégâts)
  - Cri de guerre (intimide)

### Rôdeur
- **Rôle** : DPS distance, pistage
- **Stats** : +15 DEX, +10 PER
- **Capacités** :
  - Tir précis
  - Pistage
  - Compagnon animal

### Mage
- **Rôle** : Magie arcanique, contrôle
- **Stats** : +20 INT, +5 PER
- **Capacités** :
  - Boule de feu (AOE)
  - Bouclier magique
  - Téléportation courte

### Druide
- **Rôle** : Magie naturelle, support
- **Stats** : +15 INT, +10 CON
- **Capacités** :
  - Soin naturel
  - Métamorphose (loup, ours)
  - Contrôle plantes

### Prêtre
- **Rôle** : Soin, support divin
- **Stats** : +15 CHA, +10 INT
- **Capacités** :
  - Soin de masse
  - Bénédiction (+bonus attaque)
  - Bannir morts-vivants

### Voleur
- **Rôle** : Furtif, dégâts critiques
- **Stats** : +20 DEX, +10 PER
- **Capacités** :
  - Attaque sournoise (x2 dégâts dos)
  - Crocheter serrures
  - Désamorcer pièges

### Paladin
- **Rôle** : Tank/soin hybride
- **Stats** : +15 FOR, +10 CHA
- **Capacités** :
  - Frappe divine
  - Aura de protection (alliés +AC)
  - Imposition des mains (soin)

### Nécromancien
- **Rôle** : Magie noire, contrôle
- **Stats** : +20 INT, -5 CHA
- **Capacités** :
  - Animation morts
  - Drain de vie
  - Aura de terreur

### Barde
- **Rôle** : Support, buffs, social
- **Stats** : +15 CHA, +10 DEX
- **Capacités** :
  - Chant courage (+ATK alliés)
  - Chant repos (regen HP)
  - Distraction (ennemi -AC)

### Barbare
- **Rôle** : DPS burst, tank temporaire
- **Stats** : +20 FOR, +15 CON
- **Capacités** :
  - Rage (+50% dégâts, +20 HP temp)
  - Tourbillon (AOE mêlée)
  - Résistance douleur

---

## 🎒 Items (exemples)

### Armes
```typescript
{
  name: "Épée longue",
  type: "weapon",
  damage: "1d8+FOR",
  rarity: "common",
  price: 50
}
```

### Armures
```typescript
{
  name: "Armure de plates",
  type: "armor",
  ac_bonus: 8,
  weight: "heavy",
  rarity: "uncommon",
  price: 200
}
```

### Potions
```typescript
{
  name: "Potion de soin",
  type: "consumable",
  effect: "heal",
  value: "2d8+4",
  rarity: "common",
  price: 25
}
```

---

## 🎲 Système Lifepath

### Fonctionnement
13 phases narratives où le joueur fait des choix qui :
- Définissent son background
- Augmentent ses stats
- Génèrent sa backstory

### Exemple Phase 4 (Classe)

**Choix : Guerrier**
```javascript
{
  text: "Guerrier - Maître des armes et du combat",
  effects: {
    stats: { FORCE: 15, CONSTITUTION: 10 },
    abilities: ["Charge", "Défense héroïque"],
    backstory: "Formé dans les arènes de Kuldahar..."
  }
}
```

### Calcul Final Stats
```
BASE (50 dans chaque stat)
+ Race (ex: Humain +5 tous)
+ Classe (ex: Guerrier +15 FOR, +10 CON)
+ Phases 5-13 (événements +5 à +15 par choix)
= Stats finales (70-120 typique niveau 1)
```

---

## 📜 Règles MJ (rules.ts)

### 1. Autorité Absolue
Le MJ contrôle 100% du monde.
Joueur = INTENTIONS, pas résultats.

### 2. Anti-Complaisance
JAMAIS de narration avant jet de dés.
Template : "Lance 1d100+STAT vs DC X. Si tu réussis..."

### 3. Cohérence Environnementale
Joueur ne peut référencer que :
- Ce que MJ a décrit
- Ce qui existe dans lore

Refus en mode **roleplay** (pas méta-gaming).

### 4. Calibrage DC

| DC | Difficulté | Exemples |
|----|-----------|----------|
| 20-30 | FACILE | Parler PNJ amical |
| 35-45 | NORMAL | Convaincre marchand |
| 50-60 | DIFFICILE | Garde hostile |
| 65-75 | TRÈS DIFFICILE | Piège mortel |
| 80-90 | EXTRÊME | Porte magique |
| 95-100 | HÉROÏQUE | Défier dieux |

Ajuster selon niveau joueur (voir `LORE_AND_GM_GUIDE.md`).

### 5. Descriptions Précises
Chaque scène doit décrire :
- Objets visibles
- Sorties
- Lumière
- Présences
- Ambiance

### 6. Portes Fermées
NE PAS révéler ce qu'il y a derrière.
Sauf si panneau visible.

---

## 🗣️ Dialectes

**Commun d'Aethelgard** (langue officielle)
- Accent rocailleux (montagnes/nains)
- Accent chantant (côtes/marins)
- Accent neutre (citadins)

**N'EXISTE PAS** : Langues/accents Terre réelle (français, anglais, marseillais, etc.)

---

## 🚫 Éléments NON Canon

**Ne PAS inventer :**
- Guildes non listées dans `npcs.ts` ou `locations.ts`
- PNJ nommés non définis
- Capacités magiques hors classes
- Lieux non dans `locations.ts`
- Références monde réel (France, Amérique, etc.)

**Toujours vérifier** dans ces fichiers avant d'accepter une référence joueur.

---

## 📚 Documentation Complémentaire

- **Guide complet MJ** : `docs/LORE_AND_GM_GUIDE.md`
- **Règles autorité** : `docs/AUTORITE_MJ_ABSOLUE.md`
- **Architecture technique** : `docs/ARCHITECTURE.md`

---

## 🔄 Ajout de Contenu

### Ajouter un lieu
1. Éditer `locations.ts`
2. Format :
```typescript
{
  id: "unique-id",
  name: "Nom du lieu",
  type: "city" | "dungeon" | "wilderness",
  description: "Description détaillée",
  npcs: ["npc-id-1", "npc-id-2"],
  dangerLevel: 1-10
}
```

### Ajouter un PNJ
1. Éditer `npcs.ts`
2. Format :
```typescript
{
  id: "unique-id",
  name: "Nom PNJ",
  race: "human",
  occupation: "merchant",
  location: "kuldahar",
  disposition: "friendly" | "neutral" | "hostile",
  dialogue: {
    greeting: "...",
    quest: "...",
    farewell: "..."
  }
}
```

### Ajouter une classe
1. Éditer `classes.ts`
2. Définir stats de base, capacités, description
3. Ajouter dans `character-creation/phase4.ts`
4. Créer backstory dans `backstories.ts`

---

## 🎯 Usage dans Code

```javascript
// Import
import { CLASSES } from './lore/classes'
import { LOCATIONS } from './lore/locations'
import { ITEMS } from './lore/items'
import { RULES } from './lore/rules'

// Recherche
const warrior = CLASSES.find(c => c.id === 'warrior')
const kuldahar = LOCATIONS.find(l => l.id === 'kuldahar')
const sword = ITEMS.find(i => i.id === 'longsword')

// Envoi au MJ (prompt)
const loreContext = `
CLASSES: ${JSON.stringify(CLASSES)}
LOCATIONS: ${JSON.stringify(LOCATIONS)}
RULES: ${RULES.join('\n')}
`
```
