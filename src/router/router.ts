import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue';
import JobDetails from '../components/Jobs/JobDetails.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import JobListPage from '../pages/JobListPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/job-list',
    name: 'jobList',
    component: JobListPage
  },
  {
    path: '/job-list/position/:id',
    name: 'jobDetails',
    component: JobDetails,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not found',
    component: NotFoundPage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
