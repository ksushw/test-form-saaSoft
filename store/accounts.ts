import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type { Account } from '@/types/Account';

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = useLocalStorage<Account[]>('accounts', []);

  function addAccount() {
    accounts.value.push({ label: [], type: 'LDAP', login: '', password: '' });
  }

  function removeAccount(index: number) {
    accounts.value.splice(index, 1);
  }

  return { accounts, addAccount, removeAccount };
});

