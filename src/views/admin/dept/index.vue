<template>
  <div class="overflow-hidden">
    <n-card :bordered="false" class="h-full rounded-8px shadow-sm">
      <div class="flex-col h-full">
        <n-space class="pb-12px" justify="space-between">
          <n-space>
            <n-button type="primary" @click="handleAddTable">
              <icon-ic-round-plus class="mr-4px text-20px" />
              新增
            </n-button>
          </n-space>
          <n-space align="center" :size="18">
            <n-button size="small" type="primary" @click="getTableData">
              <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
              刷新表格
            </n-button>
            <column-setting v-model:columns="columns" />
          </n-space>
        </n-space>
        <n-data-table ref="tableRef" :columns="columns" :data="tableData" :loading="loading" flex-height
          class="flex-1-hidden" />
        <DeptForm v-model:visible="visible" :type="modalType" :edit-data="editData" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { NSpace, NButton, NPopconfirm, NDataTable } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { useBoolean, useLoading } from '@/hooks';
import { fetchDeptTree } from '@/service';
import DeptForm from "./dept-form.vue";
import type { ModalType } from './dept-form.vue'

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const columns: Ref<DataTableColumns<Admin.SysDept>> = ref([
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
          <NButton size={'small'} onClick={() => handleEditTable(row)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.name, row.id)}>
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

onMounted(() => {
  getTableData()
});

const getTableData = async () => {
  startLoading();
  const { data } = await fetchDeptTree();
  tableData.value = data;
  endLoading();
}

const modalType = ref<ModalType>('add');
function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<Admin.SysDept | null>(null);
function setEditData(data: Admin.SysDept | null) {
  editData.value = data;
}

const handleAddTable = () => {
  openModal()
  setModalType('add');
}

const handleEditTable = (row: Admin.SysDept) => {
  setEditData(row);
  setModalType('edit');
  openModal();
}

const handleDeleteTable = (name: Admin.SysDept['name'], id: Admin.SysDept['id']) => {
  window.$message?.info(`已删除部门：${name}, ID 为 ${id}`);
}
</script>
