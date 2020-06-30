import { defineConfig } from 'umi';

export default defineConfig({
  title: false,
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/servers': {
      target: 'http://vps.wayzer.top/',
      changeOrigin: true,
    },
  },
  hash: true,
});
