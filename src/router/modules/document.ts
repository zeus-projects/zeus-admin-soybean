const document: AuthRoute.Route = {
  name: 'document_internal',
  path: '/document/internal',
  component: 'self',
  props: route => {
    return {
      url: route.query.url
    }
  },
  meta: {
    title: '内链文档',
    i18nTitle: 'message.routes.document.project',
    requiresAuth: true,
    icon: 'mdi:file-document-multiple-outline',
    dynamicPath: '/document/internal/:url(.*)?',
    singleLayout: 'basic',
    hide: true
  }
};

export default document;
