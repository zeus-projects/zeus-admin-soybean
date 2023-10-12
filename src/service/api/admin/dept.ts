import { mockRequest, request } from '@/service/request';

/** 获取部门数据 */
export function fetchDeptTree() {
  // return mockRequest.get<Array<Admin.Dept>>('/admin/dept/tree');
  return request.get<Array<Admin.Dept>>('/admin/dept/tree');
}