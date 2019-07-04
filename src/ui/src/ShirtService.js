import axios from 'axios'

class ShirtService {
    static getShirts(successCallback, errorCallback) {
        axios.get('/shirts').then(successCallback).catch(errorCallback);
    }
}

export default ShirtService;
