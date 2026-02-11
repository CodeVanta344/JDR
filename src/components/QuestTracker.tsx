import React, { useState, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Quest, QuestObjective } from '../types';

interface QuestTrackerProps {
  onQuestSelect?: (quest: Quest) => void;
  onQuestComplete?: (quest: Quest) => void;
  compact?: boolean;
}

const QuestStatusBadge: React.FC<{ status: Quest['status'] }> = ({ status }) => {
  const colors = {
    available: { bg: '#4da6ff33', text: '#4da6ff', label: 'Disponible' },
    active: { bg: '#d4af3733', text: '#d4af37', label: 'En cours' },
    completed: { bg: '#4dff8833', text: '#4dff88', label: 'Terminée' },
    failed: { bg: '#ff4d4d33', text: '#ff4d4d', label: 'Échouée' },
  };
  const style = colors[status];

  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase',
      background: style.bg,
      color: style.text,
    }}>
      {style.label}
    </span>
  );
};

const ObjectiveItem: React.FC<{ objective: QuestObjective }> = ({ objective }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0',
    color: objective.completed ? '#4dff88' : '#a0a0b0',
    fontSize: '13px',
  }}>
    <span style={{
      width: '16px',
      height: '16px',
      borderRadius: '4px',
      border: `2px solid ${objective.completed ? '#4dff88' : '#606070'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
    }}>
      {objective.completed ? '✓' : ''}
    </span>
    <span style={{ textDecoration: objective.completed ? 'line-through' : 'none' }}>
      {objective.description}
    </span>
    {objective.target && (
      <span style={{ marginLeft: 'auto', color: '#606070' }}>
        {objective.current || 0}/{objective.target}
      </span>
    )}
  </div>
);

const QuestCard: React.FC<{
  quest: Quest;
  expanded: boolean;
  onToggle: () => void;
  onSelect?: () => void;
}> = ({ quest, expanded, onToggle, onSelect }) => (
  <div
    style={{
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '8px',
      border: '1px solid rgba(212, 175, 55, 0.2)',
      marginBottom: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}
    onClick={onToggle}
  >
    <div style={{
      padding: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #d4af37 0%, #8a6d3b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
      }}>
        {quest.type === 'Enquête' ? '🔍' :
         quest.type === 'Combat' ? '⚔️' :
         quest.type === 'Exploration' ? '🗺️' :
         quest.type === 'Social' ? '💬' :
         quest.type === 'Escorte' ? '🛡️' : '📜'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontWeight: '600',
          color: '#f0f0f5',
          marginBottom: '4px',
        }}>
          {quest.title}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <QuestStatusBadge status={quest.status} />
          {quest.level && (
            <span style={{ fontSize: '11px', color: '#606070' }}>
              Niv. {quest.level}
            </span>
          )}
        </div>
      </div>
      <div style={{
        transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 0.2s',
        color: '#a0a0b0',
      }}>
        ▼
      </div>
    </div>

    {expanded && (
      <div style={{
        padding: '0 12px 12px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <p style={{
          color: '#a0a0b0',
          fontSize: '13px',
          margin: '12px 0',
          lineHeight: '1.5',
        }}>
          {quest.description}
        </p>

        {quest.giver && (
          <div style={{ fontSize: '12px', color: '#606070', marginBottom: '8px' }}>
            <strong>Donneur:</strong> {quest.giver}
          </div>
        )}

        {quest.objectives && quest.objectives.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              color: '#606070',
              marginBottom: '8px',
              fontWeight: '600',
            }}>
              Objectifs
            </div>
            {quest.objectives.map((obj) => (
              <ObjectiveItem key={obj.id} objective={obj} />
            ))}
          </div>
        )}

        {quest.rewards && (
          <div style={{
            marginTop: '12px',
            padding: '8px',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '4px',
            display: 'flex',
            gap: '16px',
          }}>
            {quest.rewards.gold && (
              <span style={{ fontSize: '12px', color: '#d4af37' }}>
                💰 {quest.rewards.gold} Or
              </span>
            )}
            {quest.rewards.xp && (
              <span style={{ fontSize: '12px', color: '#4da6ff' }}>
                ✨ {quest.rewards.xp} XP
              </span>
            )}
          </div>
        )}

        {onSelect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '8px',
              background: 'linear-gradient(135deg, #d4af37 0%, #8a6d3b 100%)',
              border: 'none',
              borderRadius: '4px',
              color: '#0a0b0e',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Voir les détails
          </button>
        )}
      </div>
    )}
  </div>
);

export const QuestTracker: React.FC<QuestTrackerProps> = ({
  onQuestSelect,
  onQuestComplete,
  compact = false,
}) => {
  const { quests, updateQuest, addQuest } = useGameStore();
  const [expandedQuest, setExpandedQuest] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');

  const filteredQuests = quests.filter(q => {
    if (filter === 'all') return true;
    if (filter === 'active') return q.status === 'active' || q.status === 'available';
    if (filter === 'completed') return q.status === 'completed';
    return true;
  });

  const activeQuests = quests.filter(q => q.status === 'active');

  const handleToggleObjective = useCallback((questId: string, objectiveId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || !quest.objectives) return;

    const updatedObjectives = quest.objectives.map(obj =>
      obj.id === objectiveId ? { ...obj, completed: !obj.completed } : obj
    );

    const allCompleted = updatedObjectives.every(obj => obj.completed);
    updateQuest(questId, {
      objectives: updatedObjectives,
      status: allCompleted ? 'completed' : 'active',
    });

    if (allCompleted) {
      onQuestComplete?.(quest);
    }
  }, [quests, updateQuest, onQuestComplete]);

  if (compact) {
    return (
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '8px',
        padding: '8px',
        maxWidth: '250px',
      }}>
        <div style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          color: '#d4af37',
          marginBottom: '8px',
          fontWeight: '600',
        }}>
          Quêtes Actives ({activeQuests.length})
        </div>
        {activeQuests.slice(0, 3).map(quest => (
          <div
            key={quest.id}
            style={{
              padding: '6px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '4px',
              marginBottom: '4px',
              fontSize: '12px',
              color: '#f0f0f5',
              cursor: 'pointer',
            }}
            onClick={() => onQuestSelect?.(quest)}
          >
            {quest.title}
          </div>
        ))}
        {activeQuests.length > 3 && (
          <div style={{ fontSize: '11px', color: '#606070', textAlign: 'center' }}>
            +{activeQuests.length - 3} autres
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1c1d22 0%, #0a0b0e 100%)',
      borderRadius: '12px',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      padding: '16px',
      minWidth: '320px',
      maxHeight: '500px',
      overflow: 'auto',
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
          Journal de Quêtes
        </h3>
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                background: filter === f ? 'rgba(212, 175, 55, 0.3)' : 'transparent',
                color: filter === f ? '#d4af37' : '#606070',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'Toutes' : f === 'active' ? 'Actives' : 'Terminées'}
            </button>
          ))}
        </div>
      </div>

      {filteredQuests.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '32px',
          color: '#606070',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📜</div>
          <p>Aucune quête {filter === 'active' ? 'en cours' : filter === 'completed' ? 'terminée' : ''}</p>
        </div>
      ) : (
        filteredQuests.map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            expanded={expandedQuest === quest.id}
            onToggle={() => setExpandedQuest(
              expandedQuest === quest.id ? null : quest.id
            )}
            onSelect={() => onQuestSelect?.(quest)}
          />
        ))
      )}
    </div>
  );
};

export default QuestTracker;
