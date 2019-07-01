import axios from 'axios'

class ShirtService {
    static getShirts() {
        axios.get('/shirts')
        .then(res => {
            console.log(res);
            // this.setState({shirt: res.data});
        });
    }
}

export default ShirtService;
