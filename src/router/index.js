import { createRouter, createWebHistory } from 'vue-router'
import MuralFotos from '@/pages/MuralFotos.vue'
import MapPage from '@/pages/MapPage.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CreateUser from '@/pages/CreateUser.vue'

const routes = [
  {
    path:'/mural',
    name: 'Mural',
    component: MuralFotos
  },
  {
    path: '/mapa',
    name: 'Mapa',
    component: MapPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateUser
  },
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router