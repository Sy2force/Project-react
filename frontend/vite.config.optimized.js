import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

// 🚀 CONFIGURATION VITE ULTRA-OPTIMISÉE POUR PORTFOLIO REACT
export default defineConfig({
  plugins: [
    react({
      // Optimisations React Fast Refresh
      fastRefresh: true,
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  
  // Optimisations de build production
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparation intelligente des chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          utils: ['axios', 'clsx'],
          auth: ['js-cookie']
        },
        // Noms de fichiers optimisés
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096
  },
  
  // Serveur de développement ultra-rapide
  server: {
    port: 5184,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      overlay: false,
      clientPort: 5184
    },
    watch: {
      usePolling: false,
      interval: 100,
      ignored: ['**/node_modules/**', '**/dist/**']
    },
    // Middleware de compression
    middlewareMode: false
  },
  
  // Résolution des modules optimisée
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url))
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  
  // Optimisations CSS
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        // Autoprefixer automatique avec Tailwind
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  // Pré-bundling des dépendances
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'axios',
      'lucide-react',
      'clsx',
      'js-cookie'
    ],
    exclude: [
      '@vite/client',
      '@vite/env'
    ],
    // Force le re-bundling si nécessaire
    force: false
  },
  
  // Cache agressif pour performance
  cacheDir: 'node_modules/.vite',
  
  // Variables d'environnement
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production')
  },
  
  // Prévisualisation
  preview: {
    port: 4173,
    host: '0.0.0.0',
    strictPort: true
  },
  
  // Configuration ESBuild pour performance maximale
  esbuild: {
    target: 'esnext',
    platform: 'browser',
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  
  // Worker optimisé
  worker: {
    format: 'es'
  }
});
