
export default {
    state: {
        modalMode: false,
    },
    mutations: { /***** USING GLOBAL ****/
        SET_MODAL_MODE_ON(state) { state.modalMode = true },
        SET_MODAL_MODE_OFF(state) { state.modalMode = false },
    },
    getters: {
        items({ state, getters }, arg2, arg3, modulesGetters, ) {
            //console.warn(arguments)
            const admin = modulesGetters['login/isAdmin']
            const user = modulesGetters['login/isUser']
            const loggedIn = admin || user

            return [
                {
                    title: 'Форум',
                    routeName: 'forum',
                    icon: 'question_answer',
                    show: true,
                    roles: ['*']
                },
                {
                    title: 'Создать тему',
                    routeName: 'ask',
                    icon: 'plus_one',
                    show: loggedIn,
                    roles: ['admin', 'user']
                },
                {
                    title: 'Редактор категорий',
                    routeName: 'edit-categories',
                    icon: 'bookmarks',
                    show: loggedIn,
                    roles: ['admin']
                },
                {
                    title: 'Войти',
                    icon: 'person',
                    show: !loggedIn,
                    roles: ['guest']
                },
                {
                    title: 'Выйти',
                    icon: 'exit_to_app',
                    show: loggedIn,
                    roles: ['*']
                },
            ]
        }

    }

}
