import { defineNuxtPlugin } from '#app'
import { animate } from 'motion'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('animate', animate) // Теперь можно использовать $animate
})
