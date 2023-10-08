/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型 (前端静态路由用角色类型进行路由权限的控制)
   * - super: 超级管理员 (该权限具有所有路由数据)
   * - admin: 管理员
   * - user: 用户
   */
  type RoleType = 'super' | 'admin' | 'user';

  /** 用户信息 */
  interface UserInfo {
    /** 用户 id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户角色类型 */
    userRole: RoleType;
  }
}

declare namespace Admin {
  type enableStatus = 0 | 1

  interface Dept {
    id: number
    name: string
    parentId: number
    weight: number
    status: number
    createBy?: string
    createTime?: Date
    updateBy?: string
    updateTime?: Date
    children?: Dept[] | null
  }

  type menuType = 0 | 1
  interface Menu {
    id: number
    type: number
    name: string
    parentId: number
    weight: number
    icon?: string
    path?: string
    permission?: string
    createBy?: string
    createTime?: Date
    updateBy?: string
    updateTime?: Date
    children?: Menu[] | null
  }
}
