import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [vue(), vueJsx()],
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/vue/**/*.test.{ts,tsx}'], // ✅ 只执行 Vue 目录下的测试
        exclude: ['src/react/**'],               // 🚫 排除 React 测试
    },
})
