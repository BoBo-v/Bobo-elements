import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: './tsconfig.build.json',
            outDir: 'dist/react/types',
            include: ['src/react/**/*', 'src/core/**/*', 'src/hooks/**/*']
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        outDir: 'dist/react',
        emptyOutDir: false,
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'src/react/index.ts'),
            name: 'BoboElementReact',
            fileName: 'index',
            formats: ['umd']
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                '@fortawesome/fontawesome-svg-core',
                '@fortawesome/free-solid-svg-icons',
                '@fortawesome/react-fontawesome',
                'async-validator',
                '@popperjs/core',
                'lodash-es',
                'axios'
            ],
            output: {
                exports: 'named',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    '@fortawesome/fontawesome-svg-core': 'FontAwesome',
                    '@fortawesome/free-solid-svg-icons': 'FontAwesomeSolid',
                    '@fortawesome/react-fontawesome': 'FontAwesomeReact',
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
