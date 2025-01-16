import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Welcome,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',     
      component: () => import('../views/About.vue'),
    },
    {
      path: '/contact',
      name: 'contact',     
      component: () => import('../views/Contact.vue'),
    },
    {
      path: '/product',
      name: 'product',      
      children: [
        {
          path: 'create',
          component: () => import('../views/product/ProductCreate.vue'),
        },
        {
          path: 'listing',
          component: () => import('../views/product/ProductListing.vue'),
        },
      ],
    }
  ],
})

export default router
