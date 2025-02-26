<script setup lang="ts">
  import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0055A4', // Глубокий синий
    primaryColorHover: '#0077CC',
    primaryColorPressed: '#003D73',
    primaryColorSuppl: '#0055A4',
    borderRadius: '6px',
    fontFamily: '"Inter", sans-serif',
    bodyColor: '#F5F7FA', // Светлый фон
    cardColor: '#FFFFFF', // Белый для контраста
    textColorBase: '#1F2229', // Темный текст
    boxShadow2: '0px 4px 12px rgba(0, 85, 164, 0.2)',
  },
  Card: {
    color: '#FFFFFF',
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(0, 85, 164, 0.15)',
    titleFontWeight: '700',
    titleTextColor: '#1F2229',
    border: '2px solid #C5D1E8',
    backdropFilter: 'none',
  },
  Button: {
    textColor: 'white',
    color: '#0055A4',
    borderRadius: '6px',
    boxShadow: 'none',
    border: '2px solid #0055A4',
  },
  Input: {
    color: '#FFFFFF',
    textColor: '#1F2229',
    placeholderColor: '#7A7D8A',
    borderColor: '#C5D1E8',
    borderRadius: '6px',
    boxShadowFocus: '0px 0px 6px rgba(0, 85, 164, 0.3)',
    borderHover: '2px solid #0055A4',
    borderActive: '2px solid #0077CC',
  },
  Alert: {
    color: '#E8F0FA',
    titleTextColor: '#1F2229',
    borderRadius: '6px',
    border: '2px solid #C5D1E8',
    boxShadow: '0px 2px 6px rgba(0, 85, 164, 0.2)',
  }

  
  };
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="background">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
    <div class="app-container">
      <NuxtPage />
    </div>
  </n-config-provider>
</template>

<style scoped>
  .app-container {
    height: 100vh;
  }
</style>
