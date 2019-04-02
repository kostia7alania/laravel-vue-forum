//window.Vue = require('vue');
import Vue from 'vue'
import './plugins/vuetify'
import router from './Router/'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.config.devtools = true;

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

window.axios = require('axios');

import App from '@/components/AppHome'
import User from './Helpers/User'

window.User = User;

console.log(User.loggedIn())
window.EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
