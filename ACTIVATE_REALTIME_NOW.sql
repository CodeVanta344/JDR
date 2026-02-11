-- =====================================================
-- ACTIVATION REALTIME - Copier et exécuter dans SQL Editor
-- =====================================================

-- Activer Realtime pour combat_locks
ALTER PUBLICATION supabase_realtime ADD TABLE public.combat_locks;

-- Activer Realtime pour world_state
ALTER PUBLICATION supabase_realtime ADD TABLE public.world_state;

-- Vérifier que c'est activé
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('combat_locks', 'world_state');

-- NOTE: Si vous voyez une erreur "already member of publication", c'est OK !
-- Cela signifie que Realtime était déjà activé pour cette table.

-- Vous devriez voir 2 lignes :
-- public | combat_locks
-- public | world_state
