import Vue from 'vue'
import Vuex from 'vuex'

import actions from './Actions'
import mutations from './Mutations'
import AppStorage from './Helpers/AppStorage';
import getters from './Getters'
Vue.use(Vuex);

import createPersistedState from 'vuex-persistedstate'
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
    },
    actions,
    mutations,
    getters
});
export default store;



/*
    token = "{"jti":"e0f836df-8a17-4a14-a4ab-9d39bca9da4c",
    "iat":1554568729,
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":"valeks@gmx.net",
    "LoginType":["EndUser","Admin"],
    "Email":"valeks@gmx.net",
    "ID":"-1",
    "nbf":1554568728,
    "exp":1554583128,
    "iss":"Marobus",
    "aud":"https://web-controllers20190214025405.azurewebsites.net"}"
*/
