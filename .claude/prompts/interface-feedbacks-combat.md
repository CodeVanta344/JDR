# Interface de combat avec feedbacks visuels maximum

> **Score original : 1/10** | **Score ameliore : 10/10**
>
> **Prompt original :** `il me faut une interface avec le plus de feedbacks possible pour les joueurs`

---

## Role
Tu es un UI/UX designer specialise en jeux de cartes (Slay the Spire, Balatro, Hearthstone). Tu maitrises les micro-animations, le juice design, et les systemes de feedback visuel.

## Mission
Ameliorer CardCombat.jsx + CardCombat.css pour que chaque action produise un feedback visuel clair et satisfaisant.

## 24 Feedbacks a implementer

### Cartes
1. Hover : monte 40px + zoom 1.15 + ombre
2. Carte jouee : glisse vers cible + fondu
3. Carte injouable : grisee + shake si clic + tooltip
4. Carte selectionnee : pulse doree + "Choisir une cible"
5. Pioche : glisse du deck avec rebond
6. Defausse : glisse vers pile

### Ennemis
7. Degats : shake 400ms + popup rouge + flash + barre HP animee
8. Mort : fondu + crane + particules
9. Block : flash bleu + popup bleu
10. Intention : icone pulsante + valeur + cible

### Joueur
11. Degats recus : flash rouge ecran + shake portrait + popup
12. Soin : flash vert + popup vert
13. Block gagne : flash bleu + popup bleu + icone bouclier
14. Block perce : bouclier se brise
15. Ressource : barre pulse + nombre anime
16. Buff : icone + flash dore
17. Debuff : icone + flash rouge

### Tour
18. Debut tour : banniere "VOTRE TOUR" slide
19. Tour ennemi : banniere rouge
20. Victoire : particules dorees + scale-up
21. Defaite : ecran rouge + fissure

### Multi
22. Tour autre joueur : "[Nom]" + sablier
23. Action autre joueur : popup "[Nom] joue [Carte]"
24. Joueur mort : portrait grise + croix

## Phases
1. Popups degats/soins ameliores
2. Animations de cartes (hover/play/draw/discard)
3. Bannieres de phase (VOTRE TOUR / TOUR ENNEMI)
4. Badges buffs/debuffs animes
5. Effets ecran (flash, shake, confettis)

## Anti-patterns
- Pas de lib animation (CSS only)
- Pas de modification du CardCombatEngine
- Pas de sons (onSFX existant)
- Pas casser le multiplayer
