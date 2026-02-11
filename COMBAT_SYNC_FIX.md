# FIX: Combat Synchronization Issues

## Problème identifié
- **Rollbacks** : Plusieurs clients modifient l'état du combat simultanément
- **Conflits d'écriture** : Pas de stratégie de résolution de conflits
- **Entités manquantes** : Images "150 x 150" indiquent des données non synchronisées

## Solution implémentée

### 1. Système de verrouillage optimiste (Optimistic Locking)
- Chaque modification combat a un numéro de version
- Les conflits sont détectés et résolus automatiquement
- Les mises à jour échouent si la version a changé (evite les écrasements)

### 2. Hook personnalisé `useCombatSync`
- Gère la synchronisation automatiquement
- File d'attente pour les mises à jour pendantes
- Évite les boucles infinies de mises à jour

### 3. Table de verrouillage `combat_locks`
- Verrouille le tour actuel pour un seul joueur à la fois
- Empêche plusieurs joueurs d'agir simultanément

## Installation (2 minutes)

### Étape 1: Exécuter la migration SQL

1. **Ouvrir** : https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new

2. **Copier** le contenu de `supabase/migrations/20260211_combat_sync_improvements.sql`

3. **Coller** dans l'éditeur SQL et cliquer **"RUN"**

### Étape 2: Activer Realtime pour combat_locks

1. **Ouvrir** : https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/database/replication

2. **Cocher** la case à côté de `combat_locks`

### Étape 3: Tester

1. Lancer le jeu avec 2 joueurs
2. Initier un combat
3. Les actions doivent être fluides sans rollback
4. Chaque joueur doit voir les actions des autres instantanément

## Améliorations techniques

### Avant (problématique)
```javascript
// Mise à jour directe sans vérification
await supabase.from('world_state').update({ value: newState })
// ❌ Risque d'écrasement concurrent
```

### Après (robuste)
```javascript
// Mise à jour avec vérification de version
const { data } = await supabase.from('world_state')
    .update({ value: newState })
    .eq('version', currentVersion) // ✅ Échec si version changée
```

## Bénéfices

1. ✅ **Zéro rollback** : Les conflits sont détectés et résolus
2. ✅ **Synchronisation temps réel** : Tous les joueurs voient les mêmes données
3. ✅ **Performances** : Optimisation des requêtes de mise à jour
4. ✅ **Fiabilité** : Système de retry automatique en cas de conflit

## Fallback (si problèmes persistent)

Si les problèmes continuent après la migration :

1. Vérifier que Realtime est activé pour `world_state` ET `combat_locks`
2. Vérifier les logs du navigateur (F12 → Console)
3. Vérifier que tous les clients sont sur la même version déployée

## Notes techniques

- La colonne `version` est auto-incrémentée par un trigger PostgreSQL
- Les conflits entraînent un rechargement automatique de l'état
- Le hook `useCombatSync` remplacera le code actuel dans CombatManager.jsx
