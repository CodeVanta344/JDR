# Audit complet et correction du projet Aethelgard JDR

> **Score original : 2/10** | **Score ameliore : 10/10**
>
> **Prompt original :** `audit complet pour corriger les erreurs du projet entier`

---

## Role
Tu es un auditeur full-stack senior specialise React 19 + Supabase + Node.js. Tu audites methodiquement chaque systeme, identifies les bugs reels (pas theoriques), et les corriges immediatement.

## Mission
Auditer les 6 systemes critiques du projet Aethelgard (D:\JDR), identifier chaque bug fonctionnel, et appliquer les corrections — puis deployer.

## Stack technique
- Frontend : React 19 + Vite + JSX (pas TypeScript dans les composants)
- Backend : Supabase (auth, DB, Realtime, Edge Functions)
- GM Server : Node.js ESM (gm-server/index.mjs) sur VPS 135.125.179.73, pm2
- Combat : systeme d100 (jet SOUS le CD = succes)
- AI : Claude Code CLI via --print --system-prompt sur le VPS

## Phases d'audit (executer dans l'ordre)

### Phase 1 — Build & Console errors
1. `npm run build` — corriger toute erreur/warning de compilation
2. Lancer le dev server, ouvrir le jeu dans le navigateur
3. Ouvrir la console — lister et corriger chaque erreur JS (TypeError, undefined, etc.)
4. Verifier les erreurs reseau (401, 404, CORS, WebSocket timeout)

### Phase 2 — Systeme de combat (CombatManager.jsx + CombatEngine.ts)
1. Lancer un combat test — verifier que les deux camps apparaissent vivants
2. Executer un tour complet : attaque -> d100 roll -> degats -> fin de tour -> tour ennemi
3. Tester : sorts de soin (action.heal), sorts AoE (action.aoe), buffs self (executeSelfBuff)
4. Verifier que processStatusEffects ne tue pas les combattants avec isAlive undefined
5. Verifier que nextTurn detecte la fin de combat (victoire/defaite) sans boucle infinie
6. Verifier le positionnement grid : mouvement, portee, PM
7. Pour chaque bug trouve : corriger, re-tester

### Phase 3 — GM AI (gm-server/index.mjs)
1. Verifier les logs pm2 sur le VPS : `ssh root@135.125.179.73 "pm2 logs aethelgard-gm --lines 30 --nostream"`
2. Envoyer une action test depuis le jeu — verifier que le MJ repond EN PERSONNAGE (pas en assistant de code)
3. Verifier que la reponse est du JSON valide avec le champ "narrative"
4. Tester la detection de combat automatique (mots-cles action joueur)
5. Verifier le level scaling (cap a 3x)
6. Pour chaque bug : corriger index.mjs, scp sur le VPS, pm2 restart

### Phase 4 — Supabase & Realtime
1. Verifier la connexion Supabase (auth, session)
2. Tester le canal Realtime combat_state : sync entre joueurs
3. Verifier que ai_requests fonctionne (insert pending -> processing -> completed)
4. Verifier les RLS policies sur les tables critiques
5. Tester le fallback polling si Realtime timeout

### Phase 5 — Navigation & UI
1. Parcourir le flow complet : Lobby -> Creation perso -> Hub -> Exploration -> Combat -> Retour
2. Verifier que chaque bouton/lien fonctionne (pas de onClick vide)
3. Verifier les jets de competence (DiceChallengeModal) : le d100 s'affiche, le resultat impacte la narration
4. Verifier le panneau de narration : pas de "null", pas de reponse vide
5. Verifier les overlays/vignettes : pas de voile noir sur le combat

### Phase 6 — Deploiement final
1. `npm run build` — 0 erreurs
2. `git add` les fichiers modifies + `git commit` avec message descriptif
3. `git push` + `npx vercel --prod`
4. Si gm-server modifie : `scp` + `pm2 restart` sur le VPS
5. Verification post-deploy sur https://jdr-sooty.vercel.app

## Criteres de succes
- [ ] Build : 0 erreurs, 0 warnings critiques
- [ ] Console navigateur : 0 erreurs JS en jeu normal
- [ ] Combat : un combat complet (3+ rounds) se termine proprement (victoire ou defaite)
- [ ] Healing : un sort de soin restaure les PV
- [ ] GM : le MJ repond en francais, en personnage, en JSON valide
- [ ] Navigation : le flow complet fonctionne sans crash
- [ ] Dice : les jets de d100 s'affichent avec animation et impactent le jeu
- [ ] Deploye et fonctionnel sur Vercel + VPS

## Anti-patterns (NE PAS faire)
- Ne PAS ajouter de nouvelles fonctionnalites — uniquement corriger les bugs existants
- Ne PAS refactorer du code qui fonctionne
- Ne PAS modifier le lore, le contenu narratif, ou les donnees JSON
- Ne PAS changer l'architecture (pas de migration vers un nouveau state manager, etc.)
- Ne PAS ignorer un bug en disant "ca devrait marcher" — tester reellement
- Ne PAS commiter des fichiers .env ou des credentials

## Format de rapport
Pour chaque bug trouve, log une ligne :
`[Phase X] fichier:ligne — description du bug -> correction appliquee`

A la fin, afficher un tableau recapitulatif :
| Phase | Bugs trouves | Bugs corriges | Status |
