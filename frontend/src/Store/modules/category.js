
import AppStorage from '../Helpers/AppStorage';
export default  {
    state: {
        categories: [],
        loading: false,
    },

    getters: {
        categories ({state, getters}, arg2, arg3, modulesGetters, ) {
            return arg3.category.categories
        },
        loading ({state, getters}, arg2, arg3, modulesGetters, ) {
            return arg3.category.loading
        }

    },
    mutations: { /***** USING GLOBAL ****/
        changeProp(state, { prop, val } ) {
            state[prop] = val
        },
    },

    actions: {

        async getCategories( {state, commit, dispatch}) {
            commit('changeProp', {prop:'loading', val: true})
            axios
                .get('/category')
                .then(res => commit('changeProp', {prop:'categories', val: res.data.data}) )
                .catch(err=>{
                    console.warn('ERR in getCategories => ',err)
                })
                .finally(e => commit('changeProp', {prop:'loading', val: false}) )
        }
    },

}
