import pwaManifest from './assets/manifest.json';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@unocss/nuxt",
    "@element-plus/nuxt",
    "nuxt-icon",
    "@pinia/nuxt",
    "nuxt-typed-router",
  ],
  routeRules: {
    "/": { redirect: "/map" },
    "/pwa-fallback": { ssr: false, prerender: true },
    '/api/**': {
      proxy: 'https://api.mindustry.top/**'
    }
  },
  ignoreOptions: { ignorecase: false },
  ignore: [
    "pages/**/[A-Z_]*.*",
    "pages/**/res/**",
  ],
  // build config
  app: {
    head: {
      titleTemplate: "%s - Mindustry资源站",
      charset: "utf-8",
      htmlAttrs: { lang: "zh-CN" },
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
      navigateFallback: "/pwa-fallback",
      navigateFallbackDenylist: [/api\/.*/],
      runtimeCaching: [
        { urlPattern: /\/_nuxt\//, handler: 'CacheFirst', options: { cacheName: "assets" } },
        { urlPattern: /\.(css|js|svg|png|ico)$/, handler: 'CacheFirst', options: { cacheName: "static" } },
        {
          urlPattern: /^https:\/\/api.mindustry.top\/.*/i, handler: 'NetworkFirst',
          options: { cacheName: "api", cacheableResponse: { statuses: [0, 200] } },
        },
        {
          urlPattern: /^https:\/\/cdn\.bootcdn\.net\/.*/i, handler: 'CacheFirst',
          options: { cacheName: "cdn-resource", cacheableResponse: { statuses: [0, 200] } }
        },
      ],
    },
  }
})