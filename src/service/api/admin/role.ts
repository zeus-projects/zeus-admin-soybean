import { mockRequest } from '@/service/request';

/** 获取树型菜单数据 */
export function fetchRolePage() {
  return mockRequest.get<Api.Page<Admin.Role>>('/admin/role/page', {
    params: {
      current: 1,
      size: 10
    }
  });
}
