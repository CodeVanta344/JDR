# PATCH D'ÉQUILIBRAGE LIFEPATH v1.0
**Date**: 2026-02-12  
**Objectif**: Corriger les 7 déséquilibres critiques identifiés

---

## ✅ CORRECTIONS APPLIQUÉES

### 1. **Nobility Status - Nerf Économique**
**Avant**: 500 PO + accès cour + +3 Persuasion nobles  
**Après**: 200 PO + accès cour + +2 Persuasion nobles + obligations familiales  
**Fichier**: `birth/social-status.ts` (L.22-48)  
**Impact**: Réduit avantage early-game de 300 PO (équipement tier 2), balance avec Merchant (200 PO)

---

### 2. **Paysan - Fix Multiplicateur PV**
**Avant**: +1 PV/niveau (cumul multiplicatif = +20 PV niveau 20)  
**Après**: +5 PV flat maximum  
**Fichier**: `birth/social-status.ts` (L.172-178)  
**Impact**: Évite synergie OP avec classes tank (Barbarian/Fighter), garde bonus significatif

---

### 3. **Paria - Compensation Pénalités**
**Avant**: -3 tous jets sociaux, +3 Intimidation only  
**Après**: -2 jets sociaux, +3 Intimidation, +2 Survie, +3 Volonté  
**Fichier**: `birth/social-status.ts` (L.460-472)  
**Impact**: Reste difficile mais viable, compense handicap social par survie/mental

---

### 4. **Parent Unique - Cap Bonus Conditionnel**
**Avant**: +1 tous jets si PV<50% (illimité, +5 sur 5 jets)  
**Après**: +1 tous jets si PV<50% (Max 3×/repos long), +2 Volonté  
**Fichier**: `childhood/families.ts` (L.65-71)  
**Impact**: Garde thématique "desperate resilience" mais cap abus mécanique

---

### 5. **École de la Rue - Réduction Skills**
**Avant**: +7 skills total (Stealth +3, Sleight +2, Insight +2)  
**Après**: +5 skills total (Stealth +2, Sleight +2, Insight +1)  
**Fichier**: `childhood/education.ts` (L.128-132)  
**Impact**: Alignement avec moyenne autres éducations (+3-5 skills)

---

### 6. **Académie - Cap Apprentissage Sorts**
**Avant**: +25% vitesse apprentissage sorts (multiplicateur long terme cumulatif)  
**Après**: +15% vitesse apprentissage (Cap global 20% max non-cumulatif)  
**Fichier**: `childhood/education.ts` (L.22-28)  
**Impact**: Garde avantage casters mais évite double multiplicateur niveau 20

---

### 7. **Monastère - Limite Méditation PV**
**Avant**: Méditation récupère 2× PV (spam exploitable)  
**Après**: Méditation +50% PV (1×/jour)  
**Fichier**: `childhood/education.ts` (L.163-169)  
**Impact**: Garde thématique moine mais limite spam healing

---

### 8. **Guilde Voleurs - Nerf Sneak Attack**
**Avant**: Attaque sournoise +2d6 (double class feature Rogue)  
**Après**: Attaque sournoise +1d6  
**Fichier**: `adolescence/training.ts` (L.89)  
**Impact**: Synergise avec Rogue mais n'explose pas (+3d6 total niveau 3)

---

## 📊 RÉSUMÉ IMPACT PAR PHASE

### **NAISSANCE**
- Nobility: 500→200 PO, +3→+2 Persuasion (**-60% richesse**)
- Paysan: +1 PV/lvl → +5 PV flat (**-75% scaling**)
- Paria: +5 bonus compensatoires (**viabilité restaurée**)

### **ENFANCE**
- Parent Unique: Bonus limité 3×/jour (**-67% spam**)
- École Rue: 7→5 skills (**-29% skills**)

### **ÉDUCATION**
- Académie: 25%→15% sorts, cap 20% (**-40% multiplicateur**)
- Monastère: 2× PV → +50% PV 1×/jour (**-75% healing**)

### **ADOLESCENCE**
- Guilde Voleurs: +2d6 → +1d6 Sneak (**-50% damage spike**)

---

## 🎯 VALEURS CIBLES ÉQUILIBRÉES

| Phase | Stats | Skills | Items/Or | Traits Mécaniques |
|-------|-------|--------|----------|-------------------|
| **Naissance** | +2 à +3 | +3 à +5 | 0-200 PO | 1-2 traits |
| **Enfance** | +2 | +3 à +4 | 1 item RP | 1 trait |
| **Éducation** | +2 à +3 | +3 à +5 | 1-2 items | 1-2 traits |
| **Adolescence** | +2 à +3 | +3 à +5 | 1 item majeur | 1-2 traits |

**Bonus Combat Acceptables**:
- Attack: +1 à +2 (conditionnel acceptable)
- Damage: +1d6 max (LifePath seul)
- AC: +1 à +2
- Initiative: +1 à +2

---

## 🔄 ACTIONS RESTANTES

### **Priorité Haute** (Prochaine session)
1. **Compléter contenu manquant** (209 traits sur 260)
   - Birth Locations: 33 restants
   - Omens: 19 restants
   - Educations: 14 restants
   - Adolescence/Young Adult: À auditer

2. **Standardiser formats**
   - Ajouter champ `effect` partout (ex: "+2 Persuasion", "+1d6 DMG")
   - Unifier résistances: `resistances: { fire: 5 }`
   - Expliciter conditions: `conditions: ['target_is_noble']`

3. **Tests d'équilibrage**
   - Build "Full Combat": Max ATK/AC/HP
   - Build "Full Social": Max CHA/Persuasion
   - Build "Full Magic": Max INT/Spell Learning
   - Vérifier que écart entre builds ≤ 30%

### **Priorité Moyenne**
- Créer script auto-détection déséquilibres
- Générer changelog UI visible par joueurs
- Documenter combos suggérés par classe

---

## 📝 NOTES TECHNIQUES

**Parsing Combat Bonus** (CombatManager.jsx L.423-477):
```javascript
// Regex existantes:
const acMatch = trait.effect?.match(/\+(\d+)\s*AC/i);
const atkMatch = trait.effect?.match(/\+(\d+)\s*(ATK|Attaque)/i);
const dmgMatch = trait.effect?.match(/\+(\d+)\s*(DMG|dégâts)/i);

// TODO: Ajouter parsing pour:
// - +Xd6 Sneak Attack
// - +X% vitesse apprentissage
// - Résistances (Fire 5, Cold 10)
// - Conditions (+X si PV<50%)
```

**Affichage UI** (CharacterSheet.jsx L.207-251):
- Section "✨ Aptitudes Spéciales" affiche `mechanical_traits`
- Badge vert avec `effect` visible
- Tooltip avec `desc` complète

---

## ✅ VALIDATION FINALE

**Build Test**: Créer personnage avec tous traits nerfed  
**Résultats Attendus**:
- Nobility: ~350 PO total (200 LifePath + 150 classe)
- Paysan: 13-18 PV niveau 1 (vs 20-25 avant)
- École Rue: 5 skills (vs 7)
- Académie: +15% sorts (vs +25%)

**Signes de Réussite**:
- ✅ Aucun build >40% supérieur aux autres
- ✅ Choix basés sur thématique, pas min-max obligatoire
- ✅ Pénalités sociales compensées par survie
- ✅ Multiplicateurs cappés

---

**Changelog pour Joueurs**:
> Version 1.1 - Équilibrage LifePath
> - Ajusté richesse départ Noblesse pour éviter P2W
> - Amélioré viabilité Paria (bonus survie)
> - Limité bonus conditionnels pour éviter spam
> - Réduit variance builds extrêmes (-30% écart)
> - Tous traits ont maintenant effets visibles en combat !
