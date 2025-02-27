<script setup lang="ts">
  import { ref, onMounted, nextTick, h } from 'vue';
  import { useNuxtApp } from '#imports';
  import { useAccountsStore } from '@/store/accounts';

  import {
    NButton,
    NCard,
    NIcon,
    NInput,
    NAlert,
    NDataTable,
    NSelect,
    NFormItem,
  } from 'naive-ui';
  import { Add, HelpCircleOutline, TrashBinOutline } from '@vicons/ionicons5';

  import { useForm, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';

  import type { Account } from '@/types/Account';

  const store = ref();
  const dataTableRef = ref<InstanceType<typeof NDataTable> | null>(null);

  const { $animate } = useNuxtApp() as unknown as {
    $animate: (
      el: Element,
      keyframes: { opacity?: number[]; transform?: string[] },
      options?: { duration?: number; delay?: number }
    ) => Promise<void>;
  };

  const accountSchema = yup.object({
    label: yup.string().max(50, 'Максимум 50 символов'),
    type: yup
      .string()
      .oneOf(['LDAP', 'Local'], 'Выберите допустимое значение')
      .required('Тип записи обязателен'),
    login: yup
      .string()
      .max(100, 'Максимум 100 символов')
      .required('Логин обязателен'),
    password: yup
      .string()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      )
      .max(100, 'Максимум 100 символов')
      .when('type', {
        is: 'Local',
        then: (schema) => schema.required('Пароль обязателен'),
        otherwise: (schema) => schema.nullable(),
      }),
  });

  const validationSchema = yup.object({
    accounts: yup.array().of(accountSchema),
  });

  const { values, handleSubmit, setValues, setFieldValue } = useForm<{
    accounts: Account[];
  }>({
    validationSchema,
    initialValues: { accounts: [] },
  });

  const typesAccount = [
    { label: 'LDAP', value: 'LDAP' },
    { label: 'Локальная', value: 'Local' },
  ];

  const columns = [
    {
      title: 'Метка',
      key: 'label',
      render(row: Account, index: number) {
        return h(
          'div',
          {
            style: 'position: relative; display: flex; flex-direction: column;',
          },
          [
            h(
              NFormItem,
              { path: `accounts.${index}.label` },
              {
                default: () =>
                  h(NInput, {
                    placeholder: 'Введите метки через ;',
                    maxlength: 50,
                    value: row.label.join(';'),
                    onUpdateValue: (val) => {
                      setFieldValue(`accounts.${index}.label`, val.split(';'));
                    },
                    onBlur: () => validateAccountOnBlur(index),
                  }),
              }
            ),
          ]
        );
      },
    },
    {
      title: 'Тип',
      key: 'type',
      width: 200,
      render(row: Account, index: number) {
        return h(
          'div',
          {
            style: 'position: relative; display: flex; flex-direction: column;',
          },
          [
            h(
              NFormItem,
              { path: `accounts.${index}.type` },
              {
                default: () =>
                  h(NSelect, {
                    options: typesAccount,
                    value: row.type,
                    onUpdateValue: (val) => {
                      setFieldValue(`accounts.${index}.type`, val);
                      validateAccountOnBlur(index)
                    },
                   
                  }),
                feedback: () =>
                  h(ErrorMessage, {
                    name: `accounts.${index}.type`,
                    style:
                      'height: 12px; margin-top: -2px; color: red; font-size: 12px;',
                  }),
              }
            ),
          ]
        );
      },
    },
    {
      title: 'Логин',
      key: 'login',
      width: 200,
      render(row: Account, index: number) {
        return h(
          'div',
          {
            style: 'position: relative; display: flex; flex-direction: column;',
          },
          [
            h(
              NFormItem,
              { path: `accounts.${index}.login` },
              {
                default: () =>
                  h(NInput, {
                    placeholder: 'Логин',
                    maxlength: 100,
                    value: row.login,
                    onUpdateValue: (val) => {
                      setFieldValue(`accounts.${index}.login`, val);
                    },
                    onBlur: () => validateAccountOnBlur(index),
                  }),
                feedback: () =>
                  h(ErrorMessage, {
                    name: `accounts.${index}.login`,
                    style: 'height: 12px; color: red; font-size: 12px;',
                  }),
              }
            ),
          ]
        );
      },
    },
    {
      title: 'Пароль',
      key: 'password',
      width: 200,
      render(row: Account, index: number) {
        if (row.type !== 'Local') return h('span');
        return h(
          'div',
          {
            style: 'position: relative; display: flex; flex-direction: column;',
          },
          [
            h(
              NFormItem,
              { path: `accounts.${index}.password` },
              {
                default: () =>
                  h(NInput, {
                    type: 'password',
                    placeholder: 'Пароль',
                    maxlength: 100,
                    value: row.password,
                    onUpdateValue: (val) =>
                      setFieldValue(`accounts.${index}.password`, val),
                      onBlur: () => validateAccountOnBlur(index),
                  }),
                feedback: () =>
                  h(ErrorMessage, {
                    name: `accounts.${index}.password`,
                    style:
                      'height: 12px; margin-top: -4px; color: red; font-size: 12px;',
                  }),
              }
            ),
          ]
        );
      },
    },
    {
      title: 'Действие',
      key: 'actions',
      width: 100,
      render(row: Account, index: number) {
        return h(
          NButton,
          {
            type: 'error',
            onClick: () => removeAccount(index),
          },
          {
            default: () =>
              h(NIcon, null, { default: () => h(TrashBinOutline) }),
          }
        );
      },
    },
  ];

  const animateRowsSequentially = () => {
    const rows: NodeListOf<HTMLTableRowElement> =
      dataTableRef.value?.$el.querySelectorAll('tbody tr');
    if (rows) {
      rows.forEach((row, index) => {
        $animate(
          row,
          {
            opacity: [0, 1],
            transform: ['translateX(-30px)', 'translateX(0)'],
          },
          { duration: 0.3, delay: index * 0.2 }
        );
      });
    }
  };

  const addAccount = () => {
    store.value.addAccount();
    setValues({ accounts: store.value.accounts });
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

  const removeAccount = (index: number) => {
    const rowToRemove = dataTableRef.value?.$el.querySelector(
      `tbody tr:nth-of-type(${index + 1})`
    );
    if (!rowToRemove) {
      store.value.removeAccount(index);
      setValues({ accounts: store.value.accounts });
      return;
    }
    $animate(
      rowToRemove,
      { opacity: [1, 0], transform: ['translateX(0)', 'translateX(-50%)'] },
      { duration: 0.3 }
    ).then(() => {
      store.value.removeAccount(index);
      setValues({ accounts: store.value.accounts });
      $animate(
        rowToRemove,
        { opacity: [0, 1], transform: ['translateX(-50%)', 'translateX(0)'] },
        { duration: 0 }
      );
    });
  };

  const validateAccountOnBlur = (index: number) => {
    const account = store.value.accounts[index];
    if (account) {
      account.valid =
        !!account.login && (account.type !== 'Local' || !!account.password);
    }
  };

  const onSubmit = handleSubmit((formValues) => {
    console.log('Submitted values:', formValues);
  });

  onMounted(async () => {
    store.value = useAccountsStore();
    setValues({ accounts: store.value.accounts });
    await nextTick();
    animateRowsSequentially();
  });
</script>

<template>
  <div class="container p-7 pt-10">
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
          <n-icon class="w-3xs h-3xs" >
            <HelpCircleOutline class="w-3xs h-3xs" />
          </n-icon>
        </template>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </n-alert>
      <form @submit.prevent="onSubmit">
        <n-data-table
          v-if="store?.accounts"
          class="h-75"
          :height="800"
          :scroll-x="1000"
          ref="dataTableRef"
          :columns="columns"
          :data="values.accounts"
          :bordered="true" />
      </form>
    </n-card>
  </div>
</template>

<style scoped>
  .container {
    max-width: 1500px;
    width: 100%;
    margin: auto;
    height: 100%;
  }
</style>
