import Vue from 'vue'
// import AppStorage from '../Helpers/AppStorage';
export default {

    state: {
        token: null,//AppStorage.getToken(),
        tokenValidation: {
            iss: "http://localhost/api/auth/login"
        },
        loading: false,
        now: new Date,
        user: {
            name: null,
            role: null,
        },
    },

    getters: {

        TOKEN__isValid(state, getters) {
            const isBase64 = str => {
                try { return btoa(atob(str)).replace(/=/g, '') == str } catch (err) { return false }
            }
            const decode = payload => isBase64(payload) ? JSON.parse(atob(payload)) : false
            const token = state.token;
            const payload = typeof token == 'string' && decode(token.split('.')[1]);
            if (payload) {
                return true // payload.iss == state.token_validation.iss // => validation
            }
            return false;
        },
        TOKEN__isExpired(state, getters) {
            if (getters.TOKEN__parse)
                return state.now > getters.TOKEN__parse.exp * 1000    //да-истек, нет-не истек
            else return null
        },
        TOKEN__parse(state, getters) {
            if (getters.TOKEN__isValid) {
                const parts = state.token.split('.');
                return {
                    ...JSON.parse(atob(parts[0])),
                    ...JSON.parse(atob(parts[1]))
                }
            }
        },

        TOKEN__isOK(state, getters) { // токен валиден + действителен!!!
            return !getters.TOKEN__isExpired && getters.TOKEN__isValid
        },

        id(state, getters) {
            if (getters.TOKEN__parse)
                return getters.TOKEN__parse.sub;// токен содержит user_id || id
        },

        isAdmin(state, getters) {
            return getters.TOKEN__isOK //&& state.user.role == 1 //0-user, 1-admin, null - first reg;
        },

        isUser(state, getters) {
            return getters.TOKEN__isOK //&&  (state.user.role === null || state.user.role === 0)  //0-user, 1-admin, null - first reg;
        },
        username(state, getters) {
            return state.user.name || 'не авторизован'
        },

        loggedIn(state, getters) { return getters.TOKEN__isOK },

        role(state, getters) {
            return getters.TOKEN__isOK && state.user.role
        }
    },

    mutations: { /***** USING GLOBAL ****/
        toggle(state, { prop }) { state[prop] = !state[prop]; },
        changeProp(state, { prop, val }) { state[prop] = val },
        changeObj(state, { obj, prop, val }) { state[obj][prop] = val },


        SET_LOADING_ON(state) { state.loading = true },
        SET_LOADING_OFF(state) { state.loading = false },

        SET_TOKEN(state, token) {
            Vue.set(state, 'token', token) //state.token = token
            state.user.role = 'admin'
        },
        DROP_TOKEN(state) {
            state.token = null
        },

        UPDATE_DATE(state) { state.now = +new Date }
    },

    actions: {
        startUpdatingTime({ commit, dispatch }) {
            setInterval(() => {
                commit('UPDATE_DATE')
                console.log('Date updated ')
                dispatch('checkPermitionsOnCurrentPath')
            }, 1000 * 3)
        },
        login({ state, commit, dispatch }, logPass) {
            commit('SET_LOADING_ON')
            return axios
                .post(`auth/login`, logPass)
                .then(res => {
                    if (typeof res != 'object' && !('access_token' in res)) {
                        snack('Ошибка сервера', 'error')
                        return false
                    }
                    snack('Вы успешно вошли', 'success')
                    commit('SET_TOKEN', res.data.access_token)
                    return res.data
                })
                .catch(err => {
                    if (err.message.match('401')) snack('Неверный пароль', 'error')
                    else if (err.message.match('429')) snack('Слишком много попыток входа', 'error')
                    else snack('Произошла необработанная ошибка', 'error')
                    return false
                })
                .finally(() => commit('SET_LOADING_OFF'))
        },

        async register({ commit, dispatch }, logPass) {
            commit('SET_LOADING_ON')
            return axios
                .post(`auth/signup`, logPass)
                .then(res => { commit('SET_TOKEN', res.data.access_token); return true; })
                .catch(err => err.response && err.response.data && err.response.data.errors)
                .finally(() => {
                    commit('SET_LOADING_OFF')
                })
        },

        logout({ commit, dispatch }) {
            commit('DROP_TOKEN')
        },

        checkPermitionsOnCurrentPath({ state, getters }, routeName = router.history.current.name) {
            //debugger
            const role = getters.role
            const path = store.getters['toolbar/items'].filter(e => e['routeName'] == routeName)
            if (!path.length) return true
            if (path[0].roles.includes(role) || path[0].roles.includes('*')) {
                console.warn('есть права')
                return true
            } else {
                console.warn('нет прав!!')
                snack('Переходим на главную...')
                router.push({ name: 'forum' })
                return false
            }
        }
    },
}
