# Système de Dés Progressifs D100

## Vue d'ensemble

Le système de dés progressifs d'Aethelgard remplace le système d100 fixe par un système **adaptatif** où les joueurs lancent des dés de plus en plus puissants au fur et à mesure de leur progression, tandis que les Degrés de Difficulté (DD) s'ajustent dynamiquement selon le niveau du personnage et la complexité de la tâche.

---

## 🎲 Échelle de Dés par Niveau

### Niveau 1-5 : Novice
- **Dé** : 1d20 × 5 (pour obtenir un score sur 100)
- **Bonus** : Stat ×2 (max 20) + Compétence ×2.5 (max 25)
- **Philosophie** : Même les tâches simples sont challengeantes. Les échecs fréquents font partie de l'apprentissage.

**Exemple** : Niveau 3, DEX 12, Crochetage 4
- Jet : `1d20 ×5 + 24 + 10 = 1d20 ×5 + 34`

---

### Niveau 6-10 : Expérimenté
- **Dé** : 1d50 (score direct de 1 à 50)
- **Bonus** : Stat ×2 (max 20) + Compétence ×2.5 (max 50)
- **Philosophie** : Les tâches courantes deviennent faciles. Le focus est sur les défis intermédiaires.

**Exemple** : Niveau 8, INT 14, Investigation 8
- Jet : `1d50 + 28 + 20 = 1d50 + 48`

---

### Niveau 11-15 : Vétéran
- **Dé** : 1d75 (score direct de 1 à 75)
- **Bonus** : Stat ×2 (max 20) + Compétence ×2.5 (max 75)
- **Philosophie** : Les tâches normales sont triviales. Seuls les défis majeurs nécessitent des jets.

**Exemple** : Niveau 13, CHA 16, Persuasion 12
- Jet : `1d75 + 32 + 30 = 1d75 + 62`

---

### Niveau 16-20 : Maître
- **Dé** : 1d100 (score direct de 1 à 100)
- **Bonus** : Stat ×2 (max 20) + Compétence ×2.5 (max 100)
- **Philosophie** : Les exploits héroïques sont possibles. Seules les tâches légendaires sont incertaines.

**Exemple** : Niveau 18, FOR 18, Athlétisme 16
- Jet : `1d100 + 36 + 40 = 1d100 + 76`

---

## 📊 Formule de DD Dynamique

```
DD_BASE = 30 + (COMPLEXITÉ_TÂCHE × 10) - (NIVEAU_JOUEUR × 2)
```

### Échelle de Complexité

| Complexité | Description | Exemples |
|------------|-------------|----------|
| **0 - Triviale** | Action sans difficulté | Ouvrir porte non verrouillée, parler à PNJ amical |
| **1 - Facile** | Tâche simple avec peu de risque | Serrure simple, convaincre marchand neutre, escalader avec prises |
| **2 - Moyenne** | Tâche standard avec risque modéré | Serrure normale, négocier prix, piste de pistage fraîche |
| **3 - Difficile** | Tâche complexe avec risque élevé | Serrure complexe, convaincre garde hostile, équilibre précaire |
| **4 - Très Difficile** | Défi majeur avec expertise requise | Serrure magique, persuader noble méfiant, acrobatie aérienne |
| **5 - Héroïque** | Exploit surhumain | Coffre-fort royal, convaincre dragon, défier gravité |
| **6 - Légendaire** | Tâche quasi-impossible | Artefact protégé par dieux, négocier avec démon majeur |

---

## 🎯 Exemples Concrets

### Cas 1 : Crocheter Serrure Simple (Complexité 1)

**Niveau 3 (Novice)**
```
DD = 30 + (1 × 10) - (3 × 2) = 34
Dé : 1d20 ×5 + 34
```
→ Avec DEX 12 et Crochetage 4, même un 1 naturel réussit (1×5=5, 5+34=39 > DD34) !

**Niveau 8 (Expérimenté)**
```
DD = 30 + (1 × 10) - (8 × 2) = 24
Dé : 1d50 + 48
```
→ **Impossible d'échouer** (même 1+48=49 > DD24). Réussite automatique !

---

### Cas 2 : Persuader Garde Hostile (Complexité 3)

**Niveau 3 (Novice)**
```
DD = 30 + (3 × 10) - (3 × 2) = 54
Dé : 1d20 ×5 + 25
```
→ Besoin de 6+ au dé (6×5=30, 30+25=55 > DD54). Difficile mais possible.

**Niveau 15 (Vétéran)**
```
DD = 30 + (3 × 10) - (15 × 2) = 30
Dé : 1d75 + 62
```
→ **Impossible d'échouer** (même 1+62=63 > DD30). Maître de la diplomatie !

---

### Cas 3 : Négocier avec Démon Majeur (Complexité 6)

**Niveau 3 (Novice)**
```
DD = 30 + (6 × 10) - (3 × 2) = 84
Dé : 1d20 ×5 + 25
```
→ Maximum possible : 20×5+25=125. **Théoriquement possible** mais nécessite un 20 naturel et beaucoup de chance !

**Niveau 15 (Vétéran)**
```
DD = 30 + (6 × 10) - (15 × 2) = 60
Dé : 1d75 + 62
```
→ Besoin de 1+ au dé (minimum 1+62=63 > DD60). Quasi-réussite garantie pour un vétéran !

---

## ✨ Seuils Critiques

### Réussite Critique
| Niveau | Seuil | Effet |
|--------|-------|-------|
| 1-5 | 20 naturel au d20 (avant ×5) | Succès spectaculaire + bonus narratif/mécanique |
| 6-10 | 48-50 au d50 | Succès spectaculaire + bonus narratif/mécanique |
| 11-15 | 73-75 au d75 | Succès spectaculaire + bonus narratif/mécanique |
| 16-20 | 95-100 au d100 | Succès spectaculaire + bonus narratif/mécanique |

### Échec Critique
| Niveau | Seuil | Effet |
|--------|-------|-------|
| 1-5 | 1 naturel au d20 (avant ×5) | Échec désastreux + conséquences narratives graves |
| 6-10 | 1-3 au d50 | Échec désastreux + conséquences narratives graves |
| 11-15 | 1-3 au d75 | Échec désastreux + conséquences narratives graves |
| 16-20 | 1-5 au d100 | Échec désastreux + conséquences narratives graves |

---

## 📋 Règles d'Application (MJ)

1. **Toujours** consulter le niveau du personnage pour déterminer le dé à lancer
2. **Toujours** calculer le DD avec la formule dynamique (pas de DD fixes)
3. **Si le joueur ne peut pas échouer** (bonus total > DD) : Narrer la réussite automatique, ne pas demander de jet
4. **Si le joueur ne peut pas réussir** même avec max naturel + bonus : Indiquer que c'est impossible, proposer alternative
5. **Ajuster la complexité** selon contexte : équipement adapté (-1 complexité), conditions difficiles (+1 complexité)
6. **Dans le champ "challenge"** : spécifier le type de dé (`"dice_type": "1d20×5"` ou `"1d50"`)

---

## 🎮 Format JSON du Challenge

```json
{
  "challenge": {
    "skill": "Dexterite",
    "dc": 34,
    "reason": "Crocheter la serrure simple de la porte",
    "dice_type": "1d20×5",
    "player_level": 3,
    "task_complexity": 1,
    "consequences_failure": "La serrure se bloque, -10 au prochain essai",
    "consequences_success": "La porte s'ouvre silencieusement"
  }
}
```

**Exemples de dice_type par niveau** :
- Niveau 3 : `"1d20×5"`
- Niveau 8 : `"1d50"`
- Niveau 13 : `"1d75"`
- Niveau 18 : `"1d100"`

---

## 🎯 Philosophie du Système

Le système **récompense la progression** :
- Un héros niveau 15 **ne doit pas** galérer sur une serrure simple
- Un débutant niveau 2 **ne doit pas** réussir des tâches héroïques sans effort exceptionnel
- La montée en puissance est **palpable** : les joueurs sentent vraiment leur progression
- Les DD s'adaptent pour maintenir le **challenge approprié** à chaque niveau

---

## 🔧 Intégration Technique

**Fichiers modifiés** :
- `supabase/functions/game-master/index.ts` : Règles complètes du système (lignes 461-594)
- Section 3b "PROGRESSIVE DICE SYSTEM" ajoutée avec exemples détaillés

**Déploiement** :
- Déployé sur Vercel : https://jdr-igvy961oh-codevantas-projects.vercel.app
- Commit : `c98fbb5` - "feat(gm): implement progressive dice system (d20→d50→d75→d100) with dynamic DC scaling by level+complexity"

---

## 📚 Prochaines Étapes

1. **Côté client** : Intégrer l'interface de jets de dés 3D avec les nouveaux types (d20, d50, d75, d100)
2. **CombatManager.jsx** : Adapter les formules de combat pour utiliser le système progressif
3. **DiceChallengeModal.jsx** : Afficher le type de dé approprié selon le niveau
4. **Tests** : Valider l'équilibrage avec des sessions de jeu réelles

---

*Document créé le 13 février 2026*
