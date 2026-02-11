import { useEffect, useCallback, useRef } from 'react';

type KeyboardShortcut = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
  category: string;
};

interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  shortcuts: KeyboardShortcut[];
}

export const useKeyboardShortcuts = ({
  enabled = true,
  shortcuts,
}: UseKeyboardShortcutsOptions) => {
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    for (const shortcut of shortcutsRef.current) {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault();
        shortcut.action();
        return;
      }
    }
  }, [enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const getShortcutsByCategory = useCallback(() => {
    const categories: Record<string, KeyboardShortcut[]> = {};
    for (const shortcut of shortcutsRef.current) {
      if (!categories[shortcut.category]) {
        categories[shortcut.category] = [];
      }
      categories[shortcut.category].push(shortcut);
    }
    return categories;
  }, []);

  const formatShortcut = useCallback((shortcut: KeyboardShortcut): string => {
    const parts: string[] = [];
    if (shortcut.ctrl) parts.push('Ctrl');
    if (shortcut.shift) parts.push('Shift');
    if (shortcut.alt) parts.push('Alt');
    parts.push(shortcut.key.toUpperCase());
    return parts.join(' + ');
  }, []);

  return {
    shortcuts: shortcutsRef.current,
    getShortcutsByCategory,
    formatShortcut,
  };
};

export const DEFAULT_GAME_SHORTCUTS: KeyboardShortcut[] = [
  { key: 'i', action: () => {}, description: 'Ouvrir l\'inventaire', category: 'Interface' },
  { key: 'c', action: () => {}, description: 'Ouvrir la fiche personnage', category: 'Interface' },
  { key: 'j', action: () => {}, description: 'Ouvrir le journal de quêtes', category: 'Interface' },
  { key: 'm', action: () => {}, description: 'Ouvrir la carte', category: 'Interface' },
  { key: 'n', action: () => {}, description: 'Ouvrir les notes', category: 'Interface' },
  { key: 'Escape', action: () => {}, description: 'Fermer la fenêtre active', category: 'Interface' },
  { key: '1', action: () => {}, description: 'Capacité 1', category: 'Combat' },
  { key: '2', action: () => {}, description: 'Capacité 2', category: 'Combat' },
  { key: '3', action: () => {}, description: 'Capacité 3', category: 'Combat' },
  { key: '4', action: () => {}, description: 'Capacité 4', category: 'Combat' },
  { key: 'Space', action: () => {}, description: 'Fin du tour', category: 'Combat' },
  { key: 'Tab', action: () => {}, description: 'Cycler les cibles', category: 'Combat' },
  { key: 'Enter', action: () => {}, description: 'Envoyer message', category: 'Chat' },
  { key: '/', action: () => {}, description: 'Focus sur le chat', category: 'Chat' },
  { key: 'F1', action: () => {}, description: 'Aide / Raccourcis', category: 'Système' },
  { key: 's', ctrl: true, action: () => {}, description: 'Sauvegarder', category: 'Système' },
];
