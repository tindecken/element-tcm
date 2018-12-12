import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Store from './store/index.js'
import './plugins/element.js'
import Vuelidate from 'vuelidate'
import VueSplit from 'vue-split-panel'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFolder, faListAlt, faFileAlt, faObjectGroup } from '@fortawesome/free-regular-svg-icons'
library.add(faFolder, faListAlt, faFileAlt, faObjectGroup)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueSplit)

new Vue({
  router,
  store: Store,
  render: h => h(App)
}).$mount('#app')
