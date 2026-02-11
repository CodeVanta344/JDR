import React, { useState, useCallback } from 'react';
import { useKeyboardShortcuts, DEFAULT_GAME_SHORTCUTS } from '../hooks/useKeyboardShortcuts';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  isOpen,
  onClose,
}) => {
  const { getShortcutsByCategory, formatShortcut } = useKeyboardShortcuts({
    shortcuts: DEFAULT_GAME_SHORTCUTS,
  });

  const categories = getShortcutsByCategory();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1c1d22 0%, #0a0b0e 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          padding: '24px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '20px',
            color: '#d4af37',
            margin: 0,
          }}>
            Raccourcis Clavier
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: '#a0a0b0',
              cursor: 'pointer',
            }}
          >
            Fermer (Esc)
          </button>
        </div>

        {Object.entries(categories).map(([category, shortcuts]) => (
          <div key={category} style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              color: '#606070',
              marginBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '8px',
            }}>
              {category}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '8px',
            }}>
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.key + shortcut.description}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ color: '#a0a0b0', fontSize: '13px' }}>
                    {shortcut.description}
                  </span>
                  <kbd style={{
                    padding: '4px 8px',
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#d4af37',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}>
                    {formatShortcut(shortcut)}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: 'rgba(212, 175, 55, 0.1)',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <span style={{ color: '#a0a0b0', fontSize: '12px' }}>
            Astuce : Appuyez sur <kbd style={{
              padding: '2px 6px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '3px',
              fontSize: '10px',
            }}>F1</kbd> à tout moment pour afficher cette aide
          </span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp;
