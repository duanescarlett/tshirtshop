import axios from 'axios'

class ShirtService {
    static getShirts(successCallback, errorCallback) {
        axios.get('/shirts').then(successCallback).catch(errorCallback);
    }

    static getShirt(successCallback, errorCallback, product_id) {
        axios.get('/shirts/' + product_id).then(successCallback).catch(errorCallback);
    }

    static getItemForCart(id) {
        axios.get('/shirts/' + id)
        .then(res => {
            if (res.status === 200) {
                console.log("This ran!!.........")
                return res.data
            } 
        })
        .catch(e => {
            console.log(e + " and this happened")
        })
    }
}

export default ShirtService;
