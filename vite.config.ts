import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {

            }
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, 'src')
        }
    },
    server: {
        proxy: {
            '/api/': {
                target: 'https://mdt.wayzer.top/',
                changeOrigin: true,
            },
        }
    }
})
