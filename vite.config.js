import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages(https://<user>.github.io/<repo>/)에서도 경로가 깨지지 않도록 상대 경로 사용
  base: './',
})
