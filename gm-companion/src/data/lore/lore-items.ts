/**
 * LORE — ARTEFACTS & OBJETS LÉGENDAIRES D'AETHELGARD
 *
 * Armes, reliques, objets de quête, et trésors.
 * Chaque item a une histoire, une mécanique, et un lien avec le récit.
 */

export interface LegendaryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'relic' | 'consumable' | 'quest_item' | 'artifact';
  /** Rareté D&D */
  rarity: 'peu commun' | 'rare' | 'très rare' | 'légendaire' | 'artefact';
  /** Description physique */
  appearance: string;
  /** Histoire de l'objet */
  lore: string;
  /** Propriétés mécaniques */
  properties: string;
  /** Où le trouver */
  foundIn: string;
  /** Chapitre où il apparaît */
  chapter: string;
  /** Prérequis pour l'utiliser */
  attunement?: string;
}

export const LEGENDARY_ITEMS: LegendaryItem[] = [
  // ============================
  // ARMES DES HÉROS
  // ============================
  {
    id: 'item_marteau_sacre', name: 'Marteau-Sacré de Thorek', type: 'weapon', rarity: 'légendaire',
    appearance: 'Marteau de guerre en mithril pur. La tête est gravée de runes de lumière qui pulsent. Le manche est en bois de l\'Arbre-Monde, noirci par le sacrifice de Thorek. Pèse 3kg mais se manie comme s\'il en pesait 1.',
    lore: 'Forgé par Thorek Marteau-Sacré lui-même pour ancrer les Sceaux. C\'est la dernière arme qu\'il a forgée — ses mains se sont pétrifiées en posant le dernier Sceau. Le marteau est resté à Hammerdeep, dans la Galerie des Héros, considéré comme une relique intouchable.',
    properties: 'Marteau de guerre +3. Dégâts : 1d8+3 contondant + 2d6 radiant contre les créatures d\'ombre. Propriété spéciale : "Ancrage" — une fois par jour, peut stabiliser un Sceau endommagé (empêche sa destruction pendant 24h). Nécessite harmonisation.',
    foundIn: 'Galerie des Héros, Hammerdeep (Niv. 22). Le Thane peut l\'offrir si les joueurs prouvent leur valeur (Ch5).',
    chapter: 'ch5',
    attunement: 'Créature d\'alignement bon qui a accompli un acte de sacrifice personnel.'
  },
  {
    id: 'item_arc_aelindra', name: 'Arc de Lamentation d\'Aelindra', type: 'weapon', rarity: 'très rare',
    appearance: 'Arc long en bois argenté qui pleure des larmes de sève quand on le tend. La corde est un cheveu d\'Aelindra elle-même — il brille dans l\'obscurité.',
    lore: 'Aelindra l\'Éternelle a abandonné cet arc dans la Sylve après avoir perdu sa mémoire. Il contient les échos de ses sorts les plus puissants — mais aussi sa mélancolie.',
    properties: 'Arc long +2. Portée 180/600. Dégâts : 1d8+2 perçant. Propriété spéciale : "Flèche de Mémoire" — 3 fois par jour, une flèche peut forcer une créature à se souvenir d\'un moment de paix (Sagesse DC 17 ou étourdi 1 round). Contre les morts-vivants : 3d6 radiant supplémentaires.',
    foundIn: 'Un arbre creux dans la Clairière de Mémoire (Sylve d\'Émeraude). Lysandra peut guider les PJ si la relation est bonne.',
    chapter: 'ch7',
    attunement: 'Créature qui peut utiliser des armes à distance.'
  },
  {
    id: 'item_epee_valorien', name: 'Aube Dorée — Épée de Valorien', type: 'weapon', rarity: 'légendaire',
    appearance: 'Épée longue en acier doré. La lame émet une lueur dorée constante (10ft de lumière vive, 10ft de lumière faible). La garde est en forme d\'ailes de phoenix.',
    lore: 'L\'épée personnelle de Valorien le Juste, forgée dans le Cœur du Soleil par les prêtres de Solarius. Valorien l\'a portée lors de l\'assaut final contre le dernier portail d\'ombre. Après la guerre, il l\'a confiée au Temple de Solarius.',
    properties: 'Épée longue +3. Dégâts : 1d8+3 tranchant + 1d6 feu. Vs créatures d\'ombre : +2d6 radiant. Propriété : "Aube" — une fois par jour, peut émettre une Lumière du Jour (rayon 120ft) qui repousse les ombres et dissipe les illusions.',
    foundIn: 'Crypte secrète sous le Temple de Solarius. Le Grand Prêtre Alduin la confie aux joueurs avant la Bataille de Sombrelune (Ch9).',
    chapter: 'ch9',
    attunement: 'Créature d\'alignement bon.'
  },

  // ============================
  // RELIQUES DES SCEAUX
  // ============================
  {
    id: 'item_rameau_vie', name: 'Le Rameau de Vie', type: 'relic', rarity: 'artefact',
    appearance: 'Bâton de bois blanc noueux, couvert de bourgeons qui fleurissent et fanent en continu. Émet une fragrance de fleurs sauvages. Chaud au toucher, comme un être vivant.',
    lore: 'Le bâton sacré de Liora la Guérisseuse, 7ème des Sept Héros. Elle l\'a utilisé pour maintenir les autres en vie pendant les 7 jours du rituel. Après sa mort (de vieillesse accélérée), le bâton a été enseveli avec elle dans le Temple Submergé du Lac d\'Ashka.',
    properties: 'Bâton +3, focaliseur arcanique. Propriété unique : "Restauration de Sceau" — peut restaurer UN Sceau brisé en canalisant l\'énergie vitale du porteur (coûte 50% des HP max permanents, récupérables uniquement par un Souhait). Guérison : 3 charges de Soins de Groupe (5d8+5) par jour.',
    foundIn: 'Temple Submergé du Lac d\'Ashka. Nécessite une plongée ou l\'accès par le tunnel secret. Gardé par le spectre bienveillant de Liora.',
    chapter: 'ch6',
    attunement: 'Lanceur de sorts de guérison (Clerc, Druide, Barde).'
  },
  {
    id: 'item_cristal_noir', name: 'Cristal Noir (du Culte)', type: 'quest_item', rarity: 'rare',
    appearance: 'Cristal de quartz noir de 30cm, veiné de rouge. Froid au toucher. Projette des ombres même en pleine lumière. On entend un murmure en le tenant.',
    lore: 'Les Cristaux Noirs sont des fragments du Plan Ombre cristallisés. Le Culte du Miroir Brisé les utilise pour corrompre les Sceaux — en plantant un cristal dans l\'ancre d\'un Sceau et en chantant l\'incantation inverse pendant 7 jours, le Sceau se fissure.',
    properties: 'Objet de quête — pas d\'utilisation directe par les PJ. Contact prolongé (1h+) cause 1 niveau d\'épuisement. Les analystes magiques (Détection de la Magie, Identification) révèlent une aura de nécromancie et d\'abjuration inversée.',
    foundIn: 'Trouvé sur Voss (Ch2), dans les ruines d\'Ashka (Ch6), et dans la Tour de Malachor (Ch10).',
    chapter: 'ch2'
  },
  {
    id: 'item_amulette_sentinelle', name: 'Amulette des Sentinelles', type: 'relic', rarity: 'rare',
    appearance: 'Médaillon en argent en forme de bouclier avec un œil ouvert au centre. La chaîne est en mithril. Vibre quand un Sceau est menacé.',
    lore: 'Chaque Sentinelle des Sceaux portait cette amulette. Il en existe 200, mais la plupart sont perdues. Théodore en possède 5 — il les donne aux joueurs (Ch2).',
    properties: 'Amulette. Propriétés : (1) Détection de corruption d\'ombre dans un rayon de 30ft (l\'amulette brille). (2) Résistance aux dégâts nécrotiques. (3) Communication entre amulettes — les porteurs peuvent se parler à distance illimitée (1 min/jour). Nécessite harmonisation.',
    foundIn: 'Donnée par Théodore aux joueurs lors de leur nomination comme Sentinelles (Ch2).',
    chapter: 'ch2',
    attunement: 'Toute créature ayant accepté le Titre de Sentinelle.'
  },

  // ============================
  // ARTEFACTS UNIQUES
  // ============================
  {
    id: 'item_coeur_soleil', name: 'Le Cœur du Soleil', type: 'artifact', rarity: 'artefact',
    appearance: 'Gemme dorée de la taille d\'un poing, parfaitement sphérique. Émet une lumière chaude et constante (equivalent Lumière du Jour 300ft). Flotte dans l\'air quand elle n\'est pas contenue.',
    lore: 'Fragment de la Première Lueur de Solarius, tombé du ciel lors de la Création. Aurèlius Ier l\'a trouvé et a fondé Sol-Aureus autour. Depuis, il illumine la ville depuis la flèche du Temple de Solarius.',
    properties: 'Artefact unique — ne peut pas être "possédé" normalement. Propriétés passives : lumière permanente, suppression des morts-vivants dans 300ft (désavantage à tous les jets), régénération lente des êtres vivants (1 HP/heure). Propriété active (prêtre de Solarius uniquement) : une fois JAMAIS, peut générer un Rayon Solaire dévastateur (20d6 radiant, cône de 200ft). Détruit le Cœur.',
    foundIn: 'Temple de Solarius, Sol-Aureus. Enchâssé dans la flèche. Ne peut être retiré que par un acte de volonté collective.',
    chapter: 'ch9'
  },
  {
    id: 'item_miroir_ombre', name: 'Le Miroir de l\'Ombre', type: 'artifact', rarity: 'artefact',
    appearance: 'Miroir rectangulaire de 5m de haut en verre noir. Le cadre est de pierre volcanique gravée de runes inversées. Reflète le Plan Ombre au lieu du monde réel.',
    lore: 'Créé involontairement pendant le rituel de scellement. Fragment cristallisé de la conscience d\'Ombréus. C\'est à la fois une prison et un portail — selon comment on l\'utilise.',
    properties: 'Artefact plot — ne peut pas être utilisé par les PJ directement. Propriétés narratives : (1) Montre le Plan Ombre. (2) Projette des émotions (mélancolie, désespoir). (3) Amplifie la brisure des Sceaux. (4) Peut être transformé en prison permanente par un sacrifice volontaire. Ne peut PAS être détruit par la force.',
    foundIn: 'Mont Sombrelune — Salle du Miroir (Ch11).',
    chapter: 'ch11'
  },
  {
    id: 'item_cape_ombre', name: 'Cape du Marcheur de Nuit', type: 'armor', rarity: 'très rare',
    appearance: 'Cape de tissu noir qui semble absorber la lumière. Se fond dans les ombres naturelles. Se soulève légèrement comme agitée par un vent invisible.',
    lore: 'Fabriquée à partir du tissu d\'un Marcheur de Nuit tué. Les éclaireurs de la Guerre de l\'Ombre en portaient — la plupart ont été détruites après la guerre par peur de la corruption. Quelques-unes subsistent.',
    properties: 'Cape. AC +1. Avantage aux jets de Discrétion dans l\'obscurité ou la pénombre. Propriété : "Pas d\'Ombre" — une fois par repos long, le porteur peut se téléporter de 30ft entre deux zones de pénombre/obscurité. Malus : le porteur fait des cauchemars (jet de Sagesse DC 12 chaque repos long ou pas de bénéfice du repos).',
    foundIn: 'Loot possible : sur Gorvan (Ch6) ou dans la Tour de Malachor (Ch10).',
    chapter: 'ch6'
  },

  // ============================
  // CONSOMMABLES & OBJETS DE QUÊTE
  // ============================
  {
    id: 'item_potion_soleil', name: 'Potion de Soleil Liquide', type: 'consumable', rarity: 'peu commun',
    appearance: 'Fiole en verre transparent contenant un liquide doré lumineux. Crépite comme un mini-soleil.',
    lore: 'Brassée par les alchimistes du Temple de Solarius. Utilisée contre les créatures d\'ombre pendant la Guerre.',
    properties: 'Potion. Effet : Guérit 4d4+4 HP. Effet spécial : Les créatures d\'ombre dans un rayon de 10ft subissent 2d6 radiant quand la potion est consommée (pas de jet de sauvegarde).',
    foundIn: 'Achetable au Temple de Solarius (50 pièces d\'or) ou au Bazar des Aventuriers (75 po — marge du revendeur).',
    chapter: 'ch1'
  },
  {
    id: 'item_rune_garde', name: 'Pierre Runique de Garde', type: 'consumable', rarity: 'peu commun',
    appearance: 'Pierre plate gravée d\'une rune de protection naine. Brille faiblement en rouge.',
    lore: 'Les nains de Hammerdeep utilisent ces pierres pour marquer les zones sûres dans les mines. Elles émettent une alarme si une créature hostile entre dans le périmètre.',
    properties: 'Objet à usage unique. Poser la pierre crée une zone d\'alarme de 30ft de rayon (comme le sort Alarme). Dure 8h ou jusqu\'à déclenchement. Les créatures d\'ombre déclenchent l\'alarme même si elles sont invisibles.',
    foundIn: 'Donné par Borin (Ch4) ou achetable au Hall du Marteau de Hammerdeep (25 pièces d\'or).',
    chapter: 'ch4'
  },
  {
    id: 'item_eau_clarté', name: 'Eau de la Source de Clarté', type: 'consumable', rarity: 'rare',
    appearance: 'Eau cristalline dans un flacon de verre bleu. Brille faiblement sous la lune.',
    lore: 'Puisée à la Source de Clarté dans la Forêt de Murmures — une larme de Sélénia, la Mère-Lune. Guérit les maladies et purifie les poisons.',
    properties: 'Flacon. Effet : Guérison de maladie mineure OU neutralisation d\'un poison OU restauration de 2d10 HP. Si bénie par un prêtre de Sélénia : devient de l\'eau sainte permanente (2d6 radiant vs morts-vivants/fiélons).',
    foundIn: 'Source de Clarté, Forêt de Murmures. Beren l\'Ermite en donne aux joueurs s\'ils sont respectueux.',
    chapter: 'ch2'
  },
  {
    id: 'item_journal_malachor', name: 'Journal de Malachor', type: 'quest_item', rarity: 'rare',
    appearance: 'Livre relié en cuir noir, pages jaunies. L\'encre est rouge foncé (sang + encre alchimique). Les pages frémissent quand on les touche.',
    lore: 'Le journal personnel de Malachor le Sage, 4ème des Sept Héros. Contient ses recherches sur le Plan Ombre, ses doutes sur le rituel, et les coordonnées exactes de chaque Sceau. Malachi l\'a copié — l\'original est toujours dans la Tour de Malachor.',
    properties: 'Objet de quête. Contenu lisible (Arcanes DC 15) : cartes des Sceaux, formule du rituel de scellement (partielle), notes sur le Miroir de l\'Ombre. Propriété cachée : certaines pages sont écrites en encre invisible révélable uniquement par la lumière du Cœur du Soleil — elles contiennent la PROCÉDURE pour transformer le Miroir en prison permanente.',
    foundIn: 'Tour de Malachor, Plaines Mortes (Ch10).',
    chapter: 'ch10'
  }
];
