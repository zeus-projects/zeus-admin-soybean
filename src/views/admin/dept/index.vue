<template>
  <n-data-table ref="tableRef" :columns="columns" :data="tableData" :loading="loading" flex-height />
</template>

<script setup lang="tsx">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { NSpace, NButton, NPopconfirm, NDataTable } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { useBoolean, useLoading } from '@/hooks';
import { fetchDeptTree } from '~/src/service';

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const columns: Ref<DataTableColumns> = ref([
  {
    title: '部门名称',
    key: 'name'
  },
  {
    title: '排序',
    key: 'weight',
    sorter: (row1, row2) => {
      return row1.weight - row2.weight;
    }
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size={'small'}>删除</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      );
    }
  }
]);
const tableRef = ref();
const tableData = ref<any>([]);

onMounted(async () => {
  startLoading();
  const { data } = await fetchDeptTree();
  tableData.value = data;
  endLoading();
});
</script>
