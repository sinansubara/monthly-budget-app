import { useUserStore } from '@/stores/useUserStore';

export const beforeEachGuard = (to, _, next) => {
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
};
