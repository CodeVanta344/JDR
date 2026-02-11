export interface DynamicEvent {
  id: string;
  type: 'interruption' | 'background' | 'opportunity' | 'danger';
  location: string[];
  timeOfDay: string[];
  description: string;
  possibleOutcomes: string[];
  relatedQuest?: string;
}

export const TAVERN_EVENTS: DynamicEvent[] = [
  {
    id: "tavern_brawl",
    type: "interruption",
    location: ["tavern"],
    timeOfDay: ["evening", "night"],
    description: "Deux hommes ivres se lèvent brusquement, renversant leurs chopes. L'un accuse l'autre de tricher aux dés. Les poings commencent à voler.",
    possibleOutcomes: ["Les joueurs peuvent intervenir", "Le tavernier appelle la garde", "La bagarre révèle un objet volé"]
  },
  {
    id: "bard_arrives",
    type: "background",
    location: ["tavern"],
    timeOfDay: ["evening"],
    description: "Un barde entre, secoue la neige de son manteau, et s'installe près du feu. Il commence à accorder son luth.",
    possibleOutcomes: ["Il peut chanter des légendes locales", "Il cherche des gardes du corps", "Il a des informations sur une ruine"]
  },
  {
    id: "guard_search",
    type: "interruption",
    location: ["tavern"],
    timeOfDay: ["any"],
    description: "La porte s'ouvre brutalement. Trois gardes de la ville entrent, scrutant chaque visage. 'Personne ne bouge. Nous cherchons un fugitif.'",
    possibleOutcomes: ["Les joueurs sont interrogés", "Un autre client est arrêté", "Les joueurs peuvent cacher quelqu'un"]
  },
  {
    id: "merchant_distress",
    type: "opportunity",
    location: ["tavern"],
    timeOfDay: ["any"],
    description: "Un marchand entre précipitamment, visiblement paniqué. 'Ma caravane! Ils l'ont attaquée sur la route du nord! J'ai besoin d'aide!'",
    possibleOutcomes: ["Quête de sauvetage", "Récompense en or", "Découverte d'un repaire de bandits"],
    relatedQuest: "rescue_caravan"
  },
  {
    id: "mysterious_stranger",
    type: "background",
    location: ["tavern"],
    timeOfDay: ["night"],
    description: "Dans le coin le plus sombre, une silhouette encapuchonnée observe la salle. Quand vos regards se croisent, elle détourne les yeux.",
    possibleOutcomes: ["Espion d'une faction", "Assassin en mission", "Simple voyageur prudent"]
  }
];

export const MARKET_EVENTS: DynamicEvent[] = [
  {
    id: "pickpocket",
    type: "interruption",
    location: ["market", "street"],
    timeOfDay: ["morning", "afternoon"],
    description: "Un gamin furtif bouscule un joueur et disparaît dans la foule. Une main vérifie instinctivement ses poches...",
    possibleOutcomes: ["Vol réussi - perte d'argent", "Le joueur attrape le voleur", "Le voleur laisse tomber quelque chose d'intéressant"]
  },
  {
    id: "cart_accident",
    type: "background",
    location: ["market", "street"],
    timeOfDay: ["morning", "afternoon"],
    description: "CRAC! Une roue de charrette se brise, déversant des tonneaux de vin sur les pavés. Le conducteur jure en essayant de sauver sa cargaison.",
    possibleOutcomes: ["Les joueurs peuvent aider", "Distraction pour une autre action", "Le marchand offre une récompense"]
  },
  {
    id: "street_preacher",
    type: "background",
    location: ["market", "square"],
    timeOfDay: ["morning", "afternoon"],
    description: "Un prêtre de Solarius monte sur une caisse et commence à haranguer la foule sur les dangers de la corruption. Certains écoutent, d'autres ricanent.",
    possibleOutcomes: ["Information sur une secte", "Conflit avec des non-croyants", "Bénédiction possible"]
  },
  {
    id: "exotic_merchant",
    type: "opportunity",
    location: ["market"],
    timeOfDay: ["any"],
    description: "Un marchand aux vêtements étranges déballe des marchandises exotiques. Des épices, des tissus... et quelque chose qui brille d'une lueur étrange sous le soleil.",
    possibleOutcomes: ["Artefact magique à vendre", "Objet maudit", "Contact pour une guilde secrète"]
  },
  {
    id: "noble_procession",
    type: "interruption",
    location: ["street", "market", "square"],
    timeOfDay: ["morning", "afternoon"],
    description: "Des trompettes retentissent. La foule s'écarte. Un noble en litière, escorté de gardes, traverse la place. Son regard hautain passe sur la populace.",
    possibleOutcomes: ["Les joueurs doivent s'écarter", "Opportunité de contact avec la noblesse", "Le noble remarque un joueur"]
  }
];

export const WILDERNESS_EVENTS: DynamicEvent[] = [
  {
    id: "distant_battle",
    type: "background",
    location: ["forest", "road", "wilderness"],
    timeOfDay: ["any"],
    description: "Au loin, le cliquetis d'acier et des cris. Un combat fait rage quelque part dans la forêt. Puis, soudain, le silence.",
    possibleOutcomes: ["Survivants à trouver", "Bandits victorieux", "Scène de massacre"]
  },
  {
    id: "abandoned_camp",
    type: "opportunity",
    location: ["forest", "wilderness"],
    timeOfDay: ["any"],
    description: "Un campement abandonné en hâte. Le feu est encore tiède. Des affaires éparpillées. Des traces de sang mènent vers les arbres.",
    possibleOutcomes: ["Indices sur des voyageurs disparus", "Embuscade", "Trésor caché"]
  },
  {
    id: "wildlife_crossing",
    type: "background",
    location: ["forest", "road"],
    timeOfDay: ["dawn", "dusk"],
    description: "Un cerf majestueux traverse le chemin, suivi de plusieurs biches. Il s'arrête un instant, vous regarde de ses grands yeux noirs, puis disparaît dans les fourrés.",
    possibleOutcomes: ["Présage favorable", "Opportunité de chasse", "Guide vers un lieu sacré"]
  },
  {
    id: "weather_change",
    type: "interruption",
    location: ["any"],
    timeOfDay: ["any"],
    description: "Le ciel s'assombrit rapidement. Des nuages noirs roulent depuis les montagnes. Le vent se lève, apportant une odeur de pluie... ou pire.",
    possibleOutcomes: ["Orage violent", "Brouillard surnaturel", "Simple averse"]
  },
  {
    id: "ancient_marker",
    type: "background",
    location: ["road", "wilderness"],
    timeOfDay: ["any"],
    description: "Une pierre gravée de runes anciennes se dresse au bord du chemin. L'herbe autour ne pousse pas. Les oiseaux évitent cet endroit.",
    possibleOutcomes: ["Borne de l'ancien empire", "Avertissement magique", "Cache secrète"]
  }
];

export const NIGHT_EVENTS: DynamicEvent[] = [
  {
    id: "guard_patrol",
    type: "interruption",
    location: ["street", "alley"],
    timeOfDay: ["night"],
    description: "Le cliquetis d'une armure. Une torche vacillante au coin de la rue. Une patrouille de nuit approche, vérifiant chaque recoin.",
    possibleOutcomes: ["Interrogatoire", "Les joueurs doivent se cacher", "Information sur un couvre-feu"]
  },
  {
    id: "scream_alley",
    type: "opportunity",
    location: ["street", "alley"],
    timeOfDay: ["night"],
    description: "Un cri perçant déchire le silence de la nuit, venant d'une ruelle proche. Puis plus rien, sinon le bruit d'une course précipitée.",
    possibleOutcomes: ["Victime à sauver", "Piège de bandits", "Témoin d'un crime"]
  },
  {
    id: "mysterious_light",
    type: "background",
    location: ["any"],
    timeOfDay: ["night"],
    description: "Une lueur bleue, presque imperceptible, danse au-dessus d'un toit. Elle semble vous observer un instant avant de s'évanouir.",
    possibleOutcomes: ["Feu follet", "Signal de la guilde des voleurs", "Manifestation magique"]
  },
  {
    id: "secret_meeting",
    type: "opportunity",
    location: ["alley", "warehouse"],
    timeOfDay: ["night"],
    description: "Des voix étouffées s'échappent d'une porte entrouverte. Des silhouettes s'échangent quelque chose. L'une d'elles regarde nerveusement la rue.",
    possibleOutcomes: ["Contrebande", "Réunion de conspirateurs", "Simple transaction illégale"]
  },
  {
    id: "drunk_noble",
    type: "interruption",
    location: ["street"],
    timeOfDay: ["night"],
    description: "Un noble visiblement ivre trébuche hors d'un établissement douteux. Il est seul, sans gardes, et ses poches semblent pleines.",
    possibleOutcomes: ["Opportunité de vol", "Il a des informations importantes", "Ses gardes arrivent"]
  }
];

export const SOCIAL_EVENTS: DynamicEvent[] = [
  {
    id: "npc_argument",
    type: "background",
    location: ["tavern", "market", "street"],
    timeOfDay: ["any"],
    description: "Deux marchands voisins s'engueulent violemment sur une affaire de territoire. Les clients hésitent à intervenir.",
    possibleOutcomes: ["Les joueurs peuvent arbitrer", "Information sur des rivalités locales", "Un des marchands offre une récompense"]
  },
  {
    id: "child_lost",
    type: "opportunity",
    location: ["market", "street", "square"],
    timeOfDay: ["morning", "afternoon"],
    description: "Un enfant en pleurs se tient au milieu de la foule, appelant sa mère. Personne ne semble s'en occuper.",
    possibleOutcomes: ["Gratitude de la famille", "L'enfant sait quelque chose", "Piège de pickpockets"]
  },
  {
    id: "beggar_wisdom",
    type: "background",
    location: ["street", "alley", "temple"],
    timeOfDay: ["any"],
    description: "Un vieux mendiant aveugle tend sa sébile. Quand vous passez, il murmure quelque chose qui ressemble à une prophétie ou un avertissement.",
    possibleOutcomes: ["Information cryptique", "Simple mendiant fou", "Ancien érudit déchu"]
  },
  {
    id: "old_acquaintance",
    type: "interruption",
    location: ["tavern", "market", "street"],
    timeOfDay: ["any"],
    description: "Quelqu'un appelle le nom d'un joueur. Un visage vaguement familier s'approche, souriant. 'Ça fait une éternité! Tu te souviens de moi?'",
    possibleOutcomes: ["Ancien allié", "Ancien ennemi sous déguisement", "Erreur sur la personne"]
  }
];

export const ALL_DYNAMIC_EVENTS = [
  ...TAVERN_EVENTS,
  ...MARKET_EVENTS,
  ...WILDERNESS_EVENTS,
  ...NIGHT_EVENTS,
  ...SOCIAL_EVENTS
];

export function getRandomEvent(location: string, timeOfDay: string): DynamicEvent | null {
  const matchingEvents = ALL_DYNAMIC_EVENTS.filter(e => 
    (e.location.includes(location) || e.location.includes('any')) &&
    (e.timeOfDay.includes(timeOfDay) || e.timeOfDay.includes('any'))
  );
  
  if (matchingEvents.length === 0) return null;
  return matchingEvents[Math.floor(Math.random() * matchingEvents.length)];
}

export function getEventsByType(type: DynamicEvent['type']): DynamicEvent[] {
  return ALL_DYNAMIC_EVENTS.filter(e => e.type === type);
}
