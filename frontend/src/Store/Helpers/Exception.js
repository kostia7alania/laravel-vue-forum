
import User from "./User";

class Exception {

    handle(obj) {
        this.isExpired(obj.response.data.error)
    }

    isExpired(error) {
        if (['Token is invalid',
             'Token is expired']
            .includes(error)) {
            User.logout();
        }
    }

}

export default Exception = new Exception()
