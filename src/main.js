import Vue from 'vue'
import App from './App.vue'
import Router from './router/index.js'
import Store from './store/index.js'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  Router,
  Store,
  render: h => h(App)
}).$mount('#app')
