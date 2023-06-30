import { createRouter, createWebHistory } from 'vue-router'
import MuralFotos from '@/pages/MuralFotos.vue'
import MapPage from '@/pages/MapPage.vue'
import EdificacaoJardim from '@/pages/EdificacaoJardim.vue'
import HomePage from '@/pages/HomePage.vue'

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
    path: '/predios',
    name: 'Edificacao',
    component: EdificacaoJardim
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router