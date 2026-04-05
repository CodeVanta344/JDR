# Audit MJ AI — Problemes et ameliorations

> **Score original : 1/10** | **Score ameliore : 10/10**
>
> **Prompt original :** `audit sur le MJ et dis moi ce que l'on peut ameliorer`

---

## RAPPORT D'AUDIT MJ AI (resultats de l'analyse)

### PROBLEMES CRITIQUES

1. **Affinity handler non implemente** (aiResponseProcessor.js:123, App.jsx:1853)
   - Le MJ peut envoyer `affinity_change` mais le handler n'existe pas → silently ignored
   - Impact: Le systeme de relations PNJ ne fonctionne pas
   - Fix: Implementer handleAffinityChange() + table Supabase npc_affinities

2. **Title unlock handler non implemente** (aiResponseProcessor.js:128, App.jsx:1852)
   - Meme probleme que l'affinite — handler reference mais jamais defini
   - Fix: Implementer handleTitleUnlock()

3. **Combat faux positifs** (index.mjs:185-190)
   - "Le forgeron frappe le metal" → declenche un combat
   - Fix: Verifier les verbes avec sujet joueur ("je frappe" vs "il frappe")

4. **Pas de distinction d'erreur** (App.jsx:125)
   - Timeout, crash serveur, erreur Claude → meme message generique
   - Fix: Retourner le type d'erreur au client

5. **Pas de scaling challenge DC par niveau** (messageManager.js)
   - Le MJ ne sait pas adapter la difficulte au groupe
   - Fix: Envoyer le niveau moyen du groupe + guide DC

### PROBLEMES MAJEURS

6. **Quest system non cable** — QuestHandler existe mais pas de state machine
7. **NPC memoire absente** — Pas d'historique par PNJ, conversations "oubliees"
8. **NPCRelationshipGraph jamais instancie** — Code mort
9. **Inventaire non mentionne dans le system prompt** — Le MJ ignore l'equipement
10. **Multi-joueur non gere** — Le MJ ne sait pas qui roule les challenges en groupe

### AMELIORATIONS

11. Reduire polling de 1.5s a 500ms ou utiliser Realtime cote client
12. Lazy-load le lore (ne pas envoyer le bestiaire complet a chaque requete)
13. Ajouter retry avec backoff exponentiel
14. Nettoyer les requetes orphelines (cron 5min)
15. Valider le JSON de reponse contre un schema

### METRIQUES
- Temps reponse moyen: 6-60 secondes
- Taille contexte: ~30,000-60,000 tokens/requete
- Cout estime: $0.003-0.006/requete (Sonnet)
