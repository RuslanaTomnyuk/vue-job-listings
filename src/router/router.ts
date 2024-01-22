import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/HomePage.vue';
import JobList from '@/pages/JobListPage.vue';
import NotFound from '../pages/NotFoundPage.vue';
import JobListCardDetails from '@/components/Jobs/JobListCardDetails.vue';
import Register from '@/components/Authorization/Register.vue';
import Login from '@/components/Authorization/Login.vue';
import Logout from '@/components/Authorization/Logout.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      authRequired: 'false',
    },
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
    path: '/job-list/:id',
    name: 'jobDetails',
    component: JobListCardDetails,
    meta: {
      authRequired: 'true',
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

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) next('/auth/login');
//   else next();
// });
export default router;
