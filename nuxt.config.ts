// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  mode: 'static',
  ssr: true,
  app: {
    baseURL: '/test-form-saaSoft/_nuxt/',
    trailingSlash: true,
  },
  build: {
    publicPath: '/test-form-saaSoft/_nuxt/',
    transpile: ['naive-ui', 'vueuc'],
  },
  nitro: {
    prerender: {
      routes: ['/'] 
    }
  },
  css: ["@/assets/css/globals.css"],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    // optimizeDeps: {
    //   exclude: ['nuxt/dist/core/runtime/nitro/cache-driver.js']
    // }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt']

})
