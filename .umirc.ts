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
  },
  hash: true,
});
