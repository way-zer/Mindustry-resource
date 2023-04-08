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
            splitVendorChunkPlugin(),
            viteSSR(),
            vue(),
            vueJsx(),
            Pages({
                exclude: ['**/components/**', '**/res/**', '**/_**'],
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
                dts: "src/auto-imports.d.ts",
                imports: ['vue'],
            }),
            Components({
                dts: "src/components.d.ts",
                extensions: ['vue', 'tsx'],
                resolvers: [
                    IconsResolver({
                        prefix: false,
                        enabledCollections: 'ep',
                        alias: {'el-icon': 'ep'}
                    }),
                    ElementPlusResolver({
                        importStyle: false
                        // ssr:true
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: false,
                workbox: {
                    dontCacheBustURLsMatching: /assets\/.*/,
                    navigateFallback: 'index.html',
                    navigateFallbackDenylist: [/api\/.*/],
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
                filename: ssrBuild ? "stats.server.html" : "stats.client.html"
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
            target: ['chrome89', 'esnext'],
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
