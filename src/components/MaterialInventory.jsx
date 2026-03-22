import React from 'react';
import { ALL_RESOURCES } from '../lore/resources';

export const MaterialInventory = ({ materialInventory = {} }) => {
  const totalItems = Object.values(materialInventory).reduce((a, b) => a + b, 0);
  
  if (totalItems === 0) {
    return (
      <div style={{ 
        marginBottom: '1.5rem', 
        padding: '1rem', 
        background: 'rgba(0,0,0,0.2)', 
        borderRadius: '8px', 
        border: '1px solid rgba(139,115,85,0.2)' 
      }}>
        <h5 style={{ 
          fontSize: '0.75rem', 
          color: '#d4af37', 
          marginBottom: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.4rem' 
        }}>
          <span>📦</span>
          <span>Sac de Matériaux</span>
          <span style={{ fontSize: '0.6rem', color: '#888', fontWeight: 'normal' }}>
            (0 items)
          </span>
        </h5>
        <div style={{ textAlign: 'center', padding: '1rem', color: '#666', fontSize: '0.75rem' }}>
          Aucun matériau. Allez récolter !
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      marginBottom: '1.5rem', 
      padding: '1rem', 
      background: 'rgba(0,0,0,0.2)', 
      borderRadius: '8px', 
      border: '1px solid rgba(139,115,85,0.2)' 
    }}>
      <h5 style={{ 
        fontSize: '0.75rem', 
        color: '#d4af37', 
        marginBottom: '0.8rem', 
        textTransform: 'uppercase', 
        letterSpacing: '1px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.4rem' 
      }}>
        <span>📦</span>
        <span>Sac de Matériaux</span>
        <span style={{ fontSize: '0.6rem', color: '#888', fontWeight: 'normal' }}>
          ({totalItems} items)
        </span>
      </h5>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.5rem' }}>
        {Object.entries(materialInventory).map(([resourceId, quantity]) => {
          const resource = ALL_RESOURCES.find(r => r.id === resourceId);
          if (!resource) return null;
          return (
            <div key={resourceId} style={{
              padding: '0.5rem',
              background: 'rgba(139,115,85,0.1)',
              borderRadius: '6px',
              border: '1px solid rgba(139,115,85,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>{resource.icon || '📦'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  fontSize: '0.7rem', 
                  color: '#d4af37', 
                  fontWeight: 'bold', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis' 
                }}>
                  {resource.name}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#4cd137' }}>
                  x{quantity}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialInventory;
