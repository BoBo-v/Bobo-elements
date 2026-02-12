import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/react/**/*.test.{ts,tsx}'], // ✅ 只执行 React 目录下的测试
        exclude: ['src/vue/**'],                   // 🚫 排除 Vue 测试
    },
})
