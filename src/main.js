import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSkycons from './plugins/VueSkycons'

Vue.config.productionTip = false


new Vue({
  store,
  vuetify,
  VueSkycons,
  render: h => h(App)
}).$mount('#app')
