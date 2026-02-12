# 🎲 Système d100 - Document de Rééquilibrage Complet

## 📊 Échelle Globale

### Ancien Système (d20)
- **Attributs** : 3-18 (moyenne 10-11)
- **Compétences** : 0-20 (bonus +0 à +10)
- **CA** : 10-22
- **Jets** : d20 (1-20) + modificateur (±5)

### Nouveau Système (d100)
- **Attributs** : 1-30 (moyenne 15)
- **Compétences** : 0-100 (maîtrise progressive)
- **CA** : 20-60
- **Jets** : d100 (1-100) + modificateur (0-30)

---

## 🎯 Conversion des Seuils de Difficulté

| Difficulté    | d20 (ancien) | d100 (nouveau) | Description                      |
|---------------|--------------|----------------|----------------------------------|
| Très facile   | 5            | 25             | Routine pour un novice           |
| Facile        | 8            | 35             | Accessible avec minimal effort   |
| Moyen         | 12           | 50             | Requiert compétence modérée      |
| Difficile     | 15           | 65             | Challenge pour expert            |
| Très difficile| 18           | 80             | Héroïque, quasi-impossible       |
| Légendaire    | 20           | 95             | Digne des légendes               |

**Formule conversion** : `DC_d100 = (DC_d20 × 5) - 5`

---

## ⚔️ Système de Combat

### Classe d'Armure (CA)
```
Formule d100 : CA = 20 + (AC_armure × 3) + (DEX_mod × 1.5) + (bonus_shield × 3)
```

| Type armure  | AC ancien | AC nouveau | Exemple                  |
|--------------|-----------|------------|--------------------------|
| Aucune       | 10        | 20         | Robes, vêtements         |
| Légère       | 11-12     | 23-26      | Cuir, tunique renforcée  |
| Intermédiaire| 13-15     | 29-35      | Cuir clouté, écailles    |
| Lourde       | 16-18     | 38-44      | Cotte de mailles, plates |
| Bouclier     | +2        | +6         | Bonus additionnel        |

### Jets d'Attaque
```
Formule : d100 + STR/DEX_mod + bonus_maîtrise
```

| Niveau   | Bonus maîtrise ancien | Bonus maîtrise nouveau |
|----------|-----------------------|------------------------|
| 1-4      | +2                    | +5                     |
| 5-8      | +3                    | +8                     |
| 9-12     | +4                    | +12                    |
| 13-16    | +5                    | +15                    |
| 17-20    | +6                    | +20                    |

### Dégâts
```
Conversion dés dégâts :
- 1d4 → 1d20 (dague)
- 1d6 → 1d30 (épée courte)
- 1d8 → 1d40 (épée longue)
- 1d10 → 1d50 (arme lourde)
- 1d12 → 1d60 (hache à deux mains)
- 2d6 → 2d30 (épée bâtarde)
```

**Armes critiques** : Dés supplémentaires sur 95-100 (au lieu de 20)

---

## 🧙 Attributs & Modificateurs

### Nouvelle Échelle (1-30)
```
Score | Modificateur | Signification
------|--------------|---------------
1-2   | -5           | Handicap sévère
3-5   | -3           | Très faible
6-8   | -1           | Faible
9-11  | 0            | Médiocre
12-14 | +2           | Moyen (humain standard)
15-17 | +5           | Au-dessus moyenne
18-20 | +8           | Remarquable
21-23 | +12          | Exceptionnel
24-26 | +16          | Héroïque
27-29 | +20          | Légendaire
30    | +25          | Divin
```

**Formule modificateur** : `(Attribut - 10) × 1.25` arrondi

### Création Personnage
```
Méthode Standard (Point-Buy) :
- Pool de points : 75
- Coût par point : linéaire (1 point = +1 attribut)
- Minimum : 8 par attribut
- Maximum départ : 18 (23 avec bonus raciaux)

Exemple répartition équilibrée :
STR: 14 (+2)  |  INT: 12 (+1)
DEX: 15 (+3)  |  WIS: 13 (+2)
CON: 14 (+2)  |  CHA: 12 (+1)
Total: 80 points avec bonus raciaux
```

---

## 📈 Compétences (0-100)

### Paliers de Maîtrise
| Niveau      | Score   | Bonus | Description                    |
|-------------|---------|-------|--------------------------------|
| Novice      | 0-20    | +0    | Connaissances basiques         |
| Apprenti    | 21-40   | +5    | Formation débutante            |
| Compétent   | 41-60   | +10   | Pratique régulière             |
| Expert      | 61-80   | +15   | Reconnaissance professionnelle |
| Maître      | 81-95   | +20   | Parmi les meilleurs du royaume |
| Légende     | 96-100  | +30   | Réputation mondiale            |

### Progression Compétences
```
Base par niveau : +5 points / niveau
Bonus INT : +1 point / niveau par point INT au-dessus de 12
Bonus classe :
- Roublard : +10 pts/lvl (spécialiste compétences)
- Barde : +8 pts/lvl
- Rôdeur : +7 pts/lvl
- Autres : +5 pts/lvl
```

### Jets de Compétence
```
d100 + Score_compétence + Attribut_mod >= DC

Exemple : Crochetage (Difficulté 65)
- Roublard niveau 5
- Crochetage : 45
- DEX : 18 (+8)
- Jet : 1d100 + 45 + 8 = 1d100 + 53
- Besoin de 12+ sur d100 (88% chance succès)
```

---

## 🎭 Traits LifePath (Rééquilibrés)

### Bonus Proportionnels
```
Ancien (d20) → Nouveau (d100)
+1 stat     → +2 stat
+2 stat     → +4 stat
+5 PO       → +25 PO
+2 compét.  → +5 compétence
+1 AC       → +3 AC
+1d6 dégâts → +1d30 dégâts
```

### Exemples Conversion

**Noble (Phase Enfance)**
```
AVANT :
- CHA +2, INT +1
- +500 PO
- Étiquette +5, Diplomatie +3

APRÈS :
- CHA +4, INT +2
- +2500 PO
- Étiquette +12, Diplomatie +8
```

**Soldat (Phase Jeune Adulte)**
```
AVANT :
- STR +2, CON +1
- Armes martiales +3
- +1 AC

APRÈS :
- STR +4, CON +2
- Armes martiales +8
- +3 AC (bonus expérience)
```

**Mage Autodidacte**
```
AVANT :
- INT +3
- 2 sorts niveau 1
- Arcanes +5

APRÈS :
- INT +6
- 2 sorts niveau 1
- Arcanes +12
- +1d20 dégâts sorts (bonus recherche)
```

---

## 🐉 Ennemis & PNJ

### Conversion Statistiques
```
Gobelin :
- PV : 7 → 35 (×5)
- CA : 13 → 32 (+19)
- ATK : +4 → +10
- DMG : 1d6+2 → 1d30+5

Dragon Adulte :
- PV : 200 → 1000 (×5)
- CA : 19 → 48 (+29)
- ATK : +14 → +35
- DMG : 2d10+7 → 2d50+18
- Souffle : 12d8 → 12d40
```

### Difficulté Rencontres
```
Formule XP récompense :
XP = (CR_ennemi × 100) × multiplicateur_groupe

Multiplicateur :
- Solo vs groupe : ×0.75
- Groupe équilibré : ×1.0
- Horde (10+) : ×1.5
```

---

## 🎁 Objets Magiques

### Bonus Équipement
```
+1 (mineur)  → +3 (d100)
+2 (majeur)  → +6
+3 (légende) → +10

Épée Longue +1 :
- DMG : 1d8+1 → 1d40+3
- ATK : +1 → +3

Armure de Plates +2 :
- AC : 18+2=20 → 44+6=50
```

### Résistances
```
Résistance élément (ancien) → Résistance d100
- 1/2 dégâts → Réduit 50% dégâts (inchangé)
- Immunité → Immunité (inchangé)
```

---

## 🧪 Sorts

### Dés de Dégâts Sorts
```
Niveau sort | d20 système | d100 système
------------|-------------|-------------
1           | 1d6-2d6     | 1d30-2d30
2           | 2d6-3d6     | 2d30-3d30
3           | 4d6-6d6     | 4d30-6d30
4           | 6d6-8d6     | 6d30-8d30
5           | 8d6-10d6    | 8d30-10d30
6           | 10d6-12d6   | 10d30-12d30
7+          | +2d6/lvl    | +2d30/lvl
```

### DC Sauvegarde Sorts
```
Ancien : 8 + bonus_maîtrise + mod_lanceur
Nouveau : 20 + (bonus_maîtrise × 2.5) + mod_lanceur

Exemple Mage niveau 10 (INT 20, +8) :
- DC ancien : 8 + 4 + 5 = 17
- DC nouveau : 20 + (12) + 20 = 52
```

---

## 🏆 Récompenses & Progression

### XP par Niveau (ajusté)
```
Niveau 1 → 2 : 300 XP (inchangé)
Niveau 5 → 6 : 6500 XP → 32500 XP (×5)
Niveau 10 → 11 : 64000 XP → 320000 XP (×5)
Niveau 20 : 640000 XP → 3200000 XP (×5)
```

**Justification** : Combats d100 plus longs, récompenses proportionnelles

### Loot Table
```
PO trouvées (ancien) → PO trouvées (nouveau)
1d20 → 5d20 (petits bandits)
10d10 → 50d20 (trésor dragon mineur)
1000-5000 → 5000-25000 (récompense quête majeure)
```

---

## ⚙️ Implémentation Technique

### Fichiers à Modifier
1. `src/lore/rules.ts` - Core règles & conversions
2. `src/lore/classes.ts` - Stats classes
3. `src/lore/character-creation/lifepath/**` - Bonus traits
4. `src/lore/bestiary.ts` - Stats ennemis
5. `src/lore/items-catalog.ts` - Armes, armures
6. `src/components/CombatManager.jsx` - Jets combat
7. `src/components/CharacterSheet.jsx` - Affichage stats

### Fonctions Clés
```typescript
// Nouveau modificateur attribut
export const getModifier = (stat: number): number => {
  return Math.round((stat - 10) * 1.25);
};

// Jet d100 avec compétence
export const skillCheck = (
  skillValue: number,
  attributeMod: number,
  dc: number
): { success: boolean; roll: number; total: number } => {
  const roll = Math.floor(Math.random() * 100) + 1;
  const total = roll + skillValue + attributeMod;
  return { success: total >= dc, roll, total };
};

// Conversion DC ancien → nouveau
export const convertDC = (oldDC: number): number => {
  return (oldDC * 5) - 5;
};
```

---

## 📝 Checklist Conversion

- [ ] Mettre à jour `getModifier()` formule
- [ ] Ajouter types dés (d30, d40, d50, d60, d100)
- [ ] Convertir tous AC ennemis (×2.5 +10)
- [ ] Ajuster bonus traits LifePath (×2-3)
- [ ] Mettre à jour tables compétences (0-100)
- [ ] Rebalancer armes (dés × 5)
- [ ] Convertir sorts (dégâts × 5)
- [ ] Adapter UI affichage (notation d100)
- [ ] Tests combat : 10 rounds avec stats converties
- [ ] Valider progression XP / niveau

---

## 🎲 Types de Dés Disponibles

```typescript
export const DICE_TYPES = [
  'd4',   // Dague, coup de poing
  'd6',   // Arme simple légère
  'd8',   // Arme simple standard
  'd10',  // Arme martiale
  'd12',  // Grande arme
  'd20',  // Dague d100, sorts mineurs
  'd30',  // Épée courte d100
  'd40',  // Épée longue d100
  'd50',  // Arme lourde d100
  'd60',  // Arme deux mains d100
  'd100'  // Jets compétence, chance pure
];
```

**Règle critique d100** : 
- 95-100 = Critique (double dégâts)
- 1-5 = Échec critique (événement négatif)

---

## ✅ Avantages Système d100

1. **Granularité** : Différence visible entre novice (30) et expert (70)
2. **Pourcentages intuitifs** : Score 60 = 60% base + mods
3. **Progression satisfaisante** : +5 compétence/niveau perceptible
4. **Challenges variés** : DC 25-95 couvrent toute difficulté
5. **Compatibilité** : Conversion facile règles d20 existantes

---

**Date mise à jour** : 2026-02-12  
**Version** : 1.0 - Rééquilibrage complet d100
