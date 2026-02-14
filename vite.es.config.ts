import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: './tsconfig.build.json',
            outDir: 'dist/vue/types',
            include: ['src/vue/**/*', 'src/core/**/*', 'src/hooks/**/*', 'src/components/**/*']
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        outDir: 'dist/vue',
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, 'src/vue/index.ts'),
            name: 'BoboElementVue',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            external: [
                'vue',
                '@fortawesome/fontawesome-svg-core',
                '@fortawesome/free-solid-svg-icons',
                '@fortawesome/vue-fontawesome',
                'async-validator',
                '@popperjs/core',
                'lodash-es',
                'axios'
            ],
            output: {
                globals: {
                    vue: 'Vue'
                },
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'style.css') return 'index.css'
                    return chunkInfo.name as string
                }
            }
        }
    }
})
