class AppStorage {

    storeToken(token) {
        return localStorage.setItem('token', token)
    }

    store(token) {
        this.storeToken(token)
    }

    clear() {
        localStorage.removeItem('token')
    }

    getToken() {
        return localStorage.getItem('token')
    }

}

 export default AppStorage = new AppStorage();