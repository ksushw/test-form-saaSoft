<script setup lang="ts">
import { NSpin } from 'naive-ui';
</script>

<template>
  <div class="loading-container">
    <n-spin size="large" description="Загрузка данных..." />
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 9999;
}
</style>
