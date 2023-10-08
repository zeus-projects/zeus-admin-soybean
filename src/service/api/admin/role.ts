import { mockRequest } from '@/service/request';
import { PaginationProps } from 'naive-ui';

/** 获取角色数据 */
export function fetchRolePage(pagination: PaginationProps) {
  return mockRequest.get<Api.Page<Admin.Role>>('/admin/role/page', {
    params: {
      current: pagination.page,
      size: pagination.pageSize
    }
  });
}

export function fetchRoleList() {
  return mockRequest.get<Array<Admin.Role>>('/admin/role');
}
