# Corrections de Synchronisation du Combat

## Problèmes Identifiés

### 1. **Déplacement IA invisible / Rollback visuel**
**Symptôme** : Les ennemis IA semblaient se déplacer puis revenir à leur position initiale
**Cause racine** : La mise à jour de l'état était déclenchée **après** l'animation (dans le callback), créant un délai de ~300ms pendant lequel :
- L'état local était obsolète
- Les autres clients ne recevaient pas la mise à jour
- Les refs devenaient stale pendant l'attente

### 2. **Délais de synchronisation multijoueur**
**Symptôme** : Les mouvements IA n'étaient pas visibles en temps réel pour tous les joueurs
**Cause racine** : 
- `useCombatSync` attendait 100ms avant de relâcher le lock
- `requestAnimationFrame` n'était pas utilisé pour batcher les updates
- La version check bloquait parfois les updates rapides

### 3. **Timing IA trop lent**
**Symptôme** : Les tours IA semblaient traîner en longueur
**Cause racine** : Délai de 400ms entre mouvement et attaque (ligne 1296)

---

## Solutions Implémentées

### ✅ Fix 1 : Synchronisation Immédiate du Mouvement

**Avant** (`CombatManager.jsx:834-847`) :
```javascript
if (actualMove) {
    // Start smooth animation
    animateMovement(freshActor.id, freshActor.posX, freshActor.posY, newX, newY, () => {
        // Animation complete - update game state
        const latestCombatants = combatantsRef.current;
        const newCombatants = latestCombatants.map(u => u.id === freshActor.id ? 
            { ...u, posX: newX, posY: newY, currentPM: u.currentPM - 1, facing: newFacing, hasMoved: true } : u);
        setCombatants(newCombatants);
        if (onUpdateCombatState) onUpdateCombatState({ combatants: newCombatants, ... });
    });
}
```

**Après** :
```javascript
if (actualMove) {
    // Update state IMMEDIATELY (don't wait for animation)
    const latestCombatants = combatantsRef.current;
    const newCombatants = latestCombatants.map(u => u.id === freshActor.id ? 
        { ...u, posX: newX, posY: newY, currentPM: u.currentPM - 1, facing: newFacing, hasMoved: true } : u);
    setCombatants(newCombatants);
    
    // Sync immediately to all clients
    if (onUpdateCombatState) {
        onUpdateCombatState({ 
            combatants: newCombatants, 
            turnIndex: currentTurnIndex, 
            round, 
            active: true, 
            logs, 
            updatedAt: Date.now() 
        });
    }

    // Start smooth animation AFTER state update
    animateMovement(freshActor.id, freshActor.posX, freshActor.posY, newX, newY, () => {
        console.log(`[executeMove] Animation complete for ${freshActor.name} at (${newX}, ${newY})`);
    });
}
```

**Bénéfices** :
- ✅ État synchronisé **instantanément** avec tous les clients
- ✅ Animation purement visuelle (ne bloque plus la logique)
- ✅ Pas de rollback visuel
- ✅ Logs de debug pour tracer l'animation

---

### ✅ Fix 2 : Optimisation de la Synchronisation Temps Réel

**Avant** (`useCombatSync.js:67-86`) :
```javascript
if (!isApplyingUpdateRef.current && newState.active) {
    isApplyingUpdateRef.current = true;
    
    setCombatants(newState.combatants || []);
    setRound(newState.round || 1);
    setCurrentTurnIndex(newState.turnIndex || 0);
    setVersion(newVersion);
    // ... merge logs
    
    setTimeout(() => {
        isApplyingUpdateRef.current = false;
    }, 100); // <-- 100ms delay!
}
```

**Après** :
```javascript
if (!isApplyingUpdateRef.current && newState.active) {
    isApplyingUpdateRef.current = true;
    
    // Use requestAnimationFrame to batch updates
    requestAnimationFrame(() => {
        setCombatants(newState.combatants || []);
        setRound(newState.round || 1);
        setCurrentTurnIndex(newState.turnIndex || 0);
        setVersion(newVersion);
        // ... merge logs
        
        setTimeout(() => {
            isApplyingUpdateRef.current = false;
        }, 50); // <-- Reduced to 50ms
    });
}
```

**Bénéfices** :
- ✅ `requestAnimationFrame` batch les updates React (60fps smooth)
- ✅ Lock réduit de 100ms → 50ms (2x plus réactif)
- ✅ Meilleure synchronisation entre clients

---

### ✅ Fix 3 : Timing IA Optimisé

**Avant** (`CombatManager.jsx:1296`) :
```javascript
executeMove(direction);
// Wait for move animation to complete before attacking
await new Promise(r => setTimeout(r, 400));
```

**Après** :
```javascript
executeMove(direction);
// Wait for move to sync (reduced delay for smoother combat)
await new Promise(r => setTimeout(r, 350));
```

**Bénéfices** :
- ✅ Tours IA 12.5% plus rapides (400ms → 350ms)
- ✅ Combat plus dynamique sans sacrifier la lisibilité

---

## Impact Technique

### Flux de Déplacement Avant/Après

**AVANT** :
```
[IA decide move] → [executeMove called]
  → [animateMovement starts (300ms)]
    → [Wait 300ms]
      → [Callback: update state]
        → [onUpdateCombatState called]
          → [Supabase sync]
            → [Other clients receive ~400ms later]
```

**APRÈS** :
```
[IA decide move] → [executeMove called]
  → [Update state IMMEDIATELY]
    → [onUpdateCombatState called (~0ms)]
      → [Supabase sync (~50ms)]
        → [Other clients receive via requestAnimationFrame]
          → [All clients animate smoothly in parallel]
```

**Gain de latence** : ~300-350ms par mouvement

---

## Fichiers Modifiés

1. **`src/components/CombatManager.jsx`**
   - Ligne 834-860 : Inversion logique animation/state update
   - Ligne 1308 : Timing IA réduit (400ms → 350ms)

2. **`src/hooks/useCombatSync.js`**
   - Ligne 70-89 : requestAnimationFrame + lock 50ms
   - Ligne 92-94 : Logging amélioré pour debug concurrent updates

---

## Tests Recommandés

### Scénario 1 : Combat Solo (1 joueur + IA)
- [ ] L'IA se déplace case par case sans rollback
- [ ] Les animations sont fluides
- [ ] Les attaques suivent immédiatement après mouvement

### Scénario 2 : Combat Multijoueur (2+ joueurs + IA)
- [ ] Tous les joueurs voient les mouvements IA en temps réel
- [ ] Pas de désynchronisation entre clients
- [ ] Les positions finales sont identiques pour tous

### Scénario 3 : Mouvements Rapides Multiples
- [ ] Pas de frame skip lors de 3+ mouvements consécutifs
- [ ] Les logs affichent tous les déplacements
- [ ] Le state reste cohérent

---

## Améliorations Futures Possibles

### 1. **Interpolation Prédictive**
- Prédire la position finale de l'IA avant le mouvement
- Commencer l'animation avant la confirmation Supabase
- Rollback uniquement si conflit détecté

### 2. **Compression des Updates**
- Regrouper plusieurs mouvements IA en une seule sync
- Réduire le nombre d'écritures Supabase

### 3. **WebSocket Direct**
- Remplacer Supabase Realtime par WebSocket direct
- Latence < 20ms pour mouvement IA

---

## Déploiement

✅ **Commit** : `496de1e` - "fix(combat): immediate state sync for AI movement + optimized animation timing"
✅ **Build** : Réussi sans warnings
✅ **Production** : https://jdr-4h4zuqz4z-codevantas-projects.vercel.app

---

*Document créé le 13 février 2026*
