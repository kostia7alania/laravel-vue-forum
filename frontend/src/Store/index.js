import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index.js'



import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({ storage: window.localStorage })


Vue.use(Vuex)

window.store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    modules
});

export default store;
