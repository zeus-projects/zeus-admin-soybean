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
  interface Dept {
    id: number
    name: string
    parentId: number
    weight: number
    createBy?: string
    createTime?: Date | string
    updateBy?: string
    updateTime?: Date | string
    children?: Dept[] | null
  }
  type EnableStatus = 0 | 1

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
    createTime?: Date | string
    updateBy?: string
    updateTime?: Date | string
    children?: Menu[] | null
  }
  type MenuType = 0 | 1
  
  interface Role {
    id: number
    name: string
    permission?: string
    type: RoleType
    desc?: string
    dataScopeType?: RoleDataScopeType
    dataScope?: number[]
    menus: number[]
    createBy?: string
    createTime?: Date | string
    updateBy?: string
    updateTime?: Date | string
  }
  type RoleType = 0 | 1
  type RoleDataScopeType = 0 | 1 | 2 | 3 | 4

  interface User {
    id: number
    username: string
    fullname: string
    nickname?: string
    password?: string
    gender: UserGender
    phone?: string
    email?: string
    avatar?: string
    birthday?: number
    status: UserStatus
    deptId: number
    roles?: number[]
    createBy?: string
    createTime?: Date | string
    updateBy?: string
    updateTime?: Date | string
  }
  type UserGender = 0 | 1
  type UserStatus = 0 | 1
}
