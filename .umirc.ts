import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    "/servers": {
      "target": "http://vps.wayzer.top/",
      "changeOrigin": true,
    }
  }
});
