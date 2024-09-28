import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/24-02-WSD-Assignment-02-Demo/', // GitHub Pages 배포용 base 경로 설정
})
