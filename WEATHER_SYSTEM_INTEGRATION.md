# Système Météo Dynamique Intégré au MJ

## Vue d'ensemble

Le système météo d'Aethelgard est maintenant **entièrement intégré** au Maître du Jeu IA. Le MJ :
- **Connaît** la météo actuelle en permanence
- **Peut modifier** la météo quand le temps passe (repos, voyage, attente)
- **Applique** les impacts mécaniques (malus Perception sous la pluie, etc.)
- **Synchronise** les changements avec tous les joueurs

---

## 🌦️ Codes Météo Disponibles

| Code | Description | Impacts Mécaniques |
|------|-------------|---------------------|
| **clear** | ☀️ Ciel dégagé, temps clair | Aucun malus |
| **clouds** | ☁️ Nuageux, ciel couvert | Aucun malus |
| **rain** | 🌧️ Pluie battante, chemins boueux | Perception -2, chemins glissants |
| **storm** | ⛈️ Orage violent, éclairs et tonnerre | Perception -5, risque foudre, vol impossible |
| **snow** | ❄️ Neige tombante, froid glacial | Déplacement -1 case, risque hypothermie |
| **fog** | 🌫️ Brouillard épais, visibilité réduite | Perception -3, visibilité 2 cases |
| **wind** | 💨 Vents forts, rafales puissantes | Tir -2, vol difficile/impossible |

---

## 🧠 Comment le MJ Connaît la Météo

### 1. Injection au Contexte Initial

Chaque requête au game-master inclut maintenant :
```typescript
// App.jsx ligne 2228-2230
{
    gameTime: gameTime,
    timeLabel: getTimeLabel(),
    weather: weather,  // <-- Nouveau !
    // ...
}
```

### 2. Affichage dans le Prompt Système

Le MJ reçoit la météo dès la première ligne du prompt :

```
TU ES LE MAITRE DU JEU (MJ) d'un RPG Dark Fantasy "Miroir des Ombres".
TON BUT: Simuler un monde coherent, dangereux et reactif. NE SOIS PAS COMPLAISANT.
PHASE ACTUELLE: EXPLORATION | HEURE: Matin (9h15) | METEO: 🌧️ Pluie battante, chemins boueux
```

**Fichier** : `supabase/functions/game-master/index.ts` ligne 1680

---

## ⚙️ Comment le MJ Peut Modifier la Météo

### Quand Modifier ?

Le MJ doit changer la météo dans ces situations :

1. **Attente prolongée** : Joueur attend plusieurs heures, dort, monte la garde
2. **Voyage long** : Plusieurs heures/jours de déplacement
3. **Changement narratif** : Tension montante → orage, aube → brouillard se dissipe

### Format de Réponse JSON

Le MJ inclut un champ `worldUpdate` dans sa réponse :

```json
{
    "narrative": "Au fil des heures, le ciel se couvre. Vers minuit, les premières gouttes tombent, transformant la terre sèche en boue collante. Tu entends le roulement lointain du tonnerre...",
    "worldUpdate": {
        "weather": "rain"
    }
}
```

### Exemples Concrets

**Scénario 1 : Veille nocturne**
```
Joueur : "Je monte la garde toute la nuit"

MJ : "Au fil des heures, le ciel se couvre. Vers minuit, les premières gouttes tombent..."
{
    "worldUpdate": {
        "weather": "rain"
    }
}
```

**Scénario 2 : Voyage de plusieurs jours**
```
Joueur : "On voyage pendant 2 jours vers le nord"

MJ : "Le deuxième jour, un vent glacial se lève. Des flocons commencent à tourbillonner autour de vous..."
{
    "worldUpdate": {
        "weather": "snow"
    }
}
```

**Scénario 3 : Réveil à l'aube**
```
Joueur : "Je me réveille à l'aube"

MJ : "L'aube perce enfin. Le brouillard nocturne se dissipe, révélant un ciel azur..."
{
    "worldUpdate": {
        "weather": "clear"
    }
}
```

---

## 📊 Impacts Mécaniques (Appliqués par le MJ)

### Pluie (`rain`) / Orage (`storm`)
- **Tests de Perception** : +1 complexité (DD plus élevé)
- **Chemins** : Glissants, risque de chute en sprint
- **Feu** : Difficile/impossible d'allumer un feu sans abri

### Neige (`snow`)
- **Déplacement** : -1 case de mouvement par tour
- **Froid** : Risque hypothermie si camp sans feu (Constitution DC 30)
- **Traces** : Pistage plus facile (DD -10)

### Brouillard (`fog`)
- **Visibilité** : Limitée à 2 cases maximum
- **Perception** : -3 malus (ou +1 complexité)
- **Embuscades** : Ennemis ont avantage tactique

### Vent (`wind`)
- **Tir à distance** : -2 malus aux attaques à l'arc/arbalète
- **Vol** : Difficile pour créatures volantes, impossible pour petites tailles
- **Son** : Tests Perception auditive +1 complexité

### Orage (`storm`)
- **Foudre** : Risque si armure métallique (1d6 chance, 3d20 dégâts)
- **Vol** : Totalement impossible
- **Moral** : Chevaux/montures effrayées (test Dressage DC 40)

---

## 🔄 Synchronisation Temps Réel

### Flux de Mise à Jour

```
[MJ génère réponse avec worldUpdate] 
    ↓
[App.jsx reçoit aiResponse] (ligne 2256-2268)
    ↓
[setWeather() met à jour état React]
    ↓
[Supabase world_state updated] (si host)
    ↓
[Tous les clients reçoivent via useGameState]
```

### Code d'Intégration

**Fichier** : `src/App.jsx` ligne 2254-2268

```javascript
if (aiResponse) {
    // Handle world updates (weather, time)
    if (aiResponse.worldUpdate) {
        if (aiResponse.worldUpdate.weather) {
            console.log('[GM] Weather update:', aiResponse.worldUpdate.weather);
            setWeather(aiResponse.worldUpdate.weather);
            // Sync to world_state
            if (session?.host_id === profile?.id) {
                await supabase.from('world_state').upsert({ 
                    key: 'weather', 
                    value: aiResponse.worldUpdate.weather 
                });
            }
        }
    }
    // ... rest of response handling
}
```

Ce code est dupliqué dans **3 endroits** :
1. `handleSubmit` (ligne 2254) : Actions joueur normales
2. `triggerProactiveGM` (ligne 1811) : Initiatives MJ automatiques
3. `handleNPCInteraction` (ligne 2128) : Conversations PNJ

---

## 🎯 Règles MJ (Prompt)

Le MJ reçoit **57 lignes** de règles détaillées sur la météo :

**Fichier** : `supabase/functions/game-master/index.ts` ligne 597-640

### Extraits Clés

```
=== CHANGEMENTS METEOROLOGIQUES (REGLE IMPORTANTE) ===
METEO ACTUELLE: 🌧️ Pluie battante, chemins boueux

QUAND modifier la meteo:
- Si le joueur ATTEND plusieurs heures (repos, sommeil, voyage long)
- Si une journee complete s'ecoule dans la narration
- Si le contexte narratif suggere un changement (tension montante = orage, aube = brouillard dissipe)

COMMENT modifier la meteo:
1. INCLUS dans ta narration: "La meteo change. Le ciel devient [nuageux/orageux/degage/brumeux]..."
2. AJOUTE dans le champ "worldUpdate" de ta reponse JSON:
   {
     "worldUpdate": {
       "weather": "rain" // ou "clear", "clouds", "storm", "snow", "fog", "wind"
     }
   }
```

---

## 🧪 Tests Recommandés

### Scénario 1 : Veille Nocturne
1. Joueur dit : "Je monte la garde pendant 6h"
2. **Attendu** : MJ change météo (ex: clear → fog) + narration immersive
3. **Vérifier** : HUD affiche nouvelle météo instantanément

### Scénario 2 : Voyage Multi-Jours
1. Joueur dit : "On voyage vers le nord pendant 3 jours"
2. **Attendu** : MJ change météo 1-2 fois (ex: clear → clouds → snow)
3. **Vérifier** : Logs console `[GM] Weather update: snow`

### Scénario 3 : Combat Sous la Pluie
1. Météo = `rain`
2. Joueur tente Perception (entendre ennemi)
3. **Attendu** : MJ applique +1 complexité (DC plus élevé)
4. **Vérifier** : Challenge JSON montre DC ajusté

### Scénario 4 : Multijoueur Sync
1. Joueur A déclenche changement météo
2. **Attendu** : Joueur B voit météo changer en temps réel (sans refresh)
3. **Vérifier** : HUD des deux joueurs synchronisé

---

## 📁 Fichiers Modifiés

### 1. `src/App.jsx`
- **Ligne 1417-1419** : Envoi weather à game-master (START_ADVENTURE)
- **Ligne 1794-1796** : Envoi weather à game-master (Proactive GM)
- **Ligne 2228-2230** : Envoi weather à game-master (handleSubmit)
- **Ligne 1811-1825** : Traitement worldUpdate (Proactive GM)
- **Ligne 2128-2142** : Traitement worldUpdate (NPC)
- **Ligne 2254-2268** : Traitement worldUpdate (handleSubmit)

### 2. `supabase/functions/game-master/index.ts`
- **Ligne 1645-1657** : Helper `getWeatherDescription()`
- **Ligne 1662** : Ajout paramètre `weather` à signature buildSystemPrompt
- **Ligne 1680** : Affichage météo dans prompt MJ
- **Ligne 1755** : Extraction `currentWeather` du body
- **Ligne 1913** : Passage `weather: currentWeather` à buildSystemPrompt
- **Ligne 597-640** : 44 lignes de règles météo détaillées

---

## 🚀 Déploiement

✅ **Commit** : `f320c44` - "feat(weather): integrate dynamic weather system into GM with real-time updates"
✅ **Build** : Réussi sans erreurs
✅ **Production** : https://jdr-iu3826wol-codevantas-projects.vercel.app

---

## 🔮 Améliorations Futures

### 1. **Cycles Météo Automatiques**
- Progression naturelle : clear → clouds → rain → clear (24-48h)
- Variations saisonnières : plus de neige en hiver, orages en été

### 2. **Événements Météo Extrêmes**
- Tornade (rare, Complexité 6)
- Blizzard (neige + vent, visibilité 0)
- Canicule (fatigue accélérée, soif)

### 3. **Météo Régionale**
- Désert = rarement pluie, souvent vent + sable
- Montagne = froid constant, neige fréquente
- Forêt = brouillard fréquent, pluie modérée

### 4. **Prédiction Météo**
- Compétence "Survie" permet prédire météo 6-12h à l'avance
- PNJ météorologues peuvent vendre prévisions

---

*Document créé le 13 février 2026*
