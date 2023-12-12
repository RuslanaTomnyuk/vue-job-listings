import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/HomePage.vue';
import JobList from '@/pages/JobListPage.vue';
import JobListCardDetails from '@/components/Jobs/JobListCardDetails.vue';
import NotFound from '../pages/NotFoundPage.vue';

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
  },
  {
    path: '/job-list/:id',
    name: 'jobDetails',
    component: JobListCardDetails,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not found',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
