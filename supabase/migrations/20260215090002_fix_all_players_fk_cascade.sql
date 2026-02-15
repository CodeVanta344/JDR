-- Ensure every FK pointing to public.players uses ON DELETE CASCADE
-- This prevents 409/23503 conflicts when deleting a player row.

DO $$
DECLARE
    r RECORD;
    old_def TEXT;
    new_def TEXT;
BEGIN
    FOR r IN
        SELECT
            con.oid,
            con.conname,
            ns.nspname AS schema_name,
            rel.relname AS table_name,
            pg_get_constraintdef(con.oid, true) AS constraint_def
        FROM pg_constraint con
        JOIN pg_class rel ON rel.oid = con.conrelid
        JOIN pg_namespace ns ON ns.oid = rel.relnamespace
        WHERE con.contype = 'f'
          AND con.confrelid = 'public.players'::regclass
          AND ns.nspname = 'public'
    LOOP
        old_def := r.constraint_def;

        -- Skip if already CASCADE
        IF position('ON DELETE CASCADE' in upper(old_def)) > 0 THEN
            CONTINUE;
        END IF;

        -- Remove any existing ON DELETE clause
        new_def := regexp_replace(old_def, '\s+ON\s+DELETE\s+\w+', '', 'gi');

        -- Ensure ON DELETE CASCADE is inserted before ON UPDATE if present
        IF position(' ON UPDATE ' in upper(new_def)) > 0 THEN
            new_def := regexp_replace(new_def, '\s+ON\s+UPDATE\s+', ' ON DELETE CASCADE ON UPDATE ', 'i');
        ELSE
            new_def := new_def || ' ON DELETE CASCADE';
        END IF;

        EXECUTE format('ALTER TABLE %I.%I DROP CONSTRAINT %I', r.schema_name, r.table_name, r.conname);
        EXECUTE format('ALTER TABLE %I.%I ADD CONSTRAINT %I %s', r.schema_name, r.table_name, r.conname, new_def);
    END LOOP;
END $$;
