
import User from "./User";

class Exception {

    handle(obj) {
        this.isExpired(obj.response.data.error)
    }

    isExpired(error) {
        if (error == 'Token is invalid') {
            User.logout();
        }
    }

}

export default Exception = new Exception()
