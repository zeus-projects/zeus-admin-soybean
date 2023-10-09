import type { LocaleMessages } from 'vue-i18n';

const locale: LocaleMessages<I18nType.Schema> = {
  message: {
    system: {
      title: 'ZeusAdmin'
    },
    routes: {
      dashboard: {
        _value: '仪表盘',
        analysis: '分析页',
        workbench: '工作台'
      },
      document: {
        _value: '文档',
        vue: 'Vue文档',
        vite: 'Vite文档',
        naive: 'NaiveUI文档',
        project: '项目文档',
        project_link: '项目文档(外链)'
      },
      exception: {
        _value: '异常页',
        403: '403',
        404: '404',
        500: '500'
      },
      admin: {
        _value: '系统管理',
        dept: '部门管理',
        menu: '菜单管理',
        user: '用户管理',
        role: '角色管理'
      }
    }
  }
};

export default locale;
