/**
 * Legendary Items & Artifacts
 * Extracted from lore.js - Unique items with deep lore
 */

export type ItemRarity = 'Légendaire' | 'Artefact' | 'Très rare';

export interface ItemStats {
  atk?: number;
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
  ac?: number;
  bonus?: string;
}

export interface LegendaryItem {
  name: string;
  type: string;
  rarity: ItemRarity;
  stats: ItemStats;
  lore: string;
  quest_hook: string;
}

export const LEGENDARY_ITEMS: LegendaryItem[] = [
  {
    name: "Lame de l'Aube (Solaris)",
    type: "Épée longue",
    rarity: "Légendaire",
    stats: { atk: 8, bonus: "+3d8 radiant contre les morts-vivants" },
    lore: "Forgée par Sir Valerius le Pieux avec un fragment de lumière de Solarius. La lame brille d'une lueur dorée perpétuelle et ne peut être maniée que par ceux dont le cœur est pur. Quiconque la touche avec des intentions mauvaises subit 4d6 dégâts radiants.",
    quest_hook: "La lame est perdue depuis la bataille du col de Rougemont. Des indices la situent dans la crypte d'un ancien temple."
  },
  {
    name: "L'Œil d'Ashka",
    type: "Gemme (Focus arcanique)",
    rarity: "Artefact",
    stats: { int: 5, bonus: "Permet de déchirer le Voile de Cristal pendant 1 minute" },
    lore: "Un fragment de la gemme qui contrôlait les portails de l'Hégémonie d'Ashka. Elle pulse d'une énergie violette et semble murmurer dans une langue oubliée. Son utilisation est extrêmement dangereuse — chaque activation attire l'attention des entités du Miroir des Ombres.",
    quest_hook: "Le Cercle des Cendres en possède trois fragments. Les deux autres sont perdus."
  },
  {
    name: "Le Carquois de l'Atlas",
    type: "Carquois magique",
    rarity: "Très rare",
    stats: { bonus: "Génère une flèche magique par tour. Les flèches ne peuvent pas manquer leur cible." },
    lore: "Tisé par les Elfes de guerre de l'ancienne Sylmanir, ce carquois contient une dimension de poche remplie de lumière stellaire. Chaque flèche qu'il produit est unique et se dissout après l'impact.",
    quest_hook: "Caché dans l'Œil de la Forêt, gardé par un esprit elfe qui pose trois épreuves."
  },
  {
    name: "Le Bouclier du Bastion",
    type: "Bouclier lourd",
    rarity: "Légendaire",
    stats: { ac: 5, bonus: "Réflexion : renvoie 50% des dégâts magiques au lanceur" },
    lore: "Ce bouclier a été forgé à partir du fragment d'un golem Ashkan reprogrammé pour protéger au lieu de détruire. Les runes à sa surface absorbent l'énergie magique et la retournent. Il est indestructible par des moyens non-divins.",
    quest_hook: "Enterré dans la Forge de Givre à Kuldahar, sous une couche de glace éternelle."
  },
  {
    name: "La Harpe du Silence",
    type: "Instrument (Focus bardique)",
    rarity: "Artefact",
    stats: { cha: 5, bonus: "Les sorts du porteur ne peuvent pas être contrecarrés" },
    lore: "Cet instrument ne produit aucun son audible. Au lieu de cela, il joue directement dans l'âme de ceux qui l'entendent, contournant toute défense magique ou physique. On dit que c'est le dernier instrument de la Dame Muse, laissé pour celui qui achèvera son chant.",
    quest_hook: "Perdue dans la Cité Engloutie d'Oria, au fond de l'Océan des Murmures."
  },
  {
    name: "Les Gantelets de Thundrak",
    type: "Gantelets",
    rarity: "Très rare",
    stats: { str: 4, bonus: "Permet de forger des objets magiques sans forge. Les coups de poing infligent 2d8." },
    lore: "Une paire de gantelets en mithril créée par Thundrak en complément de son marteau. Ils conservent la chaleur du premier feu nain et permettent de travailler le métal à mains nues.",
    quest_hook: "Exposés dans le Caveau des Ancêtres à Hammerdeep, mais protégés par un piège ancestral."
  },
  {
    name: "L'Amulette du Voile",
    type: "Amulette",
    rarity: "Artefact",
    stats: { wis: 3, bonus: "Permet de voir les créatures invisibles et éthérées en permanence" },
    lore: "Portée par le dernier Grand Prêtre avant le Silence Divin. L'amulette est un fragment du Voile de Cristal cristallisé. Elle permet à son porteur de percevoir ce qui se cache entre les plans, mais cette vision constante peut mener à la folie.",
    quest_hook: "Le Prophète Sans Nom des Terres Brûlées sait où elle se trouve — mais il faut mériter sa réponse."
  },
  {
    name: "Le Manteau des Mille Ombres",
    type: "Cape",
    rarity: "Légendaire",
    stats: { dex: 3, bonus: "Invisibilité parfaite dans toute zone de lumière faible ou ténèbres" },
    lore: "Confectionné par la Matriarche des Ombres, fondatrice de la Main Noire. Ce manteau est tissé à partir de fils d'ombre pure, collectés dans le Miroir des Ombres. Il rend son porteur invisible — y compris pour la magie de divination.",
    quest_hook: "La Matriarche actuelle le porte. Le voler est considéré comme le plus grand défi de la guilde."
  },
  {
    name: "La Couronne de Givre",
    type: "Couronne",
    rarity: "Artefact",
    stats: { con: 4, bonus: "Immunité au froid. Contrôle la glace sur un rayon de 30 cases." },
    lore: "La couronne du premier Jarl de Kuldahar, façonnée à partir de la glace du Gouffre d'Ymir qui ne fond jamais. Son porteur peut commander les tempêtes de neige, geler les lacs instantanément et marcher sur la glace comme sur du sol ferme. Mais elle murmure des pensées de conquête à son porteur.",
    quest_hook: "Le Marcheur Blanc la porte. La récupérer nécessite de le vaincre."
  },
  {
    name: "Le Grimoire de Kaelen",
    type: "Livre (Focus arcanique)",
    rarity: "Artefact",
    stats: { int: 4, bonus: "Contient 3 sorts uniques non-apprenables autrement" },
    lore: "Kaelen le Sage était le plus grand érudit de l'Hégémonie d'Ashka. Son grimoire contient non seulement des sorts d'une puissance inouïe, mais aussi l'histoire complète et véridique de la chute de l'Empire — une vérité que beaucoup tueraient pour garder secrète.",
    quest_hook: "Caché dans la Bibliothèque Engloutie sous le lac de Sol-Aureus. Kaelith la Tisseuse le cherche."
  }
];
