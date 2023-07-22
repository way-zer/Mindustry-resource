import { defineConfig } from 'astro/config';
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
    vue({jsx:true,appEntrypoint: '/src/app.vue.ts'}),
    UnoCSS({
      injectReset: true // or a path to the reset file
    }),
    vitePwa(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
        /\.astro$/, // .astro
      ],
      imports: ['vue']
      /* options */
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});