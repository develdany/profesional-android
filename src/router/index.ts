import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import Login from '../views/Login.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/home/',
    component: HomePage,
    children: [
      {
        path: '',
        redirect: '/home/estado'
      },
      {
        path: 'estado',
        component: () => import('@/views/Estado.vue')
      },
      {
        path: 'notificaciones',
        component: () => import('@/views/Notificaciones.vue')
      },
      // {
      //   path: 'tab3',
      //   component: () => import('@/views/Tab3Page.vue')
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
