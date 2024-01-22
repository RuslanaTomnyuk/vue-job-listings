import router from '@/router/router';

export const authGuard = router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth) {
    next('/auth/login');
  } else {
    next();
  }
});
