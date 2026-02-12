import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Code splitting dynamique basé sur le chemin
          if (id.includes('character-creation/lifepath')) return 'lore-lifepath';
          if (id.includes('character-creation/classes')) return 'lore-classes';
          if (id.includes('character-creation/abilities')) return 'lore-abilities';
          if (id.includes('character-creation/equipment')) return 'lore-equipment';
          if (id.includes('character-creation/pedagogy')) return 'lore-pedagogy';
          if (id.includes('node_modules/react')) return 'vendor-react';
          if (id.includes('node_modules/@supabase')) return 'vendor-supabase';
          if (id.includes('node_modules/openai')) return 'vendor-openai';
        }
      }
    },
    chunkSizeWarningLimit: 700
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@lore': path.resolve(__dirname, './src/lore'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
})
