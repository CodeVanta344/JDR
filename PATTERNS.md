# Patterns et Conventions de Code

## React Patterns

### 1. Gestion d'état avec refs pour valeur fraîche

**Problème :** Les valeurs memoized (`useMemo`, `useCallback`) peuvent devenir stale (périmées) dans les timeouts ou intervals.

**Solution :** Utiliser une ref pour accéder à l'état actuel :

```javascript
const combatantsRef = useRef(combatants);
combatantsRef.current = combatants;

// Dans un setTimeout ou callback
const freshActor = combatantsRef.current.find(u => u.id === currentActor.id);
```

**Exemple réel :** `CombatManager.jsx` - `executeSelfBuff()` utilise `combatantsRef` pour vérifier `hasActed` et `resource` à l'instant T.

---

### 2. Optimistic Updates

**Pattern :** Mettre à jour l'UI immédiatement, puis synchroniser avec le serveur.

```javascript
// 1. Update locale immédiate
setCharacter(prev => ({ ...prev, is_ready: newReadyState }));

// 2. Appel API
const { data } = await supabase.from('players').update({ is_ready: newReadyState }).eq('id', character.id);

// 3. Re-synchroniser avec la réponse
if (data) setCharacter(data);
```

**Cas d'usage :** Boutons "Ready", équipement d'items, consommation de potions.

---

### 3. Realtime + Polling Fallback

**Pattern :** Supabase Realtime comme canal principal, polling comme backup.

```javascript
// Realtime channel
const channel = supabase
  .channel(`session_${session.id}`)
  .on('postgres_changes', { event: '*', table: 'messages' }, () => fetchData())
  .subscribe();

// Polling fallback (toutes les 5s si Realtime déconnecté)
useEffect(() => {
  if (!session?.id || adventureStarted) return;
  const interval = setInterval(refreshData, 5000);
  return () => clearInterval(interval);
}, [session?.id, adventureStarted]);
```

---

### 4. Singleton Pattern avec Database

**Problème :** Race conditions quand plusieurs clients essaient de créer la même ressource.

**Solution :** Utiliser un ID déterministe (ex: `session.id`) avec contrainte unique :

```javascript
// Seul le premier INSERT réussit
supabase.from('messages').insert({
  id: session.id,  // Déterministe
  session_id: session.id,
  content: "START_ADVENTURE_TRIGGERED"
}).then(({ error }) => {
  if (!error) {
    // Je suis le premier, je lance l'action
    handleStartAdventure();
  } else if (error.code === '23505') {
    // Quelqu'un d'autre l'a fait, j'attends
    setAdventureStarted(true);
  }
});
```

---

## Supabase Patterns

### 1. Transaction avec upsert

```javascript
// Insert ou update selon conflit
await supabase.from('player_professions').upsert({
  player_id: character.id,
  profession_id: professionId,
  level: 1
}, { onConflict: 'player_id,profession_id' });
```

### 2. Requêtes filtrées avec maybeSingle()

```javascript
// Évite les erreurs si aucun résultat
const { data } = await supabase
  .from('world_state')
  .select('value')
  .eq('key', `weather_${session.id}`)
  .maybeSingle();  // Retourne null si pas trouvé
```

### 3. Broadcast pour événements temps réel

```javascript
// Envoyer message à tous les clients de la session
supabase.channel(`trade_${session.id}`).send({
  type: 'broadcast',
  event: 'trade_offer',
  payload: { targetId, items, gold }
});
```

---

## Architecture Combat

### 1. État local vs État synchronisé

```javascript
// État local (UI uniquement)
const [selectedAction, setSelectedAction] = useState(null);
const [hoveredTile, setHoveredTile] = useState(null);

// État synchronisé (partagé avec tous les joueurs)
const [combatants, setCombatants] = useState([]);
const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

// Sync via Supabase
const updateSyncedCombat = async (newState) => {
  await supabase.from('world_state').upsert({
    key: `combat_${session.id}`,
    value: { ...newState, updatedAt: Date.now() }
  });
};
```

### 2. Ability Resolution

**Flow :**
1. `resolveCharacterAbilities(character)` - Hydrate les capacités depuis `CLASSES`
2. `combinedAbilities` - Merge capacités de base + sorts appris
3. `executeSelfBuff(action)` ou `executeAttack(target, action)` selon `action.target`

**Important :** Vérifier que `target` est bien défini dans les définitions de sorts :
- `target: 'self'` → `executeSelfBuff()`
- `target: 'ally'` → `executeAttack()` avec `friendly: true`
- `target: 'enemy'` → `executeAttack()` avec `friendly: false`

---

## Conventions de nommage

### Variables
- `handle*` : Fonctions gestionnaires d'événements (`handleSubmit`, `handleCreate`)
- `is*` / `has*` / `can*` : Booléens (`isLocalPlayerTurn`, `hasActed`, `canAct`)
- `on*` : Callbacks passées en props (`onComplete`, `onUpdate`)
- `*Ref` : Références React (`combatantsRef`, `channelRef`)

### Types TypeScript
- `ItemDefinition` : Interface avec `id`, `name`, `type`, `value`
- `Ability` : Interface avec `name`, `cost`, `target`, `range`
- `Player` : Interface avec `id`, `name`, `class`, `stats`, etc.

---

## Anti-patterns à éviter

### ❌ Ne pas faire

```javascript
// Modification directe de l'état
character.hp = 50;

// Utilisation de useMemo dans des callbacks async
setTimeout(() => {
  if (canAct) {  // ⚠️ Valeur périmée !
    executeAction();
  }
}, 100);

// Oublier de cleanup les intervals/channels
useEffect(() => {
  const interval = setInterval(poll, 1000);
  // ❌ Pas de return () => clearInterval(interval)
}, []);
```

### ✅ Faire à la place

```javascript
// Utiliser le setter de state
setCharacter(prev => ({ ...prev, hp: 50 }));
await supabase.from('players').update({ hp: 50 }).eq('id', character.id);

// Utiliser une ref pour valeur fraîche
const canActRef = useRef(canAct);
canActRef.current = canAct;
setTimeout(() => {
  if (canActRef.current) {
    executeAction();
  }
}, 100);

// Toujours cleanup
useEffect(() => {
  const interval = setInterval(poll, 1000);
  return () => clearInterval(interval);
}, []);
```

---

## Hooks personnalisés recommandés

### useRealtimeSync

```javascript
const useRealtimeSync = (sessionId, onMessage) => {
  useEffect(() => {
    if (!sessionId) return;
    
    const channel = supabase
      .channel(`session_${sessionId}`)
      .on('postgres_changes', { table: 'messages' }, onMessage)
      .subscribe();
      
    return () => supabase.removeChannel(channel);
  }, [sessionId, onMessage]);
};
```

### useCombatState

```javascript
const useCombatState = (sessionId) => {
  const [combatState, setCombatState] = useState(null);
  
  useEffect(() => {
    if (!sessionId) return;
    
    const subscription = supabase
      .from(`world_state:key=eq.combat_${sessionId}`)
      .on('*', payload => setCombatState(payload.new?.value))
      .subscribe();
      
    return () => subscription.unsubscribe();
  }, [sessionId]);
  
  return combatState;
};
```

---

## Structure des fichiers lore

```
lore/
├── items-catalog.ts        # Exporte ALL_ITEMS, ITEMS_BY_ID
├── classes.ts              # Exporte CLASSES avec abilities
├── character-creation/      
│   ├── lifepath/           # Données LifePath par phase
│   │   ├── birth/          # Origines, statut social
│   │   ├── childhood/      # Familles, éducation
│   │   ├── adolescence/    # Formation, exploits
│   │   └── young-adult/    # Professions, motivations
│   └── index.ts            # Accumulateur d'effets
└── bestiary.ts             # Créatures et ennemis
```

---

## Ressources supplémentaires

- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [React useRef Patterns](https://react.dev/reference/react/useRef)
- [Vercel Deployment](https://vercel.com/docs/concepts/deployments)
