import React, {Component} from 'react'
// import UserService from "../UserService"
import ProductListing from '../features/product-listing'
import ShirtService from "../ShirtService";


// export default function Home(props){

//     console.log(ShirtService.getShirts(loadedShirt, errorLoading))

//     return <div>
//         <h2>Home</h2>

//         {/* <ProductListing products={data.products} /> */}
//     </div>
// }

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cart: false,
            itemId: null,
            errorMessage: undefined,
            shirt: [],
            products: [],
            filterdProducts: []
        };
    }
    
    getCreatedDateString = createdTimestamp => {
        return new Date(createdTimestamp).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    loadedShirt = response => {
    // this.setState({loading: false, shirt: response.data});
    // console.log("This ran!!.........");
        if (response.status === 200) {
            this.setState({ loading: false, shirt: response.data });
            console.log("This ran!!.........");
        } 
        else {
            this.setState({
            loading: false,
            errorMessage: "There was an error loading your account."
            });
        }
    };

    errorLoading = err => {
        this.setState({
            loading: false,
            errorMessage: "There was an error loading your account."
        });
    };

    componentDidMount() {
        ShirtService.getShirts(this.loadedShirt, this.errorLoading);
    }

    render() {
        return (
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div class="container">
                    <div class="row">
                        <ProductListing products={this.state.shirt} />    
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;
