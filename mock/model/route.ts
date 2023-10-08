export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'basic',
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          component: 'multi',
          children: [
            {
              name: 'multi-menu_first_second',
              path: '/multi-menu/first/second',
              component: 'self',
              meta: {
                title: '二级菜单',
                i18nTitle: 'message.routes.multi-menu.first.second',
                requiresAuth: true,
                icon: 'mdi:menu'
              }
            },
            {
              name: 'multi-menu_first_second-new',
              path: '/multi-menu/first/second-new',
              component: 'multi',
              children: [
                {
                  name: 'multi-menu_first_second-new_third',
                  path: '/multi-menu/first/second-new/third',
                  component: 'self',
                  meta: {
                    title: '三级菜单',
                    i18nTitle: 'message.routes.multi-menu.first.second-new.third',
                    requiresAuth: true,
                    icon: 'mdi:menu'
                  }
                }
              ],
              meta: {
                title: '二级菜单(有子菜单)',
                i18nTitle: 'message.routes.multi-menu.first.second-new._value',
                icon: 'mdi:menu'
              }
            }
          ],
          meta: {
            title: '一级菜单',
            i18nTitle: 'message.routes.multi-menu.first._value',
            icon: 'mdi:menu'
          }
        }
      ],
      meta: {
        title: '多级菜单',
        i18nTitle: 'message.routes.multi-menu._value',
        icon: 'carbon:menu',
        order: 1
      }
    }
  ],
  admin: [
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'basic',
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          component: 'multi',
          children: [
            {
              name: 'multi-menu_first_second',
              path: '/multi-menu/first/second',
              component: 'self',
              meta: {
                title: '二级菜单',
                i18nTitle: 'message.routes.multi-menu.first.second',
                requiresAuth: true,
                icon: 'mdi:menu'
              }
            },
            {
              name: 'multi-menu_first_second-new',
              path: '/multi-menu/first/second-new',
              component: 'multi',
              children: [
                {
                  name: 'multi-menu_first_second-new_third',
                  path: '/multi-menu/first/second-new/third',
                  component: 'self',
                  meta: {
                    title: '三级菜单',
                    i18nTitle: 'message.routes.multi-menu.first.second-new.third',
                    requiresAuth: true,
                    icon: 'mdi:menu'
                  }
                }
              ],
              meta: {
                title: '二级菜单(有子菜单)',
                i18nTitle: 'message.routes.multi-menu.first.second-new._value',
                icon: 'mdi:menu'
              }
            }
          ],
          meta: {
            title: '一级菜单',
            i18nTitle: 'message.routes.multi-menu.first._value',
            icon: 'mdi:menu'
          }
        }
      ],
      meta: {
        title: '多级菜单',
        i18nTitle: 'message.routes.multi-menu._value',
        icon: 'carbon:menu',
        order: 1
      }
    }
  ],
  user: [
    {
      name: 'admin',
      path: '/admin',
      component: 'basic',
      meta: {
        title: '系统管理',
        i18nTitle: 'message.routes.admin._value',
        icon: 'carbon:cloud-service-management',
        order: 8
      },
      children: [
        {
          name: 'admin_dept',
          path: '/admin/dept',
          component: 'self',
          meta: {
            title: '部门管理',
            i18nTitle: 'message.routes.admin.dept',
            requiresAuth: true,
            icon: 'mingcute:department-fill'
          }
        },
        {
          name: 'admin_menu',
          path: '/admin/menu',
          component: 'self',
          meta: {
            title: '菜单管理',
            i18nTitle: 'message.routes.admin.menu',
            requiresAuth: true,
            icon: 'ep:menu'
          }
        },
        {
          name: 'admin_role',
          path: '/admin/role',
          component: 'self',
          meta: {
            title: '角色管理',
            i18nTitle: 'message.routes.admin.role',
            requiresAuth: true,
            icon: 'carbon:user-role'
          }
        },
        {
          name: 'admin_user',
          path: '/admin/user',
          component: 'self',
          meta: {
            title: '用户管理',
            i18nTitle: 'message.routes.admin.user',
            requiresAuth: true,
            icon: 'ic:round-manage-accounts'
          }
        }
      ]
    }
  ],
};
