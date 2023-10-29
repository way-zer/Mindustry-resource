import pwaManifest from './assets/manifest.json';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/strapi",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@unocss/nuxt",
    "@element-plus/nuxt",
    "nuxt-icon",
    "@pinia/nuxt",
  ],
  routeRules: {
    "/": { redirect: "/map" },
    '/api/**': {
      proxy: 'https://api.mindustry.top/**'
    }
  },
  ignoreOptions: { ignorecase: false },
  ignore: [
    "old/**",
    "pages/**/[A-Z_]*.*",
    "pages/**/res/**",
  ],
  // build config
  app: {
    head: {
      titleTemplate: "%s - Mindustry资源站",
      charset: "utf-8",
      meta: [
        { name: "theme-color", content: "#001529" },
      ],
      script: [
        { src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4298329918186847", async: true, crossorigin: "anonymous" },
        { src: "https://www.clarity.ms/tag/gsj4e9xc0u", async: true },
      ]
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'element-plus': ['element-plus']
          }
        }
      }
    }
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: (pwaManifest as any),
    workbox: {
      navigationPreload: false,
      runtimeCaching: [
        { urlPattern: /\/_nuxt\//, handler: 'CacheFirst', options: { cacheName: "assets" } },
        { urlPattern: /\.(css|js|svg|png|ico)$/, handler: 'CacheFirst', options: { cacheName: "static" } },
        {
          urlPattern: /^https:\/\/cdn\.bootcdn\.net\/.*/i, handler: 'CacheFirst',
          options: { cacheName: "cdn-resource", cacheableResponse: { statuses: [0, 200] } }
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
  }
})