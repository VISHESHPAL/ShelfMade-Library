import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // tailwind.config.js
 extend: {
  colors: {
    primary: '#BDC1B0',
    background: '#F7F8F3',
    card: '#E3E5D7',
    text: '#2F2F2F',
    muted: '#6E7168',
    accent: '#88916B',
    success: '#4A7856',
    error: '#A64B4B',
    hover: '#D6D8C2',
  }
}

})
