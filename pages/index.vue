<script setup>
import { ref, computed, onMounted, h, nextTick } from 'vue';
import { useAccountsStore } from '@/store/accounts';
import {
  NButton,
  NCard,
  NIcon,
  NInput,
  NAlert,
  NDataTable,
  NSelect,
  NFormItem
} from 'naive-ui';
import { useNuxtApp } from '#app';
import { Add, HelpCircleOutline, TrashBinOutline } from '@vicons/ionicons5';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form } from 'vee-validate';

const store = ref();
const dataTableRef = ref(null); // Реф для n-data-table
const { $animate } = useNuxtApp();

const types = [
  { label: 'LDAP', value: 'LDAP' },
  { label: 'Локальная', value: 'Local' },
];

const accountSchema = Yup.object({
  label: Yup.string().max(50, 'Максимум 50 символов'),
  type: Yup.string()
    .oneOf(['LDAP', 'Local'], 'Выберите допустимое значение')
    .required('Тип записи обязателен'),
  login: Yup.string()
    .max(100, 'Максимум 100 символов')
    .required('Логин обязателен'),
    password: Yup.string()
  .transform((value, originalValue) => originalValue === '' ? undefined : value)
  .max(100, 'Максимум 100 символов')
  .when('type', {
    is: 'Local',
    then: schema => schema.required('Пароль обязателен'),
    otherwise: schema => schema.nullable()
  })
})

const schema = Yup.object({
  accounts: Yup.array().of(accountSchema)
})


const columns = [
  {
    title: 'Метка',
    key: 'label',
    render(row, index) {
      return h(
        'div',
        { style: 'position: relative; display: flex; flex-direction: column;' },
        [
          h(
            NFormItem,
            {  path: `accounts.${index}.label` },
            {
              default: () =>
                h(Field, {
                  name: `accounts.${index}.label`,
                  as: NInput,
                  placeholder: 'Введите метки через ;',
                  maxlength: 50,
                  modelValue: row.label,
                  'onUpdate:modelValue': (val) => (row.label = val)
                }),
              feedback: () =>
                h(ErrorMessage, {
                  name: `accounts.${index}.label`,
                  style: 'height: 12px; margin-top: -2px; color: red; font-size: 12px;'
                })
            }
          )
        ]
      )
    }
  },
  {
    title: 'Тип',
    key: 'type',
    width: 200,
    render(row, index) {
      return h(
        'div',
        { style: 'position: relative; display: flex; flex-direction: column;' },
        [
          h(
            NFormItem,
            {  path: `accounts.${index}.type` },
            {
              default: () =>
                h(Field, {
                  name: `accounts.${index}.type`,
                  as: NSelect,
                  options: types,
                  modelValue: row.type,
                  'onUpdate:modelValue': (val) => {
                    row.type = val
                    // Если выбран LDAP, очищаем поле пароля
                    if (val === 'LDAP') {
                      row.password = null
                    }
                  }
                }),
              feedback: () =>
                h(ErrorMessage, {
                  name: `accounts.${index}.type`,
                  style: 'height: 12px; margin-top: -2px; color: red; font-size: 12px;'
                })
            }
          )
        ]
      )
    }
  },
  {
    title: 'Логин',
    key: 'login',
    width: 200,
    render(row, index) {
      return h(
        'div',
        { style: 'position: relative; display: flex; flex-direction: column;' },
        [
          h(
            NFormItem,
            {  path: `accounts.${index}.login` },
            {
              default: () =>
                h(Field, {
                  name: `accounts.${index}.login`,
                  as: NInput,
                  placeholder: 'Логин',
                  maxlength: 100,
                  modelValue: row.login,
                  'onUpdate:modelValue': (val) => (row.login = val)
                }),
              feedback: () =>
                h(ErrorMessage, {
                  name: `login`,
                  style: 'height: 12px; color: red; font-size: 12px;'
                })
            }
          )
        ]
      )
    }
  },
  {
    title: 'Пароль',
    key: 'password',
    width: 200,
    render(row, index) {
      // Показываем поле пароля только для локальных записей
      if (row.type !== 'Local') return h('span')
      return h(
        'div',
        { style: 'position: relative; display: flex; flex-direction: column;' },
        [
          h(
            NFormItem,
            {  path: `accounts.${index}.password` },
            {
              default: () =>
                h(Field, {
                  name: `accounts.${index}.password`,
                  as: NInput,
                  type: 'password',
                  placeholder: 'Пароль',
                  maxlength: 100,
                  modelValue: row.password,
                  'onUpdate:modelValue': (val) => (row.password = val)
                }),
              feedback: () =>
                h(ErrorMessage, {
                  name: `accounts.${index}.password`,
                  style: 'height: 12px; margin-top: -4px; color: red; font-size: 12px;'
                })
            }
          )
        ]
      )
    }
  },
  {
    title: 'Действие',
    key: 'actions',
    width: 100,
    render(row, index) {
      return h(
        NButton,
        {
          type: 'error',
          onClick: () => removeAccount(index, row.id)
        },
        {
          default: () =>
            h(NIcon, null, { default: () => h(TrashBinOutline) })
        }
      )
    }
  }
]



const addAccount = () => {
  store.value.addAccount();
  setTimeout(() => {
    const rows = dataTableRef.value?.$el.querySelectorAll('tbody tr');
    if (rows && rows.length) {
      $animate(
        rows[rows.length - 1],
        {
          opacity: [0, 1],
          transform: ['translateX(-30px)', 'translateX(0)'],
        },
        { duration: 0.3 }
      );
    }
  }, 10);
};

const removeAccount = (index, id) => {
  const rowToRemove = dataTableRef.value?.$el.querySelector(
    `tbody tr:nth-of-type(${index + 1})`
  );

  if (!rowToRemove) {
    store.value.removeAccount(index);
    return;
  }

  $animate(
    rowToRemove,
    { opacity: [1, 0], transform: ['translateX(0)', 'translateX(-50%)'] },
    { duration: 0.3 }
  ).then(() => {
    store.value.removeAccount(index);
    $animate(
      rowToRemove,
      { opacity: [0, 1], transform: ['translateX(-50%)', 'translateX(0)'] },
      { duration: 0 }
    );
  });
};

const animateRowsSequentially = () => {
  const rows = dataTableRef.value?.$el.querySelectorAll('tbody tr');
  if (rows) {
    rows.forEach((row, index) => {
      $animate(
        row,
        {
          opacity: [0, 1],
          transform: ['translateX(-30px)', 'translateY(0)'],
        },
        {
          duration: 0.3,
          delay: index * 0.2,
        }
      );
    });
  }
};

onMounted(async () => {
  store.value = useAccountsStore();
  await nextTick();
  animateRowsSequentially();
});
</script>

<template>
  <div class="container p-5 pt-10">
    <n-card title="Учётные записи" class="h-full">
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

      <Form :validation-schema="schema" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">

      <n-data-table
      class="h-full"
      :max-height="600"
      :scroll-x="1000"
        ref="dataTableRef"
        v-if="store?.accounts"
        :columns="columns"
        :data="store.accounts"
        :bordered="true"
         />
        </form>
      </Form>
    </n-card>
  </div>
</template>

<style scoped>
.container {
  max-width: 1600px;
  width: 100%;
  margin: auto;
  height: 100%;
}
:deep(.n-data-table-tr:first-of-type) {
  opacity: 1;
  transform: translateX(0);
}
:deep(.n-data-table-tr) {
  opacity: 0;
  transform: translateX(-30px);
}

:deep(.n-data-table-tbody tr) {
 padding: 2px 5px;
}

:deep(.n-form-item.n-form-item--top-labelled) {
    grid-template-rows: min-content;
}
.account {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}
</style>
