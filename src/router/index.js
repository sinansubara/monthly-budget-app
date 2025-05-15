import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard that checks authentication requirements
router.beforeEach((to, _, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.getIsAuthenticated;

  // If route requires auth and user is not logged in, redirect to landing
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'landing' });
    return;
  }

  // If route should redirect when logged in (like login page) and user is logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next({ name: 'calculator' });
    return;
  }

  // Otherwise proceed normally
  next();
});

export default router;
