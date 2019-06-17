import AppStorage from '../Helpers/AppStorage';
export default {
    state: {
        categories: [],
        loading: false,
    },

    getters: {
        categories({ state, getters }, arg2, arg3, modulesGetters, ) {
            return arg3.category.categories
        },
        loading({ state, getters }, arg2, arg3, modulesGetters, ) {
            return arg3.category.loading
        },

        GET_CATEGORIES(state) {
            //state.categories.filter(e=>e.slug == )
            return state.categories
        }
    },
    mutations: {
        /***** USING GLOBAL ****/
        changeProp(state, { prop, val }) { state[prop] = val },
        SET_LOADING_ON(state) { state.loading = true },
        SET_LOADING_OFF(state) { state.loading = false },
    },

    actions: {

        async getCategories({ commit}) {
            commit('SET_LOADING_ON');
            return axios
                .get(`category`)
                .then(res => commit('changeProp', {
                    prop: 'categories',
                    val: res.data.data
                }))
                .catch(err => { console.warn('ERR in getCategories => ', err) })
                .finally(e => commit('SET_LOADING_OFF') )
        },

        createCategory({ dispatch}, form) {
            return axios.post(`category`, form)
        },

        deleteCategory ({  }, slug) {
            return axios.delete(`category/${slug}`) //ждем в компоннете обновление категорий;
        },

        updateCategory({ rootState }, {slug, form} ) {
            return axios.patch(`category/${slug}`, form) //ждем в компоннете обновление категорий;
        },

    },

}
