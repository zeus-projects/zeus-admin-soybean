<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" require-mark-placement="right-hanging" :label-width="80"
      :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="24" label="角色名称" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="角色标识" path="permission">
          <n-input v-model:value="formModel.permission" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="角色描述" path="desc">
          <n-input v-model:value="formModel.desc" type="textarea"/>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="数据权限" path="dataScopeType">
          <n-select v-model:value="formModel.dataScopeType" :options="RoleDataScopeType" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="自定义权限" path="dataScope" v-if="formModel.dataScopeType === 1">
          <n-tree-select multiple cascade checkable v-model:value="formModel.dataScope" :options="options" key-field="id"
            label-field="name" default-expand-all />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit">确定</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>
<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import type { FormInst } from 'naive-ui';
import { createRequiredFormRule } from '@/utils';
import { fetchDeptTree } from '@/service';
import { RoleDataScopeType } from '@/constants';

export interface Props {
  visible: boolean;
  type?: 'add' | 'edit';
  editData?: Admin.Role | null;
}

export type ModalType = NonNullable<Props['type']>;

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});
interface Emits {
  (e: 'update:visible', visible: boolean): void;
}
const emit = defineEmits<Emits>();
const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加角色',
    edit: '编辑角色'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<Admin.Role, 'name' | 'permission' | 'desc' | 'dataScopeType' | 'dataScope'>;
const formModel = reactive<FormModel>(createDefaultFormModel())
function createDefaultFormModel(): FormModel {
  return {
    name: '',
    permission: '',
    desc: '',
    dataScopeType: 1,
    dataScope: [3],
  };
}

const rules = {
  name: createRequiredFormRule('请输入角色名称'),
  permission: createRequiredFormRule('请输入角色标识'),
  dataScopeType: createRequiredFormRule('请选择角色数据权限类型')
};

const options = ref(Array())
async function loadDeptOptions() {
  const { data } = await fetchDeptTree();
  options.value = [
    {
      id: 0,
      name: '根部门',
      children: data
    }
  ]
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  loadDeptOptions();
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };
  handlers[props.type]();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);

async function handleSubmit() {
  await formRef.value?.validate();
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      console.log('sbumit add data:', formModel);
      window.$message?.success('新增成功!');
      closeModal();
    },
    edit: () => {
      console.log('sbumit edit data:', formModel);
      window.$message?.success('修改成功!');
      closeModal();
    }
  };
  handlers[props.type]();
  closeModal();
}
</script>
<style lang="">
  
</style>