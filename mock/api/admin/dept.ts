import type { MockMethod } from 'vite-plugin-mock';

const tableData = [
  {
    id: 1,
    name: '平台部',
    parentId: 0,
    level: 1,
    weight: 1,
    status: 0,
    createTime: '2022-03-31 17:03:15',
    children: [
      {
        id: 3,
        name: '平台开发部',
        parentId: 1,
        level: 2,
        weight: 3,
        status: 0,
        createTime: '2022-03-31 17:03:15'
      },
      {
        id: 4,
        name: '平台测试部',
        parentId: 1,
        level: 2,
        weight: 4,
        status: 0,
        createTime: '2022-03-31 17:03:15'
      }
    ]
  },
  {
    id: 2,
    name: '营销部',
    parentId: 0,
    level: 1,
    weight: 2,
    status: 0,
    createTime: '2022-03-31 17:03:15',
    children: [
      {
        id: 5,
        name: '营销1部',
        parentId: 2,
        level: 2,
        weight: 5,
        status: 0,
        createTime: '2022-03-31 17:03:15'
      },
      {
        id: 6,
        name: '营销2部',
        parentId: 2,
        level: 2,
        weight: 6,
        status: 1,
        createTime: '2022-03-31 17:03:15'
      }
    ]
  }
];

const apis: MockMethod[] = [
  {
    url: '/mock/admin/dept/tree',
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
