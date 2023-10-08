import { mockRequest } from '@/service/request';

/** 获取树型菜单数据 */
export function fetchMenuTree() {
  return mockRequest.get<Array<Admin.Menu>>('/admin/menu/tree');
}
