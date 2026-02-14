import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue()
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
            formats: ['umd']
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
                exports: 'named',
                globals: {
                    vue: 'Vue',
                    '@fortawesome/fontawesome-svg-core': 'FontAwesome',
                    '@fortawesome/free-solid-svg-icons': 'FontAwesomeSolid',
                    '@fortawesome/vue-fontawesome': 'FontAwesomeVue',
                    'async-validator': 'AsyncValidator',
                    '@popperjs/core': 'Popper',
                    'lodash-es': '_',
                    'axios': 'axios'
                },
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'style.css') return 'index.css'
                    return chunkInfo.name as string
                }
            }
        }
    }
})
