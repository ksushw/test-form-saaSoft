import { defineNuxtPlugin } from '#app'
import { create, NButton, NInput, NTooltip, NSelect } from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  const naive = create({
    components: [NButton, NInput, NTooltip, NSelect]
  })
  nuxtApp.vueApp.use(naive)
})
