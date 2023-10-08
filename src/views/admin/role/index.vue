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
          :pagination="pagination" />
        <TableForm v-model:visible="visible" :type="modalType" :edit-data="editData" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive, onMounted } from 'vue';
import type { Ref } from 'vue';
import { NSpace, NButton, NPopconfirm, NDataTable, NTag } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { useBoolean, useLoading } from '@/hooks';
import { fetchRolePage } from '@/service';
import TableForm from "./table-form.vue";
import type { ModalType } from './table-form.vue'
import { RoleDataScopeType } from '@/constants';

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const columns: Ref<DataTableColumns<Admin.Role>> = ref([
  {
    title: '角色名称',
    key: 'name'
  },
  {
    title: '角色标识',
    key: 'permission'
  },
  {
    title: '角色描述',
    key: 'desc'
  },
  {
    title: '数据权限',
    key: 'dataScopeType',
    render: row => {
      const obj = RoleDataScopeType.find(item => {
        return item.value === row.dataScopeType
      })
      return (
        <NTag type='primary'>{obj?.label}</NTag>
      )
    }
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
const rowKey = (rowData: Admin.Role) => {
  return rowData.name
}

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40 ,50],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

onMounted(() => {
  getTableData()
});

const getTableData = async () => {
  startLoading();
  const { data } = await fetchRolePage(pagination);
  tableData.value = data!.records;
  endLoading();
}

const modalType = ref<ModalType>('add');
function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<Admin.Role | null>(null);
function setEditData(data: Admin.Role | null) {
  editData.value = data;
}

const handleAddTable = () => {
  openModal()
  setModalType('add');
}

const handleEditTable = (row: Admin.Role) => {
  setEditData(row);
  setModalType('edit');
  openModal();
}

const handleDeleteTable = (name: Admin.Role['name'], id: Admin.Role['id']) => {
  window.$message?.info(`已删除菜单：${name}, ID 为 ${id}`);
}
</script>
