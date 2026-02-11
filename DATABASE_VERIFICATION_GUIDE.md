# Vérification de la base de données - Guide manuel

## Étape 1 : Vérifier si la table world_state existe

1. Ouvrez le Dashboard Supabase :
   https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/editor

2. Ouvrez l'éditeur SQL (SQL Editor dans le menu de gauche)

3. Copiez et exécutez cette requête :

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'world_state';
```

**Résultats possibles :**
- ✅ Si vous voyez une ligne avec `world_state` → La table existe déjà, passez à l'Étape 3
- ❌ Si vous ne voyez rien → La table n'existe pas, passez à l'Étape 2

---

## Étape 2 : Créer la table world_state (si elle n'existe pas)

1. Ouvrez le fichier `MANUAL_MIGRATION_WORLD_STATE.sql` dans ce dossier

2. Copiez TOUT le contenu du fichier

3. Collez-le dans l'éditeur SQL de Supabase

4. Cliquez sur "Run" pour exécuter la migration

5. Vous devriez voir des messages de succès

---

## Étape 3 : Vérifier que Realtime est activé

1. Dans le Dashboard Supabase, allez dans Database → Replication

2. Vérifiez que la table `world_state` est dans la liste des tables avec Realtime activé

3. Si elle n'y est pas, cochez la case à côté de `world_state`

---

## Étape 4 : Test rapide

Exécutez cette requête dans l'éditeur SQL pour tester :

```sql
-- Test INSERT
INSERT INTO public.world_state (key, value) 
VALUES ('test_merchant', '{"npcName": "Test", "active": true}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Test SELECT
SELECT * FROM public.world_state WHERE key = 'test_merchant';

-- Test DELETE (nettoyage)
DELETE FROM public.world_state WHERE key = 'test_merchant';
```

**Si tout fonctionne sans erreur, la base de données est prête ! ✅**

---

## Dépannage

### Erreur "permission denied"
- Vérifiez que vous êtes connecté avec un compte admin
- Vérifiez les politiques RLS dans Database → Authentication → Policies

### Erreur "table does not exist"
- Retournez à l'Étape 2 et réexécutez la migration

### Le marchand ne se synchronise pas entre joueurs
- Vérifiez que Realtime est activé (Étape 3)
- Vérifiez que les deux joueurs sont connectés et authentifiés
