
import AppStorage from '../Helpers/AppStorage';
export default  {
    state: {
        replies: {},
        loading:false,
        slug: null,
        draft: {},
    },

    getters: {
        GETTER_TOPIC_REPLIES(state,getters) {
            //const slug =  router.history.current.params.slug//не реактивно =(
            return state.slug in state.replies ? state.replies[state.slug] : []
        },
        GETTER_TOPIC_DRAFT(state,getters) {
            return state.slug in state.draft ? state.draft[state.slug] : ''//пустой текст при инициализации коммента;
        },
        loading ( state ) { return state.loading },
    },

    mutations: { /***** USING GLOBAL ****/
        appendObj(state, { obj, prop, val } ) {
            prop in state[obj]?'':state[obj][prop] = [];
            state[obj][prop].push(val)
        },
        SET_LOADING_ON(state) { state.loading = true },
        SET_LOADING_OFF(state) { state.loading = false },
        SET_TOPIC_REPLIES(state, {prop,val} ) { state.replies[prop] = val },
        APPEND_TOPIC_REPLY(state, {slug, obj} ) {
            state.replies[slug].push(obj)
        },
        SET_SLUG(state, val) {state.slug = val},
        SET_TOPIC_DRAFT(state, val) { state.draft[state.slug] = val },
        CLEAR_TOPIC_DRAFT(state, slug) { state.draft[slug] = val }, //slug нужно передавать т.к. асинк;
    },

    actions: {

        newReply( {state, commit, dispatch}, { body } ) {
            const slug = state.slug
            return  axios
                        .post(`question/${slug}/reply`, { body } )
                        .then(res => {
                            commit('APPEND_TOPIC_REPLY', {slug, obj: res.data.Reply })
                            commit('CLEAR_TOPIC_DRAFT',slug)
                            return true
                        }).catch( err => {
                            console.warn('[STORE] [catch] newReply => ',err)
                            return false
                    });

        },

        getReplies({ state, commit, dispatch, getters}) {
            const slug = router.history.current.params.slug
            commit('SET_SLUG', slug)
            if(!slug) return {stat:false, msg: 'Неверные параметры для отображения комментариев'};
            commit('SET_LOADING_ON')
            return axios
                    .get(`question/${slug}/reply`)
            .then(res => {
                commit('SET_TOPIC_REPLIES', {prop: slug, val:res.data.data} );
                return { stat: true, msg: res.data }
            })
            .catch(err => {
                console.warn('ERR in getReplies => ', err)
                return { stat: false, msg: err }
            })
            .finally( e => {
                commit('SET_LOADING_OFF')
                return e
            })
        },


    }
}


