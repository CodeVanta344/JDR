-- Migration: Add material_inventory column to players table
-- This column stores gathered crafting materials separate from regular inventory

ALTER TABLE players ADD COLUMN IF NOT EXISTS material_inventory jsonb DEFAULT '{}'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN players.material_inventory IS 'Stockage des matériaux de récolte (minerai, herbes, cuir, etc.) séparé de l''inventaire principal';
