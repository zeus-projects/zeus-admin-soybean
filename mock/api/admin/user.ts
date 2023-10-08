import type { MockMethod } from 'vite-plugin-mock';

const tableData: Admin.User[] = [
  {
    id: 1,
    username: 'admin',
    name: '张三',
    nickname: '小三',
    password: '',
    phone: '18366666666',
    gender: 0,
    deptId: 1,
    status: 0,
    roleList: [1]
  },
  {
    id: 2,
    username: 'test',
    name: '李四',
    nickname: '小四',
    password: '',
    phone: '18388888888',
    gender: 0,
    deptId: 2,
    status: 1,
    roleList: [2]
  }
]

const apis: MockMethod[] = [
  {
    url: '/mock/admin/user/page',
    method: 'get',
    response: (): Service.MockServiceResult => {
      return {
        code: 200,
        message: 'ok',
        data: {
          current: 1,
          size: 10,
          total: 2,
          records: tableData
        }
      };
    }
  }
];

export default apis;
