import React, { useState, useCallback, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Note } from '../types';

interface NotesSystemProps {
  onClose?: () => void;
}

const NOTE_CATEGORIES = [
  { id: 'general', label: 'Général', icon: '📝' },
  { id: 'quest', label: 'Quêtes', icon: '📜' },
  { id: 'npc', label: 'PNJs', icon: '👤' },
  { id: 'location', label: 'Lieux', icon: '🗺️' },
  { id: 'item', label: 'Objets', icon: '⚔️' },
  { id: 'lore', label: 'Lore', icon: '📚' },
] as const;

const NoteEditor: React.FC<{
  note?: Note | null;
  onSave: (title: string, content: string, category: Note['category']) => void;
  onCancel: () => void;
}> = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState<Note['category']>(note?.category || 'general');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title.trim(), content.trim(), category);
  };

  return (
    <div style={{
      background: 'rgba(0,0,0,0.5)',
      borderRadius: '8px',
      padding: '16px',
      border: '1px solid rgba(212, 175, 55, 0.3)',
    }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la note..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '12px',
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px',
          color: '#f0f0f5',
          fontSize: '14px',
          fontFamily: "'Cinzel', serif",
        }}
      />

      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '12px',
        flexWrap: 'wrap',
      }}>
        {NOTE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              background: category === cat.id ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255,255,255,0.05)',
              color: category === cat.id ? '#d4af37' : '#a0a0b0',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu de la note..."
        style={{
          width: '100%',
          height: '200px',
          padding: '10px',
          marginBottom: '12px',
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px',
          color: '#f0f0f5',
          fontSize: '13px',
          resize: 'vertical',
          fontFamily: "'Inter', sans-serif",
          lineHeight: '1.5',
        }}
      />

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: '#a0a0b0',
            cursor: 'pointer',
          }}
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          disabled={!title.trim()}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            background: title.trim() 
              ? 'linear-gradient(135deg, #d4af37 0%, #8a6d3b 100%)' 
              : 'rgba(255,255,255,0.1)',
            color: title.trim() ? '#0a0b0e' : '#606070',
            fontWeight: '600',
            cursor: title.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

const NoteCard: React.FC<{
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}> = ({ note, onEdit, onDelete, onTogglePin }) => {
  const category = NOTE_CATEGORIES.find(c => c.id === note.category);

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        padding: '12px',
        border: `1px solid ${note.pinned ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255,255,255,0.1)'}`,
        marginBottom: '8px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '8px',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px',
          }}>
            {note.pinned && <span>📌</span>}
            <span style={{ fontSize: '14px' }}>{category?.icon}</span>
            <h4 style={{
              margin: 0,
              fontFamily: "'Cinzel', serif",
              fontSize: '14px',
              color: '#f0f0f5',
            }}>
              {note.title}
            </h4>
          </div>
          <span style={{
            fontSize: '10px',
            color: '#606070',
          }}>
            {new Date(note.updatedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={onTogglePin}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(255,255,255,0.05)',
              color: note.pinned ? '#d4af37' : '#606070',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            📌
          </button>
          <button
            onClick={onEdit}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(255,255,255,0.05)',
              color: '#a0a0b0',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(255,255,255,0.05)',
              color: '#ff6b6b',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {note.content && (
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: '#a0a0b0',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          maxHeight: '100px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {note.content}
        </p>
      )}
    </div>
  );
};

export const NotesSystem: React.FC<NotesSystemProps> = ({ onClose }) => {
  const { notes, addNote, updateNote, deleteNote } = useGameStore();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<Note['category'] | 'all'>('all');

  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => {
        const matchesSearch = !searchTerm || 
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || note.category === filterCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [notes, searchTerm, filterCategory]);

  const handleSaveNote = useCallback((title: string, content: string, category: Note['category']) => {
    const now = new Date().toISOString();
    
    if (editingNote) {
      updateNote(editingNote.id, {
        title,
        content,
        category,
        updatedAt: now,
      });
      setEditingNote(null);
    } else {
      addNote({
        id: `note_${Date.now()}`,
        title,
        content,
        category,
        pinned: false,
        createdAt: now,
        updatedAt: now,
      });
      setIsCreating(false);
    }
  }, [editingNote, addNote, updateNote]);

  const handleTogglePin = useCallback((noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      updateNote(noteId, { pinned: !note.pinned });
    }
  }, [notes, updateNote]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1c1d22 0%, #0a0b0e 100%)',
      borderRadius: '12px',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      padding: '16px',
      minWidth: '400px',
      maxWidth: '500px',
      maxHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <h3 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '18px',
          color: '#d4af37',
          margin: 0,
        }}>
          Notes
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsCreating(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, #d4af37 0%, #8a6d3b 100%)',
              color: '#0a0b0e',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            + Nouvelle note
          </button>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#a0a0b0',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {(isCreating || editingNote) ? (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={() => {
            setIsCreating(false);
            setEditingNote(null);
          }}
        />
      ) : (
        <>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher..."
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#f0f0f5',
                fontSize: '13px',
                marginBottom: '8px',
              }}
            />
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setFilterCategory('all')}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: 'none',
                  background: filterCategory === 'all' ? 'rgba(212, 175, 55, 0.3)' : 'transparent',
                  color: filterCategory === 'all' ? '#d4af37' : '#606070',
                  fontSize: '11px',
                  cursor: 'pointer',
                }}
              >
                Toutes
              </button>
              {NOTE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: filterCategory === cat.id ? 'rgba(212, 175, 55, 0.3)' : 'transparent',
                    color: filterCategory === cat.id ? '#d4af37' : '#606070',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  {cat.icon}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredNotes.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '32px',
                color: '#606070',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
                <p>{searchTerm ? 'Aucune note trouvée' : 'Aucune note'}</p>
                <p style={{ fontSize: '12px' }}>
                  Créez votre première note pour garder trace de vos aventures !
                </p>
              </div>
            ) : (
              filteredNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={() => setEditingNote(note)}
                  onDelete={() => deleteNote(note.id)}
                  onTogglePin={() => handleTogglePin(note.id)}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotesSystem;
