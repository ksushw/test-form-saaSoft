import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

interface Account {
    label: string
    type: string
    login: string
    password: string
  }

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: useLocalStorage<Account[]>('accounts', [])
  }),
  actions: {
    addAccount() {
      this.accounts.push({ label: '', type: 'LDAP', login: '', password: '' })
    },
    removeAccount(index: number) {
      this.accounts.splice(index, 1)
    }
  }
})
