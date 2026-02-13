# Interface MJ avec Claude Opus - Guide Configuration

## 🎭 Présentation

Interface Maître du Jeu intégrant Claude Opus pour génération contextuelle :
- **NPCs** avec backstory, secrets, dialogue samples
- **Combats** équilibrés système d100 (formules HP×5, ATK×2.5, AC adaptative)
- **Plot Twists** connectés au lore Aethelgard
- **Chat MJ** contextualisé (À VENIR)

## 🔑 Configuration API Claude

### 1. Obtenir Clé API Anthropic

1. **Créer compte** : [console.anthropic.com](https://console.anthropic.com/)
2. **Crédits gratuits** : $5 offerts (≈150 générations NPCs)
3. **Créer clé API** : Settings → API Keys → Create Key

### 2. Configurer l'Application

**Option A - Développement Local** :
```bash
# Créer fichier .env.local à la racine
VITE_ANTHROPIC_API_KEY=sk-ant-api03-xxxx-votre-clé-ici
```

**Option B - Production Vercel** :
1. Dashboard Vercel → Project Settings
2. Environment Variables
3. Add : `VITE_ANTHROPIC_API_KEY` = votre clé
4. Redéployer

### 3. Vérifier Installation

1. Lancer dev : `npm run dev`
2. Console browser : Chercher `⚠️ VITE_ANTHROPIC_API_KEY non configurée` (si manquante)
3. En jeu : Bouton `🎭 MJ` visible si host/GM
4. Interface MJ : Status bar doit afficher `Claude: ✓ Actif`

## 📊 Coûts Estimés

**Modèle** : `claude-opus-4-20250514` (2024-05-14)

| Action | Tokens Input | Tokens Output | Coût/Req | Coût/100 Req |
|--------|--------------|---------------|----------|--------------|
| Générer NPC | ~20K | ~800 | $0.36 | $36 |
| Combat Impro | ~15K | ~600 | $0.28 | $28 |
| Plot Twist | ~10K | ~150 | $0.18 | $18 |

**Budget mensuel recommandé** : $10-20 (30-50 générations/jour)

## 🔒 Sécurité

⚠️ **ATTENTION** : Configuration actuelle `dangerouslyAllowBrowser: true`

**Temporaire pour développement** - Production DOIT utiliser Edge Function proxy :

```typescript
// TODO Production : Créer supabase/functions/dm-assistant/index.ts
// qui route les appels Claude côté serveur avec clé API serveur-side
```

**Risque** : Clé API exposée dans bundle client (rotation régulière recommandée)

## 🎮 Utilisation

### Bouton MJ (Host/GM Uniquement)

1. **Accès** : HUD Header → Bouton `🎭 MJ` (visible uniquement si `session.host_id === user_id`)
2. **Shortcut** : `Ctrl+Shift+M` (À VENIR)

### Actions Rapides

| Action | Fonction | Output |
|--------|----------|--------|
| 🎭 Générer NPC | `dmAssistant.generateNPC()` | JSON structuré → spawn chat narratif |
| ⚔️ Combat Impro | `dmAssistant.improveCombat()` | Encounter d100 → déclenche CombatManager |
| 🎲 Plot Twist | `dmAssistant.suggestPlotTwist()` | Suggestion 2-3 phrases → chat MJ |
| 💎 Loot Adapté | *Bientôt* | Récompenses équilibrées niveau groupe |

### Tabs Référence

- **NPCs** : Historique générés (persisté session)
- **Quêtes** : Système dynamique (en développement)
- **Lieux** : 40 Birth Locations + catégories
- **Règles d100** : Combat, checks, conversion stats

## 🧪 Exemples Prompts

### NPC Contextuel
```typescript
dmAssistant.generateNPC({
  location: 'Forge des Titans (Montagnes Fer)',
  role: 'blacksmith',
  level: 5,
  personality: 'gruff but loyal'
});
```

**Output** :
```json
{
  "name": "Thorgrim Marteaume",
  "age": 52,
  "secrets": [
    "Cache un fragment de Lame Primordiale volée",
    "Frère du chef rebelle Faction Marteaux"
  ],
  "quest_hooks": [
    "Réparer arme légendaire contre ingrédient rare (Cœur Drake)",
    "Dénoncer son frère vs protéger sa famille"
  ]
}
```

### Combat Équilibré
```typescript
dmAssistant.improveCombat({
  party: [
    { class: 'Guerrier', level: 3, name: 'Jacquille' },
    { class: 'Mage', level: 3, name: 'Loic' }
  ],
  location: 'Ruines Hantées',
  difficulty: 'hard'
});
```

**Output** :
```json
{
  "enemies": [
    { "name": "Spectre Vengeur", "hp": 60, "atk": 15, "ac": 16 },
    { "name": "Squelette Archer", "hp": 40, "atk": 12, "ac": 14 }
  ],
  "terrain": {
    "features": ["Piliers effrondrés (Cover +2 AC)", "Brume spectrale (Désavantage Perception)"],
    "ambient": "Gémissements résonnent, température glaciale"
  }
}
```

## 🐛 Troubleshooting

| Symptôme | Cause | Solution |
|----------|-------|----------|
| Status `✗ Offline` | Clé API manquante/invalide | Vérifier `.env.local` / Vercel vars |
| Erreur 401 | Clé expirée | Regénérer clé sur Anthropic Console |
| Timeout | Dépassement 30s | Réduire lore context (ligne 19 `dm-assistant.ts`) |
| JSON invalide | Claude retourne markdown | Parser détecte et nettoie backticks |

## 📚 Ressources

- [Anthropic API Docs](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [Claude Opus Pricing](https://www.anthropic.com/api#pricing)
- [Aethelgard Lore](./src/lore/)
- [DMPanel Source](./src/components/DMPanel.tsx)

## 🚀 Roadmap

- [ ] Chat LLM contextualisé (conversation MJ)
- [ ] Loot adaptatif (niveau + classe)
- [ ] Migration Edge Function (sécurité production)
- [ ] Templates NPCs pré-générés (cache)
- [ ] Export NPCs → Codex persistant
- [ ] Stats usage API (coûts/session)
