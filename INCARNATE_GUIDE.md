# 🗺️ GUIDE D'UTILISATION - Carte Aethelgard pour Incarnate

## 📋 Vue d'ensemble

Ce fichier JSON contient une carte narrative complète du monde d'Aethelgard, optimisée pour l'importation dans **Incarnate** (logiciel de création de cartes pour JDR).

**Fichier :** `incarnate-aethelgard-map.json`  
**Taille :** 1158 lignes, ~85KB  
**Format :** JSON structuré compatible Incarnate

---

## 📦 Contenu du fichier

### **1. Métadonnées** (`meta`)
- Titre, auteur, version, date de création
- Description générale du monde
- Thème, échelle, ère historique

### **2. Régions** (`regions`) - 5 territoires majeurs
Chaque région contient :
- **Géographie** : Climat, terrain, coordonnées
- **Démographie** : Population, composition ethnique
- **Politique** : Gouvernement, culture, religion
- **Économie** : Ressources, commerce
- **Militaire** : Forces armées, stratégies
- **Menaces** : Dangers locaux
- **Factions** : Organisations actives avec réputation

**Régions incluses :**
1. ❄️ **Côte des Orages** (Nord nordique)
2. ☀️ **Val Doré** (Cœur impérial)
3. ⚒️ **Monts Cœur-de-Fer** (Royaume nain)
4. 🌳 **Sylve d'Émeraude** (Forêt elfique)
5. 🔥 **Terres Brûlées** (Désolation draconique)

### **3. Lieux** (`locations`) - 15+ points d'intérêt
Chaque lieu contient :
- **Informations de base** : Type, importance, population, coordonnées
- **Quartiers** : Districts détaillés
- **PNJ notables** : Nom, race, alignement, classe, niveau
- **Quêtes** : 3-5 accroches par lieu
- **Rumeurs** : 3-5 bruits de couloir
- **Commerces** : Boutiques avec inventaire
- **Défenses** : Fortifications, garnisons
- **Ambiance** : Atmosphère narrative

**Lieux majeurs :**
- **Sol-Aureus** (Capitale impériale, 350k hab.)
- **Kuldahar** (Capitale nordique, 85k hab.)
- **Forge Éternelle** (Cité naine souterraine, 120k hab.)
- **Sylmanir** (Cité elfique arboricole, 65k hab.)
- **Cité-Cendre** (Ruine maudite, 5k surviv.)
- **+ 10 autres cités/villages/postes**

### **4. Routes** (`routes`) - 5 axes commerciaux
Chaque route contient :
- Points de départ/arrivée
- Waypoints intermédiaires
- Distance (km) et temps de voyage (jours)
- Niveau de sécurité
- Dangers spécifiques (bandits, monstres, climat)

### **5. Factions** (`factions`) - 10 organisations majeures
Chaque faction contient :
- Type, alignement, niveau de pouvoir (0-100)
- Quartier général, chef
- Objectifs, méthodes
- **Réputation par région** (tableau complet)

**Factions incluses :**
- Empire de Sol-Aureus (LN, pouvoir 95)
- Confédération des Jarls (CN, pouvoir 75)
- Guilde de la Forge Éternelle (LG, pouvoir 85)
- Cercle des Chênes Anciens (NG, pouvoir 80)
- Guilde Arcanique (TN, pouvoir 85)
- Loups d'Hiver (TN, pouvoir 70)
- Syndicat de l'Ombre (NE, pouvoir 65)
- Culte de la Flamme Éternelle (CE, pouvoir 55)
- Ordre des Chevaliers de l'Aube (LG, pouvoir 70)
- Sainte Inquisition (LN→LE, pouvoir 65)

### **6. Menaces** (`threats`) - 6 dangers majeurs
Chaque menace contient :
- Type, niveau de danger, statut actuel
- Localisation
- Description détaillée
- Pouvoirs/forces/effets
- Conséquences si non arrêtée

**Menaces incluses :**
1. **Pyroxis** (Dragon Rouge Ancien, apocalyptique)
2. **Corruption Draconique** (Peste magique)
3. **Guerre des Ombres** (Crise politique)
4. **Portail Feywild** (Brèche planaire)
5. **Invasion Orque** (10k+ combattants)
6. **Peste Noire** (Pandémie magique)

### **7. Artefacts** (`artifacts`) - 6 objets légendaires
Chaque artefact contient :
- Type, localisation actuelle
- Description narrative
- **Pouvoirs mécaniques** (stats D&D 5e)
- Malédictions/restrictions
- Attunement requis
- Légendes associées

**Artefacts inclus :**
- Couronne d'Aureus (légitimité impériale)
- Mjolnir du Nord (marteau de Torvald)
- Enclume Sacrée de Moradin (forge divine)
- Grimoire du Souffle de Feu (pyromancy draconique)
- Racine du Premier Arbre (pouvoirs druidiques)
- Sceptre du Roi-Cendre (nécromancie maudite)

### **8. Légendes** (`legends`) - 5 événements historiques
- La Colère de Pyroxis (An 1047)
- Fondation de l'Empire (An 1)
- Pacte de la Forêt Éternelle (An 523)
- La Grande Forge (lieu mythique)
- Bataille de Givre-Sanglant (An 892)

### **9. Chronologie** (`timeline`)
Timeline complète de -3000 à 1247 (présent)

### **10. Notes pour MJ** (`notes`)
- Conseils d'utilisation
- Thèmes narratifs
- Atmosphère générale

---

## 🔧 Importation dans Incarnate

### **Méthode 1 : Importation directe** (si Incarnate supporte JSON)
```
File → Import → Select incarnate-aethelgard-map.json
```

### **Méthode 2 : Conversion manuelle**
Si Incarnate utilise un format propriétaire :

1. **Ouvrir Incarnate**
2. **Créer nouvelle carte**
3. **Importer régions** :
   - Utiliser coordonnées `lat`/`lon` pour placement
   - Appliquer couleurs définies dans `color`
   - Copier descriptions depuis `description`

4. **Placer lieux** :
   - Ajouter markers aux coordonnées définies
   - Classifier par `type` et `importance`
   - Ajouter icônes personnalisées selon emoji région

5. **Tracer routes** :
   - Connecter `start` → `waypoints` → `end`
   - Appliquer styles selon `type` (route pavée, sentier, etc.)
   - Annoter dangers

6. **Configurer factions** :
   - Créer layers par faction
   - Visualiser zones d'influence selon réputation
   - Marquer headquarters

### **Méthode 3 : Utilisation comme référence**
Même si importation impossible, utilisez le JSON comme **bible de référence** :
- Ctrl+F pour rechercher rapidement
- Copier-coller descriptions dans Incarnate manuellement
- Imprimer sections importantes

---

## 🎯 Utilisations recommandées

### **Pour le MJ :**
1. **Préparation de session** : Rechercher rapidement infos sur lieu/PNJ
2. **Improvisation** : Rumeurs et quêtes ready-to-use
3. **Cohérence** : Vérifier distances, relations factions, chronologie
4. **Création de quêtes** : S'inspirer des menaces et artefacts

### **Pour les joueurs :** (version allégée)
- Cartes régionales avec lieux visibles
- Rumeurs publiques uniquement
- Légendes connues de tous
- Cacher : Secrets factions, menaces détaillées, PNJ stats

### **Pour worldbuilding avancé :**
- Ajouter nouvelles factions dans structure existante
- Créer sous-régions en copiant format
- Développer timeline avec nouveaux événements
- Étendre réseau de routes

---

## 📊 Statistiques du contenu

| Catégorie | Quantité |
|-----------|----------|
| **Régions** | 5 |
| **Lieux détaillés** | 15 |
| **Factions** | 10 |
| **Routes** | 5 |
| **Menaces** | 6 |
| **Artefacts** | 6 |
| **Légendes** | 5 |
| **PNJ nommés** | 50+ |
| **Quêtes prêtes** | 75+ |
| **Rumeurs** | 60+ |
| **Événements timeline** | 12 |

**Total :** ~200 éléments narratifs interconnectés

---

## 🔍 Recherche rapide (exemples)

### **Trouver un lieu spécifique :**
```json
Ctrl+F → "id": "sol_aureus"
```

### **Voir réputation faction :**
```json
Ctrl+F → "guilde_arcanique" → section "reputation"
```

### **Lister toutes les quêtes d'une région :**
```json
Ctrl+F → "val_dore" → chercher "quests"
```

### **Consulter une menace :**
```json
Ctrl+F → "pyroxis" → section "threats"
```

### **Trouver artefacts disponibles :**
```json
Ctrl+F → "artifacts" → lister par "location"
```

---

## 🎨 Personnalisation

### **Ajouter un nouveau lieu :**
```json
{
  "id": "votre_lieu",
  "name": "Nom du lieu",
  "region": "val_dore",
  "type": "village",
  "importance": "minor",
  "population": 5000,
  "coordinates": { "lat": 44.0, "lon": 19.0 },
  "description": "Description narrative...",
  "notable_npcs": [...],
  "quests": [...]
}
```

### **Ajouter une faction :**
```json
{
  "id": "ma_faction",
  "name": "Nom Faction",
  "type": "guild",
  "alignment": "True Neutral",
  "power_level": 50,
  "headquarters": "lieu_id",
  "leader": "Nom Chef",
  "goals": ["Objectif 1", "Objectif 2"],
  "methods": ["Méthode 1"],
  "reputation": {
    "val_dore": 20,
    "cote_orages": -10,
    ...
  }
}
```

### **Modifier couleurs régions :**
Champs `color` utilisent format HEX :
- `#a8c5dd` = Bleu glacé (Nord)
- `#ffd97d` = Or (Centre)
- `#8b7355` = Brun (Montagnes)
- `#6b9b6e` = Vert (Forêt)
- `#8b4513` = Brun foncé (Terres Brûlées)

---

## ⚠️ Avertissements

### **Cohérence :**
Si vous modifiez un élément, vérifiez les références croisées :
- Déplacer un lieu → Mettre à jour routes
- Changer chef faction → Mettre à jour PNJ
- Modifier alignement faction → Réviser réputation

### **Équilibrage :**
Les stats sont calibrées pour D&D 5e niveau 1-15 :
- Menaces : Niveau 5-20
- PNJ : Niveau 4-18
- Artefacts : Rareté Légendaire/Artefact

Ajustez selon votre système/niveau de campagne.

### **Spoilers :**
Section `threats` et `artifacts` contiennent **SPOILERS MAJEURS**.  
Ne partagez avec joueurs que versions éditées.

---

## 📞 Support & Contribution

### **Bugs/Erreurs :**
Si vous trouvez incohérences (distances, noms, dates) :
- Noter ligne JSON concernée
- Proposer correction

### **Ajouts suggérés :**
Contenu manquant que vous aimeriez voir :
- Sous-régions plus détaillées
- PNJ mineurs
- Villages intermédiaires
- Monstres spécifiques
- Événements aléatoires

### **Partage communautaire :**
Si vous créez extensions/variantes :
- Ajouter timestamp + auteur
- Conserver structure JSON
- Documenter changements majeurs

---

## 🏆 Crédits

**Monde :** Aethelgard  
**Auteur :** Chroniqueurs d'Aethelgard  
**Format :** JSON Incarnate-compatible  
**Version :** 1.0 (2026-02-12)  
**Système :** D&D 5e (adaptable)  
**Licence :** Usage personnel/table JDR uniquement

---

## 📚 Ressources complémentaires

**Fichiers liés :**
- `aethelgard-map.svg` - Carte visuelle vectorielle
- `map-viewer.html` - Visionneuse web interactive
- `LORE_CARTE_AETHELGARD.md` - Lore textuel détaillé
- `LIFEPATH_SYSTEM_GUIDE.md` - Système de création personnage

**Documentation :**
- `LIFEPATH_SYSTEM_GUIDE.md` - 528 lignes, guide complet lifepath
- `LORE_DIAGRAMMES_AETHELGARD.md` - Diagrammes visuels

---

**🎲 Que votre table soit épique et vos dés favorables ! 🎲**
