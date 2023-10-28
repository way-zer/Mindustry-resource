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
    "pages/**/[A-Z]*.*",
  ]
})