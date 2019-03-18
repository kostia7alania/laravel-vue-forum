
import AppStorage from '../Helpers/AppStorage';
export default  {
    state: {
        categories: [],
        questions: [],
        replies: [],
    },

    getters: {
        categories ({state, getters}, arg2, arg3, modulesGetters, ) {
        }

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
        async newReply( {state, commit, dispatch}, id) {

        }
    }
}
