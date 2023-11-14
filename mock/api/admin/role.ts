import type { MockMethod } from 'vite-plugin-mock';

const tableData: Admin.Role[] = [
  {
    id: 1,
    name: '管理员',
    type: 0,
    permission: 'ROLE_ADMIN',
    description: '系统管理员',
    dataScopeType: 0,
    dataScope: [],
    menus: []
  },
  {
    id: 2,
    name: '普通用户',
    type: 1,
    permission: 'ROLE_COMMON_USER',
    description: '普通用户',
    dataScopeType: 2,
    dataScope: [],
    menus: []
  },
  {
    id: 3,
    name: '开发人员',
    type: 1,
    permission: 'ROLE_DEV_USER',
    description: '开发人员',
    dataScopeType: 1,
    dataScope: [3],
    menus: []
  }
];

const apis: MockMethod[] = [
  {
    url: '/mock/admin/role/page',
    method: 'get',
    response: (): Service.MockServiceResult => {
      return {
        code: '00000',
        message: 'ok',
        data: {
          current: 1,
          size: 10,
          total: 2,
          records: tableData
        }
      };
    }
  },
  {
    url: '/mock/admin/role',
    method: 'get',
    response: (): Service.MockServiceResult => {
      return {
        code: '00000',
        message: 'ok',
        data: tableData
      };
    }
  }
];

export default apis;
