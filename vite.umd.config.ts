import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
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
        react() // 新增
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        outDir: 'dist/umd',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'BoboElement',
            fileName: 'Bobo-element',
            formats: ['umd']
        },
        rollupOptions: {
            external: ['vue', 'react', 'react-dom'],
            output: {
                exports: 'named',
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
