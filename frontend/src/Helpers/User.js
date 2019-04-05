import Token from './Token';
import AppStorage from './AppStorage';



class User {

    login(data) {
        return axios
                    .post('/api/auth/login', data)
                    .then( res => this.responseAfterLogin(res) ) //return!!
                    .catch(error=> { return false });
    }

    responseAfterLogin(res) {
        const access_token = res.data.access_token
        const username = res.data.user
        if(Token.isValid(access_token)) {
            console.log(access_token)
            AppStorage.store(username, access_token)
            console.log('return -> true')
            return true //window.location = '/forum';
        } else {
            console.log('return -> false')
            return false;
        }
    }
    hasToken(){
        const storedToken = AppStorage.getToken();
        if(storedToken) return Token.isValid(storedToken) ? true : this.logout()
        return false
    }

    loggedIn() {
        return this.hasToken();
    }

    logout(){
        AppStorage.clear();
        window.location = '/login';
    }
    name(){
        if(this.loggedIn) {
            return AppStorage.getUser()
        }
    }

    id(){
        if(this.loggedIn()) {
            const payload = Token.payload(AppStorage.getToken());
            return payload.sub;// токен содержит user_id || id
        }
    }

    own (id) {
        console.log('this_id->',this.id(),'arg id =>', id)
        return this.id() == id;
    }

    admin() {
        return true// this.id() == 0;
    }
}

export default User = new User();
