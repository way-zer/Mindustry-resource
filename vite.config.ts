import {defineConfig} from 'vite'
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
import viteSSR from "./src/util/viteSSR/plugin";

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
            viteSSR(),
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
            }) as any,
        ],
        publicDir: "src/assets/client",
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                ...cdnAlias
            },
        },
        build: {
            target: ['chrome89', 'esnext'],
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
        ssr: {
            // noExternal: [/.*node-module.*/]
        }
    }
})
