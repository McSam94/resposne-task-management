import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/pages/home'),
    children: [
      {
        name: 'taskDetail',
        path: 'task/:id',
        components: {
          default: () => import('@/views/pages/home'),
          dialog: () => import('@/views/pages/components/task-detail')
        }
      }
    ]
  }
]

export default new VueRouter({
  mode: 'hash',
  routes
})
