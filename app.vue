<script setup lang="ts">
  import { NConfigProvider } from 'naive-ui';
  import { themeOverrides } from './theme/BlueTheme';
  import UnsavedDataLost from '@/components/UnsavedDataLost.vue';
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="background">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
    <div class="app-container">
      <UnsavedDataLost />
      <NuxtPage />
    </div>
  </n-config-provider>
</template>

<style scoped>
  .app-container {
    height: 100vh;
  }
</style>
