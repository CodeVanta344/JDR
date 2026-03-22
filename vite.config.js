import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Aethelgard JDR',
        short_name: 'Aethelgard',
        description: 'Jeu de rôle narratif immersif dans le monde d\'Aethelgard',
        theme_color: '#1a1a2e',
        background_color: '#0f0f1a',
        display: 'standalone',
        orientation: 'landscape',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15 MB
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        globIgnores: ['**/maps/*_combat_map.png'], // Exclude large combat maps from precaching
        navigateFallback: null, // Don't cache navigation requests
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[^.]+\.supabase\.co/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          },
          {
            urlPattern: /\/maps\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'maps-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules/react')) return 'vendor-react';
          if (id.includes('node_modules/@supabase')) return 'vendor-supabase';
          if (id.includes('node_modules/@anthropic-ai')) return 'vendor-anthropic';
          // Character creation chunks
          if (id.includes('character-creation/lifepath')) return 'cc-lifepath';
          if (id.includes('character-creation/classes')) return 'cc-classes';
          if (id.includes('character-creation/abilities')) return 'cc-abilities';
          if (id.includes('character-creation/equipment')) return 'cc-equipment';
          if (id.includes('character-creation/pedagogy')) return 'cc-pedagogy';
          // Lore data chunks
          if (id.includes('/lore/bestiary') || id.includes('/lore/creatures')) return 'lore-bestiary';
          if (id.includes('/lore/classes') || id.includes('/lore/skills')) return 'lore-classes';
          if (id.includes('/lore/items') || id.includes('/lore/crafting') || id.includes('/lore/professions')) return 'lore-items';
          if (id.includes('/lore/world') || id.includes('/lore/factions') || id.includes('/lore/cultural') || id.includes('/lore/npcs')) return 'lore-world';
          if (id.includes('/lore/narrative') || id.includes('/lore/backstories') || id.includes('/lore/lifepath') || id.includes('/lore/gm-book')) return 'lore-narrative';
          if (id.includes('/lore/')) return 'lore-core';
          // AI engine chunk
          if (id.includes('/ai/')) return 'ai-engine';
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
