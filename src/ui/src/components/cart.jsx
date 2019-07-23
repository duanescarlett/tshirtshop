import React, {Component} from 'react'
import axios from 'axios'
// import ShirtService from "../ShirtService";

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
            filterdProducts: [],
            count: 1,
            price: 0
        }

        this.styles = {
            fontWeight: 'bold',
            fontSize: 10
        }

        this.price = {
            price: 0
        }

    }

    formatCount(){
        // return this.state.count === 0 ? 'Zero' : this.state.count;
        const { count } = this.state
        return count === 0 ? "Zero" : count;
    }

    formatCost(price){
        this.price.price = price
        this.price.price = this.price.price * this.state.count
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
        // var shirt = ShirtService.getItemForCart(this.loadedShirt, this.errorLoading, params.id);
        // var shirt = ShirtService.getItemForCart(params.id);
        axios.get('/shirts/' + params.id)
        .then(res => {
            this.setState({
                shirt: res.data
            })
        })
        .catch(e => {
            console.log(e.message + " and this happened")
        })
    }

    render() {

        return (
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div class="container">
                    <div class="row">
                        {/* {this.state.shirt} */}

                        {this.state.shirt.map((item, key) => (
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
                            {this.formatCost(item.price)}
                            
                            <code>{item.description}</code>
                            </a>
                        </div>
                        ))}

                        <div>
                            <span style={ this.styles } className={this.getBadgeClasses()}>{this.formatCount()}</span>
                            <button onClick={this.handleIncrement} className="btn btn-secondary btn-sma">+</button>
                            <button onClick={this.handleDecrement} className="btn btn-secondary btn-sma">-</button>
                        </div>
                        <div>
                            { this.price.price }
                        </div>
                        <div>
                        <button className="btn btn-secondary btn-sma">Buy Now</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }

    handleIncrement = () => {
        console.log("Increment Clicked", this)
        this.setState({
            count: this.state.count + 1
        })
    }

    handleDecrement = () => {
        console.log("Decrement Clicked", this)
        this.setState({
            count: this.state.count - 1
        })
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        return classes += (this.state.count === 0) ? "warning" : "primary";
    }
}

export default CartTest;
