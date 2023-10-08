<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="上级部门" path="parentId">
          <n-tree-select v-model:value="formModel.parentId" :options="options" key-field="id" label-field="name"
            default-expand-all/>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="部门名称" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="排序" path="weight">
          <n-input-number v-model:value="formModel.weight" clearable />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="状态" path="status">
          <n-select v-model:value="formModel.status" :options="EnableStatus" />
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
import { EnableStatus } from '@/constants/business'

export interface Props {
  visible: boolean;
  type?: 'add' | 'edit';
  editData?: Admin.Dept | null;
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
    add: '添加菜单',
    edit: '编辑菜单'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<Admin.Dept, 'parentId' | 'name' | 'weight' | 'status'>;
const formModel = reactive<FormModel>(createDefaultFormModel())
function createDefaultFormModel(): FormModel {
  return {
    parentId: 0,
    name: '',
    weight: 0,
    status: 0
  };
}

const rules = {
  name: createRequiredFormRule('请输入部门名称')
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
      console.log('data:', formModel);
      window.$message?.success('新增成功!');
      closeModal();
    },
    edit: () => {
      console.log('data:', formModel);
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