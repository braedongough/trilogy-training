import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        plans: resolve(__dirname, 'plans/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
})
