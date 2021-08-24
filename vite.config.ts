import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {VitePWA} from 'vite-plugin-pwa'
import {visualizer} from 'rollup-plugin-visualizer'
import styleImport from 'vite-plugin-style-import'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/v2/',
    plugins: [
        vue(),
        vueJsx(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    base: 'element-plus/lib/theme-chalk/base.css',
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`
                    },
                },
                {
                    libraryName: 'ant-design-vue',
                    esModule: true,
                    base: 'ant-design-vue/lib/style/index.css',
                    resolveStyle: (name) => {
                        return `ant-design-vue/lib/${name}/style/index.css`
                    },
                },
            ],
        }),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: false,
            workbox: {
                dontCacheBustURLsMatching: /assets\/.*/,
                navigateFallback: 'index.html',
                runtimeCaching: [
                    {
                        urlPattern: /icons-\d+\.\d+\.png/,
                        handler: 'CacheFirst',
                    },
                    {
                        urlPattern: /manifest\.\d+\.json/,
                        handler: 'CacheFirst',
                    },
                    {
                        urlPattern: /api\/.*/,
                        handler: 'NetworkFirst',
                    },
                ],
            },
        }),
        visualizer({
            brotliSize: true,
            sourcemap: true,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        sourcemap: true,
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // if (id.includes('node_modules/element') || id.includes('dayjs'))
                    //     return 'element'
                    if (id.includes('node_modules')) {
                        return 'vendors'
                    }
                },
            },
        },
    },
    server: {
        proxy: {
            '/api/': {
                target: 'https://mdt.wayzer.top/',
                changeOrigin: true,
            },
        },
    },
})
