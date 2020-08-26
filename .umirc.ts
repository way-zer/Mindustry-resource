import { defineConfig } from 'umi';

export default defineConfig({
  title: false,
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/servers/list': {
      target: 'http://vps.wayzer.top/',
      changeOrigin: true,
    },
    '/servers/add': {
      target: 'http://vps.wayzer.top/',
      changeOrigin: true,
    },
    '/map/': {
      target: 'http://wayzerpi.lan:9090/',
      changeOrigin: true,
    },
    '/api/': {
      target: 'http://mdt.wayzer.top/',
      changeOrigin: true,
    },
  },
  hash: true,
  mock: false,
  chunks: ['umi', 'vendors.umi'],
  chainWebpack: function(config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
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
