
import AppStorage from '../Helpers/AppStorage';
export default  {

    state:  {
        token: null,//AppStorage.getToken(),
        tokenValidation: {
            iss: "http://localhost/api/auth/login"
        },
        user: {
            role: false,
            name: null,
        }
    },

    getters: {

        TOKEN__isValid (state, getters) {
            const decode = payload => isBase64(payload) ? JSON.parse(atob(payload)) : false
            const isBase64 = str => {
                try {  return btoa(atob(str)).replace(/=/g, '') == str } catch (err)
                { return false }
            }
            const token = state.token;
            const payload = typeof token == 'string' && decode(token.split('.')[1]);
            if (payload) {
                return true // payload.iss == state.token_validation.iss
            }
            return false;
        },
        TOKEN__isExpired(state,getters) {
            if(getters.TOKEN__parse)
                return new Date > getters.TOKEN__parse.exp*1000    //да-истек, нет-не истек
        },
        TOKEN__parse(state,getters) {
            if(getters.TOKEN__isValid) {
                const parts = state.token.split('.');
                return {
                    ...JSON.parse(atob(parts[0])),
                    ...JSON.parse(atob(parts[1]))
                }
            }
        },

        TOKEN__isOK(state,getters) {
            return !getters.TOKEN__isExpired && getters.TOKEN__isValid
        },

        id(state,getters) {
            if(getters.TOKEN__parse)
            return getters.TOKEN__parse.sub;// токен содержит user_id || id
        },

        isAdmin(state,getters) {
            return getters.TOKEN__isOK && state.user.role == 1 //0-user, 1-admin, null - first reg;
        },

        isUser(state,getters) {
            return getters.TOKEN__isOK &&  (state.user.role === null || state.user.role === 0)  //0-user, 1-admin, null - first reg;
        },

        username(state,getters) {
            return state.user.name
        },

        loggedIn(state,getters) {
            return getters.isUser || getters.isAdmin
        },

    },

    mutations: { /***** USING GLOBAL ****/


        toggle(state, { prop }) {
            state[prop] = !state[prop];
        },
        changeProp(state, { prop, val } ) {
            state[prop] = val
        },
        changeObj(state, { obj, prop, val } ) {
            state[obj][prop] = val
        },


    },


    actions: {
        async login( {state, commit, dispatch}, logPass) {
            return axios
                        .post('/auth/login', logPass)
                        .then( res => {
                            const token = res.data.access_token
                        //    AppStorage.store(token)
                            commit('changeProp',{prop: 'token', val:token})
                            commit('changeObj', {obj: 'user', prop: 'role', val: res.data.role})
                            return true;
                        }) //return!!
                        .catch( () => !!0 );
        },

        async register( {state, commit, dispatch}, logPass) {
            return axios
                        .post('/auth/signup', logPass)
                        .then( res => {
                            debugger
                            const token = res.data.access_token
                         //   AppStorage.store(token)
                            commit('changeProp',{prop: 'token', val:token})
                            commit('changeObj', {obj: 'user', prop: 'role', val: res.data.role})
                            return true;
                        })
                        .catch( err => err.response.data.errors );

        },

        logout({commit}) {
            commit('changeProp',{prop: 'token', val: null})
         //   AppStorage.clear();
            router.push('/forum')

        },

    },
}
