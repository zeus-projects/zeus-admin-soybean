const adminMenu: AuthRoute.Route = {
  name: 'admin',
  path: '/admin',
  component: 'basic',
  meta: {
    title: '系统管理',
    i18nTitle: 'message.routes.admin._value',
    icon: 'carbon:cloud-service-management',
    order: 2
  },
  children: [
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
  ]
};

export default adminMenu;
