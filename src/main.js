import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { truncate } from '@/utils/filter'

Vue.config.productionTip = false

Vue.filter('truncate', truncate)

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App)
})
