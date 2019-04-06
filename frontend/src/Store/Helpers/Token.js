import AppStorage from './AppStorage';

class Token {
    isValid() {
        const token = AppStorage.getToken()
        const payload = this.payload(token);
        if(payload) {
            return payload.iss == window.store.state.token_validation.iss
                && payload.aud == window.store.state.token_validation.aud
        }
        return false;
    }

    payload(token) {
        const payload = token.split('.')[1]
        return this.decode(payload)
    }

    decode(payload) {
        if(this.isBase64(payload)){
            return JSON.parse(atob(payload))
        }
        return false
    }

    isBase64(str) {
        try {
            return btoa(atob(str)).replace(/=/g,'') == str
        }
        catch(err) {
            return false
        }
    }
}
export default Token = new Token();
