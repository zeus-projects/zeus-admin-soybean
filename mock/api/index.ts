import auth from './auth';
import route from './route';
import dept from './admin/dept';
import menu from './admin/menu';

export default [...auth, ...route, ...dept, ...menu];
