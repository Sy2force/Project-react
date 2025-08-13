import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    proxy: { 
      "/api": { 
        target: "http://localhost:5000", 
        changeOrigin: true 
      } 
    }
  },
  preview: { 
    port: 3000, 
    strictPort: true 
  },
  resolve: { 
    alias: { 
      "@": path.resolve(__dirname, "src") 
    } 
  },
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
