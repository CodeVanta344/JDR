/**
 * MINI-DONJONS OPTIONNELS - ACTE 2
 * 4 mini-donjons de 3-6 salles pour l'Acte 2 de la campagne Aethelgard
 */

import type { BookChapter } from './gm-book-data';

// ============================================================================
// 5. LA VEINE MAUDITE (4 salles)
// ============================================================================

const VEINE_MAUDITE: BookChapter = {
  id: 'dungeon-veine-maudite',
  actNumber: 2,
  chapterNumber: 201,
  title: 'La Veine Maudite',
  subtitle: 'Les profondeurs corrompues de Cœur-de-Fer',
  summary: 'Une mine abandonnée près de Cœur-de-Fer recèle une veine de mithral corrompue par la Fracture. Un Golem de Mithral, autrefois gardien, est devenu fou et protège le filon avec une férocité mécanique. Les mineurs ont besoin d\'aide pour rouvrir les galeries.',
  levelRange: '3-5',
  themes: ['mine', 'corruption', 'nains', 'technologie ancienne'],
  chapterIntro: {
    text: 'Le contremaître nain Durgan Marteau-Lourd vous accueille à l\'entrée de la mine avec un visage sombre. « On a percé une nouvelle veine la semaine dernière. Du mithral, le vrai — pas du toc. Mais quelque chose s\'est éveillé en bas. Trois de mes gars sont pas revenus. Ceux qui ont fui parlent d\'un gardien de métal, de cristaux qui chantent, et d\'un lac qui brille dans le noir. »',
    mood: 'inquiétude industrielle',
    music: 'ambiance-mine'
  },
  chapterConclusion: {
    text: 'Le Golem s\'effondre dans un fracas de métal tordu, et les cristaux toxiques cessent leur bourdonnement. La veine de mithral est libre — bien que corrompue, les nains de Cœur-de-Fer sauront la purifier avec le temps. Durgan vous offre une poignée de main qui manque de vous briser les doigts et une récompense bien méritée.',
    mood: 'satisfaction',
    music: 'theme-nains'
  },
  rewards: { xp: 350, gold: '80 po', items: ['Lingot de Mithral Purifié (composant pour armure +1)', 'Pic de Mineur Enchanté (+1, avantage pour miner)', 'Cristal Harmonique (focus arcanique, +1 DD des sorts)'] },
  scenes: [
    {
      id: 'veine-entree-effondree',
      sceneNumber: 1,
      title: 'L\'Entrée Effondrée',
      type: 'exploration',
      location: 'Entrée de la mine abandonnée',
      locationId: 'mine-veine-entree',
      estimatedMinutes: 15,
      readAloud: {
        text: 'L\'entrée de la mine est à moitié ensevelie sous un éboulement récent. Des étais de bois brisés pointent hors des gravats comme des os fracturés. L\'air qui s\'échappe du passage restant porte une odeur métallique acide et un bourdonnement grave, presque subliminal, qui fait vibrer vos dents.\n\nLe passage praticable est étroit — à peine assez large pour une personne à la fois. Des rails de wagon rouillés disparaissent dans l\'obscurité, et un chariot renversé bloque partiellement le chemin. Sur ses parois, des traces de griffes métalliques ont rayé la roche.\n\nÀ quelques mètres dans le tunnel, la lampe d\'un mineur est abandonnée au sol, encore tiède. Des traces de pas désordonnés — une fuite précipitée — mènent vers l\'extérieur. D\'autres traces, régulières et lourdes, enfoncées dans la roche, mènent vers les profondeurs.',
        mood: 'industriel-angoissant',
        music: 'ambiance-mine-profonde'
      },
      gmNotes: [
        { type: 'info', text: 'Le passage fait 1,2m de large sur 50m. Les traces lourdes sont celles du Golem. L\'éboulement est récent (2 jours) et a été provoqué par le Golem pour isoler la mine.' },
        { type: 'warning', text: 'Le passage est instable : un test d\'Athlétisme DD 12 est nécessaire pour déplacer certains gravats. Un échec critique (1 naturel) provoque un éboulement mineur (2d6 contondants, Dex DD 14 moitié).' },
        { type: 'secret', text: 'Sous le chariot renversé, le corps d\'un mineur nain est écrasé. Il porte une carte des galeries et une note : « La veine chante. Le gardien s\'est réveillé. Il ne nous reconnaît plus. »' },
        { type: 'tip', text: 'Un nain ou quelqu\'un avec des outils de mineur peut stabiliser le passage (DD 14) pour que le groupe passe en sécurité.' }
      ],
      skillChecks: [
        { skill: 'Athlétisme', dc: 12, success: 'Vous dégagez les gravats et sécurisez le passage pour le groupe.', failure: 'Les gravats sont plus lourds que prévu. Vous vous épuisez et devez recommencer.' },
        { skill: 'Investigation', dc: 13, success: 'Vous trouvez le corps du mineur avec la carte des galeries et la note inquiétante.', failure: 'Le chariot semble simplement renversé par l\'éboulement.' },
        { skill: 'Perception', dc: 14, success: 'Le bourdonnement provient des profondeurs — il suit un rythme régulier, comme un battement de cœur. Quelque chose de gros pulse en contrebas.', failure: 'Le bourdonnement est constant et désorientant.' }
      ],
      choices: [
        {
          id: 'choix-entree-mine',
          prompt: 'Le passage est dégagé. Comment procédez-vous ?',
          options: [
            {
              label: 'Suivre les rails',
              description: 'Longer les rails de wagon vers les galeries principales.',
              consequence: 'Les rails mènent directement à la galerie de cristaux toxiques.',
              nextScene: 'veine-cristaux-toxiques'
            },
            {
              label: 'Prendre un passage latéral',
              description: 'Utiliser la carte du mineur pour trouver un chemin alternatif.',
              consequence: 'Un passage de service contourne la galerie principale — plus sûr mais plus long.',
              nextScene: 'veine-cristaux-toxiques',
              skillCheck: { skill: 'Survie', dc: 13, success: 'Le raccourci vous mène au-delà de la zone la plus toxique, évitant les dégâts de poison.', failure: 'Vous vous perdez et aboutissez quand même dans la zone toxique.' }
            }
          ]
        }
      ],
      loot: ['Carte des galeries', 'Lampe de mineur', '12 po sur le corps du mineur'],
      nextScenes: ['veine-cristaux-toxiques'],
      previousScene: undefined
    },
    {
      id: 'veine-cristaux-toxiques',
      sceneNumber: 2,
      title: 'La Galerie des Cristaux Toxiques',
      type: 'exploration',
      location: 'Galerie de cristaux corrompus',
      locationId: 'mine-cristaux',
      estimatedMinutes: 20,
      readAloud: {
        text: 'La galerie s\'ouvre sur un spectacle aussi beau que terrifiant. Des cristaux de mithral corrompus tapissent les murs, le plafond et le sol, émettant une lueur violette pulsante. Leur beauté est hypnotique — des arêtes parfaites reflétant la lumière en motifs kaléidoscopiques. Mais l\'air autour d\'eux est chargé de particules brillantes qui irritent la gorge et brûlent les yeux.\n\nLe bourdonnement est assourdissant ici. Chaque cristal vibre à sa propre fréquence, créant une cacophonie harmonique qui vous donne le vertige. Le sol entre les formations cristallines est couvert d\'une poussière scintillante — résidu toxique de la corruption.\n\nDeux mineurs nains sont pétrifiés au milieu de la galerie, figés dans une expression de terreur. Leur peau a pris une teinte grisâtre et des cristaux minuscules commencent à pousser sur leurs bras et leurs visages.',
        mood: 'surnaturel-toxique',
        music: 'ambiance-cristaux'
      },
      gmNotes: [
        { type: 'info', text: 'La poussière cristalline est toxique : chaque round passé sans protection impose un jet de Con DD 12. Échec : 1d4 poison et désavantage à la Perception. 3 échecs consécutifs : pétrification lente (1 heure pour se solidifier, restauration mineure pour soigner).' },
        { type: 'tip', text: 'Un tissu mouillé sur le visage donne avantage au jet de Con. Un sort de Protection contre le Poison immunise complètement. Les nains pétrifiés peuvent être sauvés avec Restauration Mineure ou en détruisant le cristal-source (le plus gros, au centre).' },
        { type: 'warning', text: 'Briser les cristaux libère un nuage toxique concentré dans un rayon de 3m (DD Con 14, 2d6 poison). Il faut cibler le cristal-source spécifiquement.' },
        { type: 'secret', text: 'Le cristal-source est un fragment de mithral pur corrompu par la Fracture. Si purifié (par un prêtre ou un sort de niveau 3+), il devient un Cristal Harmonique de grande valeur.' }
      ],
      skillChecks: [
        { skill: 'Arcanes', dc: 14, success: 'La corruption provient d\'un cristal-source central. Le détruire ou le purifier arrêtera la toxicité de toute la galerie.', failure: 'La magie ici est chaotique et impossible à analyser.' },
        { skill: 'Médecine', dc: 13, success: 'Les mineurs pétrifiés sont encore vivants ! Le processus est lent — ils peuvent être sauvés si le cristal-source est neutralisé dans l\'heure.', failure: 'Ils semblent morts — mais sont-ils seulement pétrifiés ?' },
        { skill: 'Nature', dc: 12, success: 'Un tissu mouillé filtrera les particules toxiques. L\'eau neutralise le poison cristallin au contact.', failure: 'Vous ne trouvez pas de protection évidente contre la poussière.' }
      ],
      choices: [
        {
          id: 'choix-cristaux',
          prompt: 'Comment traversez-vous la galerie ?',
          options: [
            {
              label: 'Détruire le cristal-source',
              description: 'Cibler le plus gros cristal pour neutraliser la toxicité.',
              consequence: 'Le cristal explose en libérant un nuage toxique concentré (DD Con 14, 2d6 poison), mais la galerie se purifie ensuite.',
              skillCheck: { skill: 'Athlétisme', dc: 14, success: 'Vous brisez le cristal d\'un coup puissant et reculez à temps pour éviter le nuage.', failure: 'Le cristal se brise mais le nuage vous enveloppe.' }
            },
            {
              label: 'Purifier le cristal',
              description: 'Utiliser la magie divine ou arcanique pour purifier la corruption.',
              consequence: 'Le cristal se purifie en douceur, sans explosion. Les mineurs commencent à reprendre leurs couleurs.',
              skillCheck: { skill: 'Religion', dc: 15, success: 'Votre prière purifie le cristal qui devient un Cristal Harmonique pur et précieux.', failure: 'La corruption résiste. Il faudra un sort plus puissant ou une autre approche.' }
            },
            {
              label: 'Traverser rapidement',
              description: 'Foncer à travers la galerie en retenant votre souffle.',
              consequence: 'Chaque personnage fait 2 jets de Con DD 12. Rapide mais risqué.',
              nextScene: 'veine-lac-souterrain'
            }
          ]
        }
      ],
      loot: ['Cristal Harmonique (si purifié)', 'Éclats de mithral x5 (10 po chacun)', 'Outils de mineur nains (qualité supérieure, 15 po)'],
      nextScenes: ['veine-lac-souterrain'],
      previousScene: 'veine-entree-effondree'
    },
    {
      id: 'veine-lac-souterrain',
      sceneNumber: 3,
      title: 'Le Lac Souterrain',
      type: 'exploration',
      location: 'Lac souterrain de la mine',
      locationId: 'mine-lac',
      estimatedMinutes: 15,
      readAloud: {
        text: 'La galerie débouche sur une caverne immense dont le centre est occupé par un lac d\'eau noire et immobile. La surface est si parfaitement lisse qu\'elle reflète le plafond de stalactites comme un miroir inversé. Des veines de mithral courent dans la roche tout autour, traçant des lignes argentées dans l\'obscurité.\n\nUne passerelle de bois — vestige de l\'exploitation minière — longe la paroi droite du lac. Elle est partiellement effondrée en son milieu, laissant un trou de trois mètres au-dessus des eaux noires. De l\'autre côté, un tunnel plus large s\'enfonce vers la veine principale.\n\nL\'eau du lac émet une faible luminescence bleutée par intermittence, comme si quelque chose pulsait dans ses profondeurs. Des bulles montent parfois à la surface avec un gargouillement inquiétant.',
        mood: 'mystérieux',
        music: 'ambiance-lac-souterrain'
      },
      gmNotes: [
        { type: 'info', text: 'Le lac fait 20m de diamètre, profondeur 8m. L\'eau est saturée de résidus de mithral — pas toxique mais conductrice de magie. La passerelle fait 15m de long avec un trou de 3m au milieu.' },
        { type: 'warning', text: 'Le lac contient 2 vases de mithral (créatures magiques) qui attaquent quiconque tombe à l\'eau ou la touche. PV 22, CA 8, immunité acide/poison, vulnérable foudre, pseudopode +4, 1d6+2 contondant + 1d4 acide.' },
        { type: 'secret', text: 'Au fond du lac, un coffre nain verrouillé contient des lingots de mithral pur (200 po de valeur). Plonger est risqué mais lucratif.' },
        { type: 'tip', text: 'La passerelle peut être réparée avec des planches trouvées le long du mur (Bricolage ou Athlétisme DD 12). Sauter le trou requiert Acrobaties DD 13.' }
      ],
      skillChecks: [
        { skill: 'Acrobaties', dc: 13, success: 'Vous franchissez le trou dans la passerelle d\'un bond assuré.', failure: 'Vous glissez et tombez dans le lac noir — les vases de mithral se réveillent !' },
        { skill: 'Athlétisme', dc: 12, success: 'Vous improvisez un pont avec les planches trouvées le long du mur. Passage sécurisé.', failure: 'Les planches sont trop pourries. Il faudra sauter.' },
        { skill: 'Perception', dc: 15, success: 'Vous repérez les formes mouvantes sous la surface — des créatures gélatineuses patrouillent le lac.', failure: 'Le lac semble calme et inoffensif, à part sa luminescence.' }
      ],
      choices: [
        {
          id: 'choix-lac',
          prompt: 'Comment traversez-vous ?',
          options: [
            {
              label: 'Réparer la passerelle',
              description: 'Prendre le temps de sécuriser le passage.',
              consequence: 'Plus lent mais sûr. Aucun contact avec l\'eau.',
              nextScene: 'veine-mithral-corrompu'
            },
            {
              label: 'Sauter le trou',
              description: 'Tenter le saut par-dessus le vide.',
              consequence: 'Rapide mais chaque personnage doit réussir Acrobaties DD 13.',
              nextScene: 'veine-mithral-corrompu'
            },
            {
              label: 'Plonger dans le lac',
              description: 'Explorer les profondeurs à la recherche de trésors.',
              consequence: 'Trésor potentiel mais les vases attaquent immédiatement.',
              skillCheck: { skill: 'Athlétisme', dc: 14, success: 'Vous nagez assez vite pour atteindre le coffre et remonter avant que les vases ne vous rattrapent.', failure: 'Les vases vous enveloppent dans l\'eau noire. Combat aquatique !' }
            }
          ]
        }
      ],
      loot: ['Coffre nain : lingots de mithral pur (200 po, si plongée réussie)', 'Planches de bois enchanté (résistantes à la pourriture, 5 po)'],
      nextScenes: ['veine-mithral-corrompu'],
      previousScene: 'veine-cristaux-toxiques'
    },
    {
      id: 'veine-mithral-corrompu',
      sceneNumber: 4,
      title: 'La Veine de Mithral Corrompu',
      type: 'combat',
      location: 'Veine principale de mithral',
      locationId: 'mine-veine-principale',
      estimatedMinutes: 30,
      readAloud: {
        text: 'Le tunnel débouche enfin sur la veine principale — et le spectacle coupe le souffle. Une paroi entière de mithral pur s\'élève du sol au plafond sur une dizaine de mètres de large, ses veines argentées parcourues de pulsations violettes. La corruption de la Fracture a transformé le métal noble en quelque chose de vivant et de menaçant.\n\nDevant la veine, une silhouette massive se tient immobile : le Golem de Mithral. Haut de trois mètres, son corps est un assemblage de plaques de mithral gravées de runes naines. Mais les runes sont déformées, réécrites par la corruption. Ses yeux — autrefois des gemmes bleues — brûlent maintenant d\'un violet intense. Du mithral liquide suinte de ses articulations.\n\nLe Golem tourne sa tête massive vers vous avec un grincement mécanique. Une voix métallique et distordue résonne : « Accès... interdit. Protocole... défense... activé. » Ses poings se serrent, libérant des étincelles de mithral corrompu.',
        mood: 'confrontation épique',
        music: 'combat-boss-golem'
      },
      gmNotes: [
        { type: 'info', text: 'Le Golem était le gardien de la mine, construit par les nains il y a des siècles. La Fracture a corrompu ses runes de commande — il ne distingue plus les mineurs des intrus.' },
        { type: 'tip', text: 'Un personnage parlant le nain peut tenter de reprogrammer le Golem (Arcanes DD 17 + nain). Succès : le Golem se désactive pacifiquement. Un forgeron nain compétent pourrait le réparer après le combat.' },
        { type: 'warning', text: 'Le Golem absorbe le mithral de la veine pour se régénérer. Éloigner le combat de la paroi (5m+) coupe sa régénération.' },
        { type: 'secret', text: 'Au cœur du Golem se trouve un Noyau de Mithral Pur — le composant le plus précieux de la mine. L\'extraire après sa défaite permet de forger une arme ou une armure de mithral +1.' }
      ],
      skillChecks: [
        { skill: 'Arcanes', dc: 17, success: 'Vous parvenez à réécrire les runes de commande en nain ancien. Le Golem s\'arrête, ses yeux redevenant bleus. « Gardien... mode veille... activé. »', failure: 'Les runes corrompues résistent à votre intervention. Le Golem intensifie ses attaques.' },
        { skill: 'Histoire', dc: 14, success: 'Vous reconnaissez les runes de contrôle naines. Le Golem peut être désactivé si ses runes sont restaurées.', failure: 'Le Golem est une machine de guerre inconnue pour vous.' }
      ],
      encounter: {
        name: 'Golem de Mithral Corrompu',
        enemies: [
          { name: 'Golem de Mithral Corrompu', hp: 68, atk: 8, ac: 17, cr: 5, abilities: ['Poing de Mithral : +8, 2d8+5 contondant', 'Souffle Corrompu (Recharge 5-6) : cône 4,5m, DD Con 15, 4d6 poison', 'Régénération de Mithral : regagne 10 PV/round si à 5m de la veine (interruptible en l\'éloignant)', 'Résistance aux dégâts non-magiques', 'Immunité : poison, psychique, charme, peur, paralysie', 'Vulnérabilité : foudre (dégâts doubles et étourdi 1 round)', 'Charge Mithral : si se déplace de 6m+ en ligne droite, +2d6 contondants sur l\'attaque suivante'] }
        ],
        terrain: ['Veine de mithral (source de régénération pour le Golem)', 'Rails de wagon (obstacles au sol)', 'Outils de mine (armes improvisées)', 'Plafond 4m (espace limité pour le Golem, peut frapper le plafond)'],
        tactics: 'Le Golem reste près de la veine pour sa régénération. Il utilise Charge Mithral sur les cibles éloignées et Souffle Corrompu sur les groupes. Il cible en priorité les lanceurs de sorts (ses runes le programment à identifier la magie comme une menace).',
        loot: ['Noyau de Mithral Pur (composant pour arme/armure +1)', 'Plaques de Mithral x4 (50 po chacune)', 'Gemmes oculaires (2 saphirs corrompus, 25 po chacun)']
      },
      choices: [
        {
          id: 'choix-golem',
          prompt: 'Le Golem est vaincu ou désactivé. Que faites-vous de la veine ?',
          options: [
            {
              label: 'Signaler aux nains',
              description: 'Prévenir Durgan et les mineurs que la veine est libre.',
              consequence: 'Les nains reviennent et commencent la purification. Ils vous considèrent comme des héros de Cœur-de-Fer.',
              reputationChange: [{ faction: 'Nains de Cœur-de-Fer', amount: 5 }]
            },
            {
              label: 'Prélever discrètement',
              description: 'Prendre du mithral avant de prévenir les nains.',
              consequence: 'Vous récupérez 2 lingots supplémentaires (100 po), mais risquez d\'être découverts.',
              skillCheck: { skill: 'Escamotage', dc: 15, success: 'Les lingots disparaissent dans votre sac sans que personne ne remarque.', failure: 'Un mineur vous voit et le rapporte à Durgan. -2 réputation avec les nains.' }
            }
          ]
        }
      ],
      loot: ['Noyau de Mithral Pur', 'Lingot de Mithral Purifié', 'Plaques de Mithral x4', 'Pic de Mineur Enchanté'],
      nextScenes: [],
      previousScene: 'veine-lac-souterrain'
    }
  ]
};

// ============================================================================
// 6. LE SANCTUAIRE ENFOUI (3 salles)
// ============================================================================

const SANCTUAIRE_ENFOUI: BookChapter = {
  id: 'dungeon-sanctuaire-enfoui',
  actNumber: 2,
  chapterNumber: 202,
  title: 'Le Sanctuaire Enfoui',
  subtitle: 'Un temple nain oublié par le temps',
  summary: 'Un tremblement de terre a révélé l\'entrée d\'un ancien temple nain dédié aux dieux de la forge. Un Gardien de Pierre veille encore sur un artéfact sacré. Les aventuriers doivent prouver leur respect ou affronter la colère de pierre.',
  levelRange: '3-4',
  themes: ['religion naine', 'artéfact', 'épreuves'],
  chapterIntro: {
    text: 'Un éboulement récent dans les collines près de Cœur-de-Fer a mis à jour une entrée de pierre sculptée, enfouie depuis des siècles. Les runes naines sur le linteau parlent du « Sanctuaire de la Flamme Première » — un temple que les érudits croyaient être une légende. À l\'intérieur, un artéfact ancien attend ceux qui sont dignes.',
    mood: 'révérence',
    music: 'ambiance-temple-nain'
  },
  chapterConclusion: {
    text: 'Le Gardien de Pierre retrouve son immobilité, satisfait que l\'artéfact soit entre de bonnes mains — ou réduit en gravats si le combat a été nécessaire. Le Sanctuaire de la Flamme Première a livré ses secrets, mais bien d\'autres temples enfouis dorment peut-être sous les collines de Cœur-de-Fer.',
    mood: 'solennel',
    music: 'theme-nains-ancien'
  },
  rewards: { xp: 300, gold: '70 po', items: ['Marteau de la Flamme Première (masse +1, 1/jour : Flamme Sacrée améliorée)', 'Rune de Protection Naine (gravure sur armure : +1 CA vs créatures de pierre)'] },
  scenes: [
    {
      id: 'sanctuaire-vestibule',
      sceneNumber: 1,
      title: 'Le Vestibule des Ancêtres',
      type: 'exploration',
      location: 'Entrée du sanctuaire nain',
      locationId: 'sanctuaire-vestibule',
      estimatedMinutes: 15,
      readAloud: {
        text: 'Le vestibule est une salle rectangulaire d\'une sobriété majestueuse. Des colonnes massives, gravées de scènes de forge et de création, soutiennent un plafond voûté à trois mètres de hauteur. La poussière de siècles recouvre tout, mais la qualité de la construction est indéniable — pas une fissure, pas un joint déplacé.\n\nLe long des murs, douze alcôves abritent des statues de nains en tenue cérémonielle, chacune tenant un outil de forge différent : marteau, tenailles, enclume miniature, soufflet. Leurs visages de pierre expriment une sérénité absolue. Devant chaque statue, un petit bassin de pierre est rempli d\'une poussière dorée.\n\nAu fond du vestibule, une double porte de bronze massif est fermée. En son centre, une serrure en forme d\'enclume. Aucune clé visible.',
        mood: 'sacré',
        music: 'ambiance-temple-nain'
      },
      gmNotes: [
        { type: 'info', text: 'La poussière dorée dans les bassins est de la poudre d\'or consacré (12 bassins x 5 po = 60 po si pillés, mais pilier les bassins éveille le Gardien en état hostile). La porte s\'ouvre si on dépose une offrande de métal dans le bassin central (n\'importe quel objet métallique).' },
        { type: 'lore', text: 'Les douze statues représentent les Maîtres-Forgerons légendaires des nains. Leurs noms sont gravés en runes naines anciennes.' },
        { type: 'secret', text: 'La troisième statue (celle au marteau) a un mécanisme caché dans sa main. Tourner le marteau ouvre un compartiment secret contenant une Rune de Protection.' },
        { type: 'tip', text: 'Prier devant les statues (Religion DD 12) fait briller le bassin central et révèle l\'indice : « Le métal nourrit la flamme. Offrez au creuset. »' }
      ],
      skillChecks: [
        { skill: 'Religion', dc: 12, success: 'Votre prière résonne dans le sanctuaire. Le bassin central s\'illumine et un murmure dit : « Le métal nourrit la flamme. Offrez au creuset. »', failure: 'Le silence du sanctuaire est total.' },
        { skill: 'Investigation', dc: 15, success: 'Le marteau de la troisième statue tourne ! Un compartiment s\'ouvre, révélant une Rune de Protection Naine gravée sur une plaque de mithral.', failure: 'Les statues semblent toutes identiques dans leur construction.' },
        { skill: 'Perception', dc: 13, success: 'Vous remarquez que le bassin central est différent : il a la forme d\'un creuset de forge, pas d\'un simple bol.', failure: 'Les bassins se ressemblent tous.' }
      ],
      choices: [
        {
          id: 'choix-vestibule',
          prompt: 'Comment ouvrez-vous la porte ?',
          options: [
            {
              label: 'Offrir du métal',
              description: 'Déposer un objet métallique dans le creuset central.',
              consequence: 'L\'objet fond instantanément et la porte s\'ouvre en silence. Le sanctuaire vous juge dignes.',
              nextScene: 'sanctuaire-priere'
            },
            {
              label: 'Forcer la porte',
              description: 'Utiliser la force brute ou le crochetage.',
              consequence: 'La porte résiste (CA 18, 50 PV, immunité feu/poison) et le Gardien de Pierre dans la salle finale est averti. Il sera hostile.',
              nextScene: 'sanctuaire-priere',
              skillCheck: { skill: 'Athlétisme', dc: 18, success: 'La porte cède dans un fracas de bronze. Le sanctuaire tremble de colère.', failure: 'La porte ne bouge pas d\'un millimètre. Le bronze est enchanté.' }
            }
          ]
        }
      ],
      loot: ['Rune de Protection Naine (compartiment secret)', 'Poudre d\'or consacré (60 po si pillée — conséquences)'],
      nextScenes: ['sanctuaire-priere'],
      previousScene: undefined
    },
    {
      id: 'sanctuaire-priere',
      sceneNumber: 2,
      title: 'La Salle de Prière',
      type: 'exploration',
      location: 'Salle de prière du sanctuaire',
      locationId: 'sanctuaire-salle-priere',
      estimatedMinutes: 15,
      readAloud: {
        text: 'Derrière la porte de bronze, une salle vaste s\'étend, baignée dans une lumière orangée émanant d\'une forge éternelle au centre. Le feu brûle sans combustible dans un âtre de pierre noire, ses flammes dansant avec une grâce surnaturelle. La chaleur est agréable, presque réconfortante.\n\nDes bancs de pierre s\'alignent face à la forge, comme les rangées d\'un lieu de culte. Sur les murs, des fresques montrent le processus de la création : le minerai extrait, fondu, martelé, et transformé en œuvres d\'art et d\'armes. Le dernier panneau montre un marteau lumineux forgé dans la flamme elle-même.\n\nDerrière la forge, un autel de basalte porte des inscriptions en runes dorées encore lisibles. Au-delà, un passage voûté mène à une salle plus petite d\'où émane une lueur bleue intense.',
        mood: 'sacré-chaleureux',
        music: 'ambiance-forge-sacree'
      },
      gmNotes: [
        { type: 'info', text: 'La forge éternelle est un enchantement permanent. Elle ne peut pas être éteinte mais peut être utilisée pour forger (aucun combustible nécessaire, bonus +2 aux tests d\'artisanat). Les inscriptions sur l\'autel sont une prière à Moradin (ou équivalent dans votre setting).' },
        { type: 'tip', text: 'Réciter la prière de l\'autel (Religion DD 14) octroie une bénédiction de la forge : résistance au feu pendant 8 heures.' },
        { type: 'secret', text: 'La forge éternelle peut purifier n\'importe quel objet métallique corrompu. Y plonger un objet corrompu le restaure (utile si les joueurs ont trouvé du mithral corrompu précédemment).' },
        { type: 'lore', text: 'Ce temple était le lieu où les nains forgeaient leurs armes les plus sacrées. La Flamme Première est censée être un fragment du feu de la création.' }
      ],
      skillChecks: [
        { skill: 'Religion', dc: 14, success: 'Votre récitation de la prière ancienne fait rugir la forge. Une chaleur bienveillante vous enveloppe : résistance au feu pendant 8 heures.', failure: 'Les mots anciens vous échappent. La forge crépite mais ne réagit pas.' },
        { skill: 'Arcanes', dc: 13, success: 'La forge est alimentée par un enchantement permanent lié à un plan élémentaire de feu. Elle peut purifier la corruption métallique.', failure: 'La magie ici est ancienne et profonde — trop pour votre compréhension actuelle.' },
        { skill: 'Artisanat (forge)', dc: 12, success: 'Cette forge est un outil de maître incroyable. Avec les bons matériaux, vous pourriez y créer des objets extraordinaires.', failure: 'La forge est impressionnante mais vous ne savez pas l\'utiliser.' }
      ],
      choices: [
        {
          id: 'choix-salle-priere',
          prompt: 'Que faites-vous avant d\'avancer ?',
          options: [
            {
              label: 'Prier à la forge',
              description: 'Réciter la prière et recevoir la bénédiction.',
              consequence: 'La bénédiction de la forge vous protège : résistance au feu pendant 8 heures.',
              nextScene: 'sanctuaire-saint-des-saints'
            },
            {
              label: 'Utiliser la forge',
              description: 'Purifier un objet corrompu ou forger quelque chose.',
              consequence: 'Un objet métallique corrompu est purifié, ou un objet simple est amélioré (+1 temporaire pendant 24h).',
              nextScene: 'sanctuaire-saint-des-saints'
            },
            {
              label: 'Continuer directement',
              description: 'Ne pas s\'attarder et avancer vers la lueur bleue.',
              consequence: 'Vous renoncez aux bénéfices de la forge mais gagnez du temps.',
              nextScene: 'sanctuaire-saint-des-saints'
            }
          ]
        }
      ],
      loot: ['Bénédiction de la forge (résistance au feu 8h, si prière réussie)'],
      nextScenes: ['sanctuaire-saint-des-saints'],
      previousScene: 'sanctuaire-vestibule'
    },
    {
      id: 'sanctuaire-saint-des-saints',
      sceneNumber: 3,
      title: 'Le Saint des Saints',
      type: 'combat',
      location: 'Chambre de l\'artéfact',
      locationId: 'sanctuaire-artefact',
      estimatedMinutes: 25,
      readAloud: {
        text: 'La dernière chambre est circulaire et plus petite que les précédentes. Au centre, un piédestal de cristal supporte un marteau de guerre nain qui flotte dans un halo de lumière bleue et or. L\'arme est magnifique — sa tête gravée de runes de feu et son manche enveloppé de cuir de dragon. C\'est le Marteau de la Flamme Première.\n\nMais entre vous et l\'artéfact se dresse le Gardien. Une statue de pierre de deux mètres cinquante, taillée dans le granite le plus dur, prend vie avec un grondement qui fait trembler le sol. Ses yeux s\'allument — bleus si vous avez respecté le sanctuaire, rouges si vous l\'avez profané.\n\n« Épreuve... ou profanation ? » gronde la voix de pierre. Le Gardien lève ses poings massifs, prêt à juger.',
        mood: 'épreuve finale',
        music: 'combat-boss-gardien'
      },
      gmNotes: [
        { type: 'info', text: 'Si les joueurs ont respecté le sanctuaire (offrande de métal, pas de pillage), le Gardien propose une épreuve de force honorable (combat à demi-puissance). Si profané (pillage, porte forcée), combat à pleine puissance et hostile.' },
        { type: 'tip', text: 'Le Gardien est vulnérable aux sorts de Réparation et aux effets qui affectent les constructions. Un sort de « Dissipation de la Magie » sur ses runes le désactive 1 round.' },
        { type: 'warning', text: 'En mode hostile, le Gardien a 20 PV supplémentaires et Frappe Sismique inflige 4d6 au lieu de 3d6.' },
        { type: 'secret', text: 'Le Gardien peut être convaincu sans combat si un nain du groupe récite le serment des Maîtres-Forgerons (Histoire DD 18 + être nain). Le Gardien s\'incline et offre le marteau.' }
      ],
      skillChecks: [
        { skill: 'Histoire', dc: 18, success: 'Vous récitez le serment ancestral des Maîtres-Forgerons. Le Gardien s\'agenouille : « Digne. Le marteau est vôtre. »', failure: 'Les mots anciens ne vous viennent pas. L\'épreuve sera physique.' },
        { skill: 'Persuasion', dc: 16, success: 'Vous convainquez le Gardien de votre cause juste. Il réduit sa puissance pour une épreuve honorable.', failure: 'Le Gardien ne comprend que les actes, pas les paroles.' }
      ],
      encounter: {
        name: 'Gardien de Pierre',
        enemies: [
          { name: 'Gardien de Pierre', hp: 58, atk: 7, ac: 16, cr: 4, abilities: ['Poing de Granite : +7, 2d8+4 contondant', 'Frappe Sismique (Recharge 5-6) : DD Con 15, 3d6 contondant dans un rayon de 3m + à terre', 'Corps de Pierre : résistance aux dégâts non-magiques, immunité poison/psychique', 'Vulnérabilité aux coups de tonnerre', 'Mode Épreuve (si sanctuaire respecté) : PV réduits à 40, pas de Frappe Sismique', 'Réparation : un sort de Réparation lui inflige 2d6 dégâts (paradoxe magique)'] }
        ],
        terrain: ['Piédestal de cristal (fragile, ne pas le briser !)', 'Murs circulaires (pas de recoins)', 'Sol de pierre lisse (pas de terrain difficile)', 'Halo de l\'artéfact (zone lumineuse, avantage contre les morts-vivants dans 3m)'],
        tactics: 'Le Gardien protège le piédestal. Il repousse quiconque s\'approche du marteau. En mode épreuve, il combat honorablement un contre un. En mode hostile, il attaque le groupe sans retenue.',
        loot: ['Marteau de la Flamme Première (+1, 1/jour Flamme Sacrée améliorée)', 'Fragments du Gardien (pierre enchantée, 30 po)', 'Gemmes oculaires du Gardien (2 saphirs, 20 po chacun)']
      },
      choices: [
        {
          id: 'choix-gardien',
          prompt: 'Le Gardien vaincu, le marteau est accessible. Que faites-vous ?',
          options: [
            {
              label: 'Prendre le marteau avec révérence',
              description: 'Saisir l\'arme en prononçant une prière.',
              consequence: 'Le marteau s\'illumine en reconnaissant un nouveau porteur. Le sanctuaire tremble doucement — une approbation divine.'
            },
            {
              label: 'Laisser le marteau et sceller le sanctuaire',
              description: 'L\'artéfact est trop sacré pour être emporté.',
              consequence: 'Le Gardien se reconstruit et vous salue. Vous gagnez la bénédiction permanente des nains ancestraux : +1 aux jets de sauvegarde. Le sanctuaire reste un lieu de pèlerinage.',
              reputationChange: [{ faction: 'Nains de Cœur-de-Fer', amount: 5 }]
            }
          ]
        }
      ],
      loot: ['Marteau de la Flamme Première', '70 po en offrandes anciennes'],
      nextScenes: [],
      previousScene: 'sanctuaire-priere'
    }
  ]
};

// ============================================================================
// 7. LE BOSQUET SOMBRE (4 salles)
// ============================================================================

const BOSQUET_SOMBRE: BookChapter = {
  id: 'dungeon-bosquet-sombre',
  actNumber: 2,
  chapterNumber: 203,
  title: 'Le Bosquet Sombre',
  subtitle: 'La corruption au cœur de la Sylve',
  summary: 'Une clairière dans la Sylve d\'Yggdrasylve a été corrompue par une influence malveillante. Les druides locaux sont impuissants face au Treant Corrompu qui a pris racine autour d\'une source empoisonnée. Purifier le bosquet est essentiel pour préserver la forêt.',
  levelRange: '3-5',
  themes: ['nature corrompue', 'druides', 'purification'],
  chapterIntro: {
    text: 'La druide Elowen vous attend à l\'orée d\'une zone morte dans la forêt. Les arbres autour de vous sont vivants et verdoyants, mais devant, une ligne nette marque la frontière de la corruption : les troncs sont noirs, les feuilles grises et craquelées, et le sol est couvert d\'une mousse violacée qui pulse doucement. « C\'est pire chaque jour, » murmure Elowen. « Le bosquet s\'étend. Si rien n\'est fait, toute la Sylve sera touchée d\'ici un mois. »',
    mood: 'urgence naturelle',
    music: 'ambiance-foret-corrompue'
  },
  chapterConclusion: {
    text: 'Le Treant s\'effondre dans un fracas de bois pourri, et la corruption reflue comme une marée. La source se purifie lentement, son eau redevenant claire. Les premiers bourgeons verts apparaissent sur les branches mortes. Elowen pose sa main sur le sol et sourit pour la première fois. « La Sylve guérira. Grâce à vous. »',
    mood: 'renouveau',
    music: 'theme-nature-apaisee'
  },
  rewards: { xp: 350, gold: '60 po', items: ['Bâton du Bosquet (bâton +1, 1/jour : Enchevêtrement)', 'Fiole d\'Eau de Source Purifiée (potion : guérit toute maladie et tout poison)'] },
  scenes: [
    {
      id: 'bosquet-lisiere',
      sceneNumber: 1,
      title: 'La Lisière Corrompue',
      type: 'exploration',
      location: 'Bordure du bosquet corrompu',
      locationId: 'bosquet-lisiere',
      estimatedMinutes: 15,
      readAloud: {
        text: 'Dès que vous franchissez la ligne de corruption, l\'air change. Il devient lourd, chargé d\'une odeur de décomposition végétale et de quelque chose de plus profond — une corruption magique qui picote la peau. Les arbres ici ne sont pas morts mais transformés : leurs troncs sont tordus en formes grotesques, leurs branches s\'étirent comme des doigts griffus vers le ciel gris.\n\nLe sol spongieux cède sous vos pas, la mousse violacée émettant de petits nuages de spores à chaque pression. Des champignons luminescents d\'un bleu malsain poussent en cercles sur les troncs. Le silence est oppressant — aucun oiseau, aucun insecte, rien que le craquement sinistre des branches corrompues.\n\nDevant vous, le sentier se divise : à gauche, un passage sous une arche de branches entremêlées couvertes de toiles épaisses ; à droite, un chemin plus dégagé mais où la mousse est particulièrement épaisse.',
        mood: 'oppressant-végétal',
        music: 'ambiance-foret-corrompue'
      },
      gmNotes: [
        { type: 'info', text: 'Le chemin de gauche (toiles) mène à la zone d\'araignées-arbres. Le chemin de droite (mousse) est un piège : la mousse est plus épaisse car elle cache un nid de lianes animées.' },
        { type: 'warning', text: 'Les spores de mousse sont légèrement toxiques : 1 heure d\'exposition impose un jet de Con DD 11. Échec : empoisonné pendant 1 heure. Un foulard mouillé protège.' },
        { type: 'secret', text: 'Les champignons bleus sont des Champi-Lumière corrompus. Normalement, ils guérissent. Sous cette forme, ils empoisonnent (Nature DD 14 pour distinguer). Un druide peut les purifier.' },
        { type: 'tip', text: 'Le feu est efficace contre les créatures végétales corrompues mais risque de se propager dans la forêt sèche et malade.' }
      ],
      skillChecks: [
        { skill: 'Nature', dc: 14, success: 'Vous identifiez les champignons comme des Champi-Lumière corrompus. Purifiés, ils deviennent des potions de soin mineure.', failure: 'Les champignons sont jolis mais vous ne les reconnaissez pas.' },
        { skill: 'Survie', dc: 13, success: 'Les traces au sol révèlent que le chemin de droite est un piège — des lianes ont traîné plusieurs animaux sous la mousse.', failure: 'Les deux chemins semblent également dangereux.' },
        { skill: 'Perception', dc: 12, success: 'Des toiles anormalement épaisses couvrent l\'arche de gauche. Ce ne sont pas des toiles d\'araignées ordinaires — elles sont végétales.', failure: 'Les toiles semblent abandonnées.' }
      ],
      choices: [
        {
          id: 'choix-lisiere',
          prompt: 'Quel chemin prenez-vous ?',
          options: [
            {
              label: 'Le passage sous les toiles (gauche)',
              description: 'Plus étroit mais visible.',
              consequence: 'Vous entrez dans la zone des toiles végétales — des araignées-arbres y nichent.',
              nextScene: 'bosquet-toiles'
            },
            {
              label: 'Le chemin de mousse (droite)',
              description: 'Plus large et dégagé.',
              consequence: 'La mousse épaisse cache un piège de lianes animées !',
              nextScene: 'bosquet-toiles',
              skillCheck: { skill: 'Dextérité', dc: 14, success: 'Vous bondissez en arrière quand les lianes surgissent et trouvez un autre chemin.', failure: 'Des lianes vous agrippent ! 2d6 contondant et entravé. DD For 14 pour se libérer.' }
            }
          ]
        }
      ],
      loot: ['Champi-Lumière corrompus x4 (poison ou potion si purifiés)'],
      nextScenes: ['bosquet-toiles'],
      previousScene: undefined
    },
    {
      id: 'bosquet-toiles',
      sceneNumber: 2,
      title: 'La Toile Végétale',
      type: 'combat',
      location: 'Zone de toiles dans le bosquet',
      locationId: 'bosquet-toiles-vegetales',
      estimatedMinutes: 20,
      readAloud: {
        text: 'L\'arche de branches débouche sur un espace confiné entre les arbres, entièrement recouvert de toiles végétales — des filaments de sève durcie et de fibres ligneuses qui forment un réseau dense et collant. La lumière filtre à peine à travers ce cocon naturel, créant une pénombre verdâtre.\n\nDes formes bougent dans les toiles au-dessus de vous : des créatures à mi-chemin entre l\'araignée et la plante. Leurs corps sont faits de bois tordu et de feuilles, avec huit pattes articulées comme des branches. Leurs « yeux » sont des baies rouges luminescentes. Deux d\'entre elles descendent lentement vers vous sur des fils de sève.\n\nAu centre de la toile, un cocon massif pend d\'une branche maîtresse. Quelque chose bouge à l\'intérieur — une forme humanoïde. Un gémissement étouffé en sort.',
        mood: 'piège naturel',
        music: 'combat-foret'
      },
      gmNotes: [
        { type: 'info', text: '3 Araignées-Arbres + le cocon contient un éclaireur druide (Faelen, PNJ utile). Le libérer donne un allié qui connaît le chemin vers la source.' },
        { type: 'tip', text: 'Le feu détruit les toiles efficacement mais les Araignées-Arbres sont résistantes au feu (bois vert). Le froid est plus efficace.' },
        { type: 'warning', text: 'Si le cocon tombe ou est frappé par un sort de zone, Faelen subit aussi les dégâts.' },
        { type: 'secret', text: 'Les Araignées-Arbres étaient autrefois des esprits gardiens de la forêt, corrompus par la même source que le Treant. Elles peuvent être purifiées (Religion DD 15 sur une araignée morte — elle renaît en esprit gardien bienveillant).' }
      ],
      skillChecks: [
        { skill: 'Nature', dc: 13, success: 'Ces créatures sont des esprits gardiens corrompus, pas des araignées naturelles. Le froid les affecte plus que le feu.', failure: 'Des araignées de bois — créatures inhabituelles.' },
        { skill: 'Discrétion', dc: 14, success: 'Vous approchez du cocon sans alerter toutes les araignées — seule la plus proche vous repère.', failure: 'Les araignées vous repèrent immédiatement et se positionnent pour l\'attaque.' }
      ],
      encounter: {
        name: 'Les Araignées-Arbres',
        enemies: [
          { name: 'Araignée-Arbre', hp: 22, atk: 5, ac: 14, cr: 1, abilities: ['Morsure ligneuse : +5, 1d8+3 perforant + 1d4 poison (sève toxique)', 'Toile de sève (Recharge 5-6) : DD Dex 13 ou entravé (For DD 14 pour se libérer)', 'Camouflage forestier : avantage aux tests de Discrétion en forêt', 'Résistance au feu, Vulnérabilité au froid'] }
        ],
        terrain: ['Toiles végétales (terrain difficile)', 'Arbres corrompus (couverture)', 'Canopée basse (3m, combat rapproché)', 'Cocon suspendu (otage)'],
        tactics: 'Les Araignées-Arbres utilisent le terrain en se camouflant dans les branches. Elles ciblent les personnages isolés et utilisent leurs toiles pour séparer le groupe. Elles protègent instinctivement le cocon (nourriture).',
        loot: ['Sève cristallisée x3 (composant alchimique, 8 po chacune)', 'Bois enchanté (matériau pour bâton magique)']
      },
      choices: [
        {
          id: 'choix-toiles',
          prompt: 'Vous avez vaincu les araignées. Le cocon ?',
          options: [
            {
              label: 'Ouvrir le cocon',
              description: 'Libérer la créature à l\'intérieur.',
              consequence: 'Faelen, un éclaireur druide, sort du cocon affaibli mais reconnaissant. Il connaît le chemin vers la source et le Treant.',
              nextScene: 'bosquet-source'
            },
            {
              label: 'Examiner prudemment',
              description: 'Vérifier le contenu avant d\'ouvrir.',
              consequence: 'Vous confirmez qu\'il s\'agit d\'un humanoïde vivant — Faelen, druide éclaireur.',
              nextScene: 'bosquet-source',
              skillCheck: { skill: 'Médecine', dc: 12, success: 'Faelen est empoisonné par la sève mais vivant. Un antidote ou une potion le remettra sur pied rapidement.', failure: 'Il respire mais vous ne pouvez pas évaluer son état.' }
            }
          ]
        }
      ],
      loot: ['Sève cristallisée x3', 'Bois enchanté'],
      nextScenes: ['bosquet-source'],
      previousScene: 'bosquet-lisiere'
    },
    {
      id: 'bosquet-source',
      sceneNumber: 3,
      title: 'La Source Empoisonnée',
      type: 'exploration',
      location: 'Source au cœur du bosquet',
      locationId: 'bosquet-source-empoisonnee',
      estimatedMinutes: 15,
      readAloud: {
        text: 'Le sentier s\'ouvre sur une clairière autrefois magnifique. En son centre, une source jaillit d\'entre les rochers moussus, mais l\'eau qui en coule est d\'un noir d\'encre, visqueuse et fumante. Les arbres autour de la source sont les plus corrompus : leurs troncs suintent d\'une résine noire et leurs racines forment des motifs qui ressemblent à des runes sombres.\n\nFaelen — si vous l\'avez libéré — blêmit en voyant la source. « C\'était le Cœur du Bosquet, » murmure-t-il. « L\'eau guérissait toutes les maladies. Maintenant... elle les crée. Quelque chose l\'empoisonne depuis les profondeurs. » Il pointe du doigt un objet enfoncé dans la roche sous la source : un cristal noir qui pulse d\'énergie maléfique.\n\nMais avant que vous puissiez approcher, le sol tremble. Les racines autour de la source s\'animent, se tordent, et un arbre massif — le plus grand de la clairière — ouvre des yeux incandescents. Le Treant Corrompu s\'éveille.',
        mood: 'confrontation naturelle',
        music: 'ambiance-boss-foret'
      },
      gmNotes: [
        { type: 'info', text: 'Le cristal noir est la source de la corruption. Le détruire (CA 15, 20 PV, vulnérable radiant) affaiblit le Treant (-20 PV max, perd sa régénération). Mais il est sous l\'eau empoisonnée — toucher l\'eau inflige 1d6 nécrotique.' },
        { type: 'tip', text: 'Faelen peut créer une barrière temporaire contre les racines animées (Concentration, 3 rounds) si protégé. Cela empêche le Treant d\'utiliser Appel des Racines.' },
        { type: 'warning', text: 'Le Treant est massif (4m de haut) et puissant. Combat frontal sans neutraliser le cristal est très difficile.' },
        { type: 'secret', text: 'Le cristal a été planté délibérément — c\'est l\'œuvre du Cercle des Cendres. La corruption du bosquet n\'est pas naturelle mais orchestrée.' }
      ],
      skillChecks: [
        { skill: 'Arcanes', dc: 14, success: 'Le cristal noir est un artéfact de corruption délibérément planté. C\'est du sabotage magique, pas un phénomène naturel.', failure: 'L\'énergie autour de la source est chaotique et incompréhensible.' },
        { skill: 'Nature', dc: 13, success: 'Le Treant est un ancien gardien de la forêt. La corruption le rend fou. Détruire le cristal pourrait le ramener à la raison — ou le tuer.', failure: 'L\'arbre est immense et en colère. Pas grand-chose d\'autre à en dire.' }
      ],
      choices: [
        {
          id: 'choix-source',
          prompt: 'Le Treant s\'éveille ! Quelle stratégie ?',
          options: [
            {
              label: 'Attaquer le cristal d\'abord',
              description: 'Envoyer quelqu\'un détruire le cristal pendant que les autres distraient le Treant.',
              consequence: 'Stratégie risquée mais efficace — le cristal détruit affaiblit drastiquement le Treant.',
              nextScene: 'bosquet-coeur'
            },
            {
              label: 'Combattre le Treant directement',
              description: 'Affronter le gardien corrompu de face.',
              consequence: 'Combat brutal contre un Treant à pleine puissance.',
              nextScene: 'bosquet-coeur'
            },
            {
              label: 'Tenter de purifier le Treant',
              description: 'Utiliser la magie divine pour briser la corruption.',
              consequence: 'Si réussi, le Treant redevient allié et détruit le cristal lui-même.',
              nextScene: 'bosquet-coeur',
              skillCheck: { skill: 'Religion', dc: 17, success: 'Votre prière transperce la corruption. Le Treant s\'arrête, ses yeux vacillant entre rouge et vert.', failure: 'La corruption est trop profonde. Le Treant charge avec rage.' }
            }
          ]
        }
      ],
      loot: [],
      nextScenes: ['bosquet-coeur'],
      previousScene: 'bosquet-toiles'
    },
    {
      id: 'bosquet-coeur',
      sceneNumber: 4,
      title: 'Le Cœur du Bosquet',
      type: 'combat',
      location: 'Cœur du bosquet — combat final',
      locationId: 'bosquet-coeur-combat',
      estimatedMinutes: 30,
      readAloud: {
        text: 'Le Treant Corrompu se dresse devant vous de toute sa hauteur — quatre mètres de bois tordu, de racines animées et de haine végétale. Son tronc massif est parcouru de veines noires pulsantes, et sa bouche — une fente béante dans l\'écorce — émet un rugissement qui fait pleuvoir des feuilles mortes.\n\nSes bras-branches balaient l\'air avec la force d\'un bélier. Autour de lui, les racines du sol s\'animent, formant des tentacules ligneux qui cherchent à agripper tout ce qui bouge. La source empoisonnée derrière lui bouillonne de plus en plus fort, alimentant sa fureur.\n\nSi Faelen est avec vous, il lève ses mains et crée un cercle de protection autour du groupe, les racines animées reculant temporairement. « Je ne tiendrai pas longtemps ! » crie-t-il. « Frappez le cristal ou l\'arbre — vite ! »',
        mood: 'combat désespéré',
        music: 'combat-boss-nature'
      },
      gmNotes: [
        { type: 'info', text: 'Le Treant a deux phases. Phase 1 : combat normal. Phase 2 (sous 30 PV) : désespoir — il tente de drainer toute la vie du bosquet pour se régénérer. Détruire le cristal avant la Phase 2 empêche la régénération.' },
        { type: 'tip', text: 'Le feu inflige des dégâts normaux (pas de vulnérabilité — le bois est saturé de sève toxique). Le radiant est le plus efficace.' },
        { type: 'warning', text: 'Si Faelen tombe, les racines reprennent leur liberté (Appel des Racines recharge automatiquement chaque round).' },
        { type: 'secret', text: 'Si purifié au lieu d\'être tué, le Treant redevient le Gardien du Bosquet. Il offre son bâton (branche maîtresse) comme récompense et jure de protéger à nouveau la forêt.' }
      ],
      skillChecks: [
        { skill: 'Athlétisme', dc: 15, success: 'Vous plongez dans l\'eau empoisonnée (1d6 nécrotique) et arrachez le cristal de la roche !', failure: 'L\'eau vous brûle et les racines sous-marines vous agrippent. Vous devez reculer.' },
        { skill: 'Acrobaties', dc: 14, success: 'Vous esquivez un balayage de branche du Treant et trouvez une ouverture pour attaquer.', failure: 'La branche vous frappe de plein fouet.' }
      ],
      encounter: {
        name: 'Treant Corrompu',
        enemies: [
          { name: 'Treant Corrompu', hp: 72, atk: 8, ac: 15, cr: 5, abilities: ['Branche-Massue : +8, 2d10+5 contondant', 'Appel des Racines (Recharge 5-6) : DD For 15, entravé + 1d6 contondant/round dans un rayon de 6m', 'Souffle Toxique (Recharge 6) : cône 4,5m, DD Con 14, 3d6 poison', 'Régénération Corrompue : regagne 10 PV/round si cristal intact', 'Phase 2 (sous 30 PV) : Drain Vital — toutes les plantes dans 9m se dessèchent, le Treant regagne 20 PV (une seule fois)'] }
        ],
        terrain: ['Source empoisonnée (1d6 nécrotique au contact)', 'Racines animées (terrain difficile)', 'Arbres corrompus (couverture)', 'Cristal noir sous l\'eau (CA 15, 20 PV, vulnérable radiant)'],
        tactics: 'Le Treant utilise Appel des Racines pour immobiliser le groupe puis frappe avec Branche-Massue. Il protège le cristal en se plaçant entre celui-ci et les attaquants. En Phase 2, il utilise Drain Vital puis tente d\'écraser le personnage le plus proche.',
        loot: ['Bâton du Bosquet (+1, 1/jour Enchevêtrement)', 'Cœur de bois ancien (composant druidique, 40 po)', 'Fiole d\'Eau de Source Purifiée (après purification du cristal)', 'Cristal noir brisé (preuve de sabotage du Cercle)']
      },
      choices: [
        {
          id: 'choix-coeur',
          prompt: 'Le Treant est vaincu ou purifié. Que faites-vous de la source ?',
          options: [
            {
              label: 'Purifier la source',
              description: 'Retirer le cristal et laisser l\'eau se purifier naturellement.',
              consequence: 'La source retrouve sa clarté en quelques heures. Le bosquet commence à guérir. Elowen et les druides seront éternellement reconnaissants.',
              reputationChange: [{ faction: 'Druides de la Sylve', amount: 5 }]
            },
            {
              label: 'Étudier le cristal',
              description: 'Conserver le cristal noir pour l\'analyser.',
              consequence: 'Le cristal révèle des informations sur les méthodes du Cercle des Cendres. La source se purifie mais plus lentement sans sa destruction.',
              reputationChange: [{ faction: 'Druides de la Sylve', amount: 2 }]
            }
          ]
        }
      ],
      loot: ['Bâton du Bosquet', 'Fiole d\'Eau de Source Purifiée', 'Cristal noir (preuve)', '60 po en composants naturels'],
      nextScenes: [],
      previousScene: 'bosquet-source'
    }
  ]
};

// ============================================================================
// 8. LA GROTTE DU PASSEUR (3 salles)
// ============================================================================

const GROTTE_PASSEUR: BookChapter = {
  id: 'dungeon-grotte-passeur',
  actNumber: 2,
  chapterNumber: 204,
  title: 'La Grotte du Passeur',
  subtitle: 'Les secrets de la côte',
  summary: 'Une grotte côtière accessible uniquement à marée basse servait autrefois de repaire à un contrebandier légendaire — le Passeur. Son fantôme hante encore les lieux, protégeant son dernier trésor et les secrets qu\'il a emportés dans la mort.',
  levelRange: '3-4',
  themes: ['côte', 'fantôme', 'contrebande', 'trésor'],
  chapterIntro: {
    text: 'Les pêcheurs de la côte parlent du Passeur depuis des générations — un contrebandier si habile qu\'il pouvait traverser n\'importe quel blocus. On dit que sa grotte contient le butin d\'une vie entière de commerce illicite. Mais ceux qui ont tenté d\'y entrer ne sont jamais revenus... ou sont revenus fous, balbutiant des histoires de brouillard vivant et de rires fantomatiques.',
    mood: 'aventure maritime',
    music: 'ambiance-cote'
  },
  chapterConclusion: {
    text: 'Le Passeur Spectral se dissipe avec un dernier rire — moqueur ou soulagé, difficile à dire. Sa grotte livre enfin ses trésors, mais aussi ses secrets : des documents de contrebande qui révèlent des routes commerciales secrètes et des noms de complices, certains encore en vie et en position de pouvoir.',
    mood: 'mystère résolu',
    music: 'theme-maritime'
  },
  rewards: { xp: 250, gold: '100 po', items: ['Longue-Vue du Passeur (vision x5, voit à travers le brouillard magique)', 'Carte des Routes Secrètes (avantage aux tests de navigation côtière)'] },
  scenes: [
    {
      id: 'grotte-entree-maree',
      sceneNumber: 1,
      title: 'L\'Entrée de Marée',
      type: 'exploration',
      location: 'Entrée de la grotte côtière',
      locationId: 'grotte-passeur-entree',
      estimatedMinutes: 15,
      readAloud: {
        text: 'La grotte se révèle à marée basse, son entrée en arc de cercle taillée dans la falaise calcaire. L\'eau de mer clapote encore à vos chevilles lorsque vous pénétrez à l\'intérieur, le sol de sable humide crissant sous vos bottes. Des algues tapissent les murs jusqu\'à la marque de marée haute — deux mètres au-dessus du sol actuel.\n\nL\'air est salé et frais, portant les échos amplifiés des vagues. La grotte s\'enfonce en pente douce, le sable laissant place à la roche. Des anneaux de fer rouillé sont fixés aux parois — pour amarrer des barques, visiblement. Un squelette de petit bateau pourrit contre le mur, ses planches disjointes et ses voiles en lambeaux.\n\nPlus loin, un brouillard surnaturel stagne au niveau du sol, dense et immobile malgré le courant d\'air marin. Il brille faiblement d\'une lumière argentée, et un rire léger — à peine audible — semble en émaner.',
        mood: 'maritime-mystérieux',
        music: 'ambiance-grotte-marine'
      },
      gmNotes: [
        { type: 'info', text: 'Les joueurs ont environ 4 heures avant que la marée ne remonte et ne bloque l\'entrée (8 heures pour redescendre). Le brouillard est l\'aura du Passeur Spectral — il ne fait pas de dégâts mais désoriente (désavantage aux tests de Perception dans le brouillard).' },
        { type: 'warning', text: 'Le bateau squelette est piégé : toucher la coque déclenche un sort de Terreur (DD Sag 13 ou effrayé 1 minute). Le Passeur protège ses possessions même en ruine.' },
        { type: 'secret', text: 'Dans le sable sous le bateau, une cache contient une boussole magique qui pointe toujours vers le trésor le plus proche dans un rayon de 30m.' },
        { type: 'tip', text: 'Le brouillard peut être dissipé temporairement avec un sort de vent ou en agitant vigoureusement une torche (zone de 3m dégagée pour 1 round).' }
      ],
      skillChecks: [
        { skill: 'Perception', dc: 14, success: 'Sous le sable, près du bateau, quelque chose de métallique brille. Une cache sous le sable !', failure: 'Le sable mouillé semble uniforme.' },
        { skill: 'Investigation', dc: 13, success: 'Les anneaux de fer et les marques sur les murs indiquent un trafic régulier — pas un simple pêcheur mais un réseau de contrebande organisé.', failure: 'Une vieille grotte de pêcheur, apparemment.' },
        { skill: 'Arcanes', dc: 12, success: 'Le brouillard est d\'origine nécromantique — la manifestation d\'un esprit puissant lié à ce lieu.', failure: 'Un brouillard étrange, probablement dû à l\'humidité de la grotte.' }
      ],
      choices: [
        {
          id: 'choix-entree-grotte',
          prompt: 'Comment avancez-vous dans le brouillard ?',
          options: [
            {
              label: 'Avancer prudemment',
              description: 'Progresser lentement dans le brouillard.',
              consequence: 'Progression lente mais vous évitez la plupart des pièges passifs.',
              nextScene: 'grotte-tresors-echoues'
            },
            {
              label: 'Dissiper le brouillard',
              description: 'Utiliser la magie ou le vent pour dégager la voie.',
              consequence: 'Le brouillard recule mais le Passeur est alerté de votre puissance magique.',
              nextScene: 'grotte-tresors-echoues'
            },
            {
              label: 'Parler au brouillard',
              description: 'Tenter de communiquer avec l\'esprit.',
              consequence: 'Le rire s\'intensifie. Une voix murmure : « Des visiteurs... Ça faisait longtemps. Venez, venez... si vous l\'osez. »',
              nextScene: 'grotte-tresors-echoues',
              skillCheck: { skill: 'Persuasion', dc: 14, success: 'L\'esprit semble amusé. Le brouillard s\'écarte partiellement, révélant un passage sûr.', failure: 'Le rire devient moqueur. Le brouillard s\'épaissit.' }
            }
          ]
        }
      ],
      loot: ['Boussole du Contrebandier (pointe vers le trésor le plus proche dans 30m)', '5 po dans le sable'],
      nextScenes: ['grotte-tresors-echoues'],
      previousScene: undefined
    },
    {
      id: 'grotte-tresors-echoues',
      sceneNumber: 2,
      title: 'La Caverne aux Trésors Échoués',
      type: 'exploration',
      location: 'Salle du butin',
      locationId: 'grotte-passeur-tresor',
      estimatedMinutes: 20,
      readAloud: {
        text: 'Le brouillard se dissipe partiellement en entrant dans une vaste caverne souterraine. Le spectacle est saisissant : des dizaines de caisses, de barils et de coffres s\'empilent le long des murs, certains ouverts et débordant de marchandises. Des tissus précieux, des épices exotiques, des armes étrangères, des bouteilles de vin rare — le butin d\'une carrière entière de contrebande.\n\nMais tout est piégé. Des fils quasi invisibles relient les caisses entre elles, des mécanismes à ressort sont dissimulés sous les couvercles, et des runes de protection luisent faiblement sur certains coffres. Le Passeur n\'a pas survécu des décennies en laissant son trésor sans défense.\n\nAu fond de la caverne, une porte de bois renforcé de fer est gravée d\'un crâne souriant au-dessus de deux os croisés — l\'emblème du Passeur. Un murmure résonne : « Prenez ce que vous voulez... si vous pouvez. »',
        mood: 'tentation piégeuse',
        music: 'ambiance-tresor-piege'
      },
      gmNotes: [
        { type: 'info', text: 'La caverne est un champ de pièges : 6 coffres piégés, 3 fils déclencheurs, 2 runes explosives. Le butin total accessible (sans pièges) vaut environ 200 po. Désarmer tout prend 30 minutes et plusieurs tests.' },
        { type: 'warning', text: 'Piège type 1 (fils) : déclenche un carreau d\'arbalète empoisonné (+4, 1d6 perforant + 2d4 poison, Perception DD 14 pour repérer). Piège type 2 (coffre) : aiguille empoisonnée dans la serrure (DD Dex 14, 1d4 perforant + poison DD 13 Con ou paralysé 1 minute). Piège type 3 (rune) : explosion de force (DD Dex 15, 3d6 force dans 3m).' },
        { type: 'tip', text: 'La Boussole du Contrebandier (si trouvée) vibre plus fort près des coffres non piégés — elle pointe vers le vrai trésor, pas les leurres.' },
        { type: 'secret', text: 'Un coffre spécifique (le plus petit, sans piège) contient le journal du Passeur avec des noms de ses complices — des marchands et nobles encore influents. Information explosive.' }
      ],
      skillChecks: [
        { skill: 'Perception', dc: 14, success: 'Vous repérez les fils quasi invisibles reliant les caisses. Un pas de travers et c\'est le déluge de pièges.', failure: 'Les caisses semblent simplement entassées.' },
        { skill: 'Outils de voleur', dc: 14, success: 'Vous désarmez un piège de coffre avec précision. La serrure cède sans déclencher l\'aiguille.', failure: 'L\'aiguille vous pique le doigt ! Jet de Con DD 13 ou paralysé.' },
        { skill: 'Investigation', dc: 15, success: 'Vous identifiez le petit coffre sans piège grâce aux traces d\'ouverture fréquente. C\'est le coffre personnel du Passeur.', failure: 'Tous les coffres se ressemblent.' }
      ],
      choices: [
        {
          id: 'choix-tresors',
          prompt: 'Comment abordez-vous le butin ?',
          options: [
            {
              label: 'Désarmer méthodiquement',
              description: 'Prendre le temps de neutraliser chaque piège.',
              consequence: 'Lent (30 min) mais permet d\'accéder à tout le butin en sécurité.',
              nextScene: 'grotte-repaire-passeur'
            },
            {
              label: 'Prendre uniquement les coffres sûrs',
              description: 'Utiliser la boussole ou l\'instinct pour cibler les coffres non piégés.',
              consequence: 'Plus rapide, butin réduit mais sans risque.',
              nextScene: 'grotte-repaire-passeur'
            },
            {
              label: 'Ignorer et avancer',
              description: 'Le vrai trésor est derrière la porte.',
              consequence: 'Vous laissez le butin pour l\'instant et affrontez le Passeur directement.',
              nextScene: 'grotte-repaire-passeur'
            }
          ]
        }
      ],
      loot: ['Butin varié : épices, tissus, armes étrangères (jusqu\'à 200 po)', 'Journal du Passeur (noms de complices)', 'Bouteilles de vin exotique x3 (15 po chacune)', 'Dague de contrebandier (+1, peut être dissimulée, avantage Escamotage pour la cacher)'],
      nextScenes: ['grotte-repaire-passeur'],
      previousScene: 'grotte-entree-maree'
    },
    {
      id: 'grotte-repaire-passeur',
      sceneNumber: 3,
      title: 'Le Repaire du Passeur Spectral',
      type: 'combat',
      location: 'Chambre privée du Passeur',
      locationId: 'grotte-passeur-boss',
      estimatedMinutes: 25,
      readAloud: {
        text: 'La porte s\'ouvre sur une chambre aménagée avec un goût surprenant pour une grotte de contrebandier. Un bureau massif fait face à l\'entrée, couvert de cartes maritimes et de documents jaunis. Un lit de camp, une armoire, et un coffre-fort scellé dans la roche complètent le mobilier. Aux murs, des cartes du monde, des trophées de chasse, et un portrait d\'une femme souriante.\n\nAssis derrière le bureau, transparent et lumineux, le Passeur Spectral vous accueille avec un sourire carnassier. C\'est un homme mince aux traits anguleux, portant un tricorne et un manteau de capitaine. Ses yeux — des orbes de brume argentée — pétillent de malice. « Bienvenue, bienvenue ! Personne ne vient plus me voir, de nos jours. Dommage que je ne puisse pas vous laisser repartir avec mes affaires. Question de principe, vous comprenez. »\n\nLe brouillard s\'épaissit autour de lui, et des formes spectrales commencent à se matérialiser — les ombres de son ancien équipage.',
        mood: 'confrontation charismatique',
        music: 'combat-boss-spectral'
      },
      gmNotes: [
        { type: 'info', text: 'Le Passeur est un fantôme charismatique mais dangereux. Il peut être combattu ou négocié avec (Persuasion DD 16). Il respecte la ruse et le courage — pas la force brute.' },
        { type: 'tip', text: 'Le Passeur a une faiblesse : le portrait de sa femme. Si les joueurs promettent de retrouver sa descendance et de lui transmettre son héritage légitime (pas le butin volé — un médaillon dans le coffre-fort), il les laissera partir avec tout.' },
        { type: 'warning', text: 'En combat, le Passeur peut devenir intangible (incorporel). Seuls les dégâts magiques, radiants ou de force l\'affectent. Les armes argentées infligent demi-dégâts.' },
        { type: 'secret', text: 'Le coffre-fort contient : la Longue-Vue du Passeur, la Carte des Routes Secrètes, un médaillon avec le portrait de sa femme (valeur sentimentale, clé pour apaiser le fantôme), et 100 po en pièces anciennes.' }
      ],
      skillChecks: [
        { skill: 'Persuasion', dc: 16, success: 'Votre promesse de retrouver sa descendance touche le Passeur. Ses yeux spectraux s\'adoucissent. « Trouvez Elena... ma petite-fille. Donnez-lui le médaillon. Le reste est à vous. »', failure: 'Le Passeur rit. « Belles paroles ! Mais les morts n\'ont plus confiance en les vivants. »' },
        { skill: 'Tromperie', dc: 15, success: 'Votre bluff est assez convaincant pour distraire le Passeur pendant un round, donnant à votre groupe un avantage à l\'initiative.', failure: 'Le Passeur a arnaqué des rois. Votre mensonge ne l\'impressionne pas.' }
      ],
      encounter: {
        name: 'Le Passeur Spectral',
        enemies: [
          { name: 'Passeur Spectral', hp: 40, atk: 6, ac: 13, cr: 3, abilities: ['Toucher Glacial : +6, 2d6+3 nécrotique', 'Brouillard Aveuglant (Recharge 5-6) : rayon 6m, DD Sag 14 ou aveuglé 1 round', 'Incorporel : peut traverser murs et objets, résistance aux dégâts non-magiques', 'Possession (1/combat) : DD Cha 14 ou possédé 1 minute — le possédé attaque ses alliés', 'Rire Terrifiant : les créatures à 9m doivent réussir DD Sag 12 ou être effrayées 1 round'] },
          { name: 'Marin Spectral', hp: 15, atk: 4, ac: 11, cr: 0.5, abilities: ['Coutelas Spectral : +4, 1d6+2 nécrotique', 'Incorporel : résistance aux dégâts non-magiques'] }
        ],
        terrain: ['Brouillard dense (désavantage Perception)', 'Bureau massif (couverture)', 'Espace confiné (6m x 8m)', 'Murs de roche (les spectres peuvent les traverser)'],
        tactics: 'Le Passeur utilise Brouillard Aveuglant au round 1 puis tente Possession sur le personnage le plus fort. Les Marins Spectraux émergent des murs pour attaquer par surprise. Le Passeur traverse les murs pour se repositionner.',
        loot: ['Longue-Vue du Passeur (vision x5, voit à travers le brouillard)', 'Carte des Routes Secrètes', 'Médaillon du Passeur (quête secondaire)', '100 po en pièces anciennes', 'Documents de contrebande (noms, routes, contacts)']
      },
      choices: [
        {
          id: 'choix-passeur',
          prompt: 'Le Passeur est vaincu ou apaisé. Le coffre-fort est ouvert.',
          options: [
            {
              label: 'Prendre le trésor et le médaillon',
              description: 'Tout emporter, y compris le médaillon.',
              consequence: 'Butin complet. Si le médaillon est remis à Elena (quête future), bonus de réputation et récompense supplémentaire.'
            },
            {
              label: 'Prendre le trésor, sceller la grotte',
              description: 'Emporter le butin et bloquer l\'entrée.',
              consequence: 'Le trésor est à vous et la grotte ne sera plus un danger. Le fantôme est définitivement dissipé.'
            }
          ]
        }
      ],
      loot: ['Longue-Vue du Passeur', 'Carte des Routes Secrètes', 'Médaillon du Passeur', '100 po', 'Documents de contrebande'],
      nextScenes: [],
      previousScene: 'grotte-tresors-echoues'
    }
  ]
};

// ============================================================================
// EXPORT
// ============================================================================

export const MINI_DUNGEONS_ACT_2: BookChapter[] = [
  VEINE_MAUDITE,
  SANCTUAIRE_ENFOUI,
  BOSQUET_SOMBRE,
  GROTTE_PASSEUR
];
