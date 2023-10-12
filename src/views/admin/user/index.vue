<template>
  <div class="overflow-hidden">
      <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
      <n-grid-item span="0:24 640:24 1024:4">
        <n-card :bordered="false" class="h-full rounded-8px shadow-sm">
          <n-space vertical>
              <n-input placeholder="请输入部门名称" v-model:value="pattern" />
              <n-tree :data="deptOptions" key-field="id" label-field="name" :node-props="nodeProps" :pattern="pattern"
                default-expand-all selectable block-line cancelable />
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item span="0:24 640:24 1024:20">
        <n-card :bordered="false" class="h-full rounded-8px shadow-sm">
          <div class="flex-col h-full">
            <!-- 搜索表单 -->
            <n-form inline label-placement="left" :label-width="60">
                <n-form-item label="用户名" path="searchModel.username">
                  <n-input  placeholder="请输入用户名" clearable/>
                </n-form-item>
                <n-form-item>
                  <n-space class="pb-12px" justify="end">
                    <n-button type="primary" @click="getTableData()">
                      <icon-fe-search class="mr-4px text-20px"/>查询
                    </n-button>
                    <n-button @click="getTableData()">
                      <icon-mdi-refresh class="mr-4px text-20px"/>重置
                    </n-button>
                  </n-space>
                </n-form-item>
            </n-form>
            <!-- 操作 -->
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
            <!-- 表格 -->
            <n-data-table ref="tableRef" :columns="columns" :data="tableData" :loading="loading"
              :pagination="pagination" />
            <TableForm v-model:visible="visible" :type="modalType" :edit-data="editData" />
          </div>
        </n-card>
      </n-grid-item>
      </n-grid>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive, onMounted } from 'vue';
import type { Ref } from 'vue';
import { NSpace, NButton, NPopconfirm, NDataTable, NTag, NSwitch } from 'naive-ui';
import type { DataTableColumns, TreeOption } from 'naive-ui';
import { useBoolean, useLoading } from '@/hooks';
import { fetchDeptTree, fetchUserPage } from '@/service';
import TableForm from "./table-form.vue";
import type { ModalType } from './table-form.vue'

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();
const slots = defineSlots()

const columns: Ref<DataTableColumns<Admin.User>> = ref([
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '姓名',
    key: 'fullname'
  },
  {
    title: '昵称',
    key: 'nickname'
  },
  {
    title: '手机号码',
    key: 'phone'
  },
  {
    title: '状态',
    key: 'status',
    render: row => {
      return (
        <NSpace>
          {row.status === 0 ? <NTag type='success'>正常</NTag> : <NTag type='error'>锁定</NTag>}
          <NPopconfirm onPositive-click={() => {
            row.status = row.status == 0 ? 1 : 0
          }
          }>
            {{
              default: () => '确认修改该用户的状态？',
              trigger: () =>
                <NSwitch checkedValue={0} uncheckedValue={1} value={row.status} size='small' />
            }}
          </NPopconfirm>

        </NSpace>
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
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.fullname, row.id)}>
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

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40, 50],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

const pattern = ref()
const deptId = ref()
const deptOptions = ref()
async function loadOptions() {
  const { data: deptData } = await fetchDeptTree();
  deptOptions.value = [{
    id: 0,
    name: '根部门',
    children: deptData
  }
  ]
}

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      deptId.value = option.id;
      getTableData()
    }
  }
}

onMounted(() => {
  loadOptions()
  getTableData()
});

const getTableData = async () => {
  startLoading();
  const { data } = await fetchUserPage(pagination, deptId.value);
  tableData.value = data!.records;
  endLoading();
}

const modalType = ref<ModalType>('add');
function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<Admin.User | null>(null);
function setEditData(data: Admin.User | null) {
  editData.value = data;
}

const handleAddTable = () => {
  openModal()
  setModalType('add');
}

const handleEditTable = (row: Admin.User) => {
  setEditData(row);
  setModalType('edit');
  openModal();
}

const handleDeleteTable = (name: Admin.User['fullname'], id: Admin.User['id']) => {
  window.$message?.info(`已删除用户：${name}, ID 为 ${id}`);
}
</script>
