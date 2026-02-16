import React, { useState, useMemo } from 'react';
import { Sword, Shield, Package, Scroll, Beaker, Gem, HelpCircle, X } from 'lucide-react';

const CATEGORIES = {
  all: { id: 'all', label: 'Tout', icon: Package, color: '#d4af37' },
  weapon: { id: 'weapon', label: 'Armes', icon: Sword, color: '#ff6b6b' },
  armor: { id: 'armor', label: 'Armures', icon: Shield, color: '#54a0ff' },
  consumable: { id: 'consumable', label: 'Consommables', icon: Beaker, color: '#4cd137' },
  quest: { id: 'quest', label: 'Quêtes', icon: Scroll, color: '#f39c12' },
  artifact: { id: 'artifact', label: 'Artefacts', icon: Gem, color: '#9b59b6' },
  other: { id: 'other', label: 'Autres', icon: HelpCircle, color: '#888' }
};

export const InventoryPanel = ({ inventory, onEquipItem, onConsume, onUpdateInventory }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  // Filtrer les items par catégorie
  const filteredItems = useMemo(() => {
    if (!inventory) return [];
    
    if (activeCategory === 'all') {
      // Séparer équipé vs non équipé
      const equipped = inventory.filter(item => item?.equipped);
      const unequipped = inventory.filter(item => item && !item.equipped);
      return [...equipped, ...unequipped];
    }
    
    return inventory.filter(item => {
      if (!item) return false;
      
      switch (activeCategory) {
        case 'weapon':
          return item.type === 'weapon';
        case 'armor':
          return item.type === 'armor' || ['shield', 'helmet', 'boots', 'gloves', 'cloak'].includes(item.type);
        case 'consumable':
          return ['consumable', 'potion', 'scroll', 'food'].includes(item.type);
        case 'quest':
          return item.type === 'quest' || item.questItem;
        case 'artifact':
          return item.type === 'artifact' || item.rarity === 'artifact' || item.rarity === 'legendary';
        default:
          return !['weapon', 'armor', 'consumable', 'potion', 'scroll', 'food', 'quest', 'artifact', 'shield', 'helmet', 'boots', 'gloves', 'cloak'].includes(item.type) && !item.questItem;
      }
    });
  }, [inventory, activeCategory]);

  // Compter les items par catégorie
  const counts = useMemo(() => {
    const count = (cat) => {
      if (!inventory) return 0;
      switch (cat) {
        case 'weapon': return inventory.filter(i => i?.type === 'weapon').length;
        case 'armor': return inventory.filter(i => i?.type === 'armor' || ['shield', 'helmet', 'boots', 'gloves', 'cloak'].includes(i?.type)).length;
        case 'consumable': return inventory.filter(i => ['consumable', 'potion', 'scroll', 'food'].includes(i?.type)).length;
        case 'quest': return inventory.filter(i => i?.type === 'quest' || i?.questItem).length;
        case 'artifact': return inventory.filter(i => i?.type === 'artifact' || i?.rarity === 'artifact' || i?.rarity === 'legendary').length;
        case 'other': return inventory.filter(i => !['weapon', 'armor', 'consumable', 'potion', 'scroll', 'food', 'quest', 'artifact', 'shield', 'helmet', 'boots', 'gloves', 'cloak'].includes(i?.type) && !i?.questItem).length;
        default: return inventory.filter(i => i).length;
      }
    };
    return {
      all: count('all'),
      weapon: count('weapon'),
      armor: count('armor'),
      consumable: count('consumable'),
      quest: count('quest'),
      artifact: count('artifact'),
      other: count('other')
    };
  }, [inventory]);

  const getItemRarityColor = (rarity) => {
    switch (rarity?.toLowerCase()) {
      case 'common': return '#888';
      case 'uncommon': return '#4cd137';
      case 'rare': return '#54a0ff';
      case 'epic': return '#9b59b6';
      case 'legendary': return '#f39c12';
      case 'artifact': return '#e74c3c';
      default: return '#aaa';
    }
  };

  const isConsumable = (item) => {
    return ['consumable', 'potion', 'scroll', 'food'].includes(item.type?.toLowerCase());
  };

  const isEquippable = (item) => {
    const equippableTypes = ['weapon', 'armor', 'shield', 'ring', 'amulet', 'boots', 'cloak', 'helmet', 'gloves', 'head', 'chest', 'mainhand', 'offhand'];
    return equippableTypes.includes(item.type?.toLowerCase()) || (item.slot && item.slot !== 'none' && item.slot !== 'consumable');
  };

  const handleUseItem = (item, index, e) => {
    e.stopPropagation();
    if (isConsumable(item) && onConsume) {
      onConsume(item, index);
    }
  };

  const handleEquipItem = (item, index, e) => {
    e.stopPropagation();
    if (onEquipItem) {
      onEquipItem(index);
    } else if (onUpdateInventory) {
      const newInv = inventory.map((invItem, idx) => 
        idx === index ? { ...invItem, equipped: !invItem.equipped } : invItem
      );
      onUpdateInventory(newInv);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.8rem' }}>
      {/* Barre de catégories style WoW */}
      <div style={{
        display: 'flex',
        gap: '0.3rem',
        padding: '0.4rem',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}>
        {Object.values(CATEGORIES).map((cat) => {
          const Icon = cat.icon;
          const count = counts[cat.id];
          const isActive = activeCategory === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                padding: '0.5rem 0.8rem',
                background: isActive ? `rgba(${parseInt(cat.color.slice(1,3),16)}, ${parseInt(cat.color.slice(3,5),16)}, ${parseInt(cat.color.slice(5,7),16)}, 0.2)` : 'transparent',
                border: isActive ? `2px solid ${cat.color}` : '2px solid transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: '60px',
                position: 'relative'
              }}
            >
              <Icon size={18} color={isActive ? cat.color : '#888'} />
              <span style={{
                fontSize: '0.6rem',
                color: isActive ? cat.color : '#888',
                fontWeight: isActive ? 'bold' : 'normal',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {cat.label}
              </span>
              {count > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: cat.color,
                  color: '#000',
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                  padding: '2px 5px',
                  borderRadius: '8px',
                  minWidth: '16px',
                  textAlign: 'center'
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grille d'items */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
        gap: '0.5rem',
        padding: '0.5rem',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {filteredItems.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '2rem',
            color: '#666',
            fontSize: '0.85rem'
          }}>
            Aucun objet dans cette catégorie
          </div>
        ) : (
          filteredItems.map((item, index) => {
            if (!item) return null;
            const rarityColor = getItemRarityColor(item.rarity);
            const equipped = item.equipped;
            
            return (
              <div
                key={index}
                onClick={() => setSelectedItem({ item, index })}
                style={{
                  aspectRatio: '1',
                  background: equipped 
                    ? `linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))` 
                    : `linear-gradient(135deg, rgba(${parseInt(rarityColor.slice(1,3),16)}, ${parseInt(rarityColor.slice(3,5),16)}, ${parseInt(rarityColor.slice(5,7),16)}, 0.15), rgba(0,0,0,0.3))`,
                  border: equipped ? '2px solid #d4af37' : `2px solid ${rarityColor}44`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.4rem',
                  position: 'relative',
                  transition: 'all 0.2s',
                  boxShadow: equipped ? '0 0 10px rgba(212,175,55,0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = rarityColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = equipped ? '#d4af37' : `${rarityColor}44`;
                }}
              >
                {/* Icon placeholder */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: `radial-gradient(circle, ${rarityColor}22, transparent)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>
                  {item.type === 'weapon' && '⚔️'}
                  {item.type === 'armor' && '🛡️'}
                  {['consumable', 'potion'].includes(item.type) && '🧪'}
                  {item.type === 'quest' && '📜'}
                  {item.type === 'artifact' && '💎'}
                  {['tool', 'material'].includes(item.type) && '📦'}
                </div>
                
                {/* Nom tronqué */}
                <span style={{
                  fontSize: '0.6rem',
                  color: equipped ? '#d4af37' : '#fff',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  fontWeight: equipped ? 'bold' : 'normal'
                }}>
                  {item.name.length > 12 ? item.name.slice(0, 10) + '...' : item.name}
                </span>

                {/* Badge équipé */}
                {equipped && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#d4af37',
                    color: '#000',
                    fontSize: '0.5rem',
                    fontWeight: 'bold',
                    padding: '1px 3px',
                    borderRadius: '3px'
                  }}>
                    ✓
                  </span>
                )}

                {/* Quantité */}
                {item.quantity > 1 && (
                  <span style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '4px',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    textShadow: '0 0 2px #000'
                  }}>
                    {item.quantity}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal de détails */}
      {selectedItem && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(20,20,30,0.98), rgba(10,10,15,0.98))',
              border: `2px solid ${getItemRarityColor(selectedItem.item.rarity)}`,
              borderRadius: '12px',
              padding: '1.5rem',
              maxWidth: '320px',
              width: '100%',
              boxShadow: `0 0 30px ${getItemRarityColor(selectedItem.item.rarity)}44`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{
                color: getItemRarityColor(selectedItem.item.rarity),
                margin: 0,
                fontSize: '1.1rem',
                textShadow: `0 0 10px ${getItemRarityColor(selectedItem.item.rarity)}44`
              }}>
                {selectedItem.item.name}
              </h3>
              <button 
                onClick={() => setSelectedItem(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  padding: '0.2rem'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Type & Rareté */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                color: '#aaa',
                textTransform: 'uppercase'
              }}>
                {selectedItem.item.type}
              </span>
              <span style={{
                background: `${getItemRarityColor(selectedItem.item.rarity)}22`,
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                color: getItemRarityColor(selectedItem.item.rarity),
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}>
                {selectedItem.item.rarity || 'common'}
              </span>
            </div>

            {/* Description */}
            <p style={{
              color: '#aaa',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              marginBottom: '1rem',
              fontStyle: 'italic'
            }}>
              {selectedItem.item.desc || selectedItem.item.description || 'Aucune description.'}
            </p>

            {/* Stats */}
            {selectedItem.item.stats && Object.keys(selectedItem.item.stats).length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.75rem', color: '#d4af37', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Statistiques</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {Object.entries(selectedItem.item.stats).map(([key, val]) => (
                    <span key={key} style={{
                      background: 'rgba(72,219,251,0.1)',
                      border: '1px solid rgba(72,219,251,0.3)',
                      color: '#48dbfb',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem'
                    }}>
                      {key}: {typeof val === 'number' && val > 0 ? `+${val}` : val}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Effects */}
            {selectedItem.item.effects && selectedItem.item.effects.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.75rem', color: '#4cd137', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Effets</h4>
                {selectedItem.item.effects.map((effect, i) => (
                  <div key={i} style={{
                    background: 'rgba(76,209,55,0.1)',
                    border: '1px solid rgba(76,209,55,0.2)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginBottom: '0.3rem',
                    fontSize: '0.8rem',
                    color: '#4cd137'
                  }}>
                    {effect.description}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {isEquippable(selectedItem.item) && (
                <button
                  onClick={(e) => {
                    handleEquipItem(selectedItem.item, selectedItem.index, e);
                    setSelectedItem(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.7rem',
                    background: selectedItem.item.equipped ? 'rgba(255,107,107,0.2)' : 'rgba(212,175,55,0.2)',
                    border: `1px solid ${selectedItem.item.equipped ? '#ff6b6b' : '#d4af37'}`,
                    color: selectedItem.item.equipped ? '#ff6b6b' : '#d4af37',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}
                >
                  {selectedItem.item.equipped ? 'Retirer' : 'Équiper'}
                </button>
              )}
              {isConsumable(selectedItem.item) && (
                <button
                  onClick={(e) => {
                    handleUseItem(selectedItem.item, selectedItem.index, e);
                    setSelectedItem(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.7rem',
                    background: 'rgba(84,160,255,0.2)',
                    border: '1px solid #54a0ff',
                    color: '#54a0ff',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}
                >
                  Utiliser
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPanel;
