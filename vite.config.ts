import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {VitePWA} from 'vite-plugin-pwa'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import {visualizer} from 'rollup-plugin-visualizer'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import {resolve} from 'path'
import {AntDesignVueResolver, ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/v2/',
    plugins: [
        PkgConfig(),
        OptimizationPersist(),
        vue(),
        vueJsx(),
        Pages({
            exclude: ['**/components/**', '**/_*'],
            importMode: 'sync',
            pagesDir: [
                {dir: 'src/views', baseRoute: ''},
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver({importStyle: 'css'}),
                AntDesignVueResolver({importStyle: 'css'}),
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
