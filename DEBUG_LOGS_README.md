# Système de Logs de Combat - Mode Debug

## Comment utiliser

### 1. Panneau de Debug intégré

Un bouton **📊 Debug Logs** apparaît en bas à droite de l'écran.

**Fonctionnalités :**
- 💾 **Export** : Télécharge tous les logs dans un fichier texte
- 🗑️ **Clear** : Efface tous les logs
- ❌ **Close** : Ferme le panneau

### 2. Console du navigateur

Ouvrez la console (F12) pour voir les logs en temps réel.

### 3. Export manuel via console

Dans la console du navigateur, tapez :
```javascript
CombatLogger.exportLogs()
```

Cela téléchargera un fichier `combat-logs-[timestamp].txt` avec tous les logs.

### 4. Consulter les logs stockés

```javascript
// Voir tous les logs
CombatLogger.getLogs()

// Effacer les logs
CombatLogger.clear()
```

## Catégories de logs

- **INIT** : Initialisation du combat (joueurs, user_id, etc.)
- **TURN** : Détection de tour (qui joue, isLocalPlayerTurn)
- **MOVE** : Déplacements des combattants
- **ATTACK** : Attaques et dégâts
- **SYNC** : Synchronisation entre joueurs

## Utilisation pour déboguer

1. Lancez un combat
2. Ouvrez le panneau Debug (📊)
3. Reproduisez le bug
4. Cliquez sur **💾 Export**
5. Envoyez le fichier téléchargé

## Lecture des logs pour moi (Claude)

Pour que je puisse lire vos logs :

**Option A - Via le fichier exporté :**
1. Exportez les logs (bouton 💾)
2. Ouvrez le fichier `.txt` téléchargé
3. Copiez tout le contenu
4. Collez-le dans le chat

**Option B - Via un fichier que je peux lire :**
1. Exportez les logs
2. Sauvegardez le fichier dans `D:\JDR\combat-logs-debug.txt`
3. Je pourrai le lire avec `file_read`

**Option C - Screenshots du panneau :**
- Prenez des captures d'écran du panneau Debug ouvert
- Envoyez-les moi comme avant
