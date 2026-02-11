-- =====================================================
-- ACTIVATION DE REALTIME POUR world_state
-- =====================================================
-- Copiez et exécutez ce code dans le SQL Editor de Supabase
-- URL: https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new

-- Activer Realtime pour la table world_state
ALTER PUBLICATION supabase_realtime ADD TABLE public.world_state;

-- Vérifier que Realtime est activé
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime' AND tablename = 'world_state';

-- Si vous voyez une ligne avec "public" et "world_state", c'est activé !
