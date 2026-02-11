import { useCallback, useRef, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useGameStore } from '../store/gameStore';
import type { Message } from '../types';

interface UseMessagesOptions {
  sessionId: string | null;
  onNewMessage?: (message: Message) => void;
}

export const useMessages = ({ sessionId, onNewMessage }: UseMessagesOptions) => {
  const { messages, addMessage, setMessages, setLoading } = useGameStore();
  const [sending, setSending] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadMessages = useCallback(async () => {
    if (!sessionId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      if (data) {
        setMessages(data as Message[]);
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  }, [sessionId, setMessages, setLoading]);

  const sendMessage = useCallback(async (
    content: string,
    role: Message['role'] = 'user',
    playerId?: string
  ) => {
    if (!sessionId || !content.trim()) return null;
    
    setSending(true);
    try {
      const newMessage = {
        session_id: sessionId,
        role,
        content: content.trim(),
        player_id: playerId,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('messages')
        .insert(newMessage)
        .select()
        .single();
      
      if (error) throw error;
      if (data) {
        addMessage(data as Message);
        onNewMessage?.(data as Message);
        return data as Message;
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
    return null;
  }, [sessionId, addMessage, onNewMessage]);

  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);
      
      if (error) throw error;
      setMessages(messages.filter(m => m.id !== messageId));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  }, [messages, setMessages]);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`messages:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          const newMsg = payload.new as Message;
          addMessage(newMsg);
          onNewMessage?.(newMsg);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId, addMessage, onNewMessage]);

  return {
    messages,
    sending,
    loadMessages,
    sendMessage,
    deleteMessage,
    cancelRequest,
  };
};
