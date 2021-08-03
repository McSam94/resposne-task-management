import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{ path: '/', component: () => import('@/views/pages/home') }]

export default new VueRouter({
  mode: 'hash',
  routes
})
