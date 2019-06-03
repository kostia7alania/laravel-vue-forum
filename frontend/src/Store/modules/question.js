
import AppStorage from '../Helpers/AppStorage';
export default  {
    state: {
        questions: [],
        loading:false,
    },

    getters: {
        questions  (state, getters) {
            return state.questions
        },
        loading (state, getters) {
            return state.loading
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

        getQuestions({ state, commit, dispatch, }) {
            commit('changeProp', {prop: 'loading',val: true})
            return axios.get(`question`)
                .then(res => {
                    commit('changeProp', { prop: 'questions',val: res.data.data })
                    return res.data
                })
                .catch(err => {
                    console.warn('ERR in getQuestions => ', err)
                    return false
                })
                .finally(e => {
                    commit('changeProp', { prop: 'loading', val: false })
                    return e
                })
        },

        getQuestionByCategorySlug({ state,commit,dispatch}, slug) {
            commit('changeProp', {prop: 'loading',val: true})
            return axios.get(`category/${slug}/questions`)
                .then(res => {
                    commit('changeProp', { prop: 'questions',val: res.data.data })
                    return res.data
                })
                .catch(err => {
                    console.warn('ERR in getQuestions => ', err)
                    return false
                })
                .finally(e => {
                    commit('changeProp', { prop: 'loading', val: false })
                    return e
                })
        },

        createQuestion({ }, form) {
            return axios.post(`question`, form)
        },

        questionUpdate({ }, form) {
            return axios.patch(`question/${form.slug}`, form)
        },

    }
}
