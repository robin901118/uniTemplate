import Vue from 'vue'
import App from './App'
import store from "./store"


Vue.config.productionTip = false;
Vue.prototype.$store = store;

App.mpType = 'app'

import router from './router.js'
const app = new Vue({
  ...App,
  router
})
app.$mount()
