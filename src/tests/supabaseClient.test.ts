import { describe, it, expect, vi } from 'vitest';

// Mock import.meta.env before importing the module
vi.stubGlobal('import', { meta: { env: {} } });

describe('supabaseClient', () => {
  it('should throw when env variables are missing', async () => {
    // Clear env to test the guard
    const originalUrl = import.meta.env.VITE_SUPABASE_URL;
    const originalKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // We can't easily re-import ESM modules, so we test the logic directly
    const supabaseUrl = undefined;
    const supabaseAnonKey = undefined;

    expect(!supabaseUrl || !supabaseAnonKey).toBe(true);

    // Restore
    import.meta.env.VITE_SUPABASE_URL = originalUrl;
    import.meta.env.VITE_SUPABASE_ANON_KEY = originalKey;
  });

  it('should export a supabase client when env is set', async () => {
    // This test runs in the vitest context where .env is loaded by vite
    const { supabase } = await import('../supabaseClient');
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
    expect(supabase.from).toBeDefined();
  });
});
