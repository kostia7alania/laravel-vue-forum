
export default {

    state: {
        slug: null,
        _snack: false//всплывающее оповещение
    },

    getters: {
        _snack_getter({ state, getters }, arg2, arg3, modulesGetters, ) {
            return state && state._snack
        },
    },

    mutations: {
        SET_SLUG(state, slug) { state.slug = slug },
        SET_SNACK_ON(state) { state._snack = true },
        SET_SNACK_OFF(state) { state._snack = false },
    },

    actions: {

    },

}
