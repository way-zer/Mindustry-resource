import {defineConfig} from 'astro/config';
import vue from "@astrojs/vue";

import UnoCSS from 'unocss/astro';
import vitePwa from "@vite-pwa/astro";
import AutoImport from 'unplugin-auto-import/astro'
import Components from 'unplugin-vue-components/vite'
import {
    ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    integrations: [
        vue({jsx: true, appEntrypoint: '/src/app.vue.ts'}),
        UnoCSS({
            injectReset: true // or a path to the reset file
        }),
        vitePwa({
            registerType: "autoUpdate",
            workbox: {}
        }),
        AutoImport({
            dts: "src/types/auto-import.d.ts",
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
                /\.md$/, // .md
                /\.astro$/, // .astro
            ],
            imports: ['vue']
            /* options */
        })
    ],
    vite: {
        plugins: [
            Components({
                dts: "src/types/components.d.ts",
                resolvers: [ElementPlusResolver({importStyle: false})],
                dirs: ["src/components/"],
            }),
        ]
    },
    output: "server",
    adapter: node({
        mode: "standalone"
    }),
    experimental: {
        assets: true,
    }
});