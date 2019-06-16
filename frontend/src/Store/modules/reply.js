
//import AppStorage from '../Helpers/AppStorage';

import Vue from "vue";

export default  {
    state: {
        replies: {},
        loading:false,
        draft: {},
        slug: null
    },

    getters: {
        GETTER_TOPIC_REPLIES_ARR(state,getters) {
            return state.replies
            /*
                const slug = store.state.global.slug //router.history.current.params.slug//не реактивно =(
                return slug in state.replies ? state.replies[slug] : false
            */
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
        SET_TOPIC_REPLIES(state, {slug,replies} ) {
            Vue.set(state.replies, slug, replies)
            //state.replies[slug] = replies
        },
        APPEND_TOPIC_REPLY(state, {slug, obj} ) {
            state.replies[slug].push(obj)
        },
        SET_TOPIC_DRAFT(state, val) { state.draft[state.slug] = val },
        CLEAR_TOPIC_DRAFT(state, slug) { state.draft[slug] = null }, //slug нужно передавать т.к. асинк;
    },

    actions: {
        GET_TOPIC_REPLIES({state}) {
            const slug = this.state.global.slug
            //  const slug = store.state.global.slug //router.history.current.params.slug//не реактивно =(
           return slug in state.replies ? state.replies[slug] : false
         },

        newReply( {state, commit, dispatch}, { body } ) {
            //const slug = state.slug
            const slug = this.state.global.slug
            return  axios
                        .post(`question/${slug}/reply`, { body } )
                        .then(res => {
                            commit('APPEND_TOPIC_REPLY', {slug, obj: res.data.Reply })
                            commit('CLEAR_TOPIC_DRAFT',slug)
                            return {state:1, msg: 'Успешно', data: res.data.Reply}
                        }).catch( err => {
                            console.warn('[STORE] [catch] newReply => ',err)
                            return {state:0, msg: err.message}
                    });

        },

        getReplies({ state, commit, dispatch, getters}) {
            //const slug = router.history.current.params.slug
            const slug = this.state.global.slug
            if(!slug) return {stat:false, msg: 'Неверные параметры для отображения комментариев'};
            commit('SET_LOADING_ON')
            return axios
                        .get(`question/${slug}/reply`)
                        .then(res => {
                            commit('SET_TOPIC_REPLIES', {slug, replies:res.data.data} );
                            return { stat: true, msg: 'Комментарии успешно получены', replies:res.data.data }
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

        deleteReply({}, id) {
            const slug = this.state.global.slug
            return axios
            .delete(`question/${slug}/reply/${id}`)
            .then(res => {
              // this.content.splice(index, 1);
              return {stat:1, msg: 'Успешно удалено', res}
            })
            .catch(err => {
                console.warn(err)
                return {stat:0, msg: err.message}
            });
        }

    }
}


