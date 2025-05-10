import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Landing',
    // import LandingPage component dynamically
    component: () => import('./views/LandingPage.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    // import HomePage component dynamically
    component: () => import('./views/HomePage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
