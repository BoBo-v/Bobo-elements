/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import react from '@vitejs/plugin-react'
import VueMacros from 'unplugin-vue-macros'

export default defineConfig({
    plugins: [
        VueMacros.vite({
            plugins: {
                vue: vue(),
                vueJsx: vueJsx(),
            },
        }),
        react() // 支持 React
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        // 区分不同测试文件
        include: ['src/vue/**/*.{test,spec}.{ts,tsx,js,jsx}',
            'src/react/**/*.{test,spec}.{ts,tsx,js,jsx}'],
    }
})
