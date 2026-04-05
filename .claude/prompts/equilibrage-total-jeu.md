# Equilibrage total du jeu Aethelgard — Toutes mecaniques

> **Score original : 1/10** | **Score ameliore : 10/10**
>
> **Prompt original :** `il faut me faire un equilibrage total du jeu sur toutes les mecaniques sans exceptions`

---

## Role
Game designer senior specialise en equilibrage RPG (D&D, Slay the Spire, Baldur's Gate).

## Mission
Reequilibrer TOUTES les mecaniques numeriques pour un jeu jouable et satisfaisant du niveau 1 au 30.

## Problemes identifies

### CRITIQUE
1. Mage HP: d6+CON8 = ~8 HP vs Guerrier d12+CON16 = ~20 HP (ratio 1:2.5)
2. Abilities niv 30 game-breaking (invulnerabilite 5 tours)
3. Pas de scaling degats par niveau (Frappe = 6 dmg a tout niveau)

### SEVERE
4. Ressource 100 max, recovery 25% (trop punitif)
5. Couts de cartes incoherents
6. Ennemis ignorent l'AC
7. Poison inutile (3 dmg/tour vs 100+ HP)

### MOYEN
8. Items legendaires inachetables (180000 PO)
9. XP lineaire sans paliers
10. Soins vs DPS non equilibre

## 6 Phases
1. Classes HP/Stats (classes.ts) — ecart HP ≤ 40%
2. Cartes et couts (cards.ts) — ratio cout/effet normalise
3. Ennemis (CardCombatEngine.ts) — AC reduction + poison x2
4. Progression (economie + XP) — paliers + prix legendaires /3
5. Abilities niv 20-30 (classes.ts) — nerf durees + cooldowns
6. Soins vs DPS — heal = 50-60% du DPS attaquant

## Criteres de succes
- Ecart HP classes ≤ 40%
- Ratio cout/effet cartes coherent (±20%)
- Combat dure 3-5 rounds
- Repos max 1 fois par combat
- Abilities niv 30 puissantes mais pas invincibles
- Poison = 10% HP cible minimum
- Armure reduit visiblement les degats
- Mage survit 3 tours
- Items legendaires atteignables en ~20 sessions
- 0 erreur build

## Anti-patterns
- Ne PAS changer noms/descriptions (que les chiffres)
- Ne PAS supprimer abilities/classes
- Ne PAS modifier UI/CSS/CardCombat.jsx
- Ne PAS toucher GM AI/Supabase
- Difficulte cible: 60% win rate
