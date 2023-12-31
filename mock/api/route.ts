import type { MockMethod } from 'vite-plugin-mock';
import { routeModel, userModel } from '../model';

const apis: MockMethod[] = [
  {
    url: '/mock/getUserRoutes',
    method: 'post',
    response: (options: Service.MockOption): Service.MockServiceResult => {
      const { userId = undefined } = options.body;
      // const routeHomeName: AuthRoute.LastDegreeRouteKey = 'multi-menu_first_second';
      const role = userModel.find(item => item.userId === userId)?.userRole || 'user';
      const filterRoutes = routeModel[role];

      return {
        code: '00000',
        message: 'ok',
        data: {
          routes: filterRoutes,
          home: ''
        }
      };
    }
  }
];

export default apis;
