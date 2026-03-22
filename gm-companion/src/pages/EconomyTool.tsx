import { ECONOMY_CONSTANTS } from '@lore/economy-system'

const PRICE_TABLE = [
  { cat: '⚔️ Armes', items: [
    { name: 'Dague', price: ECONOMY_CONSTANTS.BASE_PRICES.weapon_dagger, rarity: 'common' },
    { name: 'Épée courte', price: ECONOMY_CONSTANTS.BASE_PRICES.weapon_sword_short, rarity: 'common' },
    { name: 'Épée longue', price: ECONOMY_CONSTANTS.BASE_PRICES.weapon_sword_long, rarity: 'common' },
    { name: 'Grande épée', price: ECONOMY_CONSTANTS.BASE_PRICES.weapon_sword_great, rarity: 'uncommon' },
    { name: 'Hache', price: ECONOMY_CONSTANTS.BASE_PRICES.weapon_axe, rarity: 'common' },
    { name: 'Arc', price: ECONOMY_CONSTANTS.BASE_PRICES.weapon_bow, rarity: 'common' },
    { name: 'Arbalète', price: ECONOMY_CONSTANTS.BASE_PRICES.weapon_crossbow, rarity: 'uncommon' },
    { name: 'Bâton', price: ECONOMY_CONSTANTS.BASE_PRICES.weapon_staff, rarity: 'common' },
  ]},
  { cat: '🛡️ Armures', items: [
    { name: 'Robe / Tissu', price: ECONOMY_CONSTANTS.BASE_PRICES.armor_cloth, rarity: 'common' },
    { name: 'Cuir', price: ECONOMY_CONSTANTS.BASE_PRICES.armor_leather, rarity: 'common' },
    { name: 'Cotte de mailles', price: ECONOMY_CONSTANTS.BASE_PRICES.armor_chainmail, rarity: 'uncommon' },
    { name: 'Plate', price: ECONOMY_CONSTANTS.BASE_PRICES.armor_plate, rarity: 'rare' },
    { name: 'Bouclier léger', price: ECONOMY_CONSTANTS.BASE_PRICES.armor_shield_light, rarity: 'common' },
    { name: 'Bouclier lourd', price: ECONOMY_CONSTANTS.BASE_PRICES.armor_shield_heavy, rarity: 'uncommon' },
  ]},
  { cat: '🧪 Consommables', items: [
    { name: 'Potion Vie (mineure)', price: ECONOMY_CONSTANTS.BASE_PRICES.potion_health_minor, rarity: 'common' },
    { name: 'Potion Vie (majeure)', price: ECONOMY_CONSTANTS.BASE_PRICES.potion_health_major, rarity: 'uncommon' },
    { name: 'Potion Mana (mineure)', price: ECONOMY_CONSTANTS.BASE_PRICES.potion_mana_minor, rarity: 'common' },
    { name: 'Potion Mana (majeure)', price: ECONOMY_CONSTANTS.BASE_PRICES.potion_mana_major, rarity: 'uncommon' },
    { name: 'Nourriture basique', price: ECONOMY_CONSTANTS.BASE_PRICES.food_basic, rarity: 'common' },
  ]},
]

const RARITY_CLASSES: Record<string, string> = {
  common: 'tag-green', uncommon: 'tag-skill', rare: 'tag-magic', epic: 'tag-might', legendary: 'tag-gold', artifact: 'tag-red'
}

const LEVEL_INCOME = [
  { levels: '1-4', questReward: '50-200 PO', passiveIncome: '5-10 PO/jour' },
  { levels: '5-8', questReward: '200-800 PO', passiveIncome: '10-25 PO/jour' },
  { levels: '9-12', questReward: '800-3000 PO', passiveIncome: '25-50 PO/jour' },
  { levels: '13-16', questReward: '3000-10000 PO', passiveIncome: '50-100 PO/jour' },
  { levels: '17-20', questReward: '10000-50000 PO', passiveIncome: '100-300 PO/jour' },
  { levels: '21-30', questReward: '50000+ PO', passiveIncome: '300+ PO/jour' },
]

export default function EconomyTool() {
  return (
    <div>
      <div className="page-header">
        <h1>💰 Système Économique</h1>
        <p>Monnaie, prix, marchands et revenus d'Aethelgard</p>
      </div>

      {/* Starting gold */}
      <div className="card" style={{ marginBottom: 24, borderColor: 'var(--border-gold)' }}>
        <h3 style={{ marginBottom: 8 }}>🪙 Or de Départ</h3>
        <div style={{ display: 'flex', gap: 32, fontSize: '1.1rem', fontFamily: 'var(--font-title)' }}>
          <span>Min : <strong style={{ color: 'var(--gold)' }}>{ECONOMY_CONSTANTS.STARTING_GOLD.MIN} PO</strong></span>
          <span>Moy : <strong style={{ color: 'var(--gold)' }}>{ECONOMY_CONSTANTS.STARTING_GOLD.AVERAGE} PO</strong></span>
          <span>Max : <strong style={{ color: 'var(--gold)' }}>{ECONOMY_CONSTANTS.STARTING_GOLD.MAX} PO</strong></span>
        </div>
      </div>

      {/* Price categories */}
      <h2>Prix de Base par Catégorie</h2>
      {PRICE_TABLE.map(cat => (
        <div key={cat.cat} className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 8 }}>{cat.cat}</h3>
          <table>
            <thead>
              <tr><th>Objet</th><th>Prix (PO)</th><th>Rareté</th></tr>
            </thead>
            <tbody>
              {cat.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td style={{ color: 'var(--gold)', fontFamily: 'var(--font-title)' }}>{item.price}</td>
                  <td><span className={`tag ${RARITY_CLASSES[item.rarity] || 'tag-gold'}`}>{item.rarity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Rarity multipliers */}
      <h2>Multiplicateurs de Rareté</h2>
      <div className="card" style={{ marginBottom: 24 }}>
        <table>
          <thead>
            <tr><th>Rareté</th><th style={{ textAlign: 'center' }}>Multiplicateur</th></tr>
          </thead>
          <tbody>
            {Object.entries(ECONOMY_CONSTANTS.PRICE_MULTIPLIERS).map(([r, m]) => (
              <tr key={r}>
                <td style={{ textTransform: 'capitalize' }}>{r}</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--font-title)', color: 'var(--gold)' }}>×{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Level income */}
      <h2>Revenus par Niveau</h2>
      <div className="card">
        <table>
          <thead>
            <tr><th>Niveaux</th><th>Récompense/Quête</th><th>Revenus Passifs</th></tr>
          </thead>
          <tbody>
            {LEVEL_INCOME.map((li, i) => (
              <tr key={i}>
                <td>{li.levels}</td>
                <td style={{ color: 'var(--gold)' }}>{li.questReward}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{li.passiveIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
