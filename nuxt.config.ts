// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: true,
  app: {
    baseURL: '/test-form-saaSoft/',
    trailingSlash: true,
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
    optimizeDeps: {
      exclude: ['nuxt/dist/core/runtime/nitro/cache-driver.js']
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  build: {
    transpile: ['naive-ui', 'vueuc']
  },

})
