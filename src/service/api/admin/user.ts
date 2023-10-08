import { mockRequest } from '@/service/request';
import { PaginationProps } from 'naive-ui';

/** 获取用户数据 */
export function fetchUserPage(pagination: PaginationProps, deptId?: number) {
  return mockRequest.get<Api.Page<Admin.User>>('/admin/user/page', {
    params: {
      current: pagination.page,
      size: pagination.pageSize,
      deptId
    }
  });
}
