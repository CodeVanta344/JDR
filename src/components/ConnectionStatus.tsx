import React, { memo } from 'react';
import { useGameStore } from '../store/gameStore';

interface ConnectionStatusProps {
  showDetails?: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = memo(({ showDetails = false }) => {
  const { connStatus, onlineUsers, realTimeSync } = useGameStore();

  const statusConfig = {
    connecting: { color: '#ffc107', label: 'Connexion...', icon: '🔄' },
    connected: { color: '#4dff88', label: 'Connecté', icon: '✓' },
    polling: { color: '#ff9800', label: 'Mode dégradé', icon: '⚠️' },
    offline: { color: '#ff4d4d', label: 'Hors ligne', icon: '✕' },
  };

  const config = statusConfig[connStatus];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '20px',
      fontSize: '12px',
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: config.color,
        boxShadow: `0 0 8px ${config.color}`,
        animation: connStatus === 'connecting' ? 'pulse 1s infinite' : 'none',
      }} />
      
      <span style={{ color: config.color }}>
        {config.icon} {config.label}
      </span>

      {showDetails && realTimeSync && (
        <span style={{ color: '#606070' }}>
          | {onlineUsers.length} en ligne
        </span>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
});

ConnectionStatus.displayName = 'ConnectionStatus';

export default ConnectionStatus;
