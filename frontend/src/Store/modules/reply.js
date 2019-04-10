
import AppStorage from '../Helpers/AppStorage';
export default  {
    state: {
        replies: {},
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
        appendObj(state, { obj, prop, val } ) {
            prop in state[obj]?'':state[obj][prop] = [];
            state[obj][prop].push(val)
        },

    },


    actions: {
        async newReply( {state, commit, dispatch}, { questionSlug, body } ) {
            return  axios
                        .post(`/question/${questionSlug}/reply`, { body } )
                        .then(res => {
                            commit('appendObj', {obj: 'replies', prop: 'questionSlug', val: res.data.Reply })
                            return true
                        }).catch( err => {
                            console.warn('[STORE] [catch] newReply => ',err)
                            return false
                    });

        },
    }

}


