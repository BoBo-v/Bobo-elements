import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import react from '@vitejs/plugin-react'
import VueMacros from 'unplugin-vue-macros'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        VueMacros.vite({
            plugins: {
                vue: vue(),
                vueJsx: vueJsx(),
            },
        }),
        react(), // 新增
        dts({
            tsconfigPath: './tsconfig.build.json',
            outDir: 'dist/types'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        outDir: 'dist/es',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'BoboElement',
            fileName: 'Bobo-element',
            formats: ['es']
        },
        rollupOptions: {
            external: [
                'vue',
                'react',
                'react-dom',
                '@fortawesome/fontawesome-svg-core',
                '@fortawesome/free-solid-svg-icons',
                '@fortawesome/vue-fontawesome',
                'async-validator',
                '@popperjs/core',
                'axios'
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'style.css') return 'index.css'
                    return chunkInfo.name as string
                }
            }
        }
    }
})
