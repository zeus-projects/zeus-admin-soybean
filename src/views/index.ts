import type { RouteComponent } from 'vue-router';

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  'constant-page': () => import('./_builtin/constant-page/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
  admin_dept: () => import('./admin/dept/index.vue'),
  admin_menu: () => import('./admin/menu/index.vue'),
  admin_role: () => import('./admin/role/index.vue'),
  admin_user: () => import('./admin/user/index.vue'),
  document_internal: () => import('./document/internal/index.vue')
};
