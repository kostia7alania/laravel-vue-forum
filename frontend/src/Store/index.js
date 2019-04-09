import Vue from 'vue'
import Vuex from 'vuex'

import actions from './Actions'
import mutations from './Mutations'
import AppStorage from './Helpers/AppStorage';
import getters from './Getters'
Vue.use(Vuex);

window.createPersistedState = createPersistedState;
const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        token: AppStorage.getToken(),
        token_validation: {
            iss: "http://localhost/api/auth/login"
        },
        user: {
            role: false,
            name: null,
        }
    }
});
