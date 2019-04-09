

export default {

    collapseSubmenu(state) {
        console.log('collapsed');
        state.submenuCollapsed = !state.submenuCollapsed;
    },

    changeProp(state, { prop, val } ) {
        state[prop] = val
    },

    changeObj(state, { obj, prop, val } ) {
        state[obj][prop] = val
    },

}