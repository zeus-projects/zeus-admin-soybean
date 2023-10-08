
import type { MockMethod } from 'vite-plugin-mock';

const tableData: Admin.Menu[] = [
  {
    id: 1,
    name: '系统管理',
    parentId: 0,
    weight: 1,
    icon: 'ep:home-filled',
    type: 0,
    path: '/admin',
    permission: '',
    children: [
      {
        id: 2,
        name: '部门管理',
        parentId: 1,
        weight: 1,
        icon: 'mingcute:government-line',
        type: 0,
        path: '/admin/dept',
        permission: '',
        children: [
          {
            id: 21,
            name: '部门新增',
            parentId: 2,
            weight: 1,
            type: 1,
            permission: 'sys_dept_add'
          },
          {
            id: 22,
            name: '部门修改',
            parentId: 2,
            weight: 2,
            type: 1,
            permission: 'sys_dept_edit'
          },
          {
            id: 23,
            name: '部门删除',
            parentId: 2,
            weight: 3,
            type: 1,
            permission: 'sys_dept_delete'
          }
        ]
      },
      {
        id: 3,
        name: '菜单管理',
        parentId: 1,
        weight: 2,
        icon: 'ep:menu',
        type: 0,
        path: '/admin/menu',
        permission: '',
        children: [
          {
            id: 31,
            name: '菜单新增',
            parentId: 3,
            weight: 1,
            type: 1,
            permission: 'sys_menu_add'
          },
          {
            id: 32,
            name: '菜单修改',
            parentId: 3,
            weight: 2,
            type: 1,
            permission: 'sys_menu_edit'
          },
          {
            id: 33,
            name: '菜单删除',
            parentId: 3,
            weight: 3,
            type: 1,
            permission: 'sys_menu_delete'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: '模型管理',
    parentId: 0,
    weight: 2,
    icon: 'carbon:model-alt',
    type: 0,
    path: '/lowcode',
    permission: ''
  }
]

const apis: MockMethod[] = [
  {
    url: '/mock/admin/menu/tree',
    method: 'get',
    response: (): Service.MockServiceResult => {
      return {
        code: 200,
        message: 'ok',
        data: tableData
      };
    }
  }
];

export default apis;
