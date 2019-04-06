

export default {

    collapseSubmenu(state) {
        console.log('collapsed');
        state.submenuCollapsed = !state.submenuCollapsed;
    },

    changeProp(state, { prop, val } ) {
        state[prop] = val
    }

}