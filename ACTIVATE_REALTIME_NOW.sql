-- =====================================================
-- ACTIVATION REALTIME - Copier et exécuter dans SQL Editor
-- =====================================================

-- Activer Realtime pour combat_locks
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.combat_locks;

-- Activer Realtime pour world_state (si pas déjà fait)
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS public.world_state;

-- Vérifier que c'est activé
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('combat_locks', 'world_state');

-- Vous devriez voir 2 lignes :
-- public | combat_locks
-- public | world_state
