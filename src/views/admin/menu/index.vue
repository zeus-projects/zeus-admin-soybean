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
        <n-data-table ref="tableRef" :columns="columns" :data="tableData" :row-key="rowKey" :loading="loading"
           />
        <TableForm v-model:visible="visible" :type="modalType" :edit-data="editData" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted, h } from 'vue';
import type { Ref } from 'vue';
import { NSpace, NButton, NPopconfirm, NDataTable, NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { useBoolean, useLoading } from '@/hooks';
import { fetchMenuTree } from '@/service';
import TableForm from "./table-form.vue";
import type { ModalType } from './table-form.vue'
import SvgIcon from '@/components/custom/svg-icon.vue';

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const columns: Ref<DataTableColumns<Admin.Menu>> = ref([
  {
    title: '菜单名称',
    key: 'name'
  },
  {
    title: '排序',
    key: 'weight'
  },
  {
    title: '图标',
    key: 'icon',
    render: (rowData: Admin.Menu) => {
      if (rowData.icon) {
        return h(SvgIcon, { icon: rowData.icon});
      }
    }
  },
  {
    title: '路由',
    key: 'path'
  },
  {
    title: '类型',
    key: 'type',
    render: row => {
      return (
        <NSpace justify={'start'}>
          {
            row.type === 0 ? <NTag type="success">菜单</NTag> : <NTag type="info">按钮</NTag>
          }
        </NSpace>
      );
    }
  },
  {
    title: '权限标识',
    key: 'permission'
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} type='info' quaternary onClick={() => handleEditTable(row)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.name, row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size={'small'} type='error' quaternary>删除</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      );
    }
  }
]);
const tableRef = ref();
const tableData = ref<any>([]);
const rowKey = (rowData: Admin.Menu) => {
  return rowData.name
}

onMounted(() => {
  getTableData()
});

const getTableData = async () => {
  startLoading();
  const { data } = await fetchMenuTree();
  tableData.value = data;
  endLoading();
}

const modalType = ref<ModalType>('add');
function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<Admin.Menu | null>(null);
function setEditData(data: Admin.Menu | null) {
  editData.value = data;
}

const handleAddTable = () => {
  openModal()
  setModalType('add');
}

const handleEditTable = (row: Admin.Menu) => {
  setEditData(row);
  setModalType('edit');
  openModal();
}

const handleDeleteTable = (name: Admin.Menu['name'], id: Admin.Menu['id']) => {
  window.$message?.info(`已删除菜单：${name}, ID 为 ${id}`);
}
</script>
