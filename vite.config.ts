import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
// still have some issue (tsx do not support in production mode)
// referrence Sidebar.vue can resolve
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import pwaConfig from './pwa.config';
import pkg from './package.json'

const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_NAME__: JSON.stringify(pkg.name),
  },
  plugins: [
    vue(),
    vueJsx(),
    VitePWA(pwaConfig as Partial<VitePWAOptions>),
    AutoImport({
      imports: ['vue', 'vue-router',],
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      eslintrc: {
        enabled: true
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
  ],
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
});
