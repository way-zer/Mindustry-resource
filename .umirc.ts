import { defineConfig } from 'umi';

export default defineConfig({
  title: false,
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
  chainWebpack: function(config) {
    config.merge({
      optimization: {
        minimize: process.env.NODE_ENV === 'production',
        splitChunks: {
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
        },
      },
    });
  },
});
