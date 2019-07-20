import React, {Component} from 'react'
import ShirtService from "../ShirtService";

class CartTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading,
            cart: false,
            itemId: this.props.itemId,
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
        const { match: { params } } = this.props;
        var shirt = ShirtService.getItemForCart(params.id);
        this.setState({
            shirt: shirt
        })
    }

    render() {
        return (
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div class="container">
                    <div class="row">
                        {this.state.shirt}
                    {/* {this.state.shirt.map((item, key) => (
                        <div class="col-sm" key={item.product_id}>
                            <a href={"/cart/" + item.product_id}>
                            
                            <img
                                src={
                                "https://raw.githubusercontent.com/zandoan/turing-fullstack/master/Images/product_images/" +
                                item.image
                                }
                                alt=""
                                width="100"
                                height="100"
                            />
                            <h6>{item.name}</h6>
                            <p>{item.price}</p>
                            <code>{item.description}</code>
                            </a>
                        </div>
                        ))} */}
                    </div>
                </div>
            </div>
        );
    }

}

export default CartTest;
