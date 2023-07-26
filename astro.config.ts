import {defineConfig} from 'astro/config';
import vue from "@astrojs/vue";
import UnoCSS from 'unocss/astro';
import vitePwa from "@vite-pwa/astro";
import AutoImport from 'unplugin-auto-import/astro';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import pwaManifest from './src/manifest.json';
import node from "@astrojs/node";

// import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
    integrations: [vue({
        jsx: true,
        appEntrypoint: '/src/app.vue.ts'
    }), UnoCSS({
        injectReset: "@unocss/reset/tailwind-compat.css" // or a path to the reset file
    }), vitePwa({
        registerType: "autoUpdate",
        manifest: (pwaManifest as any),
        workbox: {
            globPatterns: ['*.{png,js,html}'],
            // globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
            navigateFallback: "manifest.webmanifest",//note: 这个功能无法关闭，只能手动去sw.js删除对应段落。
            navigateFallbackAllowlist: [],
            navigationPreload: false,
            runtimeCaching: [
                {urlPattern: /\/_astro\//, handler: 'CacheFirst', options: {cacheName: "astro"}},
                {urlPattern: /\.(css|js|svg|png|ico)$/, handler: 'CacheFirst', options: {cacheName: "static"}},
                {
                    urlPattern: /^https:\/\/unpkg\.com\/.*/i, handler: 'CacheFirst',
                    options: {cacheName: "cdn-resource", cacheableResponse: {statuses: [0, 200]}}
                },
                {urlPattern: /\/api\//, handler: 'NetworkFirst'},
                {urlPattern: (url) => url.sameOrigin && url.url.pathname.match(/\/[^.]+$/), handler: 'NetworkFirst'},
            ]
        }
    }), AutoImport({
        dts: "src/types/auto-import.d.ts",
        include: [/\.[tj]sx?$/,
            // .ts, .tsx, .js, .jsx
            /\.vue$/, /\.vue\?vue/,
            // .vue
            /\.md$/,
            // .md
            /\.astro$/ // .astro
        ],

        imports: ['vue']
        /* options */
    })],

    vite: {
        plugins: [Components({
            dts: "src/types/components.d.ts",
            resolvers: [ElementPlusResolver({
                importStyle: false
            })],
            dirs: ["src/components/"]
        })],
        ssr: {}
    },
    output: "server",
    adapter: node({mode: "standalone"}),
    experimental: {
        assets: true
    }
});