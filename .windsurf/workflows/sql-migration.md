---
description: Comment créer et appliquer une migration SQL sur Supabase
---

## Créer une migration SQL

1. Créer un fichier dans `supabase/migrations/` avec le format :
   ```
   YYYYMMDDHHMMSS_description.sql
   ```

2. Écrire la migration SQL, exemple :
   ```sql
   ALTER TABLE players ADD COLUMN IF NOT EXISTS material_inventory jsonb DEFAULT '{}'::jsonb;
   ```

## Appliquer la migration sur Supabase

### Option 1 : Via le Dashboard Supabase (Recommandé pour dev)
1. Aller sur https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu
2. Menu latéral → **"SQL Editor"**
3. **"New query"**
4. Coller le contenu de la migration
5. Cliquer sur **"Run"**

### Option 2 : Via CLI Supabase
```bash
npx supabase db push
```

## Vérifier que la colonne existe
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'players';
```

## Commit et push la migration
```bash
git add supabase/migrations/YYYYMMDDHHMMSS_description.sql
git commit -m "feat: add [nom_colonne] column to [table]"
git push origin main
```
