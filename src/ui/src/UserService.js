import axios from 'axios'

class UserService {

    static login(username, password, successCallback, errorCallback) {
        axios.post('/users/login', {
            username: username,
            password: password
        }).then(successCallback).catch(errorCallback)
    }

    static createAccount(email, password, successCallback, errorCallback) {
        axios.post('/users', {
            email: email,
            password: password
        }).then(successCallback).catch(errorCallback)
    }

    static loadCurrentUser(successCallback, errorCallback) {
        axios.get('/users/me').then(successCallback).catch(errorCallback)
    }
}

export default UserService