# Journal des Modifications (Changelog)

Format : [VERSION] - Date - Description

---

## [Non publié]

### Ajouté
- **Items LifePath** : Ajout de 6 items manquants au catalogue (`library_card_royal`, `fine_quill_set`, `city_map_detailed`, `family_heirloom`, `quality_sword`, `veteran_badge`)
- **Synchronisation traits LifePath** : `mechanical_traits` et `skill_bonuses` maintenant persistés en base de données pour le multijoueur

### Corrigé
- **Double message narratif** : Correction de la vérification `hasGMIntro` qui cherchait `role === 'gm'` au lieu de `'assistant'`
- **Premier message manquant** : Les joueurs non-hôtes récupèrent maintenant les messages via `fetchData()` quand le marqueur est détecté
- **Self-targeting spells** : `executeSelfBuff` utilise maintenant l'état frais via `combatantsRef` au lieu de `canAct` memoized

---

## 2025-02-15

### Corrigé
- **Affichage professions** : Correction de la persistance et affichage des métiers dans la fiche personnage
- **Table `player_professions`** : Création de la table pour stocker les métiers appris via Codex
- **Dice UI** : Correction de l'affichage des dés et suppression des doubles lancers
- **Tension Meter** : Suppression complète de la barre de danger et de son code associé

---

## 2025-02-14

### Ajouté
- **Système de métiers (Professions)** : Intégration du nouveau système avec tables dédiées
- **Système de récolte (Gathering)** : Ajout des spots de récolte et minijeu
- **Character Sheet refactor** : Nouvel onglet Métiers avec affichage des rangs

### Modifié
- **LifePath data** : `mechanical_traits` et `skill_bonuses` extraits lors de la création de personnage

### Corrigé
- **Conflits de merge** : Résolution des conflits de synchronisation

---

## Patterns de commit courants

### Types de modifications
- `[AJOUT]` : Nouvelle fonctionnalité
- `[CORRECTION]` : Bug fix
- `[MODIFICATION]` : Changement comportement existant
- `[REFACTORING]` : Restructuration code sans changement fonctionnel
- `[DOCS]` : Documentation uniquement

### Structure d'un commit
```
[TYPE] Description courte

- Détail 1
- Détail 2
- Impact sur [fichier/composant]
```

---

## Notes de développement

### Fichiers critiques à surveiller
1. `App.jsx` : État global, flux multijoueur
2. `CombatManager.jsx` : Logique combat, timing crucial
3. `items-catalog.ts` : Nouveaux items doivent être ajoutés à `ALL_ITEMS`
4. `classes.ts` : Définitions des sorts, propriété `target` essentielle

### Tests manuels recommandés avant déploiement
- [ ] Création personnage avec LifePath complet
- [ ] Démarrage session multijoueur (2+ joueurs)
- [ ] Combat avec sorts self-targeting
- [ ] Apprentissage métier via Codex
- [ ] Reconnexion/rechargement page en multijoueur

### Commandes utiles
```bash
# Build local
npm run build

# Déploiement production
npx vercel --prod --yes

# Vérification logs Supabase
# → Dashboard > Logs > API/Edge Functions
```
