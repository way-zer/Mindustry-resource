import pwaManifest from './app/assets/manifest.json';
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: "2025-04-03",
    devtools: {enabled: true},
    modules: [
        "@vueuse/nuxt",
        "@vite-pwa/nuxt",
        "@element-plus/nuxt",
        "@nuxt/icon",
        "@pinia/nuxt", 'pinia-plugin-persistedstate/nuxt',
        "nuxt-typed-router",
    ],
    icon: {
        provider: 'iconify',
        serverBundle: false,
    },
    css: ["~/app.css"],
    nitro: {
        devProxy: {
            "/api": {
                target: 'https://api.mindustry.top',
                changeOrigin: true,
                prependPath: true,
            }
        }
    },
    routeRules: {
        "/": {redirect: "/map"},
        "/pwa-fallback": {ssr: false, prerender: true},
        '/map': {isr: {expiration: 60, allowQuery: ['q']}},
        '/**': {
            isr: {allowQuery: [], expiration: 120}
        },
    },
    ignoreOptions: {ignorecase: false},
    ignore: [
        "app/pages/**/[A-Z_]*.*",
        "app/pages/**/res/**",
    ],
    // build config
    app: {
        head: {
            titleTemplate: "%s - Mindustry资源站",
            charset: "utf-8",
            htmlAttrs: {lang: "zh-CN"},
            meta: [
                {name: "theme-color", content: "#001529"},
            ],
            script: [
                {
                    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4298329918186847",
                    async: true,
                    crossorigin: "anonymous"
                },
                {
                    type: "text/javascript", innerHTML: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "gsj4e9xc0u");`
                },
            ]
        }
    },
    vite: {
        plugins: [tailwindcss()],
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
            globPatterns: ["**/index.html"],
            navigateFallback: "/pwa-fallback",
            navigateFallbackDenylist: [/api\/.*/],
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [
                {urlPattern: /\/_nuxt\//, handler: 'CacheFirst', options: {cacheName: "assets"}},
                {urlPattern: /\.(css|js|svg|png|ico)$/, handler: 'CacheFirst', options: {cacheName: "static"}},
                {
                    urlPattern: /^https:\/\/api.mindustry.top\/.*/i, handler: 'NetworkFirst',
                    options: {cacheName: "api", cacheableResponse: {statuses: [0, 200]}},
                },
                {
                    urlPattern: /^https:\/\/cdn\.bootcdn\.net\/.*/i, handler: 'CacheFirst',
                    options: {cacheName: "cdn-resource", cacheableResponse: {statuses: [0, 200]}}
                },
            ],
        },
    }
})