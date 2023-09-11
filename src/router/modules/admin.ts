const adminMenu = {
  name: 'admin',
  path: '/admin',
  component: 'basic',
  meta: {
    title: '系统管理',
    i18nTitle: 'message.routes.admin._value',
    icon: 'carbon:menu',
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
        icon: 'mdi:menu'
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
        icon: 'mdi:menu'
      }
    }
  ]
};

export default adminMenu;
