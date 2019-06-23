
// import AppStorage from '../Helpers/AppStorage';
import Vue from 'vue'

export default {
    state: {
        questions: [],
        loading: false,
        meta: {}
    },

    getters: {
        questions(state, getters) { return state.questions },
        loading(state, getters) { return state.loading },
        GETTER_meta(state) { return state.meta }
    },

    mutations: { /***** USING GLOBAL ****/

        changeProp(state, { prop, val }) { state[prop] = val },
        changeObj(state, { obj, prop, val }) { state[obj][prop] = val },

        SET_LOADING_ON(state) { state.loading = true },
        SET_LOADING_OFF(state) { state.loading = false },

        SET_QUESTIONS(state, questions) { Vue.set(state, 'questions', questions) },
        SET_META(state, meta) { Vue.set(state, 'meta', meta) },
    },


    actions: {

        getQuestions({ state, commit, dispatch, }, { page = 1 }) {
            commit('SET_LOADING_ON')
            return axios.get(`question?page=${page}`)
                .then(res => {
                    commit('SET_QUESTIONS', res.data.data)
                    commit('SET_META', res.data.meta)
                    return res.data
                })
                .catch(err => {
                    console.warn('ERR in getQuestions => ', err)
                    return false
                })
                .finally(e => {
                    commit('SET_LOADING_OFF')
                    return e
                })
        },

        getQuestionByCategorySlug({ state, commit, dispatch }, { slug, page }) {
            commit('SET_LOADING_ON')
            return axios.get(`category/${slug}/questions?page=${page}`)
                .then(res => {
                    commit('SET_QUESTIONS', res.data.data)
                    commit('SET_META', res.data.meta || {})
                    return res.data
                })
                .catch(err => {
                    console.warn('ERR in getQuestions => ', err)
                    return false
                })
                .finally(e => {
                    commit('SET_LOADING_OFF')
                    return e
                })
        },

        createQuestion({ }, form) {
            return axios.post(`question`, form)
        },

        questionUpdate({ }, form) {
            return axios.patch(`question/${form.slug}`, form)
        },
        questionDelete({ }, slug) {
            return axios
                .delete(`question/${slug}`)
                .then(res => res)
                .catch(err => {
                    console.warn('catch =>', err.response.data)
                    return false
                })

        },

    }
}
