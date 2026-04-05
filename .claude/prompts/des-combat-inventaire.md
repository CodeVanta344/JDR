# Integration des des en combat + inventaire visible

> **Score original : 3/10** | **Score ameliore : 10/10**
>
> **Prompt original :** `il faut que dans les combats les lances de des aient quand meme une place, que ce soit pour essayer de contrer l'attaque ennemi ou pour determiner la puissance de certaines competences ou actions et l'inventaire n'est toujours pas visible en combat`

---

## 3 mecaniques de des

### 1. Jet de defense (auto, passif)
- Ennemi attaque -> d20 auto pour le joueur cible
- d20 >= 12 : degats -50% | d20 >= 18 : degats -75% | sinon : normal
- Cout 0, passif, log visible

### 2. Cartes a des (puissance variable)
- "Coup de Chance" (ATK, 10) : d20 x 1.5 dmg
- "Bouclier Instable" (SKILL, 8) : d20 x 0.8 block
- "Drain Vital" (SKILL, 15) : d20 soins
- Animation InlineDice

### 3. Jet de critique (auto sur attaques)
- d100 >= 95 : degats x2 + "CRITIQUE !"
- d100 <= 5 : degats /2 + "RATE !"

## Inventaire en combat
- Bouton sac a dos en bas a gauche
- Overlay lateral avec items
- Consommables : bouton "Utiliser" (consomme le tour)
- Non-consommables : info seulement

## 4 Phases
1. Jet defense auto (CardCombatEngine.js)
2. Jet critique (CardCombatEngine.js)
3. Nouvelles cartes a des (cards.js)
4. Inventaire overlay (CardCombat.jsx)
