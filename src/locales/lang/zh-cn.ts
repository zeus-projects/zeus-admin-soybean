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
        'project-link': '项目文档(外链)'
      },
      component: {
        _value: '组件示例',
        button: '按钮',
        card: '卡片',
        table: '表格'
      },
      plugin: {
        _value: '插件示例',
        charts: {
          _value: '图表',
          echarts: 'ECharts',
          antv: 'AntV'
        },
        copy: '剪贴板',
        editor: {
          _value: '编辑器',
          quill: '富文本',
          markdown: 'Markdown'
        },
        icon: '图标',
        map: '地图',
        print: '打印',
        swiper: 'Swiper',
        video: '视频'
      },
      'auth-demo': {
        _value: '权限示例',
        permission: '切换权限',
        super: '超级管理员可见'
      },
      function: {
        _value: '功能',
        tab: 'Tab页签'
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
      },
      about: '关于'
    }
  }
};

export default locale;
