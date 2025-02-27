// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/test-form-saaSoft/' : '/', 
  },
  nitro: {
    preset: 'static', 
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
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
 ssr: true,
})
