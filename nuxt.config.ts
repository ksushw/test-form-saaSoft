// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    baseURL: '/test-form-saaSoft/' 
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
  ssr: true,
  build: {
    transpile: ['naive-ui', 'vueuc']
  },

})
