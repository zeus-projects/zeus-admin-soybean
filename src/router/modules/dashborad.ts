const dashborad: AuthRoute.Route = {
  name: 'dashborad',
  path: '/dashborad',
  component: 'self',
  meta: { 
    title: 'Dashborad', 
    icon: 'mdi:monitor-dashboard',
    singleLayout: 'basic',
    order: 1,
    hide: true
  }
};

export default dashborad;
