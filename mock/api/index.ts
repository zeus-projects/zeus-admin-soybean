import auth from './auth';
import route from './route';
import dept from './admin/dept';
import menu from './admin/menu';
import user from './admin/user';

export default [...auth, ...route, ...dept, ...menu, ...user];
