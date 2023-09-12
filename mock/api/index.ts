import auth from './auth';
import route from './route';
import adminDept from './admin/dept';

export default [...auth, ...route, ...adminDept];
