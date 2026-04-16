import { createRouter, createWebHistory } from 'vue-router'
import login from './components/login.vue'
import edit from './components/edit.vue'
import home from './components/home.vue'
import search from './components/search.vue'
import admin from './components/admin.vue'

const routes = [
  { path: '/login', component: login },
  { path: '/home', component: home },
  { path: '/edit', component: edit },
  { path: '/search', component: search },
  { path: '/admin', component: admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router