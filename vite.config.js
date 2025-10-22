import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,       // puerto que quieres
    strictPort: true, // si está ocupado, fallará en vez de cambiar a otro
  },
})
