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
export default defineConfig(({mode}) => {
    const cdnAlias: Record<string, string> = {}
    if (mode === "production") {
        // cdnAlias["element-plus"] = 'https://esm.sh/element-plus@1.2.0-beta.1'
        cdnAlias["monaco-editor"] = 'https://esm.sh/monaco-editor@0.29.1'
    }
    return {
        base: '/v2/',
        plugins: [
            PkgConfig(),
            mode === "production" ? null : OptimizationPersist(),
            vue(),
            vueJsx(),
            Pages({
                exclude: ['**/components/**', '**/res/**', '**/_**'],
                importMode: (path) => {
                    if (path.includes("/masm"))
                        return "async"
                    return 'sync'
                },
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
                ...cdnAlias
            },
        },
        build: {
            sourcemap: true,
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    // manualChunks(id, api) {
                    //     if (id.includes('node_modules')) {
                    //         console.log(api.getModuleInfo(id))
                    //         for (const idElement of api.getModuleIds()) {
                    //             if (idElement.includes("src/main.ts"))
                    //                 return 'vendor'
                    //         }
                    //     }
                    //     return null
                    // },
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
    }
})
