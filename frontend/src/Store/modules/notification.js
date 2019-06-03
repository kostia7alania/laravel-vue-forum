
import AppStorage from '../Helpers/AppStorage';
import store from '..';
export default  {

    state:  {
        notifications: {}
    },

    getters: {
        read(state,getters) {
            const n = state.notifications
            return n&&n && n.read
        },
        unread(state,getters) {
            const n = state.notifications
            return n&&n && n.unread
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
        spliceObj(state, { notification } ) {
            state.notifications.unread.splice(notification, 1);
        },

    },


    actions: {

        getNotifications( {state, commit, dispatch}, logPass) {
            return axios
            .post("notifications")
            .then(res => {
                commit('changeProp', {
                    prop: 'notifications',
                    val: {
                        read: res.data.read,
                        unread: res.data.unread,
                    }
                })
              return true
            })
            .catch(err => {
                console.warn('[STORE][getNotifications] err =>',err);
                return false
            });

        },

        markAsRead({state, commit, dispatch}, notification)  {
            return axios
              .post("markAsRead", { id: notification.id })
              .then(res => {
                commit('changeObj', {obj: 'notifications', prop: 'read', val:notification });
                commit('spliceObj', { notification });
                return true
              })
              .catch(err => {
                console.warn('[STORE][markAsRead] err =>',err);
              });

          }


    },
}
