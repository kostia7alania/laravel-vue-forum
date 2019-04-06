
import User from './Helpers/User'; 
import AppStorage from './Helpers/AppStorage';

export default {
 

    async login( {state, commit, dispatch}, logPass) {
        return axios
                    .post('/AdminToken/Obtain', logPass)
                    .then( res => { 
                        const token = res.data.access_token
                        AppStorage.store(token)
                        commit('changeProp',{prop: 'token', val:token})
                        return true;
                    }) //return!!
                    .catch( () => !!0 );
    },

    logout({commit}) {
        commit('changeProp',{prop: 'token', val: null})
        AppStorage.clear();
    }


}