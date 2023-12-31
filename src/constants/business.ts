import { transformObjectToOption } from './_shared';

export const loginModuleLabels: Record<UnionKey.LoginModule, string> = {
  'pwd-login': '账密登录',
  'code-login': '手机验证码登录',
  register: '注册',
  'reset-pwd': '重置密码',
  'bind-wechat': '微信绑定'
};

export const userRoleLabels: Record<Auth.RoleType, string> = {
  super: '超级管理员',
  admin: '管理员',
  user: '普通用户'
};
export const userRoleOptions = transformObjectToOption(userRoleLabels);

export const EnableStatus = [
  {
    label: '启用',
    value: 0
  },
  {
    label: '禁用',
    value: 1
  }
]

export const MenuType = [
  {
    label: '菜单',
    value: 0
  },
  {
    label: '按钮',
    value: 1
  }
]

export const RoleDataScopeType = [
  {
    label: '全部',
    value: 0
  },
  {
    label: '自定义',
    value: 1
  },
  {
    label: '本级及子级',
    value: 2
  },
  {
    label: '本级',
    value: 3
  },
  {
    label: '本人',
    value: 4
  }
]

export const GenderType = [
  {
    label: '女',
    value: 0
  },
  {
    label: '男',
    value: 1
  }
]