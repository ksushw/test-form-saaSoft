<script setup>
import { ref, computed } from 'vue';
import { useAccountsStore } from '@/store/accounts';
import { NButton, NCard, NIcon, NInput, NAlert, NDataTable, NSelect } from 'naive-ui';
import { useNuxtApp } from '#app';
import { Add, HelpCircleOutline, TrashBinOutline } from '@vicons/ionicons5';

const store = useAccountsStore();
const { $animate } = useNuxtApp();
const getRowKey = (row) => row.id;


const types = [
  { label: 'LDAP', value: 'LDAP' },
  { label: 'Локальная', value: 'Local' },
];

const columns = [
  {
    title: 'Метка',
    key: 'label',
    render(row) {
      return h(NInput, {
        value: row.label,
        onUpdateValue: (val) => (row.label = val),
        placeholder: 'Метка',
      });
    },
  },
  {
    title: 'Тип',
    key: 'type',
    render(row) {
      return h(NSelect, {
        value: row.type,
        options: types,
        onUpdateValue: (val) => (row.type = val),
      });
    },
  },
  {
    title: 'Логин',
    key: 'login',
    render(row) {
      return h(NInput, {
        value: row.login,
        onUpdateValue: (val) => (row.login = val),
        placeholder: 'Логин',
      });
    },
  },
  {
  title: 'Пароль',
  key: 'password',
  render(row, index) {
    return row.type === 'Local'
      ? h(NInput, {
          value: row.password,
          type: 'password',
          onUpdateValue: (val) => (row.password = val),
          placeholder: 'Пароль' + index.toString(),
        })
      : h('span'); // Заменил null на пустой span
  },
  },
  {
    title: 'Действие',
    key: 'actions',
    render(row, index) {
      return h(
        NButton,
        {
          type: 'error',
          onClick: () => removeAccount(index, row.id),
        },
        { default: () => h(NIcon, null, { default: () => h(TrashBinOutline) }) }
      );
    },
  },
];



const addAccount = () => {
  store.addAccount();
  setTimeout(() => {
    const rows = document.querySelectorAll('.n-data-table tbody tr');
    if (rows.length) {
      $animate(
        rows[rows.length - 1],
        { opacity: [0, 1], transform: ['translateX(-30px)', 'translateX(0)'] },
        { duration: 0.3 }
      );
    }
  }, 10);
};


const removeAccount = (index, id) => {
  const rowToRemove = document.querySelector(`.n-data-table-tbody tr:nth-of-type(${index + 1})`);


  if (!rowToRemove) {
    store.removeAccount(index);
    return;
  }

  $animate(
    rowToRemove,
    { opacity: [1, 0], transform: ['translateX(0)', 'translateX(-50%)'] },
    { duration: 0.3 }
  ).then(() => {
    store.removeAccount(index);
    $animate(
    rowToRemove,
    { opacity: [0, 1], transform: ['translateX(-50%)', 'translateX(0)'] },
    { duration: 0 }
  )
  });
};






</script>

<template>
  <div class="container p-5 pt-10">
    <n-card title="Учётные записи">
      <template #header-extra>
        <n-button strong primary circle @click="addAccount">
          <n-icon>
            <Add />
          </n-icon>
        </n-button>
      </template>


      
        <n-alert type="info" closable>
          <template #icon>
            <n-icon size="18">
              <HelpCircleOutline />
            </n-icon>
          </template>
          Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </n-alert>

        <n-data-table
  :columns="columns"
  :data="store.accounts"
  :bordered="true"
  :single-line="false"
:row-key="getRowKey"
/>
      

      <!-- <div v-for="(account, index) in store.accounts" :key="index" class="account">
        <n-input v-model="account.label" placeholder="Метка" />
        <n-select v-model="account.type" :options="types" />
        <n-input v-model="account.login" placeholder="Логин" />
        <n-input v-if="account.type === 'Local'" v-model="account.password" type="password" placeholder="Пароль" />
        <n-button type="error" @click="store.removeAccount(index)"><n-icon>
            <TrashBinOutline />
        </n-icon></n-button>
      </div> -->


    </n-card>





  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  width: 100%;
  /* margin: auto;
    padding: 40px 20px; */
}
:deep(.n-data-table-tr:first-of-type) {
  opacity: 1;
  transform: translateX(0);
}
:deep(.n-data-table-tr) {
  opacity: 0;
  transform: translateX(-30px);
}

.account {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}


</style>
