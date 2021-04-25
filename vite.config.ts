import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'
// @ts-ignore
import { visualizer } from 'rollup-plugin-visualizer';
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/v2/',
    plugins: [
        vue(),
        vueJsx(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: false,
            workbox: {
                dontCacheBustURLsMatching: /assets\/.*/,
                navigateFallback: 'index.html',
                runtimeCaching: [
                    {
                        urlPattern: /icons-.+\.png/,
                        handler: 'StaleWhileRevalidate'
                    },
                    {
                        urlPattern: /api\/.*/,
                        handler: 'NetworkFirst'
                    }
                ]
            }
        }),
        visualizer()
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, 'src'),
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id){
                    if(id.includes("element"))
                        return 'element'
                    else if(id.includes("node_modules")){
                        return 'vendors'
                    }
                }
            }
        }
    },
    server: {
        proxy: {
            '/api/': {
                target: 'https://mdt.wayzer.top/',
                changeOrigin: true,
            },
        }
    },
})
