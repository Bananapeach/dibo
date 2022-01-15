import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import viteImagemin from 'vite-plugin-imagemin'
import pugPlugin from "vite-plugin-pug"
const options = { pretty: true } // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" }

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    pugPlugin(options, locals),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ]
})
