import AppStorage from './AppStorage';

class User {

    logout() {
        AppStorage.clear();
        window.location = '/';
    }
    
/*
    loggedIn() {
        return this.hasTokenHandler();
    }
    id() {
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
*/
}

export default User = new User();
