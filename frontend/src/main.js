//window.Vue = require('vue');
import Vue from 'vue'
import './plugins/vuetify'
import router from './Router';
window.router = router;

import store from './Store';
window.store = store;

import './registerServiceWorker'
import Vuetify from 'vuetify'
Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
    }
})

require('./http.js');

import App from '@/components/App'

import VueSimplemde from 'vue-simplemde'
Vue.use(VueSimplemde)

require('vuetify/dist/vuetify.min.css')

window.md = require('marked');

import './sass/app.scss'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

window.EventBus = new Vue();

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
