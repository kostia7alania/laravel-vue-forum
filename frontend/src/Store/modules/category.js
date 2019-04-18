import AppStorage from '../Helpers/AppStorage';
export default {
    state: {
        categories: [],
        loading: false,
    },

    getters: {
        categories({
            state,
            getters
        }, arg2, arg3, modulesGetters, ) {
            return arg3.category.categories
        },
        loading({
            state,
            getters
        }, arg2, arg3, modulesGetters, ) {
            return arg3.category.loading
        }

    },
    mutations: {
        /***** USING GLOBAL ****/
        changeProp(state, {
            prop,
            val
        }) {
            state[prop] = val
        },
    },

    actions: {

        async getCategories({
            state,
            commit,
            dispatch
        }) {
            commit('changeProp', {
                prop: 'loading',
                val: true
            })
            return axios
                .get('/category')
                .then(res => commit('changeProp', {
                    prop: 'categories',
                    val: res.data.data
                }))
                .catch(err => {
                    console.warn('ERR in getCategories => ', err)
                })
                .finally(e => commit('changeProp', {
                    prop: 'loading',
                    val: false
                }))
        },

        createCategory({dispatch}, form) {
            return axios
                .post("/category", form)
                .then(() => {
                    dispatch('getCategories')//in "background")
                    return true;
                })
        },

        deleteCategory({dispatch}, slug) {
            return axios.delete(`/category/${slug}`) //ждем в компоннете обновление категорий;
        },

        updateCategory({dispatch}, {slug, form} ) {
            return axios.patch(`/category/${slug}`, form) //ждем в компоннете обновление категорий;
        },

    },

}
