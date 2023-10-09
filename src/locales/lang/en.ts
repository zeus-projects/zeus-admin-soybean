import type { LocaleMessages } from 'vue-i18n';

const locale: LocaleMessages<I18nType.Schema> = {
  message: {
    system: {
      title: 'ZeusAdmin'
    },
    routes: {
      dashboard: {
        _value: 'Dashboard',
        analysis: 'Analysis',
        workbench: 'Workbench'
      },
      document: {
        _value: 'Document',
        vue: 'Vue Document',
        vite: 'Vite Document',
        naive: 'NaiveUI Document',
        project: 'Project Document',
        project_link: 'Project Document(href)'
      },
      exception: {
        _value: 'Exception',
        403: '403',
        404: '404',
        500: '500'
      },
      admin: {
        _value: 'System Management',
        dept: 'Dept',
        menu: 'Menu',
        user: 'User',
        role: 'Role'
      }
    }
  }
};

export default locale;
