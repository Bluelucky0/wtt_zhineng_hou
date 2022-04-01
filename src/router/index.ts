import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: layout,
    redirect: '/home/homepage',
    children: [
      {
        path: 'homepage',
        name: 'homepage',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/HomePage.vue'),
      },
      {
        path: 'users',
        name: 'users',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/HomePage.vue'),
      },
      {
        path: 'application',
        name: 'application',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Application.vue'),
      },
      {
        path: 'users',
        name: 'users',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/UserPage.vue'),
      },
      {
        path: 'set',
        name: 'set',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/SetView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
