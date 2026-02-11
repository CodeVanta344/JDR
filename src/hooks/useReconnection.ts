import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../supabase';
import { useGameStore } from '../store/gameStore';

interface UseReconnectionOptions {
  onReconnect?: () => void;
  onDisconnect?: () => void;
  maxRetries?: number;
  retryDelay?: number;
}

export const useReconnection = ({
  onReconnect,
  onDisconnect,
  maxRetries = 5,
  retryDelay = 3000,
}: UseReconnectionOptions = {}) => {
  const { setConnStatus, setRealTimeSync } = useGameStore();
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const clearRetryTimeout = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setRetryCount(0);
    setConnStatus('connecting');
    onReconnect?.();
  }, [setConnStatus, onReconnect]);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setConnStatus('offline');
    setRealTimeSync(false);
    onDisconnect?.();
  }, [setConnStatus, setRealTimeSync, onDisconnect]);

  const attemptReconnect = useCallback(async () => {
    if (retryCount >= maxRetries) {
      setConnStatus('polling');
      setRealTimeSync(false);
      console.warn('Max reconnection attempts reached, falling back to polling');
      return false;
    }

    setConnStatus('connecting');
    
    try {
      if (channelRef.current) {
        await channelRef.current.unsubscribe();
      }

      channelRef.current = supabase.channel('reconnection-test');
      
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Connection timeout')), 10000);
        
        channelRef.current!
          .on('system', { event: 'connected' }, () => {
            clearTimeout(timeout);
            resolve();
          })
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              clearTimeout(timeout);
              resolve();
            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
              clearTimeout(timeout);
              reject(new Error(`Channel status: ${status}`));
            }
          });
      });

      setConnStatus('connected');
      setRealTimeSync(true);
      setRetryCount(0);
      clearRetryTimeout();
      onReconnect?.();
      return true;
    } catch (error) {
      console.warn(`Reconnection attempt ${retryCount + 1} failed:`, error);
      setRetryCount(prev => prev + 1);
      
      clearRetryTimeout();
      retryTimeoutRef.current = setTimeout(() => {
        attemptReconnect();
      }, retryDelay * Math.pow(1.5, retryCount));
      
      return false;
    }
  }, [retryCount, maxRetries, retryDelay, setConnStatus, setRealTimeSync, onReconnect, clearRetryTimeout]);

  const forceReconnect = useCallback(() => {
    setRetryCount(0);
    clearRetryTimeout();
    attemptReconnect();
  }, [attemptReconnect, clearRetryTimeout]);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearRetryTimeout();
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [handleOnline, handleOffline, clearRetryTimeout]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isOnline) {
        forceReconnect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isOnline, forceReconnect]);

  return {
    isOnline,
    retryCount,
    maxRetries,
    attemptReconnect,
    forceReconnect,
  };
};
