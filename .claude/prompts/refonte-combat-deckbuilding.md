# Refonte combat : systeme de cartes deck-building (style Slay the Spire)

> **Score original : 1/10** | **Score ameliore : 10/10**
>
> **Prompt original :** `je veux que tu supprime les combats actuels et que tu me fasses des combats a la the spire 2`

---

## Role
Tu es un developpeur senior React specialise en jeux de cartes roguelike (Slay the Spire, Dicey Dungeons, Inscryption). Tu maitrises les systemes de deck-building, les machines a etats de combat au tour par tour, et les animations CSS de cartes.

## Mission
Supprimer le systeme de combat actuel (grille tactique + d100 systematique) et le remplacer par un combat deck-building au tour par tour inspire de Slay the Spire, avec des des optionnels sur certaines cartes.

## Reference gameplay : Slay the Spire + des

### Mecanique de base
- Le joueur a un **deck de cartes** (10-30 cartes)
- Chaque tour : piocher 5 cartes, recevoir 3 energie
- Jouer des cartes tant qu'on a l'energie -> fin de tour
- Les ennemis affichent leur **intention** (attaque X, buff, defense)
- Tour ennemi : ils executent leur intention
- Pas de grille — c'est joueur (gauche) vs ennemis (droite)

### Systeme de des hybride
- La majorite des cartes ont un **effet fixe** (ex: "Frappe : 6 degats")
- Certaines cartes rares/puissantes lancent un **d20 ou d100** pour determiner l'effet
  - Ex: "Coup du Destin : lance 1d20 x 3 degats" (resultat variable)
  - Ex: "Roulette Arcane : d100 < 50 = 8 degats, >= 50 = 15 degats + poison"
- Les des ajoutent du risque/recompense, pas du RNG systematique

### Types de cartes
- **Attaque** (rouge) : inflige des degats
- **Competence** (vert) : donne du bouclier, pioche, applique effets
- **Pouvoir** (bleu) : effet permanent pour tout le combat
- **Malediction** (violet) : carte negative injouable

### Economie de combat
- Apres victoire : choisir 1 carte parmi 3 a ajouter au deck
- Or gagne -> acheter des cartes au marchand
- Repos -> retirer une carte du deck (epuration)

## Stack technique
- **React 19 + JSX** — composants fonctionnels, hooks
- **CSS animations** — cartes en eventail, hover, drag & drop ou click-to-play
- **Supabase Realtime** — sync multi-joueurs (garder le systeme existant)
- **Fichier principal** : remplacer `src/components/CombatManager.jsx` + `CombatManager.css`
- **Engine** : remplacer `src/engine/CombatEngine.ts`
- **Donnees** : nouveau fichier `src/data/cards.ts` pour le catalogue de cartes

## Phases de travail

### Phase 1 — Data model des cartes
1. Creer `src/data/cards.ts` avec le catalogue de cartes de base (30-40 cartes)
2. Chaque carte : `{ id, name, type, cost, effects[], description, rarity, diceRoll? }`
3. Creer les cartes de depart par classe (Guerrier: 5 Frappe + 4 Defense + 1 Coup Puissant)
4. Types d'effets : `damage`, `block`, `draw`, `poison`, `heal`, `buff`, `debuff`, `diceRoll`

### Phase 2 — Combat engine (nouveau)
1. Creer `src/engine/CardCombatEngine.ts`
2. Etat : `{ deck, hand, discard, exhaust, energy, maxEnergy, block, hp, maxHp }`
3. Actions : `drawCards(n)`, `playCard(card, target)`, `endTurn()`, `shuffleDiscard()`
4. IA ennemie : `{ pattern: [{type:'attack',value:8}, {type:'block',value:5}, ...], currentIndex }`
5. Les ennemis suivent un pattern cyclique d'intentions (comme StS)

### Phase 3 — UI Combat (nouveau CombatManager)
1. **Layout** : joueur a gauche (HP + block) | ennemis a droite (HP + intention)
2. **Main de cartes** : eventail en bas de l'ecran (5 cartes max visibles)
3. **Carte** : hover = zoom + description, click = jouer (si assez d'energie)
4. **Ciblage** : si carte cible un ennemi, cliquer sur l'ennemi apres la carte
5. **Energie** : gemmes/orbes en bas a gauche (3/3 par defaut)
6. **Bouton "Fin de tour"** : termine le tour du joueur
7. **Intentions ennemies** : icones au-dessus des ennemis (epee = attaque X, bouclier = defense)
8. **Animation de** : reutiliser le composant Dice2D existant pour les cartes avec diceRoll

### Phase 4 — Animations et VFX
1. Piocher : carte glisse depuis le deck (en haut a gauche) vers la main
2. Jouer : carte monte vers la cible et s'efface
3. Degats : shake ennemi + nombre rouge flottant
4. Block : bouclier bleu apparait
5. Fin de tour : cartes restantes glissent vers la defausse
6. Mort ennemi : fondu noir + particules

### Phase 5 — Integration avec le jeu existant
1. Quand le GM declenche un combat -> charger le deck du joueur depuis ses abilites/classe
2. Mapper les abilites existantes vers des cartes (Frappe = Attaque de base, etc.)
3. Apres victoire -> proposer 3 cartes, distribuer XP/or via le systeme existant
4. Sync multi-joueurs : chaque joueur joue son tour de cartes, les autres voient les animations

### Phase 6 — Tests et deploy
1. `npm run build` — 0 erreurs
2. Tester un combat solo complet : 3+ rounds, victoire
3. Tester une carte avec de (d20) : animation + resultat variable
4. Deploy Vercel + commit

## Criteres de succes
- [ ] Le joueur pioche 5 cartes en debut de tour
- [ ] Il peut jouer des cartes tant qu'il a de l'energie
- [ ] Les degats s'appliquent aux ennemis (HP baisse visuellement)
- [ ] Les ennemis affichent leur intention avant d'agir
- [ ] Le tour ennemi s'execute automatiquement
- [ ] Un combat de 3+ rounds se termine par victoire ou defaite
- [ ] Au moins 3 cartes ont un lancer de de (Dice2D animation)
- [ ] Apres victoire : choix de carte reward
- [ ] 0 erreur JS dans la console
- [ ] Le deck du joueur est genere depuis sa classe/abilites

## Anti-patterns
- Ne PAS garder la grille tactique — le combat est front-facing (joueur vs ennemis)
- Ne PAS garder le systeme d100 obligatoire — les cartes ont des effets fixes par defaut
- Ne PAS implementer de drag & drop complexe — click-to-play suffit
- Ne PAS creer plus de 40 cartes pour le MVP — extensible plus tard
- Ne PAS toucher au systeme de navigation, GM AI, Supabase, NPC dialogue
- Ne PAS supprimer les fichiers existants avant d'avoir le remplacement fonctionnel

## Exemple de sortie — un tour de combat

```
[Debut du tour 1]
Pioche : Frappe, Frappe, Defense, Coup Puissant, Poison
Energie : 3/3

Joueur joue "Frappe" (1 energie) -> Gobelin A : -6 HP
Joueur joue "Defense" (1 energie) -> +5 Block
Joueur joue "Coup du Destin" (1 energie) -> d20 = 14 -> 14 x 2 = 28 degats !

[Fin du tour - Tour ennemi]
Gobelin A (intention: 8) -> Joueur : -8 degats (block absorbe 5, reste 3)
Gobelin B (intention: bouclier) -> +4 Block

[Debut du tour 2]
Pioche 5 nouvelles cartes...
```
