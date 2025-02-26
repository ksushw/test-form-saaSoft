import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';



interface Account {
  label: string[];
  type: string;
  login: string;
  password: string;
}

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

