//window.Vue = require('vue');
import Vue from 'vue'
import './plugins/vuetify'
import router from './Router/'
import store from './store'
import './registerServiceWorker'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

require('./http.js');

import App from '@/components/AppHome'

import VueSimplemde from 'vue-simplemde'
Vue.use(VueSimplemde)

window.md = require('marked');

import User from './Helpers/User'

window.User = User;

import './sass/app.scss'

console.log('loggedIn? => ',User.loggedIn())
window.EventBus = new Vue();

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
