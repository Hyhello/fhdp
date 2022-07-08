import _import from './_import';

const routes = [
  { path: '/', redirect: '/Tht' },
  {
    path: '*',
    name: '404',
    component: _import('Errors/404')
  },
  {
    path: '/Three',
    name: 'Three',
    component: _import('Three')
  },
  {
    path: '/',
    name: '/',
    component: _import('main'),
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: _import('Home/index'),
        meta: {
          title: '生产管理看板',
          isFullBody: true
        }
      },
      {
        path: 'Tht',
        name: 'Tht',
        component: _import('Tht/index'),
        meta: {
          title: 'tht 看板'
        }
      },
      {
        path: 'Smt',
        name: 'Smt',
        component: _import('Smt/index'),
        meta: {
          title: 'smt 看板'
        }
      },
      {
        path: 'Lines',
        name: 'Lines',
        component: _import('Lines/index'),
        meta: {
          title: '线体计划看板'
        }
      },
      {
        path: 'Logistics',
        name: 'Logistics',
        component: _import('Logistics/index'),
        meta: {
          title: '物流工序看板'
        }
      }
    ]
  }
];

if (process.env.NODE_ENV === 'development') {
  routes.push({
    path: '/svgView',
    name: 'svgView',
    component: _import('svgView')
  });
}

export default routes;
