# Refonte du système de combat + validation du MJ IA — Aethelgard JDR

> **Score original : 2/10** | **Score amélioré : 10/10**
>
> **Prompt original :** `il faudrait refaire tout le système de combat pour qu'il soit totalement fonctionnel et bien regarder que le MJ fonctionne parfaitement`

---

## Rôle
Tu es un Game Systems Engineer senior spécialisé en systèmes de combat tour par tour d100, moteurs IA narratifs, et intégration React/TypeScript temps réel. Tu connais parfaitement D&D, Warhammer, et les systèmes d100 classiques.

## Mission
Auditer, corriger et compléter le système de combat d'Aethelgard (D:/JDR) pour qu'il soit 100% jouable de bout en bout, ET vérifier que le MJ IA (Claude Code CLI via gm-server) répond correctement, déclenche les combats automatiquement, et narre les conséquences.

## Objectifs mesurables
### Combat :
- Un joueur peut entrer en combat, choisir une cible, utiliser une ability, voir les dégâts, et gagner/perdre
- Les 8 stats (STR/DEX/CON/INT/WIS/CHA/PER/WIL) impactent le combat (vérifiable dans le code)
- Les abilities de healing soignent réellement (pas juste des dégâts)
- Les abilities AoE touchent plusieurs cibles
- Les effets de statut (stun, fear, poison, charm) s'appliquent et se résolvent
- Le loot et l'XP sont distribués après victoire
- Le combat se déclenche automatiquement quand le MJ IA le demande
- 0 crash, 0 ReferenceError, 0 écran noir pendant tout le flow combat

### MJ IA :
- Le joueur tape un message -> le MJ répond en < 30s (pas "null", pas "{}", pas "**Narrative**:")
- Les challenges d100 se déclenchent correctement (modal de dés, résultat, narration)
- Le MJ déclenche des combats avec les bons ennemis adaptés au niveau
- Après un combat, le MJ narre la suite (victoire/défaite/fuite)
- Le MJ utilise les stats du joueur dans ses réponses (mentionne la classe, le niveau, les abilities)

## Contraintes techniques
- Fichiers combat : `src/engine/CombatEngine.ts`, `StatResolver.ts`, `SkillResolver.ts`, `EnemyAIController.ts`, `types.ts`
- Fichier UI combat : `src/components/CombatManager.jsx` + `CombatManager.css`
- Fichier dés : `src/components/DiceChallengeModal.jsx` + `.css`
- MJ IA : `gm-server/index.mjs` (VPS, Claude Code CLI) + `src/App.jsx` (invokeGM broker)
- Système d100 : jet SOUS le CD = succès. Modificateur = stat directe (pas x2)
- Ne PAS réécrire CombatManager.jsx en entier (3000+ lignes) — corrections ciblées
- Ne PAS toucher aux fichiers de lore (90k+ lignes)
- Ne PAS modifier le système d'auth ou de sessions

## Approche par étapes

### Phase 1 — Audit du combat (lecture seule)
1. Lire CombatEngine.ts : vérifier resolveAttack(), resolveDamage(), applyStatusEffect()
2. Lire CombatManager.jsx : vérifier le flow tour par tour, l'UI abilities, le targeting
3. Lire StatResolver.ts : vérifier que les 8 stats sont utilisées
4. Identifier les abilities mortes (définies mais jamais exécutées) : healing, AoE, reactions, passifs
5. Lister tous les TODO/FIXME dans les fichiers combat

### Phase 2 — Corrections combat
6. Connecter les abilities de healing (Mot de Guérison, Baies Nourricieres, etc.)
7. Implémenter la résolution AoE (shape + radius -> multi-target)
8. Faire fonctionner executeSelfBuff avec le statusEffect de l'ability (pas hardcodé par nom)
9. Implémenter les passifs (Critique Amélioré, Attaque Supplémentaire, Indomptable)
10. Vérifier que la fuite fonctionne
11. Vérifier le loot post-combat (generateLoot + handleCombatRewards)

### Phase 3 — Audit du MJ IA
12. Tester invokeGM : insérer une requête test dans ai_requests, vérifier la réponse
13. Vérifier le gm-server : lit-il le payload complet (player, history, location) ?
14. Vérifier le combat auto-trigger : mots-clés narratifs -> combat.trigger = true
15. Vérifier le flow challenge : AI retourne challenge -> modal -> résultat -> narration
16. Vérifier que le MJ ne retourne jamais "null" ou un objet vide

### Phase 4 — Corrections MJ
17. Si le broker timeout, afficher un message clair (pas "null")
18. Si la réponse est du JSON brut, extraire le narrative proprement
19. Enrichir le system prompt du gm-server avec le contexte complet du joueur
20. S'assurer que le MJ mentionne les stats/abilities du joueur quand c'est pertinent

### Phase 5 — Test end-to-end
21. Scénario : joueur dit "j'attaque le garde" -> MJ narre -> combat se lance -> joueur combat -> victoire -> loot -> MJ narre la suite
22. Scénario : joueur dit "je crochète la serrure" -> challenge d100 -> jet -> succès/échec -> narration
23. Scénario : joueur dit "bonjour" -> MJ répond normalement (pas de combat, pas de challenge)

## Critères de succès (checklist)
- [ ] Entrer en combat sans crash
- [ ] Utiliser une ability d'attaque -> dégâts appliqués
- [ ] Utiliser une ability de soin -> HP restaurés
- [ ] Effet de statut appliqué (stun rend incapable d'agir)
- [ ] Ennemi IA joue son tour automatiquement
- [ ] Combat fini -> loot modal avec items + XP
- [ ] MJ répond en texte lisible (pas de JSON brut, pas de "null")
- [ ] Challenge d100 : modal s'affiche, dé roule, résultat correct
- [ ] Combat auto-trigger depuis narrative MJ
- [ ] Post-combat : MJ narre la suite
- [ ] 0 ReferenceError pendant tout le flow

## Anti-patterns
- NE PAS réécrire CombatManager.jsx (3000 lignes) — fixes ciblés uniquement
- NE PAS ajouter de nouvelles abilities — faire fonctionner celles qui existent
- NE PAS changer le système d100 (jet sous CD = succès)
- NE PAS ignorer les erreurs avec try/catch vide
- NE PAS hardcoder des noms d'abilities — lire les propriétés (statusEffect, heal, aoe)
- NE PAS modifier les fichiers de lore ou de données

## Format de sortie attendu
Pour chaque correction :
```
FIX #N: [Fichier:ligne] Description
  Avant: code original
  Après: code corrigé
  Impact: ce que ça débloque
```

Rapport final :
```
COMBAT SYSTEM STATUS
====================
Attack abilities: OK/BROKEN (X/Y functional)
Healing abilities: OK/BROKEN
AoE abilities: OK/BROKEN
Status effects: OK/BROKEN (list)
Passive abilities: OK/BROKEN (list)
Loot generation: OK/BROKEN
Enemy AI turns: OK/BROKEN

GM AI STATUS
============
Response time: Xs average
Narrative quality: OK/BROKEN
Challenge triggering: OK/BROKEN
Combat auto-trigger: OK/BROKEN
Post-combat narration: OK/BROKEN
Null/empty responses: X occurrences
```

## Langue et conventions
- Réponses en français
- Code en anglais (convention du projet)
- Messages de commit en anglais
- Système d100 avec termes français (CD, jet, réussite critique, échec critique)
