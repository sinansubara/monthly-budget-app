const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingPage.vue'),
    meta: {
      requiresAuth: false,
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('@/views/CalculatorPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;
