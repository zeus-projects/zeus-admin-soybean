<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" require-mark-placement="right-hanging" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="24" label="类型" path="type">
          <n-radio-group v-model:value="formModel.type" name="menuType">
            <n-radio-button
              v-for="item in MenuType"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </n-radio-group>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="上级菜单" path="parentId">
          <n-tree-select v-model:value="formModel.parentId" :options="options" key-field="id" label-field="name"
            default-expand-all/>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="菜单名称" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="菜单路由" path="path" v-if="formModel.type === 0">
          <n-input v-model:value="formModel.path" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="图标" path="icon" v-if="formModel.type === 0">
          <n-input v-model:value="formModel.icon" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="权限标识" path="permission" v-if="formModel.type === 1">
          <n-input v-model:value="formModel.permission" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="24" label="排序" path="weight">
          <n-input-number v-model:value="formModel.weight" clearable />
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
import { fetchMenuTree } from '@/service';
import { MenuType } from '@/constants/business'

export interface Props {
  visible: boolean;
  type?: 'add' | 'edit';
  editData?: Admin.Menu| null;
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
    add: '添加部门',
    edit: '编辑部门'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<Admin.Menu, 'type' | 'parentId' | 'name' | 'weight' | 'path'  | 'icon' | 'permission'>;
const formModel = reactive<FormModel>(createDefaultFormModel())
function createDefaultFormModel(): FormModel {
  return {
    type: 0,
    parentId: 0,
    name: '',
    path: '',
    icon: '',
    permission: '',
    weight: 0,
  };
}

const rules = {
  parentId: createRequiredFormRule('请选择上级菜单'),
  name: createRequiredFormRule('请输入菜单名称'),
  path: createRequiredFormRule('请输入菜单路由路径'),
  icon: createRequiredFormRule('请输入菜单图标标识'),
  permission: createRequiredFormRule('请输入按钮权限标识'),
};

const options = ref(Array())
async function loadMenuOptions() {
  const { data } = await fetchMenuTree();
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
  loadMenuOptions();
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
      console.log('ModalType: ', newValue);
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