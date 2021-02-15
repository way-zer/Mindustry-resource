import { defineConfig } from 'umi';
import { GenerateSW } from 'workbox-webpack-plugin';

export default defineConfig({
  title: false,
  links: [
    { rel: 'icon', href: 'icons-192.png' },
    { rel: 'manifest', href: '/manifest.json' },
  ],
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  proxy: {
    '/servers/list': {
      target: 'https://vps.wayzer.top/',
      changeOrigin: true,
    },
    '/servers/add': {
      target: 'https://vps.wayzer.top/',
      changeOrigin: true,
    },
    '/api/': {
      target: 'https://mdt.wayzer.top/',
      changeOrigin: true,
    },
  },
  fastRefresh: {},
  hash: true,
  mock: {
    exclude: ['mock/maps.ts'],
  },
  chunks: ['umi', 'vendors.umi'],
  analytics: {
    baidu: '6e8aa8b66d721aed4cc6e4f7fdeba695',
  },
  copy: [{ from: 'src/assets', to: './' }],
  chainWebpack(mone) {
    mone.plugin('workbox').use(GenerateSW, [
      {
        swDest: '/sw.js',
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/\/api\/.*/, /\/mapAdmin\/.*/],
        exclude: ['robot.txt'],
        runtimeCaching: [
          {
            urlPattern: /(.*\.)?umi\.(.+)\.(js|css)/, //umi文件,带hash
            handler: 'CacheFirst',
          },
        ],
      },
    ]);
    mone.optimization.minimize(process.env.NODE_ENV === 'production');
    mone.optimization.splitChunks({
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1, //敲黑板
          priority: -10, //优先级更高
        },
      },
    });
  },
});
