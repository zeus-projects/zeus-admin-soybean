<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-800px">
    <n-form ref="formRef" label-placement="left" require-mark-placement="right-hanging" :label-width="80"
      :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="用户名" path="username">
          <n-input v-model:value="formModel.username" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="密码" path="password">
          <n-input type="password" v-model:value="formModel.password" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="真实姓名" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="昵称" path="nickname">
          <n-input v-model:value="formModel.nickname" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="手机号码" path="phone">
          <n-input v-model:value="formModel.phone" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="邮箱" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="角色" path="roleList">
          <n-select v-model:value="formModel.roleList" :options="roleOptions" value-field="id" label-field="name" multiple/>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="所属部门" path="deptId">
          <n-tree-select v-model:value="formModel.deptId" :options="deptOptions" key-field="id" label-field="name" checkable default-expand-all/>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="性别" path="gender">
          <n-select v-model:value="formModel.gender" :options="GenderType"/>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="状态" path="status">
          <n-select v-model:value="formModel.status" :options="EnableStatus"/>
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
import { createRequiredFormRule, requiredFormRule, formRules } from '@/utils';
import { fetchRoleList, fetchDeptTree } from '@/service';
import { EnableStatus, GenderType } from '@/constants';

export interface Props {
  visible: boolean;
  type?: 'add' | 'edit';
  editData?: Admin.User | null;
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
    add: '添加用户',
    edit: '编辑用户'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();
const formModel = reactive<Admin.User>(createDefaultFormModel())
function createDefaultFormModel(): Admin.User {
  return {
    id: 1,
    username: '',
    name: '',
    nickname: '',
    password: '',
    phone: '',
    email: '',
    gender: 1,
    deptId: 0,
    status: 0,
    roleList: []
  };
}
const rules = {
  username: createRequiredFormRule('请输入用户名'),
  password: formRules.pwd,
  name: createRequiredFormRule('请输入真实姓名'),
  phone: formRules.phone,
  email: formRules.email,
  roleList: createRequiredFormRule('请选择用户角色'),
  deptId: createRequiredFormRule('请选择用户所属部门'),
  status: requiredFormRule,
};

const roleOptions = ref()
const deptOptions = ref()
async function loadOptions() {
  const { data: roleData } = await fetchRoleList();
  roleOptions.value = roleData

  const { data: deptData } = await fetchDeptTree();
  deptOptions.value = [{
      id: 0,
      name: '根部门',
      children: deptData
    }
  ]
}

function handleUpdateFormModel(model: Partial<Admin.User>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  loadOptions();
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