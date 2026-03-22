/**
 * LORE — PNJ RÉCURRENTS D'AETHELGARD
 *
 * Fiches complètes pour le RP du MJ.
 * Apparence, personnalité, voix, motivation, secret, citations.
 */
import type { NPCDetail } from '../chapters/types';

export const LORE_NPCS: NPCDetail[] = [
  // ============================
  // SOL-AUREUS
  // ============================
  {
    id: 'npc_elara', name: 'Reine Elara Solaris III', race: 'Humaine', class: 'Noble / Guerrière (ancienne)', level: 10,
    alignment: 'Loyal Bon',
    appearance: 'Femme de 42 ans, cheveux auburn coiffés en chignon serré, yeux dorés (marque de la lignée Solaris). Porte une armure de cérémonie dorée même au Conseil — "une reine doit toujours être prête à se battre". Cicatrice fine sur la joue gauche (duel d\'honneur à 20 ans).',
    personality: 'Pragmatique, directe, protectrice féroce de son peuple. Ne supporte pas les courtisans hypocrites. Rit rarement mais sincèrement. Cache sa solitude derrière l\'autorité.',
    motivation: 'Protéger son peuple et reconstruire les alliances perdues. Secrètement, elle veut venger son mari.',
    secret: 'Elle sait que son mari a été empoisonné, pas par le Culte directement, mais par le Duc Verlan qui a engagé un assassin. Elle attend les preuves pour agir.',
    voiceTip: 'Voix ferme et posée. Parle peu mais chaque mot compte. Quand elle s\'adresse aux joueurs, elle les regarde dans les yeux. Tutoie les gens qu\'elle respecte.',
    locations: ['Palais de la Couronne d\'Or', 'Salle de stratégie', 'Jardins suspendus (le soir, seule)'],
    statBlock: 'Noble Guerrière (CR 8). AC 18 (armure de plate dorée). HP 85. Epée longue +8, 1d8+4. Bonus de commandement : alliés à 30ft gagnent +2 aux jets de sauvegarde.',
    relationships: [
      { npcId: 'npc_marcus', npcName: 'Général Marcus', nature: 'Bras droit, confiance totale. Ami d\'enfance de son mari.' },
      { npcId: 'npc_theodore', npcName: 'Théodore', nature: 'Respecte son savoir, frustrée qu\'il soit si pessimiste.' },
      { npcId: 'npc_alduin', npcName: 'Grand Prêtre Alduin', nature: 'Relation formelle mais cordiale. Il bénit ses troupes.' }
    ],
    quotes: [
      '"La diplomatie, c\'est la guerre sans le sang. Et parfois, c\'est plus dur."',
      '"Mon mari croyait en l\'alliance des peuples. Je refuse de laisser son rêve mourir."',
      '"Vous avez prouvé votre valeur. Pas par vos mots — par vos actes. C\'est la seule monnaie que j\'accepte."',
      '"Le Duc Verlan me rappelle un serpent que j\'ai écrasé dans les jardins quand j\'avais 12 ans. Attendez — le serpent était plus franc."'
    ]
  },
  {
    id: 'npc_theodore', name: 'Théodore l\'Archiviste', race: 'Humain', class: 'Magicien (Érudit)', level: 12,
    alignment: 'Neutre Bon',
    appearance: 'Vieil homme de 73 ans, cheveux blancs en désordre, barbe de trois jours perpétuelle. Lunettes sur le nez, toujours en train de lire. Robe bleue tachée d\'encre. Sent le parchemin et la cire à cacheter.',
    personality: 'Brillant, distrait, anxieux. Parle vite quand il est excité. Oublie de manger. A un chat noir nommé Encrier qui le suit partout. S\'inquiète trop — mais cette fois, il a RAISON.',
    motivation: 'Prouver que la menace des Sceaux est réelle et sauver le monde.',
    secret: 'Il est le dernier Sentinelle actif de Sol-Aureus. Il cache les archives de l\'Ordre dans un coffre bajo le plancher de son bureau.',
    voiceTip: 'Voix rapide, s\'emballe facilement. Ponctue ses phrases de "vous comprenez, vous comprenez ?" et de citations de livres. Quand il est stressé, il se frotte les mains.',
    locations: ['Académie Arcane (bureau au 3ème étage)', 'Bibliothèque', 'Taverne du Dragon Rouillé (le vendredi soir)'],
    statBlock: 'Archimage retraité (CR 9). AC 12 (robe enchanté). HP 55. Sorts de divination et d\'abjuration. Pas un combattant — mais peut lancer Mur de Force et Contre-sort.',
    relationships: [
      { npcId: 'npc_elara', npcName: 'Reine Elara', nature: 'La seule qui l\'écoute. Elle l\'a cru quand personne d\'autre ne l\'a fait.' },
      { npcId: 'npc_beren', npcName: 'Beren l\'Ermite', nature: 'Ancien camarade Sentinelle. Se voient rarement mais se font confiance.' }
    ],
    quotes: [
      '"J\'ai passé 40 ans à crier dans le désert. Merci de m\'écouter enfin."',
      '"Les Sceaux ne sont pas des métaphores. Ce sont des verrous. Et quelqu\'un a trouvé les clés."',
      '"Encrier ! Non, pas ce parchemin ! C\'est la carte du Sceau de la — bon, apporte-le ici, je suppose."',
      '"Vous savez ce qui est pire que la fin du monde ? La fin du monde que personne ne croit possible."'
    ]
  },
  {
    id: 'npc_marcus', name: 'Général Marcus Valeheart', race: 'Humain', class: 'Guerrier', level: 14,
    alignment: 'Loyal Neutre',
    appearance: 'Homme de 50 ans, carrure massive, cheveux poivre et sel coupés ras. Cicatrices sur les bras et les mains. Toujours en armure de demi-plate, même au repos. Regard dur mais pas cruel.',
    personality: 'Discipliné, loyal, pragmatique au point de paraître froid. Croit en la hiérarchie et l\'efficacité. Respecte la compétence plus que le rang.',
    motivation: 'Protéger Sol-Aureus. Venger silencieusement son ami (le roi défunt).',
    secret: 'Il sait que le Duc Verlan complote mais attend les ordres de la Reine. Cela le ronge — il voudrait agir.',
    voiceTip: 'Phrases courtes. Jamais de mot de trop. Tutoie les soldats, vouvoie les nobles. Quand il est en colère, sa voix baisse au lieu de monter.',
    locations: ['Caserne du Soleil Levant', 'Salle de stratégie du palais'],
    statBlock: 'Champion vétéran (CR 12). AC 20 (demi-plate +2). HP 130. 3 attaques/round, épée bâtarde +11, 1d10+7.',
    relationships: [
      { npcId: 'npc_elara', npcName: 'Reine Elara', nature: 'Loyauté absolue. Ami d\'enfance de son mari. La protégerait de sa vie.' },
      { npcId: 'npc_brunhild', npcName: 'Capitaine Brunhild', nature: 'Respect mutuel. Se sont affrontés lors d\'un tournoi inter-peuples (match nul).' }
    ],
    quotes: [
      '"Briefing en 3 mots : objectif, menace, plan."',
      '"Un bon soldat obéit. Un bon général questionne. Un bon roi écoute."',
      '"Je ne vous fais pas confiance. Encore. Prouvez-moi que j\'ai tort."',
      '"*silence prolongé, puis* Vous avez bien agi. C\'est tout ce que j\'avais à dire."'
    ]
  },
  {
    id: 'npc_brok', name: 'Brok le Tavernier', race: 'Demi-Orc', class: 'Roublard (ancien)', level: 6,
    alignment: 'Chaotique Bon',
    appearance: 'Demi-orc de 45 ans, large comme une armoire, peau gris-vert, un seul croc qui dépasse. Tablier perpétuellement taché. Bras tatoués de motifs marins. Oreille gauche coupée.',
    personality: 'Jovial, bavard, protecteur des faibles. Cache un passé violent sous des blagues. Connaît TOUS les ragots de Sol-Aureus. Mauvais cuisinier mais bon barman.',
    motivation: 'Tenir sa taverne en paix et aider les gens dans le besoin. Il a juré de ne plus jamais blesser quelqu\'un.',
    secret: 'Ancien pirate. A tué un homme pour se sauver il y a 20 ans. Cauchemars récurrents. Si quelqu\'un le reconnaît, sa vie tranquille est finie.',
    voiceTip: 'Voix rauque et chaleureuse. Accent portuaire. Dit "mon gars / ma fille" à tout le monde. Rit fort. Quand il est sérieux, son regard devient glacial.',
    locations: ['Le Dragon Rouillé (taverne du port)'],
    relationships: [
      { npcId: 'npc_theodore', npcName: 'Théodore', nature: 'Le vieux vient boire le vendredi. Brok le ramène quand il a trop bu.' }
    ],
    quotes: [
      '"Le spécial du jour, c\'est ragoût de sanglier. Le ragoût de hier aussi, d\'ailleurs."',
      '"Un conseil gratuit : dans cette ville, les murs ont des oreilles et les oreilles ont des propriétaires."',
      '"*essuie un verre en fixant un client louche* Tu vois ce gars ? Guilde des Marchands. Il vient ici pour écouter, pas pour boire."',
      '"J\'ai été... un autre homme, avant. Maintenant je sers de la bière et c\'est très bien comme ça."'
    ]
  },

  // ============================
  // HAMMERDEEP
  // ============================
  {
    id: 'npc_durinn', name: 'Thane Durinn Marteau-Profond', race: 'Nain', class: 'Guerrier / Seigneur', level: 16,
    alignment: 'Loyal Neutre',
    appearance: 'Nain de 180 ans (vieux), barbe blanche tressée jusqu\'aux genoux avec des anneaux de mithril. Yeux bleu pâle — regard fatigué mais perçant. Mains calleuses de forgeron. Couronne de fer forgé sur le front.',
    personality: 'Sage, prudent, las du monde. A vu trop de guerres pour vouloir en commencer une nouvelle. Honore la tradition au-dessus de tout. Aime les chansons naines anciennes.',
    motivation: 'Mourir en sachant que Hammerdeep sera en sécurité. Protéger le secret des Anciennes Mines.',
    secret: 'Il sait ce qui est scellé dans les Anciennes Mines (un fragment du Plan Ombre) mais n\'en a parlé à personne — pas même à son fils.',
    voiceTip: 'Voix profonde et lente. Longues pauses entre les phrases. Parle en paraboles. Quand il est en colère, frappe la table du poing — le sol tremble.',
    locations: ['Salle du Thane (Hammerdeep, niveau 14)'],
    relationships: [
      { npcId: 'npc_borin', npcName: 'Borin', nature: 'Aime son fils mais le trouve imprudent. Conflit de génération.' },
      { npcId: 'npc_korgan', npcName: 'Korgan', nature: 'Le seul à qui il confie ses doutes. Vieux amis.' }
    ],
    quotes: [
      '"Les montagnes endurent. Nous aussi."',
      '"Mon père m\'a dit : \'Écoute la pierre avant de frapper.\' J\'ai mis 100 ans à comprendre."',
      '"Vous voulez l\'aide des nains ? Prouvez que vous méritez notre confiance. Pas avec des mots — avec de la sueur."',
      '"La dernière guerre m\'a coûté un œil, trois amis, et ma foi en l\'humanité. Convainquez-moi de la retrouver."'
    ]
  },
  {
    id: 'npc_borin', name: 'Borin fils du Thane', race: 'Nain', class: 'Guerrier / Diplomate', level: 8,
    alignment: 'Chaotique Bon',
    appearance: 'Nain de 60 ans (jeune adulte), barbe rousse courte (audacieux pour un nain), armure de mithril personnalisée, hache de guerre sur le dos. Yeux verts vifs, sourire facile.',
    personality: 'Fougueux, optimiste, curieux du monde extérieur. Veut moderniser Hammerdeep. Respecte les joueurs parce qu\'ils "font des trucs" au lieu de "parler de faire des trucs".',
    motivation: 'Prouver à son père que l\'ouverture sur le monde n\'est pas une faiblesse.',
    secret: 'Il est secrètement amoureux de Lysandra (l\'elfe de liaison). Il sait que c\'est politiquement impossible.',
    voiceTip: 'Voix forte et enthousiaste. Parle avec les mains. Jure en nain ("Par le marteau de Thogrund !"). Offre de la bière à tout le monde.',
    locations: ['Hammerdeep — partout, mais surtout la Taverne du Mithril Fondu'],
    relationships: [
      { npcId: 'npc_durinn', npcName: 'Thane Durinn', nature: 'Aime son père mais le trouve trop conservateur.' },
      { npcId: 'npc_lysandra', npcName: 'Lysandra', nature: 'Attirance secrète. Tension romantique non résolue.' }
    ],
    quotes: [
      '"Par le marteau de Thogrund ! Vous avez vraiment fait ça ? Racontez !"',
      '"Mon père dit \'la pierre endure\'. Moi je dis \'la pierre qui ne bouge pas est juste un caillou\'."',
      '"Buvons ! Je vous raconte comment j\'ai battu trois trolls à mains nues. Bon, c\'était UN troll. Et j\'avais une hache."',
      '"Les humains, les elfes — ce sont des gens. On est tous coincés sur le même caillou dans le vide. Autant s\'entraider."'
    ]
  },
  {
    id: 'npc_korgan', name: 'Maître Forgeron Korgan', race: 'Nain', class: 'Clerc de Moradin / Artificier', level: 13,
    alignment: 'Neutre Bon',
    appearance: 'Nain de 150 ans, barbe noire striée de gris, mains massives couvertes de brûlures. Porte un tablier de cuir de dragon par-dessus une robe de prêtre. Marteau sacré à la ceinture.',
    personality: 'Calme, réfléchi, spirituel. Considère la forge comme une forme de prière. Parle doucement mais fermement. Enseigne avec patience.',
    motivation: 'Servir Moradin et transmettre l\'art de la forge. Protéger le Sceau de la Montagne.',
    voiceTip: 'Voix douce pour un nain. Cadence lente. Métaphores liées au métal et au feu. Ferme les yeux quand il réfléchit.',
    locations: ['Académie des Forges (Hammerdeep, niveaux 16-18)', 'Temple de Moradin'],
    statBlock: 'Clerc-Forgeron (CR 10). AC 18 (armure de mithril). HP 95. Sorts de Moradin (Forge, Protection, Guérison). Peut enchanter des armes (+1/+2).',
    quotes: [
      '"Le mithril ne ment pas. Si l\'épée se brise, c\'est que la volonté du forgeron a fléchi."',
      '"Moradin nous enseigne que la perfection n\'existe pas. Mais ça ne veut pas dire qu\'on arrête d\'essayer."'
    ]
  },

  // ============================
  // SYLVE D'ÉMERAUDE
  // ============================
  {
    id: 'npc_thalion', name: 'Haut Seigneur Thalion', race: 'Elfe', class: 'Lame-Chanteuse / Noble', level: 15,
    alignment: 'Loyal Neutre (corrompu vers Loyal Mauvais par le poison)',
    appearance: 'Elfe de 600 ans, grand (1m95), cheveux argentés jusqu\'à la taille. Yeux violets (NOTE : teinte plus sombre qu\'avant l\'empoisonnement). Cicatrice sur le bras gauche (Guerre de l\'Ombre). Armure de feuilles enchantées.',
    personality: 'AVANT POISON : Fier mais juste, protecteur, diplomate réticent mais capable. APRÈS POISON : Paranoïaque, amer, isolationniste, irascible. Les joueurs voient la version empoisonnée.',
    motivation: 'Protéger la Sylve à tout prix. Le poison amplifie cela en "isoler la Sylve du monde entier".',
    secret: 'Il est empoisonné par Syrana. Des périodes de lucidité le font douter de ses propres décisions, mais le poison supprime ces doutes.',
    voiceTip: 'Voix mélodieuse mais froide. Parle lentement, comme s\'il pesait chaque syllabe. Utilise le "nous" royal. Quand il est lucide (rare), sa voix se brise un peu.',
    locations: ['Émerilion — salle du Conseil des Anciens'],
    relationships: [
      { npcId: 'npc_aethel', npcName: 'Dame Aethel', nature: 'Ancien respect, maintenant méfiance (le poison le fait voir Aethel comme une traîtresse).' },
      { npcId: 'npc_syrana_spy', npcName: 'Syrana', nature: 'Fait confiance à son empoisonneuse — la voit comme sa plus fidèle conseillère.' }
    ],
    quotes: [
      '"Les racines de la Sylve étaient ici bien avant vos cités de pierre. Elles seront là bien après."',
      '"Nous avons aidé les peuples courts une fois. Ils ont oublié en une génération. Nous n\'oublierons pas."',
      '"*moment de lucidité* Je... il y a quelque chose qui ne va pas. Ma tête... non. Non, tout va bien. Partez."'
    ]
  },
  {
    id: 'npc_aethel', name: 'Dame Aethel', race: 'Elfe', class: 'Diplomate / Enchanteresse', level: 11,
    alignment: 'Neutre Bon',
    appearance: 'Elfe de 400 ans, cheveux cuivrés, yeux verts. Porte des robes de diplomate elfique (soie et fils d\'or). Sourire chaleureux, gestes gracieux. Bijou discret au cou — le symbole progressiste.',
    personality: 'Intelligente, empathique, courageuse. Sait naviguer la politique avec finesse. Prend des risques calculés. Croit sincèrement en l\'alliance des peuples.',
    motivation: 'Sauver les elfes d\'eux-mêmes en rétablissant les liens avec le monde extérieur.',
    secret: 'Elle suspecte que Thalion est influencé par quelque chose de surnaturel mais n\'a pas encore la preuve.',
    voiceTip: 'Voix douce et mélodieuse. Parle avec une chaleur sincère. Utilise des proverbes elfiques. Rit facilement — rare chez les elfes.',
    locations: ['Émerilion — ses appartements, le jardin de méditation'],
    relationships: [
      { npcId: 'npc_thalion', npcName: 'Thalion', nature: 'Ancienne amitié, maintenant opposition politique. Elle veut le sauver, pas le renverser.' },
      { npcId: 'npc_lysandra', npcName: 'Lysandra', nature: 'Mentor et protectrice. Lysandra est son ancienne élève.' }
    ],
    quotes: [
      '"Le monde a changé depuis la Guerre. Si nous ne changeons pas avec lui, nous mourrons avec l\'ancien monde."',
      '"Je ne vous demande pas de comprendre les elfes. Je vous demande de nous donner une chance."',
      '"*chuchote* Thalion n\'est plus lui-même. Aidez-moi à le prouver — avant qu\'il ne soit trop tard."'
    ]
  },
  {
    id: 'npc_lysandra', name: 'Lysandra', race: 'Elfe', class: 'Rôdeuse / Diplomate', level: 7,
    alignment: 'Chaotique Bon',
    appearance: 'Jeune elfe (120 ans), cheveux noirs courts (inhabituels pour une elfe), arc sur le dos, tenue de voyage pratique. Yeux gris — regard vif et curieux.',
    personality: 'Curieuse, indépendante, légèrement rebelle par rapport à la culture elfique. S\'intéresse aux autres peuples. A l\'humour sec.',
    motivation: 'Servir de pont entre les elfes et le monde. Prouver que l\'ouverture n\'est pas une trahison.',
    secret: 'Attirée par Borin le nain. Sait que c\'est scandaleux dans sa culture. S\'en fiche un peu.',
    voiceTip: 'Voix claire et directe — pas le ton mélodieux habituel des elfes. Parle vite. Emploie parfois des expressions humaines qui choquent les elfes traditionalistes.',
    locations: ['Variable — elle voyage entre la Sylve et Sol-Aureus comme émissaire'],
    relationships: [
      { npcId: 'npc_aethel', npcName: 'Dame Aethel', nature: 'Sa mentor. L\'admire profondément.' },
      { npcId: 'npc_borin', npcName: 'Borin', nature: 'Tension romantique. Ils se chamaillent beaucoup — signe certain.' }
    ],
    quotes: [
      '"Oui, je suis une elfe avec les cheveux courts. Oui, j\'ai mangé du ragoût nain. Non, je ne suis pas une hérétique."',
      '"Les traditions, c\'est bien. Les traditions qui empêchent de sauver le monde, c\'est pas bien."',
      '"*à Borin* Tu sens le mithril en fusion et la bière. C\'est... pas désagréable."'
    ]
  },

  // ============================
  // ANTAGONISTES
  // ============================
  {
    id: 'npc_malachi', name: 'Malachi', race: 'Humain', class: 'Nécromancien', level: 17,
    alignment: 'Neutre Mauvais',
    appearance: 'Homme de 35 ans, pâle comme la mort, yeux noirs comme le vide. Cheveux noirs lisses, tirés en arrière. Cicatrice en forme de miroir brisé sur le front (auto-infligée). Robe noire aux broderies d\'argent. Mains gantées en permanence.',
    personality: 'Calme, intellectuel, charismatique. Parle comme un professeur. Sincèrement convaincu qu\'il fait le bon choix. Ce n\'est pas un sadique — c\'est un idéaliste tordu.',
    motivation: 'Ouvrir le Miroir de l\'Ombre et négocier avec Ombréus pour l\'immortalité.',
    secret: 'Au fond, il a peur de mourir. Toute sa quête est motivée par une terreur existentielle qu\'il refuse de reconnaître.',
    voiceTip: 'Voix douce et mesurée. Jamais en colère. Traite les joueurs avec un respect curieux — il les considère comme des adversaires dignes. Dit "mes chers amis" même en combat.',
    locations: ['Mont Sombrelune — Salle du Miroir (Ch11)'],
    statBlock: 'Archimage Nécromancien (CR 15). AC 16 (Armure de Mage + Bouclier). HP 120. Sorts : Doigt de Mort, Animation des Morts, Cercle de Mort, Mur de Force, Contre-sort, Mot de Pouvoir Étourdissant.',
    relationships: [
      { npcId: 'npc_voss', npcName: 'Voss', nature: 'Serviteur dévoué. Malachi le considère comme un outil utile.' },
      { npcId: 'npc_syrana_spy', npcName: 'Syrana', nature: 'Sa meilleure agente. L\'un des rares qu\'il respecte intellectuellement.' }
    ],
    quotes: [
      '"Mon ancêtre a scellé Ombréus par peur. Moi, je choisis de lui parler. La peur n\'est pas une stratégie."',
      '"Vous croyez me combattre — mais nous voulons la même chose. La survie. J\'ai simplement un plan plus audacieux."',
      '"Le sacrifice des Sept Héros était noble. Et futile. Les Sceaux cedent. C\'est une question de QUAND, pas de SI."',
      '"Mes chers amis... comme c\'est triste de devoir vous tuer."'
    ]
  },
  {
    id: 'npc_syrana_spy', name: 'Syrana l\'Infiltratrice', race: 'Elfe', class: 'Assassin / Enchanteur', level: 12,
    alignment: 'Neutre Mauvais',
    appearance: 'Elfe de 300 ans, cheveux argentés (délavés artificiellement — ses vrais cheveux sont noirs), yeux bleu glacé, sourire perpétuel. S\'habille en conseillère elfique. Porte toujours un éventail qui cache ses lèvres quand elle ment.',
    personality: 'Manipulatrice, patiente, intelligente. Joue PARFAITEMENT son rôle de loyaliste elfique. Aime le jeu — la tromperie est un art pour elle.',
    motivation: 'Pouvoir. Malachi lui a promis de la faire reine de la Sylve quand le "nouveau monde" émergera.',
    secret: 'Elle empoisonne Thalion avec une toxine d\'ombre mélangée à son thé quotidien. L\'antidote nécessite de l\'eau bénite par la Mère-Lune et un cristal de mithril.',
    voiceTip: 'Voix mielleuse et aristocratique. Utilise des compliments pour désarmer. Quand elle est démasquée, sa voix devient tranchante comme un couteau.',
    locations: ['Émerilion — proche de Thalion en permanence'],
    quotes: [
      '"Oh, des visiteurs des territoires humains ? Comme c\'est... charmant."',
      '"Le Haut Seigneur Thalion a raison de se méfier du monde extérieur. L\'histoire nous enseigne la prudence."',
      '"*démasquée* Vous avez mis du temps. J\'ai failli m\'ennuyer."'
    ]
  },
  {
    id: 'npc_gorvan', name: 'Gorvan le Seigneur de Guerre', race: 'Humain', class: 'Guerrier / Nécromancien mineur', level: 11,
    alignment: 'Chaotique Mauvais',
    appearance: 'Homme massif de 40 ans, chauve, barbe de bouc taillée en pointe. Armure noire cabossée. Hache de guerre à deux mains dont la lame suinte une substance noire (nécromantique).',
    personality: 'Brutal, pragmatique, pas idiot. Ancien capitaine mercenaire, il a rejoint le Culte pour le pouvoir. Il ne croit pas au "discours philosophique" de Malachi — il veut un empire.',
    motivation: 'Pouvoir militaire et territorial. Le Culte est un moyen, pas une fin.',
    voiceTip: 'Voix rauque de fumeur. Parle en ordres courts. Rit quand il a l\'avantage. Respecte la force brute.',
    locations: ['Ruines d\'Ashka (Ch6)'],
    statBlock: 'Seigneur de Guerre (CR 10). AC 19 (armure lourde enchanté). HP 110. Hache +10, 2d12+6 + 1d6 nécrotique.',
    quotes: [
      '"Malachi parle trop. Moi, je prends."',
      '"Le Sceau est brisé. Le lac est à moi. Votre move."',
      '"J\'ai pas besoin de magie pour vous tuer. Mais ça aide."'
    ]
  },
  {
    id: 'npc_voss', name: 'Voss le Nécromancien', race: 'Humain', class: 'Nécromancien', level: 9,
    alignment: 'Neutre Mauvais',
    appearance: 'Homme maigre de 50 ans, peau grise, yeux injectés de sang. Robe de prêtre corrompu. Mains tachées de noir (nécrose).',
    personality: 'Fanatique, exalté, prêt à mourir pour le Maître. Zélote sans doute ni remords.',
    motivation: 'Servir Malachi et mériter l\'immortalité promise.',
    voiceTip: 'Voix sifflante, nasale. Rire hystérique quand il est nerveux. Prie à voix haute en combat.',
    locations: ['Forêt de Murmures (Ch2) — au Sanctuaire du Sceau, mort ou capturé'],
    statBlock: 'Nécromancien (CR 7). AC 13. HP 65. Rayon d\'Affaiblissement, Animation des Morts (8 zombies max), Flétrissement.',
    quotes: [
      '"Le Miroir va chanter ! Et nous danserons dans la lumière de l\'Ombre !"',
      '"Vous ne comprenez pas ! Le Maître ne veut pas détruire — il veut TRANSFORMER !"',
      '"*agonisant* Dites au Maître... que Voss a été fidèle..."'
    ]
  },
  {
    id: 'npc_alorn', name: 'Alorn le Traître', race: 'Humain', class: 'Guerrier / Espion', level: 9,
    alignment: 'Neutre Mauvais',
    appearance: 'Homme de 35 ans, beau, cheveux blonds, sourire avenant. Armure de la Garde Royale. Rien ne le distingue d\'un officier loyal. C\'est tout le problème.',
    personality: 'Charmant, compétent, patient. Joue le rôle du soldat idéal depuis 3 ans. S\'est fait aimer de tous.',
    motivation: 'Survie. Malachi le tient par un chantage — la famille d\'Alorn est prisonnière du Culte.',
    secret: 'Il ne veut PAS trahir l\'Alliance mais n\'a pas le choix. Si les joueurs découvrent son secret ET libèrent sa famille, il se retourne contre le Culte.',
    voiceTip: 'Voix de soldat loyal — enthousiaste, respectueuse. Quand il trahit, sa voix tremble. Si les joueurs l\'ont aidé, il pleure.',
    locations: ['Variable — voyage avec l\'armée de l\'Alliance (Ch10)'],
    quotes: [
      '"Oui, sir ! Prêt à servir, comme toujours."',
      '"*trahison révélée* Je... je suis désolé. Ma famille... il les a... je n\'avais pas le choix."',
      '"*si sauvé* Je vous dois tout. Ma lame est à vous. Jusqu\'à la fin."'
    ]
  },

  // ============================
  // SECONDAIRES IMPORTANTS
  // ============================
  {
    id: 'npc_beren', name: 'Beren l\'Ermite', race: 'Humain', class: 'Druide', level: 10,
    alignment: 'Neutre Bon',
    appearance: 'Humain de 65 ans, barbe broussailleuse, vêtements de peau et de feuilles. Vit dans un tronc creux de la Forêt de Murmures. Sent les herbes et la terre humide.',
    personality: 'Calme, cryptique, parle aux animaux plus volontiers qu\'aux gens. Bienveillant mais distant.',
    motivation: 'Protéger la forêt et surveiller le Sceau. Ancien Sentinelle — le seul avec Théodore à être encore en activité.',
    voiceTip: 'Parle peu. Phrases courtes et imagées. Sourit aux animaux, pas aux gens. Tousse souvent (son âge le rattrape).',
    locations: ['Forêt de Murmures — Source de Clarté'],
    quotes: [
      '"La forêt souffre. Vous le sentez ?"',
      '"Théodore m\'a envoyé un message. Ses craintes étaient justifiées."',
      '"*caresse un loup* Lui, au moins, il dit la vérité."'
    ]
  },
  {
    id: 'npc_alduin', name: 'Grand Prêtre Alduin', race: 'Humain', class: 'Clerc de Solarius', level: 12,
    alignment: 'Loyal Bon',
    appearance: 'Homme de 60 ans, rasé de près, yeux dorés (don de Solarius). Robe blanche et or. Mains toujours jointes. Aura de calme.',
    personality: 'Pieux, bienveillant, inflexible sur la doctrine. Aide les joueurs par foi — Solarius lui a envoyé des visions.',
    motivation: 'Servir Solarius et protéger le Sceau de la Lumière sous le temple.',
    voiceTip: 'Voix grave et musicale. Parle comme s\'il priait. Cite les Écritures de Solarius. Bénit les gens sans qu\'on le demande.',
    locations: ['Temple de Solarius, Sol-Aureus'],
    quotes: [
      '"Solarius éclaire le chemin. Même dans l\'ombre, sa lumière demeure."',
      '"*bénit les joueurs* Que la Première Lueur guide vos lames et vos cœurs."',
      '"Le Sceau de la Lumière est ma charge. Tant que je respire, il tiendra."'
    ]
  },
  {
    id: 'npc_faelorn', name: 'Archidruide Faelorn', race: 'Elfe', class: 'Druide', level: 14,
    alignment: 'Neutre Bon',
    appearance: 'Elfe de 500 ans, peau brune marquée de lignes vertes (tatouages de sève). Cheveux en dreadlocks entremêlés de feuilles vivantes. Pieds nus en permanence. Yeux verts luminescents.',
    personality: 'Mystique, patient, parle en métaphores végétales. Considère le temps différemment — pour lui, 10 ans c\'est "un instant".',
    motivation: 'Écouter Yggvan et protéger le cycle naturel. Inquiet car Yggvan "crie" — ce qui n\'est jamais arrivé.',
    voiceTip: 'Voix chantante, lente. Longues pauses. Ferme les yeux souvent — "il écoute les racines". Parle du monde comme d\'un organisme vivant.',
    locations: ['Arbre-Monde Yggvan — Temple de la Sève'],
    quotes: [
      '"Yggvan pleure. Ses racines tremblent. Le monde est malade, et les arbres le savent avant nous."',
      '"Vous êtes comme de jeunes pousses — fragiles, mais le potentiel... le potentiel est immense."',
      '"*mains sur l\'écorce* Écoutez. Posez vos mains. Là. Vous l\'entendez ?"'
    ]
  }
];
