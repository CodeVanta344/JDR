-- Activer Realtime pour combat_locks uniquement
-- (world_state est déjà activé comme montré par l'erreur)

DO $$
BEGIN
    -- Essayer d'ajouter combat_locks
    ALTER PUBLICATION supabase_realtime ADD TABLE public.combat_locks;
EXCEPTION
    WHEN duplicate_object THEN
        RAISE NOTICE 'combat_locks est déjà dans la publication (c''est OK !)';
END $$;

-- Vérifier que les deux tables sont activées
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('combat_locks', 'world_state')
ORDER BY tablename;

-- Vous devriez voir 2 lignes :
-- public | combat_locks
-- public | world_state
