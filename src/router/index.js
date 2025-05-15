import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';
import { beforeEachGuard } from '@/router/utilities';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard that checks authentication requirements
router.beforeEach((to, from, next) => {
  beforeEachGuard(to, from, next);
});

export default router;
