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
            return  payload.iss == state.token_validation.iss   &&
                    payload.aud == state.token_validation.aud
        }
        return false;
    },

    TOKEN__isExpired(state,getters) {
        if(getters.TOKEN__parse)
            return new Date > getters.TOKEN__parse.exp*1000    //да-истек, нет-не истек
    },

    TOKEN__isOK(state,getters){
        return !getters.TOKEN__isExpired && getters.TOKEN__isValid
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

    isAdmin(state,getters) {
        if(getters.TOKEN__parse)
        return getters.TOKEN__parse.LoginType.includes('Admin')
    },
    isUser(state,getters) {
        if(getters.TOKEN__parse)
        return getters.TOKEN__parse.LoginType.includes('User')
    },
    username(state,getters) {
        if(getters.TOKEN__parse)
        return getters.TOKEN__parse.Email
    },
    


}