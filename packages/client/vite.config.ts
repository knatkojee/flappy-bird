import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    hmr: {
      port: 3000,
      protocol: 'ws',
      host: 'localhost',
    },
  },
  define: {
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  ssr: {
    target: 'node',
    format: 'cjs',
    noExternal: [],
    external: ['react', 'react-dom', 'express', 'dotenv'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
})
