import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { computed, watch, ref } from 'vue';
import type { Account } from '@/types/Account';

export interface AccountsStore {
  accounts: Account[];
  filteredAccounts: Account[];
  addAccount: () => void;
  removeAccount: (index: number) => void;
  isLoading: boolean;
}

export const useAccountsStore = defineStore('accounts', () => {
  const storage = useLocalStorage<Account[]>('accounts', []);
  const accounts = ref<Account[]>(storage.value || []);
  const isLoading = ref<boolean>(true);
  
  // Отфильтрованные аккаунты (только с valid: true)
  const filteredAccounts = computed(() => accounts.value.filter(account => account.valid));

  function addAccount() {
    accounts.value.push({ label: [], type: 'LDAP', login: '', password: '', valid: false });
  }

  function removeAccount(index: number) {
    accounts.value.splice(index, 1);
  }

  // Следим за отфильтрованными аккаунтами и обновляем localStorage
  watch(filteredAccounts, (newFiltered) => {
    storage.value = newFiltered;
    isLoading.value = false;
  }, { deep: true });

  return { accounts, filteredAccounts, addAccount, removeAccount, isLoading };
});
