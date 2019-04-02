class Token {

    isValid(token) {
        const payload = this.payload(token);
        if(payload) {
            return payload.iss == "http://localhost/api/auth/login"// "http://10.0.75.1:8080/api/auth/login"
        }
        return false;
    }

    payload(token) {
        const payload = token.split('.')[1]
        return this.decode(payload)
    }

    decode(payload) {
        return JSON.parse(atob(payload))
    }

}
export default Token = new Token();