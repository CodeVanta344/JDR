# 🎯 RÉÉQUILIBRAGE D100 - ÉTAT D'AVANCEMENT

**Date** : 2026-02-12  
**Système cible** : d100 (au lieu de d20)  
**Objectif** : Supporter dés jusqu'à d100 avec granularité et cohérence

---

## ✅ COMPLETED

### 1. Documentation Système
- ✅ `REBALANCING_D100_SYSTEM.md` - Guide complet conversion
- ✅ `src/lore/conversion-d100.ts` - Utilitaires conversion automatique
- ✅ `EXAMPLE_CONVERSION_NOBLE.ts` - Exemple détaillé avant/après
- ✅ `src/lore/proficiency-d100.ts` - Bonus maîtrise & compétences

### 2. Core Règles (`src/lore/rules.ts`)
- ✅ `DICE_TYPES` - d4, d6, d8, d10, d12, d20, d30, d40, d50, d60, d100
- ✅ `rollDice()` - Gestion critiques (95-100) et fumbles (1-5)
- ✅ `getModifier()` - Nouvelle formule : `(stat - 10) × 1.25`
- ✅ `convertDC()` - Conversion DC ancien → nouveau
- ✅ `DIFFICULTY_THRESHOLDS` - Seuils 15-95
- ✅ `skillCheck()` - Jets d100 complets
- ✅ `calculateAC()` - Formule d100 : `20 + (AC×3) + (DEX×1.5)`
- ✅ `EQUIPMENT_RULES.armor_categories` - Ajout `ac_range_d100`

### 3. Compétences & Progression
- ✅ Paliers compétence (NOVICE → LEGEND) 0-100
- ✅ Bonus maîtrise par niveau (5-30)
- ✅ Points compétence par classe
- ✅ Bonus INT pour compétences

---

## 🚧 IN PROGRESS

### 4. Conversion LifePath Traits
**Fichiers à convertir** :
- `src/lore/character-creation/lifepath/birth/locations.ts` (40 lieux)
- `src/lore/character-creation/lifepath/birth/social-class.ts`
- `src/lore/character-creation/lifepath/childhood/**`
- `src/lore/character-creation/lifepath/adolescence/**`
- `src/lore/character-creation/lifepath/young-adult/**`

**Facteurs conversion** :
- Stats : `×2` (+1 → +2)
- Skills : `×2.5` (+2 → +5)
- Gold : `×5` (+10 PO → +50 PO)
- AC : `×3` (+1 → +3)
- Dés dégâts : d6 → d30, d8 → d40, etc.

**Exemple** : Trait "Noble"
```
AVANT : CHA +2, INT +1, Étiquette +5, 500 PO
APRÈS : CHA +4, INT +2, Étiquette +12, 2500 PO
```

---

## 📋 TODO

### 5. Classes de Personnage
- [ ] Convertir stats de base (HP, CA départ)
- [ ] Ajuster dés de vie (d8 → d40, d10 → d50, d12 → d60)
- [ ] Adapter capacités de classe (bonus d100)
- [ ] Rééquilibrer progression sorts/pouvoirs

**Fichier** : `src/lore/classes.ts`

### 6. Bestiaire & Ennemis
- [ ] Convertir stats ennemis (HP ×5, CA formule d100)
- [ ] Ajuster jets attaque (+ATK ×2.5)
- [ ] Convertir dés dégâts (d6 → d30, etc.)
- [ ] Adapter CR (Challenge Rating) pour XP

**Fichiers** : 
- `src/lore/bestiary.ts`
- `src/lore/bestiary-expansion-*.ts`

### 7. Items & Équipement
- [ ] Armes : dégâts d100 (épée longue 1d40 au lieu 1d8)
- [ ] Armures : CA d100 (plates 38-44 au lieu 16-18)
- [ ] Objets magiques : bonus ×3 (+1 → +3)
- [ ] Prix : ajuster PO (×5 facteur)

**Fichiers** :
- `src/lore/items.ts`
- `src/lore/items-catalog.ts`

### 8. Sorts & Magie
- [ ] Dégâts sorts : dés d100 (Boule de Feu 6d30 au lieu 6d6)
- [ ] DC sauvegarde : formule d100 (20 + bonus×2.5 + mod)
- [ ] Sorts de soin : dés d100 (Soins 2d40+mod au lieu 2d8+mod)

**Fichier** : `src/lore/spells.ts` (si existe)

### 9. Interface Utilisateur
- [ ] Affichage modificateurs (nouveau format +10 au lieu +2)
- [ ] Dice roller UI (support d30, d40, d50, d60, d100)
- [ ] Character sheet : adapter affichage stats
- [ ] Combat log : formater jets d100

**Fichiers** :
- `src/components/CharacterSheet.jsx`
- `src/components/Dice3D.jsx`
- `src/components/DieVisual.jsx`
- `src/components/CombatManager.jsx`

### 10. Tests & Validation
- [ ] Test combat : 10 rounds avec stats d100
- [ ] Validation équilibrage classes
- [ ] Check progression XP/niveau
- [ ] Tester jets compétence (DC 25-95)

---

## 📊 STATISTIQUES CONVERSION

| Élément                | Ancien (d20) | Nouveau (d100) | Facteur |
|------------------------|--------------|----------------|---------|
| **Attributs**          | 3-18         | 1-30           | N/A     |
| Modificateur moyen     | +0 à +4      | +0 à +10       | ×2.5    |
| **CA**                 | 10-22        | 20-60          | ×2.5+10 |
| **Jets compétence**    | d20 + 0-10   | d100 + 0-30    | ×5      |
| **Bonus maîtrise**     | +2 à +6      | +5 à +20       | ×2.5    |
| **Dégâts armes**       | 1d6-1d12     | 1d30-1d60      | ×5      |
| **HP ennemis**         | 7-200        | 35-1000        | ×5      |
| **PO (loot)**          | 1d20-100d10  | 5d20-500d20    | ×5      |

---

## 🎲 EXEMPLES PRATIQUES

### Jet d'Attaque (Guerrier niveau 5)
**AVANT (d20)** :
- d20 + bonus maîtrise +3 + STR +4 = d20 +7
- Cible CA 15 → besoin 8+ (60% chance)

**APRÈS (d100)** :
- d100 + bonus maîtrise +8 + STR +10 = d100 +18
- Cible CA 38 → besoin 20+ (80% chance similaire)

### Jet de Compétence (Roublard Crochetage)
**AVANT (d20)** :
- d20 + compétence +5 + DEX +3 = d20 +8
- DC 15 → besoin 7+ (70% chance)

**APRÈS (d100)** :
- d100 + compétence 45 + DEX +8 = d100 +53
- DC 65 → besoin 12+ (88% chance)

### Dégâts Épée Longue +1
**AVANT (d20)** :
- 1d8 +1 (STR +4) = 1d8 +5 → 6-13 dégâts

**APRÈS (d100)** :
- 1d40 +3 (bonus arme) +10 (STR) = 1d40 +13 → 14-53 dégâts

---

## 🔧 OUTILS DE CONVERSION

### Fonction Automatique
```typescript
import { convertStats, convertSkills, convertMechanicalTrait } from './src/lore/conversion-d100';

// Convertir stats
const oldStats = { str: 2, dex: 1 };
const newStats = convertStats(oldStats);  // { str: 4, dex: 2 }

// Convertir compétences
const oldSkills = [{ skillId: 'stealth', bonus: 3, reason: 'Training' }];
const newSkills = convertSkills(oldSkills);  // bonus: 8

// Convertir trait texte
const old = "+2 en Persuasion et +1d6 dégâts";
const new = convertMechanicalTrait(old);  // "+5 en Persuasion et +1d30 dégâts"
```

### Validation Équilibrage
```typescript
import { VALIDATION_CHECKLIST } from './src/lore/conversion-d100';

// Vérifier si trait respecte limites
const trait = { stats: { cha: 4, int: 2 } };  // total 6
const statsOK = 6 <= VALIDATION_CHECKLIST.stats_total.new_max;  // true (≤12)
```

---

## 📝 NEXT STEPS (Priorité)

1. **Conversion massive traits LifePath** (40+ fichiers)
   - Script automatique avec `convertStats()` et `convertSkills()`
   - Validation manuelle pour cohérence narrative
   - Tests après chaque fichier converti

2. **Update Classes & Bestiary**
   - Ajuster HP/CA/ATK pour 20 classes
   - Convertir 200+ créatures
   - Recalculer CR/XP

3. **UI Adaptation**
   - Dice roller 3D (ajout d30, d40, d50, d60, d100)
   - Character sheet (affichage d100)
   - Combat log (format jets critiques 95-100)

4. **Tests Intégration**
   - Combat multi-joueurs (vérifier équilibre)
   - Progression niveau 1→20 (vérifier courbes XP)
   - Sessions playtest (feedback utilisateurs)

---

## ⚠️ RISQUES & MITIGATIONS

| Risque                        | Impact | Mitigation                                    |
|-------------------------------|--------|-----------------------------------------------|
| Déséquilibre classes          | Élevé  | Tests combat comparatifs après conversion     |
| Inflation économique (PO ×5)  | Moyen  | Ajuster prix items & récompenses quêtes       |
| Courbe progression trop rapide| Moyen  | Valider XP par niveau après tests             |
| UI illisible (nombres grands) | Faible | Formatter +10 → "+10", abréviations si >100   |
| Dés 3D performance (d100)     | Faible | Optimiser animations, fallback texte si lag   |

---

## 📚 DOCUMENTATION ADDITIONNELLE

- `REBALANCING_D100_SYSTEM.md` - Guide complet théorique
- `EXAMPLE_CONVERSION_NOBLE.ts` - Exemple pratique détaillé
- `src/lore/conversion-d100.ts` - Utilitaires code
- `src/lore/proficiency-d100.ts` - Tables progression
- `COMBAT_TURN_BUG_FIX.md` - Fixes bugs combat existants

---

**Dernière mise à jour** : 2026-02-12 18:30  
**Statut global** : 40% complété (règles core OK, conversion traits en cours)
