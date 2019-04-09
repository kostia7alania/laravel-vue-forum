export default {

    TOKEN__isValid (state, getters) {
        const decode = payload => isBase64(payload) ? JSON.parse(atob(payload)) : false
        const isBase64 = str => {
            try {  return btoa(atob(str)).replace(/=/g, '') == str } catch (err)
            { return false }
        }
        const token = state.token;
        const payload = typeof token == 'string' && decode(token.split('.')[1]);
        if (payload) {
            return  payload.iss == state.token_validation.iss
        }
        return false;
    },

    TOKEN__isExpired(state,getters) {
        if(getters.TOKEN__parse)
            return new Date > getters.TOKEN__parse.exp*1000    //да-истек, нет-не истек
    },

    TOKEN__parse(state,getters) {
        if(getters.TOKEN__isValid) {
            const parts = state.token.split('.');
            return {
                ...JSON.parse(atob(parts[0])),
                ...JSON.parse(atob(parts[1]))
            }
        }
    },

    TOKEN__isOK(state,getters) {
        return !getters.TOKEN__isExpired && getters.TOKEN__isValid
    },

    id(state,getters) {
        if(getters.TOKEN__parse)
        return getters.TOKEN__parse.sub;// токен содержит user_id || id
    },

    isAdmin(state,getters) {
        return getters.TOKEN__isOK && state.user.role == 1 //0-user, 1-admin, null - first reg;
    },

    isUser(state,getters) {
        return getters.TOKEN__isOK &&  (state.user.role === null || state.user.role === 0)  //0-user, 1-admin, null - first reg;
    },

    username(state,getters) {
        return state.user.name
    },


}
