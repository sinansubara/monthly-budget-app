import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('./views/LandingPage.vue'),
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('./views/CalculatorPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
