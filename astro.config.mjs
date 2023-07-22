import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import UnoCSS from 'unocss/astro';
import vitePwa from "@vite-pwa/astro";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), UnoCSS({
    injectReset: true // or a path to the reset file
  }), vitePwa()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});