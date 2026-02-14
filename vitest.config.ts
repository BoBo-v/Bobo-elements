/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        vue(),
        react(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        include: [
            'src/vue/**/*.{test,spec}.{ts,tsx,js,jsx}',
            'src/react/**/*.{test,spec}.{ts,tsx,js,jsx}',
        ],
    },
})
