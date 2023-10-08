import { mockRequest } from '@/service/request';
import { PaginationProps } from 'naive-ui';

/** 获取树型菜单数据 */
export function fetchRolePage(pagination: PaginationProps) {
  return mockRequest.get<Api.Page<Admin.Role>>('/admin/role/page', {
    params: {
      current: pagination.page,
      size: pagination.pageSize
    }
  });
}
