import {defineConfig, splitVendorChunkPlugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {VitePWA} from 'vite-plugin-pwa'
import {visualizer} from 'rollup-plugin-visualizer'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {resolve} from 'path'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import viteSSR from "simple-vite-vue-ssr/plugin";
import UnoCSS from 'unocss/vite'
import pwaManifest from './src/manifest.json';

// https://vitejs.dev/config/
export default defineConfig(({mode, ssrBuild}) => {
    const cdnAlias: Record<string, string> = {}
    if (mode === "production") {
        // cdnAlias["element-plus"] = 'https://esm.sh/element-plus@2.2.18'
        cdnAlias["monaco-editor"] = 'https://esm.sh/monaco-editor@0.33.0'
    }
    return {
        // base: '/v2/',
        plugins: [
            UnoCSS(),
            splitVendorChunkPlugin(),
            //viteSSR(),
            vue(),
            vueJsx(),
            Pages({
                exclude: ['**/components/**', '**/res/**', '**/[A-Z]**', '**/_**'],
                importMode: (path) => {
                    if (path.includes("/about"))
                        return "async"
                    if (path.includes("/masm"))
                        return "async"
                    return 'sync'
                },
                dirs: [
                    {dir: 'src/views', baseRoute: ''},
                ],
            }),
            AutoImport({
                dts: "src/types/auto-import.d.ts",
                imports: ['vue'],
            }),
            Components({
                dts: "src/types/components.d.ts",
                dirs: ["src/components/"],
                extensions: ["vue", "tsx"],
                resolvers: [
                    IconsResolver({
                        prefix: false,
                        enabledCollections: 'ep',
                        alias: {'el-icon': 'ep'}
                    }),
                    ElementPlusResolver({
                        importStyle: false
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: (pwaManifest as any),
                workbox: {
                    globPatterns: ['*.{png,js,html}'],
                    navigateFallback: 'index.html',
                    navigateFallbackDenylist: [/api\/.*/],
                    navigationPreload: false,
                    runtimeCaching: [
                        {urlPattern: /\/assets\//, handler: 'CacheFirst', options: {cacheName: "assets"}},
                        {urlPattern: /\.(css|js|svg|png|ico)$/, handler: 'CacheFirst', options: {cacheName: "static"}},
                        {
                            urlPattern: /^https:\/\/unpkg\.com\/.*/i, handler: 'CacheFirst',
                            options: {cacheName: "cdn-resource", cacheableResponse: {statuses: [0, 200]}}
                        },
                        {
                            urlPattern: /api\/.*/,
                            handler: 'NetworkFirst',
                        },
                        {
                            urlPattern: (url) => url.sameOrigin && url.url.pathname.match(/\/[^.]+$/),
                            handler: 'NetworkFirst'
                        },
                    ],
                },
            }),
            visualizer({
                brotliSize: true,
                filename: `dist/stats.${ssrBuild ? "server" : "client"}.html`
            }) as any,
        ],
        publicDir: "src/assets/public",
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                ...cdnAlias
            },
        },
        build: {
            outDir: "dist/client",
            sourcemap: mode === 'development',
            chunkSizeWarningLimit: 1000,
        },
        server: {
            proxy: {
                '/api/': {
                    target: 'https://mdt.wayzer.top/',
                    changeOrigin: true,
                },
            },
        },
        ssr: {
            noExternal: ['simple-vite-vue-ssr', 'pinia-class-store']
            // noExternal: [/.*node-module.*/]
        }
    }
})
