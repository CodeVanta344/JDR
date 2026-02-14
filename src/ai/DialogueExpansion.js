// ==========================================
// DIALOGUE EXPANSION - 200+ Templates Contextuels
// ==========================================
// Extension massive de dialogues pour DialogueHandler
// Variantes par contexte : météo, heure, relation, faction, quête, émotion

class DialogueExpansion {
  constructor() {
    // ===== SALUTATIONS (40 variantes) =====
    this.greetings = {
      time_based: {
        morning: [
          "Bonjour ! Le soleil est levé, le travail aussi.",
          "Bien le bonjour ! Une belle matinée pour les affaires.",
          "Ah, un lève-tôt ! Rare de nos jours.",
          "Salut ! Tu as l'air frais pour quelqu'un qui voyage."
        ],
        afternoon: [
          "Bon après-midi ! La journée avance bien ?",
          "Salutations ! Il fait chaud aujourd'hui, non ?",
          "Bien le bonjour. Tu viens manger ou tu repars déjà ?",
          "Hey ! Besoin d'une pause ?"
        ],
        evening: [
          "Bonsoir ! Les routes deviennent dangereuses à cette heure.",
          "Salut, voyageur. Tu cherches un endroit où dormir ?",
          "Bonsoir. Les portes ferment bientôt, dépêche-toi.",
          "Ah, enfin un peu de calme après cette journée."
        ],
        night: [
          "Que fais-tu dehors si tard ? C'est risqué.",
          "...Tu n'as pas peur du noir, toi.",
          "Les honnêtes gens dorment à cette heure. Toi, tu cherches quoi ?",
          "Chut... Parle doucement, tu vas réveiller les autres."
        ]
      },
      weather_based: {
        rain: [
          "Par ce temps, même les gobelins restent chez eux.",
          "Entre, tu es trempé ! Viens te sécher.",
          "Cette pluie ne s'arrêtera jamais, je te le dis.",
          "Beau temps pour les canards, hein ?"
        ],
        storm: [
          "Sacrée tempête ! Rentre vite avant de te faire foudroyer !",
          "Les dieux sont en colère ce soir...",
          "J'ai vu des éclairs frapper la forêt. Mauvais présage.",
          "Cette tempête a déjà fait trois morts. Sois prudent."
        ],
        snow: [
          "Viens te réchauffer près du feu !",
          "La neige bloque les routes. Tu vas rester coincé ici.",
          "J'espère que tu as des provisions, l'hiver sera long.",
          "Regarde-moi ça, on dirait un bonhomme de neige !"
        ],
        fog: [
          "Ce brouillard... On n'y voit rien à dix mètres.",
          "Fais gaffe aux brigands, ils adorent chasser par ce temps.",
          "Le brouillard apporte toujours des choses étranges...",
          "Tu t'es pas perdu, au moins ?"
        ]
      },
      relationship_based: {
        loved: [
          "Mon ami ! Quelle joie de te revoir !",
          "Toi ici ! Viens, je t'offre un verre !",
          "Ah, mon héros préféré ! Raconte-moi tes aventures !",
          "Toujours vivant, à ce que je vois ! Tu es increvable !"
        ],
        friendly: [
          "Salut ! Content de te croiser.",
          "Tiens, revoilà une tête connue !",
          "Ça faisait longtemps ! Comment vas-tu ?",
          "Salut, camarade. Quoi de neuf ?"
        ],
        neutral: [
          "Oui ?",
          "Que puis-je faire pour vous ?",
          "Hmm.",
          "Vous cherchez quelque chose ?"
        ],
        unfriendly: [
          "Qu'est-ce que tu veux encore ?",
          "Toi... De retour.",
          "Je suis occupé. Fais vite.",
          "J'espère que tu viens pas me causer des problèmes."
        ],
        hostile: [
          "Dégage. Tout de suite.",
          "Un pas de plus et je crie au secours.",
          "T'as du culot de revenir ici.",
          "Les gardes vont adorer te voir."
        ]
      },
      faction_based: {
        city_guard: [
          "Halte ! Déclare ton nom et tes intentions.",
          "Papiers, s'il te plaît.",
          "Circulez, rien à voir ici.",
          "Tout va bien, citoyen ?"
        ],
        thieves_guild: [
          "Psst... T'es nouveau dans le coin ?",
          "Les murs ont des oreilles, parle bas.",
          "Cherches-tu un moyen de... t'enrichir ?",
          "On se connaît ? Non ? Dommage."
        ],
        church: [
          "Que la lumière guide tes pas, étranger.",
          "Viens-tu chercher la bénédiction ?",
          "Les dieux veillent sur toi, mon enfant.",
          "Bienvenue en ce lieu sacré."
        ],
        merchants_guild: [
          "Bienvenue, cher client !",
          "Affaires ou plaisir ?",
          "Je sens une bonne affaire venir...",
          "Qualité garantie, meilleurs prix de la région !"
        ]
      }
    };

    // ===== DIALOGUES DE QUÊTE (50 variantes) =====
    this.questDialogues = {
      offer: [
        "J'ai un problème... et tu as l'air capable.",
        "Tu cherches du travail ? J'ai une proposition.",
        "Écoute, j'ai besoin d'aide. Tu es intéressé ?",
        "On m'a dit que tu étais doué. Prouve-le.",
        "J'ai une mission pour toi, si tu es courageux.",
        "Ça te dirait de gagner un peu d'or ?",
        "J'ai entendu parler de tes exploits. J'ai besoin de quelqu'un comme toi.",
        "Tu veux t'enrichir ? J'ai un boulot.",
        "C'est dangereux, mais ça paie bien.",
        "Peu de gens seraient prêts à faire ça. Toi, tu le serais ?"
      ],
      accept: [
        "Parfait ! Je savais que je pouvais compter sur toi.",
        "Excellent ! Ne me déçois pas.",
        "Bien. Voici les détails...",
        "Je te fais confiance. Reviens en un seul morceau.",
        "Marché conclu. Bonne chance.",
        "Tu ne le regretteras pas, je te le promets.",
        "Ah, enfin quelqu'un de compétent !",
        "Merci. Tu me sauves la mise.",
        "Je te revaudrai ça.",
        "Fais attention. C'est plus dangereux que ça en a l'air."
      ],
      refuse: [
        "Dommage. J'espérais que tu serais plus audacieux.",
        "Vraiment ? Tant pis.",
        "Comme tu veux. Mais tu rates une belle opportunité.",
        "Je vois. Je trouverai quelqu'un d'autre.",
        "Tu as peur ? Je comprends.",
        "Hm. Peut-être une autre fois.",
        "C'est décevant, mais je respecte ton choix.",
        "Ok. Mais ne viens pas pleurer si tu entends parler de la récompense.",
        "Tant pis pour toi. Quelqu'un d'autre profitera de l'or.",
        "Tu es sûr ? Vraiment sûr ? Bon, d'accord."
      ],
      progress: [
        "Alors, du nouveau ?",
        "Tu as avancé ?",
        "Des progrès ?",
        "J'espère que tu n'as pas oublié...",
        "Ah, te revoilà. Des nouvelles ?",
        "Dis-moi que tu as réussi.",
        "J'attends de tes nouvelles depuis des jours.",
        "Toujours en vie ? Bien. Continue.",
        "Ça avance ?",
        "Je commence à m'impatienter..."
      ],
      complete: [
        "Excellent travail ! Voici ta récompense.",
        "Tu l'as fait ! Je suis impressionné.",
        "Parfait. Tu mérites chaque pièce d'or.",
        "Je n'en attendais pas moins de toi.",
        "Bien joué ! Prends ça.",
        "Tu es un héros ! Merci infiniment.",
        "C'est fait ? Incroyable ! Tiens, prends ça.",
        "Tu as fait mieux que prévu. Bravo.",
        "Mission accomplie. Je suis soulagé.",
        "Parfait. Tu as prouvé ta valeur."
      ]
    };

    // ===== DIALOGUES MARCHANDS (40 variantes) =====
    this.merchantDialogues = {
      welcome: [
        "Bienvenue dans ma boutique !",
        "Entre, entre ! Regarde ce que j'ai !",
        "Ah, un client ! Quel plaisir !",
        "Tu as l'œil d'un connaisseur...",
        "Jettemps un œil, tu ne seras pas déçu !",
        "Qualité supérieure, prix imbattables !",
        "Cherches-tu quelque chose de particulier ?",
        "J'ai exactement ce qu'il te faut.",
        "N'hésite pas à demander !",
        "Bienvenue ! Mes marchandises sont les meilleures de la région !"
      ],
      buy: [
        "Excellent choix !",
        "Tu ne le regretteras pas.",
        "Affaire conclue !",
        "Merci pour ton achat !",
        "Plaisir de faire affaire avec toi.",
        "Reviens quand tu veux !",
        "Tu as bon goût !",
        "Un achat judicieux.",
        "Parfait ! Prochaine commande à -10% !",
        "Merci ! Recommande-moi à tes amis !"
      ],
      sell: [
        "Hm, voyons ça...",
        "Intéressant. Je t'en donne X pièces.",
        "C'est un prix honnête.",
        "Ça vaut plus ou moins ça.",
        "Je prends le risque. Marché conclu.",
        "D'accord. Voilà ton or.",
        "C'est pas mal. Je te l'achète.",
        "Pas de ma meilleure qualité, mais ça ira.",
        "Hm... Ok, je te prends ça.",
        "Tu es sûr de vouloir vendre ? Bon, ton choix."
      ],
      haggle_success: [
        "Bon, d'accord. Tu conduis une affaire serrée.",
        "Arf, tu me ruines ! Mais va pour ce prix.",
        "Tu es un négociateur redoutable. Marché conclu.",
        "D'accord, d'accord ! Arrête d'insister !",
        "Bien, tu as gagné. Ce prix-là.",
        "Tu es doué pour ça... Trop doué. Allez, vendu.",
        "Aïe... Mon pauvre cœur. Ok, c'est bon.",
        "Tu me fais mal, mais soit. Prends-le.",
        "Je ne fais jamais ça d'habitude, mais... c'est bon.",
        "Par pitié, prends-le à ce prix avant que je change d'avis !"
      ],
      haggle_fail: [
        "Non. C'est mon dernier prix.",
        "Désolé, je ne peux pas descendre plus bas.",
        "Tu rigoles ? Ça vaut bien plus.",
        "Je ne suis pas une association caritative.",
        "Hors de question. Prends-le ou laisse-le.",
        "Non. Fin de la discussion.",
        "C'est déjà un très bon prix.",
        "Tu insultes ma marchandise !",
        "J'ai une famille à nourrir, tu sais.",
        "Si tu veux du gratuit, va à l'église."
      ]
    };

    // ===== DIALOGUES EXPLORATION (30 variantes) =====
    this.explorationDialogues = {
      directions: [
        "Le village est au nord, suis la route principale.",
        "Prends à gauche après le pont, tu ne peux pas le rater.",
        "Va vers l'est, mais fais attention aux gobelins.",
        "La forêt est dangereuse, reste sur les chemins.",
        "Si tu vas au sud, emporte des provisions.",
        "La grotte ? À l'ouest, mais personne n'en revient.",
        "Continue tout droit, tu verras une auberge.",
        "Traverse la rivière, puis monte la colline.",
        "Au croisement, prends à droite. Pas à gauche, surtout.",
        "C'est à une journée de marche d'ici."
      ],
      warnings: [
        "Fais gaffe, il y a eu des attaques récemment.",
        "Des bandits rôdent dans le coin.",
        "On a vu un dragon la semaine dernière.",
        "Les loups sont nombreux cette saison.",
        "Ne voyage pas de nuit, c'est suicidaire.",
        "Cette zone est maudite, crois-moi.",
        "Les morts-vivants sortent la nuit.",
        "Prends une torche, les grottes sont sombres.",
        "Il paraît qu'un troll habite sous le pont.",
        "Si tu vois des ruines, ne t'en approche pas."
      ],
      discoveries: [
        "Tu as trouvé quelque chose d'intéressant ?",
        "Ah oui, cette grotte. On raconte des histoires dessus.",
        "Il y a un trésor caché par là, paraît-il.",
        "Les vieilles ruines ? Remplies de pièges.",
        "Un artefact ancien ? Ça vaut une fortune !",
        "Attention, c'est peut-être piégé.",
        "Tu es le premier à revenir de là-bas vivant.",
        "Fascinant ! Raconte-moi tout !",
        "Incroyable ! Je n'aurais jamais cru ça possible.",
        "Montre-moi ça ! (examine l'objet avec curiosité)"
      ]
    };

    // ===== RUMEURS (50 variantes) =====
    this.rumors = {
      local: [
        "On dit que le maire cache un secret.",
        "Le forgeron a disparu il y a trois jours.",
        "Des lumières étranges dans la forêt la nuit.",
        "Quelqu'un a volé le reliquaire de l'église.",
        "Un loup-garou rôderait dans les environs.",
        "Le puits est empoisonné, personne ne le dit.",
        "La fille du fermier a été vue avec un étranger.",
        "Les gardes sont corrompus, tout le monde le sait.",
        "Il paraît qu'un trésor est enterré sous la place.",
        "Le vieux fou du coin prédit la fin du monde."
      ],
      regional: [
        "Une armée se masse à la frontière.",
        "Le roi est malade, on parle de succession.",
        "Les taxes vont encore augmenter.",
        "Une épidémie ravage le sud.",
        "Les elfes ont fermé leurs frontières.",
        "Un dragon a détruit un village entier.",
        "Les mines sont infestées de gobelins.",
        "Une guerre civile se prépare.",
        "Les mages ont disparu du Cercle.",
        "Une secte sacrifie des innocents."
      ],
      legendary: [
        "L'Épée Légendaire serait dans les Montagnes du Nord.",
        "Un ancien temple renferme un pouvoir immense.",
        "Le Graal pourrait guérir n'importe quelle maladie.",
        "On raconte qu'un lich vit dans les Marais Noirs.",
        "Le Livre Interdit contiendrait des sorts oubliés.",
        "Un portail vers l'Enfer s'ouvrirait parfois.",
        "Les dieux marcheraient parmi nous.",
        "Un héros prophétisé doit sauver le monde.",
        "Les dragons ne sont pas tous morts.",
        "L'immortalité existe, paraît-il."
      ]
    };

    // ===== RÉACTIONS ÉMOTIONNELLES (30 variantes) =====
    this.emotionalResponses = {
      joy: [
        "(rires) C'est génial !",
        "Ah, quelle bonne nouvelle !",
        "Je suis si heureux !",
        "(sourire radieux)",
        "Fantastique !",
        "Hourra !",
        "C'est le plus beau jour de ma vie !",
        "(danse de joie)",
        "Incroyable ! Je n'y crois pas !",
        "Merci, merci mille fois !"
      ],
      anger: [
        "(serre les poings)",
        "Comment oses-tu ?!",
        "Je vais te faire regretter ça !",
        "(visage rouge de colère)",
        "Dégage ! MAINTENANT !",
        "Tu vas le payer !",
        "(hurle de rage)",
        "JE. NE. TOLERERAI. PAS. ÇA.",
        "Espèce de... !",
        "(casse un objet par terre)"
      ],
      fear: [
        "(recule tremblant)",
        "Non... Pas ça...",
        "Pitié, ne me fais pas de mal !",
        "(regarde autour nerveusement)",
        "J-je ne veux pas d'ennuis...",
        "(voix tremblante)",
        "Je t'en supplie...",
        "Au secours !",
        "(cherche une issue)",
        "(se recroqueville)"
      ],
      sadness: [
        "(pleure doucement)",
        "Pourquoi... Pourquoi moi...",
        "Je n'ai plus rien...",
        "(voix brisée)",
        "Tout est perdu...",
        "(regarde le sol)",
        "Laisse-moi seul...",
        "À quoi bon...",
        "(soupir profond)",
        "Je ne m'en remettrai jamais..."
      ],
      surprise: [
        "Quoi ?! Vraiment ?!",
        "Je n'en crois pas mes yeux !",
        "C'est impossible !",
        "(bouche ouverte de stupeur)",
        "Par tous les dieux !",
        "Attends, QUOI ?",
        "Tu te moques de moi ?",
        "Incroyable !",
        "(cligne des yeux)",
        "Je ne m'attendais pas à ça..."
      ]
    };
  }

  // ==========================================
  // RÉCUPÉRER UN DIALOGUE CONTEXTUEL
  // ==========================================
  getContextualDialogue(category, subcategory, context = {}) {
    try {
      const pool = this[category]?.[subcategory];
      if (!pool || !Array.isArray(pool)) return null;

      // Filtrer par contexte si fourni
      if (context.filter) {
        const filtered = pool.filter(context.filter);
        if (filtered.length > 0) return filtered[Math.floor(Math.random() * filtered.length)];
      }

      // Sinon, retourner un dialogue aléatoire
      return pool[Math.floor(Math.random() * pool.length)];
    } catch (error) {
      console.error('[DialogueExpansion] Erreur:', error);
      return null;
    }
  }

  // ==========================================
  // RÉCUPÉRER UNE RUMEUR CONTEXTUELLE
  // ==========================================
  getRumor(type = 'local') {
    const pool = this.rumors[type];
    if (!pool) return "Je n'ai rien entendu d'intéressant récemment.";
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ==========================================
  // RÉCUPÉRER UNE RÉACTION ÉMOTIONNELLE
  // ==========================================
  getEmotionalResponse(emotion) {
    const pool = this.emotionalResponses[emotion];
    if (!pool) return "...";
    return pool[Math.floor(Math.random() * pool.length)];
  }
}

export default DialogueExpansion;
