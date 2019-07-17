import axios from 'axios'

class ShirtService {
    static getShirts(successCallback, errorCallback) {
        axios.get('/shirts').then(successCallback).catch(errorCallback);
    }

    static getShirt(successCallback, errorCallback) {
        axios.get('/shirts/:product_id').then(successCallback).catch(errorCallback);
    }
}

export default ShirtService;
