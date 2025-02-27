<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {  onBeforeRouteLeave } from 'vue-router';
import { NModal, NCard, NButton } from 'naive-ui';
import { useAccountsStore } from '@/store/accounts';


const store = useAccountsStore();
const showModal = ref(false);
const resolveLeave = ref<Function | null>(null);
const hasUnsavedChanges = () => store.filteredAccounts.length !== store.accounts.length


// Обработчик выхода
const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (hasUnsavedChanges()) {
    event.preventDefault();
    event.returnValue = 'У вас есть несохранённые изменения!';
  }
};

onBeforeRouteLeave((to, from, next) => {
  if (hasUnsavedChanges()) {
    showModal.value = true;
    resolveLeave.value = next;
  } else {
    next();
  }
});

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

const confirmLeave = () => {
  showModal.value = false;
  resolveLeave.value?.();
};

const cancelLeave = () => {
  showModal.value = false;
};
</script>

<template>
  <n-modal v-model:show="showModal">
    <n-card title="Несохранённые изменения" style="max-width: 400px">
      <p>Вы уверены, что хотите совершить это действие? Неверно заполненые поля не сохранятся</p>
      <template #footer>
        <n-button type="error" @click="confirmLeave">Покинуть</n-button>
        <n-button @click="cancelLeave">Остаться</n-button>
      </template>
    </n-card>
  </n-modal>
</template>
