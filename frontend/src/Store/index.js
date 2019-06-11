import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index.js'



import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key:'vuex',
    reducer: (state) => ({login: state.login}),
})


Vue.use(Vuex)

const store = window.store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    modules
});

export default store;
