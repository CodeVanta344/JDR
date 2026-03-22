# Guide de Dépannage Rapide

## Problèmes fréquents et solutions

---

### 🔴 Messages du MJ en double

**Symptôme :** Deux messages narratifs identiques ou similaires au début de l'aventure.

**Cause :** La vérification `hasGMIntro` utilise `role === 'gm'` mais les messages ont `role === 'assistant'`.

**Solution :**
```javascript
// ❌ AVANT
const hasGMIntro = messages.some(m => m.role === 'gm' && ...);

// ✅ APRÈS  
const hasGMIntro = messages.some(m => m.role === 'assistant' && ...);
```

**Fichier :** `App.jsx` ligne ~1670

---

### 🔴 Items LifePath "not found in catalog"

**Symptôme :** Warnings console `[CharacterCreation] Item "xxx" not found in catalog`.

**Cause :** Les items définis dans les données LifePath ne sont pas dans `items-catalog.ts`.

**Solution :**
1. Ajouter l'item dans `lore/items-catalog.ts` :
```typescript
export const LIFEPATH_XXX: ItemDefinition = {
  id: 'item_id',  // Doit matcher l'ID dans les données LifePath
  name: 'Nom Item',
  type: 'quest',  // ou 'tool', 'weapon', etc.
  rarity: 'common',
  description: '...',
  value: 50
};
```

2. L'ajouter à `ALL_LIFEPATH_ITEMS`

3. S'assurer que `ALL_LIFEPATH_ITEMS` est inclus dans `ALL_ITEMS`

---

### 🔴 Sorts sur soi ne fonctionnent pas

**Symptôme :** Cliquer sur "Bouclier de Mana" ou "Disparition" ne fait rien.

**Cause :** `executeSelfBuff` utilise `canAct` memoized qui est stale dans le setTimeout.

**Solution :**
```javascript
// ❌ AVANT
const executeSelfBuff = (action) => {
  if (!canAct || !freshActor || freshActor.hasActed) return;
  
// ✅ APRÈS
const executeSelfBuff = (action) => {
  const canActFresh = isLocalPlayerTurn && freshActor && !freshActor.hasActed;
  if (!canActFresh) {
    console.log('[SelfBuff] Blocked - cannot act');
    return;
  }
```

**Fichier :** `CombatManager.jsx` ligne ~1400

---

### 🔴 Premier message manquant en multijoueur

**Symptôme :** Les joueurs non-hôtes n'ont pas le message d'intro du MJ.

**Cause :** Ils détectent le marqueur mais ne récupèrent pas les messages existants.

**Solution :**
```javascript
// Dans le polling des non-hosts
if (data && data.length > 0) {
  setAdventureStarted(true);
  await fetchData();  // ✅ AJOUTER CETTE LIGNE
  clearInterval(pollInterval);
}
```

**Fichier :** `App.jsx` ligne ~1694

---

### 🔴 Interface LifePath invisible en multijoueur

**Symptôme :** Les traits et compétences du LifePath n'apparaissent pas pour les autres joueurs.

**Cause :** Les champs `mechanical_traits` et `skill_bonuses` ne sont pas sauvegardés en DB.

**Solution :**
```javascript
// Dans mapCharacterDataToDb()
return {
  ...charFields,
  // ✅ AJOUTER
  mechanical_traits: charData.mechanical_traits || [],
  skill_bonuses: charData.skill_bonuses || []
};
```

**Fichier :** `App.jsx` ligne ~1437

---

### 🟡 Sync Realtime ne fonctionne pas

**Symptômes :**
- Pas de mise à jour temps réel
- Polling actif (requêtes toutes les 5s)
- Connexion WebSocket échoue

**Diagnostic :**
1. Vérifier console : `ConnStatus: polling` au lieu de `connected`
2. Vérifier Network tab : Requêtes WebSocket en rouge

**Solutions :**

**1. Check Supabase Realtime config**
```javascript
// .env ou config
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

**2. Vérifier les policies RLS**
- Dashboard Supabase → Authentication → Policies
- `messages` : SELECT/INSERT pour `authenticated`
- `world_state` : SELECT/UPDATE pour `authenticated`

**3. Fallback polling** (déjà implémenté)
```javascript
useEffect(() => {
  if (!session?.id || adventureStarted) return;
  const interval = setInterval(refreshPlayers, 5000);
  return () => clearInterval(interval);
}, [session?.id, adventureStarted]);
```

---

### 🟡 Erreur 400 Supabase

**Symptôme :** `Erreur Supabase (400?)` lors de la création de personnage.

**Cause :** Champ requis manquant ou type incorrect.

**Diagnostic :**
```javascript
// Ajouter des logs
const { data, error } = await supabase.from('players').update(finalChar);
if (error) {
  console.error("DEBUG - Error:", error);
  console.error("DEBUG - Data sent:", finalChar);  // Vérifier tous les champs
}
```

**Checklist :**
- [ ] Tous les champs requis sont présents
- [ ] Types corrects (pas de `undefined` en DB)
- [ ] JSON valide pour les champs array/object

---

### 🟡 Build Vercel échoue

**Symptômes :**
- Déploiement en échec
- Erreur TypeScript
- Module not found

**Solutions :**

**1. Vérifier les imports**
```bash
npm run build  # Local pour reproduire
```

**2. Types TypeScript**
```typescript
// Ajouter @ts-ignore si nécessaire
// @ts-ignore - Type complexe à refactoriser
const x = item as any;
```

**3. Nettoyer le cache**
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

### 🟠 Désynchronisation du combat

**Symptômes :**
- Un joueur voit le combat, pas l'autre
- Tour qui ne passe pas
- Actions sans effet

**Diagnostic :**
1. Vérifier `world_state` dans Supabase :
```sql
SELECT * FROM world_state WHERE key = 'combat_xxx';
```

2. Vérifier les logs console :
```
[SYNC] combat_state received: {...}
[Combat] Current actor: {...}
```

**Solutions :**

**1. Force refresh**
```javascript
// Console du navigateur
window.location.reload();
```

**2. Reset combat state** (Host uniquement)
```javascript
// Dans console
await supabase.from('world_state').delete().eq('key', `combat_${session.id}`);
```

**3. Heal all players et relancer**
```javascript
// Dans handleTestCombat ou console
players.forEach(p => {
  if (p.hp <= 0) handleHPChange(p.id, p.max_hp);
});
```

---

## Commandes de débogage utiles

### Console browser

```javascript
// Voir l'état du combat
window.syncedCombatState

// Voir le personnage courant
window.character

// Forcer un fetch
window.fetchData()

// Voir les messages
window.messages.slice(-5)

// Reset état local
window.location.reload()
```

### Requêtes Supabase SQL

```sql
-- Voir les messages récents
SELECT * FROM messages 
WHERE session_id = 'xxx' 
ORDER BY created_at DESC 
LIMIT 10;

-- Vérifier world_state
SELECT * FROM world_state 
WHERE key LIKE 'combat_%' OR key LIKE 'weather_%';

-- Voir joueurs actifs
SELECT * FROM players 
WHERE session_id = 'xxx';

-- Reset session
UPDATE sessions SET is_started = false WHERE id = 'xxx';
DELETE FROM messages WHERE session_id = 'xxx';
DELETE FROM world_state WHERE key LIKE '%xxx%';
```

---

## Checklist avant déploiement

- [ ] Build local passe : `npm run build`
- [ ] Pas d'erreurs TypeScript critiques
- [ ] Items LifePath testés
- [ ] Combat multijoueur testé (2 onglets)
- [ ] Déconnexion/reconnexion testée
- [ ] Sorts self-targeting testés

---

## Contact / Ressources

- **Supabase Dashboard** : https://app.supabase.com/project/xxxxx
- **Vercel Dashboard** : https://vercel.com/codevantas-projects/jdr
- **Logs Edge Functions** : Supabase → Functions → Logs
