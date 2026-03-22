/**
 * CHAPITRE 9 : LE CONSEIL DE GUERRE (Niveau 10-11)
 * 6 scènes — Retour à Sol-Aureus, le grand Conseil, débats entre factions,
 *             espionnage et sabotage, préparatifs, veillée d'armes
 *
 * THÈME CENTRAL : Politique, stratégie, unification. Le plus grand
 * chapitre "social" — les joueurs doivent unir des factions méfiantes
 * et préparer l'assaut final. Le RolePlay est ROI ici.
 */
import type { NarrativeScene, NarrativeChapter, SideQuest, RandomEncounter } from './types';

// ============================================================================
// SCÈNES PRINCIPALES
// ============================================================================

const CH9_SCENES: NarrativeScene[] = [
  // ────────────────────────────────────────────
  // SCÈNE 1 — RETOUR À SOL-AUREUS
  // ────────────────────────────────────────────
  {
    id: 'ch9_s1_preparations', chapterId: 'ch9', sceneNumber: 1,
    title: 'Le Retour des Héros', type: 'narration',
    readAloud: `Sol-Aureus est méconnaissable. La cité qui vous avait accueillis il y a quelques semaines est devenue un camp de guerre. Des tentes couvrent les champs autour des murs. Des colonnes de soldats marchent vers le nord. Les forgerons travaillent jour et nuit — le son des marteaux est devenu le battement de cœur de la ville.

Quand vous passez les portes, la foule s'écarte. Des murmures. Puis quelqu'un crie votre nom — et la foule éclate en acclamations. Des pétales de fleurs tombent des fenêtres. Des enfants courent à côté de vos chevaux. Les soldats frappent leurs boucliers en cadence.

La Reine Elara vous attend sur les marches du palais. À ses côtés : le Général Marcus, le Grand Prêtre Alduin, et une mer de conseillers. Elle incline la tête.

"Le Sceau de la Sylve est renouvelé. C'est la première bonne nouvelle que nous ayons eue en trois mois." Sa voix se durcit. "Mais Syrana nous a trahis. Le Culte a les plans des Sceaux. Nous n'avons plus le luxe du temps — le Conseil de Guerre commence à l'aube."`,
    gmNotes: `SCÈNE D'ACCUEIL — COURTE MAIS IMPORTANTE.

CE QUI A CHANGÉ à Sol-Aureus depuis le départ des joueurs :
• 3 000 soldats humains campent autour de la ville
• 500 nains de Hammerdeep sont arrivés (Grundar commande le contingent)
• 200 archers elfiques (envoyés par Faelorn avant la trahison de Syrana)
• Le Général Marcus a pris le commandement militaire de la coalition
• Le Grand Prêtre Alduin a consacré 50 ecclésiastiques comme medics de guerre
• La population civile est en partie évacuée vers le sud

LES NOUVELLES FRAÎCHES :
• Les éclaireurs rapportent que Sombrelune est LOURDEMENT fortifié — murs d'ombre, fosses de créatures, patrouilles constantes
• 2 des 3 Sceaux "inconnus" ont été confirmés BRISÉS — il ne reste que le Sceau de Sombrelune lui-même + ceux que les joueurs ont renforcés
• L'armée du Culte est estimée à 2 000 cultistes + "nombre inconnu" de créatures d'ombre
• La nouvelle lune est dans 8 jours — c'est le moment où Malachi doit activer le Miroir

IMPACT DE LA TRAHISON DE SYRANA :
• Le contingent elfique est en partie démoralisé — certains elfes questionnent s'il y a d'autres traîtres
• Faelorn est arrivé 2 jours avant les joueurs — il est sombre, efficace, mais visiblement blessé émotionnellement`,
    dialogues: [
      {
        npcId: 'npc_queen_elara', npcName: 'Reine Elara',
        lines: [
          { trigger: 'Arrivée', text: `*Elle descend les marches et prend les mains du joueur le plus proche — un geste inhabituel pour une monarque.* Bienvenue. Ce que vous avez accompli dans la Sylve... *Elle regarde vers le nord.* C'est le premier Sceau renouvelé en 120 ans. Vous avez donné de l'espoir à tout un continent.`, tone: 'reconnaissance-gravité' },
          { trigger: 'Nouvelles', text: `*Plus grave.* Les nouvelles sont sombres. Deux Sceaux supplémentaires sont tombés pendant votre absence — le Sceau du Désert et le Sceau de la Mer. Il ne reste que la Sylve, la Pierre, la Forêt... et Sombrelune. Et Malachi sait tout — grâce à Syrana. *Pause.* La nouvelle lune est dans 8 jours. C'est notre délai.`, tone: 'urgente' }
        ]
      },
      {
        npcId: 'npc_general_marcus', npcName: 'Général Marcus',
        lines: [
          { trigger: 'Situation', text: `*Serrant la main de chaque joueur.* Nos éclaireurs estiment les forces ennemies à 2 000 cultistes, plus des créatures d'ombre en nombre inconnu. Sombrelune est un volcan mort — un seul accès par voie terrestre. Les murs sont renforcés par de la magie d'ombre. C'est... *sourire amer* ...la pire forteresse que j'aie jamais eu à assiéger.`, tone: 'soldat-pragmatique' }
        ]
      }
    ],
    objectives: [
      { description: 'Arriver à Sol-Aureus et être accueillis en héros', type: 'special', optional: false },
      { description: 'Recevoir les dernières nouvelles (2 Sceaux brisés, délai 8 jours)', type: 'talk', optional: false }
    ],
    transitions: [
      { condition: 'Prêts pour le Conseil', nextScene: 'ch9_s2_conseil', label: '→ Le Grand Conseil' }
    ],
    estimatedMinutes: 10, mood: 'retour-triomphal-urgent',
    music: 'Fanfare héroïque → transition vers tension de guerre', location: 'Sol-Aureus — Portes de la ville et Palais Royal'
  },

  // ────────────────────────────────────────────
  // SCÈNE 2 — LE GRAND CONSEIL DE GUERRE
  // ────────────────────────────────────────────
  {
    id: 'ch9_s2_conseil', chapterId: 'ch9', sceneNumber: 2,
    title: 'L\'Assemblée des Peuples', type: 'dialogue',
    readAloud: `Pour la première fois en 120 ans, les trois peuples d'Aethelgard se réunissent.

La grande salle du palais est transformée — trois longues tables en demi-cercle font face à une carte immense du continent. Des marqueurs en or, argent et cuivre représentent les forces en présence.

Au centre : la Reine Elara, en armure de cérémonie. À sa droite : le Thane Durinn, bras croisés, sa hache posée sur la table. À sa gauche : Faelorn, debout, les mains derrière le dos, le visage impénétrable. Derrière eux : le Général Marcus, le Grand Prêtre Alduin, Grundar, Lysandra, et une douzaine de commandants.

La Reine se lève. "Nous sommes ici parce que seuls, nous mourrons. Ensemble, nous avons une chance." Elle regarde Durinn. "Thane ?" Durinn. "Seigneur Faelorn ?" Faelorn hoche la tête. "Héros de l'Alliance ?" Elle vous regarde. "C'est VOTRE conseil. Vous avez vu l'ennemi de plus près que quiconque. Guidez-nous."`,
    gmNotes: `LE GRAND CONSEIL — SCÈNE POLITIQUE MAJEURE.

═══════════════════════════════════════════
LES TROIS STRATÉGIES PROPOSÉES :
═══════════════════════════════════════════

STRATÉGIE A — LE SIÈGE (Reine Elara) :
• 3 000 soldats encerclent Sombrelune
• Couper les lignes de ravitaillement
• Attendre que le Culte sorte ou s'affaiblisse
• POUR : Sûr, minimise les pertes. CONTRE : Trop lent — 8 jours max.

STRATÉGIE B — LE TUNNEL (Thane Durinn) :
• Les nains creusent un tunnel sous la Tour en 3 jours
• Surgir au cœur des défenses
• POUR : Surprise totale, frappe chirurgicale. CONTRE : Si détecté, le tunnel peut être effondré (piège mortel).

STRATÉGIE C — L'INFILTRATION (Faelorn/Thalion) :
• Les joueurs s'infiltrent pendant que les armées font diversion
• Objectif : atteindre le Miroir et le détruire/sceller
• POUR : Rapide, ciblé. CONTRE : Tout repose sur les joueurs.

═══════════════════════════════════════════
LA SOLUTION OPTIMALE : COMBINAISON DES TROIS
═══════════════════════════════════════════
• LES ARMÉES assiègent et attirent l'attention (A)
• LES NAINS creusent un accès secret (B)
• LES JOUEURS infiltrent via le tunnel et frappent le Miroir (C)
• Les elfes enchantent le tunnel pour masquer les vibrations

MÉCANIQUE : Le choix des joueurs affecte la difficulté des Ch10-12 :
• Combinaison complète → Normal
• Pas de tunnel → Infiltration via la surface, +2 DC à toutes les furtivités
• Pas de diversion → Cultistes en pleine alerte, +50% ennemis
• Refus de coopération d'une faction → Cette faction ne combat pas à Sombrelune

CONFLITS POSSIBLES (les joueurs doivent résoudre) :
1. DURINN VS FAELORN : Durinn accuse les elfes d'incompétence (Syrana était elfique). "Qui nous dit qu'il n'y a pas d'autres traîtres chez les oreilles-pointues ?" → Persuasion DC 16 pour calmer, ou laisser escalader.
2. LE GÉNÉRAL MARCUS VS LE THANE : Marcus veut commander TOUTES les troupes. Durinn refuse catégoriquement qu'un humain commande des nains. → Insight DC 14 : proposer une structure à 3 commandants égaux.
3. ALDUIN ET LA QUESTION MORALE : Alduin pose la question : "Et si on peut sauver le Miroir au lieu de le détruire ?" Le Miroir contient Malachor — le détruire pourrait le LIBÉRER au lieu de le sceller. → Arcanes DC 17 pour comprendre que le Miroir doit être SCELLÉ, pas brisé.`,
    dialogues: [
      {
        npcId: 'npc_queen_elara', npcName: 'Reine Elara',
        lines: [
          { trigger: 'Stratégie A', text: `Mes armées sont les plus nombreuses. Un siège classique — encercler Sombrelune, couper ses lignes de ravitaillement, et attendre que Malachi fasse une erreur. C'est la méthode la plus sûre.`, tone: 'stratégique' },
          { trigger: 'Urgence', text: `*Plus grave.* Cependant... le temps n'est pas notre allié. Chaque jour, le Miroir s'entrouvre davantage. Si nous attendons trop... il sera trop tard pour assiéger quoi que ce soit. Le monde sera submergé.`, tone: 'inquiète' }
        ]
      },
      {
        npcId: 'npc_thane_durinn', npcName: 'Thane Durinn',
        lines: [
          { trigger: 'Stratégie B', text: `*Il frappe la table de son poing.* Un siège ? Trop lent ! Les nains creusent. On perce un tunnel sous la Tour en trois jours. On surgit au cœur de leurs défenses et on les prend par surprise. La pierre n'arrête pas les nains — elle nous INVITE.`, tone: 'fervent' },
          { trigger: 'Accusation elfes', text: `*Debout, doigt pointé vers Faelorn.* Et dites-moi, Seigneur des Arbres — combien d'autres "Syrana" avez-vous dans vos rangs ? Votre meilleure guerrière était une TRAÎTRESSE ! Comment peut-on vous faire confiance quand votre propre conseil vous poignarde dans le dos ?`, tone: 'accusateur' },
          { trigger: 'Calmé', text: `*Après un long silence, il se rassied.* ...Très bien. Très bien. La pierre n'a pas de rancune. Mais je veux des preuves — chaque elfe qui entre dans MON tunnel sera fouillé. C'est ma condition.`, tone: 'méfiant-pragmatique' }
        ]
      },
      {
        npcId: 'npc_faelorn', npcName: 'Faelorn',
        lines: [
          { trigger: 'Accusation de Durinn', text: `*Il ne bouge pas. Sa voix est un rasoir de glace.* Le Thane a raison. J'ai failli. Syrana était sous ma responsabilité. Sa trahison est MON échec. *Il regarde Durinn.* Mais la question n'est pas ma compétence — c'est la survie du monde. Pouvez-vous creuser sans nos enchantements de silence ? Non. Alors travaillons ensemble — et jugez-moi APRÈS que le Miroir soit scellé.`, tone: 'blessé-pragmatique' },
          { trigger: 'Stratégie C', text: `L'infiltration est notre meilleure option — mais pas pour n'importe qui. *Il regarde les joueurs.* Vous connaissez l'ennemi. Vous avez affronté Gorvan, traversé les épreuves de la Sylve. Personne d'autre n'a cette expérience. Le monde entier... repose sur vous.`, tone: 'solennel' }
        ]
      },
      {
        npcId: 'npc_alduin', npcName: 'Grand Prêtre Alduin',
        lines: [
          { trigger: 'Question morale', text: `*Se levant, la main sur le symbole de Solarius.* Avant de parler de stratégie... une question. Le Miroir contient Malachor — le Septième Héros. Si nous le DÉTRUISONS, ne risquons-nous pas de le LIBÉRER ? Les anciens textes disent : "Briser la prison, c'est ouvrir la porte." *Il regarde les joueurs.* Peut-être devons-nous SCELLER le Miroir, pas le briser.`, tone: 'grave-sagesse' }
        ]
      }
    ],
    objectives: [
      { description: 'Écouter les trois stratégies proposées', type: 'talk', optional: false },
      { description: 'Résoudre le conflit Durinn-Faelorn (Persuasion DC 16)', type: 'social', optional: false },
      { description: 'Trancher la question du commandement (Insight DC 14)', type: 'social', optional: true },
      { description: 'Comprendre le danger de briser le Miroir (Arcanes DC 17)', type: 'special', optional: false },
      { description: 'Unifier les trois stratégies en un plan cohérent', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'Plan validé par les 3 factions', nextScene: 'ch9_s3_espionnage', label: '→ L\'Ombre à Sol-Aureus' }
    ],
    skillChecks: [
      { skill: 'Persuasion', dc: 16, success: 'Durinn accepte de travailler avec les elfes malgré sa méfiance.', failure: 'Durinn refuse de combattre aux côtés des elfes — le tunnel est sans enchantement (DC +2 partout en Ch10).', criticalSuccess: 'Durinn et Faelorn se serrent la main — l\'alliance est cimentée. Bonus moral : +2 aux jets de moral en Ch11.' },
      { skill: 'Insight', dc: 14, success: 'Structure à 3 commandants égaux — chaque race garde son autonomie.', failure: 'Marcus prend le commandement unique — Durinn est furieux (tensions en Ch10).' },
      { skill: 'Arcanes', dc: 17, success: 'Le Miroir doit être SCELLÉ, pas détruit. Détruire le Miroir libérerait Malachor.', failure: 'Les joueurs ne comprennent pas le danger — découverte en plein Ch12, au pire moment.' }
    ],
    estimatedMinutes: 25, mood: 'politique-tendu-épique',
    music: 'Conseil — cuivres lents, percussions dramatiques, silences lourds', location: 'Sol-Aureus — Grande Salle du Palais'
  },

  // ────────────────────────────────────────────
  // SCÈNE 3 — ESPIONNAGE ET SABOTAGE
  // ────────────────────────────────────────────
  {
    id: 'ch9_s3_espionnage', chapterId: 'ch9', sceneNumber: 3,
    title: 'L\'Ombre à Sol-Aureus', type: 'exploration',
    readAloud: `La nuit qui suit le Conseil, un messager arrive en courant : les réserves d'armes du camp sud sont en feu. Le sabotage. Des agents du Culte sont dans Sol-Aureus.

Le Général Marcus envoie des patrouilles — mais les incendiaires ont disparu. Trois soldats sont trouvés morts, avec le tatouage du Miroir gravé dans la chair. Un message est laissé en lettres de sang :

"LE MIROIR VOIT TOUT. VOS PLANS SONT CONNUS. SOMBRELUNE VOUS ATTEND."

La Reine ordonne une purge. "Trouvez les espions. Tous. Avant qu'ils ne sabotent nos préparatifs de guerre."`,
    gmNotes: `SCÈNE D'INVESTIGATION / INFILTRATION.

LES ESPIONS DU CULTE : 5 agents infiltrés dans Sol-Aureus.
• 2 soldats humains (recrutés par chantage — familles menacées)
• 1 servante du palais (Réflexion convaincue, dangereuse)
• 1 forgeron nain (corrompu par l'or — pas un vrai croyant)
• 1 taupe dans le cercle d'Alduin (un prêtre junior, manipulé par Syrana avant sa fuite)

ENQUÊTE : Les joueurs peuvent utiliser 3 approches :
1. INTERROGATOIRE : Parler aux témoins. Intuition DC 14 pour détecter le mensonge d'un suspect.
2. FILATURE : Suivre les suspects la nuit. Discrétion DC 15 pour ne pas être repéré.
3. PIÈGE : Donner de fausses informations et voir qui les transmet. Intelligence DC 16 pour concevoir le piège.

CHAQUE ESPION TROUVÉ = 1 avantage pour Ch10-11 :
• Espion 1 : Carte des patrouilles de Sombrelune
• Espion 2 : Code de communication du Culte
• Espion 3 : Plan des défenses souterraines de la Tour
• Espion 4 : Antidote au poison d'ombre (protège 5 personnes)
• Espion 5 : Localisation exacte du Miroir dans la Tour

COMBAT POSSIBLE : La servante du palais (Réflexion) tente d'assassiner un PNJ clé (au choix du MJ — Marcus, Alduin, ou un joueur endormi) si elle n'est pas découverte avant la fin de la scène. Stat : Assassin (CR 5), poison d'ombre (+3d6 nécrotique sur première attaque surprise).

QUÊTE SECONDAIRE LIÉE : Si Edrik (le cultiste repenti de Ch6) est vivant, il peut aider — il connaît les codes visuels des Réflexions (tatouage caché sur l'avant-bras gauche). Cela donne avantage aux jets d'Investigation.`,
    dialogues: [
      {
        npcId: 'npc_general_marcus', npcName: 'Général Marcus',
        lines: [
          { trigger: 'Sabotage', text: `*La mâchoire serrée.* Trois de mes hommes. Assassinés sous mon nez. *Il frappe le mur.* Le Culte est DANS nos murs. Trouvez-les. Je m'en fiche de la méthode — trouvez-les avant qu'ils ne fassent encore plus de dégâts.`, tone: 'furieux' },
          { trigger: 'Résultats', text: `*Après les arrestations.* Cinq espions. Cinq. Dans une armée de quatre mille. Ça veut dire que le Culte a des réseaux que nous n'imaginions même pas. *Il regarde les prisonniers.* Interrogez-les. Tout ce qu'ils savent sur Sombrelune nous sera utile.`, tone: 'sombre-pragmatique' }
        ]
      }
    ],
    objectives: [
      { description: 'Enquêter sur le sabotage et identifier les espions du Culte', type: 'explore', optional: false },
      { description: 'Trouver au moins 3 des 5 espions infiltrés', type: 'special', optional: false },
      { description: '(Optionnel) Empêcher l\'assassinat de la servante/Réflexion', type: 'combat', optional: true }
    ],
    transitions: [
      { condition: 'Espions neutralisés', nextScene: 'ch9_s4_forges', label: '→ Les Forges de Guerre' }
    ],
    skillChecks: [
      { skill: 'Intuition', dc: 14, success: 'Vous percevez le mensonge du suspect.', failure: 'Le suspect est convaincant — vous perdez du temps.' },
      { skill: 'Discrétion', dc: 15, success: 'Vous suivez le suspect jusqu\'à son point de rendez-vous.', failure: 'Le suspect vous repère et tente de fuir.' },
      { skill: 'Intelligence', dc: 16, success: 'Le piège fonctionne — les fausses infos sont transmises et vous identifiez la chaîne.', failure: 'Le piège est trop grossier — les espions ne mordent pas.' }
    ],
    encounters: ['Réflexion/Assassin (CR 5) si non détectée'],
    estimatedMinutes: 20, mood: 'espionnage-paranoia',
    music: 'Intrigue — cordes tendues, pas furtifs, silence', location: 'Sol-Aureus — Camp militaire et Bas-Fonds'
  },

  // ────────────────────────────────────────────
  // SCÈNE 4 — LES FORGES DE GUERRE
  // ────────────────────────────────────────────
  {
    id: 'ch9_s4_forges', chapterId: 'ch9', sceneNumber: 4,
    title: 'Les Forges de Guerre', type: 'exploration',
    readAloud: `Les préparatifs de guerre transforment Sol-Aureus en une machine de destruction. Trois forges opèrent en continu — la forge humaine crache de l'acier, la forge naine tonne avec des enchantements de rune, et la forge elfique tisse des flèches de Silvaris.

Chaque joueur est invité à choisir un domaine de préparation :
— La FORGE pour améliorer une arme ou armure
— La CASERNE pour entraîner les troupes
— Le TEMPLE pour recevoir une bénédiction de combat
— La BIBLIOTHÈQUE pour rechercher les faiblesses de Sombrelune

Vous avez une journée. Utilisez-la bien.`,
    gmNotes: `SCÈNE DE PRÉPARATION — CHOIX PERSONNELS.

Chaque joueur choisit UNE activité (peut être différente pour chaque joueur) :

═══════════════════════════════════════════
LA FORGE (Grundar supervise) :
═══════════════════════════════════════════
• Forgeron DC 15 (ou payer 200 PO) : Améliorer une arme de +1 → +2
• OU enchantement anti-ombre : arme existante gagne +1d6 radiant contre créatures d'ombre
• OU forger une armure de Mithral (AC bonus +1, pas de désavantage Discrétion)

═══════════════════════════════════════════
LA CASERNE (Général Marcus) :
═══════════════════════════════════════════
• Entraînement tactique : Le joueur forme un escadron (Leadership DC 14)
• Réussite : l'escadron de 10 soldats fera diversion pendant une scène en Ch11 (élimine 1 vague d'ennemis)
• Bonus : Le joueur gagne +2 Initiative pour Ch10-12 (réflexes d'entraînement)

═══════════════════════════════════════════
LE TEMPLE (Grand Prêtre Alduin) :
═══════════════════════════════════════════
• Bénédiction de Solarius : +5 HP temporaires par jour (pendant Ch10-12)
• OU Restauration supérieure gratuite (élimine malédiction, maladie, ou perte HP max)
• OU Communion divine : poser UNE question à Solarius (divination limïtée — réponse en 1-3 mots)

═══════════════════════════════════════════
LA BIBLIOTHÈQUE (avec Théodore) :
═══════════════════════════════════════════
• Recherche (Investigation DC 16) : Plan détaillé de la Tour de Sombrelune — les joueurs connaissent le layout au Ch11
• OU Recherche sur Malachor (Arcanes/Histoire DC 17) : Découvrir sa FAIBLESSE — la lumière du soleil concentrée brise sa connexion au Miroir pendant 1 round (si les joueurs ont le Cristal d'Étoile du Ch8, ils peuvent l'utiliser comme focus)

CEL EST DÉTERMINÉ PAR LE JOUEUR. Pas de "bonne" réponse.`,
    dialogues: [
      {
        npcId: 'npc_grundar', npcName: 'Grundar',
        lines: [
          { trigger: 'Forge', text: `*Essuyant la suie.* Vous voulez de l'acier ? Je vous fais de l'acier. Du vrai — pas cette ferraille humaine. *Il s'arrête.* Sans offense, Marcus. *Rire bourru.* Apportez-moi votre arme. Demain elle chantera le nom de vos ennemis.`, tone: 'bourru-fier' }
        ]
      },
      {
        npcId: 'npc_theodore', npcName: 'Théodore',
        lines: [
          { trigger: 'Bibliothèque', text: `*Entouré de piles de livres et de parchemins.* La Tour de Sombrelune a été construite en -800, pendant le règne du Roi Sombre — avant les Sceaux. Elle PRÉCÈDE le Miroir. Je crois que la Tour elle-même est la CLÉ — pas juste un contenant, mais un AMPLIFICATEUR. Si on détruit la Tour... non. Si on DÉNATURE la Tour... on pourrait couper Malachi de sa source.`, tone: 'excité-intellectuel' }
        ]
      }
    ],
    objectives: [
      { description: 'Choisir et accomplir une activité de préparation personnelle', type: 'special', optional: false },
      { description: '(Optionnel) Visiter plusieurs préparatifs pour des bonus cumulés', type: 'explore', optional: true }
    ],
    transitions: [
      { condition: 'Journée de préparation terminée', nextScene: 'ch9_s5_adieux', label: '→ La Veillée d\'Armes' }
    ],
    estimatedMinutes: 15, mood: 'préparation-épique',
    music: 'Forges — marteaux, enclumes, chants de guerre nains', location: 'Sol-Aureus — Forges, Caserne, Temple, Bibliothèque'
  },

  // ────────────────────────────────────────────
  // SCÈNE 5 — LA VEILLÉE D'ARMES
  // ────────────────────────────────────────────
  {
    id: 'ch9_s5_adieux', chapterId: 'ch9', sceneNumber: 5,
    title: 'La Veillée d\'Armes', type: 'dialogue',
    readAloud: `La nuit avant le départ. Sol-Aureus est un camp militaire — des tentes couvrent les champs environnants, des forgerons travaillent jour et nuit, et l'air résonne de prières dans trois langues différentes.

C'est votre dernière nuit de calme. Demain, la marche vers Sombrelune commence. Ce soir est pour les adieux, les promesses, et les conversations qu'on repousse trop longtemps.

Lysandra est assise au sommet des remparts de Sol-Aureus, regardant l'horizon nord — la direction de Sombrelune. Le ciel est rouge — un coucher de soleil de sang. Quelque part en bas, un soldat joue du luth. Et sur les champs, quatre mille combattants — humains, nains, elfes — partagent le même repas pour la première fois.`,
    gmNotes: `SCÈNE DE ROLEPLAY PUR — LA PLUS IMPORTANTE DU CHAPITRE.

Chaque PNJ important a un moment avec les joueurs. L'idée est que chaque joueur ait au moins 1 scène intime avec un PNJ de son choix. Le MJ devrait offrir les moments ci-dessous, puis demander : "Avec qui d'autre voulez-vous parler avant l'aube ?"

LYSANDRA : Partage ses peurs et ses espoirs. Si un joueur a développé une relation proche, c'est le moment d'un aveu. Elle révèle aussi qu'elle a écrit une lettre — "pour après, si je ne reviens pas" — et la donne au joueur de confiance.

THÉODORE : Donne l'Éclat de Lumière Primordiale (sort niv.5, 1 utilisation) et dit : "J'aurais aimé être plus jeune. Assez jeune pour marcher avec vous. Mais un vieil homme peut encore prier — et croire."

GRUNDAR : Debout devant un feu, il verse de la bière naine et dit : "Chez les nains, on boit avant la bataille. Pas pour le courage — pour se souvenir de pourquoi on se bat. Pour les bières qu'on n'a pas encore bues."

FAELORN : Assis seul, il taille un morceau de bois d'Yggvan. "Si je tombe demain... dites à la forêt que je suis parti en paix." Il donne au joueur de son choix un talisman de bois — +1 JDS Sagesse.

GÉNÉRAL MARCUS : Debout devant les troupes. "On m'a demandé si j'avais peur. Bien sûr que j'ai peur. Mais les soldats ne voient pas la peur de leur général — ils voient sa foi. Et moi, j'ai foi en vous."

MOMENT PERSONNEL : Chaque joueur peut faire une action personnelle — écrire une lettre, affûter une arme, prier, méditer. Pas de mécanique — pur RP.`,
    dialogues: [
      {
        npcId: 'npc_lysandra', npcName: 'Lysandra',
        lines: [
          { trigger: 'Sur les remparts', text: `*Assise, les pieds dans le vide.* Tu sais ce qui me fait le plus peur ? Pas Malachi. Pas les ombres. C'est de... ne plus exister. De disparaître sans avoir laissé de trace. *Pause.* Mais grâce à vous... je sais que même si je tombe demain, j'aurai fait quelque chose qui comptait.`, tone: 'vulnérable' },
          { trigger: 'La lettre', text: `*Elle sort un parchemin scellé.* Si je ne reviens pas... donne ça à ma mère. Elle vit dans le nord, près de la Forêt de Murmures. *Sourire triste.* Elle croit toujours que je suis en formation à l'Académie.`, tone: 'intime' },
          { trigger: 'Le Miroir', text: `*Sérieuse.* Quoi qu'il arrive à Sombrelune — ne regardez pas dans le Miroir. Malachor est dedans. Et il peut vous voir. Il peut vous PARLER. Ne l'écoutez pas. Peu importe ce qu'il promet.`, tone: 'avertissement-grave' }
        ]
      },
      {
        npcId: 'npc_theodore', npcName: 'Théodore le Gardien',
        lines: [
          { trigger: 'Le don', text: `*Il tend un éclat de cristal blanc qui pulse doucement.* Un dernier cadeau du vieil homme. C'est un fragment de la lumière qui a été utilisée pour forger les Sceaux originaux. Il ne servira qu'une fois — mais quand tout semblera perdu, il pourrait faire la différence. *Ses yeux brillent.* Je crois en vous. Plus que je n'ai jamais cru en quoi que ce soit.`, tone: 'paternel' }
        ]
      },
      {
        npcId: 'npc_grundar', npcName: 'Grundar',
        lines: [
          { trigger: 'Toast', text: `*Versant de la bière naine dans des gobelets.* Chez les nains, on boit avant la bataille. Pas pour le courage — pour se souvenir de pourquoi on se bat. *Il lève son gobelet.* Pour les bières qu'on n'a pas encore bues. Pour les mines qu'on n'a pas encore creusées. Et pour les amis qu'on ramènera vivants.`, tone: 'bourru-émouvant' }
        ]
      },
      {
        npcId: 'npc_faelorn', npcName: 'Faelorn',
        lines: [
          { trigger: 'Le talisman', text: `*Assis sous un arbre, finissant de tailler un petit pendentif de bois.* Du bois d'Yggvan. Le Premier Arbre. *Il le tend.* Si la forêt m'entend encore... elle vous protégera. *Pause.* Et si je tombe demain... dites à la forêt que je suis parti en paix.`, tone: 'serein-résigné' }
        ]
      }
    ],
    objectives: [
      { description: 'Parler aux alliés et PNJ importants', type: 'talk', optional: false },
      { description: 'Recevoir l\'Éclat de Lumière de Théodore', type: 'special', optional: false },
      { description: 'Moment personnel pour chaque joueur', type: 'social', optional: true }
    ],
    transitions: [
      { condition: 'Cortège vocal', nextScene: 'ch9_s6_depart', label: '→ L\'Aube de Fer' }
    ],
    loot: [
      'Éclat de Lumière Primordiale (sort niv.5, 1 utilisation)',
      'Talisman de Faelorn (bois d\'Yggvan, +1 JDS Sagesse)',
      'Lettre de Lysandra (objet de quête — livrable à sa mère)'
    ],
    estimatedMinutes: 20, mood: 'veillée-intime-émouvant',
    music: 'Veillée — luth solo, feux de camp, silence entre les notes', location: 'Sol-Aureus — Remparts et Camp militaire'
  },

  // ────────────────────────────────────────────
  // SCÈNE 6 — L'AUBE DE FER (Départ)
  // ────────────────────────────────────────────
  {
    id: 'ch9_s6_depart', chapterId: 'ch9', sceneNumber: 6,
    title: 'L\'Aube de Fer', type: 'transition',
    readAloud: `L'aube se lève sur Sol-Aureus. Le ciel est gris — pas de nuages, juste un voile de cendres qui vient du nord. Sombrelune projette son ombre même à cette distance.

Les portes de la ville s'ouvrent. Et l'armée d'Aethelgard sort.

D'abord les fantassins humains — trois mille hommes en rangées serrées, boucliers au soleil, pas cadencé. Puis les nains — cinq cents guerriers en armure lourde, haches brillantes, chantant un hymne de guerre en khuzdul. Puis les archers elfiques — en silence, leurs arcs de Silvaris sur l'épaule.

Au centre de la colonne, les joueurs marchent avec Lysandra, Grundar, et le Marteau de Thogrund. L'armée avance vers le nord.

Le Général Marcus, à cheval, lève son épée. "POUR AETHELGARD !"

Quatre mille voix répondent.

La marche vers Sombrelune a commencé.`,
    gmNotes: `SCÈNE DE TRANSITION — FIN DU CHAPITRE 9.

C'est un moment cinématique. Pas de mécanique — juste un texte à lire et un moment de gravité.

INFORMATIONS POUR LE MJ (à préparer pour Ch10) :
• L'armée met 5 jours pour atteindre Sombrelune
• Pendant la marche (Ch10), les joueurs feront face à des embuscades, des dilemmes moraux, et un dernier obstacle avant la Tour
• Le tunnel nain sera creusé en parallèle (les nains partent un jour avant)
• Si Durinn et Faelorn ne sont pas réconciliés, les elfes marchent séparément des nains → tension pendant Ch10

CE QUE LES JOUEURS ONT (récapitulatif d'inventaire de chapitre) :
✓ Le plan d'assaut (combinaison des 3 stratégies)
✓ Infos des espions capturés (0 à 5 bonus)
✓ Améliorations personnelles (forge/caserne/temple/bibliothèque)
✓ Éclat de Lumière Primordiale (1 utilisation)
✓ Talisman de Faelorn
✓ Marteau de Thogrund (si Ch5 réussi)
✓ Branche Vivante d'Yggvan (si Ch8)
✓ Bénédiction d'Yggvan

La difficulté de Ch10-12 dépend DIRECTEMENT des choix et réussites des Ch1-9. Le MJ devrait faire la liste de tous les avantages accumulés.`,
    dialogues: [],
    objectives: [
      { description: 'Quitter Sol-Aureus avec l\'armée d\'Aethelgard', type: 'special', optional: false },
      { description: 'FIN DU CHAPITRE 9 — La marche commence', type: 'special', optional: false }
    ],
    transitions: [
      { condition: 'FIN DU CHAPITRE 9', nextScene: 'ch10_s1_marche', label: '→ Ch.10 : La Marche vers Sombrelune' }
    ],
    estimatedMinutes: 5, mood: 'départ-épique-solennel',
    music: 'Marche militaire — tambours, cuivres, chant des peuples', location: 'Sol-Aureus → Route du Nord'
  }
];

// ============================================================================
// QUÊTES SECONDAIRES DU CHAPITRE 9
// ============================================================================

const CH9_SIDE_QUESTS: SideQuest[] = [
  {
    id: 'sq_ch9_soeur_edrik',
    title: 'La Sœur d\'Edrik',
    description: 'Si Edrik a été sauvé au Ch6, sa sœur Mira est retenue dans les Bas-Fonds de Sol-Aureus. Les espions capturés connaissent sa localisation.',
    giver: 'Edrik le Repenti',
    hookText: '"Ma sœur... les espions que vous avez arrêtés — l\'un d\'eux connaît la planque où elle est détenue ! S\'il vous plaît !"',
    objectives: [
      'Interroger les espions capturés pour trouver la planque (Intimidation DC 14)',
      'Se rendre dans les Bas-Fonds de Sol-Aureus',
      'Libérer Mira (2x Garde Cultiste CR 2, piège sur la porte DC 13)',
      'Ramener Mira à Edrik'
    ],
    reward: 'Mira et Edrik deviennent des alliés permanents. Edrik rejoint l\'armée comme éclaireur (bonus +1 aux jets de Survie en Ch10).',
    consequenceIfIgnored: 'Mira est transférée à Sombrelune et utilisée comme otage pendant Ch11.',
    estimatedMinutes: 20,
    difficulty: 'moyen',
    activeChapters: ['ch9']
  },
  {
    id: 'sq_ch9_forge_rune',
    title: 'La Rune de l\'Alliance',
    description: 'Grundar propose de graver une rune spéciale sur le Marteau de Thogrund — mais il a besoin d\'un cristal de feu elfique que possède Faelorn.',
    giver: 'Grundar',
    hookText: '"Le Marteau est fort, mais il peut être PLUS fort. Il me faut un cristal de feu elfique — l\'oreille-pointue en a un. Demandez-lui. Moi, il ne m\'écoute pas."',
    objectives: [
      'Convaincre Faelorn de donner le cristal (Persuasion DC 13 — facile si les factions sont réconciliées)',
      'Assister Grundar pendant la forge (3 heures, pas de jet nécessaire — RP)',
      'Activer la rune avec le nom d\'un joueur (le joueur donne son vrai nom à la rune — engagement)'
    ],
    reward: 'Marteau de Thogrund amélioré : +2d6 radiant contre créatures d\'ombre (au lieu de +1d6). La rune porte le nom du joueur.',
    estimatedMinutes: 15,
    difficulty: 'facile',
    activeChapters: ['ch9']
  }
];

// ============================================================================
// EXPORT
// ============================================================================

export const CHAPTER_9: NarrativeChapter = {
  id: 'ch9', number: 9, title: 'Le Conseil de Guerre',
  subtitle: 'L\'Alliance se forme, les espions sont chassés, et la marche commence',
  summary: `Retour triomphal à Sol-Aureus transformée en camp de guerre. Grand Conseil de Guerre avec trois stratégies (siège/tunnel/infiltration) à unifier. Conflits entre factions à résoudre. Chasse aux espions du Culte. Préparatifs personnels (forge/caserne/temple/bibliothèque). Veillée d'armes émotionnelle. Départ de l'armée vers Sombrelune.`,
  suggestedLevel: 10, region: 'Sol-Aureus',
  themes: ['Stratégie', 'Alliance', 'Espionnage', 'Préparatifs', 'Roleplay émotionnel', 'Choix lourds'],
  scenes: CH9_SCENES,
  chapterSideQuests: CH9_SIDE_QUESTS,
  previousChapter: 'ch8', nextChapter: 'ch10'
};
