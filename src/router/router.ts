import { createRouter, createWebHistory } from 'vue-router';
import { computed } from 'vue';
import store from '@/store';
import Home from '@/pages/HomePage.vue';
import JobList from '@/pages/JobListPage.vue';
import NotFound from '../pages/NotFoundPage.vue';
import JobListCardDetails from '@/components/Jobs/JobListCardDetails.vue';
import Register from '@/components/Authorization/Register.vue';
import Login from '@/components/Authorization/Login.vue';
import Profile from '@/components/Authorization/Profile.vue';
import Logout from '@/components/Authorization/Logout.vue';
import ForgotPassword from '@/components/Authorization/ForgotPassword.vue';
import ResetPassword from '@/components/Authorization/ResetPassword.vue';

const auth = computed(() => store.getters.authenticated);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/job-list',
    name: 'jobList',
    component: JobList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/auth/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/auth/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/auth/forgot-password',
    name: 'forgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/auth/reset-password/:id/:token',
    name: 'resetPassword',
    component: ResetPassword,
  },
  {
    path: '/job-list/:id',
    name: 'jobDetails',
    component: JobListCardDetails,
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (auth.value) {
      next();
    } else {
      next('/auth/login');
    }
  } else {
    next();
  }
});

export default router;
