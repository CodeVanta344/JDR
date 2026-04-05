# Refactoring complet du systeme de combat — Aethelgard JDR

> **Score original : 2/10** | **Score ameliore : 10/10**
>
> **Prompt original :** `refactore tout le systeme de combat pour le rendre totalement fonctionnel tu as carte blanche`

---

## Role
Tu es un developpeur senior React/game-dev specialise en systemes de combat tactiques au tour par tour. Tu maitrises les machines a etats, les systemes d100, et le multiplayer via Supabase Realtime.

## Mission
Refactorer le systeme de combat d'Aethelgard pour qu'un combat complet de 5+ rounds fonctionne sans bug : initiative -> tours joueur/ennemi -> attaques/sorts/soins -> fin de combat (victoire/defaite/fuite).

## Contexte technique
- **Fichiers combat** : `src/components/CombatManager.jsx` (~3200 lignes), `src/engine/CombatEngine.ts`, `src/engine/EnemyAIController.ts`
- **Stack** : React 19 + Vite + JSX, Supabase Realtime pour sync multi-joueurs
- **Systeme** : d100 (jet SOUS le CD = succes), 8 stats (STR/DEX/CON/INT/WIS/CHA/PER/WIL)
- **Grille** : combat tactique sur grille 20x20, PM (points de mouvement), portee des sorts
- **Etat actuel** : le combat est tres sombre visuellement (overlays CSS empiles), les combattants meurent parfois au round 1 sans raison, l'IA ennemie ne joue pas toujours

## Bugs connus a corriger OBLIGATOIREMENT

1. **Arene trop sombre** : des overlays CSS (vignette-overlay, vignette-combat, vignette-layer, noise-overlay, modal-overlay) s'empilent et assombrissent la carte. Trouver et supprimer TOUS les overlays visuels qui couvrent l'arene pendant le combat.
2. **isAlive undefined** : les combattants n'ont pas `isAlive: true` a l'initialisation, ce qui casse les checks dans processStatusEffects et EnemyAIController
3. **Boucle infinie nextTurn** : quand tous les combattants sont morts, nextTurn boucle indefiniment
4. **Healing ignore** : action.heal n'est pas traite dans executeAttack (le sort de soin fait un jet d'attaque au lieu de soigner)
5. **AoE single-target** : action.aoe est ignore, les sorts de zone ne touchent qu'une cible
6. **executeSelfBuff hardcode** : switch(action.name) au lieu de lire action.statusEffect
7. **IA ennemie bloquee** : decideEnemyTurn filtre sur c.isAlive qui est undefined -> pas de cibles

## Phases de travail

### Phase 1 — Nettoyage visuel (arene lumineuse)
1. Identifier TOUS les elements DOM avec opacity/background qui couvrent `.combat-viewer-container`
2. Dans CombatManager.jsx : supprimer ou rendre transparent tout overlay non-fonctionnel
3. Dans index.css : verifier que aucun z-index > la grille de combat ne cree un voile
4. Dans App.jsx : ne pas rendre les vignettes quand combatMode === true
5. **Verification** : prendre un screenshot de l'arene — la carte doit etre lumineuse, pas assombrie

### Phase 2 — Initialisation combat robuste
1. Tous les combattants DOIVENT avoir : `isAlive: true, hp > 0, maxHp, resource, maxResource, actions: [], posX, posY, isEnemy, statusEffects: []`
2. L'initiative d100 + DEX doit produire un ordre de tour correct
3. Le premier tour doit commencer sans erreur console
4. **Verification** : console.log l'etat de chaque combattant au debut du combat

### Phase 3 — Boucle de tour (nextTurn + finishTurn)
1. nextTurn : skip les morts (hp <= 0), detecte la fin de combat AVANT de traiter le prochain acteur
2. finishTurn : marque hasActed, verifie victoire/defaite, puis appelle nextTurn
3. processStatusEffects : ne doit PAS tuer un combattant qui a deja 0 HP (double kill)
4. Protection contre la boucle infinie : max 100 iterations dans le while loop
5. **Verification** : un combat de 5 rounds avec 2v2 se termine par victoire ou defaite

### Phase 4 — Actions de combat
1. **Attaque** : d100 roll -> si succes -> calcul degats -> appliquer -> VFX -> fin de tour
2. **Soin** : action.heal -> pas de jet d'attaque -> appliquer healing + bonus WIS -> VFX vert -> fin de tour
3. **AoE** : action.aoe -> degats sur toutes les cibles dans le rayon (verifier distance grille)
4. **Buff self** : lire action.statusEffect en priorite, fallback sur switch(action.name)
5. **Items** : executeUseItem doit fonctionner (heal, resource, etc.)
6. **Cooldowns** : decrementer a chaque tour, bloquer si > 0

### Phase 5 — IA ennemie
1. decideEnemyTurn doit filtrer sur `hp > 0` (pas `isAlive`)
2. L'IA doit : evaluer les cibles (plus faible, plus proche), choisir une action valide, se deplacer si hors portee, attaquer
3. Le tour ennemi doit toujours se terminer (appeler finishTurn meme si aucune action possible)
4. **Verification** : les ennemis attaquent a chaque tour qui leur revient

### Phase 6 — Fin de combat
1. Victoire : tous les ennemis a 0 HP -> setCombatState('finished') -> afficher bouton "RETOUR"
2. Defaite : tous les joueurs a 0 HP -> game over screen
3. Fuite : bouton FUIR -> jet d100 DEX -> si succes quitter le combat
4. Loot : distribuer XP et items apres victoire
5. Retour au hub : nettoyer l'etat combat, restaurer le mode exploration

## Criteres de succes
- [ ] L'arene de combat est lumineuse (pas d'overlay sombre)
- [ ] Les combattants demarrent vivants avec toutes leurs stats
- [ ] Un combat 2v2 de 5+ rounds se joue sans erreur console
- [ ] Les ennemis attaquent le joueur a leur tour
- [ ] Un sort de soin restaure des PV (pas un jet d'attaque)
- [ ] La victoire affiche le bouton RETOUR AU MONDE
- [ ] La defaite affiche le game over
- [ ] 0 erreur JS dans la console pendant tout le combat

## Anti-patterns
- Ne PAS reecrire CombatManager.jsx from scratch — corriger in-place
- Ne PAS ajouter de nouvelles dependances npm
- Ne PAS changer le systeme d100 (jet SOUS le CD = succes)
- Ne PAS modifier le lore, les donnees JSON, ou les templates de compositions
- Ne PAS creer de nouveaux fichiers sauf si absolument necessaire
- Ne PAS toucher au systeme de sync Supabase Realtime (il fonctionne)
- Ne PAS ajouter de console.log permanents (seulement pour debug temporaire)

## Format de sortie
Pour chaque phase, commiter separement avec un message descriptif.
Deployer sur Vercel (`npx vercel --prod`) et le VPS (`scp` + `pm2 restart`) si gm-server modifie.
A la fin, fournir un tableau recapitulatif des bugs corriges.
