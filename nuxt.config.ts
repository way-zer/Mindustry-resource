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
  ],
  routeRules: {
    "/": { redirect: "/map" },
  },
  ignoreOptions: { ignorecase: false },
  ignore: [
    "pages/**/[A-Z]*.*",
  ]
})