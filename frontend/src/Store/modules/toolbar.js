
import AppStorage from '../Helpers/AppStorage';
export default  {
    state: {

    },

    getters: {
        items({state, getters}, arg2, arg3, modulesGetters, ) {
            console.warn(arguments)

            const admin = modulesGetters['login/isAdmin']
            const user = modulesGetters['login/isUser']
            const loggedIn = admin || user
            return [
                {title: 'Forum', to:'/forum', icon:'question_answer',   show: true},
                {title: 'Ask question', to:'/ask', icon: 'plus_one',    show: loggedIn },
                {title: 'Edit categories', to:'/edit-categories', icon: 'bookmarks',  show: true },
                {title: 'Login', to:'/login', icon: 'person',           show: !loggedIn },
                {title: 'Logout', icon: 'exit_to_app',                  show: loggedIn },
            ]
        }

    }

}
