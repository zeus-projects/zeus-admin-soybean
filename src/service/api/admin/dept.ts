import { mockRequest } from '@/service/request';

/** 获取部门数据 */
export function fetchDeptTree() {
  return mockRequest.get('/admin/dept/tree');
}
