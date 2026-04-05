# Revision du systeme jour/nuit — Repercussions MJ et gameplay

> **Score original : 2/10** | **Score ameliore : 10/10**
>
> **Prompt original :** `il faut que tu me fasses une revision du systeme jour nuit et les repercutions sur le MJ ainsi que dans le jeu`

---

## Problemes identifies
1. Overlay visuel inerte (pas de couleur dynamique)
2. Pas d'impact mecanique (bonus/malus non codes)
3. GM oublie l'heure
4. Combat identique jour/nuit
5. PNJ toujours disponibles
6. Pas de choix "dormir"

## 5 Phases
1. Overlay visuel dynamique (CSS gradient par heure)
2. Impact combat (nuit: +3 dmg voleur, +2 dmg ennemis, parade plus dure)
3. Impact MJ AI (heure dans le prompt, narration adaptee)
4. PNJ/boutiques (fermeture nuit 21h-6h)
5. Action "Dormir" (avance a l'aube, soigne 50% HP + 100% ressource)

## Criteres
- Ecran change de teinte selon l'heure
- HUD 4 icones (aube/jour/crepuscule/nuit)
- Voleur +3 dmg nuit, parade seuil 14 nuit
- MJ mentionne l'heure
- Boutiques fermees la nuit
- Bouton Dormir fonctionnel
